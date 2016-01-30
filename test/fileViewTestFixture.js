var jsdom = require('mocha-jsdom');
var chai = require('chai'), spies = require('chai-spies');
var _ = require("underscore");
chai.use(spies);
var expect = chai.expect;
var $;
var FileDetailView;
var FileModel;
var Backbone;

describe('File View', function() {
    jsdom({ skipWindowCheck: true });

    before(function () {
        $ = require('jquery');
        Backbone = require("backbone");
        FileModel = require("../frontend/Files/fileModel.js");
        FileDetailView = require("../frontend/Files/fileView.js");
    });

    beforeEach(function () {
        $ = require('jquery');
    });

    var getValidFileJson = function () {
        var fileJson = { id: 1, fileName : 'Name Of The File' };
        return fileJson;
    };

    describe('renderHtml()', function() {

        it('Throws exception with json without id as input', function () {
            // SETUP
            var fileJson = getValidFileJson();
            delete fileJson.id;
            var fileModel = new FileModel(fileJson);
            var fileView = new FileDetailView({model: fileModel, el: document.body});
            var errorMessage = "id is not defined";

            // EXERCISE
            var ErrorThrower = function (){
                fileView.renderHtml();
            };

            // ASSERT
            expect(ErrorThrower).to.throw(errorMessage);
        });

        it('Throws exception with json without fileName as input', function () {
            // SETUP
            var fileJson = getValidFileJson();
            delete fileJson.fileName;
            var fileModel = new FileModel(fileJson);
            var fileView = new FileDetailView({model: fileModel, el: document.body});
            var errorMessage = "fileName is not defined";

            // EXERCISE
            var ErrorThrower = function (){
                fileView.renderHtml();
            };

            // ASSERT
            expect(ErrorThrower).to.throw(errorMessage);
        });

        it('Does not throws exception with valid json as input', function () {
            // SETUP
            var fileJson = getValidFileJson();
            var fileModel = new FileModel(fileJson);
            var fileView = new FileDetailView({model: fileModel, el: document.body});

            // EXERCISE
            var ErrorThrower = function (){
                fileView.renderHtml();
            };

            // ASSERT
            expect(ErrorThrower).not.to.throw();
        });

        it('Renders a <p> with id #file1', function () {
            // SETUP
            var fileJson = getValidFileJson();
            var fileModel = new FileModel(fileJson);
            var fileView = new FileDetailView({model: fileModel, el: document.body});

            // EXERCISE
            var ErrorThrower = function (){
                fileView.renderHtml();
            };

            // ASSERT
            var testSelector = 'p#file' + fileJson.id;
            var element = $(testSelector);
            expect(element.html()).not.to.be.undefined;
        });

        it('Renders a <p> with correct file name', function () {
            // SETUP
            var fileJson = getValidFileJson();
            var fileModel = new FileModel(fileJson);
            var fileView = new FileDetailView({model: fileModel, el: document.body});

            // EXERCISE
            var ErrorThrower = function (){
                fileView.renderHtml();
            };

            // ASSERT
            var testSelector = 'p#file' + fileJson.id;
            var element = $(testSelector);
            expect(element.html()).to.contain(fileJson.fileName);
        });
    });
});