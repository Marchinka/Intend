var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var ArticleModel = require("./articleModel");
var ArticleCollection = require("./articleCollection");
var ArticleDetailView = require("./articleDetailView");
var ArticleCollectionView = require("./articleCollectionView");
var ArticleFormView = require("./articleFormView");

var htmlTemplate = fs.readFileSync("./frontend/Articles/articleMain.html", 'utf8');

var obj = {
    currentView : {},
    template: _.template(htmlTemplate),
    render: function(){
        this.$el.html(this.template());
    },
    renderArticlesCollection: function(){
        var self = this;
        self.render();
        var articleCollection = new ArticleCollection();
        self.currentView = new ArticleCollectionView({
            collection: articleCollection, 
            el: $("#articles-page-content")
        });
        var options = { 
            reset: true,
            validate: true,
            success: function () {
                self.currentView.render();
            } 
        };
        self.currentView.collection.fetch(options);
    },
    renderArticleDetail: function(id) {
        var self = this;
        self.render();
        var articleModel = new ArticleModel({ id: id });
        self.currentView = new ArticleDetailView({
            model: articleModel, 
            el: $("#articles-page-content")
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
    renderArticleCreationForm: function(){
        var self = this;
        self.render();
        var articleJson = { title : "", subTitle: "", content : "" };
        var articleModel = new ArticleModel(articleJson);
        self.currentView = new ArticleFormView({
            model: articleModel, 
            el: $("#articles-page-content")
        });
        self.currentView.render();
    },
    renderArticleUpdateForm: function(id) {
        var self = this;
        self.render();
        var articleModel = new ArticleModel({ id: id });
        self.currentView = new ArticleFormView({
            model: articleModel, 
            el: $("#articles-page-content")
        });
        var options = { 
            reset: true,
            validate: true,
            success: function (){
                self.currentView.render();
            } 
        };
        self.currentView.model.fetch(options);
    }
};

module.exports = Backbone.View.extend(obj);
