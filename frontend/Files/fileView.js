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
    events: {
        // "click #download-button": function(e) {
        //     var self = this;
        //     e.preventDefault();
        //     self.model.fetch(null, {
        //         success: function () {
        //             var file = new File([new Blob()], "image.png", {type:"image/png"});
        //         }
        //     });
        // },
        "click #delete-button": function(e) {
            e.preventDefault();
            alert("Ancora non funziona");
        },
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
