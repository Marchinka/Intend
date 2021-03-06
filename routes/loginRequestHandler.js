var express = require('express');
var router = express.Router();
var LocalStrategy = require('passport-local').Strategy;
var UserRepository = require("./../database/userRepository.js");
var databaseConfiguration = require("./../database/databaseConfig.js");

module.exports = function (passport) {
	passport.use(new LocalStrategy(function(username, password, done) { 
		var userRepository = new UserRepository(databaseConfiguration);
		var checkUserPassword = function (err, user) {
			if (user === undefined || user === null) {
				return done(null, false);
			}
			if (password === user.password) {
				return done(null, user);
			} else {
				return done(null, false);
			}			
		};
		userRepository.getUserByUserName(username, checkUserPassword);	
	}));

	passport.serializeUser(function(user, done) { 
		done(null, user.id);
	});

	passport.deserializeUser(function(userId, done) { 
	  	var userRepository = new UserRepository(databaseConfiguration);
	  	var returnDeserializedUser = function (err, doc) {
	  		console.log("des"  + JSON.stringify(doc));
			done(null, doc);
	  	};
	  	userRepository.getUserById(userId, returnDeserializedUser);
	});

	router.post('/', function(req, res, next) {
		passport.authenticate('local', 
			function(err, user, info) {
    			if (!user) {
    				var validationErrors = [
    					{ name: 'username', message: 'Incorrect User Name or Password.' },
    					{ name: 'password', message: 'Incorrect User Name or Password.' }
    				];
    				res.status(401).send(validationErrors);
    				return;
				}
				else {
	    			req.logIn(user, function(err) {
		      			if (err) { 
		      				return next(err); 
		      			}
		      			user.id = undefined;
						res.manageUsernameCookie(user);
		      			return res.send(user);
		    		});
				}
	  	})(req, res, next);
	});

	router.get('/', function(req, res, next) {
		res.send();
	});

	router.get('/', function(req, res, next) {
		if (req.user) {
			res.send(req.user);
		} else {
			req.logOut();
		    res.status(401).send({ message: "Autenticazionefallita"});
		}
	});

	return router;
};
