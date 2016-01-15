var $ = require('jquery');
var Backbone = require("backbone");
var ArticleModel = require("./articleModel");

module.exports = Backbone.Collection.extend({ 
	model: ArticleModel, 
	initialize: function() { 
		//this.on('invalid', this.notifyInvalidEvent, this); 
		//this.on('sync', this.notifyRequest, this); 
	},
	notifyInvalidEvent : function ()
	{
		//console.log("Model is not valid");
	},
	notifyRequest: function () {
		//alert("Request");	
	},
	url: "/articles"
});