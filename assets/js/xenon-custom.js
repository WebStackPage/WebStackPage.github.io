/**
 *	Xenon Main
 *
 *	Theme by: www.laborator.co
 **/

var public_vars = public_vars || {};

;(function($, window, undefined){

	"use strict";

	$(document).ready(function()
	{
		// Main Vars
		public_vars.$body                 = $("body");
		public_vars.$pageContainer        = public_vars.$body.find(".page-container");
		public_vars.$chat                 = public_vars.$pageContainer.find("#chat");
		public_vars.$sidebarMenu          = public_vars.$pageContainer.find('.sidebar-menu');
		public_vars.$sidebarProfile       = public_vars.$sidebarMenu.find('.sidebar-user-info');
		public_vars.$mainMenu             = public_vars.$sidebarMenu.find('.main-menu');

		public_vars.$horizontalNavbar     = public_vars.$body.find('.navbar.horizontal-menu');
		public_vars.$horizontalMenu       = public_vars.$horizontalNavbar.find('.navbar-nav');

		public_vars.$mainContent          = public_vars.$pageContainer.find('.main-content');
		public_vars.$mainFooter           = public_vars.$body.find('footer.main-footer');

		public_vars.$userInfoMenuHor      = public_vars.$body.find('.navbar.horizontal-menu');
		public_vars.$userInfoMenu         = public_vars.$body.find('nav.navbar.user-info-navbar');

		public_vars.$settingsPane         = public_vars.$body.find('.settings-pane');
		public_vars.$settingsPaneIn       = public_vars.$settingsPane.find('.settings-pane-inner');

		public_vars.wheelPropagation      = true; // used in Main menu (sidebar)

		public_vars.$pageLoadingOverlay   = public_vars.$body.find('.page-loading-overlay');

		public_vars.defaultColorsPalette = ['#68b828','#7c38bc','#0e62c7','#fcd036','#4fcdfc','#00b19d','#ff6264','#f7aa47'];



		// Page Loading Overlay
		if(public_vars.$pageLoadingOverlay.length)
		{
			$(window).load(function()
			{
				public_vars.$pageLoadingOverlay.addClass('loaded');
			});
		}

		window.onerror = function()
		{
			// failsafe remove loading overlay
			public_vars.$pageLoadingOverlay.addClass('loaded');
		}


		// Setup Sidebar Menu
		setup_sidebar_menu();


		// Setup Horizontal Menu
		setup_horizontal_menu();


		// Sticky Footer
		if(public_vars.$mainFooter.hasClass('sticky'))
		{
			stickFooterToBottom();
			$(window).on('xenon.resized', stickFooterToBottom);
		}


		// Perfect Scrollbar
		if($.isFunction($.fn.perfectScrollbar))
		{
			if(public_vars.$sidebarMenu.hasClass('fixed'))
				ps_init();

			$(".ps-scrollbar").each(function(i, el)
			{
				var $el = $(el);

				if($el.hasClass('ps-scroll-down'))
				{
					$el.scrollTop($el.prop('scrollHeight'));
				}

				$el.perfectScrollbar({
					wheelPropagation: false
				});
			});


			// Chat Scrollbar
			var $chat_inner = public_vars.$pageContainer.find('#chat .chat-inner');

			if($chat_inner.parent().hasClass('fixed'))
				$chat_inner.css({maxHeight: $(window).height()}).perfectScrollbar();


			// User info opening dropdown trigger PS update
			$(".dropdown:has(.ps-scrollbar)").each(function(i, el)
			{
				var $scrollbar = $(this).find('.ps-scrollbar');

				$(this).on('click', '[data-toggle="dropdown"]', function(ev)
				{
					ev.preventDefault();

					setTimeout(function()
					{
						$scrollbar.perfectScrollbar('update');
					}, 1);
				});
			});


			// Scrollable
			$("div.scrollable").each(function(i, el)
			{
				var $this = $(el),
					max_height = parseInt(attrDefault($this, 'max-height', 200), 10);

				max_height = max_height < 0 ? 200 : max_height;

				$this.css({maxHeight: max_height}).perfectScrollbar({
					wheelPropagation: true
				});
			});
		}


		// User info search button
		var $uim_search_form = $(".user-info-menu .search-form, .nav.navbar-right .search-form");

		$uim_search_form.each(function(i, el)
		{
			var $uim_search_input = $(el).find('.form-control');

			$(el).on('click', '.btn', function(ev)
			{
				if($uim_search_input.val().trim().length == 0)
				{
					jQuery(el).addClass('focused');
					setTimeout(function(){ $uim_search_input.focus(); }, 100);
					return false;
				}
			});

			$uim_search_input.on('blur', function()
			{
				jQuery(el).removeClass('focused');
			});
		});



		// Fixed Footer
		if(public_vars.$mainFooter.hasClass('fixed'))
		{
			public_vars.$mainContent.css({
				paddingBottom: public_vars.$mainFooter.outerHeight(true)
			});
		}



		// Go to top links
		$('body').on('click', 'a[rel="go-top"]', function(ev)
		{
			ev.preventDefault();

			var obj = {pos: $(window).scrollTop()};

			TweenLite.to(obj, .3, {pos: 0, ease:Power4.easeOut, onUpdate: function()
			{
				$(window).scrollTop(obj.pos);
			}});
		});




		// User info navbar equal heights
		if(public_vars.$userInfoMenu.length)
		{
			public_vars.$userInfoMenu.find('.user-info-menu > li').css({
				minHeight: public_vars.$userInfoMenu.outerHeight() - 1
			});
		}



		// Autosize
		if($.isFunction($.fn.autosize))
		{
			$(".autosize, .autogrow").autosize();
		}


		// Custom Checkboxes & radios
		cbr_replace();



		// Auto hidden breadcrumbs
		$(".breadcrumb.auto-hidden").each(function(i, el)
		{
			var $bc = $(el),
				$as = $bc.find('li a'),
				collapsed_width = $as.width(),
				expanded_width = 0;

			$as.each(function(i, el)
			{
				var $a = $(el);

				expanded_width = $a.outerWidth(true) + 5;
				$a.addClass('collapsed').width(expanded_width);

				$a.hover(function()
				{
					$a.removeClass('collapsed');
				},
				function()
				{
					$a.addClass('collapsed');
				});
			});
		});



		// Close Modal on Escape Keydown
		$(window).on('keydown', function(ev)
		{
			// Escape
			if(ev.keyCode == 27)
			{
				// Close opened modal
				if(public_vars.$body.hasClass('modal-open'))
					$(".modal-open .modal:visible").modal('hide');
			}
		});


		// Minimal Addon focus interaction
		$(".input-group.input-group-minimal:has(.form-control)").each(function(i, el)
		{
			var $this = $(el),
				$fc = $this.find('.form-control');

			$fc.on('focus', function()
			{
				$this.addClass('focused');
			}).on('blur', function()
			{
				$this.removeClass('focused');
			});
		});



		// Spinner
		$(".input-group.spinner").each(function(i, el)
		{
			var $ig = $(el),
				$dec = $ig.find('[data-type="decrement"]'),
				$inc = $ig.find('[data-type="increment"]'),
				$inp = $ig.find('.form-control'),

				step = attrDefault($ig, 'step', 1),
				min = attrDefault($ig, 'min', 0),
				max = attrDefault($ig, 'max', 0),
				umm = min < max;


			$dec.on('click', function(ev)
			{
				ev.preventDefault();

				var num = new Number($inp.val()) - step;

				if(umm && num <= min)
				{
					num = min;
				}

				$inp.val(num);
			});

			$inc.on('click', function(ev)
			{
				ev.preventDefault();

				var num = new Number($inp.val()) + step;

				if(umm && num >= max)
				{
					num = max;
				}

				$inp.val(num);
			});
		});




		// Select2 Dropdown replacement
		if($.isFunction($.fn.select2))
		{
			$(".select2").each(function(i, el)
			{
				var $this = $(el),
					opts = {
						allowClear: attrDefault($this, 'allowClear', false)
					};

				$this.select2(opts);
				$this.addClass('visible');

				//$this.select2("open");
			});


			if($.isFunction($.fn.niceScroll))
			{
				$(".select2-results").niceScroll({
					cursorcolor: '#d4d4d4',
					cursorborder: '1px solid #ccc',
					railpadding: {right: 3}
				});
			}
		}




		// SelectBoxIt Dropdown replacement
		if($.isFunction($.fn.selectBoxIt))
		{
			$("select.selectboxit").each(function(i, el)
			{
				var $this = $(el),
					opts = {
						showFirstOption: attrDefault($this, 'first-option', true),
						'native': attrDefault($this, 'native', false),
						defaultText: attrDefault($this, 'text', ''),
					};

				$this.addClass('visible');
				$this.selectBoxIt(opts);
			});
		}



		// Datepicker
		if($.isFunction($.fn.datepicker))
		{
			$(".datepicker").each(function(i, el)
			{
				var $this = $(el),
					opts = {
						format: attrDefault($this, 'format', 'mm/dd/yyyy'),
						startDate: attrDefault($this, 'startDate', ''),
						endDate: attrDefault($this, 'endDate', ''),
						daysOfWeekDisabled: attrDefault($this, 'disabledDays', ''),
						startView: attrDefault($this, 'startView', 0),
						rtl: rtl()
					},
					$n = $this.next(),
					$p = $this.prev();

				$this.datepicker(opts);

				if($n.is('.input-group-addon') && $n.has('a'))
				{
					$n.on('click', function(ev)
					{
						ev.preventDefault();

						$this.datepicker('show');
					});
				}

				if($p.is('.input-group-addon') && $p.has('a'))
				{
					$p.on('click', function(ev)
					{
						ev.preventDefault();

						$this.datepicker('show');
					});
				}
			});
		}



		// Date Range Picker
		if($.isFunction($.fn.daterangepicker))
		{
			$(".daterange").each(function(i, el)
			{
				// Change the range as you desire
				var ranges = {
					'Today': [moment(), moment()],
					'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
					'Last 7 Days': [moment().subtract('days', 6), moment()],
					'Last 30 Days': [moment().subtract('days', 29), moment()],
					'This Month': [moment().startOf('month'), moment().endOf('month')],
					'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
				};

				var $this = $(el),
					opts = {
						format: attrDefault($this, 'format', 'MM/DD/YYYY'),
						timePicker: attrDefault($this, 'timePicker', false),
						timePickerIncrement: attrDefault($this, 'timePickerIncrement', false),
						separator: attrDefault($this, 'separator', ' - '),
					},
					min_date = attrDefault($this, 'minDate', ''),
					max_date = attrDefault($this, 'maxDate', ''),
					start_date = attrDefault($this, 'startDate', ''),
					end_date = attrDefault($this, 'endDate', '');

				if($this.hasClass('add-ranges'))
				{
					opts['ranges'] = ranges;
				}

				if(min_date.length)
				{
					opts['minDate'] = min_date;
				}

				if(max_date.length)
				{
					opts['maxDate'] = max_date;
				}

				if(start_date.length)
				{
					opts['startDate'] = start_date;
				}

				if(end_date.length)
				{
					opts['endDate'] = end_date;
				}


				$this.daterangepicker(opts, function(start, end)
				{
					var drp = $this.data('daterangepicker');

					if($this.is('[data-callback]'))
					{
						//daterange_callback(start, end);
						callback_test(start, end);
					}

					if($this.hasClass('daterange-inline'))
					{
						$this.find('span').html(start.format(drp.format) + drp.separator + end.format(drp.format));
					}
				});

				if(typeof opts['ranges'] == 'object')
				{
					$this.data('daterangepicker').container.removeClass('show-calendar');
				}
			});
		}



		// Timepicker
		if($.isFunction($.fn.timepicker))
		{
			$(".timepicker").each(function(i, el)
			{
				var $this = $(el),
					opts = {
						template: attrDefault($this, 'template', false),
						showSeconds: attrDefault($this, 'showSeconds', false),
						defaultTime: attrDefault($this, 'defaultTime', 'current'),
						showMeridian: attrDefault($this, 'showMeridian', true),
						minuteStep: attrDefault($this, 'minuteStep', 15),
						secondStep: attrDefault($this, 'secondStep', 15)
					},
					$n = $this.next(),
					$p = $this.prev();

				$this.timepicker(opts);

				if($n.is('.input-group-addon') && $n.has('a'))
				{
					$n.on('click', function(ev)
					{
						ev.preventDefault();

						$this.timepicker('showWidget');
					});
				}

				if($p.is('.input-group-addon') && $p.has('a'))
				{
					$p.on('click', function(ev)
					{
						ev.preventDefault();

						$this.timepicker('showWidget');
					});
				}
			});
		}



		// Colorpicker
		if($.isFunction($.fn.colorpicker))
		{
			$(".colorpicker").each(function(i, el)
			{
				var $this = $(el),
					opts = {
					},
					$n = $this.next(),
					$p = $this.prev(),

					$preview = $this.siblings('.input-group-addon').find('.color-preview');

				$this.colorpicker(opts);

				if($n.is('.input-group-addon') && $n.has('a'))
				{
					$n.on('click', function(ev)
					{
						ev.preventDefault();

						$this.colorpicker('show');
					});
				}

				if($p.is('.input-group-addon') && $p.has('a'))
				{
					$p.on('click', function(ev)
					{
						ev.preventDefault();

						$this.colorpicker('show');
					});
				}

				if($preview.length)
				{
					$this.on('changeColor', function(ev){

						$preview.css('background-color', ev.color.toHex());
					});

					if($this.val().length)
					{
						$preview.css('background-color', $this.val());
					}
				}
			});
		}




		// Form Validation
		if($.isFunction($.fn.validate))
		{
			$("form.validate").each(function(i, el)
			{
				var $this = $(el),
					opts = {
						rules: {},
						messages: {},
						errorElement: 'span',
						errorClass: 'validate-has-error',
						highlight: function (element) {
							$(element).closest('.form-group').addClass('validate-has-error');
						},
						unhighlight: function (element) {
							$(element).closest('.form-group').removeClass('validate-has-error');
						},
						errorPlacement: function (error, element)
						{
							if(element.closest('.has-switch').length)
							{
								error.insertAfter(element.closest('.has-switch'));
							}
							else
							if(element.parent('.checkbox, .radio').length || element.parent('.input-group').length)
							{
								error.insertAfter(element.parent());
							}
							else
							{
								error.insertAfter(element);
							}
						}
					},
					$fields = $this.find('[data-validate]');


				$fields.each(function(j, el2)
				{
					var $field = $(el2),
						name = $field.attr('name'),
						validate = attrDefault($field, 'validate', '').toString(),
						_validate = validate.split(',');

					for(var k in _validate)
					{
						var rule = _validate[k],
							params,
							message;

						if(typeof opts['rules'][name] == 'undefined')
						{
							opts['rules'][name] = {};
							opts['messages'][name] = {};
						}

						if($.inArray(rule, ['required', 'url', 'email', 'number', 'date', 'creditcard']) != -1)
						{
							opts['rules'][name][rule] = true;

							message = $field.data('message-' + rule);

							if(message)
							{
								opts['messages'][name][rule] = message;
							}
						}
						// Parameter Value (#1 parameter)
						else
						if(params = rule.match(/(\w+)\[(.*?)\]/i))
						{
							if($.inArray(params[1], ['min', 'max', 'minlength', 'maxlength', 'equalTo']) != -1)
							{
								opts['rules'][name][params[1]] = params[2];


								message = $field.data('message-' + params[1]);

								if(message)
								{
									opts['messages'][name][params[1]] = message;
								}
							}
						}
					}
				});

				$this.validate(opts);
			});
		}




		// Input Mask
		if($.isFunction($.fn.inputmask))
		{
			$("[data-mask]").each(function(i, el)
			{
				var $this = $(el),
					mask = $this.data('mask').toString(),
					opts = {
						numericInput: attrDefault($this, 'numeric', false),
						radixPoint: attrDefault($this, 'radixPoint', ''),
						rightAlign: attrDefault($this, 'numericAlign', 'left') == 'right'
					},
					placeholder = attrDefault($this, 'placeholder', ''),
					is_regex = attrDefault($this, 'isRegex', '');

				if(placeholder.length)
				{
					opts[placeholder] = placeholder;
				}

				switch(mask.toLowerCase())
				{
					case "phone":
						mask = "(999) 999-9999";
						break;

					case "currency":
					case "rcurrency":

						var sign = attrDefault($this, 'sign', '$');;

						mask = "999,999,999.99";

						if($this.data('mask').toLowerCase() == 'rcurrency')
						{
							mask += ' ' + sign;
						}
						else
						{
							mask = sign + ' ' + mask;
						}

						opts.numericInput = true;
						opts.rightAlignNumerics = false;
						opts.radixPoint = '.';
						break;

					case "email":
						mask = 'Regex';
						opts.regex = "[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,4}";
						break;

					case "fdecimal":
						mask = 'decimal';
						$.extend(opts, {
							autoGroup		: true,
							groupSize		: 3,
							radixPoint		: attrDefault($this, 'rad', '.'),
							groupSeparator	: attrDefault($this, 'dec', ',')
						});
				}

				if(is_regex)
				{
					opts.regex = mask;
					mask = 'Regex';
				}

				$this.inputmask(mask, opts);
			});
		}



		// Form Wizard
		if($.isFunction($.fn.bootstrapWizard))
		{
			$(".form-wizard").each(function(i, el)
			{
				var $this = $(el),
					$tabs = $this.find('> .tabs > li'),
					$progress = $this.find(".progress-indicator"),
					_index = $this.find('> ul > li.active').index();

				// Validation
				var checkFormWizardValidaion = function(tab, navigation, index)
					{
			  			if($this.hasClass('validate'))
			  			{
							var $valid = $this.valid();

							if( ! $valid)
							{
								$this.data('validator').focusInvalid();
								return false;
							}
						}

				  		return true;
					};

				// Setup Progress
				if(_index > 0)
				{
					$progress.css({width: _index/$tabs.length * 100 + '%'});
					$tabs.removeClass('completed').slice(0, _index).addClass('completed');
				}

				$this.bootstrapWizard({
					tabClass: "",
			  		onTabShow: function($tab, $navigation, index)
			  		{
			  			var pct = $tabs.eq(index).position().left / $tabs.parent().width() * 100;

			  			$tabs.removeClass('completed').slice(0, index).addClass('completed');
			  			$progress.css({width: pct + '%'});
			  		},

			  		onNext: checkFormWizardValidaion,
			  		onTabClick: checkFormWizardValidaion
			  	});

			  	$this.data('bootstrapWizard').show( _index );

			  	$this.find('.pager a').on('click', function(ev)
			  	{
				  	ev.preventDefault();
			  	});
			});
		}




		// Slider
		if($.isFunction($.fn.slider))
		{
			$(".slider").each(function(i, el)
			{
				var $this = $(el),
					$label_1 = $('<span class="ui-label"></span>'),
					$label_2 = $label_1.clone(),

					orientation = attrDefault($this, 'vertical', 0) != 0 ? 'vertical' : 'horizontal',

					prefix = attrDefault($this, 'prefix', ''),
					postfix = attrDefault($this, 'postfix', ''),

					fill = attrDefault($this, 'fill', ''),
					$fill = $(fill),

					step = attrDefault($this, 'step', 1),
					value = attrDefault($this, 'value', 5),
					min = attrDefault($this, 'min', 0),
					max = attrDefault($this, 'max', 100),
					min_val = attrDefault($this, 'min-val', 10),
					max_val = attrDefault($this, 'max-val', 90),

					is_range = $this.is('[data-min-val]') || $this.is('[data-max-val]'),

					reps = 0;


				// Range Slider Options
				if(is_range)
				{
					$this.slider({
						range: true,
						orientation: orientation,
						min: min,
						max: max,
						values: [min_val, max_val],
						step: step,
						slide: function(e, ui)
						{
							var min_val = (prefix ? prefix : '') + ui.values[0] + (postfix ? postfix : ''),
								max_val = (prefix ? prefix : '') + ui.values[1] + (postfix ? postfix : '');

							$label_1.html( min_val );
							$label_2.html( max_val );

							if(fill)
								$fill.val(min_val + ',' + max_val);

							reps++;
						},
						change: function(ev, ui)
						{
							if(reps == 1)
							{
								var min_val = (prefix ? prefix : '') + ui.values[0] + (postfix ? postfix : ''),
									max_val = (prefix ? prefix : '') + ui.values[1] + (postfix ? postfix : '');

								$label_1.html( min_val );
								$label_2.html( max_val );

								if(fill)
									$fill.val(min_val + ',' + max_val);
							}

							reps = 0;
						}
					});

					var $handles = $this.find('.ui-slider-handle');

					$label_1.html((prefix ? prefix : '') + min_val + (postfix ? postfix : ''));
					$handles.first().append( $label_1 );

					$label_2.html((prefix ? prefix : '') + max_val+ (postfix ? postfix : ''));
					$handles.last().append( $label_2 );
				}
				// Normal Slider
				else
				{

					$this.slider({
						range: attrDefault($this, 'basic', 0) ? false : "min",
						orientation: orientation,
						min: min,
						max: max,
						value: value,
						step: step,
						slide: function(ev, ui)
						{
							var val = (prefix ? prefix : '') + ui.value + (postfix ? postfix : '');

							$label_1.html( val );


							if(fill)
								$fill.val(val);

							reps++;
						},
						change: function(ev, ui)
						{
							if(reps == 1)
							{
								var val = (prefix ? prefix : '') + ui.value + (postfix ? postfix : '');

								$label_1.html( val );

								if(fill)
									$fill.val(val);
							}

							reps = 0;
						}
					});

					var $handles = $this.find('.ui-slider-handle');
						//$fill = $('<div class="ui-fill"></div>');

					$label_1.html((prefix ? prefix : '') + value + (postfix ? postfix : ''));
					$handles.html( $label_1 );

					//$handles.parent().prepend( $fill );

					//$fill.width($handles.get(0).style.left);
				}

			})
		}




		// jQuery Knob
		if($.isFunction($.fn.knob))
		{
			$(".knob").knob({
				change: function (value) {
				},
				release: function (value) {
				},
				cancel: function () {
				},
				draw: function () {

					if (this.$.data('skin') == 'tron') {

						var a = this.angle(this.cv) // Angle
							,
							sa = this.startAngle // Previous start angle
							,
							sat = this.startAngle // Start angle
							,
							ea // Previous end angle
							, eat = sat + a // End angle
							,
							r = 1;

						this.g.lineWidth = this.lineWidth;

						this.o.cursor && (sat = eat - 0.3) && (eat = eat + 0.3);

						if (this.o.displayPrevious) {
							ea = this.startAngle + this.angle(this.v);
							this.o.cursor && (sa = ea - 0.3) && (ea = ea + 0.3);
							this.g.beginPath();
							this.g.strokeStyle = this.pColor;
							this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
							this.g.stroke();
						}

						this.g.beginPath();
						this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
						this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
						this.g.stroke();

						this.g.lineWidth = 2;
						this.g.beginPath();
						this.g.strokeStyle = this.o.fgColor;
						this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
						this.g.stroke();

						return false;
					}
				}
			});
		}




		// Wysiwyg Editor
		if($.isFunction($.fn.wysihtml5))
		{
			$(".wysihtml5").each(function(i, el)
			{
				var $this = $(el),
					stylesheets = attrDefault($this, 'stylesheet-url', '')

				$(".wysihtml5").wysihtml5({
					size: 'white',
					stylesheets: stylesheets.split(','),
					"html": attrDefault($this, 'html', true),
					"color": attrDefault($this, 'colors', true),
				});
			});
		}




		// CKeditor WYSIWYG
		if($.isFunction($.fn.ckeditor))
		{
			$(".ckeditor").ckeditor({
				contentsLangDirection: rtl() ? 'rtl' : 'ltr'
			});
		}



		// Dropzone is prezent
		if(typeof Dropzone != 'undefined')
		{
			Dropzone.autoDiscover = false;

			$(".dropzone[action]").each(function(i, el)
			{
				$(el).dropzone();
			});
		}




		// Tocify Table
		if($.isFunction($.fn.tocify) && $("#toc").length)
		{
			$("#toc").tocify({
				context: '.tocify-content',
				selectors: "h2,h3,h4,h5"
			});


			var $this = $(".tocify"),
				watcher = scrollMonitor.create($this.get(0));

			$this.width( $this.parent().width() );

			watcher.lock();

			watcher.stateChange(function()
			{
				$($this.get(0)).toggleClass('fixed', this.isAboveViewport)
			});
		}



		// Login Form Label Focusing
		$(".login-form .form-group:has(label)").each(function(i, el)
		{
			var $this = $(el),
				$label = $this.find('label'),
				$input = $this.find('.form-control');

			$input.on('focus', function()
			{
				$this.addClass('is-focused');
			});

			$input.on('keydown', function()
			{
				$this.addClass('is-focused');
			});

			$input.on('blur', function()
			{
				$this.removeClass('is-focused');

				if($input.val().trim().length > 0)
				{
					$this.addClass('is-focused');
				}
			});

			$label.on('click', function()
			{
				$input.focus();
			});

			if($input.val().trim().length > 0)
			{
				$this.addClass('is-focused');
			}
		});

	});


	// Enable/Disable Resizable Event
	var wid = 0;

	$(window).resize(function() {
		clearTimeout(wid);
		wid = setTimeout(trigger_resizable, 200);
	});


})(jQuery, window);



