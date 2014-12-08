var q = require('q');
var _ = require('underscore');  
var URLProvider = require('./URLProvider.js'); 
var cheerio = require('cheerio'); 
var RequestManager = require('./RequestManager.js'); 










var MigmailManager = function(login){
this.requestManager = new RequestManager();
this.urlProvider = new URLProvider(login);
this.login = login;
};
















MigmailManager.prototype.authorize = function(){
var that = this;
var defer= q.defer();
var promise = this.requestManager.post({
	form: {
		login: that.login,
		rules:"on"	
	},
	followRedirect: false,
	uri: that.urlProvider.loginUrl
});
promise.then(function(resposne){
	if(resposne.getHeader('location') === that.urlProvider.inboxRedirectionUrl){
		defer.resolve(true);
	}else{
		defer.reject(false);
		console.log('not redirecting :x')
	}
}, function(e){
	defer.reject(e);
})
return defer.promise;
};

















MigmailManager.prototype.getInbox = function(){
var that = this;
var defer= q.defer();
var opt = {
			headers: {
				"Accept":"*/*", 
				"Accept-Encoding":"",
				"Accept-Language":"pl-PL,pl;q=0.8,en-US;q=0.6,en;q=0.4",
				"Cache-Control":"no-cache",
				"Connection":"keep-alive",
				"DNT":"1",
				"Host":"www.migmail.pl",
				"Pragma":"no-cache",
				"Referer": that.urlProvider.inboxUrl,
				"User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36",
				"X-Requested-With":"XMLHttpRequest"
			},
			followRedirect: true,
			uri: that.urlProvider.inboxAjaxUrl
}; 
var promise = this.requestManager.get(opt);
promise.then(function(resposne){	
		defer.resolve(JSON.parse(resposne.getBody()));
}, function(e){
	defer.reject(e);
});
return defer.promise;
};

















MigmailManager.prototype.getMailMessage = function(mailId){
var that = this;
var defer= q.defer();
var opt = {
			followRedirect: true,
			uri: that.urlProvider.getMessageUrlByMessageId(mailId)
}; 
var promise = this.requestManager.get(opt);
promise.then(function(resposne){	
		
			var $ = cheerio.load(resposne.getBody(), {normalizeWhitespace: true});
			var title = $('.message-header strong').text().trim();
			var from = $('.message-header i').text().trim();
			var text = $('.body').text().trim(); 

			var links = $('.body a'); 
			var linksArray =_.map(links, function(link){
				return link.attribs.href;
			});


			defer.resolve({
				title: title,
				from: from,
				body: {
					text: text,
					links: linksArray
				}
			});



}, function(e){
	defer.reject(e);
});
return defer.promise;
};









module.exports = MigmailManager;