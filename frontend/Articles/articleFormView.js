var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var htmlTemplate = fs.readFileSync("frontend/Articles/articleForm.html", 'utf8');
var errorBinder = require("../errorBinder.js");
var ArticleModel = require("./articleModel.js");

var obj = {
    template: _.template(htmlTemplate),
    events: {
        'submit form': 'submit',
        'keyup input': 'validateForm',
        'keyup textarea': 'validateForm'
    },
    initialize: function (attrs) {
        if (!attrs.model) {
            this.model = new ArticleModel();
        }
    },
    validateForm: function (e) {
        var title = $('input[name=title]').val();
        var subTitle = $('input[name=subTitle]').val();
        var content = $('textarea[name=content]').val();
        this.model.set({ title: title });
        this.model.set({ subTitle: subTitle });
        this.model.set({ content: content });
        var valid = this.model.isValid();
        if(!valid) {
            errorBinder.bindErrors(this.model.validationError);
            return false;
        }
        errorBinder.removeAllErrors();
        return true;
    },
    submit: function(e) {
        e.preventDefault();
        var valid = this.validateForm();
        if (valid) {
            this.model.save(null, {
                validate: false,
                success: function() {
                    Backbone.history.navigate("/Articles", { trigger: true });
                },
                error : function(error, response) {
                    if (response.status === 500) {
                        var errors = JSON.parse(response.responseText);
                        errorBinder.bindErrors(errors);
                    }
                }
            });
        }
    },
    renderHtml: function() {
        var self = this;
        var attributes = self.model.toJSON();
        self.$el.html(self.template(attributes));
    },
    render: function (attrs) {
        var self = this;
        var id = attrs[0];
        if (id) {
            self.model.set({ id: id });
            var options = { reset: true, validate: true, success: function () { self.renderHtml(); } };
            self.model.fetch(options);
        }
        else {
            self.model.set({ id: null, title: null, subTitle: null, content: null});
            self.renderHtml();    
        }
    }
};

module.exports = Backbone.View.extend(obj);