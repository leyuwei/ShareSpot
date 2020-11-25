<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$url = $_POST['url'];
$data = $_POST['data'];

$options = array(
        'http' => array(
        'header'  => "Content-type: application/json",
        'method'  => strtoupper($_POST['method']),
        'content' => $data,
    )
);

$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
echo($result);

?>