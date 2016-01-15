var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var ObjectID = require("mongodb").ObjectID;
var databaseConfiguration = require("./../database/databaseConfig.js");
var ArticleRepository = require("./../database/articleRepository.js");
var ArticleValidator = require("./../database/articleValidator");

router.handleArticlesGet = function(req, res, next) {
	var articleRepository = new ArticleRepository(databaseConfiguration);
	articleRepository.getArticles(
		function(err, docs) {
			if (err !== null) {
				res.status(500).send(err);
			} else {
				res.send(docs);
			}
	    });
};

router.get('/', router.handleArticlesGet);

router.handleArticleGet = function(req, res, next) {
	var articleRepository = new ArticleRepository(databaseConfiguration);
	articleRepository.getArticleById(
		req.params.id, 
		function(err, docs) {
			if (err !== null) {
				res.status(500).send(err);
			} else {
				res.send(docs);
			}
	    });
};

router.get('/:id', router.handleArticleGet);

router.handleArticleDelete = function(req, res, next) {
	if (!req.userHasBotPermissions()) {
		res.status(403).send("Non fare il cornuto");
		return;
	}

	var articleRepository = new ArticleRepository(databaseConfiguration);
	articleRepository.deleteArticleById(
		req.params.id, 
		function(err, doc) {
			if (err !== null) {
				res.status(500).send(err);
			}else {
				res.send(doc);
			}
		});
};

router.delete('/:id', router.handleArticleDelete);

router.handleArticlePost = function(req, res, next) {
	if (!req.userHasBotPermissions()) {
		res.status(403).send("Non fare il cornuto");
		return;
	}

	var article = req.body;
	var articleValidator = new ArticleValidator();
	var validatonErrors = articleValidator.validateServerSide(article, {});
	if (validatonErrors) {
		res.status(500).send(validatonErrors);
		return;
	}

	var articleRepository = new ArticleRepository(databaseConfiguration);
	articleRepository.insertArticle(
		article, 
		function(err, docs){
			if (err !== null) {
				res.status(500).send(err);
			}else {
				res.send(docs);
			}
		});
};

router.post('/', router.handleArticlePost);

router.handleArticlePut = function(req, res, next) {
	if (!req.userHasBotPermissions()) {
		res.status(403).send("Non fare il cornuto");
		return;
	}

	var article = req.body;
	var articleValidator = new ArticleValidator();
	var validatonErrors = articleValidator.validateServerSide(article, {});
	if (validatonErrors) {
		res.status(500).send(validatonErrors);
		return;
	} 

	var articleRepository = new ArticleRepository(databaseConfiguration);
	articleRepository.updateArticle(
		article, 
		function(err, docs){
			if (err !== null) {
				res.status(500).send(err);
			}else {
				res.send(docs);
			}
		});
};

router.put('/:id', router.handleArticlePut);

module.exports = router;
