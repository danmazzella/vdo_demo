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
		
		var vidTimer
        var tenMinutes = 0;	
        var healthCheck = null;
        var healthCheckFailCnt = 0;
        var showHealth = true;
        var healthCheckFailCntMax = 10;
        	

		
        window.onbeforeunload = function () { endVideo();}
        function endHealthCheck() { clearInterval(healthCheck); $(".error").html(""); showHealth=false}    
		$(".file").bind("click", function() { $("#photo").trigger("click");});
                
		function startVideo() {
			
			$(".videoButton").attr("disabled", "").css("opacity", ".5");
			var rtVid = $("#rtVideo");
		    startHealthCheck($("#txtVideoUrl").val());
              
			vidTimer = setInterval(function() {
				
				if (tenMinutes >= (1000 * 60 * 10)) endVideo();
								
				if (showHealth) rtVid.attr("src",$("#hidVidoeImageUrl").val() + "?" + Math.random());
				tenMinutes += 200;	
                
 			}, 200);
		}
		
        function endVideo() {
			
			clearInterval(vidTimer);
			tenMinutes = 0;
			$(".resetVideoButton").trigger("click");
		}
        		
		if ( $("#hidVidoeImageUrl").val()) {
            
            var rtVid = $("#rtVideo");
            rtVid.attr("src", '/images/loading_wizr.gif');
            setTimeout(function() {startVideo();}, 5000);
			
		}
        
        function updateHealthCheck(mode, msg) {
            
            
            
            if (mode === "update")  {
                $(".error").css("color", "red");
                healthCheckFailCnt++;
                
                if (healthCheckFailCnt === healthCheckFailCntMax) {
                    if(showHealth) $(".error").html("The camera stream is unavailable or the camera can not be found");
                    showHealth = false;
                    endVideo();   
                }
                    
            } else {
                if(showHealth) $(".error").html(msg);
                $(".error").css("color", "green");
                healthCheckFailCnt = 0;
            }
        }
        
        function startHealthCheck(url) {
            
            
            healthCheck = setInterval(function() {
                $.post("/video/health", {videoUrl:url}, function(data, b, c) {

                    if (data.error || data.results === false) {

                        updateHealthCheck("update", data.error);
                    } else {
                        
                        updateHealthCheck(null, "Streaming: " + url);
                    }
                    
                }).fail(function(a,b,c) {
                    
                    updateHealthCheck("update", a.statusText);                    
                });
                
            }, 2000);
        }
        
		$(".resetVideoButton").bind("click", function() {

			clearInterval(vidTimer);
            
            var rtVid = $("#rtVideo");
            
            endHealthCheck();
            rtVid.attr("src", '');
            			
			$.get("/video/reset", function(data) {
                
				$(".videoButton").removeAttr("disabled").css("opacity", 1);
				console.log(data);
			});
			
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