window.$ = window.jQuery = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var errorBinder = require("../errorBinder.js");
var htmlTemplate = fs.readFileSync("frontend/User/login.html", 'utf8');

var obj = {
	events: {
        'submit form': 'submit'
    },
    validateForm: function (e) {
        var username = $('input[name=username]').val();
        var password = $('input[name=password]').val();
        var userToValidate = { username: username, password: password };
        var errors = this.model.validateLogin(userToValidate);
        if(errors) {
            errorBinder.bindErrors(errors);
            return false;
        }
        errorBinder.removeAllErrors();
        return true;
    },
    submit: function(e) {
        var self = this;
        e.preventDefault();
        var valid = self.validateForm();
        if (valid) {
    		var username = $('input[name=username]').val();
            var password = $('input[name=password]').val();
            var credentials = { username: username, password: password };
            this.model.login(
                credentials,
                function(user) {
                    self.model.set(user);
                    Backbone.history.navigate("/Home", { trigger: true });
                },
                function(response) {
                    var errors = JSON.parse(response.responseText);
                    errorBinder.bindErrors(errors);
                });
        }
    },
    template: _.template(htmlTemplate),
    render: function(){
        this.$el.html(this.template());
    }
};

module.exports = Backbone.View.extend(obj);