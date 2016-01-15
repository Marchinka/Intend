window.$ = window.jQuery = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var UserModel = require("./userModel.js");
var htmlTemplate = fs.readFileSync("frontend/User/logout.html", 'utf8');

var obj = {
	events: {
        'click #logoutButton': 'logout'
    },
    initialize: function (attrs) {
        if (!attrs.model) {
            this.model = new UserModel();
        }
    },
    logout: function(e) {
        var self = this;
        e.preventDefault();
        this.model.logout(function(response) {
            self.model.clear();
            Backbone.history.navigate("/Login", { trigger: true });
        });
    },
    template: _.template(htmlTemplate),
    render: function(){
        var attributes = this.model.toJSON();
        this.$el.html(this.template(attributes));
    }
};

module.exports = Backbone.View.extend(obj);