// Sideber Menu Setup function
var sm_duration = .2,
	sm_transition_delay = 150;

function setup_sidebar_menu()
{
	if(public_vars.$sidebarMenu.length)
	{
		var $items_with_subs = public_vars.$sidebarMenu.find('li:has(> ul)'),
			toggle_others = public_vars.$sidebarMenu.hasClass('toggle-others');

		$items_with_subs.filter('.active').addClass('expanded');

		// On larger screens collapse sidebar when the window is tablet screen
		if(is('largescreen') && public_vars.$sidebarMenu.hasClass('collapsed') == false)
		{
			$(window).on('resize', function()
			{
				if(is('tabletscreen'))
				{
					public_vars.$sidebarMenu.addClass('collapsed');
					ps_destroy();
				}
				else
				if(is('largescreen'))
				{
					public_vars.$sidebarMenu.removeClass('collapsed');
					ps_init();
				}
			});
		}

		$items_with_subs.each(function(i, el)
		{
			var $li = jQuery(el),
				$a = $li.children('a'),
				$sub = $li.children('ul');

			$li.addClass('has-sub');

			$a.on('click', function(ev)
			{
				ev.preventDefault();

				if(toggle_others)
				{
					sidebar_menu_close_items_siblings($li);
				}

				if($li.hasClass('expanded') || $li.hasClass('opened'))
					sidebar_menu_item_collapse($li, $sub);
				else
					sidebar_menu_item_expand($li, $sub);
			});
		});
	}
}

