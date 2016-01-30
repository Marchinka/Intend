var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var htmlTemplate = fs.readFileSync("frontend/Articles/articleForm.html", 'utf8');
var errorBinder = require("../errorBinder.js");
var ArticleModel = require("./articleModel.js");
var FileModel = require("./../Files/fileModel.js");
var FileCollection = require("./../Files/fileCollection.js");
var FileUploadView = require("./../Files/fileUploadView.js");
var FileCollectionView = require("./../Files/fileCollectionView.js");

var obj = {
    template: _.template(htmlTemplate),
    fileCollectionView: {},
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
        
        // Render main view
        var attributes = self.model.toJSON();
        self.$el.html(self.template(attributes));

        // Render file upload content
        self.fileUploadView = new FileUploadView({ 
            el: $("#file-upload"), 
            articleModel: this.model, 
            fileModel: new FileModel(), 
            fileCollection: this.model.Files });
        self.fileUploadView.renderHtml();

        // Render file list content
        self.fileCollectionView = new FileCollectionView({ 
            el: $("#file-list"), 
            collection: this.model.Files });
        self.fileCollectionView.renderHtml();
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