var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var TooltipListItemView = require("./tooltipListItemView");
var htmlTemplate = fs.readFileSync("frontend/Tooltips/tooltipCollectionHeader.html", 'utf8');

var TooltipCollectionView = {
    template: _.template(htmlTemplate),
    initialize: function () {
        var self = this;
        self.collection.on("destroy", function () {
            self.render();
        });
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
    render: function(){
        var self = this;
        self.$el.html(self.template());
        self.collection.forEach(self.addOne, self);
    }
};

module.exports = Backbone.View.extend(TooltipCollectionView);