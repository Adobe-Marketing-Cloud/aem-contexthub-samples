ContextHub.console.log(ContextHub.Shared.timestamp(), '[loading] contexthub.store.demo.03-jsonp-store - store.jsonp-store.js');

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
            path: '/extras/nearby.gp',

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
     * @extends ContextHub.Store.JSONPStore
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
    ContextHub.Utils.inheritance.inherit(TestStore, ContextHub.Store.JSONPStore);

    /**
     * Saves response from the service to the storage.
     *
     * @param {Object} response - raw service response
     */
    TestStore.prototype.successHandler = function(response) {
        var nearbyList = [];
        var firstEntry = response[0];
        var place;
        var city;
        var country;

        $.each(response, function(idx, data) {
            place = data.geoplugin_place || '?';
            city = data.geoplugin_region || '?';
            country = data.geoplugin_countryCode || '?';

            var entry = {
                title: [ place, city, country ].join(', '),
                data: {
                    place: place,
                    city: city,
                    country: country
                }
            };

            nearbyList.push(entry);
        });

        place = firstEntry.geoplugin_place || '?';
        city = firstEntry.geoplugin_region || '?';
        country = firstEntry.geoplugin_countryCode || '?';

        this.setItem('current', {
            place: place,
            city: city,
            country: country
        });

        this.setItem('nearby-list', nearbyList);
    };

    TestStore.prototype.failureHandler = function(error) {
        this.setItem('current', {
            place: '?',
            city: '?',
            country: '?'
        });

        this.setItem('nearby-list', []);
    };

    /* register store candidate */
    ContextHub.Utils.storeCandidates.registerStoreCandidate(TestStore, 'demo.03-jsonp-store', 0);

}(ContextHubJQ));
