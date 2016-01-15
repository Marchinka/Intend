var $ = require('jquery');
var Backbone = require("backbone");
var TooltipsModel = require("./tooltipModel");

module.exports = Backbone.Collection.extend({ 
	model: TooltipsModel,
	url: "/tooltips"
});
