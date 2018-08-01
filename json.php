<?php
$xml = 'http://lifelog.hpmeister.com/atom.xml';

$obj = simplexml_load_file($xml, NULL, LIBXML_NOCDATA);
$json = json_encode($obj);
//var_dump($json);
header('Content-type: text/javascript; charset=UTF-8');
print $json;
/*
*/
