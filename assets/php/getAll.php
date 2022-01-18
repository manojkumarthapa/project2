<?php

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    include("config.php");

    header('Content-Type: application/json; charset=UTF-8');

    $conn = new mysqli($cd_host, $cd_user,$cd_password ,$cd_dbname);
	
	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		exit;

	}	


	$sql = 'SELECT * FROM personnel  LEFT JOIN department on personnel.departmentID = department.id LEFT JOIN location on department.locationID = location.id ';
	$result = $conn->query($sql);

	$resultData = [];
	if($result -> num_rows >0){
		while($row = $result-> fetch_assoc()){
			array_push($resultData, $row);
		}
		function sorting($a, $b){
        	return $a['firstName'] <=> $b['firstName'];
    	}
		usort($resultData, 'sorting');
		$output['status']['code'] = '200';
		$output['status']['name'] = 'ok';
		$output['status']['descsription'] = 'success';
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = $resultData;
	}
	else{
		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];
		exit;
	}	
	

	echo json_encode($output);
	mysqli_close($conn);
?>