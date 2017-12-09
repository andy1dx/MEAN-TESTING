//importing modules

//express module
var express = require('express');

//import for express route
var index = require('./route/index');

//mongod db modude
var mongoose = require('mongoose');

//import config file
var config = require('./config/database');

//import node path
var path = require('path');

//express config
//set port
var port = 3000;

/*********************************************************
**                                                      **
**              mongodb configuration                   **
**                                                      **
*********************************************************/
//set monggose db
mongoose.promise = global.promise;
mongoose.connect(config.uri,config.option);

//on connection 
mongoose.connection.on('connected',()=>{
	console.log(config.secret);
	console.log('connected to database mongodb @ 27017');
});

//if connection error
mongoose.connection.on('error',(err)=>{
	if(err)
	{
		console.log('error in connection to database mongodb @ 27017:'+err);
	}
});

/*********************************************************
**                                                      **
**                express configuration                 **
**                                                      **
*********************************************************/

//set app express
var app = express();



/*********************************************************
**                                                      **
**                path  configuration                   **
**                                                      **
*********************************************************/


 app.use(express.static(path.join(__dirname + '/client/dist/')));

// set static  folder for route
//app.use('/', index);
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/dist/index.html'))
});

//listen to port ti define the port work or not
app.listen(port,()=>{
	console.log('server started at port:'+port);
});