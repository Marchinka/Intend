var chai = require('chai'), spies = require('chai-spies');
var _ = require("underscore");
chai.use(spies);
var expect = chai.expect;
var FileRepository = require("../database/fileRepository");
var ArticleRepository = require("../database/articleRepository");
var mysql =  require('mysql');
var databaseConfiguration = require("./../database/databaseConfig.js");

describe('File Repository', function() {

	var getFileJson = function (fileName, articleId) {
		if (!fileName) {
			fileName = 'NameOf File';
		}
		if (!articleId) {
			articleId = 1;
		}
		var file = { fileName : fileName, articleId: articleId};
		return file;
	};

	var getArticleJson = function (articleTitle) {
		if (!articleTitle) {
			articleTitle = 'ArticleTitle';
		}
		var article = { title : articleTitle, subTitle: 'ArticleSubTitle', content : 'ArticleContent' };
		return article;
	};

	var cleanFileTable = function (done) {
		var pool =  mysql.createPool(databaseConfiguration);

		pool.getConnection(function(err, connection) {
		  	connection.query("delete from file;",  function(error, rows, fields){
			  	connection.query("delete from article;",  function(error, rows, fields){
			  		done();
			  	});
		  	});
		  	connection.release();
		});
	};

    beforeEach(function (done) {
 		cleanFileTable(done);
    });

    afterEach(function (done) {
    	cleanFileTable(done);
    });

    describe('insertFile()', function() {

        it('Adds correctly file to db', function (done) {
			// SETUP
			var articleRepository = new ArticleRepository(databaseConfiguration);
			var fileRepository = new FileRepository(databaseConfiguration);
			var article = getArticleJson();
			var file = getFileJson();

			// ASSERT
            var assertionFunction = function(error, result){
            	expect(error).to.be.null;
				expect(result.affectedRows).to.be.equal(1);
				expect(file.id).not.to.undefined;
				done();
			};

            // EXERCISE
            articleRepository.insertArticle(article, function () {
            	file.articleId = article.id;
            	fileRepository.insertFile(file, assertionFunction);
            });
        });
    });

	describe('deleteFile()', function() {

        it('Deletes correctly file on db', function (done) {
			// SETUP
			var articleRepository = new ArticleRepository(databaseConfiguration);
			var fileRepository = new FileRepository(databaseConfiguration);
            var file = getFileJson();
			var article = getArticleJson();

			// EXERCISE
			var excerciseFunction = function(err, result){
				fileRepository.deleteFileById(result.insertId, assertionFunction)
			};

            // ASSERT
			var assertionFunction = function (error, result) {
				expect(error).to.be.null;
				expect(result.affectedRows).to.be.equal(1);
				done();
			};

			// RUN TEST
			articleRepository.insertArticle(article, function () {
				file.articleId = article.id;
				fileRepository.insertFile(file, excerciseFunction);
			});
    	});
    });

	describe('getArticleFiles()', function() {

	    it('Gets correctly all files on db', function (done) {
			// SETUP
			var articleRepository = new ArticleRepository(databaseConfiguration);
			var fileRepository = new FileRepository(databaseConfiguration);
			var firstFile = getFileJson("First Name");
			var secondFile = getFileJson("Second Name");
			var article = getArticleJson();

			// EXERCISE
			var excerciseFunction = function(err, result){
				fileRepository.getArticleFiles(article.id, assertionFunction)
			};

	        // ASSERT
			var assertionFunction = function (error, result) {
				expect(error).to.be.null;
				expect(result.length).to.be.equal(2);
				expect(result[0].fileName).to.be.equal(secondFile.fileName);
				expect(result[1].fileName).to.be.equal(firstFile.fileName);
				done();
			};

			// RUN TEST
			articleRepository.insertArticle(article, function () { 
				firstFile.articleId = article.id;
				secondFile.articleId = article.id;
				fileRepository.insertFile(firstFile, function () {
					fileRepository.insertFile(secondFile, excerciseFunction);				
				});
			});
	    });

		it('Gets correctly an empty list if that article has no files on db', function (done) {
			// SETUP
			var articleRepository = new ArticleRepository(databaseConfiguration);
			var fileRepository = new FileRepository(databaseConfiguration);
			var firstFile = getFileJson("First Name");
			var secondFile = getFileJson("Second Name");
			var article = getArticleJson();

			// EXERCISE
			var excerciseFunction = function(err, result){
				fileRepository.getArticleFiles(-19009, assertionFunction)
			};

	        // ASSERT
			var assertionFunction = function (error, result) {
				expect(error).to.be.null;
				expect(result.length).to.be.equal(0);
				done();
			};

			// RUN TEST
			articleRepository.insertArticle(article, function () { 
				firstFile.articleId = article.id;
				secondFile.articleId = article.id;
				fileRepository.insertFile(firstFile, function () {
					fileRepository.insertFile(secondFile, excerciseFunction);				
				});
			});
	    });
	});
});