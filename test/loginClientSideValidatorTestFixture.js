var chai = require('chai'), spies = require('chai-spies');
chai.use(spies);
var expect = chai.expect;
var UserValidator = require("../database/loginClientSideValidator.js");

var getValidSut = function () {
    var user = { username: 'Username', password: 'Password'};
    return user;
};

describe('User Validator', function() {

    describe('Validate()', function() {

        it('Returns no error if model is valid', function () {
            // SETUP
            var userJson = getValidSut();
            var userValidator = new UserValidator();

            // EXERCISE
            var validationErrors = userValidator.validateClientSide(userJson);

            // ASSERT
            expect(validationErrors).to.be.false;
        });

        it('Returns error if username is empty', function () {
            // SETUP
            var userJson = getValidSut();
            userJson.username = "   ";
            var userValidator = new UserValidator();
            var errorName = "username";
            var errorMessage = "User Name is mandatory.";

            // EXERCISE
            var validationErrors = userValidator.validateClientSide(userJson);

            // ASSERT
            expect(validationErrors.length).to.be.equal(1);
            expect(validationErrors[0].name).to.be.equal(errorName);
            expect(validationErrors[0].message).to.be.equal(errorMessage);
        });

        it('Returns error if username is null', function () {
            // SETUP
            var userJson = getValidSut();
            userJson.username = null;
            var userValidator = new UserValidator();
            var errorName = "username";
            var errorMessage = "User Name is mandatory.";

            // EXERCISE
            var validationErrors = userValidator.validateClientSide(userJson);

            // ASSERT
            expect(validationErrors.length).to.be.equal(1);
            expect(validationErrors[0].name).to.be.equal(errorName);
            expect(validationErrors[0].message).to.be.equal(errorMessage);
        });

        it('Returns error if username is undefined', function () {
            // SETUP
            var userJson = getValidSut();
            userJson.username = undefined;
            var userValidator = new UserValidator();
            var errorName = "username";
            var errorMessage = "User Name is mandatory.";

            // EXERCISE
            var validationErrors = userValidator.validateClientSide(userJson);

            // ASSERT
            expect(validationErrors.length).to.be.equal(1);
            expect(validationErrors[0].name).to.be.equal(errorName);
            expect(validationErrors[0].message).to.be.equal(errorMessage);
        });

        it('Returns error if password is empty', function () {
            // SETUP
            var userJson = getValidSut();
            userJson.password = "   ";
            var userValidator = new UserValidator();
            var errorName = "password";
            var errorMessage = "Password is mandatory.";

            // EXERCISE
            var validationErrors = userValidator.validateClientSide(userJson);

            // ASSERT
            expect(validationErrors.length).to.be.equal(1);
            expect(validationErrors[0].name).to.be.equal(errorName);
            expect(validationErrors[0].message).to.be.equal(errorMessage);
        });

        it('Returns error if password is null', function () {
            // SETUP
            var userJson = getValidSut();
            userJson.password = null;
            var userValidator = new UserValidator();
            var errorName = "password";
            var errorMessage = "Password is mandatory.";

            // EXERCISE
            var validationErrors = userValidator.validateClientSide(userJson);

            // ASSERT
            expect(validationErrors.length).to.be.equal(1);
            expect(validationErrors[0].name).to.be.equal(errorName);
            expect(validationErrors[0].message).to.be.equal(errorMessage);
        });

        it('Returns error if password is undefined', function () {
            // SETUP
            var userJson = getValidSut();
            userJson.password = undefined;
            var userValidator = new UserValidator();
            var errorName = "password";
            var errorMessage = "Password is mandatory.";

            // EXERCISE
            var validationErrors = userValidator.validateClientSide(userJson);

            // ASSERT
            expect(validationErrors.length).to.be.equal(1);
            expect(validationErrors[0].name).to.be.equal(errorName);
            expect(validationErrors[0].message).to.be.equal(errorMessage);
        });

    });
});