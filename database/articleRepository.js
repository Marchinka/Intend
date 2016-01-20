var mysql =  require('mysql');

module.exports = function (databaseConfiguration) {
	var self = this;

	self.databaseConfiguration = databaseConfiguration;

	self.getArticleById = function (id, callback) {
		var pool =  mysql.createPool(databaseConfiguration);
		pool.getConnection(function(err, connection) {
			if (!connection) {
				throw new Error("Error during connection");
			}
			connection.query('SELECT id, title, subTitle, content FROM article WHERE id = ?', id, function(err, result, fields) {
    			if (!result || result.length === 0) {
		  			callback(err, null);
    			}
		  		callback(err, result[0]);
			});
		  	connection.release();
		});
	};

	self.getArticles = function (callback) {
		var pool =  mysql.createPool(databaseConfiguration);
		pool.getConnection(function(err, connection) {
			if (!connection) {
				throw new Error("Error during connection");
			}
			connection.query('SELECT id, title, subTitle, content FROM article ORDER BY id DESC', function(err, rows, fields) {
		  		callback(err, rows);
			});
		  	connection.release();
		});
	};

	self.deleteArticleById = function (id, callback) {
		var pool =  mysql.createPool(databaseConfiguration);
		pool.getConnection(function(err, connection) {
			if (!connection) {
				throw new Error("Error during connection");
			}
			connection.query('DELETE FROM article WHERE id = ?', id, function(err, result) {
		  		callback(err, result);
			});
		  	connection.release();
		});
	};

	self.insertArticle = function (article, callback) {
		var pool =  mysql.createPool(databaseConfiguration);
		pool.getConnection(function(err, connection) {
			if (!connection) {
				throw new Error("Error during connection");
			}
			connection.query('INSERT INTO article SET ?', article, function(err, result) {
				if (!err) {
					article.id = result.insertId;
				}
		  		callback(err, result);
			});
		  	connection.release();
		});
	};

	self.updateArticle = function (article, callback) {
		var pool =  mysql.createPool(databaseConfiguration);
		pool.getConnection(function(err, connection) {
			if (!connection) {
				throw new Error("Error during connection");
			}
			connection.query('UPDATE article SET ? WHERE id = ?', [article, article.id], function(err, result) {
				if (!err) {
					article.id = result.insertId;
				}
		  		callback(err, result);
			});
		  	connection.release();
		});
	};
}