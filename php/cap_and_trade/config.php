<?php

$config = parse_ini_file('secrets.ini');
$conn = mysqli_connect("localhost", "user", "r8%R6gPuLtn3E&ISiG5YfXqNaW*o9");
mysqli_select_db($conn, $config['db']);

?>