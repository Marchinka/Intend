var jsdom = require('mocha-jsdom');
var chai = require('chai'), spies = require('chai-spies');
var _ = require("underscore");
chai.use(spies);
var expect = chai.expect;
var $;
var TooltipsCollectionView;
var TooltipsCollection;
var Backbone;

describe('Tooltips Injection Collection View', function() {
    jsdom({ skipWindowCheck: true });

    before(function () {
        $ = require('jquery');
        Backbone = require("backbone");
        TooltipsCollection = require("../frontend/Tooltips/tooltipCollection.js");
        TooltipsCollectionView = require("../frontend/Tooltips/tooltipCollectionInjectionView.js");
    });

    describe('Render()', function() {

        it('Change paragraph if contains .tooltip-text class and tooltipKey match', function () {
            // SETUP
            var tooltipsJson = [{ tooltipId: 3331234, tooltipKey: "KeyWord", description: "Tooltip" }];
            var tooltipsCollection = new TooltipsCollection(tooltipsJson);
            var initialParagraphContent = '<p class="tooltip-text">Bla bla bla KeyWord bla bla bla</p>';
            document.body.innerHTML = initialParagraphContent;
            var tooltipsCollectionView = new TooltipsCollectionView({collection: tooltipsCollection, el: document.body});

            // EXERCISE
            tooltipsCollectionView.render();

            // ASSERT
            expect(document.body.innerHTML).not.to.be.equal(initialParagraphContent);
        });

        it('Adds tooltip to paragraph containing .tooltip-text class and tooltipKey match', function () {
            // SETUP
            var tooltipsJson = [{ tooltipId: 12333234, tooltipKey: "KeyWord", description: "Tooltip" }];
            var tooltipsCollection = new TooltipsCollection(tooltipsJson);
            var initialParagraphContent = '<p class="tooltip-text">Bla bla bla KeyWord bla bla bla</p>';
            var finalParagraphContainer = '<p class="tooltip-text">Bla bla bla <span data-tooltip="Tooltip">KeyWord</span> bla bla bla</p>';
            document.body.innerHTML = initialParagraphContent;
            var tooltipsCollectionView = new TooltipsCollectionView({collection: tooltipsCollection, el: document.body});

            // EXERCISE
            tooltipsCollectionView.render();

            // ASSERT
            expect(document.body.innerHTML).to.be.equal(finalParagraphContainer);
        });

        it('Change paragraph if contains .tooltip-text class and two tooltipKey matches', function () {
            // SETUP
            var tooltipsJson = [
                { tooltipId: 1234, tooltipKey: "FirstKey", description: "FirstTooltip" },
                { tooltipId: 1238884, tooltipKey: "SecondWord", description: "SecondTooltip" },
            ];
            var tooltipsCollection = new TooltipsCollection(tooltipsJson);
            var initialParagraphContent = '<p class="tooltip-text">Bla bla bla FirstKey bla bla SecondWord bla</p>';
            document.body.innerHTML = initialParagraphContent;
            var tooltipsCollectionView = new TooltipsCollectionView({collection: tooltipsCollection, el: document.body});

            // EXERCISE
            tooltipsCollectionView.render();

            // ASSERT
            expect(document.body.innerHTML).not.to.be.equal(initialParagraphContent);
        });

        it('Adds tooltip to paragraph containing .tooltip-text class and two tooltipKey matches', function () {
            // SETUP
            var tooltipsJson = [
                { tooltipId: 1234, tooltipKey: "FirstKey", description: "FirstTooltip" },
                { tooltipId: 122234, tooltipKey: "SecondWord", description: "SecondTooltip" },
            ];
            var tooltipsCollection = new TooltipsCollection(tooltipsJson);
            var initialParagraphContent = '<p class="tooltip-text">Bla bla bla FirstKey bla bla SecondWord bla</p>';
            var finalParagraphContainer = '<p class="tooltip-text">Bla bla bla <span data-tooltip="FirstTooltip">FirstKey</span> bla bla <span data-tooltip="SecondTooltip">SecondWord</span> bla</p>';
            document.body.innerHTML = initialParagraphContent;
            var tooltipsCollectionView = new TooltipsCollectionView({collection: tooltipsCollection, el: document.body});

            // EXERCISE
            tooltipsCollectionView.render();

            // ASSERT
            expect(document.body.innerHTML).to.be.equal(finalParagraphContainer);
        });
    });
});