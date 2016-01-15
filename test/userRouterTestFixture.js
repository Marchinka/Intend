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
var Cookie = require("js-cookie");
var LoginView;
var UserView;
var UserModel;
var UnauthorizedView;

describe('User Router', function() {
    jsdom({ skipWindowCheck: true });

    before(function () {
        $ = rerequire('jquery');
        Backbone = require("backbone");
        App = require("../frontend/appView");
        UserRouter = require("../frontend/User/userRouter");
        LoginView = require("../frontend/User/loginView");
        UserView = require("../frontend/User/userView");
        UserModel = require("../frontend/User/userModel");
        UnauthorizedView = require("../frontend/User/unauthorizedView");
    });

    afterEach(function () {
        $.ajax = function (){ }; 
        Backbone.history.stop();
    });

    it('Calls correctly UnauthorizedView render() if navigation occurs at #/Login and username cookie is undefined', function () {
        // SETUP
        var app = new App({ el: document.body, template: appTemplate});
        app.render();
        Backbone.history.start({ pushState: false });
        var userRouter = new UserRouter({ appView: app });
        var spy = chai.spy.on(UnauthorizedView.prototype, "render");

        // EXERCISE
        Backbone.history.navigate("/Unauthorized", { trigger: true });

        // ASSERT
        expect(spy).to.have.been.called();
    });

    it('Calls correctly LoginView render() if navigation occurs at #/Login and username cookie is undefined', function () {
        // SETUP
        var app = new App({ el: document.body, template: appTemplate});
        app.render();
        Backbone.history.start({ pushState: false });
        var userRouter = new UserRouter({ appView: app });
        var spy = chai.spy.on(LoginView.prototype, "render");

        // EXERCISE
        Backbone.history.navigate("/Login", { trigger: true });

        // ASSERT
        expect(spy).to.have.been.called();
    });

    it('Calls correctly LoginView render() if navigation occurs at #/User and username cookie is undefined', function () {
        // SETUP
        var app = new App({ el: document.body, template: appTemplate});
        app.render();
        Backbone.history.start({ pushState: false });
        var userRouter = new UserRouter({ appView: app });
        var spy = chai.spy.on(LoginView.prototype, "render");

        // EXERCISE
        Backbone.history.navigate("/User", { trigger: true });

        // ASSERT
        expect(spy).to.have.been.called();
    });

    it('Calls correctly UserView render() if navigation occurs at #/User and username cookie is defined', function () {
        // SETUP
        Cookie.set("username", {username: "Test User"});
        var app = new App({ el: document.body, template: appTemplate});
        app.render();
        Backbone.history.start({ pushState: false });
        var userRouter = new UserRouter({ appView: app });
        var spy = chai.spy.on(UserView.prototype, "render");

        // EXERCISE
        Backbone.history.navigate("/User", { trigger: true });

        // ASSERT
        expect(spy).to.have.been.called();
    });

    it('Calls correctly UserView render() if navigation occurs at #/Login and username cookie is defined', function () {
        // SETUP
        Cookie.set("username", {username: "Test User"});
        var app = new App({ el: document.body, template: appTemplate});
        app.render();
        Backbone.history.start({ pushState: false });
        var userRouter = new UserRouter({ appView: app });
        var spy = chai.spy.on(UserView.prototype, "render");

        // EXERCISE
        Backbone.history.navigate("/Login", { trigger: true });

        // ASSERT
        expect(spy).to.have.been.called();
    });
});
