window.$ = window.jQuery = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var htmlTemplate = fs.readFileSync("frontend/User/unauthorized.html", 'utf8');

var obj = {
    template: _.template(htmlTemplate),
    render: function(){
        this.$el.html(this.template());
    }
};

module.exports = Backbone.View.extend(obj);