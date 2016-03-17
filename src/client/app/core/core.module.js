(function () {
    'use strict';

    angular.module('app.core', [
        /*
         * Angular modules
         */
        'ngAnimate', 'ngRoute', 'ngSanitize',

        /*
         * Our reusable cross app code modules
         */
        'blocks.exception', 'blocks.logger', 'blocks.router',
        'blocks.storage', 'blocks.cache',
        /*
         * 3rd Party modules
         */
        'ui.bootstrap',
        'pascalprecht.translate' // translate
    ]);
})();