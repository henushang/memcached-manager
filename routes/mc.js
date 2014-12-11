var express = require('express');
var router = express.Router();

var _ = require('lodash');

var mc = require('./client');

/**
 * 配置memcached服务器的信息
 */
router.get('/config', function(req, res) {
	var result = mc.set("name","henushang");
	
	var name = mc.get("name",getValueCB);	
		
	res.send("config success");
});

var getValueCB = function(key, value){
	console.log("getValueCB");
	console.log(key + ":" + value);
}

module.exports = router;