function sidebar_menu_item_expand($li, $sub)
{
	if($li.data('is-busy') || ($li.parent('.main-menu').length && public_vars.$sidebarMenu.hasClass('collapsed')))
		return;

	$li.addClass('expanded').data('is-busy', true);
	$sub.show();

	var $sub_items 	  = $sub.children(),
		sub_height	= $sub.outerHeight(),

		win_y			 = jQuery(window).height(),
		total_height	  = $li.outerHeight(),
		current_y		 = public_vars.$sidebarMenu.scrollTop(),
		item_max_y		= $li.position().top + current_y,
		fit_to_viewpport  = public_vars.$sidebarMenu.hasClass('fit-in-viewport');

	$sub_items.addClass('is-hidden');
	$sub.height(0);


	TweenMax.to($sub, sm_duration, {css: {height: sub_height}, onUpdate: ps_update, onComplete: function(){
		$sub.height('');
	}});

	var interval_1 = $li.data('sub_i_1'),
		interval_2 = $li.data('sub_i_2');

	window.clearTimeout(interval_1);

	interval_1 = setTimeout(function()
	{
		$sub_items.each(function(i, el)
		{
			var $sub_item = jQuery(el);

			$sub_item.addClass('is-shown');
		});

		var finish_on = sm_transition_delay * $sub_items.length,
			t_duration = parseFloat($sub_items.eq(0).css('transition-duration')),
			t_delay = parseFloat($sub_items.last().css('transition-delay'));

		if(t_duration && t_delay)
		{
			finish_on = (t_duration + t_delay) * 1000;
		}

		// In the end
		window.clearTimeout(interval_2);

		interval_2 = setTimeout(function()
		{
			$sub_items.removeClass('is-hidden is-shown');

		}, finish_on);


		$li.data('is-busy', false);

	}, 0);

	$li.data('sub_i_1', interval_1),
	$li.data('sub_i_2', interval_2);
}

