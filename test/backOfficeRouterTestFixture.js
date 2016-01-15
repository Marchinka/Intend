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

describe('Back Office Router', function() {
    jsdom({ skipWindowCheck: true });

    before(function () {
        $ = rerequire('jquery');
        Backbone = require("backbone");
        App = require("../frontend/appView");
        BackOfficeRouter = require("../frontend/BackOffice/backOfficeRouter");
        BackOfficeMainView = require("../frontend/BackOffice/backOfficeMainView");
    });

    afterEach(function () {
        $.ajax = function (){ }; 
        Backbone.history.stop();
    });

    it('Renders correctly BackOfficeViewHtml if navigation occurs at /BackOffice', function () {
        // SETUP
        var app = new App({ el: document.body, template: appTemplate});
        app.render();
        Backbone.history.start({ pushState: false });
        var backOfficeRouter = new BackOfficeRouter({ appView: app });

        // EXERCISE
        Backbone.history.navigate("#/BackOffice", { trigger: true });

        // ASSERT
        var pageContent = document.getElementById("back-office-content").innerHTML;
        var isCurrentTabActive = document.getElementById("back-office-nav-tab").classList.contains('active');
        var numberOfActiveTabs = document.getElementsByClassName("active").length;
        expect(pageContent).not.to.be.undefined;
        expect(isCurrentTabActive).to.be.true;
        expect(numberOfActiveTabs).to.be.equal(1);
    });

    it('Calls correctly BackOfficeMainView render() if navigation occurs at #/BackOffice', function () {
        // SETUP
        var app = new App({ el: document.body, template: appTemplate});
        app.render();
        Backbone.history.start({ pushState: false });
        var backOfficeRouter = new BackOfficeRouter({ appView: app });
        var spy = chai.spy.on(BackOfficeMainView.prototype, "render");

        // EXERCISE
        Backbone.history.navigate("/BackOffice", { trigger: true });

        // ASSERT
        expect(spy).to.have.been.called();
    });
});
