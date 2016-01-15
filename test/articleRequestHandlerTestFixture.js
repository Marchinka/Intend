var chai = require('chai'), spies = require('chai-spies');
var _ = require("underscore");
chai.use(spies);
var expect = chai.expect;
var ArticleValidator = require("../database/articleValidator");
var articleRequestHandler = require("../routes/articleRequestHandler");
var ArticleRepository = require("../database/articleRepository");
var testUrl = "mongodb://localhost:27017/intendTest";
var userManager = require("./../database/userManager");

describe('Article Request Handles', function() {

    beforeEach(function () {
    });

    afterEach(function () {
    });

    describe('handleArticlePostRequest()', function() {

       it('Calls correctly validator and does not goes on db in case of invalid article', function () {
            // SETUP
            var requestMock = { body: { }, user: {username: 'test', hasBotPermissions: true}};
            var responseMock = { 
                status: function (code) {
                    this.statusCode = code;
                    return this;
                },
                send: function (response) {
                    return "risposta";
                }
            };
            userManager.extend(requestMock, responseMock);

            // EXERCISE
            articleRequestHandler.handleArticlePost(requestMock, responseMock, {});

            // ASSERT
            expect(responseMock.statusCode).to.be.equal(500);
        });

        it('Returns 401 if user does not have bot permission', function () {
			// SETUP
            var requestMock = { body: { } };
            var responseMock = { 
            	status: function (code) {
            		this.statusCode = code;
            		return this;
            	},
            	send: function (response) {
            		return "risposta";
            	}
            };
            userManager.extend(requestMock, responseMock);

            // EXERCISE
			articleRequestHandler.handleArticlePost(requestMock, responseMock, {});

			// ASSERT
			expect(responseMock.statusCode).to.be.equal(403);
        });
    });

    describe('handleArticlePutRequest()', function() {

        it('Calls correctly validator and does not goes on db in case of invalid article', function () {
			// SETUP
            var requestMock = { body: { }, user: {username: 'test', hasBotPermissions: true}};
            var responseMock = { 
            	status: function (code) {
            		this.statusCode = code;
            		return this;
            	},
            	send: function (response) {
            		return "risposta";
            	}
            };
            userManager.extend(requestMock, responseMock);

            // EXERCISE
			articleRequestHandler.handleArticlePut(requestMock, responseMock, {});

			// ASSERT
			expect(responseMock.statusCode).to.be.equal(500);
        });

        it('Returns 401 if user does not have bot permission', function () {
            // SETUP
            var requestMock = { body: { }};
            var responseMock = { 
                status: function (code) {
                    this.statusCode = code;
                    return this;
                },
                send: function (response) {
                    return "risposta";
                }
            };
            userManager.extend(requestMock, responseMock);
            
            // EXERCISE
            articleRequestHandler.handleArticlePut(requestMock, responseMock, {});

            // ASSERT
            expect(responseMock.statusCode).to.be.equal(403);
        });
    });
});