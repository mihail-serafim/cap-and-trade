<?php

include_once('config.php');
header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD'] == "PUT"){
	$data = json_decode(file_get_contents('php://input'), true);

	// Get data from the REST client
	$id = $data["id"];
	$node_graph = json_encode($data["node_graph"]);
	$research_trees = json_encode($data["research_trees"]);
	$currency = mysqli_real_escape_string($conn, $data['currency']);
	$research = mysqli_real_escape_string($conn, $data['research']);
	$curr_emissions = mysqli_real_escape_string($conn, $data['curr_emissions']);
	$emissions_cap = mysqli_real_escape_string($conn, $data['emissions_cap']);


	// Insert data into database
	$sql = "UPDATE `user_saves` SET node_graph = '$node_graph',  WHERE id = $id;";
	$post_data_query = mysqli_query($conn, $sql);

	if($post_data_query){
		$json = array("status" => 1, "success" => "user added");
	}
	else{
		error_log(mysqli_error($conn));
		$json = array("status" => 0, "error" => "error adding user");
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

