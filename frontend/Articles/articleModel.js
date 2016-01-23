var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var FileCollection = require("./../Files/fileCollection.js");
var ArticleValidator = require("../../database/articleValidator");
var articleValidator = new ArticleValidator();

var obj = {
	initialize: function() { 
		this.Files = new FileCollection(); 
		this.bind('change', this.setFiles);
	},
    setFiles: function() {
      var files = this.get("files");
      this.Files.set(files);
    },
	validate: articleValidator.validateClientSide,
	urlRoot: "/articles"
};

module.exports = Backbone.Model.extend(obj);


