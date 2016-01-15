module.exports = function () {
	var self = this;

	self.validateClientSide = function(attributes, options) {
		var validationErrors = [];
		
		if (attributes.tooltipKey === null ||
			attributes.tooltipKey === undefined ||
			attributes.tooltipKey.trim() === '') {
			var titleError = { name: 'tooltipKey', message: 'Key is mandatory.' };
			validationErrors.push(titleError);
		}

		if (attributes.description === null ||
			attributes.description === undefined ||
			attributes.description.trim() === '') {
			var titleError = { name: 'description', message: 'Description is mandatory.' };
			validationErrors.push(titleError);
		}
		
    	return validationErrors.length > 0 ? validationErrors : false;
	};

	self.validateServerSide = function(attributes, options) {
		return self.validateClientSide(attributes, options);
	};
};