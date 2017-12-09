//importing module
var express = require('express');
var router = express.Router();

//set routes for index page
//req is the request data
//res is the response data
router.get('/', function(req, res, next){
	//res.render('../views/index.html');
	res.send('hello world');
});

//export mmodule router
module.exports = router;