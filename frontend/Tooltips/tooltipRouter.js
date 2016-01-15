var $ = require('jquery');
var Backbone = require("backbone");
var TooltipMainView = require("./tooltipMainView");

module.exports = Backbone.Router.extend({
    appView: {},
    routes: {
        'Tooltips(/)' : 'tooltipCollection',
        'Tooltips/Create' : 'tooltipCreate',
        'Tooltips/Update/:id' : 'tooltipUpdate'
    },
    initialize: function (attrs) {
        if(attrs.appView === undefined || attrs.appView === null) {
            throw new Error("appView is not defined");
        }
        this.appView = attrs.appView;
    },
    tooltipCollection: function () {
        var self = this;
        self.appView.disposeOfMainCurrentView();
        self.appView.currentMainView = new TooltipMainView({el: $("#app-content") });
        self.appView.currentMainView.renderTooltipCollectionView();
        self.appView.activateBackOfficeTab();
    },
    tooltipCreate: function() {
        var self = this;
        self.appView.disposeOfMainCurrentView();
        self.appView.currentMainView = new TooltipMainView({el: $("#app-content") });
        self.appView.currentMainView.renderTooltipCreationFormView();
        self.appView.activateBackOfficeTab();
    },
    tooltipUpdate: function(id) {
        var self = this;
        self.appView.disposeOfMainCurrentView();
        self.appView.currentMainView = new TooltipMainView({el: $("#app-content") });
        self.appView.currentMainView.renderTooltipUpdateFormView(id);        
        self.appView.activateBackOfficeTab();
    }
});