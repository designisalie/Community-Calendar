<?php
	include 'connect.php';
	
	$keywords = $_POST['keywords'];
	
	$query = "SELECT DISTINCT city, state, MATCH(city, state) AGAINST ('$keywords') as relevance FROM events WHERE MATCH(city, state) AGAINST ('$keywords*' IN BOOLEAN MODE) ORDER by relevance DESC LIMIT 1";
	$sql = mysql_query($query); 
	
	while ($fetch = mysql_fetch_assoc($sql)){
		echo $fetch['city'] . ", " . $fetch['state'];
	}

	mysql_close($connection);
?>