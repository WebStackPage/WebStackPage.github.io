<?php
/**
 *	Image Crop Examp;e
 *	
 *	Laborator.co
 *	www.laborator.co 
 */



$x = abs($_GET['x']);
$y = abs($_GET['y']);

$w = abs($_GET['w']);
$h = abs($_GET['h']);

$tw = abs($_GET['tw']);
$th = abs($_GET['th']);

if(in_array(0, array($w, $h, $tw, $th)))
	exit("Invalid params");

$jpeg_quality = 90;

$src = 'vw1.jpg';
$img_r = imagecreatefromjpeg($src);
$dst_r = ImageCreateTrueColor( $tw, $th );

imagecopyresampled($dst_r, $img_r, 0, 0, $x, $y, $tw, $th, $w, $h);

header('Content-type: image/jpeg');
imagejpeg($dst_r, null, $jpeg_quality);