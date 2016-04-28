ContextHub.console.log(ContextHub.Shared.timestamp(), '[loading] contexthub.store.demo.01-session-store - store.session-store.js');

(function($) {
    'use strict';

    /* default config */
    var defaultConfig = {
        /* initial values to set in store's storage */
        initialValues: {
            name: 'Alison Parker',
            age: 22
        }
    };

    /**
     * Store implementation.
     *
     * @extends ContextHub.Store.SessionStore
     * @param {String} name - store name
     * @param {Object} config - config
     * @constructor
     */
    var TestStore = function(name, config) {
        this.config = $.extend(true, {}, defaultConfig, config);
        this.init(name, this.config);
    };

    /* inherit from ContextHub.Store.SessionStore */
    ContextHub.Utils.inheritance.inherit(TestStore, ContextHub.Store.SessionStore);

    /**
     * Returns name.
     *
     * @return {String}
     */
    TestStore.prototype.getName = function() {
        return this.getItem('name') || '[unknown]';
    };

    /**
     * Returns age.
     *
     * @return {Number}
     */
    TestStore.prototype.getAge = function() {
        return this.getItem('age') || '[unknown]';
    };

    /* register store candidate */
    ContextHub.Utils.storeCandidates.registerStoreCandidate(TestStore, 'demo.01-session-store', 0);

}(ContextHubJQ));
