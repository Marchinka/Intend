var React = require('react');
var ReactDOM = require('react-dom');

module.exports =  React.createClass({
    render: function() {
      return (
        <div className="col-md-4">
          <h2>{this.props.name}</h2>
          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
          <p><a className="btn btn-default" href="#" role="button">View details &raquo;</a></p>
        </div>
      )
    }
});