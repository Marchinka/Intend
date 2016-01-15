var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var ObjectID = require("mongodb").ObjectID;
var url = "mongodb://localhost:27017/intend";
var TooltipRepository = require("./../database/tooltipRepository.js");
var TooltipValidator = require("./../database/tooltipValidator");
var databaseConfiguration = require("./../database/databaseConfig.js");

router.handleTooltipGet = function(req, res, next) {
	var tooltipRepository = new TooltipRepository(databaseConfiguration);
	tooltipRepository.getTooltipById(
		req.params.id, 
		function(err, docs) {
			if (err !== null) {
				res.status(500).send(err);
			} else {
				res.send(docs);
			}
	    });
};

router.get('/:id', router.handleTooltipGet);

router.handleTooltipsGet = function(req, res, next) {
	var tooltipRepository = new TooltipRepository(databaseConfiguration);
	tooltipRepository.getTooltips(
		function(err, docs) {
			if (err !== null) {
				res.status(500).send(err);
			}else {
				res.send(docs);
			}
	    });
};
router.get('/', router.handleTooltipsGet);

router.handleTooltipDelete = function(req, res, next) {
	var tooltipRepository = new TooltipRepository(databaseConfiguration);
	tooltipRepository.deleteTooltipById(
		req.params.id, 
		function(err, doc) {
			if (err !== null) {
				res.status(500).send(err);
			}else {
				res.send(doc);
			}
		});
};

router.delete('/:id', router.handleTooltipDelete);

router.handleTooltipPost = function(req, res, next) {
	var tooltip = req.body;
	var tooltipRepository = new TooltipRepository(databaseConfiguration);
	var tooltipValidator = new TooltipValidator(tooltipRepository);
	var tooltipValidator = new TooltipValidator();
	var validatonErrors = tooltipValidator.validateServerSide(tooltip, {});
	if (validatonErrors) {
		res.status(500).send(validatonErrors);
		return;
	}

	tooltipRepository.insertTooltip(
		tooltip, 
		function(err, docs){
			if (err !== null) {
				res.status(500).send(err);
			} else {
				res.send(docs);
			}
		});
};

router.post('/', router.handleTooltipPost);

router.handleTooltipPut = function(req, res, next) {
	var tooltip = req.body;
	var tooltipRepository = new TooltipRepository(databaseConfiguration);
	var tooltipValidator = new TooltipValidator(tooltipRepository);
	var validatonErrors = tooltipValidator.validateServerSide(tooltip, {});
	if (validatonErrors) {
		res.status(500).send(validatonErrors);
		return;
	}

	tooltipRepository.updateTooltip(
		tooltip, 
		function(err, docs){
			if (err !== null) {
				res.status(500).send(err);
			} else {
				res.send(docs);
			}
		});
};

router.put('/:id', router.handleTooltipPut);

module.exports = router;
