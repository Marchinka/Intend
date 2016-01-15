var $ = require('jquery');
var Backbone = require("backbone");
var HomeMainView = require("./homeMainView");

module.exports = Backbone.Router.extend({
    appView: {},
    routes: {
        '' : 'home',
        'Home' : 'home'
    },
    initialize: function (attrs) {
        if(attrs.appView === undefined || attrs.appView === null) {
            throw new Error("appView is not defined");
        }
        this.appView = attrs.appView;
    },
    home: function () {
        var self = this;
        self.appView.disposeOfMainCurrentView();
        self.appView.currentMainView = new HomeMainView({el: $("#app-content") });
        self.appView.currentMainView.render();
        self.appView.activateHomeTab();
    },
});