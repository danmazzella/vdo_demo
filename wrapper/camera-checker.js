var UrlUtils = module.exports = {};

var http = require('http');
var https = require('https');
var net = require('net');
var url = require('url');

    UrlUtils.validateCamera = function(params, callback) {
        
        if (params.url.substring(0, 5).toLowerCase() === "http:" || params.url.substring(0, 6).toLowerCase() === "https:") {
            
            UrlUtils.validateCameraStreamUrl({url: params.url}, callback);    
        } else if (params.url.substring(0, 4).toLowerCase() === "rtsp") {
            return callback("RTSP is not currently supported on this demo.", null, null);
            UrlUtils.validateCameraRTSPAddress({url: params.url}, callback);
        } else {
            
            return callback("Not Supported", null, null); //res.error("invalid_camera", {error: "Not Supported"});
        }
        
    };

    UrlUtils.validateCameraRTSPAddress = function(params, callback){
 
        var self = this;
        var client = new net.Socket();       
        var address = url.parse(params.url);
        var port = 554;
        var host = address.hostname;

        var closedBeforeData = true, alreadySent = false, data = null;
        var dest="OPTIONS " + params.url + " RTSP/1.0\r\nCSeq: 2\r\nUser-Agent: WiZR API\r\nAccept: application/sdp\r\n\r\n";

// var setu="SETUP " + params.url + " RTSP/1.0\r\nCSeq: 3\r\nUser-Agent: WiZR API\r\nTransport: RTP/AVP;unicast;client_port=60784-60785\r\n\r\n";
// var path = address.path; 
// var auth = address.auth;
// var rtspUrl = "rtsp://" + auth + "@" + host + 1 + ":" + port;// + path;// 
// var play="PLAY " + params.url + " RTSP/1.0\r\nCSeq: 5\r\nUser-Agent: WiZR API\r\nSession: SESID\r\nRange: npt=0.000-\r\n\r\n";
       
         client.on('data', function(data) {
             
            //console.log('DATA: ' + (data+"").split("\n"));
            closedBeforeData = false;
            alreadySent = true;
            self.data = (data+"").split("\n");
            client.destroy();
            
            return callback(null, true, 2); 
        });

        client.on('close', function(a, b, c) {           
            
            if (closedBeforeData && !alreadySent && !self.data) { 
                alreadySent = true;                               
                return callback("Connection Closed", false);
            }
            
            if (closedBeforeData && !alreadySent && self.data) {
                
                alreadySent = true;               
                return callback(null, true, 2);
            }
        });
        
        // client.on('connect', function(socket) {
        //     
        // });

        client.on('error', function(error) {

            if (closedBeforeData && alreadySent === false) {
                
                alreadySent = true;
                return callback(error, false);
            }
        });

        client.connect(port, host, function() {
            client.write(dest);
            client.end();
        });
        
        setTimeout(function() {
            
            if (closedBeforeData && alreadySent === false) {
                
                alreadySent = true;
                return callback("Timeout", false);
            }
        }, 5000); 
    };
        
    UrlUtils.validateCameraStreamUrl = function(params, callback) {
               
                
            var validUrl = false; 
            var subType = 2;
            var conType;
            var httpMethod = params.url.substring(0, 5).toLowerCase() === "https" ? https : http;
            var supportedTypes = ["image/jpeg", "multipart/x-mixed-replace", "boundary"];
            var error_url = "Invalid Camera URL";
                        
            var request = httpMethod.get(params.url, function(response) {
                
                if (response.statusCode !== 200) { 
                    
                    return callback("Status Message: " + response.statusMessage + " - Status Code: " + response.statusCode + " - content-type: " + response.headers["content-type"], null);
                }                       

                conType = response.headers["content-type"];

                if (!conType || conType.length === 0) { 
                    
                    return callback(error_url, null);
                }
                
                conType = conType.toLowerCase();

                for (var i = 0; i < supportedTypes.length; i++) {
                    
                    if (conType.indexOf(supportedTypes[i]) > -1) {
                        
                        subType = (supportedTypes[i] === "image/jpeg") ? 1 : 2;
                        validUrl = true;
                    }
                    
                    if (supportedTypes.length - 1 === i) {

                        if (!validUrl) { 
                        
                            return callback(error_url, false);
                        } else {
                        
                            return callback(null, true, subType);
                        }
                    }
                }
            });
            
            request.on('socket', function (socket) {
                
                socket.setTimeout(5000, function() {
                    
                    socket.end("HTTP/1.1 200 OK\r\nConnection: close\r\n\r\n");
                    socket.destroy();
                    
                });  
            });
            
            request.on('error', function(err) {
                if (err.code === "ECONNRESET" || err.code === "ECONNREFUSED") {
                    return callback(err,  false);
                } else {
                    return callback(err,  false);
                }
        });
    }
