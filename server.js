var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override')
// ---------------------------------------
var app = express();

var port = process.env.PORT || 3000;
// ---------------------------------------
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// --------------------------------------

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));


var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


// --------------------------------------
mongoose.connect("mongodb://localhost/mongohandle");
// mongoose.connect("mongodb://heroku_mwjgtfrn:f5d9mqtu7t5j0qfgup1uakmbmg@ds021650.mlab.com:21650/heroku_mwjgtfrn")
var db = mongoose.connection;

// show any mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// once logged in to the db through mongoose, log a success message
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

var User = require('./models/Users.js')

// ----------------------------------------

// Post new and unique user
app.post('/user', function(req, res){

	//creates new user
	var user = new User(req.body)
	console.log(user);

	
	user.save(function(err, docs){
				
		res.redirect('/')
	})

})

// renders home page
app.get('/', function(req, res){

	//gets all users and renders page
	User.find({}, function(err, docs){
		console.log(docs);
		res.render('index',{users:docs})
	})
	
})

//runs server
app.listen(port, function(){
	console.log("Now serving Port:"+port);
})