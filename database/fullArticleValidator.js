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

		if (attributes.subTitle === null ||
			attributes.subTitle === undefined ||
			attributes.subTitle.trim() === '') {
			var subTitleError = { name: 'subTitle', message: 'Sub title is mandatory.' };
			validationErrors.push(subTitleError);
		}

		if (attributes.content === null ||
			attributes.content === undefined ||
			attributes.content.trim() === '') {
			var contentError = { name: 'content', message: 'Content is mandatory.' };
			validationErrors.push(contentError);
		}

    	return validationErrors.length > 0 ? validationErrors : false;
	};

	self.validateServerSide = function(attributes, options) {
		return self.validateClientSide(attributes, options);
	};
}