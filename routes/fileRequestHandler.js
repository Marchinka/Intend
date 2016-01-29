var express = require('express');
var router = express.Router();
var databaseConfiguration = require("./../database/databaseConfig.js");
var FileRepository = require("./../database/fileRepository.js");

router.handleArticlePost = function(req, res, next) {
	if (!req.userHasBotPermissions()) {
		res.status(403).send("Non fare il cornuto");
		return;
	}

	var file = req.body;
	var shortFileName = file.fileName.replace(/^.*[\\\/]/, '');
	file.fileName = shortFileName;

	console.log(JSON.stringify(file));
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

router.post('/', router.handleArticlePost);

module.exports = router;
