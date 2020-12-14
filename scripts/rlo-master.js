// JavaScript Document

// function to detect availability of local storage
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return false;
    }
}

// Cookie functions
function get_cookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function set_cookie(cookie_name, cookie_value, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cookie_name + "=" + cookie_value + ";" + expires + ";path=/";
}

function delete_cookie( name ) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
}

// DEFINE variables
var audio_element = document.getElementById("read_aloud_player");
var video_element = document.getElementById("video_player");

var privacy_cookies = 0;
var privacy_storage = 0;
var privacy_analytics = 0;
var privacy_save = false;

var privacy_array = [];
var playback_speed = 1;
//var auto_narration = 0;
var hide_text = 0;
var analytics_code ='<div id="analytics_code"><!-- Your Analytics Code Here --></div>';


$().ready(function(){
	$('#myNav').css('display','none');
	var $narration_audio = '';
	
	// test for privacy cookie
	if(get_cookie('HELM_Open_Privacy_Settings') != ''){
		// we have privacy cookies
		privacy_array = JSON.parse(get_cookie('HELM_Open_Privacy_Settings'));
		//console.log(privacy_array);
		privacy_cookies = privacy_array.c;
		privacy_storage = privacy_array.ls;
		privacy_analytics = privacy_array.a;
		//console.log(privacy_cookies +', '+ privacy_storage +', '+ privacy_analytics);
		
	}
	if(privacy_analytics == 1){
		$('body').append(analytics_code);
	}
	// small screen repsotion read aloud audio player
	if($(window).width() < 768){
		
		if($('.narration_audio').length){
			
			$narration_audio = $('.narration_audio').html();
			
			$('#ss_readaloud_container').html('<div class="ss_container"><p>Narration</p>'+$narration_audio+'</div>');
			
			//console.log('we have narration');
			
		}else{
			//console.log('We do not have narration');
		}
		
		
	}
	
	$( window ).resize(function() {
		//var $narration_audio = '';
		if($( window ).width() < 768){
			$narration_audio = $('.narration_audio').html();
			if(narration_audio.length === undefined){
			   $('#ss_readaloud_container').html('<div class="ss_container"><p>Narration</p>'+$narration_audio+'</div>');
			}

		}else{
			$('#ss_readaloud_container').html('');
		}
	});
	

	
	// START main navigation trigger
	///////////////////////////////////////////////////////////////////
	$('#main_menu_trigger a').click(function(event){
		event.preventDefault();
		$(this).hide();
		$('#myNav').css('display','block');
		$('#myNav').animate({width: '100%'},100, "swing");
	});
	$('#menu_close').click(function(event){
		event.preventDefault();
		$('#main_menu_trigger a').show();
		$('#myNav').css('width','0%').css('display','none');
	});
	///////////////////////////////////////////////////////////////////
	//END main navigation trigger
	
	
	// START pause narration if video started
	///////////////////////////////////////////////////////////////////
	$('#video_player').on('play', function() {
		//console.log('video playing');
		if($('.audio_player').length){
			//console.log('we have audio narration');
			$(".audio_player").get(0).pause();
		}

	});
	///////////////////////////////////////////////////////////////////
	// END pause narration if video started
	
	// START pause video if narration started
	///////////////////////////////////////////////////////////////////
		
	$('#read_aloud_player').on('play', function() {
		//console.log('audio playing');
		
		if($('#video_player').length){
			//console.log('we have video');
			$("#video_player").get(0).pause();
		}

	});
	///////////////////////////////////////////////////////////////////
	// END pause video if narration started	

	
	
	
	
	
	// START audio video playback rate control
	///////////////////////////////////////////////////////////////////
	function modify_playback(speed){

		if($("audio").length){

			$("audio").each(function(){
				$(this).get(0).playbackRate = speed;
				$(this).get(0).defaultPlaybackRate = speed;
			})

		}
		if($("video").length){
			$("video").get(0).playbackRate = speed;
			$("video").get(0).defaultPlaybackRate = speed;
		}

	}
	
	if(get_cookie('HELM_Open_Playback_Speed') != '') {
		// we have playback speed cookie set		
		playback_speed = get_cookie('HELM_Open_Playback_Speed');
	}
	
	
	
	modify_playback(playback_speed);
	$(document.body).on('change', '#playback_rate' ,function(){
		
		modify_playback($(this).val());

		if(privacy_cookies != 0){
			// we have permission to set a cookie
			set_cookie('HELM_Open_Playback_Speed',$(this).val(),365);
		}
		
		
	});

	var playback_speed_controls = '<div class="text-center" id="adjust_playback_container"><form class="form" id="playback_speed_selection"><h3>Adjust Playback Speed</h3><label for="playback_rate">Adjust Audio/Video Playback Speed </label><div class="row"><div class="col-xs-2 col-lg-offset-2 text-right">Slower</div><div class="col-xs-7 col-lg-4"><input type="range"  name="playback_rate" id="playback_rate" min="0.5" max="1.75" step="any"></div><div class="col-xs-2">Faster</div></div><a href="#" id="playback_reset_btn" class="btn btn-warning btn-xs"><span class="glyphicon glyphicon-refresh"></span> Reset Playback Speed</a></form></div>';


	$( playback_speed_controls ).insertAfter( "#main_menu" );

	$('#playback_rate').val(playback_speed);



	$('body').on("click", "#adjust_playback_btn", function(event){
		event.preventDefault();
		$('#playback_speed_selection').toggle('slow');
	});
	$('body').on("click", "#playback_reset_btn", function(event){
		event.preventDefault();
		$('#playback_rate').val(1);
		if(privacy_cookies != 0){
			// we have permission to set a cookie
			set_cookie('HELM_Open_Playback_Speed',1,365);
		}
		playback_speed = 1;
		modify_playback(1);
	});	
	
	///////////////////////////////////////////////////////////////////
	// END audio video playback rate control
	
	
	
	// START auto narration playback control
	///////////////////////////////////////////////////////////////////
	// Chrome and firefox safari all now block this functionality
	/*
	
	if(get_cookie('HELM_Open_Narration_Autoplay') != '') {
		// we have Narration Autoplay cookie set		
		playback_speed = get_cookie('HELM_Open_Narration_Autoplay');
		if($('#read_aloud_player').length){
			document.getElementById("read_aloud_player").setAttribute('autoplay', 'autoplay');
			document.getElementById("read_aloud_player").play().then(function(){console.log('Can autoplay');}).catch(function(){console.log('Can\'t autoplay');});
		}
	}
	
	$(document.body).on('change', '[name="auto_narration"]' ,function(){
		if(privacy_cookies != 0){
			set_cookie('HELM_Open_Narration_Autoplay',$(this).val(),365);
			auto_narration = $(this).val();
		}
		
	});
	
	var auto_narration_controls = '<div class="text-center" id="auto_narration_container"><form class="form" id="auto_narration_selection"><p>Auto Narration Settings</p><label class="radio-inline"><input type="radio" name="auto_narration" id="auto_narration1" value="1"> Enable Auto-start Narration</label><label class="radio-inline"><input type="radio" name="auto_narration" id="auto_narration2" value="0"> Disable Auto-start Narration</label></form></div>';

	$(auto_narration_controls ).insertAfter( "#main_menu" );

	*/
	///////////////////////////////////////////////////////////////////
	// END auto narration playback control
	
	
	
	
	// START Function to show/hide text component and toggle button display
	//////////////////////////////////////////////////////////////////
	var toolbar_buttons = '<div id="hide_text_control"><label><span id="hide_text_label">Hide Text </span><span class="switch"><input type="checkbox" id="hide_text" class="hide_text_input_control" value="1"><span class="slider"></span></span></label></div>';
	
	if($('#av-component').length){
		//double column
		$('#page_title').after(toolbar_buttons);
	}
	
	
	
	
	// START handle stored text setting
	
	if(get_cookie('HELM_Open_Hide_Text') != '') {
		// we have playback speed cookie set		
		hide_text = get_cookie('HELM_Open_Hide_Text');
	}
	
	

	if (hide_text == 0) {
		// need to display text
		$('#supporting_text1').removeAttr('checked',true);
		$('#hide_text').removeAttr('checked');

	}else{
		// Hide text
		$('#supporting_text2').attr('checked',true);
		$('#hide_text').attr('checked', true);
		$('#text-component').hide(0);
		$('#av-component').removeClass('col-md-6').addClass('col-md-12');
		$('#hide_text_label').html('Show Text ');

	}

	// END handle stored text setting
	
	
	// START Function to show/hide text component and toggle button display
	//////////////////////////////////////////////////////////////////
	$(document.body).on('click','#hide_text', function(){
			
			if($('#hide_text').is(":checked")){
				$('#text-component').hide(0);
				// need to hide text
				$('#av-component').removeClass('col-md-6').addClass('col-md-12');
				$('#hide_text_label').html('Show Text ');
				if(privacy_cookies != 0){
					// we have permission to set a cookie
					set_cookie('HELM_Open_Hide_Text',1,365);
				}
			}else{
				// need to show text
				$('#text-component').show('slow');
				$('#av-component').removeClass('col-md-12').addClass('col-md-6');
				$('#hide_text_label').html('Hide Text ');
				if(privacy_cookies != 0){
					// we have permission to set a cookie
					set_cookie('HELM_Open_Hide_Text',0,365);
				}
			}
		
			
	});
	
	

	
	//////////////////////////////////////////////////////////////////
	// END Function to show/hide text component and toggle button display

	
	// START feedback rating inclusion
	// end number refers to the ID number within the RLO database needs to be updated when this ID number is known
	$('#rate_rlo').html('<iframe src="https://www.nottingham.ac.uk/~ntzalf/rlo-specs/index.php/rating/home/185" style="border:none;height:20px;width:250px;"></iframe>');
	// END feedback rating inclusion
	
	
	// START Privacy Controls
	
	var privacy_controls = '<!-- START privacy options modal --><div class="modal fade" id="privacy_options_modal" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h2 class="modal-title">Your Privacy Options</h2></div><div class="modal-body"><!-- START modal content --><form class="form"><div class="alert alert-info"><p>You can decide how this RLO uses cookies, local storage and usage tracking. By default non of these technologies are enabled but your experience of this RLO will be limited. <strong>You may change these settings at any time.</strong></p><p class="text-center"><a href="https://www.nottingham.ac.uk/helmopen/index.php/pages/view/rlo-privacy" class="btn btn-primary btn-xs" target="_blank">See our policy (Opens in a new window)</a></p></div><div class="alert alert-success text-center"><a href="#" class="btn btn-success" id="privacy_allow_all"><span class="glyphicon glyphicon-ok"></span> Allow use of all technologies</a></div><div class="panel panel-default"><div class="panel-body"><fieldset><legend>Cookie Permission</legend><p>We use cookies within our RLOs to store your chosen preferences</p><div class="radio"><label><input type="radio" name="privacy_cookies" value="0" id="privacy_cookies_1" checked><span class="glyphicon glyphicon-remove-circle"></span>  Disallow RLO cookie storage</label><br><label><input type="radio" name="privacy_cookies" value="1" id="privacy_cookies_0"><span class="glyphicon glyphicon-ok-circle"></span> Allow RLO cookie storage</label></div></fieldset></div></div><div class="panel panel-default"><div class="panel-body"><fieldset><legend>Local Storage Permission</legend><p>We use local storage within our RLOs to store your chosen preferences and your responses to some of the the RLO activities <strong>(Permission to use cookies must be given to allow use of this feature)</strong></p><div class="radio"><label><input type="radio" name="privacy_storage" value="0" id="privacy_storage_1" checked ><span class="glyphicon glyphicon-remove-circle"></span> Disallow use of local storage</label><br><label><input type="radio" name="privacy_storage" value="1" id="privacy_storage_0"><span class="glyphicon glyphicon-ok-circle"></span> Allow use of local storage</label>	</div></fieldset></div></div><div class="panel panel-default"><div class="panel-body"><fieldset><legend>Google Analytics Permission</legend><p>We use Google Analytics to help us understand how our RLOs are being used <strong>(Permission to use cookies must be given to allow use of this feature)</strong>.</p><div class="radio"><label><input type="radio" name="privacy_analytics" value="0" id="privacy_analytics_1" checked><span class="glyphicon glyphicon-remove-circle"></span> Disallow RLO usage tracking</label><br><label><input type="radio" name="privacy_analytics" value="1" id="privacy_analytics_0"><span class="glyphicon glyphicon-ok-circle"></span> Allow RLO usage tracking</label></div></fieldset></div></div></form><!-- END modal content --></div><div class="modal-footer"><button type="button" class="btn btn-danger" data-dismiss="modal">Close</button><button type="button" class="btn btn-success" id="save_privacy_settings">Save changes</button></div></div></div></div><!-- END privacy options modal -->';
	
	$('body').append(privacy_controls);
	
	
	// START handling of choice of cookies
	$('input[type=radio][name=privacy_cookies]').change(function() {
		//console.log('privacy cookies changed!');
		var temp_val = $("input[name='privacy_cookies']:checked").val();
		//console.log(temp_val);
		if (temp_val == 0) {
			//console.log('I should change the values!');
			$('#privacy_storage_0').prop( "checked", false );
			$('#privacy_storage_1').prop( "checked", true );
			$('#privacy_storage_0').prop( "disabled", true );
			$('#privacy_analytics_0').prop( "checked", false );
			$('#privacy_analytics_1').prop( "checked", true );
			$('#privacy_analytics_0').prop( "disabled", true );
		}else{
			$('#privacy_storage_0').prop( "disabled", false );
			$('#privacy_analytics_0').prop( "disabled", false );
		}
	});
	// END handling of choice of cookies
	
	
	
	var main_menu_privacy_control ='<div id="main_menu_privacy_control"><h3>HELM Open RLO Privacy Settings</h3><p>The University of Nottingham\'s Health E-Learning and Media Team collects and holds some personal information about how you use our RLOs when you visit us.</p><p>In order to get the most out of this resource, please accept the use of cookies and LocalStorage within this resource\'s User Privacy Settings</p><p><a href="#" id="privacy_settings" class="btn btn-success privacy_settings">User Privacy Settings</a></p></div>';
	$(main_menu_privacy_control).insertAfter('#adjust_playback_container');
	
	// END Privacy Controls
	
	
	// START Privacy statement banner
	var privacy_statement = '<div id="privacy_statement"><p><strong>In order to get the most out of this resource, please accept the use of cookies and LocalStorage within this resource\'s User Privacy Settings</strong><p><p><strong>The University of Nottingham\'s Health E-Learning and Media Team collects and holds some personal information about how you use our RLOs when you visit us.</strong> <a href="#" id="privacy_settings" class="btn btn-warning privacy_settings">User Privacy Settings</a> <a href="#" id="hide_privacy" class="btn btn-danger">Hide</a></p></div>';
	
	
	if(get_cookie('HELM_Open_Privacy_Settings') == ''){
		$('#mobile_base_nav').prepend(privacy_statement);
		$('#privacy_storage_0').attr('disabled','disabled');
		$('#privacy_storage_0').prop( "disabled", true );
		$('#privacy_analytics_0').prop( "disabled", true );
		$('#privacy_analytics_0').attr('disabled','disabled');
	}else{
		
		if(privacy_cookies == 0){
			$('#privacy_cookies_1').attr('checked','checked');
			
		}else{
			
			$('#privacy_cookies_0').attr('checked','checked');
			
			if(privacy_storage == 0){
				$('#privacy_storage_1').attr('checked','checked');
			}else{
				$('#privacy_storage_0').attr('checked','checked');
			}
			if(privacy_analytics == 1){
				$('#privacy_analytics_0').attr('checked','checked');
			}else{
				$('#privacy_analytics_1').attr('checked','checked');
			}
			
		}
			
		
	}
	
	// END Privacy statement banner
	$('#hide_privacy').click(function(){
		$('#privacy_statement').hide();
	});
	// START Privacy acceptance
	$('#accept_privacy').click(function(){
		
		set_cookie('HELM_Open_Privacy','accepted',365);
		return false;
		
	});
	
	$(document.body).on('click', '.privacy_settings', function(){
		$('#main_menu_trigger a').show();
		$('#myNav').css('width','0%').css('display','none');
		$('#privacy_options_modal').modal("show");

		return false;
	});
	
	
	
	function save_privacy_settings(){	
		// respond to user click the save privacy settings button
		
		var cookies = $("input[name='privacy_cookies']:checked"). val();
		var local_storage = $("input[name='privacy_storage']:checked"). val();
		var analytics = $("input[name='privacy_analytics']:checked"). val();
		
		privacy_save = true;
		
		if(local_storage == '0'){
			privacy_storage = 0;
		}else{
			privacy_storage = 1;
		}
		if(analytics == '0'){
			privacy_analytics = 0;
		}else{
			privacy_analytics = 1;
		}
		
		if(cookies == '0'){
			
			// user has revoked permission to use cookies so must delete privacy setting s cookie
			delete_cookie('HELM_Open_Privacy_Settings');
			delete_cookie('HELM_Open_Playback_Speed');
			delete_cookie('HELM_Open_Narration_Autoplay');
			delete_cookie('HELM_Open_Hide_Text');
			playback_speed = 1;
			modify_playback(1);
			privacy_cookies = 0;
			privacy_storage = 0;
			privacy_analytics = 0;
			
			if(privacy_cookies == 0 || privacy_analytics == 0){
				// need to remove analytics code if present
				$('#analytics_code').remove();
				
			}
			// Need to remove any local storage elements that may have been set
			// These would need adding in response to activities that might be developed within the resource that make use of local storage.
			localStorage.removeItem('HELMOpen_RLO_template_activity');

		}else{
			
			var cookie_string = JSON.stringify({a: analytics, c: cookies, ls: local_storage});
			set_cookie('HELM_Open_Privacy_Settings',cookie_string,365);
			privacy_cookies = 1;
			$('#privacy_statement').hide();
			if(analytics == 1){
				// need to write in the analytics code
				$('body').append(analytics_code);
				privacy_analytics = 1;
			}
			
			if(privacy_storage == 0){
				// no local storage allowed Need to remove any local storage elements that may have been set
			// These would need adding in response to activities that might be developed within the resource that make use of local storage.
				localStorage.removeItem('HELMOpen_RLO_template_activity');
			}
			
			//console.log(privacy_storage);
		}
		
		
		$('#privacy_options_modal').modal('hide');
		
		
	}
	// END Privacy acceptance
	
	$(document.body).on('click', '#save_privacy_settings', function(event){
		event.preventDefault();
		save_privacy_settings();
	});
	
	
	$(document.body).on('click', '#privacy_allow_all', function(event){
		event.preventDefault();
		// check each feature before saving
		$('#privacy_cookies_0').prop('checked', true);
		$('#privacy_storage_0').prop('checked', true);
		$('#privacy_analytics_0').prop('checked', true);
		save_privacy_settings();
	});
	
	//console.log(privacy_storage);
});
