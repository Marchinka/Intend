var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var ArticleListItemView = require("./articleListItemView");
var ArticleCollection = require("./articleCollection.js");
var htmlTemplate = fs.readFileSync("frontend/Articles/articleCollectionHeader.html", 'utf8');

var obj = {
    template: _.template(htmlTemplate),
    initialize: function (attrs) {
        if (!attrs.collection) {
            this.collection = new ArticleCollection();
        }
    },
    addOne : function(modelItem) {
        var view = new ArticleListItemView({ model: modelItem });
        view.render();
        this.$el.append(view.el);
    },
    addAll: function(){
        this.renderHtml();
    },
    renderHtml: function() {
        var self = this;
        self.$el.html(self.template());
        self.collection.forEach(self.addOne, self);
    },
    render: function () {
        var self = this;
        var options = { 
            reset: true,
            validate: true,
            success: function () {
                self.renderHtml();
            } 
        };
        self.collection.fetch(options);
    }
};

module.exports = Backbone.View.extend(obj);