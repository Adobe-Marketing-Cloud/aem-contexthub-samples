ContextHub.console.log(ContextHub.Shared.timestamp(), '[loading] contexthub.store.demo.02-persisted-store - store.persisted-store.js');

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
     * @extends ContextHub.Store.PersistedStore
     * @param {String} name - store name
     * @param {Object} config - config
     * @constructor
     */
    var TestStore = function(name, config) {
        this.config = $.extend(true, {}, defaultConfig, config);
        this.init(name, this.config);

        /* setting some additional field */
        this.setItem('number', Math.random());
    };

    /* inherit from ContextHub.Store.SessionStore */
    ContextHub.Utils.inheritance.inherit(TestStore, ContextHub.Store.PersistedStore);

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
    ContextHub.Utils.storeCandidates.registerStoreCandidate(TestStore, 'demo.02-persisted-store', 0);

}(ContextHubJQ));
