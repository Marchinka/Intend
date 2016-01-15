var fs = require("fs");
var jsdom = require('mocha-jsdom');
var chai = require('chai'), spies = require('chai-spies');
var _ = require("underscore");
chai.use(spies);
var expect = chai.expect;
var $;
var App;
var ExercisesRouter;
var HomeMainView;
var Backbone;
var rerequire = jsdom.rerequire;
var fs = require("fs");
var appTemplate = fs.readFileSync("frontend/app.html", 'utf8');

describe('Article Router', function() {
    jsdom({ skipWindowCheck: true });

    before(function () {
        $ = rerequire('jquery');
        Backbone = require("backbone");
        App = require("../frontend/appView");
        ArticleRouter = require("../frontend/Articles/articleRouter");
        ArticleMainView = require("../frontend/Articles/articleMainView");
    });

    afterEach(function () {
        $.ajax = function (){ }; 
        Backbone.history.stop();
    });

    it('Renders correctly ExerciseViewHtml if navigation occurs at /Articles', function () {
        // SETUP
        var app = new App({ el: document.body, template: appTemplate});
        app.render();
        Backbone.history.start({ pushState: false });
        var articleRouter = new ArticleRouter({ appView: app });

        // EXERCISE
        Backbone.history.navigate("#/Articles", { trigger: true });

        // ASSERT
        var pageContent = document.getElementById("articles-content").innerHTML;
        var isCurrentTabActive = document.getElementById("articles-nav-tab").classList.contains('active');
        var numberOfActiveTabs = document.getElementsByClassName("active").length;
        expect(pageContent).not.to.be.undefined;
        expect(isCurrentTabActive).to.be.true;
        expect(numberOfActiveTabs).to.be.equal(1);
    });

    it('Calls correctly ExercisesMainView renderArticlesCollection() if navigation occurs at #/Articles', function () {
        // SETUP
        var app = new App({ el: document.body, template: appTemplate});
        app.render();
        Backbone.history.start({ pushState: false });
        var articleRouter = new ArticleRouter({ appView: app });
        var spy = chai.spy.on(ArticleMainView.prototype, "renderArticlesCollection");

        // EXERCISE
        Backbone.history.navigate("/Articles", { trigger: true });

        // ASSERT
        expect(spy).to.have.been.called();
    });

    it('Calls correctly ExercisesMainView renderArticleDetail() if navigation occurs at #/Articles/:id', function () {
        // SETUP
        var app = new App({ el: document.body, template: appTemplate});
        app.render();
        Backbone.history.start({ pushState: false });
        var articleRouter = new ArticleRouter({ appView: app });
        var spy = chai.spy.on(ArticleMainView.prototype, "renderArticleDetail");

        // EXERCISE
        Backbone.history.navigate("/Articles/123", { trigger: true });

        // ASSERT
        expect(spy).to.have.been.called();
    });

    it('Calls correctly ExercisesMainView renderArticleCreationForm() if navigation occurs at #/Articles/Create', function () {
        // SETUP
        var app = new App({ el: document.body, template: appTemplate});
        app.render();
        Backbone.history.start({ pushState: false });
        var articleRouter = new ArticleRouter({ appView: app });
        var spy = chai.spy.on(ArticleMainView.prototype, "renderArticleCreationForm");

        // EXERCISE
        Backbone.history.navigate("/Articles/Create", { trigger: true });

        // ASSERT
        expect(spy).to.have.been.called();
    });

    it('Calls correctly ExercisesMainView renderArticleUpdateForm() if navigation occurs at #/Articles/Update/:id', function () {
        // SETUP
        var app = new App({ el: document.body, template: appTemplate});
        app.render();
        Backbone.history.start({ pushState: false });
        var articleRouter = new ArticleRouter({ appView: app });
        var spy = chai.spy.on(ArticleMainView.prototype, "renderArticleUpdateForm");

        // EXERCISE
        Backbone.history.navigate("/Articles/Update/3233434", { trigger: true });

        // ASSERT
        expect(spy).to.have.been.called();
    });
});
