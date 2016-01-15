var $ = require('jquery');
var Backbone = require("backbone");
var ExerciseMainView = require("./exerciseMainView");

module.exports = Backbone.Router.extend({
    appView: {},
    routes: {
        'Exercises' : 'exercises'
    },
    initialize: function (attrs) {
        if(attrs.appView === undefined || attrs.appView === null) {
            throw new Error("appView is not defined");
        }
        this.appView = attrs.appView;
    },
    exercises: function () {
        var self = this;
        self.appView.disposeOfMainCurrentView();
        self.appView.currentMainView = new ExerciseMainView({el: $("#app-content") });
        self.appView.currentMainView.render();
        self.appView.activateExercisesTab();
    }
});