var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

var upload = multer({storage : storage});
var ProcessWrapper = require('./wrapper/');
var routes = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/', routes);

var instances = [];

console.log(ProcessWrapper.ProcessType);
var image_props = {
   outputFolder : "C:\\users\\wizr-demo\\documents\\projects\\py-faster-rcnn\\vdo_stone\\uploads\\",
   executable : 'python',
   execFile:  "C:\\users\\wizr-demo\\documents\\projects\\py-faster-rcnn\\tools\\demo1.py", 
   args : {
     noResult : false
   },
   processType: ProcessWrapper.ProcessType.Image
};

var video_props = {
   outputFolder : "C:\\users\\wizr-demo\\documents\\projects\\py-faster-rcnn\\vdo_stone\\uploads\\",
   executable : 'python',
   execFile:  "C:\\users\\wizr-demo\\documents\\projects\\py-faster-rcnn\\tools\\demo3.py", 
   args : {
     noResult : true
   },
   processType: ProcessWrapper.ProcessType.Video
};

var partners = [1, 2];
 
var imageWrapper = new ProcessWrapper(image_props);
var videoWrapper = new ProcessWrapper(video_props);

instances.push(imageWrapper, videoWrapper);

function killInstance(type, partnerId) {
  
  var i = 0, instance;
  
  for(i; i < instances.length; i++) {
  
    instance = instances[i];
    if (instance.processType == type && instance.running) instance.kill();
  }  
}

function getInstance(type, partnerId) { // partner id not yet supported (will be refactoring soon)
  
  var i = 0, instance;
  
  for (i; i < instances.length; i++) {
  
    instance = instances[i];
    if (instance.type === type) return instance;
  }
}

// Main and image
app.get('/', function(req, res, next) {
  
  // Need to clear videoWrapper
  killInstance(ProcessWrapper.ProcessType.Video);
  
  // if (videoWrapper.running)
  //   videoWrapper.kill();
  //  
  
  res.render('index', { title: 'WiZR Demo' });
});

app.get('/index', function(req, res, next) {
  
  if (!imageWrapper)
    imageWrapper = new ProcessWrapper(image_props);
    
  // Need to clear videoWrapper
  killInstance(ProcessWrapper.ProcessType.Video);
  // if (videoWrapper.running)
  //   videoWrapper.kill();

  res.render('index', { title: 'WiZR Demo' });
});

app.post('/index', upload.single('photo'), function (req, res, next) {

  if(!req.file || !req.file.size)
    return res.render('index', { error: 'No Image Selected' });


  var file = req.file.filename;
  var img = "/uploads/" + file;
  
  imageWrapper.run(image_props.outputFolder + file, function(err, results)  {   
 
  results = JSON.parse(results);
  results.image = img;
  return res.render('index', { title: 'WiZR Analytics Demo', 
    results : results, 
    image : results.image, 
    boxes : JSON.stringify(results.Rectangles), 
    boxCount : results.Persons });
  
 });
 
});

// Video 
app.get('/video', function(req, res, next) {
    
    if (!videoWrapper)
      videoWrapper = new ProcessWrapper(video_props);
      
    killInstance(ProcessWrapper.ProcessType.Video);
    
    res.render('video', { title: 'WiZR Demo' });
});

app.get("/video/reset", function(req, res) {
  
  killInstance(ProcessWrapper.ProcessType.Video);
  // if (videoWrapper.running) 
  //   videoWrapper.kill();
    
  return res.send({success:true});
  
});

app.post('/video', function (req, res, next) {
  
  if (!req.body.txtVideoUrl)
    return res.render("video", {error: "Invalid Video Url"});
  
  videoWrapper.run(req.body.txtVideoUrl, function(err, results)  {   
 
    var streamUrl = "/uploads/demourl.jpg";
    
    return res.render("video", {results:true, videoImageUrl : streamUrl});  
  });
  
});

app.get('/help', function(req, res, next) {
  
  if(!req.files || !req.files.length)
    return res.render('help', { title: 'WiZR Demo' });
   
  res.render('help', { title: 'WiZR Demo' });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
