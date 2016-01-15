var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var TooltipView = require("./tooltipInjectionView");

var obj = {
    addTooltip: function(modelItem){
        var tooltipView = new TooltipView( { el: this.$el, model: modelItem });
        tooltipView.render();
    },
    render: function(){
        var self = this;
        this.collection.forEach(this.addTooltip, self);
    }
};

module.exports = Backbone.View.extend(obj);