//DocumentReady
$(function(){
	//TEMP CITY INSTANT TEMP DELETE ME
	var city = 'los angeles, california';
	viewEvents(city);
	//IEconsoleFix grrrr.
	if (!window.console) console = { log : function(){} };
	//CheckUrlTimer
	window.onhashchange = checkUrl;
	//CheckUrl
	//checkUrl();
	//MinimizeMaximizeiFrame
	$('#hide').click(function(){
		if($(this).text() == 'hide'){
			$(this).text('show');
			$('#content').stop().animate({left : -602});
			$('#iframe').stop().animate({left : 0, width : '100%'});
			
			var width = $(window).width();
			$('#create').animate({left : width}, function(){
				$(this).hide();
			});
		}else{
			var right = $(window).width() - 602;
			$(this).text('hide');
			$('#content').stop().animate({left : 0});
			$('#iframe').stop().animate({left : 602, width : right});
		}
	});
	
	//IframeWidthHeight
	var width = $(window).width() - 603;
	var height = $(window).height() - 40;
	$('#iframe').width(width);
	$('#events,#iframe').height(height);
	//CreateWidth
	$('#create').css({width : width});
	//Resize
	$(window).resize(function(){
		if($('#hide').text() != 'show'){
			var width = $(window).width() - 603;
			$('#iframe').width(width);
		}
		var height = $(window).height() - 40;
		$('#events,#iframe').height(height);
		//CreateWidth
		$('#create').css({width : width});
	});
	//FocusBlur
	$('#search input').focus();
	$('#search input').focus(function(){
		$('#search label, #search input').css({'text-shadow' : '0 1px rgba(256,256,256,.9)'});
	});
	$('#search input').blur(function(){
		$('#search label, #search input').css({'text-shadow' : '0 -1px rgba(0,0,0,.3)'});
	});
	//ClickLabel
	$('#search label').click(function(){
		var city = $(this).text();
		$('#search input').focus();
		if(city == 'create one for your city'){
			$('#create').show().animate({left : 602});
		}else if(city == 'Enter your city.'){
			return false;
		}else{
			console.log(city);
			viewEvents(city);
		}
	});
	//DelayOrEnterSubmitSearch
	var delayTimer;
	$("#search input").keyup(function(event){
		clearTimeout(delayTimer);
		
		if($(this).val() === 'la'){
			$(this).val('los angeles, california');
		}else if($(this).val() === 'nyc'){
			$(this).val('new york city, new york');
		};
		
		if(event.keyCode == 39){	//right
			var city = $('#resultCity').text();
			$(this).val(city);
			$('#resultCity').text('');
		}
		
		if(event.keyCode == 13){	//Enter
			if($('#resultCity').text() === ''){
				var stepII = true;
				searchCity(stepII);
			}else{						
				var city = $('#resultCity').text();
				console.log(city);
				viewEvents(city);
			}
		}else if($(this).val() !== '' && event.keyCode !== 32 && event.keyCode !== 39){	//Spacebar
			//Delay
			delayTimer = setTimeout(function(){ searchCity(); }, 500);
		}else{
			return false;
		}
	});
	$("#search input").one('keydown',function(){
		var label = $(this).attr('name');
		$('label.'+label).fadeOut();
	});
	//ClickLocation 
	$('#cities .location').live('click', function(){
		var city = $(this).text();
		viewEvents(city);
	});
	//CloseInputForm
	$('#close').click(function(){
		var width = $(window).width();
		$('#create').animate({left : width}, function(){
			$(this).hide();
		});
	});
	//ClickEvent iFrame Website
	$('.hit').live('click', function(){
		var url = $(this).attr('url');
		if(!url){
			var address = $(this).next('.address').text();
			url = 'http://maps.google.com/maps?q=' + address;
		}
		$('#iframe iframe').attr('src', url)
		console.log(url);
		$('.event').removeClass('selected');
		$(this).parent().addClass('selected');
		if($('#create').position().left == 602){
			var width = $(window).width();
			$('#create').animate({left : width}, function(){
				$(this).hide();
			});
			console.log('create moved');
		}
	});
	//Click Categories
	$('.categories').live('click', function(){
		if(!$(this).hasClass('selected')){
			$('.categories').removeClass('selected');
			if(!$(this).hasClass('saved')){
				categories(this);
			}else{
				savedEvents();
			}
		}else{
			return false;
		}
	});
	//ClickEventAddress iFrame Google Maps
	$('.address').live('click', function(){
		var address = $(this).text();
		var meow = 'http://maps.google.com/maps?q=' + address;
		$('#iframe iframe').attr('src', meow)
		console.log(address);
		$('.event').removeClass('selected');
		$(this).parent().addClass('selected');
		if($('#create').position().left == 602){
			var width = $(window).width();
			$('#create').animate({left : width}, function(){
				$(this).hide();
			});
			console.log('create moved');
		}
	});
	//ClickLoadMore Load More Events
	$('#loadMore').live('click', function(){
		loadMore();
	});
	//ClickAttend +1 to attending
	$('.attend').live('click', function(){
		var id = $(this).attr('data');
		attend(id);
	});
	//ClickSave
	$('.save').live('click', function(){
		save(this);
		$(this).parent().next().slideDown();
	});
	//ClickUnSave
	$('.unsave').live('click', function(){
		unsave(this);
	});
	//SaveCity
	$('#saveCity').click(function(){
		saveCity();
	});
	//ClickAdd add event
	$('#add').click(function(){
		$('#create').show().animate({left : 602});
	});
	//HideAlerts
	$('#alerts').click(function(){
		$(this).animate({'margin-top' : -50});
	});
	//bound = false;
	//console.log('unbound');
});

