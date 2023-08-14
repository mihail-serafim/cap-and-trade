<?php
	include_once('config.php');
	header('Access-Control-Allow-Origin: *');

	$userId = isset($_GET['id']) ? mysqli_real_escape_string($conn, $_GET['id']) :  "";
	$sql = "SELECT * FROM `user_saves` WHERE id='{$userId}';";
	$get_data_query = mysqli_query($conn, $sql) or die(mysqli_error($conn));
	
	if(mysqli_num_rows($get_data_query)!=0) {
		$result = array();
		
		while($r = mysqli_fetch_array($get_data_query)){
			extract($r);
			$result[] = array("id" => $id, "node_graph" => $node_graph, "research_trees" => $research_trees, "currency" => $currency, "research" => $research, "curr_emissions" => $curr_emissions, "emissions_cap" => $emissions_cap);
		}
		$json = array("status" => 1, "info" => $result);
	}
	else{
		$json = array("status" => 0, "error" => "user not found");
	}
@mysqli_close($conn);
// Set Content-type to JSON
header('Content-type: application/json');

echo json_encode($json);

