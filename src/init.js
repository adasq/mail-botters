
var express = require('express');
var request = require('request');
var q = require('q');
var _ = require('underscore'); 
var cheerio = require('cheerio'); 
 var routesGET = require('./routes/get.js');


var MigmailManager = require('./MigmailManager.js');
var Inbox = require('./Inbox.js');

	var app = express(); 
	app.configure(function() {
		app.set('port', 80);
	  	app.set('ipaddr', "127.0.0.1");
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use('/', express.static(__dirname + '/../public'));
	});

var server = require('http').createServer(app);

_.each(routesGET, function(route){
  app.get('/api'+route.url, route.callback);
});


server.listen(app.get('port'), app.get('ipaddr'), function(){
	console.log('Express server listening on  IP: ' + app.get('ipaddr') 
		+ ' and port ' + app.get('port'));


