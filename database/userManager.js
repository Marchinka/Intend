module.exports = {
	extend: function (req, res) {
		res.manageUsernameCookie = function (user) {
			if (!user) {
				res.clearCookie('username');
				return;
			}
		    if (user.username) {
		      	var username = user.username;
		    	res.cookie('username', { username: username });
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