var chai = require('chai'), spies = require('chai-spies');
var _ = require("underscore");
chai.use(spies);
var expect = chai.expect;
var TooltipValidator = require("../database/tooltipValidator");
var tooltipRequestHandler = require("../routes/tooltipRequestHandler");
var TooltipRepository = require("../database/tooltipRepository");
var testUrl = "mongodb://localhost:27017/intendTest";

describe('Tooltip Request Handles', function() {

    beforeEach(function () {
    });

    afterEach(function () {
    });

    describe('handleTooltipPostRequest()', function() {

        it('Calls correctly validator and does not goes on db in case of invalid tooltip', function () {
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

            // EXERCISE
			tooltipRequestHandler.handleTooltipPost(requestMock, responseMock, {});

			// ASSERT
			expect(responseMock.statusCode).to.be.equal(500);
        });
    });

    describe('handleTooltipPutRequest()', function() {

        it('Calls correctly validator and does not goes on db in case of invalid tooltip', function () {
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

            // EXERCISE
			tooltipRequestHandler.handleTooltipPut(requestMock, responseMock, {});

			// ASSERT
			expect(responseMock.statusCode).to.be.equal(500);
        });
    });
});