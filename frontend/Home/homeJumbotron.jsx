var React = require('react');
var ReactDOM = require('react-dom');

module.exports =  React.createClass({
    render: function() {
      return (
        <div className="jumbotron">
          <div className="container">
            <h1>Home Page with React</h1>
            <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
            <p><a className="btn btn-warning btn-lg" href="#" role="button">Learn more &raquo;</a></p>
          </div>
        </div>
      )
    }
});