var mysql =  require('mysql');

module.exports = function (databaseConfiguration) {
	var self = this;

	self.databaseConfiguration = databaseConfiguration;

	self.getArticleFiles = function (articleId, callback) {
		var pool =  mysql.createPool(databaseConfiguration);
		pool.getConnection(function(err, connection) {
			if (!connection) {
				throw new Error("Error during connection");
			}
			connection.query('SELECT id, fileName FROM file WHERE articleId = ? ORDER BY id DESC', articleId, function(err, rows, fields) {
		  		callback(err, rows);
			});
		  	connection.release();
		});
	};

	self.deleteFileById = function (id, callback) {
		var pool =  mysql.createPool(databaseConfiguration);
		pool.getConnection(function(err, connection) {
			if (!connection) {
				throw new Error("Error during connection");
			}
			connection.query('DELETE FROM file WHERE id = ?', id, function(err, result) {
		  		callback(err, result);
			});
		  	connection.release();
		});
	};

	self.insertFile = function (file, callback) {
		var pool =  mysql.createPool(databaseConfiguration);
		pool.getConnection(function(err, connection) {
			if (!connection) {
				throw new Error("Error during connection");
			}
			connection.query('INSERT INTO file SET ?', file, function(err, result) {
				if (!err) {
					file.id = result.insertId;
				}
		  		callback(err, result);
			});
		  	connection.release();
		});
	};
}