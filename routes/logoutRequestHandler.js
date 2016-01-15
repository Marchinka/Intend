var express = require('express');
var router = express.Router();

router.handlePost = function(req, res, next) {
	req.logOut();
    res.manageUsernameCookie();
	res.send({ message: "Sei uno stronzo"});
};

router.post('/', router.handlePost);

module.exports = router;
