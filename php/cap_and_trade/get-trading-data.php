<?php
	include_once('config.php');
	header('Access-Control-Allow-Origin: *');

	$sql = "SELECT * FROM `emissions_market` ORDER BY price;";
	$get_data_query = mysqli_query($conn, $sql) or die(mysqli_error($conn));
	
	if(mysqli_num_rows($get_data_query)!=0) {
		$result = mysqli_fetch_all($get_data_query, MYSQLI_ASSOC);
		$json = array("status" => 1, "info" => $result);
	}
	else{
		$json = array("status" => 0, "error" => "market data not found");
	}
	
@mysqli_close($conn);
// Set Content-type to JSON
header('Content-type: application/json');

echo json_encode($json);

