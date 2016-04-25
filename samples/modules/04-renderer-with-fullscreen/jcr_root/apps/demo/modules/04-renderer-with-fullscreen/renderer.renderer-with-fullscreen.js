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

ContextHub.console.log(ContextHub.Shared.timestamp(), '[loading] contexthub.module.demo.04-renderer-with-fullscreen - renderer.renderer-with-fullscreen.js');

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
        icon: 'coral-Icon--history',

        /* module title */
        title: 'Renderer With Fullscreen',

        /* module is clickable */
        clickable: true,

        /* indicates whether fullscreen mode is available */
        fullscreen: true,

        /* where is data stored? */
        list: '/04-persisted-jsonp-store',

        /* indicates that items should be editable */
        listType: 'input',

        /* what can be edited? */
        editable: {
            key: '/04-persisted-jsonp-store',

            /* list of disabled properties */
            disabled: [
            ],

            /* list of hidden properties */
            hidden: [
            ]
        },

        /* store mappings */
        storeMapping: {
            myStore: '04-persisted-jsonp-store'
        },

        /* module template */
        template:
            '<p>{{i18n "With Fullscreen"}}</p>' +
            '<p>{{myStore.title}}'
    };

    TestModule.prototype.onFullscreenClicked = function(module, event, variant) {
        var config = $.extend(true, {}, this.defaultConfig, module.config);

        /* create a fullscreen container */
        var id = 'fullscreen-view';
        $('#' + id).remove();

        /* create buttons */
        var cancelButton = $('<i/>').addClass('coral-Icon coral-Icon--close coral-Icon--sizeS u-coral-pullRight').attr('title', 'Cancel');
        var confirmButton = $('<i/>').addClass('coral-Icon coral-Icon--check coral-Icon--sizeS u-coral-pullRight').attr('title', 'Confirm');

        /* create title */
        var titleBar = $('<nav/>')
            .addClass('coral-Wizard-nav coral--dark contexthub-fullscreen-toolbar')
            .append(
                $('<span class="u-coral-pullLeft title"/>').text('Fullscreen view'),
                confirmButton,
                cancelButton
            );

        /* create page body */
        var pageBody = $('body');
        var calcPrefix = /webkit/.test(window.navigator.userAgent.toLowerCase()) ? '-webkit-' : '';

        /* create content */
        var content = $('<div/>')
            .addClass('map')
            .css('height', calcPrefix + 'calc(100% - 38px)')
            .append($('<div/>').addClass('coral-Wait coral-Wait--center coral-Wait--large'));

        /* create page container */
        var container = $('<div/>')
            .addClass('contexthub-fullscreen fade-out')
            .attr('id', id)
            .append(
                titleBar,
                content
            );

        /* fade-in */
        window.setTimeout(function() {
            container.removeClass('fade-out');
        }, 16 * 3);

        ContextHub.UI.Container.fullscreen(true);
        pageBody.addClass('keep-full-screen');
        container.prependTo(pageBody);

        var fadeOut = function() {
            container.addClass('fade-out');

            /* turn off fullscreen once transition is done */
            window.setTimeout(function() {
                container.remove();
                ContextHub.UI.Container.fullscreen(false);
                pageBody.removeClass('keep-full-screen');
            }, 300);
        };

        /* cancel */
        cancelButton.on('click', fadeOut);

        /* confirm button */
        confirmButton.on('click', function() {
            /* some actions here */

            /* close fullscreen view */
            fadeOut();
        });
    };

    TestModule.prototype.getPopoverContent = function(module, popoverVariant, configOverride) {
        module.config = $.extend(true, {}, this.defaultConfig, module.config);
        return this.uber('getPopoverContent', module);
    };

    /* register module renderer */
    ContextHub.UI.ModuleRenderer('demo.04-renderer-with-fullscreen', new TestModule());

}(ContextHubJQ));
