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

    $sql_before = 'SELECT * FROM department';

	$resultFirst = $conn->query($sql_before);

	$resultBefore = [];
	if($resultFirst -> num_rows >0){
		while($row = $resultFirst-> fetch_assoc()){
			array_push($resultBefore, $row);
		}
	}
	else{
		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];
		exit;
	}	


    
	$query = $conn->prepare('DELETE FROM department WHERE name = ? ');

	$query->bind_param("s", $_POST['deptName']);

	$query->execute();


    $sql_after = 'SELECT * FROM department';

	$resultSecond = $conn->query($sql_after);

	$resultAfter = [];
	if($resultSecond -> num_rows >0){
		while($row = $resultSecond-> fetch_assoc()){
			array_push($resultAfter, $row);
		}
	}
	else{
		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];
		exit;
	}

    $resultBeforeCount = count($resultBefore);
    $resultAfterCount = count($resultAfter);
    echo('Succesfully deleted ' . $_POST['deptName']. ' from Company Directory');
    if($resultAfterCount - $resultBeforeCount == 1){
        $output['status']['code'] = '200';
		$output['status']['name'] = 'ok';
		$output['status']['descsription'] = 'success';
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];
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