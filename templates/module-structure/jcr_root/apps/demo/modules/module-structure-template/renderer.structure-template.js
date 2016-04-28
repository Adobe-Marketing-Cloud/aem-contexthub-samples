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
