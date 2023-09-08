<?php

include_once('config.php');
header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD'] == "POST"){
	$data = json_decode(file_get_contents('php://input'), true);

	// Get data from the REST client
	$userId = $data["userId"];
	$quantity = mysqli_real_escape_string($conn, $data['quantity']);
	$price = mysqli_real_escape_string($conn, $data['price']);

	// Seller loses emissions capacity
	$sql = "UPDATE `user_saves` SET emissions_cap = emissions_cap - $quantity WHERE id = $userId;";
	mysqli_query($conn, $sql);
	error_log(mysqli_error($conn));

	// Insert sell offer into database
	$sql = "INSERT INTO `emissions_market` (`userId`, `quantity`, `price`) VALUES ('$userId', '$quantity', '$price');";
	$post_data_query = mysqli_query($conn, $sql);

	
	if($post_data_query){
		$json = array("status" => 1, "success" => "market offer posted");
	}
	else{
		error_log(mysqli_error($conn));
		$json = array("status" => 0, "error" => "error posting market offer");
	}
}
else{
	$json = array("status" => 0, "info" => "Request method not accepted!");
}

@mysqli_close($conn);
// Set Content-type to JSON
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

header("HTTP/1.0 200 OK");
echo json_encode($json);

