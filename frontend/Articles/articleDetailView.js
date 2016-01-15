var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var TooltipCollection = require("../Tooltips/tooltipCollection");
var TooltipCollectionView = require("../Tooltips/tooltipCollectionInjectionView");
var htmlTemplate = fs.readFileSync("frontend/Articles/articleDetail.html", 'utf8');
var ArticleModel = require("./articleModel.js");

var obj = {
    template: _.template(htmlTemplate),
    initialize: function (attrs) {
        if (!attrs.model) {
            this.model = new ArticleModel();
        }
    },
    events: {
        "click #deleteArticleButton": function(e) {
            e.preventDefault();
            var modelId = this.model.get("_id");
            var modalIdSelector = "#" + modelId + "Modal";
            $(modalIdSelector).modal('hide');
            $('.modal-backdrop').remove();
            this.model.destroy({
                success: function () {
                    Backbone.history.navigate("/Articles", { trigger: true });
                }
            });
        },
    },
    loadTooltips: function(){
        var self = this;
        var tooltipCollection = new TooltipCollection();
        self.tooltipCollectionView = new TooltipCollectionView({ 
            el: self.$el, 
            collection: tooltipCollection 
        });
        var options = { 
            reset: true,
            validate: true,
            success: function () {
                self.tooltipCollectionView.render();
            } 
        };
        self.tooltipCollectionView.collection.fetch(options);
    },
    addTooltips: function(){
        this.tooltipCollectionView.render();
    },
    renderHtml: function(){
        var self = this;
        var attributes = self.model.toJSON();
        attributes.content = attributes.content.replace(/\n/g, "<br />");
        self.$el.html(self.template(attributes));
        self.loadTooltips();
        self.addTooltips();
    },
    render: function (attrs) {
        var id = attrs[0];
        var self = this;
        var fetchCallback = function () {
            self.renderHtml();
        };
        var options = { reset: true, validate: true, success: fetchCallback };
        self.model.set({ id: id });
        self.model.fetch(options);
    }
};

module.exports = Backbone.View.extend(obj);
