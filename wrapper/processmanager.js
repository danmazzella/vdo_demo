var ProcessWrapper = require("./index.js");

// Options are startup process params.


var image_props = {
   outputFolder : "C:\\users\\wizr-demo\\documents\\projects\\py-faster-rcnn\\vdo_stone\\uploads\\",
   executable : 'python',
   execFile:  "C:\\users\\wizr-demo\\documents\\projects\\py-faster-rcnn\\tools\\demo1.py", 
   args : {
     noResult : false
   },
   processType: ProcessWrapper.ProcessType.Image,
   partnerId: 1
};

var video_props = {
   outputFolder : "C:\\users\\wizr-demo\\documents\\projects\\py-faster-rcnn\\vdo_stone\\uploads\\",
   executable : 'python',
   execFile:  "C:\\users\\wizr-demo\\documents\\projects\\py-faster-rcnn\\tools\\demo3.py", 
   args : {
     noResult : true
   },
   processType: ProcessWrapper.ProcessType.Video,
   partnerId: 1
};

// Partner ID as ptions
var ProcessManager = function ()  {
	
	this.instanc = [];
}

ProcessWrapper.prototype.add = function(option, cb) {
  
  switch (option.processType) {
			case ProcessWrapper.ProcessType.Image: 
			  
				this.SongAndStones.push(new ProcessWrapper(image_props));				
				break;
			case ProcessWrapper.ProcessType.Video: 
			
				this.SongAndStones.push(new ProcessWrapper(video_props));				
				break;			
			default:
      
				return;
				break;
  }
  
};

ProcessWrapper.prototype.get = function(option, cb) {
  for (var i = 0; i < this.SongAndStones; i++) {
    if (this.SongAndStones[i].processType == option.processType && option.partnerId == option.partnerId) {
      return cb(this.SongAndStones[i]);
    }
  }
}

ProcessWrapper.prototype.remove = function(option, cb) {
  for (var i = 0; i < this.SongAndStones; i++) {
    if (this.SongAndStones[i].processType == option.processType && option.partnerId == option.partnerId) {
      this.SongAndStones[i].kill();
    }
  }  
}

module.exports = ProcessManager;