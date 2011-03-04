<!doctype html>
<html>
<head>
    <meta charset='utf-8' />
    <title>Calendar</title>
    <link rel='stylesheet' href='css/layout.css'>
</head>
<body>
	<div id='alerts'></div>
    <div id='top'>
        <div id='search'>
            <label class='city'>Enter your city.</label>
            <label id='resultCity'></label>
            <input type='text' name='city' value="<?php
            //$geoplugin = unserialize( file_get_contents('http://www.geoplugin.net/php.gp?ip=' . $_SERVER['REMOTE_ADDR']) );
           // echo $geoplugin['geoplugin_city'] . ", " . $geoplugin['geoplugin_regionName'];
        ?>" />
        	<span id='hide'>hide</span>
        	<span id='saveCity'>save</span>
        </div>
        
    </div>
    <div id='create'>
		<div id='form'>
            <span class='form'>
                <label id='eventLabel' class='left'>event name</label>
                <input type='text' id='eventName' name='event' />
            </span>
            <span class='form'>
                <label id='aboutLabel' class='left'>event description</label>
                <input type='text' id='eventDescript' name='description' />
            </span>
            <span class='form'>
                <label id='typeLabel' class='left'>event type</label>
                <input type='text' id='eventType' name='type' />
            </span>
            <span class='form'>
                <label id='addressLabel' class='left'>event address</label>
                <input type='text' id='eventAddress' name='address' />
            </span>
            <span class='form'>
                <label id='websiteLabel' class='left'>event website</label>
                <input type='text' id='eventUrl' name='url' />
            </span>
            <span class='form'>
                <label id='imageLabel' class='left'>event image</label>
                <input type='text' id='eventImage' name='image' />
            </span>
            <span class='form'>
                <label id='videoLabel' class='left'>event video</label>
                <input type='text' id='eventVideo' name='video' />
            </span>
            <span class='form'>
                <label id='dateLabel' class='left'>date</label>
                <select class='eventDate'>
                    <option>monday</option>
                    <option>tuesday</option>
                    <option>wednesday</option>
                    <option>thursday</option>
                    <option>friday</option>
                    <option>saturday</option>
                    <option>sunday</option>
                </select>
                <select class='eventDate'>
                    <option>01</option>
                    <option>02</option>
                    <option>03</option>
                    <option>04</option>
                    <option>05</option>
                    <option>06</option>
                    <option>07</option>
                    <option>08</option>
                    <option>09</option>
                </select>
                <select class='eventDate'>
                	<option>january</option>
                    <option>february</option>
                    <option>march</option>
                    <option>april</option>
                    <option>may</option>
                    <option>june</option>
                    <option>july</option>
                    <option>august</option>
                    <option>september</option>
                    <option>october</option>
                    <option>november</option>
                    <option>december</option>
                </select>
               <select class='eventDate'>
                    <option>2011</option>
                    <option>2012</option>
                    <option>2013</option>
                    <option>2014</option>
                    <option>2015</option>
                </select>
            </span>
            <span class='form'>
                <label id='timeLabel' class='left'>time</label>
                <select class='eventTime'>
                    <option>01</option>
                    <option>02</option>
                    <option>03</option>
                    <option>04</option>
                    <option>05</option>
                    <option>06</option>
                    <option>07</option>
                    <option>08</option>
                    <option>09</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                </select>
                <select class='eventTime'>
                    <option>00</option>
                    <option>15</option>
                    <option>30</option>
                    <option>45</option>
                    <option>59</option>
                </select>
                <select class='eventTime'>
                    <option>am</option>
                    <option>pm</option>
                </select>
            </span>
            <span class='form'>
                <label id='costLabel' class='left'>$$$</label>
                <input type='radio' name='meow' value='' />
                <label class='cost'>$</label>
                <input type='radio' name='meow' />
                <label class='cost'>$$</label>
                <input type='radio' name='meow' />
                <label class='cost'>$$$</label>                
                <input type='radio' name='meow' />
                <label class='cost'>free</label>
            </span>
            <span class='form'>
                <label id='mathsLabel' class='left'>1 + 1 = ?</label>
                <input type='text' id='eventMaths' name='maths' />
            </span>
            <span class='form'>
            	<label>
                	<button id='submitAd' onclick='validateAd()'>Submit.</button>
                </label>
                <span id='submitError'></span>
                <span id='close'>close.</span>
            </span>
		</div>
    </div>
    <div id='content'>
    	<div id='categories'></div>
        <div id='events'></div>
    </div>
    <div id='iframe'>
    	<iframe src='' frameborder='0' seamless></iframe>
    </div>
    <script src='https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js'></script>
    <!--<script src='https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.6/jquery-ui.min.js'></script>-->
    <script src='js/baseQuery.js'></script>
</body>
</html>