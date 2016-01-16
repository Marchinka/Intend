var $ = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var CookieModel = require("../cookieModel");
var config = require("../config.js");
var LoginValidator = require("../../database/loginClientSideValidator");
var loginValidator = new LoginValidator();

module.exports = CookieModel.extend({
    getLogin: function (callback) {
        $.ajax({
            url: '/login',
            type: 'GET',
            dataType: 'json'
        })
        .always(function() {
            callback();
        }); 
    },
	logout: function (callback) {
        $.ajax({
            url: '/logout',
            type: 'POST',
            dataType: 'json',
        })
        .done(function(response) {
            callback(response);
        });
	},
	login: function (credentials, successCallback, errorCallback) {
		$.ajax({
            url: '/login',
            type: 'POST',
            dataType: 'json',
            data: credentials,
        })
        .done(function(user) {
            successCallback(user);
        })
        .error(function(errors) {
            errorCallback(errors);
        });
	},
    storageId: config.userSessionStorageId,
    validateLogin: loginValidator.validateClientSide
});
