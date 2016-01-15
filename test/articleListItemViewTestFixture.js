var jsdom = require('mocha-jsdom');
var chai = require('chai'), spies = require('chai-spies');
var _ = require("underscore");
chai.use(spies);
var expect = chai.expect;
var $;
var ArticlesListItemView;
var ArticleModel;
var Backbone;

describe('Article List Item View', function() {
    jsdom({ skipWindowCheck: true });

    before(function () {
        $ = require('jquery');
        Backbone = require("backbone");
        ArticleModel = require("../frontend/Articles/articleModel.js");
        ArticlesListItemView = require("../frontend/Articles/articleListItemView.js");
    });

    describe('Render()', function() {

        it('Throws exception with json without id as input', function () {
            // SETUP
            var articleJson = { E___id: 1, title : 'ArticleTitle', subTitle: 'ArticleSubTitle', content : 'ArticleContent' };
            var articleModel = new ArticleModel(articleJson);
            var articleView = new ArticlesListItemView({model: articleModel, el: document.body});
            var errorMessage = "id is not defined";

            // EXERCISE
            var ErrorThrower = function (){
                articleView.render();
            };

            // ASSERT
            expect(ErrorThrower).to.throw(errorMessage);
        });

        it('Throws exception with json without title as input', function () {
            // SETUP
            var articleJson = { id: 1, E__title : 'ArticleTitle', subTitle: 'ArticleSubTitle', content : 'ArticleContent' };
            var articleModel = new ArticleModel(articleJson);
            var articleView = new ArticlesListItemView({model: articleModel, el: document.body});
            var errorMessage = "title is not defined";

            // EXERCISE
            var ErrorThrower = function (){
                articleView.render();
            };

            // ASSERT
            expect(ErrorThrower).to.throw(errorMessage);
        });

        it('Throws exception with json without subTitle as input', function () {
            // SETUP
            var articleJson = { id: 1, title : 'ArticleTitle', E__subTitle: 'ArticleSubTitle', content : 'ArticleContent' };
            var articleModel = new ArticleModel(articleJson);
            var articleView = new ArticlesListItemView({model: articleModel, el: document.body});
            var errorMessage = "subTitle is not defined";

            // EXERCISE
            var ErrorThrower = function (){
                articleView.render();
            };

            // ASSERT
            expect(ErrorThrower).to.throw(errorMessage);
        });

        it('Throws exception with json without subTitle as input', function () {
            // SETUP
            var articleJson = { id: 1, title : 'ArticleTitle', subTitle: 'ArticleSubTitle', E__content : 'ArticleContent' };
            var articleModel = new ArticleModel(articleJson);
            var articleView = new ArticlesListItemView({model: articleModel, el: document.body});
            var errorMessage = "content is not defined";

            // EXERCISE
            var ErrorThrower = function (){
                articleView.render();
            };

            // ASSERT
            expect(ErrorThrower).to.throw(errorMessage);
        });

        it('Renders template correctly with correct json as input', function () {
            // SETUP
            var articleJson = { id: 1, title : 'ArticleTitle', subTitle: 'ArticleSubTitle', content : 'ArticleContent' };
            var articleModel = new ArticleModel(articleJson);
            var articleView = new ArticlesListItemView({model: articleModel, el: document.body});

            // EXERCISE
            var SafeCode = function(){
                articleView.render();
            };

            // ASSERT
            expect(SafeCode).not.to.throw();
        });

        it('Renders title correcly', function () {
            // SETUP
            var articleJson = { id: 1, title : 'ArticleTitle', subTitle: 'ArticleSubTitle', content : 'ArticleContent' };
            var articleModel = new ArticleModel(articleJson);
            var articleView = new ArticlesListItemView({model: articleModel, el: document.body});

            // EXERCISE
            articleView.render();

            // ASSERT
            var title = document.getElementById("articleTitle").innerHTML;
            expect(title).to.be.equal(articleJson.title);
        });

        it('Renders sub title correcly', function () {
            // SETUP
            var articleJson = { id: 1, title : 'ArticleTitle', subTitle: 'ArticleSubTitle', content : 'ArticleContent' };
            var articleModel = new ArticleModel(articleJson);
            var articleView = new ArticlesListItemView({model: articleModel, el: document.body});

            // EXERCISE
            articleView.render();

            // ASSERT
            var title = document.getElementById("articleSubTitle").innerHTML;
            expect(title).to.be.equal(articleJson.subTitle);
        });

        it('Renders content correcly', function () {
            // SETUP
            var articleJson = { id: 1, title : 'ArticleTitle', subTitle: 'ArticleSubTitle', content : 'ArticleContent' };
            var articleModel = new ArticleModel(articleJson);
            var articleView = new ArticlesListItemView({model: articleModel, el: document.body});

            // EXERCISE
            articleView.render();

            // ASSERT
            var title = document.getElementById("articleContent").innerHTML;
            expect(title).to.be.equal(articleJson.content);
        });
    });
});