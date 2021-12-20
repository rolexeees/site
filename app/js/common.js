$(function() {
	
	
	$(window).scroll(function(){
		var scroll = $(window).scrollTop();
		if (scroll > 65) {
			$(".main-menu").css("background", "#000");
		}
		else{
			$(".main-menu").css("background", "transparent");  	
		}
	});
	
	$('.toggle-mnu').click(function() {
		$(this).toggleClass('on');
		$('.main-menu__nav').slideToggle();
	});
	
	// Equal height 
	$('.s-tariff .card').equalHeights();
	
	// Stop image drag
	$("img, a").on("dragstart", function (event) {
		event.preventDefault();
	});
	
	
	
	// Change buttons classes on card hover
	$('#card1').hover(
		function() {
			$('#card-button1').removeClass('buttons--yellow').addClass('buttons--dark');
		},
		function() {
			$('#card-button1').removeClass('buttons--dark').addClass('buttons--yellow');
		}
	);
	
	$('#card2').hover(
		function() {
			$('#card-button2').removeClass('buttons--yellow').addClass('buttons--dark');
		},
		function() {
			$('#card-button2').removeClass('buttons--dark').addClass('buttons--yellow');
		}
	);
	
	$('#card3').hover(
		function() {
			$('#card-button3').removeClass('buttons--yellow').addClass('buttons--dark');
		},
		function() {
			$('#card-button3').removeClass('buttons--dark').addClass('buttons--yellow');
		}
	);
	
	// wow
	wow = new WOW(
		{
		offset: 20,
		mobile: false,
		live: true
	}
	)
	wow.init();


	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {
		
	};
	
	// Smooth scroll to id
	let scroll = new SmoothScroll('a[data-scroll]');
});
