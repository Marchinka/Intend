window.$ = window.jQuery = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var errorBinder = require("../errorBinder.js");
var htmlTemplate = fs.readFileSync("frontend/User/login.html", 'utf8');
var UserModel = require("./userModel.js");

var obj = {
	events: {
        'submit form': 'submit'
    },
    initialize: function (attrs) {
        if (!attrs.model) {
            this.model = new UserModel();
        }
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
                function() {
                    Backbone.history.navigate("/Home", { trigger: true });
                },
                function(response) {
                    if (response.status === 500 || response.status === 401) {
                        var errors = JSON.parse(response.responseText);
                        errorBinder.bindErrors(errors);
                    }
                });
        }
    },
    template: _.template(htmlTemplate),
    render: function(){
        this.$el.html(this.template());
    }
};

module.exports = Backbone.View.extend(obj);