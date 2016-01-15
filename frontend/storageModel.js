var $ = require('jquery');
var _ = require("underscore");
var Backbone = require("backbone");

module.exports = function () {
    var modelFunction = Backbone.Model.extend({
        initialize: function() {
            this.on('change', this.save, this);
        },
        // getStorageId: function () {
        //     if (!this.storageId) {
        //         throw error("storageId not defined");
        //     }
        //     return this.storageId;
        // },
        fetch: function() {
            this.set({username: "DUMMY"});
            // var item = storage.getItem(this.getStorageId());
            // console.log(itemJson);
            // var object = JSON.parse(itemJson);
            // console.log(object);
            // this.set(object);
        },
        save: function(attributes) {
           // storage.setItem(this.getStorageId(), JSON.stringify(this.toJSON()));
        },
        isEmpty: function() {
            return (_.size(this.attributes) <= 1);
        }
    });
    return modelFunction;
};