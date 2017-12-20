/**
 *	Neon Notes Script
 *
 *	Developed by Arlind Nushi - www.laborator.co
 */

var xenonNotes = xenonNotes || {};

;(function($, window, undefined)
{
	"use strict";

	$(window).load(function()
	{
		xenonNotes.$container = $(".notes-env");

		$.extend(xenonNotes, {
			isPresent: xenonNotes.$container.length > 0,

			noTitleText: "Untitled",
			noDescriptionText: "(No content)",


			$currentNote: $(null),
			$currentNoteTitle: $(null),
			$currentNoteDescription: $(null),
			$currentNoteContent: $(null),

			addNote: function()
			{
				var $note = $('<li><a href="#"><strong></strong><span></li></a></li>');

				$note.append('<div class="content"></div>').append('<button class="note-close">&times;</button>');

				$note.find('strong').html(xenonNotes.noTitleText);
				$note.find('span').html(xenonNotes.noDescriptionText);

				xenonNotes.$notesList.prepend($note);

				TweenMax.set($note, {autoAlpha: 0});

				var tl = new TimelineMax();

				tl.append( TweenMax.to($note, .10, {css: {autoAlpha: 1}}) );
				tl.append( TweenMax.to($note, .15, {css: {autoAlpha: .8}}) );
				tl.append( TweenMax.to($note, .15, {css: {autoAlpha: 1}}) );

				xenonNotes.$notesList.find('li').removeClass('current');
				$note.addClass('current');

				xenonNotes.$writePadTxt.focus();

				xenonNotes.checkCurrentNote();
			},

			checkCurrentNote: function()
			{
				var $current_note = xenonNotes.$notesList.find('li.current').first();

				if($current_note.length)
				{
					xenonNotes.$currentNote             = $current_note;
					xenonNotes.$currentNoteTitle        = $current_note.find('strong');
					xenonNotes.$currentNoteDescription  = $current_note.find('span');
					xenonNotes.$currentNoteContent      = $current_note.find('.content');

					xenonNotes.$writePadTxt.val( $.trim( xenonNotes.$currentNoteContent.html() ) ).trigger('autosize.resize');;
				}
				else
				{
					var first = xenonNotes.$notesList.find('li:first:not(.no-notes)');

					if(first.length)
					{
						first.addClass('current');
						xenonNotes.checkCurrentNote();
					}
					else
					{
						xenonNotes.$writePadTxt.val('');
						xenonNotes.$currentNote = $(null);
						xenonNotes.$currentNoteTitle = $(null);
						xenonNotes.$currentNoteDescription = $(null);
						xenonNotes.$currentNoteContent = $(null);
					}
				}
			},

			updateCurrentNoteText: function()
			{
				var text = $.trim( xenonNotes.$writePadTxt.val() );

				if(xenonNotes.$currentNote.length)
				{
					var title = '',
						description = '';

					if(text.length)
					{
						var _text = text.split("\n"), currline = 1;

						for(var i=0; i<_text.length; i++)
						{
							if(_text[i])
							{
								if(currline == 1)
								{
									title = _text[i];
								}
								else
								if(currline == 2)
								{
									description = _text[i];
								}

								currline++;
							}

							if(currline > 2)
								break;
						}
					}

					xenonNotes.$currentNoteTitle.text( title.length ? title : xenonNotes.noTitleText );
					xenonNotes.$currentNoteDescription.text( description.length ? description : xenonNotes.noDescriptionText );
					xenonNotes.$currentNoteContent.text( text );
				}
				else
				if(text.length)
				{
					xenonNotes.addNote();
				}
			}
		});

		// Mail Container Height fit with the document
		if(xenonNotes.isPresent)
		{
			xenonNotes.$notesList = xenonNotes.$container.find('.list-of-notes');
			xenonNotes.$writePad = xenonNotes.$container.find('.write-pad');
			xenonNotes.$writePadTxt = xenonNotes.$writePad.find('textarea');

			xenonNotes.$addNote = xenonNotes.$container.find('#add-note');

			xenonNotes.$addNote.on('click', function(ev)
			{
				xenonNotes.addNote();
			});

			xenonNotes.$writePadTxt.on('keyup', function(ev)
			{
				xenonNotes.updateCurrentNoteText();
			});

			xenonNotes.checkCurrentNote();

			xenonNotes.$notesList.on('click', 'li a', function(ev)
			{
				ev.preventDefault();

				xenonNotes.$notesList.find('li').removeClass('current');
				$(this).parent().addClass('current');

				xenonNotes.checkCurrentNote();


			});

			xenonNotes.$notesList.on('click', 'li .note-close', function(ev)
			{
				ev.preventDefault();

				var $note = $(this).parent();

				var tl = new TimelineMax();

				tl.append(
					TweenMax.to($note, .15, {css: {autoAlpha: 0}, onComplete: function()
					{
						$note.remove();
						xenonNotes.checkCurrentNote();
					}})
				);
			});
		}
	});

})(jQuery, window);

