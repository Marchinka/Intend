var jsdom = require('mocha-jsdom');
var chai = require('chai'), spies = require('chai-spies');
var _ = require("underscore");
chai.use(spies);
var expect = chai.expect;
var $;
var ArticleCollectionView;
var ArticlesCollection;
var Backbone;

describe('Tooltip Collection View', function() {
    jsdom({ skipWindowCheck: true });

    before(function () {
        $ = require('jquery');
        Backbone = require("backbone");
        TooltipCollection = require("../frontend/Tooltips/tooltipCollection.js");
        TooltipCollectionView = require("../frontend/Tooltips/tooltipCollectionView.js");
    });

    beforeEach(function () {
        $.ajax = function (){ }; 
    });

    describe('Render()', function() {

        it('Renders correctly a one element list without throwing exception', function () {
            // SETUP
            var tooltips = [
                { id: 1, tooltipKey : 'Key', description: 'Description' }
            ];
            var tooltipCollection = new TooltipCollection(tooltips);
            var tooltipCollectionView = new TooltipCollectionView({collection: tooltipCollection, el: document.body});

            var SafeCode = function(){
                tooltipCollectionView.render();
            };

            // ASSERT
            expect(SafeCode).not.to.throw();
        });

        it('Renders correctly a two elements list without throwing exception', function () {
            // SETUP
            var tooltips = [
                { id: 1, tooltipKey : 'Key', description: 'Description' },
                { id: 2, tooltipKey : 'Key', description: 'Description' }
            ];
            var tooltipCollection = new TooltipCollection(tooltips);
            var tooltipCollectionView = new TooltipCollectionView({collection: tooltipCollection, el: document.body});

            var SafeCode = function(){
                tooltipCollectionView.render();
            };

            // ASSERT
            expect(SafeCode).not.to.throw();
        });

        it('Renders correctly a two elements list without throwing exception', function () {
            // SETUP
            var tooltips = [
                { id: 1, tooltipKey : 'Key', description: 'Description' },
                { id: 2, tooltipKey : 'Key', description: 'Description' }
            ];
            var tooltipCollection = new TooltipCollection(tooltips);
            var tooltipCollectionView = new TooltipCollectionView({collection: tooltipCollection, el: document.body});

            tooltipCollectionView.render();

            // ASSERT
            var firstHtml = document.getElementById("tooltip1");
            var secondHtml = document.getElementById("tooltip2");
            expect(firstHtml).not.to.be.undefined;
            expect(secondHtml).not.to.be.undefined;
        });
    });
});