var Resposne = function(){
	var headers = {};
	var body = "";
	this.getBody = function(){
		return body;
	};
	this.setHeaders = function(headers_){
		headers = headers_
	};
	this.getHeader = function(header){
		return headers[header];
	};
	this.setBody = function(body_){
		body = body_
	};
};

module.exports = Resposne;