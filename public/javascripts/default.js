$(function() {
	$(document).ready(function() {
		$("#uploadedImage").load(function() {
			var coords = $("#boxes").val();
			var canvas;
			var img; 
			var i = 0;
			if (coords) {
				img = $("#uploadedImage");
				var width = img.width(), height = img.height();
				
				canvas = document.getElementById("canvas").getContext('2d');
				canvas.canvas.width = width;
				canvas.canvas.height = height;
	
				coords = JSON.parse(coords);
				
				for (i; i < coords.length; i++) {
					canvas.strokeStyle = "red";
					canvas.lineWidth = "3";
					canvas.strokeRect(coords[i].x, coords[i].y, coords[i].w, coords[i].h); // rect and then stroke() keeps all boxes
				}
			}
		});
		
		var vidTimer, tenMinutes = 0;
		
		function endVideo() {
			clearInterval(vidTimer);
		}
		
		function startVideo() {
			
			$(".videoButton").attr("disabled", "").css("opacity", ".5");
			var rtVid = $("#rtVideo");
			
			vidTimer = setInterval(function() {
				
				if (tenMinutes >= (60000 * 1)) endVideo();				
				rtVid.attr("src",$("#hidVidoeImageUrl").val() + "?" + Math.random());
				tenMinutes += 200;	
			}, 200);
		}
		
		if ( $("#hidVidoeImageUrl").val()) {

			startVideo();
		}
		
		$(".resetVideoButton").bind("click", function() {

			clearInterval(vidTimer);
			
			$.get("/video/reset", function(data) {
				$(".videoButton").removeAttr("disabled").css("opacity", 1);
				console.log(data);
			});
			
		});
		
		$(".file").bind("click", function() {
			$("#photo").trigger("click");
		});
		
		$("#photo").bind("change", function() {
			var file = $(this).val().split("\\");
			$(".file").html(" ... " + file[file.length -1]);
		});
		
		var setNav = function() {
			$(".navigation a").removeClass();
			switch (window.location.pathname) {
				case '/index':
					$("#1").addClass('active');
					break;
				case '/':
					$("#1").addClass('active');
					break;
				case '/video':
					$("#2").addClass('active');
					break;
				case '/help':
					$("#3").addClass('active');
					break;
				case '/login':
					break;
				default: 
					$("#1").addClass('active');
					break;
			}
		}();


		var gnit = function() {
		
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		
		ga('create', 'UA-71043732-1', 'auto');
		ga('send', 'pageview');

		}();



	});
}); 