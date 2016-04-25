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

ContextHub.console.log(ContextHub.Shared.timestamp(), '[loading] contexthub.module.demo.03-renderer-with-popover - renderer.renderer-with-popover.js');

(function($) {
    'use strict';

    /**
     * Module implementation.
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
        icon: 'coral-Icon--filter',

        /* module title */
        title: 'Renderer With Popover',

        /* module is clickable */
        clickable: true,

        /* where is data stored? */
        listReference: '/03-jsonp-store/nearby-list',

        /* indicates that item can be selected */
        listType: 'checkmark',

        /* store mappings */
        storeMapping: {
            myStore: '03-jsonp-store'
        },

        /* module template */
        template:
            '<p>{{i18n "With Popover"}}</p>' +
            '<p>{{myStore.current.place}}, {{myStore.current.city}}, {{myStore.current.country}}'
    };

    /**
     * Handles click on the list item.
     *
     * @param {Object} module - module
     * @param {Number} position - item nr
     * @param {Object} data - item data
     * @param {Object} event - event
     */
    TestModule.prototype.onListItemClicked = function(module, position, data, event) {
        var config = $.extend(true, {}, this.defaultConfig, module.config);
        var store = ContextHub.getStore(config.storeMapping.myStore);

        if (store) {
            store.setItem('current', {
                place: data.place,
                city: data.city,
                country: data.country
            });
        }
    };

    TestModule.prototype.getPopoverContent = function(module, popoverVariant, configOverride) {
        module.config = $.extend(true, {}, this.defaultConfig, module.config);
        var store = ContextHub.getStore(module.config.storeMapping.myStore);

        if (store) {
            var key = module.config.listReference;
            var myList = ContextHub.getItem(key);
            var place = store.getItem('current/place');

            $.each(myList, function(idx, item) {
                ContextHub.setItem(key + '/' + idx + '/selected', item.data.place === place);
            });

        }

        return this.uber('getPopoverContent', module);
    };

    /* register module renderer */
    ContextHub.UI.ModuleRenderer('demo.03-renderer-with-popover', new TestModule());

}(ContextHubJQ));
