var mysql =  require('mysql');

module.exports = function (databaseConfiguration) {
	var self = this;

	self.databaseConfiguration = databaseConfiguration;

	self.getTooltipById = function (id, callback) {
		var pool =  mysql.createPool(databaseConfiguration);
		pool.getConnection(function(err, connection) {
			if (!connection) {
				throw new Error("Error during connection");
			}
			connection.query('SELECT id, tooltipKey, description FROM tooltip WHERE id = ?', id, function(err, result, fields) {
    			if (!result || result.length === 0) {
		  			callback(err, null);
    			}
		  		callback(err, result[0]);
			});
		  	connection.release();
		});
	};

	self.getTooltips = function (callback) {
		var pool =  mysql.createPool(databaseConfiguration);
		pool.getConnection(function(err, connection) {
			if (!connection) {
				throw new Error("Error during connection");
			}
			connection.query('SELECT id, tooltipKey, description FROM tooltip', function(err, rows, fields) {
		  		callback(err, rows);
			});
		  	connection.release();
		});
	};

	self.deleteTooltipById = function (id, callback) {
		var pool =  mysql.createPool(databaseConfiguration);
		pool.getConnection(function(err, connection) {
			if (!connection) {
				throw new Error("Error during connection");
			}
			connection.query('DELETE FROM tooltip WHERE id = ?', id, function(err, result) {
		  		callback(err, result);
			});
		  	connection.release();
		});
	};

	self.insertTooltip = function (tooltip, callback) {
		var pool =  mysql.createPool(databaseConfiguration);
		pool.getConnection(function(err, connection) {
			if (!connection) {
				throw new Error("Error during connection");
			}
			connection.query('INSERT INTO tooltip SET ?', tooltip, function(err, result) {
				if (!err) {
					tooltip.id = result.insertId;
				}
		  		callback(err, result);
			});
		  	connection.release();
		});
	};

	self.updateTooltip = function (tooltip, callback) {
		var pool =  mysql.createPool(databaseConfiguration);
		pool.getConnection(function(err, connection) {
			if (!connection) {
				throw new Error("Error during connection");
			}
			connection.query('UPDATE tooltip SET ? WHERE id = ?', [tooltip, tooltip.id], function(err, result) {
				if (!err) {
					tooltip.id = result.insertId;
				}
		  		callback(err, result);
			});
		  	connection.release();
		});
	};
}