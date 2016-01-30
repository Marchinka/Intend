var LoginView = require("./loginView.jsx");
var UserView = require("./userView.js");
var UnauthorizedView = require("./unauthorizedView.js");

module.exports = [
	{ routeUrl: "Login", view: LoginView },
	{ routeUrl: "User", view: UserView },
	{ routeUrl: "Unauthorized", view: UnauthorizedView },
];