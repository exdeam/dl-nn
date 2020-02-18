function checkMobile(){
	if ($(window ).width() < 1024) {
		if (mobile !== 1) {
			mobile = 1;

			$('html,body').css('height','100%');
			$('body').html('<div class="loader_mobile"><p></p></div>');

			$.get( "/?ajax=setMobile&mobile=" + mobile, function( data ) {
				window.location.href = window.location.href;
			}); 
		}
	} else {
		if (mobile === 1) {
			mobile = 0;

			$.get( "/?ajax=setMobile&mobile=" + mobile, function(data) {
				window.location.href = window.location.href;
			});
		}
	}
}

if (window.location.href.indexOf('landing') < 0) {
	$(document).ready(function() {
		checkMobile();
	});

	$(window).resize(function() {
		checkMobile();
	});
}

