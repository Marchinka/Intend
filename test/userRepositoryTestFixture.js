var chai = require('chai'), spies = require('chai-spies');
var _ = require("underscore");
chai.use(spies);
var expect = chai.expect;
var UserRepository = require("../database/userRepository");
var testUrl = "mongodb://localhost:27017/intendTest";
var MongoClient = require("mongodb").MongoClient;
var mysql =  require('mysql');
var databaseConfiguration = require("./../database/databaseConfig.js");

describe('User Repository', function() {

	var cleanUserTable = function (done) {
		var pool =  mysql.createPool(databaseConfiguration);

		pool.getConnection(function(err, connection) {
		  	connection.query("delete from user",  function(error, rows, fields){
		  		if(err)	{
		  			throw error;
		  		}
		  		done();
		  	});
		  	connection.release();
		});
	};

    beforeEach(function (done) {
		cleanUserTable(done);
    });

    afterEach(function (done) {
    	cleanUserTable(done);
    });

    describe('getUserByUserName()', function() {

        it('Gets correctly user on db', function (done) {
			// SETUP
			var userRepository = new UserRepository(databaseConfiguration);
            var user = { username : 'username', password: 'password', hasBotPermissions: true };

			// EXERCISE
			var excerciseFunction = function(err, result){
				userRepository.getUserByUserName(user.username, assertionFunction)
			};

            // ASSERT
			var assertionFunction = function (error, result) {
				expect(error).to.be.null;
				expect(result).not.to.be.null;
				expect(result.username).to.be.equal(user.username);
				expect(result.hasBotPermissions).to.be.equal(user.hasBotPermissions);
				expect(result.password).to.be.equal(user.password);
				done();
			};

			// RUN TEST
			userRepository.insertUser(user, excerciseFunction);
    	});
   

        it('Returns null if user is not on db', function (done) {
			// SETUP
			var userRepository = new UserRepository(databaseConfiguration);
            var user = { title : 'UserTitle', subTitle: 'UserSubTitle', content : 'UserContent' };
            var usernameNotObDb = "ZOZOZOZOOZ";

			// EXERCISE
			var excerciseFunction = function(err, doc){
				userRepository.getUserByUserName(usernameNotObDb, assertionFunction)
			};

            // ASSERT
			var assertionFunction = function (error, result) {
				expect(error).to.be.null;
				expect(result).to.be.null;
				done();
			};

			// RUN TEST
			userRepository.insertUser(user, excerciseFunction);
    	});
    });

	describe('insertUser()', function() {

        it('Adds correctly user to db', function (done) {
			// SETUP
			var userRepository = new UserRepository(databaseConfiguration);
            var user = { username : 'Name', password: 'Password' };

			// ASSERT
            var assertionFunction = function(error, result){
            	expect(error).to.be.null;
				expect(result.affectedRows).to.be.equal(1);
				done();
			};

            // EXERCISE
			userRepository.insertUser(user, assertionFunction);
        });

        it('Returns error if user is already on db', function (done) {
			// SETUP
			var userRepository = new UserRepository(databaseConfiguration);
            var user = { username : 'Name', password: 'Password' };

			// EXERCISE
			var excerciseFunction = function(err, doc){
				userRepository.insertUser(user, assertionFunction)
			};

			// ASSERT
			var assertionFunction = function (error, result) {
				expect(error).not.to.be.null;
				done();
			};

			// RUN TEST
			userRepository.insertUser(user, excerciseFunction);
    	});
    });

	describe('getUserById()', function() {

        it('Gets correctly user on db', function (done) {
			// SETUP
			var userRepository = new UserRepository(databaseConfiguration);
            var user = { username : 'username', password: 'password', hasBotPermissions: true };

			// EXERCISE
			var excerciseFunction = function(err, result){
				userRepository.getUserById(result.insertId, assertionFunction)
			};

            // ASSERT
			var assertionFunction = function (error, result) {
				expect(error).to.be.null;
				expect(result).not.to.be.null;
				expect(result.username).to.be.equal(user.username);
				expect(result.hasBotPermissions).to.be.equal(user.hasBotPermissions);
				expect(result.password).to.be.undefined;
				done();
			};

			// RUN TEST
			userRepository.insertUser(user, excerciseFunction);
    	});
   

        it('Returns null if user is not on db', function (done) {
			// SETUP
			var userRepository = new UserRepository(databaseConfiguration);
            var user = { title : 'UserTitle', subTitle: 'UserSubTitle', content : 'UserContent' };
            var idNotObDb = -100;

			// EXERCISE
			var excerciseFunction = function(err, doc){
				userRepository.getUserById(idNotObDb, assertionFunction)
			};

            // ASSERT
			var assertionFunction = function (error, result) {
				expect(error).to.be.null;
				expect(result).to.be.null;
				done();
			};

			// RUN TEST
			userRepository.insertUser(user, excerciseFunction);
    	});
    });
});