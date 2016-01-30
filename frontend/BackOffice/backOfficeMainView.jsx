window.$ = window.jQuery = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var React = require('react');
var ReactDOM = require('react-dom');

var obj = {
    renderHtml: function() {
      ReactDOM.render(
        <div id="back-office-content">
    			<h1>Intend Back Office</h1>
    			<p>
        			<a href="/Tooltips" data-internal="true">Tooltips</a>
    			</p>
			  </div>,
  			this.el
		  );
    },
    render: function () {
      this.renderHtml();
    }
};

module.exports = Backbone.View.extend(obj);