function sidebar_menu_item_collapse($li, $sub)
{
	if($li.data('is-busy'))
		return;

	var $sub_items = $sub.children();

	$li.removeClass('expanded').data('is-busy', true);
	$sub_items.addClass('hidden-item');

	TweenMax.to($sub, sm_duration, {css: {height: 0}, onUpdate: ps_update, onComplete: function()
	{
		$li.data('is-busy', false).removeClass('opened');

		$sub.attr('style', '').hide();
		$sub_items.removeClass('hidden-item');

		$li.find('li.expanded ul').attr('style', '').hide().parent().removeClass('expanded');

		ps_update(true);
	}});
}

function sidebar_menu_close_items_siblings($li)
{
	$li.siblings().not($li).filter('.expanded, .opened').each(function(i, el)
	{
		var $_li = jQuery(el),
			$_sub = $_li.children('ul');

		sidebar_menu_item_collapse($_li, $_sub);
	});
}


// Horizontal Menu
function setup_horizontal_menu()
{
	if(public_vars.$horizontalMenu.length)
	{
		var $items_with_subs = public_vars.$horizontalMenu.find('li:has(> ul)'),
			click_to_expand = public_vars.$horizontalMenu.hasClass('click-to-expand');

		if(click_to_expand)
		{
			public_vars.$mainContent.add( public_vars.$sidebarMenu ).on('click', function(ev)
			{
				$items_with_subs.removeClass('hover');
			});
		}

		$items_with_subs.each(function(i, el)
		{
			var $li = jQuery(el),
				$a = $li.children('a'),
				$sub = $li.children('ul'),
				is_root_element = $li.parent().is('.navbar-nav');

			$li.addClass('has-sub');

			// Mobile Only
			$a.on('click', function(ev)
			{
				if(isxs())
				{
					ev.preventDefault();

					// Automatically will toggle other menu items in mobile view
					if(true)
					{
						sidebar_menu_close_items_siblings($li);
					}

					if($li.hasClass('expanded') || $li.hasClass('opened'))
						sidebar_menu_item_collapse($li, $sub);
					else
						sidebar_menu_item_expand($li, $sub);
				}
			});

			// Click To Expand
			if(click_to_expand)
			{
				$a.on('click', function(ev)
				{
					ev.preventDefault();

					if(isxs())
						return;

					// For parents only
					if(is_root_element)
					{
						$items_with_subs.filter(function(i, el){ return jQuery(el).parent().is('.navbar-nav'); }).not($li).removeClass('hover');
						$li.toggleClass('hover');
					}
					// Sub menus
					else
					{
						var sub_height;

						// To Expand
						if($li.hasClass('expanded') == false)
						{
							$li.addClass('expanded');
							$sub.addClass('is-visible');

							sub_height = $sub.outerHeight();

							$sub.height(0);

							TweenLite.to($sub, .15, {css: {height: sub_height}, ease: Sine.easeInOut, onComplete: function(){ $sub.attr('style', ''); }});

							// Hide Existing in the list
							$li.siblings().find('> ul.is-visible').not($sub).each(function(i, el)
							{
								var $el = jQuery(el);

								sub_height = $el.outerHeight();

								$el.removeClass('is-visible').height(sub_height);
								$el.parent().removeClass('expanded');

								TweenLite.to($el, .15, {css: {height: 0}, onComplete: function(){ $el.attr('style', ''); }});
							});
						}
						// To Collapse
						else
						{
							sub_height = $sub.outerHeight();

							$li.removeClass('expanded');
							$sub.removeClass('is-visible').height(sub_height);
							TweenLite.to($sub, .15, {css: {height: 0}, onComplete: function(){ $sub.attr('style', ''); }});
						}
					}
				});
			}
			// Hover To Expand
			else
			{
				$li.hoverIntent({
					over: function()
					{
						if(isxs())
							return;

						if(is_root_element)
						{
							$li.addClass('hover');
						}
						else
						{
							$sub.addClass('is-visible');
							sub_height = $sub.outerHeight();

							$sub.height(0);

							TweenLite.to($sub, .25, {css: {height: sub_height}, ease: Sine.easeInOut, onComplete: function(){ $sub.attr('style', ''); }});
						}
					},
					out: function()
					{
						if(isxs())
							return;

						if(is_root_element)
						{
							$li.removeClass('hover');
						}
						else
						{
							sub_height = $sub.outerHeight();

							$li.removeClass('expanded');
							$sub.removeClass('is-visible').height(sub_height);
							TweenLite.to($sub, .25, {css: {height: 0}, onComplete: function(){ $sub.attr('style', ''); }});
						}
					},
					timeout: 200,
					interval: is_root_element ? 10 : 100
				});
			}
		});
	}
}


