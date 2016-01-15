var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var ArticleValidator = require("../../database/articleValidator");
var articleValidator = new ArticleValidator();

var obj = {
	initialize: function() { 
		//this.on('invalid', this.notifyInvalidEvent, this); 
		//this.on('sync', this.notifyRequest, this); 
	},
	notifyInvalidEvent: function ()
	{
		//console.log("Model is not valid");
	},
	notifyRequest: function () {
		//alert("Request");	
	},
	validate: articleValidator.validateClientSide,
	urlRoot: "/articles"
};

module.exports = Backbone.Model.extend(obj);