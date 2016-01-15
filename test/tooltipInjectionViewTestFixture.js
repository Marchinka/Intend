var jsdom = require('mocha-jsdom');
var chai = require('chai'), spies = require('chai-spies');
var _ = require("underscore");
chai.use(spies);
var expect = chai.expect;
var $;
var TooltipView;
var TooltipsModel;
var Backbone;

describe('Tooltip View', function() {
    jsdom({ skipWindowCheck: true });

    before(function () {
        $ = require('jquery');
        Backbone = require("backbone");
        TooltipsModel = require("../frontend/Tooltips/tooltipModel.js");
        TooltipView = require("../frontend/Tooltips/tooltipInjectionView.js");
    });

    describe('Render()', function() {

        it('Renders template correctly with correct json as input', function () {
            // SETUP
            var tooltipJson = { id: 1234, tooltipKey: "KeyWord", description: "Tooltip" };
            var tooltipsModel = new TooltipsModel(tooltipJson);
            var tooltipView = new TooltipView({model: tooltipsModel, el: document.body});
            var initialParagraphContent = '<p class="tooltip-text">Bla bla bla KeyWord bla bla bla</p>';
            document.body.innerHTML = initialParagraphContent;

            // EXERCISE
            var SafeCode = function(){
                tooltipView.render();
            };

            // ASSERT
            expect(SafeCode).not.to.throw();
        });

        it('Throws exception with json without description as input', function () {
            // SETUP
            var tooltipJson = { id: 1234, tooltipKey: "KeyWord", E___description: "Tooltip" };
            var tooltipsModel = new TooltipsModel(tooltipJson);
            var tooltipView = new TooltipView({model: tooltipsModel, el: document.body});
            var initialParagraphContent = '<p class="tooltip-text">Bla bla bla KeyWord bla bla bla</p>';
            document.body.innerHTML = initialParagraphContent;
            var errorMessage = "description is not defined";

            // EXERCISE
            var ErrorThrower = function(){
                tooltipView.render();
            };

            // ASSERT
            expect(ErrorThrower).to.throw(errorMessage);
        });
        
        it('Does not change paragraph if does not have .tooltip-text class', function () {
            // SETUP
            var tooltipJson = { id: 12, tooltipKey: "KeyWord", description: "Tooltip" };
            var tooltipsModel = new TooltipsModel(tooltipJson);
            var initialParagraphContent = '<p>Bla bla bla KeyWord bla bla bla</p>';
            document.body.innerHTML = initialParagraphContent;
            var tooltipView = new TooltipView({model: tooltipsModel, el: document.body});

            // EXERCISE
            tooltipView.render();

            // ASSERT
            expect(document.body.innerHTML).to.be.equal(initialParagraphContent);
        });

        it('Does not change paragraph if does not contain any tooltipKey match', function () {
            // SETUP
            var tooltipJson = { id: 1234, tooltipKey: "KeyWord", description: "Tooltip" };
            var tooltipsModel = new TooltipsModel(tooltipJson);
            var initialParagraphContent = '<p class="tooltip-text">Bla bla bla bla bla bla</p>';
            document.body.innerHTML = initialParagraphContent;
            var tooltipView = new TooltipView({model: tooltipsModel, el: document.body});

            // EXERCISE
            tooltipView.render();

            // ASSERT
            expect(document.body.innerHTML).to.be.equal(initialParagraphContent);
        });

        it('Changes paragraph containing .tooltip-text class', function () {
            // SETUP
            var tooltipJson = { id: 1234, tooltipKey: "KeyWord", description: "Tooltip" };
            var tooltipsModel = new TooltipsModel(tooltipJson);
            var initialParagraphContent = '<p class="tooltip-text">Bla bla bla KeyWord bla bla bla</p>';
            document.body.innerHTML = initialParagraphContent;
            var tooltipView = new TooltipView({model: tooltipsModel, el: document.body});

            // EXERCISE
            tooltipView.render();

            // ASSERT
            expect(document.body.innerHTML).to.be.not.equal(initialParagraphContent);
        });

        it('Adds tooltip to paragraph containing .tooltip-text class and tooltipKey matching', function () {
            // SETUP
            var tooltipJson = { id: 1234, tooltipKey: "KeyWord", description: "Tooltip" };
            var tooltipsModel = new TooltipsModel(tooltipJson);
            var initialParagraphContent = '<p class="tooltip-text">Bla bla bla KeyWord bla bla bla</p>';
            var finalParagraphContainer = '<p class="tooltip-text">Bla bla bla <span data-tooltip="Tooltip">KeyWord</span> bla bla bla</p>';
            document.body.innerHTML = initialParagraphContent;
            var tooltipView = new TooltipView({model: tooltipsModel, el: document.body});

            // EXERCISE
            tooltipView.render();

            // ASSERT
            expect(document.body.innerHTML).to.be.equal(finalParagraphContainer);
        });

        it('Adds tooltip to paragraph containing .tooltip-text class and case insensitive match', function () {
            // SETUP
            var tooltipJson = { id: 1234, tooltipKey: "KeyWord", description: "Tooltip" };
            var tooltipsModel = new TooltipsModel(tooltipJson);
            var initialParagraphContent = '<p class="tooltip-text">Bla bla bla tooltipKeyword bla bla bla</p>';
            var finalParagraphContainer = '<p class="tooltip-text">Bla bla bla tooltip<span data-tooltip="Tooltip">Keyword</span> bla bla bla</p>';
            document.body.innerHTML = initialParagraphContent;
            var tooltipView = new TooltipView({model: tooltipsModel, el: document.body});

            // EXERCISE
            tooltipView.render();

            // ASSERT
            expect(document.body.innerHTML).to.be.equal(finalParagraphContainer);
        });

        it('Adds two tooltip to paragraph with two matching tooltipKey words', function () {
            // SETUP
            var tooltipJson = { id: 1234, tooltipKey: "KeyWord", description: "Tooltip" };
            var tooltipsModel = new TooltipsModel(tooltipJson);
            var initialParagraphContent = '<p class="tooltip-text">Bla bla bla KeyWord bla bla KeyWord bla</p>';
            var finalParagraphContainer = '<p class="tooltip-text">Bla bla bla <span data-tooltip="Tooltip">KeyWord</span> bla bla <span data-tooltip="Tooltip">KeyWord</span> bla</p>';
            document.body.innerHTML = initialParagraphContent;
            var tooltipView = new TooltipView({model: tooltipsModel, el: document.body});

            // EXERCISE
            tooltipView.render();

            // ASSERT
            expect(document.body.innerHTML).to.be.equal(finalParagraphContainer);
        });

        it('Adds tooltip to paragraph with matching phrase', function () {
            // SETUP
            var tooltipJson = { id: 1234, tooltipKey: "Key Phrase", description: "Tooltip" };
            var tooltipsModel = new TooltipsModel(tooltipJson);
            var initialParagraphContent = '<p class="tooltip-text">Bla bla bla Key Phrase bla bla bla</p>';
            var finalParagraphContainer = '<p class="tooltip-text">Bla bla bla <span data-tooltip="Tooltip">Key Phrase</span> bla bla bla</p>';
            document.body.innerHTML = initialParagraphContent;
            var tooltipView = new TooltipView({model: tooltipsModel, el: document.body});

            // EXERCISE
            tooltipView.render();

            // ASSERT
            expect(document.body.innerHTML).to.be.equal(finalParagraphContainer);
        });

/*        it('Does not add tooltip to paragraph containing a word not matching full tooltipKey in its ending', function () {
            // SETUP
            var tooltipJson = { tooltipKey: "KeyWord", description: "Tooltip" };
            var tooltipsModel = new TooltipsModel(tooltipJson);
            var initialParagraphContent = '<p class="tooltip-text">Bla bla bla KeyWord__DDD bla bla bla</p>';
            document.body.innerHTML = initialParagraphContent;
            var tooltipView = new TooltipView({model: tooltipsModel, el: document.body});

            // EXERCISE
            tooltipView.render();

            // ASSERT
            expect(document.body.innerHTML).to.be.equal(initialParagraphContent);
        });

        it('Does not add tooltip to paragraph containing a word not matching full tooltipKey in its beginning', function () {
            // SETUP
            var tooltipJson = { tooltipKey: "KeyWord", description: "Tooltip" };
            var tooltipsModel = new TooltipsModel(tooltipJson);
            var initialParagraphContent = '<p class="tooltip-text">Bla bla bla K__KeyWord bla bla bla</p>';
            document.body.innerHTML = initialParagraphContent;
            var tooltipView = new TooltipView({model: tooltipsModel, el: document.body});

            // EXERCISE
            tooltipView.render();

            // ASSERT
            expect(document.body.innerHTML).to.be.equal(initialParagraphContent);
        });*/
    });
});