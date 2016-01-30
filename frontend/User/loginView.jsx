window.$ = window.jQuery = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var errorBinder = require("../errorBinder.js");
var UserModel = require("./userModel.js");
var React = require('react');
var ReactDOM = require('react-dom');

var LoginForm = React.createClass({
    validateForm: function (e) {
        var userToValidate = { username: this.state.username, password: this.state.password };
        var errors = this.props.userModel.validateLogin(userToValidate);
        if(errors) {
            errorBinder.bindErrors(errors);
            return false;
        }
        errorBinder.removeAllErrors();
        return true;
    },
    handleSubmit: function (e) {
        e.preventDefault();
        e.stopPropagation();
        var valid = this.validateForm();
        if (valid) {
            return;
        }
        var credentials = { username: this.state.username, password: this.state.password };
        this.props.userModel.login(
            credentials,
            function() {
                Backbone.history.navigate("/Home", { trigger: true });
            },
            function(response) {
                if (response.status === 500 || response.status === 401) {
                    var errors = JSON.parse(response.responseText);
                    errorBinder.bindErrors(errors);
                }
            });
        
    },
    render: function() {
        return <form role="form" onSubmit={ this.handleSubmit }>
        <div className="form-group">
            <label for="username">User Name</label>
            <input value={this.state.username} placeholder="User Name" type="text" className="form-control" id="username" name="username" />
            <span className="help-block"></span>
        </div>
        <div className="form-group">
            <label for="password">Password</label>
            <input value={this.state.password} placeholder="Password" type="password" className="form-control" id="password" name="password" />
            <span className="help-block"></span>
        </div>
        <input type="submit" className="btn btn-default" value="Login" />
    </form>;
    }
});

module.exports = Backbone.View.extend({
    initialize: function (attrs) {
        this.model = new UserModel();
    },
    render: function(){
        ReactDOM.render(<LoginForm userModel = { this.model } />, this.el);
    }
});
