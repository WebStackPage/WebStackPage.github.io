<?php
/**
 *	Typeahead Auto Suggestions Generator
 *	
 *	Laborator.co
 *	www.laborator.co 
 */

	$q = "Hello world";
	
	if(isset($_REQUEST['q']) && trim($_REQUEST['q']))
		$q = $_REQUEST['q'];
	
	$items = array();
	
	$items[] = array("value" => $q . substr(str_shuffle($q), 0, 1));
	$items[] = array("value" => $q . ' - ' . strrev($q));
	$items[] = array("value" => str_shuffle($q));
	$items[] = array("value" => $q . mt_rand(10,99999));
	
	shuffle($items);
	
	
	echo json_encode(array_values($items));