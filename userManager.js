module.exports = {
	extend: function (res) {
		res.manageUsernameCookie = function (user) {
		    if (user && user.username) {
		      var username = user.username;
		          this.cookie('username', { username: username });
		    } else {
		      this.clearCookie('username');
		    }
		  };
	}
}