var express = require('express');
var router = express.Router();
var databaseConfiguration = require("./../database/databaseConfig.js");
var FileRepository = require("./../database/fileRepository.js");

router.handleFilePost = function(req, res, next) {
	if (!req.userHasBotPermissions()) {
		res.status(403).send("Non fare il cornuto");
		return;
	}

	var file = req.body;
	var shortFileName = file.fileName.replace(/^.*[\\\/]/, '');
	file.fileName = shortFileName;
	var fileRepository = new FileRepository(databaseConfiguration);
	fileRepository.insertFile(
		file, 
		function(err, docs){
			if (err !== null) {
				console.log(err);
				res.status(500).send(err);
			} else {
				res.send(docs);
			}
		});
};

router.post('/', router.handleFilePost);

router.handleFileGet = function(req, res, next) {
	console.log("ci siamo");
	var fileRepository = new FileRepository(databaseConfiguration);
	fileRepository.getFileById(
		req.params.id, 
		function(err, file) {
			if (err !== null) {
				res.status(500).send(err);
			} else {
				var filename = file.fileName;
				var content = file.bytes;
  				res.attachment(filename);
  				res.end(content, 'UTF-8');
			}
	    });
};

router.get('/:id', router.handleFileGet);

router.handleFileDelete = function(req, res, next) {
	if (!req.userHasBotPermissions()) {
		res.status(403).send("Non fare il cornuto");
		return;
	}

	var fileRepository = new FileRepository(databaseConfiguration);
	fileRepository.deleteFileById(
		req.params.id, 
		function(err, doc) {
			if (err !== null) {
				res.status(500).send(err);
			}else {
				res.send(doc);
			}
		});
};

router.delete('/:id', router.handleFileDelete);

module.exports = router;