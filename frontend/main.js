var respond = require("respond");
var html5shiv = require("html5shiv");
window.$ = window.jQuery = require('jquery');
var bootstrap = require("bootstrap");
var _ = require("underscore");
var Backbone = require("backbone");
var Cookie = require("js-cookie");
var AppView = require("./appView.js");
var MainRouter = require("./mainRouter.js");
var fs = require("fs");

var htmlTemplate = fs.readFileSync("frontend/app.html", 'utf8');

var appView = new AppView({ 
	el: document.body, 
	template: htmlTemplate
});
var mainRouter = new MainRouter({ appView : appView });
mainRouter.startApp();



