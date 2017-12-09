//importing modules


var express = require('express'); //express module
const router = express.Router();   //set router for public

//import for express route
//var index = require('./routes/index');

var mongoose = require('mongoose');  //mongod db modude
var config = require('./config/database'); //import config file 
var bodyParser = require('body-parser'); //importing body parser
var path = require('path');  //import node path
const authentication = require('./Routes/authentication')(router);  //set routes files

//express config
var port = 3000; //set port

/*********************************************************
**                                                      **
**              mongodb configuration                   **
**                                                      **
*********************************************************/
//set monggose db
mongoose.Promise = global.Promise;
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

app.use(express.static(path.join(__dirname + '/client/dist/')));


/*********************************************************
**                                                      **
**                body parser  configuration            **
**                                                      **
*********************************************************/

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

/*********************************************************
**                                                      **
**                path  configuration                   **
**                                                      **
*********************************************************/


 

// set static  folder for route
app.use('/authentication', authentication);
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/dist/index.html'))
});

//listen to port ti define the port work or not
app.listen(port,()=>{
	console.log('server started at port:'+port);
});