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

ContextHub.console.log(ContextHub.Shared.timestamp(), '[loading] contexthub.module.demo.module-structure-template - renderer.structure-template.js');

(function($) {
    'use strict';

    /**
     * Module structure sample.
     *
     * @extends ContextHub.UI.BaseModuleRenderer
     * @constructor
     */
    var TestModule = function() {};

    /* inherit from ContextHub.UI.BaseModuleRenderer */
    ContextHub.Utils.inheritance.inherit(TestModule, ContextHub.UI.BaseModuleRenderer);

    /* renderer default config */
    TestModule.prototype.defaultConfig = {
        /* module icon */
        icon: 'coral-Icon--deviceMobile',

        /* module title */
        title: 'Device',

        /* module is not clickable */
        clickable: false,

        /* store mappings */
        storeMapping: {
            myStore: 'store-structure-template'
        },

        /* module template */
        template:
            '<p>{{i18n "Sample Module"}}</p>' +
            '<p>{{myStore.name}}, {{myStore.age}}'
    };

    /* register module renderer */
    ContextHub.UI.ModuleRenderer('demo.module-structure-template', new TestModule());

}(ContextHubJQ));
