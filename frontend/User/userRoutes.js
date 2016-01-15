var LoginView = require("./loginView.js");
var LogoutView = require("./userView.js");
var UnauthorizedView = require("./unauthorizedView.js");

module.exports = [
	{ routeUrl: "Login", view: LoginView },
	{ routeUrl: "Logout", view: LogoutView },
	{ routeUrl: "Unauthorized", view: UnauthorizedView },
];