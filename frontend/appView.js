var $ = require('jquery');
window.$ = window.jQuery = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var UserModel = require("./User/userModel");
var UserTabView = require("./User/userTabView");
var LoaderView = require("./Loader/loaderView");
var config = require("./config");

var obj = {
    userTabView: {},
    loaderView: {},
    loaderTimeoutId: 0,
    maxLoaderTimeoutId: 0,
    initialize: function (attrs) {
        if(!attrs.template) {
            throw new Error("template is not defined");
        }
        if(!attrs.mainRouter) {
            throw new Error("template is not defined");
        }
        this.template = _.template(attrs.template);
        this.mainRouter = attrs.mainRouter;
        this.userModel = new UserModel();
    },
    events: {
        "click a[data-internal]": function(e){
            e.preventDefault();
            Backbone.history.navigate(e.target.pathname, { trigger : true });
        }
    },
    disposeOfMainCurrentView: function () {
        var self = this;
        if (self.currentMainView === undefined) {
            return;                
        }
        self.currentMainView.off();
        self.currentMainView.$el.empty();
        self.currentMainView.$el.unbind();
        if (self.currentMainView.model !== undefined) {
            self.currentMainView.model.off(null, null, self.currentMainView);
        }
    },
    initializeUserView: function () {
        var self = this;
        self.userModel.getLogin(function () {
            var userTabElement = self.$el.find('#userNavtab');
            self.userTabView = new UserTabView({
                el: userTabElement,
                model: self.userModel
            });
            self.userTabView.render();
            return self;
        });
    },
    initializeLoaderView: function () {
        var loaderElement = this.$el.find('#loader');
        this.loaderView = new LoaderView({
            el: loaderElement
        });
        return this;
    },
    unRenderLoaderView: function () {
        var self = this;
        clearTimeout(self.loaderTimeoutId);
        clearTimeout(self.maxLoaderTimeoutId);
        self.loaderView.unRender();
    },
    renderLoaderView: function () {
        var self = this;
        self.loaderTimeoutId = setTimeout(function () {
                self.loaderView.render();    
        }, config.loaderTimeoutMilliseconds);

        self.maxLoaderTimeoutId = setTimeout(function () {
            self.unRenderLoaderView();
            alert("Problema di connessione");
        }, config.loaderMaxTimeoutMilliseconds);
    },
    activateGlobalEvents: function () {
        var self = this;
        $(document).ajaxStart(function() {
            self.renderLoaderView();
        });
        $(document).ajaxComplete(function() {
            self.userModel.fetch({
                success: function () { 
                    if (self.userModel.get("hasBotPermissions")) {
                        $("body").removeClass('bot-invisible');
                    } else {
                        $("body").addClass('bot-invisible');
                    }
                },
                error: function () { 
                    $("body").addClass('bot-invisible');
                }});
            self.unRenderLoaderView();
        });
        $(document).ajaxError(function(event, request, settings) {
            if (request.status === 403) {
                Backbone.history.navigate("/Unauthorized", { trigger: true });
            }
            self.unRenderLoaderView();
        });
    },
    addRoute: function (route) {
        var self = this;
        this.mainRouter.route(route.routeUrl, route.routeUrl, function () {
            var args = Array.prototype.slice.call(arguments);
            self.disposeOfMainCurrentView();
            self.currentMainView = new route.view({ el: $("#app-content"), userModel: self.userModel });
            self.currentMainView.render(args);
        });
        return this;
    },
    addRoutes : function(routes) {
        for (var i in routes) {
            this.addRoute(routes[i]);
        }
        return this;
    },
    startApp: function () {
        Backbone.history.start({pushState: false});
        return this;
    },
    render: function() {
        var self = this;
        self.$el.html(this.template());
        self.initializeLoaderView();
        self.initializeUserView();
        self.activateGlobalEvents();
        return self;
    }
};

module.exports = Backbone.View.extend(obj);
