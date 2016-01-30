window.$ = window.jQuery = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var React = require('react');
var ReactDOM = require('react-dom');
var HomeJumbotron  = require('./homeJumbotron.jsx');
var HomeCard  = require('./homeCard.jsx');

var obj = {
    renderHtml: function() {
      ReactDOM.render(
      <div id="home-content">
          <HomeJumbotron />
          <div className="container">
            <div className="row">
              <HomeCard name="First" />
              <HomeCard name="Second"></HomeCard>
              <HomeCard name="Thirs"></HomeCard>
            </div>
            <hr />
            <footer>
              <p>&copy; 2015 Company, Inc.</p>
            </footer>
          </div>
      </div>,
  			this.el
		  );
    },
    render: function () {
      this.renderHtml();
    }
};

module.exports = Backbone.View.extend(obj);