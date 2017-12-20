<?php
/**
 *	Example for custom autosuggestion templating
 *	
 *	Laborator.co
 *	www.laborator.co 
 */


	$harry_potter_movies = array(
		array('value' => 'Harry Potter and the Philosopher\'s Stone', 	'year' => 2001, 		'cover' => 'harry-potter-covers/1.jpg',		'desc' => 'Harry Potter is an orphaned boy brought up by his unfriendly aunt and uncle.'),
		array('value' => 'Harry Potter and the Chamber of Secrets', 	'year' => 2002, 		'cover' => 'harry-potter-covers/2.jpg',		'desc' => 'Harry, Ron, and Hermione return to Hogwarts for their second year, which proves to be more challenging than the last.'),
		array('value' => 'Harry Potter and the Prisoner of Azkaban', 	'year' => 2004,			'cover' => 'harry-potter-covers/3.jpg',		'desc' => 'Harry Potter\'s third year sees the boy wizard, along with his friends, attending Hogwarts School once again.'),
		array('value' => 'Harry Potter and the Goblet of Fire', 		'year' => 2005, 		'cover' => 'harry-potter-covers/4.jpg',		'desc' => 'During Harry\'s fourth year, the Dark Mark appears in the sky after a Death Eater attack at the Quidditch World Cup, Hogwarts plays host to a legendary event: the Triwizard Tournament, there is a new Defence Against the Dark Arts professor Alastor Moody and frequent nightmares bother Harry all year.'),
		array('value' => 'Harry Potter and the Order of the Phoenix', 	'year' => 2007, 		'cover' => 'harry-potter-covers/5.jpg',		'desc' => 'Harry\'s fifth year begins with him being attacked by Dementors in Little Whinging.'),
		array('value' => 'Harry Potter and the Half-Blood Prince', 		'year' => 2009, 		'cover' => 'harry-potter-covers/6.jpg',		'desc' => 'In Harry\'s sixth year at Hogwarts, Lord Voldemort and his Death Eaters are increasing their terror upon the Wizarding and Muggle worlds.'),
		array('value' => 'Harry Potter and the Deathly Hallows', 		'year' => "2010, 2011", 'cover' => 'harry-potter-covers/7.jpg',		'desc' => 'After unexpected events at the end of the previous year, Harry, Ron, and Hermione are entrusted with a quest to find and destroy Lord Voldemort\'s secret to immortality – the Horcruxes.'),
	);
	
	shuffle($harry_potter_movies);
	
	if(isset($_REQUEST['q']) && strlen($_REQUEST['q']) > 6)
		$harry_potter_movies = array();
	
	echo json_encode($harry_potter_movies);
	
	
	