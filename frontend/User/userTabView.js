var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var htmlTemplate = fs.readFileSync("./frontend/User/userTab.html", 'utf8');
var UserModel = require("./userModel");

var obj = {
    currentView : {},
    template: _.template(htmlTemplate),
    initialize: function () {
        this.model.on("destroy", this.render, this);
        this.model.on("change", this.render, this);
    },
    renderHtml: function(){
        var self = this;
        var attributes = self.model.toJSON();
        var html = self.template(attributes);
        self.$el.html(html);
    },
    render: function () {
        this.renderHtml();
    }
};

module.exports = Backbone.View.extend(obj);
