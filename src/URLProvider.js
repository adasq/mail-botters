var _ = require('underscore');

var MIGMAIL_URL_BAESE = 'http://www.migmail.pl/';
var MIGMAIL_URL_LOGIN = MIGMAIL_URL_BAESE+'login';

var URLProvider = function(login){
	if(!_.isString(login)){
		console.log('string need!');
		return;
	}
	var loginLength = login.length;
	if(loginLength.length < 3 || loginLength > 33){
			console.log('zle wymiary');
			return;
	}
 

	this.loginUrl= MIGMAIL_URL_LOGIN;
	this.inboxRedirectionUrl = '/account-'+login,
	this.inboxUrl=  MIGMAIL_URL_BAESE + 'account-'+login+'';
	this.inboxAjaxUrl=  MIGMAIL_URL_BAESE + 'ajax/account-'+login;
	this.getMessageUrlByMessageId= function(messageId){
		return this.inboxAjaxUrl+'/'+messageId;
	};

};

module.exports = URLProvider;