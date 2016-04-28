ContextHub.console.log(ContextHub.Shared.timestamp(), '[loading] contexthub.store.demo.04-persisted-jsonp-store - store.persisted-jsonp-store.js');

(function($) {
    'use strict';

    /* default config */
    var defaultConfig = {
        /* jsonp service configuration */
        service: {
            /* if true or name - indicates that callback should be used */
            jsonp: 'jsoncallback',

            /* timeout in ms */
            timeout: 2000,

            /* data lifetime */
            ttl: 30 * 60 * 1000,

            /* https? */
            secure: false,

            /* service host */
            host: 'geoplugin.net',

            /* service port */
            port: 80,

            /* service path */
            path: '/extras/postalcode.gp',

            /* parameters */
            params: {
                format: 'json',
                lat: '${contexthub:/store/geolocation/latitude}',
                long: '${contexthub:/store/geolocation/longitude}'
            }
        },

        /* initial values to set in store's storage */
        initialValues: {
            foo: 'bar',
            number: Math.random()
        }
    };

    /**
     * Store implementation.
     *
     * @extends ContextHub.Store.PersistedJSONPStore
     * @param {String} name - store name
     * @param {Object} config - config
     * @constructor
     */
    var TestStore = function(name, config) {
        this.config = $.extend(true, {}, defaultConfig, config);
        this.init(name, this.config);

        /* perform query */
        this.queryService(false);
    };

    /* inherit from ContextHub.Store.SessionStore */
    ContextHub.Utils.inheritance.inherit(TestStore, ContextHub.Store.PersistedJSONPStore);

    /**
     * Saves response from the service to the storage.
     *
     * @param {Object} response - raw service response
     */
    TestStore.prototype.successHandler = function(response) {
        var place = (response.geoplugin_place || '').replace(/\([^\)]*\)/g, '');
        var country = response.geoplugin_countryCode || '';
        var postalCode = response.geoplugin_postCode || '';
        var latitude = response.geoplugin_latitude || '';
        var longitude = response.geoplugin_longitude || '';
        var title = [ place, country, postalCode, latitude, longitude ].join(', ');

        this.setItem('data', response);
        this.setItem('title', title);
    };

    TestStore.prototype.failureHandler = function(error) {
        this.setItem('data', []);
        this.setItem('title', 'unknown');
    };

    /* register store candidate */
    ContextHub.Utils.storeCandidates.registerStoreCandidate(TestStore, 'demo.04-persisted-jsonp-store', 0);

}(ContextHubJQ));
