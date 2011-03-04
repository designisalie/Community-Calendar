<?php
	$id = $_POST['id'];
	
	include 'connect.php';
	
	$vote = "UPDATE events SET attend = attend + 1 WHERE id = $id";
	mysql_query($vote);

	mysql_close($connection);
?>