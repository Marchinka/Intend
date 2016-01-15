var $ = require('jquery');

module.exports = {
	removeAllErrors: function (){
		$('.form-group').removeClass('has-error');
		$('.help-block').html('');
	},
	bindErrors: function (errors) {
		if (errors === undefined || errors === null) {
			return;
		}

		this.removeAllErrors();
		for (var i = 0; i < errors.length; i++) {
			this.bindError(errors[i]);
		}
	},
	bindError: function (error) {
		if (error === undefined || error === null) {
			return;
		}

		var fieldName = error.name;
		var inputElement = $("[name=" + fieldName +"]");
		var formGroup = inputElement.parent();
		formGroup.addClass('has-error');
		formGroup.find('.help-block').html(error.message);
	}
};
