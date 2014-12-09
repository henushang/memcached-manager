var memcache = require('memcache');
var setting = {host:'192.168.1.94', port:11211};

var client = new memcache.Client(setting.port, setting.host);

client.on('connect', function(){
	client.connected = true;
	console.log('connected');
});

client.on('close', function(){
	client.connected = false;
	console.log('closed');
});

client.on('error', function(e){
	console.log("con err");
	console.log(e);
});

client.on('timeout', function(){
	console.log("socket timed out");
});

// connect to the memcache server after subscribing to some or all of these events

var callback = function (error, value) {
  if (error) {
    return console.log(error); 
  }
  return console.log(value);
}

function get(key, callback){
	if(!key){
		return null;
	}
	client.get(key, function(error, result){
		callback(key, result);
	});	
}


function set(key, value, lifetime){
	if(!key || !value){
		return false;
	}
	if(lifetime){
		client.set(key, value, function(error, result){
		    // lifetime is optional. the default is
		    // to never expire (0)
		    if(error){
		    	return false;
		    }
		    return true;

		}, lifetime);
	}else{
		client.set(key, value, function(error, result){
		    // lifetime is optional. the default is
		    // to never expire (0)
		    if(error){
		    	return false;
		    }
		    return true;
		});
	}
}

function getVersion(){
	client.version(function(err, version){
		if(err) {
			console.log("err");
			return null;
		}
		return version;
	});
}


client.connect();
exports.client = client;
exports.getVersion = getVersion;
exports.set = set;
exports.get = get;