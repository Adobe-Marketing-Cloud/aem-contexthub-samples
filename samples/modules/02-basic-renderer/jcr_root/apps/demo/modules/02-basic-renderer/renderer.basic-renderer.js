ContextHub.console.log(ContextHub.Shared.timestamp(), '[loading] contexthub.module.demo.02-basic-renderer - renderer.basic-renderer.js');

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
        icon: 'coral-Icon--deviceMobile',

        /* module title */
        title: 'Basic Renderer',

        /* module is clickable */
        clickable: true,

        /* where is data stored? */
        list: '/02-persisted-store',

        /* indicates that items should be editable */
        listType: 'input',

        /* what can be edited? */
        editable: {
            key: '/02-persisted-store',

            /* list of disabled properties */
            disabled: [
                '/02-persisted-store/number'
            ],

            /* list of hidden properties */
            hidden: [
            ]
        },

        /* store mappings */
        storeMapping: {
            myStore: '02-persisted-store'
        },

        /* module template */
        template:
            '<p>{{i18n "Basic Renderer"}}</p>' +
            '<p>{{myStore.name}}, {{myStore.age}}'
    };

    TestModule.prototype.getPopoverContent = function(module, popoverVariant, configOverride) {
        module.config = $.extend(true, {}, this.defaultConfig, module.config);
        return this.uber('getPopoverContent', module);
    };

    /* register module renderer */
    ContextHub.UI.ModuleRenderer('demo.02-basic-renderer', new TestModule());

}(ContextHubJQ));
