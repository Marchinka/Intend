var jsdom = require('mocha-jsdom');
var chai = require('chai'), spies = require('chai-spies');
var _ = require("underscore");
chai.use(spies);
var expect = chai.expect;
var $;
var ArticleCollectionView;
var ArticlesCollection;
var Backbone;

describe('Article Collection View', function() {
    jsdom({ skipWindowCheck: true });

    before(function () {
        $ = require('jquery');
        Backbone = require("backbone");
        ArticlesCollection = require("../frontend/Articles/articleCollection.js");
        ArticleCollectionView = require("../frontend/Articles/articleCollectionView.js");
    });

    beforeEach(function () {
        $.ajax = function (){ }; 
    });

    describe('Render()', function() {

        it('Renders correctly a one element list without throwing exception', function () {
            // SETUP
            var articlesListJson = [
                { id: 1, title : 'ArticleTitle', subTitle: 'ArticleSubTitle', content : 'ArticleContent' }
            ];
            var articleCollection = new ArticlesCollection(articlesListJson);
            var articleView = new ArticleCollectionView({collection: articleCollection, el: document.body});

            var SafeCode = function(){
                articleView.render();
            };

            // ASSERT
            expect(SafeCode).not.to.throw();
        });

        it('Renders correctly a two element list without throwing exception', function () {
            // SETUP
            var articlesListJson = [
                { id: 1, title : 'ArticleTitle_1', subTitle: 'ArticleSubTitle_1', content : 'ArticleContent_1' },
                { id: 2, title : 'ArticleTitle_2', subTitle: 'ArticleSubTitle_2', content : 'ArticleContent_2' }
            ];
            var articleCollection = new ArticlesCollection(articlesListJson);
            var articleView = new ArticleCollectionView({collection: articleCollection, el: document.body});

            var SafeCode = function(){
                articleView.render();
            };

            // ASSERT
            expect(SafeCode).not.to.throw();
        });

        it('Renders correctly a two element list in DOM', function () {
            // SETUP
            var articlesListJson = [
                { id: 1, title : 'ArticleTitle_1', subTitle: 'ArticleSubTitle_1', content : 'ArticleContent_1' },
                { id: 2, title : 'ArticleTitle_2', subTitle: 'ArticleSubTitle_2', content : 'ArticleContent_2' }
            ];
            var articleCollection = new ArticlesCollection(articlesListJson);
            var articleView = new ArticleCollectionView({collection: articleCollection, el: document.body});

            var SafeCode = function(){
                articleView.render();
            };

            // ASSERT
            var firstArticleHtml = document.getElementById("article1");
            var secondArticleHtml = document.getElementById("article2");
            expect(firstArticleHtml).not.to.be.undefined;
            expect(secondArticleHtml).not.to.be.undefined;
        });

        it('Renders correctly list header', function () {
            // SETUP
            var articlesListJson = [
                { id: 1, title : 'ArticleTitle_1', subTitle: 'ArticleSubTitle_1', content : 'ArticleContent_1' },
                { id: 2, title : 'ArticleTitle_2', subTitle: 'ArticleSubTitle_2', content : 'ArticleContent_2' }
            ];
            var articleCollection = new ArticlesCollection(articlesListJson);
            var articleView = new ArticleCollectionView({collection: articleCollection, el: document.body});

            var SafeCode = function(){
                articleView.render();
            };

            // ASSERT
            var headerHtml = document.getElementById("newArticleCreationButton");
            expect(headerHtml).not.to.be.undefined;
        });
    });
});