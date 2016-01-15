var fs = require("fs");
var chai = require('chai'), spies = require('chai-spies');
var _ = require("underscore");
chai.use(spies);
var expect = chai.expect;
var userManager = require("./../database/userManager");

describe('User Manager', function() {

    var MockRequest = function (){
    }
    
    var MockResponse = function (){
        this.clearCookie = function() {};
        this.cookie = function() {};
    }

    describe('Extended response managerUsernameCookie()', function() {

        it('Calls correctly clearCookie user is undefined', function () {
            // SETUP
            var req = new MockRequest();
            var res = new MockResponse();
            userManager.extend(req, res);
            var cookieSpy = chai.spy.on(res, "cookie");
            var clearSpy = chai.spy.on(res, "clearCookie");
            
            // EXERCISE
            res.manageUsernameCookie(undefined);

            // ASSERT
            expect(cookieSpy).to.not.have.been.called();
            expect(clearSpy).to.have.been.called();
        });

        it('Calls correctly clearCookie username is undefined', function () {
            // SETUP
            var req = new MockRequest();
            var res = new MockResponse();
            userManager.extend(req, res);
            var cookieSpy = chai.spy.on(res, "cookie");
            var clearSpy = chai.spy.on(res, "clearCookie");
            
            // EXERCISE
            res.manageUsernameCookie({});

            // ASSERT
            expect(cookieSpy).to.not.have.been.called();
            expect(clearSpy).to.have.been.called();
        });

        it('Calls correctly clearCookie username is defined', function () {
            // SETUP
            var req = new MockRequest();
            var res = new MockResponse();
            userManager.extend(req, res);
            var cookieSpy = chai.spy.on(res, "cookie");
            var clearSpy = chai.spy.on(res, "clearCookie");
            
            // EXERCISE
            res.manageUsernameCookie({username: 'test'});

            // ASSERT
            expect(cookieSpy).to.have.been.called();
            expect(clearSpy).to.not.have.been.called();
        });
    });

   describe('Extended request userHasBotPermissions()', function() {

        it('Returns false if user is undefined', function () {
            // SETUP
            var req = new MockRequest();
            var res = new MockResponse();
            userManager.extend(req, res);
            
            // EXERCISE
            var result = req.userHasBotPermissions();

            // ASSERT
            expect(result).to.be.false;
        });

        it('Returns false if user does not have bot permissions', function () {
            // SETUP
            var req = new MockRequest();
            req.user = {
                username: 'test'
            };
            var res = new MockResponse();
            userManager.extend(req, res);
            
            // EXERCISE
            var result = req.userHasBotPermissions();

            // ASSERT
            expect(result).to.be.false;
        });

        it('Returns false if user has bot permissions = false', function () {
            // SETUP
            var req = new MockRequest();
            req.user = {
                username: 'test', 
                hasBotPermissions: false
            };
            var res = new MockResponse();
            userManager.extend(req, res);
            
            // EXERCISE
            var result = req.userHasBotPermissions();

            // ASSERT
            expect(result).to.be.false;
        });

        it('Returns true if user has bot permissions = true', function () {
            // SETUP
            var req = new MockRequest();
            req.user = {
                username: 'test', 
                hasBotPermissions: true
            };
            var res = new MockResponse();
            userManager.extend(req, res);
            
            // EXERCISE
            var result = req.userHasBotPermissions();

            // ASSERT
            expect(result).to.be.true;
        });
    });
});
