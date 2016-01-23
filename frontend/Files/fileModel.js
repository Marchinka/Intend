var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");

var obj = {
	urlRoot: "/files"
};

module.exports = Backbone.Model.extend(obj);