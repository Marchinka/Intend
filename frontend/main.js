var respond = require("respond");
var html5shiv = require("html5shiv");
window.$ = window.jQuery = require('jquery');
var bootstrap = require("bootstrap");
var _ = require("underscore");
var Backbone = require("backbone");
var AppView = require("./appView.js");
var MainRouter = require("./mainRouter.js");
var homeRoutes = require("./Home/homeRoutes.js");
var exerciseRoutes = require("./Exercises/exerciseRoutes.js");
var articleRoutes = require("./Articles/articleRoutes.js");
var userRoutes = require("./User/userRoutes.js");
var backOfficeRoutes = require("./BackOffice/backOfficeRoutes.js");
var tooltipRoutes = require("./Tooltips/tooltipRoutes.js");
var fs = require("fs");

var htmlTemplate = fs.readFileSync("frontend/app.html", 'utf8');

var mainRouter = new MainRouter({});
var appView = new AppView({ 
	el: document.body, 
	template: htmlTemplate,
	mainRouter: mainRouter
});
appView
	.render()
	.addRoutes(homeRoutes)
	.addRoutes(articleRoutes)
	.addRoutes(exerciseRoutes)
	.addRoutes(backOfficeRoutes)
	.addRoutes(userRoutes)
	.addRoutes(tooltipRoutes)
	.startApp();