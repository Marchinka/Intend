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

describe('Exercises Router', function() {
    jsdom({ skipWindowCheck: true });

    before(function () {
        $ = rerequire('jquery');
        Backbone = require("backbone");
        App = require("../frontend/appView");
        ExercisesRouter = require("../frontend/Exercises/exercisesRouter");
        ExerciseMainView = require("../frontend/Exercises/exerciseMainView");
    });

    afterEach(function () {
        $.ajax = function (){ };        
        Backbone.history.stop();
    });

    it('Renders correctly ExerciseViewHtml if navigation occurs at /Exercises', function () {
        // SETUP
        var app = new App({ el: document.body, template: appTemplate});
        app.render();
        Backbone.history.start({ pushState: false });
        var exercisesRouter = new ExercisesRouter({ appView: app });

        // EXERCISE
        Backbone.history.navigate("#/Exercises", { trigger: true });

        // ASSERT
        var pageContent = document.getElementById("exercises-content").innerHTML;
        var isCurrentTabActive = document.getElementById("exercises-nav-tab").classList.contains('active');
        var numberOfActiveTabs = document.getElementsByClassName("active").length;
        expect(pageContent).not.to.be.undefined;
        expect(isCurrentTabActive).to.be.true;
        expect(numberOfActiveTabs).to.be.equal(1);
    });

    it('Calls correctly ExercisesMainView render() if navigation occurs at #/Exercises', function () {
        // SETUP
        var app = new App({ el: document.body, template: appTemplate});
        app.render();
        Backbone.history.start({ pushState: false });
        var exercisesRouter = new ExercisesRouter({ appView: app });
        var spy = chai.spy.on(ExerciseMainView.prototype, "render");

        // EXERCISE
        Backbone.history.navigate("/Exercises", { trigger: true });

        // ASSERT
        expect(spy).to.have.been.called();
    });
});
