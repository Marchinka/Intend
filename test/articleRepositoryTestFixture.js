var chai = require('chai'), spies = require('chai-spies');
var _ = require("underscore");
chai.use(spies);
var expect = chai.expect;
var FileRepository = require("../database/fileRepository");
var ArticleRepository = require("../database/articleRepository");
var mysql =  require('mysql');
var databaseConfiguration = require("./../database/databaseConfig.js");

describe('Article Repository', function() {

	var cleanArticleTable = function (done) {
		var pool =  mysql.createPool(databaseConfiguration);

		pool.getConnection(function(err, connection) {
		  	connection.query("delete from file",  function(error, rows, fields){
			  	connection.query("delete from article",  function(error, rows, fields){
			  		done();
			  	});
		  	});
		  	connection.release();
		});
	};

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

    beforeEach(function (done) {
 		cleanArticleTable(done);
    });

    afterEach(function (done) {
    	cleanArticleTable(done);
    });

    describe('insertArticle()', function() {

        it('Adds correctly article to db', function (done) {
			// SETUP
			var articleRepository = new ArticleRepository(databaseConfiguration);
            var article = { title : 'ArticleTitle', subTitle: 'ArticleSubTitle', content : 'ArticleContent' };

			// ASSERT
            var assertionFunction = function(error, result){
            	expect(error).to.be.null;
				expect(result.affectedRows).to.be.equal(1);
				expect(article.id).not.to.undefined;
				done();
			};

            // EXERCISE
			articleRepository.insertArticle(article, assertionFunction);
        });
    });

	describe('updateArticle()', function() {

        it('Updates correctly article on db', function (done) {
			// SETUP
			var articleRepository = new ArticleRepository(databaseConfiguration);
            var article = { title : 'ArticleTitle', subTitle: 'ArticleSubTitle', content : 'ArticleContent' };

			// EXERCISE
			var excerciseFunction = function(err, result){
				var articleOnDb = article;
				articleOnDb.title = "newTitle";
				articleRepository.updateArticle(articleOnDb, assertionFunction)
			};

            // ASSERT
			var assertionFunction = function (error, result) {
				expect(error).to.be.null;
				expect(result.affectedRows).to.be.equal(1);
				done();
			};

			// RUN TEST
			articleRepository.insertArticle(article, excerciseFunction);
    	});
    });

	describe('deleteArticle()', function() {

        it('Deletes correctly article on db', function (done) {
			// SETUP
			var articleRepository = new ArticleRepository(databaseConfiguration);
            var article = { title : 'ArticleTitle', subTitle: 'ArticleSubTitle', content : 'ArticleContent' };

			// EXERCISE
			var excerciseFunction = function(err, result){
				articleRepository.deleteArticleById(result.insertId, assertionFunction)
			};

            // ASSERT
			var assertionFunction = function (error, result) {
				expect(error).to.be.null;
				expect(result.affectedRows).to.be.equal(1);
				done();
			};

			// RUN TEST
			articleRepository.insertArticle(article, excerciseFunction);
    	});
    });

	describe('getArticleById()', function() {

        it('Gets correctly article on db', function (done) {
			// SETUP
			var articleRepository = new ArticleRepository(databaseConfiguration);
			var fileRepository = new FileRepository(databaseConfiguration);
            var article = { title : 'ArticleTitle', subTitle: 'ArticleSubTitle', content : 'ArticleContent' };
            var file = getFileJson();

			// EXERCISE
			var excerciseFunction = function(err, result){
				articleRepository.getArticleById(article.id, assertionFunction)
			};

            // ASSERT
			var assertionFunction = function (error, result) {
				expect(error).to.be.null;
				expect(result).not.to.be.null;
				expect(result.title).to.be.equal(article.title);
				expect(result.subTitle).to.be.equal(article.subTitle);
				expect(result.content).to.be.equal(article.content);
				expect(result.files.length).to.be.equal(1);
				expect(result.files[0].fileName).to.be.equal(file.fileName);
				done();
			};

			// RUN TEST
			articleRepository.insertArticle(article, function () {
				file.articleId = article.id;
				fileRepository.insertFile(file, excerciseFunction);	
			});
    	});
   

        it('Returns null if article is not on db', function (done) {
			// SETUP
			var articleRepository = new ArticleRepository(databaseConfiguration);
            var article = { title : 'ArticleTitle', subTitle: 'ArticleSubTitle', content : 'ArticleContent' };
            var idNotObDb = -1000;

			// EXERCISE
			var excerciseFunction = function(err, result){
				articleRepository.getArticleById(idNotObDb, assertionFunction)
			};

            // ASSERT
			var assertionFunction = function (error, result) {
				expect(error).to.be.null;
				expect(result).to.be.null;
				done();
			};

			// RUN TEST
			articleRepository.insertArticle(article, excerciseFunction);
    	});
    });

	describe('getArticles()', function() {

	    it('Gets correctly all articles on db', function (done) {
			// SETUP
			var articleRepository = new ArticleRepository(databaseConfiguration);
			var firstArticle = { title : 'FirstArticleTitle', subTitle: 'ArticleSubTitle', content : 'ArticleContent' };
			var secondArticle = { title : 'SecondArticleTitle', subTitle: 'ArticleSubTitle', content : 'ArticleContent' };

			// EXERCISE
			var excerciseFunction = function(err, result){
				articleRepository.getArticles(assertionFunction)
			};

	        // ASSERT
			var assertionFunction = function (error, result) {
				expect(error).to.be.null;
				expect(result.length).to.be.equal(2);
				expect(result[0].title).to.be.equal(secondArticle.title);
				expect(result[1].title).to.be.equal(firstArticle.title);
				done();
			};

			// RUN TEST
			articleRepository.insertArticle(firstArticle, function () {
				articleRepository.insertArticle(secondArticle, excerciseFunction);				
			});
	    });
	});
});