var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var htmlTemplate = fs.readFileSync("./frontend/User/userTab.html", 'utf8');
var LoginView = require("./loginView");
var UserModel = require("./userModel");

var obj = {
    currentView : {},
    template: _.template(htmlTemplate),
    initialize: function () {
        this.model.on("destroy", this.render, this);
        this.model.on("change", this.render, this);
    },
    render: function(){
        var self = this;
        var attributes = self.model.toJSON();
        self.$el.html(self.template(attributes));
    }
};

module.exports = Backbone.View.extend(obj);
