var LoginClientSideValidator = require("./loginClientSideValidator");
var loginClientSideValidator = new LoginClientSideValidator();
var url = "mongodb://localhost:27017/intend";
var UserRepository = require("./../database/userRepository.js");
var userRepository = new UserRepository(url);

module.exports = function () {
	var self = this;

	self.validateServerSide = function(attributes, callback) {
		var preValidationErrors = loginClientSideValidator
				.validateClientSide(attributes, {});

		if (preValidationErrors) {
			console.log("nel validatore");			var result = preValidationErrors.length > 0 ? preValidationErrors : false;
			callback(result);
			return;
		}

		var validationErrors = [];
		
		if (!attributes.username || attributes.username.trim() === '') {
			var usernameError = { name: 'username', message: 'User Name is mandatory.' };
			validationErrors.push(usernameError);
		}

		if (!attributes.password || attributes.password.trim() === '') {
			var passwordError = { name: 'password', message: 'Password is mandatory.' };
			validationErrors.push(passwordError);
		}

    	return validationErrors.length > 0 ? validationErrors : false;
	};
}