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
$().ready(function(){
	$('#myNav').css('display','none');
	var $narration_audio = '';
	
	// small screen repsotion read aloud audio player
	if($(window).width() < 768){
		
		if($('.narration_audio').length){
			
			$narration_audio = $('.narration_audio').html();
			
			$('#ss_readalound_container').html('<div class="ss_container"><p>Narration</p>'+$narration_audio+'</div>');
			
			//console.log('we have narration');
			
		}else{
			//console.log('We do not have narration');
		}
		
		
	}
	
	$( window ).resize(function() {
		//var $narration_audio = '';
		if($( window ).width() < 768){
			$narration_audio = $('.narration_audio').html();
			if($narration_audio.length){
				$('#ss_readalound_container').html('<div class="ss_container"><p>Narration</p>'+$narration_audio+'</div>');
			}
		}else{
			$('#ss_readalound_container').html('');
		}
	});
	
	// DEFINE variables
	var audio_element = document.getElementById("read_alound_player");
	var video_element = document.getElementById("video_player");
	
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
		if(audio_element != null){
			if(!audio_element.paused){
				audio_element.pause();
			}
		}
	});
	///////////////////////////////////////////////////////////////////
	// END pause narration if video started
	
	// START pause video if narration started
	///////////////////////////////////////////////////////////////////
		
	$('#read_alound_player').on('play', function() {
		if(video_element != null){
			if(!$("#video_player").get(0).paused){
				console.log(' video Not paused');
				video_element.pause();
			}
		}
		
	});
	///////////////////////////////////////////////////////////////////
	// END pause video if narration started	
	
	
	if (storageAvailable('localStorage')) {
	// YES Localstorage available
	
		// START audio video playback rate control
		///////////////////////////////////////////////////////////////////
		function modify_playback(speed){
			//$("#playback_rate option").removeAttr('selected');
			//$("#playback_rate option[value='"+speed+"']").attr("selected","selected");

			if($("audio").length){

				$("audio").each(function(){
					$(this).get(0).playbackRate = speed;
					$(this).get(0).defaultPlaybackRate = speed;
				})

				//$("audio").get(0).playbackRate = speed;
				//$("audio").get(0).defaultPlaybackRate = speed;
			}
			if($("video").length){
				$("video").get(0).playbackRate = speed;
				$("video").get(0).defaultPlaybackRate = speed;
			}

		}

		if (localStorage["playback_speed"] == null) {
			// Set initial playback speed value		
			localStorage["playback_speed"] = 1;
			var playback_speed = 1;
		}else {
			// Set playback speed to the retained user preference
			var playback_speed = localStorage["playback_speed"];
		}	

		modify_playback(playback_speed);
		$(document.body).on('change', '#playback_rate' ,function(){
			localStorage["playback_speed"] = $(this).val();
			modify_playback($(this).val());
		 });

		var playback_speed_controls = '<div class="text-center" id="adjust_playback_container"><form class="form" id="playback_speed_selection"><p>Adjust Playback Speed</p><label for="playback_rate">Adjust Audio/Video Playback Speed </label><div class="row"><div class="col-xs-2 col-lg-offset-2 text-right">Slower</div><div class="col-xs-7 col-lg-4"><input type="range"  name="playback_rate" id="playback_rate" min="0.5" max="1.75" step="any"></div><div class="col-xs-2">Faster</div></div><a href="#" id="playback_reset_btn" class="btn btn-warning btn-xs"><span class="glyphicon glyphicon-refresh"></span> Reset Playback Speed</a></form></div>';


		//$( playback_speed_controls ).insertBefore( "footer" );
		$( playback_speed_controls ).insertAfter( "#main_menu" );

		$('#playback_rate').val(playback_speed);


		//$('#playback_speed_selection').hide();

		$('body').on("click", "#adjust_playback_btn", function(event){
			event.preventDefault();
			$('#playback_speed_selection').toggle('slow');
		});
		$('body').on("click", "#playback_reset_btn", function(event){
			event.preventDefault();
			$('#playback_rate').val(1);
			localStorage["playback_speed"] = 1;
			modify_playback(1);
		});

		///////////////////////////////////////////////////////////////////
		// END audio video playback rate control



		// START auto narration playback control
		///////////////////////////////////////////////////////////////////

		var auto_narration = 0;
		if (localStorage["auto_narration"] == null || localStorage['auto_narration'] == '0') {
			// Set initial narration settings	
			localStorage["auto_narration"] = 0;

		}else{
			// begin the playback of the narration
			var auto_narration = 1
			//audio_element.play();
			if($('#read_aloud_player').length){
				document.getElementById("read_alound_player").setAttribute('autoplay', 'autoplay');
				//console.log('I should auto play');
			}
		}	




		$(document.body).on('change', '[name="auto_narration"]' ,function(){
			localStorage["auto_narration"] = $(this).val();
		 });



		var auto_narration_controls = '<div class="text-center" id="auto_narration_container"><form class="form" id="auto_narration_selection"><p>Auto Narration Settings</p><label class="radio-inline"><input type="radio" name="auto_narration" id="auto_narration1" value="1"> Enable Auto-start Narration</label><label class="radio-inline"><input type="radio" name="auto_narration" id="auto_narration2" value="0"> Disable Auto-start Narration</label></form></div>';


		//$( playback_speed_controls ).insertBefore( "footer" );
		$(auto_narration_controls ).insertAfter( "#main_menu" );

		if(auto_narration == 1){
			$('#auto_narration1').attr('checked',true);
		}else{
			$('#auto_narration2').attr('checked',true);
		}


		///////////////////////////////////////////////////////////////////
		// END START auto narration playback control
	
	}
	
	// START Function to show/hide text component and toggle button display
	//////////////////////////////////////////////////////////////////
	
	
	var toolbar_buttons = '<a href="#" class="show-hide-text" title="Hide Supporting Text" id="show-hide-text">hide text <span class="glyphicon glyphicon-text-width"></span></a></div>';
	
	
	//toolbar_buttons = toolbar_buttons + '</div>';
	
	//$('header:first').after(toolbar_buttons);
	
	$('#main_menu_trigger a').before(toolbar_buttons);
	
	
	var text_controls = '<div class="text-center" id="supporting_text_container"><form class="form" id="supporting_text_selection"><p>Text Settings</p><label class="radio-inline"><input type="radio" name="supporting_text" id="supporting_text1" value="1"> Show Supporting Text</label><label class="radio-inline"><input type="radio" name="supporting_text" id="supporting_text2" value="0"> Hide Supporting Test</label></form></div>';
	
	
	$( text_controls ).insertAfter( "#main_menu" );
	
	
	if($('#av-component').length){
		//double column
	}else{
		//single column
		//$('#show-hide-text').attr('class','disabled');
		$('.show-hide-text').css('opacity','0.5');
	}
	
	
	// START handle stored text setting
	if (storageAvailable('localStorage')) {
		// YES Localstorage available
		// Begin web storage of data
		if (localStorage.hide_text == null) {
			// Display alert test to show text is being displayed
			// alert ("text being revealed");
			$('#supporting_text1').attr('checked',true);

		}else{
			// Display alert test to show text is being hidden
			// alert ("text being hidden");
			$('#supporting_text2').attr('checked',true);		
			$('.show-hide-text').html('show text  <span class="glyphicon glyphicon-text-width"></span>');			
			$('#text-component').hide();
			$('#av-component').removeClass('col-md-6').addClass('col-md-12');

		}
	}
	// END handle stored text setting
	
	// START Function to show/hide text component and toggle button display
	//////////////////////////////////////////////////////////////////
	$('.show-hide-text').click(function(event){
			event.preventDefault();
			$('#av-component').removeClass('col-md-12').addClass('col-md-6');
			$('#text-component').toggle('slow',function(){
					if($(this).is(':visible')){
						$('.show-hide-text').html("hide text  <span class=\"glyphicon glyphicon-text-width\"></span>");
						if (storageAvailable('localStorage')) {
							// YES Localstorage available
							localStorage.removeItem("hide_text");
						}
					}else{

						$('#av-component').toggleClass('col-md-6 col-md-12');
						$('.show-hide-text').html("show text  <span class=\"glyphicon glyphicon-text-width\"></span>");
						if (storageAvailable('localStorage')) {
							// YES Localstorage available
							localStorage.hide_text = 'hide';
						}
					}                                              
			});                           
			return(false);                     
	});
	
	$('.show-hide-text span').css('font-size','1.3rem');
	
	$(document.body).on('change', '[name="supporting_text"]' ,function(){
		
		if($(this).val() == 1){
			$('#text-component').show();
			$('#av-component').removeClass('col-md-12').addClass('col-md-6');
			$('.show-hide-text').html("hide text  <span class=\"glyphicon glyphicon-text-width\"></span>");
			if (storageAvailable('localStorage')) {
				// YES Localstorage available
				localStorage.removeItem("hide_text");
			}
		}else{
			$('#text-component').hide();
			$('.show-hide-text').html("show text  <span class=\"glyphicon glyphicon-text-width\"></span>");
			$('#av-component').removeClass('col-md-6').addClass('col-md-12');
			if (storageAvailable('localStorage')) {
				// YES Localstorage available
				localStorage.hide_text = 'hide';
			}
		}
		
	 });
	

	
	//////////////////////////////////////////////////////////////////
	// END Function to show/hide text component and toggle button display

	
	// START feedback rating inclusion
	// end number refers to the ID number within the RLO database needs to be updated when this ID number is known
	$('#rate_rlo').html('<iframe src="https://www.nottingham.ac.uk/~ntzalf/rlo-specs/index.php/rating/home/62" style="border:none;height:20px;width:250px;"></iframe>');
	// END feedback rating inclusion

});