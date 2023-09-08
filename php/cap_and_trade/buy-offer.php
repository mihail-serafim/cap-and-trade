<?php

include_once('config.php');
header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD'] == "PUT"){
	$data = json_decode(file_get_contents('php://input'), true);

	// Get data from the REST client
	$trade_id = intval($data["trade_id"]);
	$seller_user_id = intval($data["seller_user_id"]);
	$buyer_user_id = intval($data["buyer_user_id"]);
	$quantity = floatval($data['quantity']);
	$price = floatval($data['price']);

	error_log($buyer_user_id);
	error_log($seller_user_id);

	// Seller gains currency
	$sql = "UPDATE `user_saves` SET currency = currency + $price WHERE id = $seller_user_id;";
	mysqli_query($conn, $sql);
	error_log(mysqli_error($conn));

	// Buyer loses currency, gains emissions capacity
	$sql = "UPDATE `user_saves` SET currency = currency - $price, emissions_cap = emissions_cap + $quantity WHERE id = $buyer_user_id;";
	mysqli_query($conn, $sql);
	error_log(mysqli_error($conn));

	// Trade is removed from 'emissions_market' table
	$sql = "DELETE FROM `emissions_market` WHERE id = $trade_id;";
	$post_data_query = mysqli_query($conn, $sql);

	if($post_data_query){
		$json = array("status" => 1, "success" => "market offer purchased");
	}
	else{
		error_log(mysqli_error($conn));
		$json = array("status" => 0, "error" => "error purchasing market offer");
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
header('Access-Control-Allow-Methods: PUT');

header("HTTP/1.0 200 OK");
echo json_encode($json);

