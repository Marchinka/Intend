var chai = require('chai'), spies = require('chai-spies');
chai.use(spies);
var expect = chai.expect;
var TooltipValidator = require("../database/tooltipValidator.js");


describe('Tooltip Validator', function() {

    describe('Validate()', function() {

        it('Returns no error if model is valid', function () {
            // SETUP
            var tooltip = { id: 1, tooltipKey: "ipsum", description: "lorem" };
            var tooltipValidator = new TooltipValidator();

            // EXERCISE
            var validationErrors = tooltipValidator.validateClientSide(tooltip);

            // ASSERT
            expect(validationErrors).to.be.false;
        });

        it('Returns error if key is empty', function () {
            // SETUP
            var tooltip = { id: 1, tooltipKey: "    ", description: "lorem" };
            var tooltipValidator = new TooltipValidator();
            var errorName = "tooltipKey";
            var errorMessage = "Key is mandatory.";

            // EXERCISE
            var validationErrors = tooltipValidator.validateClientSide(tooltip);

            // ASSERT
            expect(validationErrors.length).to.be.equal(1);
            expect(validationErrors[0].name).to.be.equal(errorName);
            expect(validationErrors[0].message).to.be.equal(errorMessage);
        });

        it('Returns error if key is null', function () {
            // SETUP
            var tooltip = { id: 1, tooltipKey: null, description: "lorem" };
            var tooltipValidator = new TooltipValidator();
            var errorName = "tooltipKey";
            var errorMessage = "Key is mandatory.";

            // EXERCISE
            var validationErrors = tooltipValidator.validateClientSide(tooltip);

            // ASSERT
            expect(validationErrors.length).to.be.equal(1);
            expect(validationErrors[0].name).to.be.equal(errorName);
            expect(validationErrors[0].message).to.be.equal(errorMessage);
        });

        it('Returns error if tooltipKey is undefined', function () {
            // SETUP
            var tooltip = { id: 1, tooltipKey: undefined, description: "lorem" };
            var tooltipValidator = new TooltipValidator();
            var errorName = "tooltipKey";
            var errorMessage = "Key is mandatory.";

            // EXERCISE
            var validationErrors = tooltipValidator.validateClientSide(tooltip);

            // ASSERT
            expect(validationErrors.length).to.be.equal(1);
            expect(validationErrors[0].name).to.be.equal(errorName);
            expect(validationErrors[0].message).to.be.equal(errorMessage);
        });

        it('Returns error if description is empty', function () {
            // SETUP
            var tooltip = { id: 1, tooltipKey: "ipsum", description: "        " };
            var tooltipValidator = new TooltipValidator();
            var errorName = "description";
            var errorMessage = "Description is mandatory.";

            // EXERCISE
            var validationErrors = tooltipValidator.validateClientSide(tooltip);

            // ASSERT
            expect(validationErrors.length).to.be.equal(1);
            expect(validationErrors[0].name).to.be.equal(errorName);
            expect(validationErrors[0].message).to.be.equal(errorMessage);
        });

        it('Returns error if description is null', function () {
            // SETUP
            var tooltip = { id: 1, tooltipKey: "ipsum", description: null };
            var tooltipValidator = new TooltipValidator();
            var errorName = "description";
            var errorMessage = "Description is mandatory.";

            // EXERCISE
            var validationErrors = tooltipValidator.validateClientSide(tooltip);

            // ASSERT
            expect(validationErrors.length).to.be.equal(1);
            expect(validationErrors[0].name).to.be.equal(errorName);
            expect(validationErrors[0].message).to.be.equal(errorMessage);
        });

        it('Returns error if description is undefined', function () {
            // SETUP
            var tooltip = { id: 1, tooltipKey: "ipsum", description: undefined };
            var tooltipValidator = new TooltipValidator();
            var errorName = "description";
            var errorMessage = "Description is mandatory.";

            // EXERCISE
            var validationErrors = tooltipValidator.validateClientSide(tooltip);

            // ASSERT
            expect(validationErrors.length).to.be.equal(1);
            expect(validationErrors[0].name).to.be.equal(errorName);
            expect(validationErrors[0].message).to.be.equal(errorMessage);
        });
    });
});