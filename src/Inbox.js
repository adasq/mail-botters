var _ = require('underscore');

var Inbox = function(data){
	this.obj = data; 
};

Inbox.prototype.getLastMessageIndex = function(readed){
	var unreaded= !(!!readed);
	if(this.isEmpty()){
		return null;
	}

	if(unreaded){
		var unreadedMessage = _.find(this.obj.data, function(obj){		
			return obj.r === '0';
		});  
		if(unreadedMessage){
			return unreadedMessage.i;
		}else{
			return null;
		}
	}else{ 
		return this.obj.data[0].i;
	}
};


Inbox.prototype.getMessages = function(unreaded_){
	var unreaded= !!unreaded_;
	if(this.isEmpty()){
		return null;
	}

	if(unreaded){
		var unreadedMessage = _.find(this.obj.data, function(obj){		
			return obj.r === '0';
		});  
		if(unreadedMessage){
			return unreadedMessage.i;
		}else{
			return null;
		}
	}else{ 
		return this.obj.data[0].i;
	}
};



Inbox.prototype.isEmpty = function(){
	return (this.obj.data.length === 0);
};


module.exports = Inbox;