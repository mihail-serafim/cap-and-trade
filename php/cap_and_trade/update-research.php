<?php

include_once('config.php');
header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD'] == "PUT"){
	$data = json_decode(file_get_contents('php://input'), true);

	// Get data from the REST client
	$id = $data["id"];
	$research_trees = json_encode($data["research_trees"]);
	$currency = mysqli_real_escape_string($conn, $data['currency']);
	$research = mysqli_real_escape_string($conn, $data['research']);
	$curr_emissions = mysqli_real_escape_string($conn, $data['curr_emissions']);
	$emissions_cap = mysqli_real_escape_string($conn, $data['emissions_cap']);

	// Insert data into database
	$sql = "UPDATE `user_saves` SET research_trees = '$research_trees', currency = '$currency', research = '$research', curr_emissions = '$curr_emissions', emissions_cap = '$emissions_cap'  WHERE id = $id;";
	$post_data_query = mysqli_query($conn, $sql);

	if($post_data_query){
		$json = array("status" => 1, "success" => "user research trees succesfully updated");
	}
	else{
		error_log(mysqli_error($conn));
		$json = array("status" => 0, "error" => "error updating user research trees");
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

