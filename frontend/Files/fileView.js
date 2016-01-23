var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var htmlTemplate = fs.readFileSync("./frontend/Files/file.html", 'utf8');
var FileModel = require("./fileModel.js");

var obj = {
    template: _.template(htmlTemplate),
    initialize: function (attrs) {
        if (!attrs.model) {
            this.model = new FileModel();
        }
    },
    renderHtml: function(){
        var self = this;
        var attributes = self.model.toJSON();
        self.$el.html(self.template(attributes));
    },
    render: function (attrs) {
        this.renderHtml();
    }
};

module.exports = Backbone.View.extend(obj);
