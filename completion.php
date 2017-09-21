<?php
$query = $_POST['requestDate'];
$sendMsg = array();
$status = mysql_connect("localhost", "root", "leslie2017");
if (!$status) {
	# code...
	die('Could not connect:' .mysql_error());
}
mysql_select_db("project_database",$status);

$result = mysql_query("SELECT * FROM Project_Data WHERE collectDate='$query'");
$qunaity = 0;
while ($rows = mysql_fetch_array($result)) {
	# code...
	$sendMsg[$qunaity] = "effective energy(j): ".$rows['effective']." supply energy(j): ".$rows['supply']." efficiency(%): ".$rows['efficiency']." collectDate: ".$rows['collectDate']." collectTime: ".$rows['collectTime'];
	$qunaity += 1;
}
if ($qunaity == 0) {
	# code...
	$sendMsg[$qunaity] = "no data saved in project_database";
}
echo json_encode($sendMsg);
mysql_close($status);

?>