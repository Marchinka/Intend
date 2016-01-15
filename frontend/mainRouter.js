var $ = require('jquery');
var Backbone = require("backbone");

module.exports = Backbone.Router.extend({
    routes: {
        '' : 'articles',
        'Articles' : 'articles'
    },
    articles: function () {
        alert("articles");
    }
});