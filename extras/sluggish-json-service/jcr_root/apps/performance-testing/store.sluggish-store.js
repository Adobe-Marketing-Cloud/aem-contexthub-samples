/*
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2015 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */

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
