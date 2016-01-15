var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var htmlTemplate = fs.readFileSync("frontend/Articles/articleListItem.html", 'utf8');

var obj = {
    template: _.template(htmlTemplate),
    render: function(){
        var self = this;
        var attributes = self.model.toJSON();
        self.$el.html(self.template(attributes));
        return self.$el.html();
    }
};

module.exports = Backbone.View.extend(obj);
