var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var htmlTemplate = fs.readFileSync("frontend/Files/fileUpload.html", 'utf8');

var obj = {
	initialize: function (attrs) {
    	this.articleModel = attrs.articleModel;
    	this.fileModel = attrs.fileModel;
    },
	events: {
        'submit form': 'submit'
    },
    submit: function (e) {
    	var self = this;
    	e.stopPropagation();
    	e.preventDefault();
		var file = document.getElementById('file-input').files[0];
	    if (file) {
	        var reader = new FileReader();
	        //reader.readAsText(file);
	        //reader.readAsBinaryString(file);
	        reader.readAsArrayBuffer(file);
	        reader.onload = function(e) {
	        	var articleId = self.articleModel.id;
    			var fileName = $('#file-input').val();
    			var bytes = e.target.result;
    			self.fileModel.set({ fileName: fileName });
				self.fileModel.set({ articleId: articleId });
				self.fileModel.set({ bytes: bytes });
	            alert(e.target.result);
	        };
	    }
    },
    template: _.template(htmlTemplate),
    renderHtml: function(){
        var self = this;
        self.$el.html(self.template());
        return self.$el.html();
    }
};

module.exports = Backbone.View.extend(obj);