function stickFooterToBottom()
{
	public_vars.$mainFooter.add( public_vars.$mainContent ).add( public_vars.$sidebarMenu ).attr('style', '');

	if(isxs())
		return false;

	if(public_vars.$mainFooter.hasClass('sticky'))
	{
		var win_height				 = jQuery(window).height(),
			footer_height			= public_vars.$mainFooter.outerHeight(true),
			main_content_height	  = public_vars.$mainFooter.position().top + footer_height,
			main_content_height_only = main_content_height - footer_height,
			extra_height			 = public_vars.$horizontalNavbar.outerHeight();


		if(win_height > main_content_height - parseInt(public_vars.$mainFooter.css('marginTop'), 10))
		{
			public_vars.$mainFooter.css({
				marginTop: win_height - main_content_height - extra_height
			});
		}
	}
}


// Perfect scroll bar functions by Arlind Nushi
function ps_update(destroy_init)
{
	if(isxs())
		return;

	if(jQuery.isFunction(jQuery.fn.perfectScrollbar))
	{
		if(public_vars.$sidebarMenu.hasClass('collapsed'))
		{
			return;
		}

		public_vars.$sidebarMenu.find('.sidebar-menu-inner').perfectScrollbar('update');

		if(destroy_init)
		{
			ps_destroy();
			ps_init();
		}
	}
}


