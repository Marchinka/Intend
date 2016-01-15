var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var TooltipValidator = require("../../database/tooltipValidator");
var tooltipValidator = new TooltipValidator();

module.exports = Backbone.Model.extend({
	validate: tooltipValidator.validateClientSide,
	urlRoot: "/tooltips"
});