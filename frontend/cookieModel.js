var $ = require('jquery');
var _ = require("underscore");
var Backbone = require("backbone");
var Cookie = require("js-cookie");

module.exports = Backbone.Model.extend({
        initialize: function() {
            this.on('change', this.save, this);
        },
        getStorageId: function () {
            if (!this.storageId) {
                throw error("storageId not defined");
            }
            return this.storageId;
        },
        fetch: function(args) {
            try {
                var biscotto = Cookie.get(this.getStorageId());
                if (!biscotto) {
                    this.clear();
                    return;
                }
                biscotto = biscotto.replace("j:", "");
                var object = JSON.parse(biscotto);
                this.set(object);
                args.success();
            } catch (e) {
                args.error();
            }
        },
        save: function(attributes) {
            Cookie.set(this.getStorageId(), JSON.stringify(this.toJSON()));
        },
        isEmpty: function() {
            return (_.size(this.attributes) <= 1);
        }
    });