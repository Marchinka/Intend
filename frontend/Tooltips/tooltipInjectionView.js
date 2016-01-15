var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var htmlTemplate = fs.readFileSync("frontend/Tooltips/tooltip.html", 'utf8');

var obj = {
    template: _.template(htmlTemplate),
    render: function(){
        var self = this;

        self.$el.find(".tooltip-text").each(function(index, element){
            var paragraphContent = $(element).html();
            var pattern = self.model.get("tooltipKey");
            var regularExpression = new RegExp(pattern, "gi");
            var matches = paragraphContent.match(regularExpression);

            if(matches === null){
                return;
            }

            var distinctMatches = matches.filter(function(value, index, matches){
                return $.inArray(value, matches) === 0;
            });

            for (var i = 0; i < distinctMatches.length; i++) {
                var match = matches[i];
                var attributes = self.model.toJSON();
                attributes.tooltipKey = match;
                var tooltipSpan = self.template(attributes);
                var regex = new RegExp(match, "g");
                var paragraphWithTooltips = paragraphContent.replace(regex, tooltipSpan);
                $(element).html(paragraphWithTooltips);
            }
        });
    }
};

module.exports = Backbone.View.extend(obj);