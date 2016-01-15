var chai = require('chai'), spies = require('chai-spies');
var _ = require("underscore");
chai.use(spies);
var expect = chai.expect;
var TooltipRepository = require("../database/tooltipRepository");
var mysql =  require('mysql');
var databaseConfiguration = require("./../database/databaseConfig.js");

describe('Tooltip Repository', function() {

	var cleanTooltipTable = function (done) {
		var pool =  mysql.createPool(databaseConfiguration);

		pool.getConnection(function(err, connection) {
		  	connection.query("delete from tooltip",  function(error, rows, fields){
		  		if(err)	{
		  			throw error;
		  		}
		  		done();
		  	});
		  	connection.release();
		});
	};

    beforeEach(function (done) {
 		cleanTooltipTable(done);
    });

    afterEach(function (done) {
    	cleanTooltipTable(done);
    });

    describe('insertTooltip()', function() {

        it('Adds correctly tooltip to db', function (done) {
			// SETUP
			var tooltipRepository = new TooltipRepository(databaseConfiguration);
            var tooltip = { tooltipKey : 'TooltipKey', description: 'TooltipDescription' };

			// ASSERT
            var assertionFunction = function(error, result){
            	expect(error).to.be.null;
				expect(result.affectedRows).to.be.equal(1);
				expect(tooltip.id).not.to.undefined;
				done();
			};

            // EXERCISE
			tooltipRepository.insertTooltip(tooltip, assertionFunction);
        });
    });

	describe('updateTooltip()', function() {

        it('Updates correctly tooltip on db', function (done) {
			// SETUP
			var tooltipRepository = new TooltipRepository(databaseConfiguration);
            var tooltip = { tooltipKey : 'TooltipKey', description: 'TooltipDescription' };

			// EXERCISE
			var excerciseFunction = function(err, result){
				var tooltipOnDb = tooltip;
				tooltipOnDb.description = "new description";
				tooltipRepository.updateTooltip(tooltipOnDb, assertionFunction)
			};

            // ASSERT
			var assertionFunction = function (error, result) {
				expect(error).to.be.null;
				expect(result.affectedRows).to.be.equal(1);
				done();
			};

			// RUN TEST
			tooltipRepository.insertTooltip(tooltip, excerciseFunction);
    	});
    });

	describe('deleteTooltip()', function() {

        it('Deletes correctly tooltip on db', function (done) {
			// SETUP
			var tooltipRepository = new TooltipRepository(databaseConfiguration);
            var tooltip = { tooltipKey : 'TooltipKey', description: 'TooltipDescription' };

			// EXERCISE
			var excerciseFunction = function(err, result){
				tooltipRepository.deleteTooltipById(result.insertId, assertionFunction)
			};

            // ASSERT
			var assertionFunction = function (error, result) {
				expect(error).to.be.null;
				expect(result.affectedRows).to.be.equal(1);
				done();
			};

			// RUN TEST
			tooltipRepository.insertTooltip(tooltip, excerciseFunction);
    	});
    });

	describe('getTooltipById()', function() {

        it('Gets correctly tooltip on db', function (done) {
			// SETUP
			var tooltipRepository = new TooltipRepository(databaseConfiguration);
            var tooltip = { tooltipKey : 'TooltipKey', description: 'TooltipDescription' };

			// EXERCISE
			var excerciseFunction = function(err, result){
				tooltipRepository.getTooltipById(result.insertId, assertionFunction)
			};

            // ASSERT
			var assertionFunction = function (error, result) {
				expect(error).to.be.null;
				expect(result).not.to.be.null;
				expect(result.title).to.be.equal(tooltip.title);
				expect(result.subTitle).to.be.equal(tooltip.subTitle);
				expect(result.content).to.be.equal(tooltip.content);
				done();
			};

			// RUN TEST
			tooltipRepository.insertTooltip(tooltip, excerciseFunction);
    	});
   

        it('Returns null if tooltip is not on db', function (done) {
			// SETUP
			var tooltipRepository = new TooltipRepository(databaseConfiguration);
            var tooltip = { tooltipKey : 'TooltipKey', description: 'TooltipDescription' };
            var idNotObDb = -1000;

			// EXERCISE
			var excerciseFunction = function(err, result){
				tooltipRepository.getTooltipById(idNotObDb, assertionFunction)
			};

            // ASSERT
			var assertionFunction = function (error, result) {
				expect(error).to.be.null;
				expect(result).to.be.null;
				done();
			};

			// RUN TEST
			tooltipRepository.insertTooltip(tooltip, excerciseFunction);
    	});
    });

	describe('getTooltips()', function() {

	    it('Gets correctly all tooltips on db', function (done) {
			// SETUP
			var tooltipRepository = new TooltipRepository(databaseConfiguration);
			var firstTooltip = { tooltipKey : 'FirstTooltipKey', description: 'FirstTooltipDescription' };
			var secondTooltip = { tooltipKey : 'SecondTooltipKey', description: 'SecondTooltipDescription' };

			// EXERCISE
			var excerciseFunction = function(err, result){
				tooltipRepository.getTooltips(assertionFunction)
			};

	        // ASSERT
			var assertionFunction = function (error, result) {
				expect(error).to.be.null;
				expect(result.length).to.be.equal(2);
				expect(result[0].title).to.be.equal(firstTooltip.key);
				expect(result[1].title).to.be.equal(secondTooltip.key);
				done();
			};

			// RUN TEST
			tooltipRepository.insertTooltip(firstTooltip, function () {
				tooltipRepository.insertTooltip(secondTooltip, excerciseFunction);				
			});
	    });
	});
});