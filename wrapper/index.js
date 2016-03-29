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
    this.modelPath = props.modelPath;
	this.running = false;
	this.processType = props.processType;
	this.partnerId = props.partnerId ? props.partnerId : null;
    this.execArgs = props.execArgs;
	
	try {
		this.childProcess = spawn(this.executable, [this.execFile], this.execArgs);
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
		this.childProcess = spawn(this.executable, [this.execFile], this.execArgs);
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
		
        console.log(data+"");
        
		if (!data)
			return cb("child process returned no data", null);
		
        
        
		if (inst.args.noResult === true) return cb(null, data+"");
		
	});
	
	this.childProcess.on("end", function(output)  {
		console.log('end');
	});
    
    // this.childProcess.stderr.on("data", function(data) {
    //     console.log((data+"").split("\n"));
    // });

	this.childProcess.on("exit", function(exitCode, a, b) {
		inst.reconnect();
        //console.log("exit", a, b);
		console.log("Exit (" + exitCode + ")");
	});
	
	try {
        this.childProcess.stdin.write(file + "\n", function(err) {
            inst.childProcess.stdin.end();	
            if (inst.args.noResult && file.startsWith("2;")===false) {
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