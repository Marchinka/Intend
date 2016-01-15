var chai = require('chai'), spies = require('chai-spies');
chai.use(spies);
var expect = chai.expect;
var ArticleValidator = require("../database/articleValidator.js");

describe('Article Validator', function() {

    describe('Validate()', function() {

        it('Returns no error if model is valid', function () {
            // SETUP
            var articleJson = { _id: 1, title : 'ArticleTitle', subTitle: 'ArticleSubTitle', content : 'ArticleContent' };
            var articleValidator = new ArticleValidator();

            // EXERCISE
            var validationErrors = articleValidator.validateClientSide(articleJson);

            // ASSERT
            expect(validationErrors).to.be.false;
        });

        it('Returns error if title is empty', function () {
            // SETUP
            var articleJson = { _id: 1, title : '   ', subTitle: 'ArticleSubTitle', content : 'ArticleContent' };
            var articleValidator = new ArticleValidator();
            var errorName = "title";
            var errorMessage = "Title is mandatory.";

            // EXERCISE
            var validationErrors = articleValidator.validateClientSide(articleJson);

            // ASSERT
            expect(validationErrors.length).to.be.equal(1);
            expect(validationErrors[0].name).to.be.equal(errorName);
            expect(validationErrors[0].message).to.be.equal(errorMessage);
        });

        it('Returns error if title is null', function () {
            // SETUP
            var articleJson = { _id: 1, title : null, subTitle: 'ArticleSubTitle', content : 'ArticleContent' };
            var articleValidator = new ArticleValidator();
            var errorName = "title";
            var errorMessage = "Title is mandatory.";

            // EXERCISE
            var validationErrors = articleValidator.validateClientSide(articleJson);

            // ASSERT
            expect(validationErrors.length).to.be.equal(1);
            expect(validationErrors[0].name).to.be.equal(errorName);
            expect(validationErrors[0].message).to.be.equal(errorMessage);
        });

        it('Returns error if title is undefined', function () {
            // SETUP
            var articleJson = { _id: 1, title : undefined, subTitle: 'ArticleSubTitle', content : 'ArticleContent' };
            var articleValidator = new ArticleValidator();
            var errorName = "title";
            var errorMessage = "Title is mandatory.";

            // EXERCISE
            var validationErrors = articleValidator.validateClientSide(articleJson);

            // ASSERT
            expect(validationErrors.length).to.be.equal(1);
            expect(validationErrors[0].name).to.be.equal(errorName);
            expect(validationErrors[0].message).to.be.equal(errorMessage);
        });

        it('Returns error if subTitle is empty', function () {
            // SETUP
            var articleJson = { _id: 1, title : 'title', subTitle: '   ', content : 'ArticleContent' };
            var articleValidator = new ArticleValidator();
            var errorName = "subTitle";
            var errorMessage = "Sub title is mandatory.";

            // EXERCISE
            var validationErrors = articleValidator.validateClientSide(articleJson);

            // ASSERT
            expect(validationErrors.length).to.be.equal(1);
            expect(validationErrors[0].name).to.be.equal(errorName);
            expect(validationErrors[0].message).to.be.equal(errorMessage);
        });

        it('Returns error if subTitle is null', function () {
            // SETUP
            var articleJson = { _id: 1, title : 'title', subTitle: null, content : 'ArticleContent' };
            var articleValidator = new ArticleValidator();
            var errorName = "subTitle";
            var errorMessage = "Sub title is mandatory.";

            // EXERCISE
            var validationErrors = articleValidator.validateClientSide(articleJson);

            // ASSERT
            expect(validationErrors.length).to.be.equal(1);
            expect(validationErrors[0].name).to.be.equal(errorName);
            expect(validationErrors[0].message).to.be.equal(errorMessage);
        });

        it('Returns error if subTitle is undefined', function () {
            // SETUP
            var articleJson = { _id: 1, title : 'title', subTitle: undefined, content : 'ArticleContent' };
            var articleValidator = new ArticleValidator();
            var errorName = "subTitle";
            var errorMessage = "Sub title is mandatory.";

            // EXERCISE
            var validationErrors = articleValidator.validateClientSide(articleJson);

            // ASSERT
            expect(validationErrors.length).to.be.equal(1);
            expect(validationErrors[0].name).to.be.equal(errorName);
            expect(validationErrors[0].message).to.be.equal(errorMessage);
        });

        it('Returns error if content is empty', function () {
            // SETUP
            var articleJson = { _id: 1, title : 'title', subTitle: 'subTitle', content : '    ' };
            var articleValidator = new ArticleValidator();
            var errorName = "content";
            var errorMessage = "Content is mandatory.";

            // EXERCISE
            var validationErrors = articleValidator.validateClientSide(articleJson);

            // ASSERT
            expect(validationErrors.length).to.be.equal(1);
            expect(validationErrors[0].name).to.be.equal(errorName);
            expect(validationErrors[0].message).to.be.equal(errorMessage);
        });

        it('Returns error if content is null', function () {
            // SETUP
            var articleJson = { _id: 1, title : 'title', subTitle: 'subTitle', content : null };
            var articleValidator = new ArticleValidator();
            var errorName = "content";
            var errorMessage = "Content is mandatory.";

            // EXERCISE
            var validationErrors = articleValidator.validateClientSide(articleJson);

            // ASSERT
            expect(validationErrors.length).to.be.equal(1);
            expect(validationErrors[0].name).to.be.equal(errorName);
            expect(validationErrors[0].message).to.be.equal(errorMessage);
        });

        it('Returns error if content is undefined', function () {
            // SETUP
            var articleJson = { _id: 1, title : 'title', subTitle: "subTitle", content : undefined };
            var articleValidator = new ArticleValidator();
            var errorName = "content";
            var errorMessage = "Content is mandatory.";

            // EXERCISE
            var validationErrors = articleValidator.validateClientSide(articleJson);

            // ASSERT
            expect(validationErrors.length).to.be.equal(1);
            expect(validationErrors[0].name).to.be.equal(errorName);
            expect(validationErrors[0].message).to.be.equal(errorMessage);
        });
    });
});