function ps_init()
{
	if(isxs())
		return;

	if(jQuery.isFunction(jQuery.fn.perfectScrollbar))
	{
		if(public_vars.$sidebarMenu.hasClass('collapsed') || ! public_vars.$sidebarMenu.hasClass('fixed'))
		{
			return;
		}

		public_vars.$sidebarMenu.find('.sidebar-menu-inner').perfectScrollbar({
			wheelSpeed: 1,
			wheelPropagation: public_vars.wheelPropagation
		});
	}
}

function ps_destroy()
{
	if(jQuery.isFunction(jQuery.fn.perfectScrollbar))
	{
		public_vars.$sidebarMenu.find('.sidebar-menu-inner').perfectScrollbar('destroy');
	}
}



// Radio and Check box replacement by Arlind Nushi
function cbr_replace()
{
	var $inputs = jQuery('input[type="checkbox"].cbr, input[type="radio"].cbr').filter(':not(.cbr-done)'),
		$wrapper = '<div class="cbr-replaced"><div class="cbr-input"></div><div class="cbr-state"><span></span></div></div>';

	$inputs.each(function(i, el)
	{
		var $el = jQuery(el),
			is_radio = $el.is(':radio'),
			is_checkbox = $el.is(':checkbox'),
			is_disabled = $el.is(':disabled'),
			styles = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'purple', 'blue', 'red', 'gray', 'pink', 'yellow', 'orange', 'turquoise'];

		if( ! is_radio && ! is_checkbox)
			return;

		$el.after( $wrapper );
		$el.addClass('cbr-done');

		var $wrp = $el.next();
		$wrp.find('.cbr-input').append( $el );

		if(is_radio)
			$wrp.addClass('cbr-radio');

		if(is_disabled)
			$wrp.addClass('cbr-disabled');

		if($el.is(':checked'))
		{
			$wrp.addClass('cbr-checked');
		}


		// Style apply
		jQuery.each(styles, function(key, val)
		{
			var cbr_class = 'cbr-' + val;

			if( $el.hasClass(cbr_class))
			{
				$wrp.addClass(cbr_class);
				$el.removeClass(cbr_class);
			}
		});


		// Events
		$wrp.on('click', function(ev)
		{
			if(is_radio && $el.prop('checked') || $wrp.parent().is('label'))
				return;

			if(jQuery(ev.target).is($el) == false)
			{
				$el.prop('checked', ! $el.is(':checked'));
				$el.trigger('change');
			}
		});

		$el.on('change', function(ev)
		{
			$wrp.removeClass('cbr-checked');

			if($el.is(':checked'))
				$wrp.addClass('cbr-checked');

			cbr_recheck();
		});
	});
}


