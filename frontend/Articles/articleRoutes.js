var ArticleCollectionView = require("./articleCollectionView.js");
var ArticleFormView = require("./articleFormView.js");
var ArticleDetailView = require("./articleDetailView.js");

module.exports = [
	{ routeUrl: 'Articles/Update/:id', view: ArticleFormView },
	{ routeUrl: 'Articles/:id', view: ArticleDetailView },
	{ routeUrl: 'Articles', view: ArticleCollectionView },
	{ routeUrl: 'Articles/Create', view: ArticleFormView }
];