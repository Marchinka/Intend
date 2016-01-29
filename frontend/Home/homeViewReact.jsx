window.$ = window.jQuery = require('jquery');
var Backbone = require("backbone");
var _ = require("underscore");
var fs = require("fs");
var React = require('react');
var ReactDOM = require('react-dom');
var htmlTemplate = fs.readFileSync("frontend/Home/home.html", 'utf8');

var obj = {
    template: _.template(htmlTemplate),
    renderHtml: function() {
      ReactDOM.render(
      <div id="home-content">
          <div className="jumbotron">
            <div className="container">
              <h1>Home Page with React</h1>
              <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
              <p><a className="btn btn-warning btn-lg" href="#" role="button">Learn more &raquo;</a></p>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h2>Heading</h2>
                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
              </div>
              <div className="col-md-4">
                <h2>Heading</h2>
                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
             </div>
              <div className="col-md-4">
                <h2>Heading</h2>
                <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
              </div>
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
