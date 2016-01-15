var jsdom = require('mocha-jsdom');
var chai = require('chai'), spies = require('chai-spies');
var _ = require("underscore");
chai.use(spies);
var expect = chai.expect;
var $;
var ArticlesListItemView;
var ArticleModel;
var Backbone;

describe('Tooltip Form View', function() {
    jsdom({ skipWindowCheck: true });

    before(function () {
        $ = require('jquery');
        Backbone = require("backbone");
        TooltipModel = require("../frontend/Tooltips/tooltipModel.js");
        TooltipFormView = require("../frontend/Tooltips/tooltipFormView.js");
    });

    describe('Render()', function() {

        it('Throws exception with json without tooltipKey as input', function () {
            // SETUP
            var tooltip = { id: 1, E___tooltipKey : 'Key', description: 'description' };
            var tooltipModel = new TooltipModel(tooltip);
            var tooltipFormView = new TooltipFormView({model: tooltipModel, el: document.body});
            var errorMessage = "tooltipKey is not defined";

            // EXERCISE
            var ErrorThrower = function (){
                tooltipFormView.render();
            };

            // ASSERT
            expect(ErrorThrower).to.throw(errorMessage);
        });

        it('Throws exception with json without description as input', function () {
            // SETUP
            var tooltip = { id: 1, tooltipKey : 'Key', E___description: 'description' };
            var tooltipModel = new TooltipModel(tooltip);
            var tooltipFormView = new TooltipFormView({model: tooltipModel, el: document.body});
            var errorMessage = "description is not defined";

            // EXERCISE
            var ErrorThrower = function (){
                tooltipFormView.render();
            };

            // ASSERT
            expect(ErrorThrower).to.throw(errorMessage);
        });

        it('Renders tooltipKey input correcly', function () {
            // SETUP
            var tooltip = { id: 1, tooltipKey : 'Key', description: 'description' };
            var tooltipModel = new TooltipModel(tooltip);
            var tooltipFormView = new TooltipFormView({model: tooltipModel, el: document.body});

            // EXERCISE
            tooltipFormView.render();

            // ASSERT
            var content = document.getElementsByName("tooltipKey")[0].value;
            expect(content).to.be.equal(tooltip.tooltipKey);
        });

        it('Renders description textarea correcly', function () {
            // SETUP
            var tooltip = { id: 1, tooltipKey : 'Key', description: 'description' };
            var tooltipModel = new TooltipModel(tooltip);
            var tooltipFormView = new TooltipFormView({model: tooltipModel, el: document.body});

            // EXERCISE
            tooltipFormView.render();

            // ASSERT
            var content = document.getElementsByName("description")[0].value;
            expect(content).to.be.equal(tooltip.description);
        });
    });
});