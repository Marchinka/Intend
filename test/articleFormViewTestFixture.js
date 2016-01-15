var jsdom = require('mocha-jsdom');
var chai = require('chai'), spies = require('chai-spies');
var _ = require("underscore");
chai.use(spies);
var expect = chai.expect;
var $;
var ArticlesListItemView;
var ArticleModel;
var Backbone;

describe('Article Form View', function() {
    jsdom({ skipWindowCheck: true });

    before(function () {
        $ = require('jquery');
        Backbone = require("backbone");
        ArticleModel = require("../frontend/Articles/articleModel.js");
        ArticleFormView = require("../frontend/Articles/articleFormView.js");
    });

    describe('Render()', function() {

        it('Throws exception with json without title as input', function (done) {
            // SETUP
            var articleJson = { _id: 1, E__title : 'ArticleTitle', subTitle: 'ArticleSubTitle', content : 'ArticleContent' };
            var articleModel = new ArticleModel(articleJson);
            var articleView = new ArticleFormView({model: articleModel, el: document.body});
            var errorMessage = "title is not defined";

            // EXERCISE
            var ErrorThrower = function (){
                articleView.render();
            };

            // ASSERT
            expect(ErrorThrower).to.throw(errorMessage);
            done();
        });

        it('Throws exception with json without subTitle as input', function (done) {
            // SETUP
            var articleJson = { _id: 1, title : 'ArticleTitle', E__subTitle: 'ArticleSubTitle', content : 'ArticleContent' };
            var articleModel = new ArticleModel(articleJson);
            var articleView = new ArticleFormView({model: articleModel, el: document.body});
            var errorMessage = "subTitle is not defined";

            // EXERCISE
            var ErrorThrower = function (){
                articleView.render();
            };

            // ASSERT
            expect(ErrorThrower).to.throw(errorMessage);
            done();
        });

        it('Throws exception with json without subTitle as input', function (done) {
            // SETUP
            var articleJson = { _id: 1, title : 'ArticleTitle', subTitle: 'ArticleSubTitle', E__content : 'ArticleContent' };
            var articleModel = new ArticleModel(articleJson);
            var articleView = new ArticleFormView({model: articleModel, el: document.body});
            var errorMessage = "content is not defined";

            // EXERCISE
            var ErrorThrower = function (){
                articleView.render();
            };

            // ASSERT
            expect(ErrorThrower).to.throw(errorMessage);
            done();
        });

        it('Renders title input correcly', function (done) {
            // SETUP
            var articleJson = { _id: 1, title : 'ArticleTitle', subTitle: 'ArticleSubTitle', content : 'ArticleContent' };
            var articleModel = new ArticleModel(articleJson);
            var articleView = new ArticleFormView({model: articleModel, el: document.body});

            // EXERCISE
            articleView.render();

            // ASSERT
            var title = document.getElementsByName("title")[0].value;
            expect(title).to.be.equal(articleJson.title);
            done();
        });

        it('Renders sub title input correcly', function (done) {
            // SETUP
            var articleJson = { _id: 1, title : 'ArticleTitle', subTitle: 'ArticleSubTitle', content : 'ArticleContent' };
            var articleModel = new ArticleModel(articleJson);
            var articleView = new ArticleFormView({model: articleModel, el: document.body});

            // EXERCISE
            articleView.render();

            // ASSERT
            var subTitle = document.getElementsByName("subTitle")[0].value;
            expect(subTitle).to.be.equal(articleJson.subTitle);
            done();
        });

        it('Renders content textarea correcly', function (done) {
            // SETUP
            var articleJson = { _id: 1, title : 'ArticleTitle', subTitle: 'ArticleSubTitle', content : 'ArticleContent' };
            var articleModel = new ArticleModel(articleJson);
            var articleView = new ArticleFormView({model: articleModel, el: document.body});

            // EXERCISE
            articleView.render();

            // ASSERT
            var content = document.getElementsByName("content")[0].value;
            expect(content).to.be.equal(articleJson.content);
            done();
        });
    });
});