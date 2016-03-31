var express = require('express');


var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer');
var FileSystem = require('fs');
var CameraChecker = require("./wrapper/camera-checker")

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/uploads');
  },
  filename: function (req, file, cb) {

      var name =  String(Math.random()).split(".")[1] + require('path').extname(file.originalname)
      console.log(name);
    cb(null, name);
  }
});

var upload = multer({storage : storage});
var ProcessWrapper = require('./wrapper/');
var routes = require('./routes/index');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);

var instances = [];

app.get('/login', function(req, res, next) {

  res.render('login', { title: 'WiZR Demo' });
});


app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {

    res.redirect('/video');
  });

console.log(ProcessWrapper.ProcessType);

var image_props = {
   outputFolder : "C:\\wizr_demo\\vdo_demo\\uploads\\",
   executable : 'python',
   execFile:  "c:\\wizr_demo\\py-faster-rcnn\\tools\\demo1.py",
   execArgs : {
     cwd:  "c:\\wizr_demo\\py-faster-rcnn\\tools\\" 
   },
   args : {
     noResult : false
   },
   processType: ProcessWrapper.ProcessType.Image
};

var video_props = {
   outputFolder : "C:\\wizr_demo\\vdo_demo\\uploads\\",
   executable : 'python',
   execFile:  "C:\\wizr_demo\\demoProdV2\\PythonSample\\main.py",
   modelPath : "C:\\wizr_demo\\demoProdV2\\Models\\",
   execArgs : {
     cwd:  "C:\\wizr_demo\\demoProdV2\\PythonSample\\" 
   },
   args : {
     noResult : true
   },
   processType: ProcessWrapper.ProcessType.Video
};

var partners = [1, 2];

var imageWrapper = new ProcessWrapper(image_props);
var videoWrapper = new ProcessWrapper(video_props);

//instances.push(imageWrapper, videoWrapper);
instances.push(videoWrapper);

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
app.get('/', require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {

  // Need to clear videoWrapper
  killInstance(ProcessWrapper.ProcessType.Video);

  if (videoWrapper.running)
    videoWrapper.kill();
  
  return res.redirect('/video');
  //res.render('index', { title: 'WiZR Demo' });
});

app.get('/index', require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {

//   if (!imageWrapper)
//     imageWrapper = new ProcessWrapper(image_props);
  if (!videoWrapper)
    videoWrapper = new ProcessWrapper(image_props);

  // Need to clear videoWrapper
  killInstance(ProcessWrapper.ProcessType.Video);
  // if (videoWrapper.running)
  //   videoWrapper.kill();
 return res.redirect('/video');
  //res.render('index', { title: 'WiZR Demo' });
});

app.post('/index', upload.single('photo'), require('connect-ensure-login').ensureLoggedIn(), function (req, res, next) {

    var supportedTypes = ['.jpg', '.jpeg', '.png', '.bmp'];

  if(!req.file || !req.file.size)
    return res.render('index', { error: 'No Image Selected' });

  var file = req.file.filename;
  var img = "/uploads/" + file;
  var idx = supportedTypes.indexOf(require('path').extname(file).toLowerCase());

  if (idx < 0) 
    return res.render('index', { error: 'Format not supported. We currently support .jpg, .jpeg, .png and .bmp in this demo.' });

  imageWrapper.run(image_props.outputFolder + file, function(err, results)  {
  //videoWrapper.run("2;" + image_props.outputFolder + file, function(err, results)  {    

  if (err) return res.render('index', {title: "WiZR Analytics Demo", error: "An Error Occured", isError: true});

  results = JSON.parse(results);
  //var results = {};
  results.image = img;
  return res.render('index', { title: 'WiZR Analytics Demo',
    results : results,
    image : results.image,
    boxes : JSON.stringify(results.Rectangles),
    boxCount : results.Persons });

 });

});

// Video
app.get('/video', require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {

    if (!videoWrapper)
      videoWrapper = new ProcessWrapper(video_props);

    killInstance(ProcessWrapper.ProcessType.Video);

    res.render('video', { title: 'WiZR Demo', sensitivity : 5 });
});

app.get("/video/reset", require('connect-ensure-login').ensureLoggedIn(), function(req, res) {

  killInstance(ProcessWrapper.ProcessType.Video);

  var imgPath = __dirname + "\\uploads\\demourl.jpg";
  // Remove image
  try {

    FileSystem.stat(imgPath, function(err, stat) {

        if (err === null) {

            FileSystem.unlinkSync(imgPath);
        }

    });

  } catch(e) {

      console.log(e);
  }

  return res.send({success:true});

});


app.post('/video', require('connect-ensure-login').ensureLoggedIn(), function (req, res, next) {

  var videoUrl = req.body.txtVideoUrl;

  if (!videoUrl)
    return res.render("video", {error: "Invalid Video Url"});

  CameraChecker.validateCamera({url :videoUrl}, function(err, r, t) {

    if (err) {
        return res.render("video", {results : false, error: err});
    }
    
   
    var algorithmType = parseInt(req.body.algorithm);
    if (algorithmType === "-1") algorithmType = 1;

    var sensitivityType = parseInt(req.body.sensitivity);
    if (!sensitivityType) sensitivityType = 5; // 10 less accurate and more false alarms 1 more accurate.  

    var execParams = algorithmType + ";" + req.body.txtVideoUrl + ";" +  video_props.modelPath + ";demourl.jpg;" + sensitivityType;

    videoWrapper.run(execParams, function(err, results)  {

    //var streamUrl = "/uploads/demourl.jpg";
        var streamUrl = "https://turingvc.blob.core.windows.net/wizrdemo/demourl.jpg"; //"/uploads/demourl.jpg" //
        if (err) {

            killInstance(ProcessWrapper.ProcessType.Video);
             return res.render("video", {results : false, error: err});

        }
        
        var use_bsub = algorithmType === 1 ? true : false;
        return res.render("video", {results:true, videoImageUrl : streamUrl, isError:false,
            videoUrl : videoUrl, use_bsub : use_bsub, algorithm : algorithmType, sensitivity : sensitivityType});
    });
  });
});

app.post('/video/health', require('connect-ensure-login').ensureLoggedIn(), function (req, res, next) {

  var videoUrl = req.body.videoUrl;
  if (!videoUrl)
    return res.send({error: "Invalid Video Url"});

  CameraChecker.validateCamera({url :videoUrl}, function(err, r, t) {

    if (err) {
        return res.send({results : false, error: "The camera stream is unavailable or the camera can not be found"});
    }
    
    return res.send({results:true});
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
