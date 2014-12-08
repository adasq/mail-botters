
var q = require('q');
var _ = require('underscore'); 
var request = require('request'); 
var Resposne = require('./Resposne.js'); 


var RequestManager = function(session){
		this.session = session || request.jar();

		this.post = function(options_){
			var defer= q.defer();
			var options = _.clone(options_);
			options.jar = this.session;
			request.post(options, 
				function(e,r,b){
					if(e){
						defer.reject(e);
					}else{
						var response = new Resposne();
						response.setHeaders(r.headers);
						response.setBody(b);
						defer.resolve(response);
					}


			});
			return defer.promise;
	};

	this.get = function(options_){

			var defer= q.defer();
			var options = _.clone(options_);
			options.jar = this.session;
			request(options, 
				function(e,r,b){
					if(e){
						defer.reject(e);
					}else{
						var response = new Resposne();
						response.setHeaders(r.headers);
						response.setBody(b);
						defer.resolve(response);
					}


			});
			return defer.promise;

		};
};


module.exports = RequestManager;