var $ = require('jquery');
var Backbone = require("backbone");
var HomeRouter = require("./Home/homeRouter.js");
var ArticleRouter = require("./Articles/articleRouter.js");
var ExerciseRouter = require("./Exercises/exercisesRouter.js");
var BackOfficeRouter = require("./BackOffice/backOfficeRouter.js");
var TooltipRouter = require("./Tooltips/tooltipRouter.js");
var UserRouter = require("./User/userRouter.js");

module.exports = Backbone.Router.extend({
    initialize: function (attrs) {
        if(attrs.appView === undefined || attrs.appView === null) {
            throw new Error("appView is not defined");
        }
        this.appView = attrs.appView;
    },
    startApp: function () {
        var self = this;
        self.appView.render();
        var homeRouter = new HomeRouter({ appView : self.appView });
        var articleRouter = new ArticleRouter({ appView : self.appView });
        var exerciseRouter = new ExerciseRouter({ appView : self.appView });
        var backOfficeRouter = new BackOfficeRouter({ appView : self.appView });
        var tooltipRouter = new TooltipRouter({ appView : self.appView });
        var userRouter = new UserRouter({ appView : self.appView });
        Backbone.history.start({ pushState: false });
    }
});