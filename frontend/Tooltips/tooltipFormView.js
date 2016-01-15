var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var htmlTemplate = fs.readFileSync("frontend/Tooltips/tooltipForm.html", 'utf8');
var errorBinder = require("../errorBinder.js");
var TooltipModel = require("./tooltipModel");

var obj = {
    template: _.template(htmlTemplate),
    initialize: function (attrs) {
        if (!attrs.model) {
            this.model = new TooltipModel();
        }
    },
    events: {
        'submit form': 'submit',
        'keyup input': 'validateForm',
        'keyup textarea': 'validateForm',
    },
    validateForm: function (e) {
        var tooltipKey = $('input[name=tooltipKey]').val();
        var description = $('textarea[name=description]').val();
        this.model.set({ tooltipKey: tooltipKey });
        this.model.set({ description: description });
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
                   Backbone.history.navigate("/Tooltips", { trigger: true });
                },
                error : function(error, response) {
                    var errors = JSON.parse(response.responseText);
                    errorBinder.bindErrors(errors);
                }
            });
        }
    },
    renderHtml: function() {
        var self = this;
        var attributes = self.model.toJSON();
        self.$el.html(self.template(attributes));
    },
    render: function (params) {
        var self = this;
        var id = params[0];
        if (id) {
            var fetchCallback = function () {
                self.renderHtml();
            };
            self.model.set({ id: id });
            var options = { reset: true, validate: true, success: fetchCallback };
            self.model.fetch(options);
        } else {
            self.model.set({ id: null, tooltipKey: null, description: null });
            self.renderHtml();
        }
    }
};

module.exports = Backbone.View.extend(obj);