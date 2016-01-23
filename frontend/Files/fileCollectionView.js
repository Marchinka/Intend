var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var FileView = require("./fileView");
var FileCollection = require("./fileCollection.js");

var obj = {
    addOne : function(modelItem) {
        var view = new FileView({ model: modelItem });
        view.render();
        this.$el.append(view.el);
    },
    addAll: function(){
        this.renderHtml();
    },
    renderHtml: function() {
        var self = this;
        self.collection.forEach(self.addOne, self);
    },
    render: function () {
        this.renderHtml();
    }
};

module.exports = Backbone.View.extend(obj);