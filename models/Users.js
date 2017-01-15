var mongoose = require('mongoose');

//Get Schema object
var Schema = mongoose.Schema;

var userSchema = new Schema({


	name:{
		type:String
	}
})

var User = mongoose.model('User', userSchema);

module.exports = User;