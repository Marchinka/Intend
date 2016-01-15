var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var ArticleListItemView = require("./articleListItemView");
var htmlTemplate = fs.readFileSync("frontend/Articles/articleCollectionHeader.html", 'utf8');

var obj = {
    template: _.template(htmlTemplate),
    addOne : function(modelItem) {
        var view = new ArticleListItemView({ model: modelItem });
        view.render();
        this.$el.append(view.el);
    },
    addAll: function(){
        this.render();
    },
    render: function(){
        var self = this;
        self.$el.html(self.template());
        self.collection.forEach(self.addOne, self);
    }
};

module.exports = Backbone.View.extend(obj);