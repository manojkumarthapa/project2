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


	$fname = $_POST['fName'];
	$lname = $_POST['lName'];
	$email = $_POST['email'];


	$countBeforeRows = 'SELECT * FROM personnel';
	$countBeforeRowsRun = $conn -> query($countBeforeRows);
	$rowsBeforeRows = [];
	
	if($countBeforeRowsRun -> num_rows >0){
		while($row = $countBeforeRowsRun-> fetch_assoc()){
			array_push($rowsBeforeRows, $row);
		}
	}
	$rowsBeforeCount = count($rowsBeforeRows);

	

	$stmt = $conn->prepare("INSERT INTO personnel (firstName, lastName, jobTitle, email, departmentID) VALUES (?, ?,'',?,'')");
	$stmt->bind_param('sss',$fname , $lname, $email);	
	$stmt->execute();


	// $conn->query($sql);
	$sql2 = 'SELECT * FROM personnel  LEFT JOIN department on personnel.departmentID = department.id LEFT JOIN location on department.locationID = location.id ';
	$result2 = $conn->query($sql2);
	$resultData = [];
	if($result2 -> num_rows > 0){
		while($row = $result2-> fetch_assoc()){
			array_push($resultData, $row);
		}
		$rowsAfterCount = count($resultData);
		if($rowsAfterCount - $rowsBeforeCount == 1){
			$output['status']['code'] = '200';
			$output['status']['name'] = 'ok';
			$output['status']['descsription'] = 'success';
			$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
			$output['data'] = $fname. " ". $lname. " added to Company Directory";
			}
		else{
			$output['status']['code'] = "400";
			$output['status']['name'] = "executed";
			$output['status']['description'] = "query failed";	
			$output['data'] = [];
			exit;
		}
	}

	
	
	


	echo json_encode($output);
	mysqli_close($conn);
?>