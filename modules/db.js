
var db  = function() {
};

db.prototype.init = function(url){
	var mongoose = require('mongoose');
	mongoose.connect('mongodb://'+url);
	return mongoose;
}

db.prototype.find = function(first_argument) {
	
};

db.prototype.schema = function(){

}

module.exports = new db();