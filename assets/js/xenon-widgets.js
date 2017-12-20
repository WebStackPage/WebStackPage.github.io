/**
 *	Xenon Widgets
 *
 *	Theme by: www.laborator.co
 **/

;(function($, window, undefined){
	
	"use strict";
	
	$(document).ready(function()
	{
		if($('.page-loading-overlay').length)
		{
			$(window).on('load', function()
			{
				setTimeout(setupWidgets, 200);
			});
		}
		else
		{
			setupWidgets();
		}	
	});
	
	
	var setupWidgets = function()
	{		
		// Count Anything
		$("[data-from][data-to]").each(function(i, el)
		{
			var $el = $(el),
				sm = scrollMonitor.create(el);
			
			sm.fullyEnterViewport(function()
			{
				var opts = {
					useEasing: 		attrDefault($el, 'easing', true),
					useGrouping:	attrDefault($el, 'grouping', true),
					separator: 		attrDefault($el, 'separator', ','),
					decimal: 		attrDefault($el, 'decimal', '.'),
					prefix: 		attrDefault($el, 'prefix', ''),
					suffix:			attrDefault($el, 'suffix', ''),
				},
				$count		= attrDefault($el, 'count', 'this') == 'this' ? $el : $el.find($el.data('count')),
				from        = attrDefault($el, 'from', 0),
				to          = attrDefault($el, 'to', 100),
				duration    = attrDefault($el, 'duration', 2.5),
				delay       = attrDefault($el, 'delay', 0),
				decimals	= new String(to).match(/\.([0-9]+)/) ? new String(to).match(/\.([0-9]+)$/)[1].length : 0,
				counter 	= new countUp($count.get(0), from, to, decimals, duration, opts);
				
				setTimeout(function(){ counter.start(); }, delay * 1000);
				
				sm.destroy();
			});
		});
		
		
		// Fill Anything
		$("[data-fill-from][data-fill-to]").each(function(i, el)
		{
			var $el = $(el),
				sm = scrollMonitor.create(el);
			
			sm.fullyEnterViewport(function()
			{
				var fill = {
					current: 	null,
					from: 		attrDefault($el, 'fill-from', 0),
					to: 		attrDefault($el, 'fill-to', 100),
					property: 	attrDefault($el, 'fill-property', 'width'),
					unit: 		attrDefault($el, 'fill-unit', '%'),
				},
				opts 		= {
					current: fill.to, onUpdate: function(){
						$el.css(fill.property, fill.current + fill.unit);
					},
					delay: attrDefault($el, 'delay', 0),
				},
				easing 		= attrDefault($el, 'fill-easing', true),
				duration 	= attrDefault($el, 'fill-duration', 2.5);
				
				if(easing)
				{
					opts.ease = Sine.easeOut;
				}
				
				// Set starting point
				fill.current = fill.from;
				
				TweenMax.to(fill, duration, opts);
				
				sm.destroy();
			});
		});
		
		
		// Todo List
		$(".xe-todo-list").on('change', 'input[type="checkbox"]', function(ev)
		{
			var $cb = $(this),
				$li = $cb.closest('li');
			
			$li.removeClass('done');
				
			if($cb.is(':checked'))
			{
				$li.addClass('done');
			}
		});
		
		
		$(".xe-status-update").each(function(i, el)
		{
			var $el          	= $(el),
				$nav            = $el.find('.xe-nav a'),
				$status_list    = $el.find('.xe-body li'),
				index           = $status_list.filter('.active').index(),
				auto_switch     = attrDefault($el, 'auto-switch', 0),
				as_interval		= 0;
				
			if(auto_switch > 0)
			{
				as_interval = setInterval(function()
				{
					goTo(1);
					
				}, auto_switch * 1000);
				
				$el.hover(function()
				{
					window.clearInterval(as_interval);
				},
				function()
				{
					as_interval = setInterval(function()
					{
						goTo(1);
						
					}, auto_switch * 1000);;
				});
			}
			
			function goTo(plus_one)
			{
				index = (index + plus_one) % $status_list.length;
				
				if(index < 0)
					index = $status_list.length - 1;
				
				var $to_hide = $status_list.filter('.active'),
					$to_show = $status_list.eq(index);
				
				$to_hide.removeClass('active');
				$to_show.addClass('active').fadeTo(0,0).fadeTo(320,1);
			}
			
			$nav.on('click', function(ev)
			{
				ev.preventDefault();
				
				var plus_one = $(this).hasClass('xe-prev') ? -1 : 1;
				
				goTo(plus_one);
			});
		});
	}
	

})(jQuery, window);