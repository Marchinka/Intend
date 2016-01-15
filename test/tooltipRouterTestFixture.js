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

describe('Tooltip Router', function() {
    jsdom({ skipWindowCheck: true });

    before(function () {
        $ = rerequire('jquery');
        Backbone = require("backbone");
        App = require("../frontend/appView");
        TooltipRouter = require("../frontend/Tooltips/tooltipRouter");
        TooltipMainView = require("../frontend/Tooltips/tooltipMainView");
    });

    afterEach(function () {
        $.ajax = function (){ }; 
        Backbone.history.stop();
    });

    it('Renders correctly TooltipViewHtml if navigation occurs at /Tooltips', function () {
        // SETUP
        var app = new App({ el: document.body, template: appTemplate});
        app.render();
        Backbone.history.start({ pushState: false });
        var tooltipRouter = new TooltipRouter({ appView: app });

        // EXERCISE
        Backbone.history.navigate("#/Tooltips", { trigger: true });

        // ASSERT
        var pageContent = document.getElementById("tooltips-content").innerHTML;
        var isCurrentTabActive = document.getElementById("back-office-nav-tab").classList.contains('active');
        var numberOfActiveTabs = document.getElementsByClassName("active").length;
        expect(pageContent).not.to.be.undefined;
        expect(isCurrentTabActive).to.be.true;
        expect(numberOfActiveTabs).to.be.equal(1);
    });

    it('Calls correctly TooltipMainView render() if navigation occurs at #/Tooltips', function () {
        // SETUP
        var app = new App({ el: document.body, template: appTemplate});
        app.render();
        Backbone.history.start({ pushState: false });
        var tooltipRouter = new TooltipRouter({ appView: app });
        var spy = chai.spy.on(TooltipMainView.prototype, "renderTooltipCollectionView");

        // EXERCISE
        Backbone.history.navigate("/Tooltips", { trigger: true });

        // ASSERT
        expect(spy).to.have.been.called();
    });

    it('Calls correctly TooltipMainView render() if navigation occurs at #/Tooltips/Create', function () {
        // SETUP
        var app = new App({ el: document.body, template: appTemplate});
        app.render();
        Backbone.history.start({ pushState: false });
        var tooltipRouter = new TooltipRouter({ appView: app });
        var spy = chai.spy.on(TooltipMainView.prototype, "renderTooltipCreationFormView");

        // EXERCISE
        Backbone.history.navigate("/Tooltips/Create", { trigger: true });

        // ASSERT
        expect(spy).to.have.been.called();
    });


    it('Calls correctly TooltipMainView render() if navigation occurs at #/Tooltips/Update/:id', function () {
        // SETUP
        var app = new App({ el: document.body, template: appTemplate});
        app.render();
        Backbone.history.start({ pushState: false });
        var tooltipRouter = new TooltipRouter({ appView: app });
        var spy = chai.spy.on(TooltipMainView.prototype, "renderTooltipUpdateFormView");

        // EXERCISE
        Backbone.history.navigate("/Tooltips/Update/231321321", { trigger: true });

        // ASSERT
        expect(spy).to.have.been.called();
    });
});
