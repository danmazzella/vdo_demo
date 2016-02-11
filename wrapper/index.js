var path = require("path"),
	fs = require("fs"),
	spawn = require('child_process').spawn,
    exec = require('child_process').exec;

var ProcessWrapper = function(props) {
	
	this.childProcess = null;
	this.props = props;
	this.outputFolder = props.outputFolder;
	this.executable = props.executable; 
	this.args = props.args;	
	this.execFile = props.execFile;  
	this.running = false;
	this.processType = props.processType;
	this.partnerId = props.partnerId ? props.partnerId : null;
	
	try {
		this.childProcess = spawn(this.executable, [this.execFile]);
	} catch(e) {
		console.log(e);
	}	
	
};

ProcessWrapper.ProcessType = {
	
	"Image": 1,
	"Video": 2
};

ProcessWrapper.prototype.reconnect = function(){
	try {
		this.childProcess = spawn(this.executable, [this.execFile]);
		if (this.processType == ProcessWrapper.ProcessType.Video) this.running = false;
	} catch(e) {
		console.log(e);
	}	
};

ProcessWrapper.prototype.run = function(file, cb) {
	
	var inst = this;
	
	if (!file || !this.childProcess)
		return cb("File or Executable Path Missing", null);
	
	this.childProcess.stdout.on("data", function(data) {
		
		if (!data)
			return cb("child process returned no data", null);
		
		return cb(null, data+"");
		
	});
	
	this.childProcess.on("end", function(output)  {
		console.log('end');
	});

	this.childProcess.on("exit", function(exitCode) {
		inst.reconnect();
		console.log("Exit (" + exitCode + ")");
	});
	
	try {
        this.childProcess.stdin.write(file + "\n", function(err) {
            inst.childProcess.stdin.end();	
            if (inst.args.noResult) {
                inst.running = true;
                return cb();	
            }
            
        });
    } catch (e) {
           
        return cb(e);
    }

};

ProcessWrapper.prototype.kill = function() {
	
	try {
		
		var inst = this;
		
		if (this.childProcess) {
			
			spawn('taskkill', ['/pid', this.childProcess.pid, '/f', '/t']); //, function(error, stdout, stderr) {
			// 	if (error)
			// 		console.log("error killing");
			// 		console.log(error);
			// });
			console.log('killed');
			this.childProcess.kill();
		}
		
	} catch (e) {
		
		console.log('Error Killing Process');
		console.log(e);
	}
	
};

module.exports = ProcessWrapper;