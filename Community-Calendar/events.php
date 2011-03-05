<?php
	include 'connect.php';
	
	$city = $_POST['city'];
	$state = $_POST['state'];
	$category = $_POST['category'];
	$cost = $_POST['cost'];
	$saved = $_POST['saved'];
	$array = $_POST['array'];
	$more = $_POST['more'];
	if(!$more){$more = 0;}
	
	$cookie = explode(',', $array);
	
	if(!$saved){
		if($category){
			//WITH CATEGORY
			$query = "SELECT * FROM events WHERE city='$city' && state='$state' && type='$category' ORDER BY timeid ASC LIMIT $more,5";
		}else if($cost){
			//COST
			$query = "SELECT * FROM events WHERE city='$city' && state='$state' && cost='$cost' ORDER BY timeid ASC LIMIT $more,5";
		}else{	
			//FOR EVENTS
			$query = "SELECT * FROM events WHERE city='$city' && state='$state' ORDER BY timeid ASC LIMIT $more,5";
		}
	}else{
		if(!$category){
			//SAVED
			$query = "SELECT * FROM events WHERE id IN ($saved) ORDER BY timeid ASC LIMIT $more,5";
		}else{
			//SAVED WITH CATEGORY
			$query = "SELECT * FROM events WHERE id IN ($saved) && type='$category' ORDER BY timeid ASC LIMIT $more,5";
		}
	}
	
	$sql = mysql_query($query); 
	
	echo "<div id='location' city='" . $city . "' state='" . $state . "' saved='" . $saved . "'>";
		//echo "<span>" . $city . ", " . $state . "</span>";
	echo "</div>";
	
	$day = 0;
	$year = 0;
	
	while ($fetch = mysql_fetch_assoc($sql)){
		if($day !== $fetch['date'] || $year !== $fetch['year']){
			echo "<span class='date'>" . $fetch['day'] . ", " . $fetch['month'] . " " . $fetch['date'] . ", " . $fetch['year'] .  "</span>";
		}
		
		$day = $fetch['date'];
		$year = $fetch['year'];
		
		if($fetch['time'] == 2400){
			$time = 'midnight';
		}else if($fetch['time'] == 1200){
			$time = 'noon';
		}else if($fetch['time'] > 1200 && $fetch['time'] != 2400){
			$timeFix = $fetch['time'] - 1200;
			$time = substr_replace($timeFix,':',-2,0) . ' pm';
		}else{
			$time = substr_replace($fetch['time'],':',-2,0) . ' am';
		}
		
		echo "<div id='" . $fetch['id'] . "' class='event " . (($i^=1) ? 'odd' : 'even') . "'>";
			echo "<div class='hit' url='" . $fetch['url'] . "'>";
				echo "<span class='type'>" . $fetch['type'] . "</span>";
				echo "<span class='time'>" . $time . "</span>";
				echo "<span class='title'>" . $fetch['title'] . "</span>";
				echo "<span class='count'>" . $fetch['attend'] . " people attending</span>";
				if($fetch['image']){echo "<span class='image'><img src='" . $fetch['image'] . "' /></span>";}
				if($fetch['embed']){echo "<span class='embed'>" . $fetch['embed'] . "</span>";}
				echo "<span class='descript'>" . $fetch['description'] . "</span>";
			echo "</div>";
			if($fetch['address']){echo "<span class='address'>" . $fetch['address'] . "</span>";}
			if($fetch['url']){
				echo "<span class='url' title='open in new tab'><a href='" . $fetch['url'] . "' target='_blank'>website</a></span>";
			}else{
				echo "<span class='filler'></span>";
			}
			echo "<span class='paid'>" . $fetch['cost'] . "</span>";
			echo "<span class='attend' data='" . $fetch['id'] . "' title='click if you are attending'>attend</span>";
			if($saved || in_array($fetch['id'],$cookie, TRUE)){
				echo "<span class='unsave' data='" . $fetch['id'] . "' title='unsave this event'>unsave</span>";
			}else{
				echo "<span class='save' data='" . $fetch['id'] . "' title='save this event'>save</span>";
			}
			echo "<span class='extra' title='menu'>+</span>";
		echo "</div>";
		echo "<div class='alert'></div>";
	}
	
	$count = $more + 5;
	if($saved && !$category){
		$check = mysql_query("SELECT * FROM events WHERE id IN ($saved) LIMIT $count,1");
	}else if($saved && $category){
		$check = mysql_query("SELECT * FROM events WHERE id IN ($saved) && type='$category' LIMIT $count,1");
	}else if($category && !$saved){
		$check = mysql_query("SELECT * FROM events WHERE city='$city' && state='$state' && type='$category' LIMIT $count,1");
	}else if($cost){
		$check = mysql_query("SELECT * FROM events WHERE city='$city' && state='$state' && cost='$cost' LIMIT $count,1");
	}else{
		$check = mysql_query("SELECT * FROM events WHERE city='$city' && state='$state' LIMIT $count,1");
	}
	
	$rows = mysql_num_rows($check);
	
	if($rows > 0){
		echo "<span id='loadMore' data='" . $count . "'>load more...</span>";
	}
	
	mysql_close($connection);
?>