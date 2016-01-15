var fs = require("fs");
var jsdom = require('mocha-jsdom');
var chai = require('chai'), spies = require('chai-spies');
var _ = require("underscore");
chai.use(spies);
var expect = chai.expect;
var $;
var App;
var HomeRouter;
var HomeMainView;
var Backbone;
var rerequire = jsdom.rerequire;
var fs = require("fs");
var appTemplate = fs.readFileSync("frontend/app.html", 'utf8');

describe('Home Router', function() {
    jsdom({ skipWindowCheck: true });

    before(function () {
        window.sessionStorage = {
            item: { test: "test"},
            getItem : function (id) {
                return this.item;
            }
        };
        $ = rerequire('jquery');
        Backbone = require("backbone");
        App = require("../frontend/appView");
        HomeRouter = require("../frontend/Home/homeRouter");
        HomeMainView = require("../frontend/Home/homeMainView");
    });

    afterEach(function () {
        Backbone.history.stop();
    });

    beforeEach(function () {
    });

    it('Renders correctly HomeViewHtml if navigation occurs at /Home', function () {
        // SETUP
        var app = new App({ el: document.body, template: appTemplate});
        app.render();
        Backbone.history.start({ pushState: false });
        var homeRouter = new HomeRouter({ appView: app });

        // EXERCISE
        Backbone.history.navigate("#/Home", { trigger: true });

        // ASSERT
        var homePageContent = document.getElementById("home-content").innerHTML;
        var isCurrentTabActive = document.getElementById("home-nav-tab").classList.contains('active');
        var numberOfActiveTabs = document.getElementsByClassName("active").length;
        expect(homePageContent).not.to.be.undefined;
        expect(isCurrentTabActive).to.be.true;
        expect(numberOfActiveTabs).to.be.equal(1);
    });

    it('Calls correctly HomeView render() if navigation occurs at #/Home', function () {
        // SETUP
        var app = new App({ el: document.body, template: appTemplate});
        app.render();
        Backbone.history.start({ pushState: false });
        var homeRouter = new HomeRouter({ appView: app });
        var spy = chai.spy.on(HomeMainView.prototype, "render");

        // EXERCISE
        Backbone.history.navigate("/Home", { trigger: true });

        // ASSERT
        expect(spy).to.have.been.called();
    });
});
