module.exports = {
	extend: function (req, res) {
		res.manageUsernameCookie = function (user) {
			if (!user) {
				res.clearCookie('username');
				return;
			}
		    if (user.username) {
		      	var hasBotPermissions = user.hasBotPermissions;
		      	var username = user.username;
		    	res.cookie('username', { 
		    		username: username, 
		    		hasBotPermissions: hasBotPermissions, 
		    		maxAge: 1000 * 60 * 60 * 24 * 365 /*1 y*/, 
		    		httpOnly: true
		    	});
		    	return;
		    } else {
		    	res.clearCookie('username');
		    	return;
			}
		};

		req.userHasBotPermissions = function () {
			if (!req.user) {
				return false;
			}
		    if (req.user.hasBotPermissions) {
		      	return true;
		    } else {
		    	return false;
			}
		};
	}
}