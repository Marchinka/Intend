module.exports = function () {
	var self = this;

	self.validateClientSide = function(attributes, options) {
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