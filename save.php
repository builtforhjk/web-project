<?php
$receiveMsg_size = intval($_POST['count']);
$receiveMsg_date = $_POST['date'];
$receiveMsg_time = $_POST['time'];
$receiveMsg_effective = $_POST['effective'];
$receiveMsg_efficiency = $_POST['efficiency'];
$receiveMsg_supply = $_POST['supply'];
$status = mysql_connect("localhost", "root", "leslie2017");
if (!$status) {
	# code...
	die('Could not connect:' .mysql_error());
}
mysql_select_db("project_database", $status);

for ($i=0; $i < $receiveMsg_size; $i++) { 
	# code...
	$efficiency_stringToFloat = floatval($receiveMsg_efficiency[$i]);
	$effective_stringToFloat = floatval($receiveMsg_effective[$i]);
	$supply_stringToFloat = floatval($receiveMsg_supply[$i]);
	$record="INSERT INTO Project_Data (effective,supply,efficiency, collectDate, collectTime)
	VALUES
	('$effective_stringToFloat','$supply_stringToFloat','$efficiency_stringToFloat','$receiveMsg_date','$receiveMsg_time[$i]')";
	if (!mysql_query($record,$status)) {
		# code...
		die('Error: '.mysql_error());
	}
}
mysql_close($status);
echo $receiveMsg_size."records are added";
?>