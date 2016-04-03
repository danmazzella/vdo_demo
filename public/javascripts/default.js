$(function() {
	$(document).ready(function() {
        
        
        
        // camera list
        
    var Cameras = [
    //RTSP
    //  "rtsp://plazacam.studentaffairs.duke.edu:554/axis-media/media.amp?",
    //  "rtsp://webcam11.corvettemuseum.com:554/axis-media/media.amp?",
    //  "rtsp://webcam13.corvettemuseum.com:554/axis-media/media.amp?",
    //  "rtsp://gorguzecam01.engin.umich.edu:554/axis-media/media.amp?",
    //  "rtsp://gorguzecam02.engin.umich.edu:554/axis-media/media.amp?"


    //MJPEG
    "http://72.253.80.63:1026/img/video.mjpeg",
    "http://73.192.146.88:1024/img/video.mjpeg",
    "http://186.1.12.115:8082/img/video.mjpeg",
    "http://107.212.2.203:8082/mjpg/video.mjpg",
    "http://76.25.224.71/img/video.mjpeg",
    "http://69.161.26.70:1024/img/video.mjpeg",
    "http://50.196.166.205:8000/mjpg/video.mjpg",
    "http://75.182.19.76:1024/img/video.mjpeg",
    "http://162.207.117.106/img/video.mjpeg",
    "http://67.83.168.87:8000/img/video.mjpeg",
    "http://88.249.112.236:1024/img/video.mjpeg",
    "http://24.4.214.227:81/axis-cgi/mjpg/video.cgi",
    "http://118.140.78.106:5004/img/video.mjpeg",
    "http://118.140.78.106:5002/img/video.mjpeg",
    "http://72.81.132.27/img/video.mjpeg",
    "http://79.129.43.179/img/video.mjpeg",
    "http://87.245.118.88:1024/img/video.mjpeg",
    "http://120.50.14.2/img/video.mjpeg",
    "http://108.58.45.2:8083/img/video.mjpeg",
    "http://87.245.118.88:1025/img/video.mjpeg",
    "http://107.135.124.13:8080/img/video.mjpeg",
    "http://199.59.113.123/img/video.mjpeg",
    "http://83.235.183.96:1024/img/video.mjpeg",
    "http://173.52.110.214:1024/img/video.mjpeg",
    "http://217.79.9.143/mjpg/video.mjpg",
    "http://217.79.9.142/mjpg/video.mjpg",
    "http://217.79.9.145/mjpg/video.mjpg",
    "http://hncam1.hn.psu.edu/axis-cgi/mjpg/video.cgi",
    //MJPEG



    //IMAGE

    "http://178.151.205.191:81/IMAGE.JPG",
    "http://50.199.22.21:84/axis-cgi/jpg/image.cgi",
    "http://hncam1.hn.psu.edu/axis-cgi/jpg/image.cgi",
    "http://149.43.156.190/axis-cgi/jpg/image.cgi",
    "http://c-cam.uchicago.edu/axis-cgi/jpg/image.cgi",
    "http://24.151.30.60/axis-cgi/jpg/image.cgi",
    "http://99.116.77.191:8000/axis-cgi/jpg/image.cgi",
    "http://71.94.68.186:6001/oneshotimage",
    "http://78.69.215.89:81/oneshotimage",
    "http://78.69.215.89:83/oneshotimage",
    "http://174.55.216.127:5000/SnapshotJPEG",
    "http://arau-yamato.miemasu.net/SnapshotJPEG?Resolution=640x480",
    "http://camibk.egos.co.at/axis-cgi/jpg/image.cgi",
    "http://69.207.217.167:81/IMAGE.JPG",
    "http://80.20.190.14:83/axis-cgi/jpg/image.cgi",
    "http://videostream.mdh-insurance.co.uk:208/axis-cgi/jpg/image.cgi",
    "http://61.238.236.154:5000/img/snapshot.cgi",
    "http://212.145.144.190:8080/axis-cgi/jpg/image.cgi",
    "http://saloncreations.axiscam.net:3001/axis-cgi/jpg/image.cgi",
    "http://wanpark.miemasu.net/SnapshotJPEG?Resolution=640x480",
    "http://212.47.24.208:83/axis-cgi/jpg/image.cgi",
    "http://thanhchaulongan.viewnetcam.com:85/SnapshotJPEG?Resolution=640x480",
    "http://194.171.57.42/axis-cgi/jpg/image.cgi",
    "http://81.149.91.185/SnapshotJPEG?Resolution=640x480",
    "http://videostream.mdh-insurance.co.uk:207/axis-cgi/jpg/image.cgi",
    "http://64.193.125.117:60001/SnapshotJPEG?Resolution=640x480",
    "http://haasg056-cam.cs.purdue.edu/axis-cgi/jpg/image.cgi",
    "http://gorguzecam02.engin.umich.edu/axis-cgi/jpg/image.cgi",
    "http://wilsonteamcam2.engin.umich.edu/axis-cgi/jpg/image.cgi",
    "http://corp.glaztech.com:91/SnapshotJPEG?Resolution=640x480",
    "http://182.74.149.210:83/SnapshotJPEG?Resolution=640x480",
    "http://210.232.19.233/SnapshotJPEG?Resolution=640x480",
    "http://217.79.9.145/axis-cgi/jpg/image.cgi",
    "http://217.79.9.143/axis-cgi/jpg/image.cgi",
    "http://152.1.246.53/axis-cgi/jpg/image.cgi",
    "http://71.248.101.58:50001/SnapshotJPEG?Resolution=640x480",
    "http://47.20.59.98:8084/axis-cgi/jpg/image.cgi",
    "http://65.183.153.11/axis-cgi/jpg/image.cgi",
    "http://47.20.59.98:8090/axis-cgi/jpg/image.cgi",
    "http://201.193.214.67/axis-cgi/jpg/image.cgi",
    "http://74.93.107.217/IMAGE.JPG",
    "http://181.110.251.114:81/axis-cgi/jpg/image.cgi",
    "http://gorguzecam01.engin.umich.edu/axis-cgi/jpg/image.cgi",
    "http://217.79.9.142/axis-cgi/jpg/image.cgi",
    "http://lodgeatls2.axiscam.net:9280/axis-cgi/jpg/image.cgi",
    "http://himom.kings.edu/axis-cgi/jpg/image.cgi",
    "http://webcam.oldetownepetresort.com:9273/axis-cgi/jpg/image.cgi",
    "http://2.112.250.194:82/axis-cgi/jpg/image.cgi",
    "http://166.156.122.55:8084/img/snapshot.cgi",
    "http://88.116.139.6/axis-cgi/jpg/image.cgi",
    "http://210.232.27.221/SnapshotJPEG?Resolution=640x480",
    "http://50.199.22.21:84/axis-cgi/jpg/image.cgi",
    "http://75.148.28.105:1024/img/snapshot.cgi",
    "http://200.89.115.210/IMAGE.JPG",
    "http://217.91.208.210/axis-cgi/jpg/image.cgi",
    "http://webcam.oldetownepetresort.com:9270/axis-cgi/jpg/image.cgi",
    "http://77.221.39.165/axis-cgi/jpg/image.cgi",
    "http://61.192.220.95:82/SnapshotJPEG?Resolution=640x480",
    "http://80.14.157.153:8082/axis-cgi/jpg/image.cgi",
    "http://fknbtikushi.aa0.netvolante.jp:50053/SnapshotJPEG?Resolution=640x480",
    "http://158.142.178.131/axis-cgi/jpg/image.cgi",
    "http://98.101.223.10:8253/SnapshotJPEG?Resolution=640x480",
    "http://94.72.9.250/axis-cgi/jpg/image.cgi",
    "http://5656chaya.iobb.net:50000/SnapshotJPEG?Resolution=640x480",
    "http://147.253.140.110/axis-cgi/jpg/image.cgi",
    "http://hncam1.hn.psu.edu/axis-cgi/jpg/image.cgi",
    "http://209.159.224.176/axis-cgi/jpg/image.cgi",
    "http://eastcam1.centralia.edu/axis-cgi/jpg/image.cgi",
    "http://webcam1.lpl.org/axis-cgi/jpg/image.cgi",
    "http://37.44.172.66/axis-cgi/jpg/image.cgi",
    "http://77.221.39.162/axis-cgi/jpg/image.cgi",
    "http://77.221.39.163/axis-cgi/jpg/image.cgi",
    "http://83.64.164.4/axis-cgi/jpg/image.cgi",
    "http://148.61.97.229/axis-cgi/jpg/image.cgi",
    "http://149.43.156.190/axis-cgi/jpg/image.cgi",
    "http://cam1.infolink.ru/axis-cgi/jpg/image.cgi",
    "http://mail.bekescsaba.hu:8080/axis-cgi/jpg/image.cgi",
    "http://c-cam.uchicago.edu/axis-cgi/jpg/image.cgi",
    "http://212.46.219.202/IMAGE.JPG",
    
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