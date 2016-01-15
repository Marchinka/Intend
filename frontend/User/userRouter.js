var $ = require('jquery');
var Backbone = require("backbone");
var UserMainView = require("./userMainView");
var LoginView = require("./loginView");
var UserView = require("./userView");
var UserModel = require("./userModel");
var UnauthorizedView = require("./unauthorizedView");

module.exports = Backbone.Router.extend({
    appView: {},
    currentMainView : {},
    routes: {
        'Login' : 'login',
        'User' : 'user',
        'Unauthorized': 'unauthorized'
    },
    initialize: function (attrs) {
        if(attrs.appView === undefined || attrs.appView === null) {
            throw new Error("appView is not defined");
        }
        this.appView = attrs.appView;
    },
    login: function () {
        var self = this;
        self.appView.userTabView.model.fetch();
        if (self.appView.userTabView.model.get("username")) {
            Backbone.history.navigate("/User", { trigger: true });
            return;
        }
        self.appView.disposeOfMainCurrentView();
        self.appView.currentMainView = new LoginView({
            model: self.appView.userTabView.model, 
            el: $("#app-content")
        });
        self.appView.currentMainView.render();
        self.appView.activateUserTab();
    },
    user: function () {
        var self = this;
        self.appView.userTabView.model.fetch();
        if (!self.appView.userTabView.model.get("username")) {
            Backbone.history.navigate("/Login", { trigger: true });
            return;
        }
        self.appView.disposeOfMainCurrentView();
        self.appView.currentMainView = new UserView({
            model: self.appView.userTabView.model, 
            el: $("#app-content")
        });
        self.appView.currentMainView.render();
        self.appView.activateUserTab();
    },
    unauthorized: function () {
        var self = this;
        self.appView.disposeOfMainCurrentView();
        self.appView.currentMainView = new UnauthorizedView({
            el: $("#app-content")
        });
        self.appView.currentMainView.render();
        self.appView.activateUserTab(); 
    }
});

