var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var TooltipCollection = require("../Tooltips/tooltipCollection");
var TooltipCollectionView = require("../Tooltips/tooltipCollectionInjectionView");
var htmlTemplate = fs.readFileSync("frontend/Articles/articleDetail.html", 'utf8');

var obj = {
    template: _.template(htmlTemplate),
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
    render: function(){
        var self = this;
        var attributes = self.model.toJSON();
        attributes.content = attributes.content.replace(/\n/g, "<br />");
        self.$el.html(self.template(attributes));
        self.loadTooltips();
        self.addTooltips();
    }
};

module.exports = Backbone.View.extend(obj);