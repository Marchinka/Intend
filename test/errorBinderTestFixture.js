var chai = require('chai'), spies = require('chai-spies');
chai.use(spies);
var expect = chai.expect;
var jsdom = require('mocha-jsdom');
var fs = require("fs");
var rerequire = jsdom.rerequire;

describe('Error Binder', function() {
    jsdom({ skipWindowCheck: true });

    before(function () {
        $ = rerequire('jquery');
    });

    describe('bindError()', function() {

        it("Does not modify form-group of propertis withous errors", function () {
            // SETUP
            var error = { name: "someOtherFieldName", message : 'Error Message' };
            var errorBinder = require("../frontend/errorBinder.js");
            var formInputHml = fs.readFileSync("./test/testFormInput.html", 'utf8');
            document.body.innerHTML = formInputHml;

            // EXERCISE
            errorBinder.bindError(error);

            // ASSERT
            var formGroups = document.getElementsByClassName('has-error');
            expect(formGroups.length).to.be.equal(0);
            var helpBlock = document.getElementsByClassName('help-block');
            expect(helpBlock[0].innerHTML).to.be.equal("");
        });

        it("Adds correctly 'has-error' class to form-group", function () {
            // SETUP
            var error = { name: "fieldName", message : 'Error Message' };
            var errorBinder = require("../frontend/errorBinder.js");
            var formInputHml = fs.readFileSync("./test/testFormInput.html", 'utf8');
            document.body.innerHTML = formInputHml;

            // EXERCISE
            errorBinder.bindError(error);

            // ASSERT
            var formGroups = document.getElementsByClassName('has-error');
            expect(formGroups).not.to.be.undefined;
            expect(formGroups.length).to.be.equal(1);
        });

        it("Adds correctly error message class to help-block", function () {
            // SETUP
            var error = { name: "fieldName", message : 'Error Message' };
            var errorBinder = require("../frontend/errorBinder.js");
            var formInputHml = fs.readFileSync("./test/testFormInput.html", 'utf8');
            document.body.innerHTML = formInputHml;

            // EXERCISE
            errorBinder.bindError(error);

            // ASSERT
            var helpBlock = document.getElementsByClassName('help-block');
            expect(helpBlock).not.to.be.undefined;
            expect(helpBlock.length).to.be.equal(1);
            expect(helpBlock[0].innerHTML).to.be.equal(error.message);
        });

    });

    describe('bindErrors()', function() {

        it("Removes errors in document if they're not present in the input list", function () {
            // SETUP
            var error = { name: "fieldName", message : 'Error Message' };
            var errorBinder = require("../frontend/errorBinder.js");
            var formInputHml = fs.readFileSync("./test/testFormInput.html", 'utf8');
            errorBinder.bindError(error);
            document.body.innerHTML = formInputHml;
            var differentError = { name: "someOtherFieldName", message : 'Error Message' };

            // EXERCISE
            errorBinder.bindErrors([ differentError ]);

            // ASSERT
            var formGroups = document.getElementsByClassName('has-error');
            expect(formGroups.length).to.be.equal(0);
            var helpBlock = document.getElementsByClassName('help-block');
            expect(helpBlock[0].innerHTML).to.be.equal("");
        });        

        it("Calls correctly bindError() as much times as the number of errors in input", function () {
            // SETUP
            var error = { name: "fieldName", message : 'Error Message' };
            var errors = [ error, error, error ];
            var errorBinder = require("../frontend/errorBinder.js");
            var formInputHml = fs.readFileSync("./test/testFormInput.html", 'utf8');
            document.body.innerHTML = formInputHml;
            var spy = chai.spy.on(errorBinder, "bindError");

            // EXERCISE
            errorBinder.bindErrors(errors);

            // ASSERT
            expect(spy).to.have.been.called.exactly(3);
        }); 

        it("Calls zero times bindError() if input is udnefined", function () {
            // SETUP
            var errorBinder = require("../frontend/errorBinder.js");
            var spy = chai.spy.on(errorBinder, "bindError");

            // EXERCISE
            errorBinder.bindErrors(undefined);

            // ASSERT
            expect(spy).to.have.been.called.exactly(0);
        }); 
    });
});