function cbr_recheck()
{
	var $inputs = jQuery("input.cbr-done");

	$inputs.each(function(i, el)
	{
		var $el = jQuery(el),
			is_radio = $el.is(':radio'),
			is_checkbox = $el.is(':checkbox'),
			is_disabled = $el.is(':disabled'),
			$wrp = $el.closest('.cbr-replaced');

		if(is_disabled)
			$wrp.addClass('cbr-disabled');

		if(is_radio && ! $el.prop('checked') && $wrp.hasClass('cbr-checked'))
		{
			$wrp.removeClass('cbr-checked');
		}
	});
}


// Element Attribute Helper
function attrDefault($el, data_var, default_val)
{
	if(typeof $el.data(data_var) != 'undefined')
	{
		return $el.data(data_var);
	}

	return default_val;
}


// Test function
function callback_test()
{
	alert("Callback function executed! No. of arguments: " + arguments.length + "\n\nSee console log for outputed of the arguments.");

	console.log(arguments);
}


// Date Formatter
function date(format, timestamp) {
	//	discuss at: http://phpjs.org/functions/date/
	// original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
	// original by: gettimeofday
	//	parts by: Peter-Paul Koch (http://www.quirksmode.org/js/beat.html)
	// improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// improved by: MeEtc (http://yass.meetcweb.com)
	// improved by: Brad Touesnard
	// improved by: Tim Wiel
	// improved by: Bryan Elliott
	// improved by: David Randall
	// improved by: Theriault
	// improved by: Theriault
	// improved by: Brett Zamir (http://brett-zamir.me)
	// improved by: Theriault
	// improved by: Thomas Beaucourt (http://www.webapp.fr)
	// improved by: JT
	// improved by: Theriault
	// improved by: Rafał Kukawski (http://blog.kukawski.pl)
	// improved by: Theriault
	//	input by: Brett Zamir (http://brett-zamir.me)
	//	input by: majak
	//	input by: Alex
	//	input by: Martin
	//	input by: Alex Wilson
	//	input by: Haravikk
	// bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// bugfixed by: majak
	// bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// bugfixed by: Brett Zamir (http://brett-zamir.me)
	// bugfixed by: omid (http://phpjs.org/functions/380:380#comment_137122)
	// bugfixed by: Chris (http://www.devotis.nl/)
	//		note: Uses global: php_js to store the default timezone
	//		note: Although the function potentially allows timezone info (see notes), it currently does not set
	//		note: per a timezone specified by date_default_timezone_set(). Implementers might use
	//		note: this.php_js.currentTimezoneOffset and this.php_js.currentTimezoneDST set by that function
	//		note: in order to adjust the dates in this function (or our other date functions!) accordingly
	//	 example 1: date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400);
	//	 returns 1: '09:09:40 m is month'
	//	 example 2: date('F j, Y, g:i a', 1062462400);
	//	 returns 2: 'September 2, 2003, 2:26 am'
	//	 example 3: date('Y W o', 1062462400);
	//	 returns 3: '2003 36 2003'
	//	 example 4: x = date('Y m d', (new Date()).getTime()/1000);
	//	 example 4: (x+'').length == 10 // 2009 01 09
	//	 returns 4: true
	//	 example 5: date('W', 1104534000);
	//	 returns 5: '53'
	//	 example 6: date('B t', 1104534000);
	//	 returns 6: '999 31'
	//	 example 7: date('W U', 1293750000.82); // 2010-12-31
	//	 returns 7: '52 1293750000'
	//	 example 8: date('W', 1293836400); // 2011-01-01
	//	 returns 8: '52'
	//	 example 9: date('W Y-m-d', 1293974054); // 2011-01-02
	//	 returns 9: '52 2011-01-02'

	var that = this;
	var jsdate, f;
	// Keep this here (works, but for code commented-out below for file size reasons)
	// var tal= [];
	var txt_words = [
	'Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur',
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
	];
	// trailing backslash -> (dropped)
	// a backslash followed by any character (including backslash) -> the character
	// empty string -> empty string
	var formatChr = /\\?(.?)/gi;
	var formatChrCb = function (t, s) {
	return f[t] ? f[t]() : s;
	};
	var _pad = function (n, c) {
	n = String(n);
	while (n.length < c) {
		n = '0' + n;
	}
	return n;
	};
	f = {
	// Day
	d: function () {
		// Day of month w/leading 0; 01..31
		return _pad(f.j(), 2);
	},
	D: function () {
		// Shorthand day name; Mon...Sun
		return f.l()
		.slice(0, 3);
	},
	j: function () {
		// Day of month; 1..31
		return jsdate.getDate();
	},
	l: function () {
		// Full day name; Monday...Sunday
		return txt_words[f.w()] + 'day';
	},
	N: function () {
		// ISO-8601 day of week; 1[Mon]..7[Sun]
		return f.w() || 7;
	},
	S: function () {
		// Ordinal suffix for day of month; st, nd, rd, th
		var j = f.j();
		var i = j % 10;
		if (i <= 3 && parseInt((j % 100) / 10, 10) == 1) {
		i = 0;
		}
		return ['st', 'nd', 'rd'][i - 1] || 'th';
	},
	w: function () {
		// Day of week; 0[Sun]..6[Sat]
		return jsdate.getDay();
	},
	z: function () {
		// Day of year; 0..365
		var a = new Date(f.Y(), f.n() - 1, f.j());
		var b = new Date(f.Y(), 0, 1);
		return Math.round((a - b) / 864e5);
	},

	// Week
	W: function () {
		// ISO-8601 week number
		var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3);
		var b = new Date(a.getFullYear(), 0, 4);
		return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
	},

	// Month
	F: function () {
		// Full month name; January...December
		return txt_words[6 + f.n()];
	},
	m: function () {
		// Month w/leading 0; 01...12
		return _pad(f.n(), 2);
	},
	M: function () {
		// Shorthand month name; Jan...Dec
		return f.F()
		.slice(0, 3);
	},
	n: function () {
		// Month; 1...12
		return jsdate.getMonth() + 1;
	},
	t: function () {
		// Days in month; 28...31
		return (new Date(f.Y(), f.n(), 0))
		.getDate();
	},

	// Year
	L: function () {
		// Is leap year?; 0 or 1
		var j = f.Y();
		return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0;
	},
	o: function () {
		// ISO-8601 year
		var n = f.n();
		var W = f.W();
		var Y = f.Y();
		return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
	},
	Y: function () {
		// Full year; e.g. 1980...2010
		return jsdate.getFullYear();
	},
	y: function () {
		// Last two digits of year; 00...99
		return f.Y()
		.toString()
		.slice(-2);
	},

	// Time
	a: function () {
		// am or pm
		return jsdate.getHours() > 11 ? 'pm' : 'am';
	},
	A: function () {
		// AM or PM
		return f.a()
		.toUpperCase();
	},
	B: function () {
		// Swatch Internet time; 000..999
		var H = jsdate.getUTCHours() * 36e2;
		// Hours
		var i = jsdate.getUTCMinutes() * 60;
		// Minutes
		// Seconds
		var s = jsdate.getUTCSeconds();
		return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
	},
	g: function () {
		// 12-Hours; 1..12
		return f.G() % 12 || 12;
	},
	G: function () {
		// 24-Hours; 0..23
		return jsdate.getHours();
	},
	h: function () {
		// 12-Hours w/leading 0; 01..12
		return _pad(f.g(), 2);
	},
	H: function () {
		// 24-Hours w/leading 0; 00..23
		return _pad(f.G(), 2);
	},
	i: function () {
		// Minutes w/leading 0; 00..59
		return _pad(jsdate.getMinutes(), 2);
	},
	s: function () {
		// Seconds w/leading 0; 00..59
		return _pad(jsdate.getSeconds(), 2);
	},
	u: function () {
		// Microseconds; 000000-999000
		return _pad(jsdate.getMilliseconds() * 1000, 6);
	},

	// Timezone
	e: function () {
		// Timezone identifier; e.g. Atlantic/Azores, ...
		// The following works, but requires inclusion of the very large
		// timezone_abbreviations_list() function.
		/*				return that.date_default_timezone_get();
		 */
		throw 'Not supported (see source code of date() for timezone on how to add support)';
	},
	I: function () {
		// DST observed?; 0 or 1
		// Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
		// If they are not equal, then DST is observed.
		var a = new Date(f.Y(), 0);
		// Jan 1
		var c = Date.UTC(f.Y(), 0);
		// Jan 1 UTC
		var b = new Date(f.Y(), 6);
		// Jul 1
		// Jul 1 UTC
		var d = Date.UTC(f.Y(), 6);
		return ((a - c) !== (b - d)) ? 1 : 0;
	},
	O: function () {
		// Difference to GMT in hour format; e.g. +0200
		var tzo = jsdate.getTimezoneOffset();
		var a = Math.abs(tzo);
		return (tzo > 0 ? '-' : '+') + _pad(Math.floor(a / 60) * 100 + a % 60, 4);
	},
	P: function () {
		// Difference to GMT w/colon; e.g. +02:00
		var O = f.O();
		return (O.substr(0, 3) + ':' + O.substr(3, 2));
	},
	T: function () {
		// Timezone abbreviation; e.g. EST, MDT, ...
		// The following works, but requires inclusion of the very
		// large timezone_abbreviations_list() function.
		/*				var abbr, i, os, _default;
		if (!tal.length) {
		tal = that.timezone_abbreviations_list();
		}
		if (that.php_js && that.php_js.default_timezone) {
		_default = that.php_js.default_timezone;
		for (abbr in tal) {
			for (i = 0; i < tal[abbr].length; i++) {
			if (tal[abbr][i].timezone_id === _default) {
				return abbr.toUpperCase();
			}
			}
		}
		}
		for (abbr in tal) {
		for (i = 0; i < tal[abbr].length; i++) {
			os = -jsdate.getTimezoneOffset() * 60;
			if (tal[abbr][i].offset === os) {
			return abbr.toUpperCase();
			}
		}
		}
		*/
		return 'UTC';
	},
	Z: function () {
		// Timezone offset in seconds (-43200...50400)
		return -jsdate.getTimezoneOffset() * 60;
	},

	// Full Date/Time
	c: function () {
		// ISO-8601 date.
		return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb);
	},
	r: function () {
		// RFC 2822
		return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
	},
	U: function () {
		// Seconds since UNIX epoch
		return jsdate / 1000 | 0;
	}
	};

	this.date = function (format, timestamp) {
		that = this;
		jsdate = (timestamp === undefined ? new Date() : // Not provided
			(timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
			new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
		);
		return format.replace(formatChr, formatChrCb);
	};
	return this.date(format, timestamp);
}