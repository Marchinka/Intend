var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var htmlTemplate = fs.readFileSync("frontend/Articles/articleCollectionHeader.html", 'utf8');
var ArticleModel = require("./articleModel.js");
var errorBinder = require("../errorBinder.js");

var obj = {
    template: _.template(htmlTemplate),
    initialize: function () {
        this.model = new ArticleModel();
    },
    events: {
        'submit form': 'submit',
        'keyup input': 'validateForm'
    },
    submit: function(e) {
        e.preventDefault();
        var valid = this.validateForm();
        if (valid) {
            this.model.save(null, {
                validate: false,
                success: function(response) {
                    $("#articleCreationModal").modal('hide');
                    $('.modal-backdrop').remove();
                    var insertId = response.attributes.insertId;
                    Backbone.history.navigate("/Articles/Update/" + insertId, { trigger: true });
                },
                error : function(error, response) {
                    $("#articleCreationModal").modal('hide');
                    $('.modal-backdrop').remove();
                    if (response.status === 500) {
                        var errors = JSON.parse(response.responseText);
                        errorBinder.bindErrors(errors);
                    }
                }
            });
        }
    },
    validateForm: function (e) {
        var title = $('input[name=title]').val();
        this.model.set({ title: title });
        var valid = this.model.isValid();
        if(!valid) {
            errorBinder.bindErrors(this.model.validationError);
            return false;
        }
        errorBinder.removeAllErrors();
        return true;
    },
    renderHtml: function() {
        var self = this;
        self.$el.html(self.template());
    },
    render: function (attrs) {
        var self = this;
        self.renderHtml();
    }
};

module.exports = Backbone.View.extend(obj);
