var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var htmlTemplate = fs.readFileSync("frontend/Tooltips/tooltipListItem.html", 'utf8');

var TooltipListItemView = {
    events: {
        'click #deleteTooltipButton': 'deleteTooltip',
        'keyup input': 'validateForm',
        'keyup textarea': 'validateForm'
    },
    deleteTooltip: function(e) {
        e.stopPropagation();
        this.model.destroy({
            success: function () {
                Backbone.history.navigate("/Tooltips", { trigger: true });
            }
        });
    },
    template: _.template(htmlTemplate),
    renderHtml: function() {
        var self = this;
        var attributes = self.model.toJSON();
        self.$el.html(self.template(attributes));
        return self.$el.html();
    },
    render: function () {
        this.renderHtml();
    }
};

module.exports = Backbone.View.extend(TooltipListItemView);
