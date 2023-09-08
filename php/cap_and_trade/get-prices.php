<?php
	include_once('config.php');

	function getGoodsPrices($conn) {

		// This array defines how much the sell price of each unit of goods is scaled by. Note that goods of type 2 (research) are scaled to 0.
		$price_constants = array(7.5, 5, 0);
		$prices = array();

		$sql = "SELECT * FROM `user_saves` ORDER BY id;";
		$get_data_query = mysqli_query($conn, $sql) or die(mysqli_error($conn));
		
		if(mysqli_num_rows($get_data_query)!=0) {
			$rows = mysqli_fetch_all($get_data_query, MYSQLI_ASSOC);
		}
		else{
			$rows = array();
		}

		// Holds the total productions of each type for all players this turn
		$total_productions = array(0, 0, 0);

		foreach ($rows as $row) {
			$nodeGraph = json_decode($row["node_graph"], true);
			$productions = array(0, 0, 0);

			foreach ($nodeGraph as $i => $node) {
				$type = intval($node["type"]);
				$yield = intval($node["yield"]);

				if(!boolval($node["locked"]) && boolval($node["enabled"])) {
					$productions[$type] += $yield; 
				}
			}

			foreach($productions as $type => $production) {
				$total_productions[intval($type)] += intval($production); 
			}
		}

		// Calculate selling price for each good type
		foreach($total_productions as $type => $supply) {
			$type = intval($type);
			$supply = intval($supply);

			if ($supply < 1) {
				$supply = 1;
			}

			// Demand = random value uniformly distributed from 0.7*supply to 1.3*supply
			$demand = $supply* (0.7 + 0.6*rand(0, getrandmax())/getrandmax());

			// Selling price = constant * demand/supply
			// Goods of type A sell for 1.5* as much as goods of type B (see price_constants array)
			$price = $price_constants[$type] * $demand/$supply;
			array_push($prices, $price);  
		}

		// Write data to 'production' table for historic price tracking
		$sql = "INSERT INTO `production` (quantity_0, quantity_1, price_0, price_1) VALUES ($total_productions[0], $total_productions[1], $prices[0], $prices[1]);";
		mysqli_query($conn, $sql);

		return $prices;
	}


