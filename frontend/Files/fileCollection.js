var $ = require('jquery');
var Backbone = require("backbone");
var FileModel = require("./fileModel.js");

module.exports = Backbone.Collection.extend({ 
	model: FileModel, 
	url: "/files"
});