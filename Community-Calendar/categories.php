<?php
	include 'connect.php';
	
	$city = $_POST['city'];
	$state = $_POST['state'];
	$saved = $_POST['saved'];
	$array = $_POST['array'];
	
	$cookie = explode(',', $array);
	$amount = count($cookie);
	
	//FOR CATEGORIES
	if(!$saved){
		$query = "SELECT type, COUNT(*) AS count FROM events WHERE city='$city' && state='$state' GROUP BY type ASC";
		echo "<span class='categories selected'>show all</span>";
	}else{
		$query = "SELECT type, COUNT(*) AS count FROM events WHERE id IN ($saved) GROUP BY type ASC";
		echo "<span id='saved' class='categories saved selected' data='" . $saved . "'>saved</span>";
	}
	
	$sql = mysql_query($query); 

	while ($fetch = mysql_fetch_assoc($sql)){
		echo "<span class='categories' type='" . $fetch['type'] . "'>" . $fetch['type'] . " (" . $fetch['count'] . ")</span>";
		//echo "<span class='items'> (" . $fetch['count'] . ") </span>";
	}
	
	//FOR COST
	$costQuery = "SELECT cost, COUNT(*) AS count FROM events WHERE city='$city' && state='$state' GROUP BY cost DESC";
	$cSql = mysql_query($costQuery);
	
	while ($fetch = mysql_fetch_assoc($cSql)){
		echo "<span class='categories' cost='" . $fetch['cost'] . "'>" . $fetch['cost'] . " (" . $fetch['count'] . ")</span>";
	}
	
	if(!$saved && $array){
		echo "<span id='saved' class='categories saved'>saved (" . $amount . ")</span>";
	}
	
	mysql_close($connection);
?>