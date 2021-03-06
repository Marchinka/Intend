module.exports = function () {
	var self = this;

	self.validateClientSide = function(attributes, options) {
		var validationErrors = [];
		
		if (attributes.title === null ||
			attributes.title === undefined ||
			attributes.title.trim() === '') {
			var titleError = { name: 'title', message: 'Title is mandatory.' };
			validationErrors.push(titleError);
		}

    	return validationErrors.length > 0 ? validationErrors : false;
	};

	self.validateServerSide = function(attributes, options) {
		return self.validateClientSide(attributes, options);
	};
}