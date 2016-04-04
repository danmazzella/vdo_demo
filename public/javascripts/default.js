$(function() {
	$(document).ready(function() {
        
    var Cameras = [
    
    // Russian Mall
    "http://217.79.9.143/mjpg/video.mjpg",
    "http://217.79.9.142/mjpg/video.mjpg",
    "http://217.79.9.145/mjpg/video.mjpg",
    
    "http://79.129.43.179/img/video.mjpeg",
    "http://87.245.118.88:1024/img/video.mjpeg",
    "http://108.58.45.2:8083/img/video.mjpeg",
    "http://83.235.183.96:1024/img/video.mjpeg",
    
    // Campus
    "http://hncam1.hn.psu.edu/axis-cgi/mjpg/video.cgi",

    // Cafe
    "http://50.199.22.21:84/axis-cgi/jpg/image.cgi",
    "http://hncam1.hn.psu.edu/axis-cgi/jpg/image.cgi",
    "http://149.43.156.190/axis-cgi/jpg/image.cgi",
    "http://c-cam.uchicago.edu/axis-cgi/jpg/image.cgi",
    "http://camibk.egos.co.at/axis-cgi/jpg/image.cgi",
    "http://videostream.mdh-insurance.co.uk:208/axis-cgi/jpg/image.cgi",
    "http://212.47.24.208:83/axis-cgi/jpg/image.cgi",
    "http://194.171.57.42/axis-cgi/jpg/image.cgi",
    "http://haasg056-cam.cs.purdue.edu/axis-cgi/jpg/image.cgi",
    "http://gorguzecam02.engin.umich.edu/axis-cgi/jpg/image.cgi",
    "http://217.79.9.145/axis-cgi/jpg/image.cgi",
    "http://217.79.9.143/axis-cgi/jpg/image.cgi",
    "http://65.183.153.11/axis-cgi/jpg/image.cgi",
    "http://himom.kings.edu/axis-cgi/jpg/image.cgi",
    "http://50.199.22.21:84/axis-cgi/jpg/image.cgi",
    "http://158.142.178.131/axis-cgi/jpg/image.cgi",
    "http://94.72.9.250/axis-cgi/jpg/image.cgi",
    "http://147.253.140.110/axis-cgi/jpg/image.cgi",
    "http://hncam1.hn.psu.edu/axis-cgi/jpg/image.cgi",
    "http://209.159.224.176/axis-cgi/jpg/image.cgi",
    "http://eastcam1.centralia.edu/axis-cgi/jpg/image.cgi",
    "http://148.61.97.229/axis-cgi/jpg/image.cgi",
    "http://149.43.156.190/axis-cgi/jpg/image.cgi",
    "http://mail.bekescsaba.hu:8080/axis-cgi/jpg/image.cgi",
    "http://c-cam.uchicago.edu/axis-cgi/jpg/image.cgi",
    
    ];
    
    //Auto Complete
    $("#txtVideoUrl").autocomplete({
        source: Cameras
    })  ;      
            
            
            
            
            
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
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
            $(".resetVideoButton").css("background-color", "red");
			var rtVid = $("#rtVideo");
		    startHealthCheck($("#txtVideoUrl").val());
            
            $('html, body').animate({
                scrollTop: $(".image").offset().top
            }, 2000);            
              
			vidTimer = setInterval(function() {
				
				if (tenMinutes >= (1000 * 60 * 10)) endVideo();
								
				if (showHealth) rtVid.attr("src",$("#hidVidoeImageUrl").val() + "?" + Math.random());
				tenMinutes += 300;	
                
 			}, 500);
		}
		
        function endVideo() {
			
			clearInterval(vidTimer);
			tenMinutes = 0;
			$(".resetVideoButton").trigger("click");
		}
        		
		if ( $("#hidVidoeImageUrl").val()) {
            
            var rtVid = $("#rtVideo");
            $(".videoButton").attr("disabled", "").css("opacity", ".5");
            rtVid.attr("src", '/images/loading_wizr.gif');
                       
                       
            var imgLoader = setInterval(function() {
            
                    var img = new Image();
                    $(img).on('load', function() {
                        
                        clearInterval(this);
                        clearInterval(imgLoader);
                        startVideo();
                        
                    });    
                
                    img.src = $("#hidVidoeImageUrl").val();                 
         
                }, 1000);           

	            //$("#hidVidoeImageUrl").val()
		}
        
        $("#imgForm").bind("submit", function() {
            $(".submit-button").attr("disabled", "true");            
        });

        
        $(".videoButton").bind("click", function(evt) {  
            $("#frmVideo").submit();
            $("#frmVideo").submit(function(evt) {
                $(".videoButton").attr("disabled", "");
                return true;
            });            
        });
        
        
        
        
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
                        
                        updateHealthCheck(null, "STREAMING: " + url +  " USING THE " + $("#algorithm option:selected").text().toUpperCase() + " ALGORITHM.");
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
                $(".reset-video-button").css("background-color", "#BBBDBF");
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
    
    // Slider

       $( "#slider" ).slider({
            value: $("#sensitivity").val(),
            min: 1,
            max: 1001,
            animate: true,
            //step: 1,
            stop: function(event, ui) {
                $("#sensitivity").val(ui.value);
            }
        })
        .each(function() {
            
        var opt = $(this).data().uiSlider.options;
        var vals = opt.max - opt.min;

        for (var i = 0; i <= vals; i++) {
            
            var el;
            
            switch (i) {
                case 1:
                    
                    el = $('<label>Low</label>').css('left',(i/vals*100)+'%');
                    break;
                case 500: 
                
                    el = $('<label>Medium</label>').css('left', '46%');
                    break;
                
                case 1000:
                
                    el = $('<label>High</label>').css('left',(i/vals*100)+'%');
                    break;

                // default:

                //     el = $('<label>'+(i+1)+'</label>').css('left',(i/vals*100)+'%');
                //     break;
            }

            $( "#slider" ).append(el);
        }
        });
    
    // End Slider
    
}); 