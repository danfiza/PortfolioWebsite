var indicator = document.createElement('div');

$(document).ready(function(){
	indicator.className = 'state-indicator';
	document.body.appendChild(indicator);
	console.log(getDeviceState());

	$('#Sidebar').height($(window).height());
	$('#MainContent').height($(window).height());
	
	if(getDeviceState() > 3){
	$('#Sidebar').remove();
	$('#MainContent').before('<div class="container col-sm-12"><select><option value="" selected="selected">Click Here For Menu</option> <option value="#Logo">Home</option> <option value="#Projects">Projects</option> <option value="#Tarheel">Tarheel Gallery</option> <option value="#Ascensions">Ascensions Laboratory</option> <option value="#about">About Me</option> <option value="#contact">Contact Me</option></select></div>');
	$('#MainContent').css('width', '100%');
	}
	
	if(getDeviceState() == 3){
	$('ul.navbar li.dropdown ul').css('margin-left', '0%');
	$('ul.navbar li').css('margin-left', '0%');
	}
	
	$('body').on('change','select', function(event){
		var anchor = $(this);
		var top = $('#MainContent').scrollTop();
		console.log(anchor.val());
		var eltop = $(anchor.val()).offset().top;
		var diff = top + eltop;
		console.log(top+" "+ eltop+ " "+ diff);
		$('#MainContent').stop().animate({
			scrollTop: diff
		}, 1500, "easeInOutQuart");
		
	});
	
	
	var clicked = false;
	
	$('#drop1').click(function(){
		if(clicked == false){
			$('div.drop1holder').show('slow');
			clicked = true;
		} else{
			$('div.drop1holder').hide('slow');
			clicked = false;
		}
	});

	$('div.p1').mouseenter(function(){$('#toggle').animate({left: '0px'}),40;});
	$('div.p1').mouseleave(function(){$('#toggle').animate({left: '-1000px'}),40;});
	
	$('body').on('click','ul.nav a', function(event){
		event.preventDefault();
		var anchor = $(this);
		var top = $('#MainContent').scrollTop();
		var eltop = $(anchor.attr('href')).offset().top;
		var diff = top + eltop;
		
		$('#MainContent').stop().animate({
			scrollTop: diff
		}, 1500, "easeInOutQuart");
		
	});
	
	$('button.btn').click( function(event){
		event.preventDefault();
		var checked = false;
		var name = $.trim($("#Name").val());
		var email = $.trim($('#Email').val());
		var text = $.trim($('#text').val());
		$('#formwarnings').empty();
		if(name.length == 0){
			$("#formwarnings").append('<div class="alert alert-danger">Error: Name Required!</div>');
			checked = false;
		} else{ checked = true;}
		
		if(email.length == 0){
			$("#formwarnings").append('<div class="alert alert-danger">Error: Email Required!</div>');
			checked = false;
		} else{	
			if(email.indexOf("@") == -1 || email.indexOf("@") == 0){
				
				$("#formwarnings").append('<div class="alert alert-danger">Error: Valid Email Required!</div>');
				
				checked = false;
			} else {if(checked == true){checked = true;}}}
			
			if(text.length == 0){
				$("#formwarnings").append('<div class="alert alert-danger">Error: Message Required!</div>');
				checked = false;
			} else{ if(checked == true){checked = true;}}
			
			if(checked){
				$("form").remove();
				$("#formwarnings").append('<div class="alert alert-success">Message has been delivered!</div>');
				
				var data = {pname: name, pemail: email, ptext: text};
				
				$.post('scripts/contactform.php', data, function(returnedData) {
					if(returnedData.error){
						$("#formwarnings").append('<div class="alert-error">'+returnedData.error+'</div>');
					}
				});
			}	
		});






$("#MainContent").scroll(function(){
	var logo = $("p.welcome").offset().top;
	var projects = $("#Projects").offset().top;
	var tarheel = $("#Tarheel").offset().top;
	var ascension = $("#Ascensions").offset().top;
	var about = $("#about").offset().top;
	var contact = $("#contact").offset().top;
	
	if(logo <= 0){
		if(projects < 10 && projects >= 0){
			removeAllLinks();
			$("a.projects").addClass('active');
		} else{
			
			if(tarheel < 10 && tarheel >= 0){
				$("div.drop1holder").css("display","block");
				removeAllLinks();
				$("a.tarheel").addClass('active');
			} if(ascension < 10 && ascension >= 0){
				$("div.drop1holder").css("display","block");
				removeAllLinks();
				$("a.ascens").addClass('active');
			}  else{
				if(about < 10 && about >= 0){
					removeAllLinks();
					$("a.about").addClass('active');
				} else{
					
					if(about < -500){
						removeAllLinks();
						$("a.contact").addClass('active');
					}
				}	
			}
		}
	} else{
		removeAllLinks();
		$("a.home").addClass('active');
	}
	
});

});

function removeAllLinks(){
		$("a.home").removeClass('active');
		$("a.projects").removeClass('active');
		$("a.tarheel").removeClass('active');
		$("a.ascens").removeClass('active');
		$("a.about").removeClass('active');
		$("a.contact").removeClass('active');
}

function getDeviceState() {
    return parseInt(window.getComputedStyle(indicator).getPropertyValue('z-index'), 10);
}
