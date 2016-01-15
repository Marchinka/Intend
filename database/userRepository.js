var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var ObjectID = require("mongodb").ObjectID;
var mysql = require("mysql");
var databaseConfiguration = require("./databaseConfig.js");

module.exports = function (databaseConfiguration) {
	var self = this;

	self.databaseConfiguration = databaseConfiguration;

	self.getUserByUserName = function (username, callback) {
		var pool =  mysql.createPool(databaseConfiguration);
		pool.getConnection(function(err, connection) {
			if (!connection) {
				throw new Error("Error during connection");
			}
			connection.query('SELECT id, username, password, hasBotPermissions FROM user WHERE username = ?', username, function(err, result, fields) {
    			if (!result || result.length === 0) {
		  			callback(err, null);
		  			return;
    			}
    			result[0].hasBotPermissions = result[0].hasBotPermissions === 1;
		  		callback(err, result[0]);
			});
		  	connection.release();
		});
	};

	self.insertUser = function (user, callback) {
		var pool =  mysql.createPool(databaseConfiguration);
		pool.getConnection(function(err, connection) {
			if (!connection) {
				throw new Error("Error during connection");
			}
			connection.query('INSERT INTO user SET ?', user, function(err, result) {
				if (!err) {
					user.id = result.insertId;
				}
		  		callback(err, result);
			});
		  	connection.release();
		});
	};

	self.getUserById = function (id, callback) {
		var pool =  mysql.createPool(databaseConfiguration);
		pool.getConnection(function(err, connection) {
			if (!connection) {
				throw new Error("Error during connection");
			}
			connection.query('SELECT username, hasBotPermissions FROM user WHERE id = ?', id, function(err, result, fields) {
    			if (!result || result.length === 0) {
		  			callback(err, null);
		  			return;
    			}
    			result[0].hasBotPermissions = result[0].hasBotPermissions === 1;
		  		callback(err, result[0]);
			});
		  	connection.release();
		});
	};
}