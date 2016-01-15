var TooltipCollectionView = require("./tooltipCollectionView.js");
var TooltipFormView = require("./tooltipFormView.js");

module.exports = [
	{ routeUrl: 'Tooltips(/)', view: TooltipCollectionView },
	{ routeUrl: 'Tooltips/Create', view: TooltipFormView },
	{ routeUrl: 'Tooltips/Update/:id', view: TooltipFormView }
];