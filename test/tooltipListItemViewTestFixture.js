var jsdom = require('mocha-jsdom');
var chai = require('chai'), spies = require('chai-spies');
var _ = require("underscore");
chai.use(spies);
var expect = chai.expect;
var $;
var ArticlesListItemView;
var ArticleModel;
var Backbone;

describe('Tooltip List Item View', function() {
    jsdom({ skipWindowCheck: true });

    before(function () {
        $ = require('jquery');
        Backbone = require("backbone");
        TooltipModel = require("../frontend/Tooltips/tooltipModel.js");
        TooltipListItemView = require("../frontend/Tooltips/tooltipListItemView.js");
    });

    describe('Render()', function() {

        it('Throws exception with json without id as input', function () {
            // SETUP
            var tooltip = { E__id: 1, tooltipKey : 'Key', description: 'Description' };
            var tooltipModel = new TooltipModel(tooltip);
            var tooltipListItemView = new TooltipListItemView({ 
                clickCallback: function () { },
                model: tooltipModel, 
                el: document.body });
            var errorMessage = "id is not defined";

            // EXERCISE
            var ErrorThrower = function (){
                tooltipListItemView.renderHtml();
            };

            // ASSERT
            expect(ErrorThrower).to.throw(errorMessage);
        });

        it('Throws exception with json without tooltipKey as input', function () {
            // SETUP
            var tooltip = { id: 1, E___tooltipKey : 'Key', description: 'Description' };
            var tooltipModel = new TooltipModel(tooltip);
            var tooltipListItemView = new TooltipListItemView({ 
                clickCallback: function () { },
                model: tooltipModel, 
                el: document.body });
            var errorMessage = "tooltipKey is not defined";

            // EXERCISE
            var ErrorThrower = function (){
                tooltipListItemView.renderHtml();
            };

            // ASSERT
            expect(ErrorThrower).to.throw(errorMessage);
        });

        it('Throws exception with json without description as input', function () {
            // SETUP
            var tooltip = { id: 1, tooltipKey : 'Key', E____description: 'Description' };
            var tooltipModel = new TooltipModel(tooltip);
            var tooltipListItemView = new TooltipListItemView({ 
                clickCallback: function () { },
                model: tooltipModel, 
                el: document.body });
            var errorMessage = "description is not defined";

            // EXERCISE
            var ErrorThrower = function (){
                tooltipListItemView.renderHtml();
            };

            // ASSERT
            expect(ErrorThrower).to.throw(errorMessage);
        });

        it('Renders template correctly with correct json as input', function () {
            // SETUP
            var tooltip = { id: 1, tooltipKey : 'Key', description: 'Description' };
            var tooltipModel = new TooltipModel(tooltip);
            var tooltipListItemView = new TooltipListItemView({ 
                clickCallback: function () { },
                model: tooltipModel, 
                el: document.body });
            var errorMessage = "description is not defined";

            // EXERCISE
            var ErrorThrower = function (){
                tooltipListItemView.renderHtml();
            };

            // ASSERT
            expect(ErrorThrower).not.to.throw(errorMessage);
        });

        it('Renders element correcly', function () {
            // SETUP
            var tooltip = { id: 1, tooltipKey : 'Key', description: 'Description' };
            var tooltipModel = new TooltipModel(tooltip);
            var tooltipListItemView = new TooltipListItemView({ 
                clickCallback: function () { },
                model: tooltipModel, 
                el: document.body });

            // EXERCISE
            tooltipListItemView.renderHtml();

            // ASSERT
            var title = document.getElementById("tooltip" + tooltip.id).innerHTML;
            expect(title).not.to.beundefined;
        });

        it('Renders tooltipKey correcly', function () {
            // SETUP
            var tooltip = { id: 1, tooltipKey : 'Key', description: 'Description' };
            var tooltipModel = new TooltipModel(tooltip);
            var tooltipListItemView = new TooltipListItemView({ 
                clickCallback: function () { },
                model: tooltipModel, 
                el: document.body });

            // EXERCISE
            tooltipListItemView.renderHtml();

            // ASSERT
            var title = document.getElementById("tooltipKey").innerHTML;
            expect(title).to.be.equal(tooltip.tooltipKey);
        });

        it('Renders description correcly', function () {
            // SETUP
            var tooltip = { id: 1, tooltipKey : 'Key', description: 'Description' };
            var tooltipModel = new TooltipModel(tooltip);
            var tooltipListItemView = new TooltipListItemView({ 
                clickCallback: function () { },
                model: tooltipModel, 
                el: document.body });

            // EXERCISE
            tooltipListItemView.renderHtml();

            // ASSERT
            var title = document.getElementById("tooltipDescription").innerHTML;
            expect(title).to.be.equal(tooltip.description);
        });

        it('On tooltip click tooltipClick() is called', function () {
            // SETUP
            var tooltip = { id: 1, tooltipKey : 'Key', description: 'Description' };
            var tooltipModel = new TooltipModel(tooltip);
            var tooltipListItemView = new TooltipListItemView({ 
                clickCallback: function () { },
                model: tooltipModel, 
                el: document.body });
            tooltipListItemView.renderHtml();
            var errorMessage = "clickCallback is not defined";
            var spy = chai.spy.on(tooltipListItemView, "tooltipClick");

            // EXERCISE
            $("#tooltip1").click(function(event) {
                // ASSERT
                expect(spy).to.have.been.called();
            });
        });
    });
});