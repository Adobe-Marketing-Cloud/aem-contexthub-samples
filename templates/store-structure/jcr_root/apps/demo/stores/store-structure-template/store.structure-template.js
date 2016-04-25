/*
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2016 Adobe Systems Incorporated
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

ContextHub.console.log(ContextHub.Shared.timestamp(), '[loading] contexthub.store.demo.store-structure-template - store.structure-template.js');

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
     * Store structure template.
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
     * Sample store method.
     *
     * @return {String}
     */
    TestStore.prototype.getName = function() {
        return this.getItem('name') || '[unknown]';
    };

    /* register store candidate */
    ContextHub.Utils.storeCandidates.registerStoreCandidate(TestStore, 'demo.store-structure-template', 0);

}(ContextHubJQ));
