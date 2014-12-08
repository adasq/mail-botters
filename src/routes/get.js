var _ = require('underscore');
var MigmailManager = require('./../MigmailManager.js');
var Inbox = require('./../Inbox.js');

var routes = [];

var parseNumber = function(num){
	return (_.isNaN(+num) || +num < 0)?0:Math.round(+num);
};

var parseLogin = function(login){
	
	if(_.isString(login) && login.length > 2 && login.length < 33){ 
		return login;
	}else{
		return null;
	}
};

routes.push({
	url: "/inbox",
	callback: (function(){
	var startTime = new Date();
	return function(req, res){	 



		var defaultConfig = { 		
		};
		var config = _.extend(defaultConfig, req.query);

		config.total = parseNumber(config.total);
		config.login = parseLogin(config.login) || 'test';
		config.readed = (config.readed === 'true')?true:false;
		console.log(config);


		 var mm = new MigmailManager(config.login);
		 mm.authorize().then(function(){
		 	console.log('authorized!!!!');
		 	mm.getInbox().then(function(response){
		 		var inbox = new Inbox(response);
		 		console.log(response);
		 		if(inbox.isEmpty()){
		 			res.send({error: true, reason: 'inbox is empty'});
		 		}else{  
		 			var mid = inbox.getLastMessageIndex(config.readed);
		 			if(!mid){
		 				res.send({error: true, reason: 'no messages suitable for you'});
		 			};
		 			mm.getMailMessage(mid).then(function(message){
			 			res.send({error: false, data: message});
			 		});
		 		}
		 	});
		 });










	};
	})()
});













module.exports = routes;