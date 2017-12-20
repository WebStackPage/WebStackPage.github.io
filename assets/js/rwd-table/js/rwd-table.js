/*!
 * Responsive Tables v5.0.4 (http://gergeo.se/RWD-Table-Patterns)
 * This is an awesome solution for responsive tables with complex data.
 * Authors: Nadan Gergeo <nadan.gergeo@gmail.com> (www.gergeo.se) & Maggie Wachs (www.filamentgroup.com)
 * Licensed under MIT (https://github.com/nadangergeo/RWD-Table-Patterns/blob/master/LICENSE-MIT)
 */
(function ($) {
    'use strict';

    // RESPONSIVE TABLE CLASS DEFINITION
    // ==========================

    var ResponsiveTable = function(element, options) {
        var that = this;

        this.options = options;
        this.$tableWrapper = null; //defined later in wrapTable
        this.$tableScrollWrapper = $(element); //defined later in wrapTable
        this.$table = $(element).find('table');

        if(this.$table.length !== 1) {
            throw new Error('Exactly one table is expected in a .table-responsive div.');
        }

        //apply pattern option as data-attribute, in case it was set via js
        this.$tableScrollWrapper.attr('data-pattern', this.options.pattern);

        //if the table doesn't have a unique id, give it one.
        //The id will be a random hexadecimal value, prefixed with id.
        //Used for triggers with displayAll button.
        this.id = this.$table.prop('id') || this.$tableScrollWrapper.prop('id') || 'id' + Math.random().toString(16).slice(2);

        this.$tableClone = null; //defined farther down
        this.$stickyTableHeader = null; //defined farther down

        //good to have - for easy access
        this.$thead = this.$table.find('thead');
        this.$tbody = this.$table.find('tbody');
        this.$hdrCells = this.$thead.find('th');
        this.$bodyRows = this.$tbody.find('tr');

        //toolbar and buttons
        this.$btnToolbar = null; //defined farther down
        this.$dropdownGroup = null; //defined farther down
        this.$dropdownBtn = null; //defined farther down
        this.$dropdownContainer = null; //defined farther down

        this.$displayAllBtn = null; //defined farther down

        this.$focusGroup = null; //defined farther down
        this.$focusBtn = null; //defined farther down

        //misc
        this.displayAllTrigger = 'display-all-' + this.id + '.responsive-table';
        this.idPrefix = this.id + '-col-';

        // Check if iOS
        // property to save performance
        this.iOS = isIOS();
      
        // Setup table
        // -------------------------
      
        //wrap table
        this.wrapTable();

        //create toolbar with buttons
        this.createButtonToolbar();

        // Setup cells
        // -------------------------

        //setup header cells
        this.setupHdrCells();

        //setup standard cells
        this.setupStandardCells();

        //create sticky table head
        if(this.options.stickyTableHeader){
            this.createStickyTableHeader();
        }

        // hide toggle button if the list is empty
        if(this.$dropdownContainer.is(':empty')){
            this.$dropdownGroup.hide();
        }

        // Event binding
        // -------------------------

        // on orientchange, resize and displayAllBtn-click
        $(window).bind('orientationchange resize ' + this.displayAllTrigger, function(){

            //update the inputs' checked status
            that.$dropdownContainer.find('input').trigger('updateCheck');

            //update colspan and visibility of spanning cells
            $.proxy(that.updateSpanningCells(), that);

        });
    };

    ResponsiveTable.DEFAULTS = {
        pattern: 'priority-columns',
        stickyTableHeader: true,
        fixedNavbar: '.navbar-fixed-top',  // Is there a fixed navbar? The stickyTableHeader needs to know about it!
        addDisplayAllBtn: true, // should it have a display-all button?
        addFocusBtn: true,  // should it have a focus button?
        focusBtnIcon: 'glyphicon glyphicon-screenshot'
    };

    // Wrap table
    ResponsiveTable.prototype.wrapTable = function() {        
        this.$tableScrollWrapper.wrap('<div class="table-wrapper"/>');
        this.$tableWrapper = this.$tableScrollWrapper.parent();
    };

    // Create toolbar with buttons
    ResponsiveTable.prototype.createButtonToolbar = function() {
        var that = this;

        this.$btnToolbar = $('<div class="btn-toolbar" />');

        this.$dropdownGroup = $('<div class="btn-group dropdown-btn-group pull-right" />');
        this.$dropdownBtn = $('<button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Display <span class="caret"></span></button>');
        this.$dropdownContainer = $('<ul class="dropdown-menu"/>');

        // Focus btn
        if(this.options.addFocusBtn) {
            // Create focus btn group
            this.$focusGroup = $('<div class="btn-group focus-btn-group" />');

            // Create focus btn
            this.$focusBtn = $('<button class="btn btn-default">Focus</button>');

            if(this.options.focusBtnIcon) {
                this.$focusBtn.prepend('<span class="' + this.options.focusBtnIcon + '"></span> ');
            }

            // Add btn to group
            this.$focusGroup.append(this.$focusBtn);
            // Add focus btn to toolbar
            this.$btnToolbar.append(this.$focusGroup);

            // bind click on focus btn
            this.$focusBtn.click(function(){
                $.proxy(that.activateFocus(), that);
            });

            // bind click on rows
            this.$bodyRows.click(function(){
                $.proxy(that.focusOnRow($(this)), that);
            });
        }

         // Display-all btn
        if(this.options.addDisplayAllBtn) {
            // Create display-all btn
            this.$displayAllBtn = $('<button class="btn btn-default">Display all</button>');
            // Add display-all btn to dropdown-btn-group
            this.$dropdownGroup.append(this.$displayAllBtn);

            if (this.$table.hasClass('display-all')) {
                // add 'btn-primary' class to btn to indicate that display all is activated
                this.$displayAllBtn.addClass('btn-primary');
            }

            // bind click on display-all btn
            this.$displayAllBtn.click(function(){
                $.proxy(that.displayAll(null, true), that);
            });
        }

        //add dropdown btn and menu to dropdown-btn-group
        this.$dropdownGroup.append(this.$dropdownBtn).append(this.$dropdownContainer);

        //add dropdown group to toolbar
        this.$btnToolbar.append(this.$dropdownGroup);

        // add toolbar above table
        this.$tableScrollWrapper.before(this.$btnToolbar);
    };

    ResponsiveTable.prototype.clearAllFocus = function() {
        this.$bodyRows.removeClass('unfocused');
        this.$bodyRows.removeClass('focused');
    };

    ResponsiveTable.prototype.activateFocus = function() {
        // clear all
        this.clearAllFocus();

        if(this.$focusBtn){
            this.$focusBtn.toggleClass('btn-primary');
        }

        this.$table.toggleClass('focus-on');
    };

    ResponsiveTable.prototype.focusOnRow = function(row) {
        // only if activated (.i.e the table has the class focus-on)
        if(this.$table.hasClass('focus-on')) {
            var alreadyFocused = $(row).hasClass('focused');

            // clear all
            this.clearAllFocus();

            if(!alreadyFocused) {
                this.$bodyRows.addClass('unfocused');
                $(row).addClass('focused');
            }
        }
    };

    /**
     * @param activate Forces the displayAll to be active or not. If anything else than bool, it will not force the state so it will toggle as normal.
     * @param trigger Bool to indicate if the displayAllTrigger should be triggered.
     */
    ResponsiveTable.prototype.displayAll = function(activate, trigger) {
        if(this.$displayAllBtn){
            // add 'btn-primary' class to btn to indicate that display all is activated
            this.$displayAllBtn.toggleClass('btn-primary', activate);
        }

        this.$table.toggleClass('display-all', activate);
        if(this.$tableClone){
            this.$tableClone.toggleClass('display-all', activate);
        }

        if(trigger) {
            $(window).trigger(this.displayAllTrigger);
        }
    };

    ResponsiveTable.prototype.preserveDisplayAll = function() {
        var displayProp = 'table-cell';
        if($('html').hasClass('lt-ie9')){
            displayProp = 'inline';
        }

        $(this.$table).find('th, td').css('display', displayProp);
        if(this.$tableClone){
            $(this.$tableClone).find('th, td').css('display', displayProp);
        }
    };

    ResponsiveTable.prototype.createStickyTableHeader = function() {
        var that = this;

        //clone table head
        that.$tableClone = that.$table.clone();

        //replace ids
        that.$tableClone.prop('id', this.id + '-clone');
        that.$tableClone.find('[id]').each(function() {
            $(this).prop('id', $(this).prop('id') + '-clone');
        });

        // wrap table clone (this is our "sticky table header" now)
        that.$tableClone.wrap('<div class="sticky-table-header"/>');
        that.$stickyTableHeader = that.$tableClone.parent();

        // give the sticky table header same height as original
        that.$stickyTableHeader.css('height', that.$thead.height() + 2);

        //insert sticky table header
        if($('html').hasClass('lt-ie10')){
            that.$tableWrapper.prepend(that.$stickyTableHeader);
        } else {
            that.$table.before(that.$stickyTableHeader);
        }

        // var bodyRowsClone = $(tableClone).find('tbody').find('tr');

        // bind scroll and resize with updateStickyTableHeader
        $(window).bind('scroll resize', function(){
            $.proxy(that.updateStickyTableHeader(), that);
        });

        $(that.$tableScrollWrapper).bind('scroll', function(){
            $.proxy(that.updateStickyTableHeader(), that);
        });
    };

    // Help function for sticky table header
    ResponsiveTable.prototype.updateStickyTableHeader = function() {
        var that              = this,
          top               = 0,
          offsetTop         = that.$table.offset().top,
          scrollTop         = $(window).scrollTop() -1, //-1 to accomodate for top border
          maxTop            = that.$table.height() - that.$stickyTableHeader.height(),
          rubberBandOffset  = (scrollTop + $(window).height()) - $(document).height(),
        //          useFixedSolution  = that.$table.parent().prop('scrollWidth') === that.$table.parent().width();
          useFixedSolution  = !that.iOS,
          navbarHeight      = 0;

        //Is there a fixed navbar?
        if($(that.options.fixedNavbar).length) {
            var $navbar = $(that.options.fixedNavbar).first();
            navbarHeight = $navbar.height();
            scrollTop = scrollTop + navbarHeight;
        }

        var shouldBeVisible   = (scrollTop > offsetTop) && (scrollTop < offsetTop + that.$table.height());

        if(useFixedSolution) {
            that.$stickyTableHeader.scrollLeft(that.$tableScrollWrapper.scrollLeft());

            //add fixedSolution class
            that.$stickyTableHeader.addClass('fixed-solution');

            // Calculate top property value (-1 to accomodate for top border)
            top = navbarHeight - 1;

            // When the about to scroll past the table, move sticky table head up
            if(((scrollTop - offsetTop) > maxTop)){
                top -= ((scrollTop - offsetTop) - maxTop);
                that.$stickyTableHeader.addClass('border-radius-fix');
            } else {
                that.$stickyTableHeader.removeClass('border-radius-fix');
            }

            if (shouldBeVisible) {
                //show sticky table header and update top and width.
                that.$stickyTableHeader.css({ 'visibility': 'visible', 'top': top + 'px', 'width': that.$tableScrollWrapper.innerWidth() + 'px'});

                //no more stuff to do - return!
                return;
            } else {
                //hide sticky table header and reset width
                that.$stickyTableHeader.css({'visibility': 'hidden', 'width': 'auto' });
            }

        } else { // alternate method
            //remove fixedSolution class
            that.$stickyTableHeader.removeClass('fixed-solution');

            //animation duration
            var animationDuration = 400;

            // Calculate top property value (-1 to accomodate for top border)
            top = scrollTop - offsetTop - 1;

            // Make sure the sticky table header doesn't slide up/down too far.
            if(top < 0) {
                top = 0;
            } else if (top > maxTop) {
                top = maxTop;
            }

            // Accomandate for rubber band effect
            if(rubberBandOffset > 0) {
                top = top - rubberBandOffset;
            }

            if (shouldBeVisible) {
                //show sticky table header (animate repositioning)
                that.$stickyTableHeader.css({ 'visibility': 'visible' });
                that.$stickyTableHeader.animate({ 'top': top + 'px' }, animationDuration);

                // hide original table head
                that.$thead.css({ 'visibility': 'hidden' });

            } else {

                that.$stickyTableHeader.animate({ 'top': '0' }, animationDuration, function(){
                    // show original table head
                    that.$thead.css({ 'visibility': 'visible' });

                    // hide sticky table head
                    that.$stickyTableHeader.css({ 'visibility': 'hidden' });
                });
            }
        }
    };

    // Setup header cells
    ResponsiveTable.prototype.setupHdrCells = function() {
        var that = this;

        // for each header column
        that.$hdrCells.each(function(i){
            var $th = $(this),
                id = $th.prop('id'),
                thText = $th.text();

            // assign an id to each header, if none is in the markup
            if (!id) {
                id = that.idPrefix + i;
                $th.prop('id', id);
            }

            if(thText === ''){
                thText = $th.attr('data-col-name');
            }

            // create the hide/show toggle for the current column
            if ( $th.is('[data-priority]') ) {
                var $toggle = $('<li class="checkbox-row"><input type="checkbox" name="toggle-'+id+'" id="toggle-'+id+'" value="'+id+'" /> <label for="toggle-'+id+'">'+ thText +'</label></li>');
                var $checkbox = $toggle.find('input');

                that.$dropdownContainer.append($toggle);

                $toggle.click(function(){
                    // console.log("cliiiick!");
                    $checkbox.prop('checked', !$checkbox.prop('checked'));
                    $checkbox.trigger('change');
                });

                //Freakin' IE fix
                if ($('html').hasClass('lt-ie9')) {
                    $checkbox.click(function() {
                        $(this).trigger('change');
                    });
                }

                $toggle.find('label').click(function(event){
                    event.stopPropagation();
                });

                $toggle.find('input')
                    .click(function(event){
                        event.stopPropagation();
                    })
                .change(function(){ // bind change event on checkbox
                    var $checkbox = $(this),
                        val = $checkbox.val(),
                        //all cells under the column, including the header and its clone
                        $cells = that.$tableWrapper.find('#' + val + ', #' + val + '-clone, [data-columns~='+ val +']');

                    //if display-all is on - save state and carry on
                    if(that.$table.hasClass('display-all')){
                        //save state
                        $.proxy(that.preserveDisplayAll(), that);
                        //remove display all class
                        that.$table.removeClass('display-all');
                        if(that.$tableClone){
                            that.$tableClone.removeClass('display-all');
                        }
                        //switch off button
                        that.$displayAllBtn.removeClass('btn-primary');
                    }

                    // loop through the cells
                    $cells.each(function(){
                        var $cell = $(this);

                        // is the checkbox checked now?
                        if ($checkbox.is(':checked')) {

                            // if the cell was already visible, it means its original colspan was >1
                            // so let's increment the colspan
                            if($cell.css('display') !== 'none'){
                                $cell.prop('colSpan', parseInt($cell.prop('colSpan')) + 1);
                            }

                            // show cell
                            $cell.show();

                        }
                      // checkbox has been unchecked
                      else {
                            // decrement colSpan if it's not 1 (because colSpan should not be 0)
                            if(parseInt($cell.prop('colSpan'))>1){
                                $cell.prop('colSpan', parseInt($cell.prop('colSpan')) - 1);
                            }
                            // otherwise, hide the cell
                            else {
                                $cell.hide();
                            }
                        }
                    });
                })
                .bind('updateCheck', function(){
                    if ( $th.css('display') !== 'none') {
                        $(this).prop('checked', true);
                    }
                    else {
                        $(this).prop('checked', false);
                    }
                })
                .trigger('updateCheck');
            } // end if
        }); // end hdrCells loop 
    };

    // Setup standard cells
    // assign matching "data-columns" attributes to the associated cells "(cells with colspan>1 has multiple columns).
    ResponsiveTable.prototype.setupStandardCells = function() {
        var that = this;

        // for each body rows
        that.$bodyRows.each(function(){
            var idStart = 0;

            // for each cell
            $(this).find('th, td').each(function(){
                var $cell = $(this);
                var columnsAttr = '';

                var colSpan = $cell.prop('colSpan');

                var numOfHidden = 0;
                // loop through columns that the cell spans over
                for (var k = idStart; k < (idStart + colSpan); k++) {
                    // add column id
                    columnsAttr = columnsAttr + ' ' + that.idPrefix + k;

                    // get column header
                    var $colHdr = that.$tableScrollWrapper.find('#' + that.idPrefix + k);

                    // copy data-priority attribute from column header
                    var dataPriority = $colHdr.attr('data-priority');
                    if (dataPriority) { $cell.attr('data-priority', dataPriority); }

                    if($colHdr.css('display')==='none'){
                        numOfHidden++;
                    }

                }

                // if colSpan is more than 1
                if(colSpan > 1) {
                    //give it the class 'spn-cell';
                    $cell.addClass('spn-cell');

                    // if one of the columns that the cell belongs to is visible then show the cell
                    if(numOfHidden !== colSpan){
                        $cell.show();
                    } else {
                        $cell.hide(); //just in case
                    }
                }

                //update colSpan to match number of visible columns that i belongs to
                $cell.prop('colSpan',Math.max((colSpan - numOfHidden),1));

                //remove whitespace in begining of string.
                columnsAttr = columnsAttr.substring(1);

                //set attribute to cell
                $cell.attr('data-columns', columnsAttr);

                //increment idStart with the current cells colSpan.
                idStart = idStart + colSpan;
            });
        });
    };

    // Update colspan and visibility of spanning cells
    ResponsiveTable.prototype.updateSpanningCells = function() {
        var that = this;

        // iterate through cells with class 'spn-cell'
        that.$table.find('.spn-cell').each( function(){
            var $cell = $(this);
            var columnsAttr = $cell.attr('data-columns').split(' ');

            var colSpan = columnsAttr.length;
            var numOfHidden = 0;
            for (var i = 0; i < colSpan; i++) {
                if($('#' + columnsAttr[i]).css('display')==='none'){
                    numOfHidden++;
                }
            }

            // if one of the columns that the cell belongs to is visible then show the cell
            if(numOfHidden !== colSpan){
                $cell.show();
            } else {
                $cell.hide(); //just in case
            }

            // console.log('numOfHidden: ' + numOfHidden);
            // console.log("new colSpan:" +Math.max((colSpan - numOfHidden),1));

            //update colSpan to match number of visible columns that i belongs to
            $cell.prop('colSpan',Math.max((colSpan - numOfHidden),1));
        });
    };

    // RESPONSIVE TABLE PLUGIN DEFINITION
    // ===========================

    var old = $.fn.responsiveTable;

    $.fn.responsiveTable = function (option) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('responsiveTable');
            var options = $.extend({}, ResponsiveTable.DEFAULTS, $this.data(), typeof option === 'object' && option);

            if(options.pattern === '') {
                return;
            }

            if (!data) {
                $this.data('responsiveTable', (data = new ResponsiveTable(this, options)));
            }
            if (typeof option === 'string') {
                data[option]();
            }
        });
    };

    $.fn.responsiveTable.Constructor = ResponsiveTable;


    // RESPONSIVE TABLE NO CONFLICT
    // =====================

    $.fn.responsiveTable.noConflict = function () {
        $.fn.responsiveTable = old;
        return this;
    };

    // RESPONSIVE TABLE DATA-API
    // ==================

    $(document).on('ready.responsive-table.data-api', function () {
        $('[data-pattern]').each(function () {
            var $tableScrollWrapper = $(this);
            $tableScrollWrapper.responsiveTable($tableScrollWrapper.data());
        });
    });


    // DROPDOWN
    // ==========================

    // Prevent dropdown from closing when toggling checkbox
    $(document).on('click.dropdown.data-api', '.dropdown-menu .checkbox-row', function (e) {
        e.stopPropagation();
    });

    // FEATURE DETECTION (instead of Modernizr)
    // ==========================

    // media queries
    function mediaQueriesSupported() {
        return (typeof window.matchMedia !== 'undefined' || typeof window.msMatchMedia !== 'undefined' || typeof window.styleMedia !== 'undefined');
    }

    // touch
    function hasTouch() {
        return 'ontouchstart' in window;
    }

    // Checks if current browser is on IOS.
    function isIOS() {
        return !!(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i));
    }


    $(document).ready(function() {
        // Change `no-js` to `js`
        $('html').removeClass('no-js').addClass('js');

        // Add mq/no-mq class to html
        if(mediaQueriesSupported()) {
            $('html').addClass('mq');
        } else {
            $('html').addClass('no-mq');
        }

        // Add touch/no-touch class to html
        if(hasTouch()) {
            $('html').addClass('touch');
        } else {
            $('html').addClass('no-touch');
        }
    });
})(jQuery);