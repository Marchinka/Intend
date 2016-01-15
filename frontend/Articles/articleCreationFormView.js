var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var htmlTemplate = fs.readFileSync("frontend/Articles/articleForm.html", 'utf8');

var obj = {
    template: _.template(htmlTemplate),
    events: {
        'submit form': 'submit'
    },
    submit: function(e) {
        e.preventDefault();
        var title = $('input[name=title]').val();
        var subTitle = $('input[name=subTitle]').val();
        var content = $('textarea[name=content]').val();
        var articleFromForm = {
            title: title,
            subTitle: subTitle,
            content: content
        };
        alert("CREATION " + JSON.stringify(articleFromForm));
        Backbone.history.navigate("/Articles", {trigger: true});
    },
    render: function(){
        var self = this;

        if(self.model.get("_id") === undefined){
            throw new Error("_id is not defined");
        }
        if(self.model.get("title") === undefined){
            throw new Error("title is not defined");
        }
        if(self.model.get("subTitle") === undefined){
            throw new Error("subTitle is not defined");
        }
        if(self.model.get("content") === undefined){
            throw new Error("content is not defined");
        }

        var attributes = self.model.toJSON();
        self.$el.html(self.template(attributes));
    }
};

module.exports = Backbone.View.extend(obj);
