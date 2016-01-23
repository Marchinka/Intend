var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var TooltipListItemView = require("./tooltipListItemView");
var htmlTemplate = fs.readFileSync("frontend/Tooltips/tooltipCollectionHeader.html", 'utf8');
var TooltipCollection = require('./tooltipCollection.js');

var TooltipCollectionView = {
    template: _.template(htmlTemplate),
    initialize: function (attrs) {
        var self = this;
        if (!attrs.collection) {
            self.collection = new TooltipCollection();
        }
    },
    addOne : function(modelItem) {
        var view = new TooltipListItemView({ 
            model: modelItem, 
        });
        view.render();
        this.$el.append(view.el);
    },
    addAll: function() {
        this.render();
    },
    renderHtml: function(){
        var self = this;
        self.$el.html(self.template());
        self.collection.forEach(self.addOne, self);
    },
    render: function () {
        var self = this;
        var fetchCallback = function () {
            self.renderHtml();
        };
        var options = { reset: true, validate: true, success: fetchCallback };
        self.collection.fetch(options);        
    }
};

module.exports = Backbone.View.extend(TooltipCollectionView);