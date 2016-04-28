ContextHub.console.log(ContextHub.Shared.timestamp(), '[loading] contexthub.store.aem.performance-testing - store.sluggish-store.js');

(function($) {
    'use strict';

    /* default config */
    var defaultConfig = {
        service: {
            jsonp: false,
            timeout: 5000,
            path: '${variable:ContextHub.Paths.CQ_CONTEXT_PATH}/content/performance-testing/turtle.json',
            synchronous: true,
            params: {
                message: 'hello, i am a sluggish store with a reply between 1s and 5s',
                delayMin: 1000,
                delayMax: 5000
            }
        }
    };

    /**
     * Performance testing store.
     *
     * @extends ContextHub.Store.PersistedJSONPStore
     * @param {String} name - store name
     * @param {Object} config - config
     * @constructor
     */
    var PerformanceTesting = function(name, config) {
        this.config = $.extend(true, {}, defaultConfig, config);
        this.init(name, this.config);
        this.queryService(false);
    };

    /* inherit from ContextHub.Store.PersistedJSONPStore */
    ContextHub.Utils.inheritance.inherit(PerformanceTesting, ContextHub.Store.PersistedJSONPStore);

    /**
     * Success handler.
     *
     * @param {Object} response - service response
     */
    PerformanceTesting.prototype.successHandler = function(response) {
        this.setItem('/', response || {});
    };

    /* register store candidate */
    ContextHub.Utils.storeCandidates.registerStoreCandidate(PerformanceTesting, 'aem.performance-testing', 0);

}(ContextHubJQ));
