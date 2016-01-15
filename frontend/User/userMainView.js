var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var htmlTemplate = fs.readFileSync("./frontend/User/userMain.html", 'utf8');
var LoginView = require("./loginView");
var UserView = require("./userView");
var UserModel = require("./userModel");
var UnauthorizedView = require("./unauthorizedView");

var obj = {
    currentView : {},
    template: _.template(htmlTemplate),
    render: function() {
        this.$el.html(this.template());
    },
    renderLoginView: function(userModel) {
        var self = this;
        self.render();
        self.currentView = new LoginView({
            model: userModel, 
            el: $("#user-content")
        });
        self.currentView.render();
    },
    renderUserView: function (userModel) {
        var self = this;
        self.render();
        self.currentView = new UserView({
            model: userModel, 
            el: $("#user-content")
        });
        self.currentView.render();
    },
    renderUnauthorizedView: function () {
        var self = this;
        self.render();
        self.currentView = new UnauthorizedView({
            el: $("#user-content")
        });
        self.currentView.render();
    }
};

module.exports = Backbone.View.extend(obj);
