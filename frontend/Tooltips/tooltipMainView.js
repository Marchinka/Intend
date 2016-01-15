var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var TooltipModel = require("./tooltipModel");
var TooltipCollection = require("./tooltipCollection");
var TooltipCollectionView = require("./tooltipCollectionView");
var TooltipFormView = require("./tooltipFormView");
var htmlTemplate = fs.readFileSync("./frontend/Tooltips/tooltipMain.html", 'utf8');

var obj = {
    currentView : {},
    template: _.template(htmlTemplate),
    render: function(){
        this.$el.html(this.template());
    },
    renderTooltipCreationFormView: function() {
        var self = this;
        self.render();
        var tootltip = { tooltipKey: '', description: ''};
        var tooltipModel = new TooltipModel(tootltip);
		self.currentView = new TooltipFormView({
            model: tooltipModel, 
            el: $("#tooltip-content")
        });
        self.currentView.render();
    },
    renderTooltipUpdateFormView : function (id) {
        var self = this;
        self.render();
        var tootltip = { id: id };
        var tooltipModel = new TooltipModel(tootltip);
		self.currentView = new TooltipFormView({
            model: tooltipModel, 
            el: $("#tooltip-content")
        });
        
		var options = { 
            reset: true,
            validate: true,
            success: function () {
        		self.currentView.render();
            } 
        };
        self.currentView.model.fetch(options);
    },
    renderTooltipCollectionView: function () {
    	var self = this;
        self.render();
        var tooltipCollection = new TooltipCollection();
        self.currentView = new TooltipCollectionView({
            collection: tooltipCollection, 
            el: $("#tooltip-content")
        });

        var options = { 
            reset: true,
            validate: true,
            success: function () {
        		self.currentView.render();
            } 
        };
        self.currentView.collection.fetch(options);
    }
};

module.exports = Backbone.View.extend(obj);
