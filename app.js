
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var sql = require('mssql'); 


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
var config = {
    user: 'sa',
    password: 'Windows1',
    server: '192.168.1.141',
    database: 'DBSPEI',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/spei', function (req, res) {
	
	var connection = new sql.Connection({user: 'sa',
    password: 'Windows1',
    server: '192.168.1.141',
    database: 'DBSPEI',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }});
    connection.connect(function(err){
    	var request	=  connection.request();
    	request.query('SELECT *  FROM ENVIO', function(err, recordset) {
	    	res.send(recordset);
		});
    });


})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
