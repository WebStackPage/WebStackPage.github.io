<?php
/**
 *	Remote data for Select2 plugin
 *	
 *	Laborator.co
 *	www.laborator.co 
 */

// Data to parse
$data = array(
	array('id' => 1,	'name' => 'Arlind Nushi'),
	array('id' => 2,	'name' => 'Art Ramadani'),
	array('id' => 3,	'name' => 'Ylli Pylla'),
	array('id' => 4,	'name' => 'Eroll Maxhuni'),
	array('id' => 5,	'name' => 'Gent Uka'),
	array('id' => 6,	'name' => 'Arjan Halili'),
	array('id' => 7,	'name' => 'Art Nushi'),
	array('id' => 8,	'name' => 'Shkumbin Gerguri'),
	array('id' => 9,	'name' => 'John Doe'),
);

$q = isset($_REQUEST['q']) ? $_REQUEST['q'] : '';

// Searching
if(trim($q))
{
	$data = array_filter($data, 'filter_by_name');
}

$data = array_values($data);

function filter_by_name($el)
{
	global $q;
	
	return stristr($el['name'], $q) ? true : false;
}


echo json_encode($data);