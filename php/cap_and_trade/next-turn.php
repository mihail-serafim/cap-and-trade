<?php
	include_once('config.php');
	include_once('get-prices.php');

	// Compute the selling price per unit of each good
	$prices = getGoodsPrices($conn);

	$sql = "SELECT * FROM `user_saves` ORDER BY id;";
	$get_data_query = mysqli_query($conn, $sql) or die(mysqli_error($conn));
	
	if(mysqli_num_rows($get_data_query) === 0) {
		echo "error getting all user's data";
		echo mysqli_error($conn);
		exit();
	}
	
	while ($data = mysqli_fetch_array($get_data_query, MYSQLI_ASSOC)) {
		$id = $data["id"];

		// Parse data
		$node_graph = json_decode($data["node_graph"], true);
		$research_trees = json_decode($data["research_trees"], true);
		$currency = mysqli_real_escape_string($conn, $data['currency']);
		$research = mysqli_real_escape_string($conn, $data['research']);
		$curr_emissions = mysqli_real_escape_string($conn, $data['curr_emissions']);
		$emissions_cap = mysqli_real_escape_string($conn, $data['emissions_cap']);

		// Parse research tree to get production multipliers
		$productionResearchIncreases = array(1, 1, 1);
		$researchNode = $research_trees["children"][0];

		for($i = 0; $i < count($productionResearchIncreases); $i++) {
			$isLocked = boolval($researchNode["children"][$i]["locked"]);

			if (!$isLocked) {
				$productionResearchIncreases[$i] += $researchNode["children"][$i]["multiplier"];	
			}
		}

		$researchNode = $researchNode["children"][2];
		if (!boolval($researchNode["children"][0]["locked"])) {
			$productionResearchIncreases[2] += $researchNode["children"][0]["multiplier"];	
		}

		// Parse node graph and get user's production quantity for each type of goods
		$productions = array(0, 0, 0);
		foreach ($node_graph as $i => $node) {
			$type = intval($node["type"]);
			$yield = intval($node["yield"]);

			if(!boolval($node["locked"]) && boolval($node["enabled"])) {
				$productions[$type] += $yield * $productionResearchIncreases[$type]; 
			}
		}

		// Parse research tree to get revenue multipliers
		$revenueResearchIncreases = array(1, 1);
		$researchNode = $research_trees["children"][2]["children"][0];

		if (!boolval($researchNode["locked"])) {
			$revenueResearchIncreases[0] += $researchNode["multiplier"];
			$revenueResearchIncreases[1] += $researchNode["multiplier"];		
		}

		for ($i = 0; $i < count($revenueResearchIncreases); $i++) {
			$isLocked = boolval($researchNode["children"][$i]["locked"]);

			if (!$isLocked) {
				$revenueResearchIncreases[$i] += $researchNode["children"][$i]["multiplier"];	
			}
		}

		// User revenue given number of each type produced and unit price of type
		$revenue = 0;
		$min_price = 0;
		for ($type = 0; $type < 2; $type++) {
			$revenue += $prices[$type] * $productions[$type] * $revenueResearchIncreases[$type];
		}

		// Compute fines for over-emitting
		if ($curr_emissions > $emissions_cap) {
			$fines_scale = 0.25;
			$fines = ($curr_emissions - $emissions_cap) * $fines_scale;
		} else {
			$fines = 0;
		}

		$lobbyGovernmentResearchNode = $research_trees["children"][1]["children"][1];

		if (!boolval($lobbyGovernmentResearchNode["locked"])) {
			$fineMultiplier = $lobbyGovernmentResearchNode["multiplier"];
		} else {
			$fineMultiplier = 1;
		}

		// Add the total currency earned this turn
		if ($currency + $revenue - $fines > 0) {
			$currency += $revenue - ($fines * $fineMultiplier);
		} else {
			$currency = 0;
		}
		
		// Add the total research earned this turn
		$research += $productions[2];

		// Add or remove emissions limit for this turn
		$daily_emissions_amount = 200;

		$newEmissions = $emissions_cap + $daily_emissions_amount - $curr_emissions;

		if ($newEmissions > 0) {
			$emissions_cap = $newEmissions;
		} else {
			$emissions_cap = 0;
		}

		// Update user values in DB
		$sql = "UPDATE `user_saves` SET currency = '$currency', research = '$research', emissions_cap = '$emissions_cap' WHERE id = $id;";
		mysqli_query($conn, $sql);
	}

@mysqli_close($conn);