function scrollCheck(){
	$('#events').bind('scroll', function(event){
		var bar = $(this).scrollTop() + $(this).height();
		var height = $(this).attr('scrollHeight');
		var over = bar/height;
		bound = true;
		//console.log(bound);
		//console.log(bar);
		//console.log(height);
		if(bar == height && $('#loadMore').length){
			loadMore();
			console.log('load more');
		}
	});
}
function searchCity(obj){
	var keywords = $('#search input').val().replace("'",' ');
	
	$.ajax({
		type: 'POST',
		url: 'search.php',
		data: 'keywords=' + keywords,
		success: function(Txt){	
			if(!Txt){
				$('#resultCity').text('create one for your city');
			}else{
				$('#resultCity').text(Txt);
				console.log('search ajax ran.');
				console.log(keywords);
				viewEvents(Txt);
			}
		},
		error: function(){
			console.log('search Error.')
			document.title = '3RR0R.';
		}
	});
}
//ValidatePost
function validateEvent(){
	var title = $('#postTitle').val();
	var txt = $('#postTxt').val();
	var image = $('#postImage').val();
	var keywords = $('#postKeywords').val();
	var email = $('#postEmail').val();
	var maths = $('#postMaths').val();

	if(!title || !txt || !image || !maths ){
		$('#submitError').text('Error.');
	}else{
		submitAd(title,txt,image,keywords,email);
	};
	//alert
	$('#alerts').animate({'margin-top' : 0});
}
//PostAd
function submitEvent(t,tt,i,k,e){
	var getdate = new Date();

	$.ajax({
		type: 'POST',
		url: 'submitAd.php',
		data: 'title=' + t + '&txt=' + tt + '&image=' + i + '&keywords=' + k + '&email=' + e,
		success: function(Txt){
			$('#submitError').text('Submitted.');
		},
		error: function(Txt){
			$('#submitError').text('3RR0R.');
			console.log('Submit Ad Error.' + Txt)
			document.title = '3RR0R.';
		}
	});
}
//ViewAd
function viewEvents(obj,mrau){
	var cookie = getCookie('Saved');
	if(cookie){
		var array = cookie.replace(/\|/g,'');
	}else{
		var array = '';
	}
	
	if(!mrau){
		var loc = obj.split(', ');
		var city = loc[0];
		var state = loc[1];

		document.location.hash = '/' + city + '/' + state;
	}else{
		var city = obj;
		var state = mrau;
	}
	
	$('#events').unbind('scroll'); //unbind scroll
	bound = false;
	console.log('unbound');
	
	$('.event').animate({opacity : .5});
	$('.categories').animate({opacity : .5});
	
	//LoadEvents
	$.ajax({
		type: 'POST',
		url: 'events.php',
		data: 'city=' + city + '&state=' + state + '&array=' + array,
		success: function(Txt){
				$('#events').html(Txt);
				console.log('events ran. ' + city);
				$('#events').attr('back','');
				if($('#loadMore').length && !bound) { scrollCheck(); }
				console.log('bound');
				$('#search input').val(city + ', ' + state);
		},
		error: function(Txt){
			$('#events').html(Txt);
			console.log('View Ad Error.' + Txt);
			document.title = '3RR0R.';
		}
	});
	
	//LoadCategories
	$.ajax({
		type: 'POST',
		url: 'categories.php',
		data: 'city=' + city + '&state=' + state + '&array=' + array,
		success: function(Txt){
				$('#categories').html(Txt);
				console.log('categories ran. ' + city)
		},
		error: function(Txt){
			$('#categories').html(Txt);
			console.log('categories Error.' + Txt);
			document.title = '3RR0R.';
		}
	});
}
//LoadMoreEvents
function loadMore(){
	var count = $('#loadMore').attr('data');
	var city = $('#location').attr('city');
	var state = $('#location').attr('state');
	var category = $('#categories .selected').attr('type');
	if(!category){category = ''};
	var cost = $('#categories .selected').attr('cost');
	if(!cost){cost = ''};
	var saved = '';
	if(!city){ var saved = $('#saved').attr('data'); }
	
	var cookie = getCookie('Saved');
	if(cookie){
		var array = cookie.replace(/\|/g,'');
	}else{
		var array = '';
	}

	$('#events').unbind('scroll'); //unbind scroll
	bound = false;
	console.log('unbound');
	
	$('#loadMore').text('').addClass('remove');
	$('#loadMore').css({'background' : 'url(gif.gif) no-repeat center center'});
			
	$.ajax({
		type: 'POST',
		url: 'events.php',
		data: 'city=' + city + '&state=' + state + '&more=' + count + '&category=' + category + '&cost=' + cost + '&saved=' + saved + '&array=' + array,
		success: function(Txt){
			$('#loadMore.remove').remove();
			$('#events').append(Txt);
			//$('#events').animate({scrollTop: '+=225'});
			if($('#loadMore').length && !bound) { scrollCheck(); }
			console.log('bound');
		},
		error: function(Txt){
			console.log('more Error.' + Txt)
			document.title = '3RR0R.';
		}
	});
}
//ShowCategory
function categories(obj){
	var category = $(obj).attr('type');
	if(!category){ var category = ''; }
	var cost = $(obj).attr('cost');
	if(!cost){ var cost = ''; }
	var city = $('#location').attr('city');
	var state = $('#location').attr('state');
	var saved = '';
	if(!city){ var saved = $('#saved').attr('data'); }
	
	$('#events').unbind('scroll'); //unbind scroll
	bound = false;
	console.log('unbound');

	$('.event, .date').animate({opacity : .5});
	
	$.ajax({
		type: 'POST',
		url: 'events.php',
		data: 'city=' + city + '&state=' + state + '&category=' + category + '&cost=' + cost + '&saved=' + saved,
		success: function(Txt){
			$('#events').html(Txt);
			$(obj).addClass('selected');
			//$('#events').animate({opacity : 1});
			if($('#loadMore').length && !bound){ scrollCheck(); }
			console.log('bound');
		},
		error: function(Txt){
			console.log('cat Error.' + Txt)
			document.title = '3RR0R.';
		}
	});
}
//Plus1Attend
function attend(obj){
	var Cookie = getCookie(obj);
		
	if(navigator.cookieEnabled == false){
		alert('enable cookies. kthxbai.');
	}else{
		if(Cookie == null){
			setCookie(obj,'Yes',2222,01,22);
	
			$.ajax({
				type: 'POST',
				url: 'attend.php',
				data: 'id=' + obj,
				success: function(Txt){
					$('#'+obj+' .count').html('you are<br />attending');
				},
				error: function(Txt){
					console.log('attend Error.' + Txt)
					document.title = '3RR0R.';
				}
			});
			
		}else{
			$('#'+obj+' .count').html('already<br />attending');
		}
	}
}
//SaveEvent
function save(obj){
	var saved = '|' + $(obj).attr('data') + '|';
	var cookie = getCookie('Saved');
	console.log(cookie);
	$(obj).text('saved').css({'padding-left' : '6px','padding-right' : '4px'});
	
	if(cookie){
		if(cookie.indexOf(saved) == -1){
			var update = cookie + ',' + saved;
			setCookie('Saved',update,2222,01,22);
			console.log(update);
		}else{
			return false;
		}
	}else{
		setCookie('Saved',saved,2222,01,22);
	}
}
//ViewSavedEvents
function savedEvents(){
	var cookie = getCookie('Saved');
	console.log(cookie);
	
	$('#events').unbind('scroll'); //unbind scroll
	bound = false;
	console.log('unbound');

	if(!cookie){
		$('#events').prepend('awww no cookies for u');
	}else{
		var saved = cookie.replace(/\|/g,'');
		console.log(saved);
		document.location.hash = '/saved';
		//Events
		$.ajax({
			type: 'POST',
			url: 'events.php',
			data: 'saved=' + saved,
			success: function(Txt){
				$('#events').html(Txt);
				if($('#loadMore').length && !bound) { scrollCheck(); }
				console.log('bound');
			},
			error: function(Txt){
				console.log('saved Error.' + Txt)
				document.title = '3RR0R.';
			}
		});
		//Categories
		$.ajax({
			type: 'POST',
			url: 'categories.php',
			data: 'saved=' + saved,
			success: function(Txt){
				$('#categories').html(Txt);
			},
			error: function(Txt){
				console.log('saved cat Error.' + Txt)
				document.title = '3RR0R.';
			}
		});
	}
}
//unsaveEvent
function unsave(obj){
	var unsave = '|' + $(obj).attr('data') + '|';
	var cookie = getCookie('Saved');
	console.log(cookie);
	$(obj).text('unsaved').css({'padding' : '5px 8px 0 2px'});
	
	if(cookie){
		if(cookie.indexOf(',' + unsave) !== -1){
			var update = cookie.replace(','+unsave,'');
			setCookie('Saved',update,2222,01,22);
			console.log(update);
		}else if(cookie.indexOf(unsave + ',') !== -1){
			var update = cookie.replace(unsave+',','');
			setCookie('Saved',update,2222,01,22);
			console.log(update);
		}else if(cookie.indexOf(unsave) !== -1){
			var update = cookie.replace(unsave,'');
			setCookie('Saved',update,2222,01,22);
			console.log(update);
		}else{
			return false;
		}
	}
	
}
//SaveCity
function saveCity(){
}
//CheckBrowserUrl
function checkUrl(){
	var hash = location.hash.replace('#/','');
	var loc = hash.split('/');
	var city = loc[0];
	var state = loc[1];
	var current = $('#location').attr('city');
	
	if(city != current){
		if(city == 'saved'){
			savedEvents();
			console.log('check saved');
		}else{
			viewEvents(city,state);
			console.log('check city');
		}
	}
}
//SetCookies
function setCookie(name, value, exp_y, exp_m, exp_d, path, domain, secure) {
	var cookie_string = name + "=" + escape ( value );
	if (exp_y) {
		var expires = new Date ( exp_y, exp_m, exp_d );
		cookie_string += "; expires=" + expires.toGMTString();
	}
	if (path)
		cookie_string += "; path=" + escape ( path );
	if (domain)
		cookie_string += "; domain=" + escape ( domain );
	if (secure)
		cookie_string += "; secure";
	document.cookie = cookie_string;
}
//GetCookies
function getCookie(cookie_name){
	var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
	if ( results )
		return ( unescape ( results[2] ) );
	else
		return null;
}
//DeleteCookie
function deleteCookie(cookie_name){
	var cookie_date = new Date ( );
	cookie_date.setTime ( cookie_date.getTime() - 1 );
	document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
}