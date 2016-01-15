var $ = require('jquery');
var Backbone = require("backbone");
var BackOfficeMainView = require("./backOfficeMainView");

module.exports = Backbone.Router.extend({
    appView: {},
    currentMainView : {},
    routes: {
        'BackOffice' : 'backOffice'
    },
    initialize: function (attrs) {
        if(attrs.appView === undefined || attrs.appView === null) {
            throw new Error("appView is not defined");
        }
        this.appView = attrs.appView;
    },
    backOffice: function () {
        var self = this;
        self.currentMainView = new BackOfficeMainView({el: $("#app-content") });
        self.currentMainView.render();
        self.appView.activateBackOfficeTab();
    }
});