var mysql =  require('mysql');
var FileRepository = require("./fileRepository.js");

module.exports = function (databaseConfiguration) {
	var self = this;
	self.fileRepository = new FileRepository(databaseConfiguration);
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
		  			return;
    			} else {
	    			var article = result[0];
		    		connection.query('SELECT id, fileName FROM file WHERE articleId = ? ORDER BY id DESC', id, function(err, rows, fields) {
		    			article.files = rows;
			  			callback(err, article);
					});	
    			}
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
			connection.query('DELETE FROM file WHERE articleId = ?', id, function(err, result) {
		  		connection.query('DELETE FROM article WHERE id = ?', id, function(finalErr, finalResult) {
		  			callback(finalErr, finalResult);
				});
			});
		  	connection.release();
		});
	};

	self.insertArticle = function (article, callback) {
		var pool =  mysql.createPool(databaseConfiguration);
		delete article.files;
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
		delete article.files;
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
