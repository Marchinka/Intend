var $ = require('jquery');
var Backbone = require("backbone");
var ArticleMainView = require("./articleMainView");

module.exports = Backbone.Router.extend({
    appView: {},
    routes: {
        'Articles(/)' : 'articles',
        'Articles/Create' : 'articleCreate',
        'Articles/:id' : 'articleDetail',
        'Articles/Update/:id' : 'articleUpdate'
    },
    initialize: function (attrs) {
        if(attrs.appView === undefined || attrs.appView === null) {
            throw new Error("appView is not defined");
        }
        this.appView = attrs.appView;
    },
    articles: function(){
        var self = this;
        self.appView.disposeOfMainCurrentView();
        self.appView.currentMainView = new ArticleMainView({el: $("#app-content") });
        self.appView.currentMainView.renderArticlesCollection();
        self.appView.activateArticlesTab();
    },
    articleDetail: function(id) {
        var self = this;
        self.appView.disposeOfMainCurrentView();
        self.appView.currentMainView = new ArticleMainView({el: $("#app-content") });
        self.appView.currentMainView.renderArticleDetail(id);
        self.appView.activateArticlesTab();
    },
    articleCreate: function() {
        var self = this;
        self.appView.disposeOfMainCurrentView();
        self.appView.currentMainView = new ArticleMainView({el: $("#app-content") });
        self.appView.currentMainView.renderArticleCreationForm();
        self.appView.activateArticlesTab();
    },
    articleUpdate: function(id) {
        var self = this;
        self.appView.disposeOfMainCurrentView();
        self.appView.currentMainView = new ArticleMainView({el: $("#app-content") });
        self.appView.currentMainView.renderArticleUpdateForm(id);
        self.appView.activateArticlesTab();
    }
});