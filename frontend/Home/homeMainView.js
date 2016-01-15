window.$ = window.jQuery = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");

var htmlTemplate = fs.readFileSync("frontend/Home/home.html", 'utf8');

var obj = {
    template: _.template(htmlTemplate),
    renderHtml: function() {
        this.$el.html(this.template());
    },
    render: function () {
    	this.renderHtml();
    }
};

module.exports = Backbone.View.extend(obj);