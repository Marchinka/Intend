var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var htmlTemplate = fs.readFileSync("frontend/Files/fileUpload.html", 'utf8');
var FileModel = require("./fileModel.js");

var obj = {
	initialize: function (attrs) {
    	this.articleModel = attrs.articleModel;
    	this.fileModel = attrs.fileModel;
    	this.fileCollection = attrs.fileCollection;
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
	        reader.readAsBinaryString(file);
	        //reader.readAsArrayBuffer(file);
	        reader.onload = function(e) {
	        	var articleId = self.articleModel.id;
    			var fileName = $('#file-input').val();
    			var shortFileName = fileName.replace(/^.*[\\\/]/, '');
    			var bytes = e.target.result;
    			self.fileModel.set({ fileName: shortFileName });
				self.fileModel.set({ articleId: articleId });
				self.fileModel.set({ bytes: bytes });
	            self.fileModel.save(null, {
                	success: function(response) {
                		self.fileModel.set({ id: response.insertId });
                		self.fileCollection.add(self.fileModel);
                		self.fileModel = new FileModel();
                	},
                	error : function(error, response) {
                    	alert("errore");
                	}
            	});
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

