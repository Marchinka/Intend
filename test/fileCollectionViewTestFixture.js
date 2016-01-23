var jsdom = require('mocha-jsdom');
var chai = require('chai'), spies = require('chai-spies');
var _ = require("underscore");
chai.use(spies);
var expect = chai.expect;
var $;
var FileCollectionView;
var FilesCollection;
var Backbone;

describe('File Collection View', function() {
    jsdom({ skipWindowCheck: true });

    before(function () {
        $ = require('jquery');
        Backbone = require("backbone");
        FilesCollection = require("../frontend/Files/fileCollection.js");
        FileCollectionView = require("../frontend/Files/fileCollectionView.js");
    });

    beforeEach(function () {
        $.ajax = function (){ }; 
    });

    var getValidFileJson = function (id) {
        return { id: id, fileName: 'Name of The File' };
    };

    describe('Render()', function() {

        it('Renders correctly a one element list without throwing exception', function () {
            // SETUP
            var filesListJson = [
                getValidFileJson(1)
            ];
            var fileCollection = new FilesCollection(filesListJson);
            var fileView = new FileCollectionView({collection: fileCollection, el: document.body});

            var SafeCode = function(){
                fileView.render();
            };

            // ASSERT
            expect(SafeCode).not.to.throw();
        });

        it('Renders correctly a two element list without throwing exception', function () {
            // SETUP
            var filesListJson = [
                getValidFileJson(1),
                getValidFileJson(2)
            ];
            var fileCollection = new FilesCollection(filesListJson);
            var fileView = new FileCollectionView({collection: fileCollection, el: document.body});

            var SafeCode = function(){
                fileView.render();
            };

            // ASSERT
            expect(SafeCode).not.to.throw();
        });

        it('Renders correctly a two element list in DOM', function () {
            // SETUP
            var filesListJson = [
                getValidFileJson(1),
                getValidFileJson(2)
            ];
            var fileCollection = new FilesCollection(filesListJson);
            var fileView = new FileCollectionView({collection: fileCollection, el: document.body});

            var SafeCode = function(){
                fileView.render();
            };

            // ASSERT
            var firstFileHtml = document.getElementById("file1");
            var secondFileHtml = document.getElementById("file2");
            expect(firstFileHtml).not.to.be.undefined;
            expect(secondFileHtml).not.to.be.undefined;
        });
    });
});