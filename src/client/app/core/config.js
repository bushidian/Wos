(function() {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    /* @ngInject */
    toastrConfig.$inject = ['toastr'];
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }
    
    core.config(httpConfig);
    
    /* @ngInject */
    httpConfig.$inject = ['$httpProvider'];
    function httpConfig($httpProvider){
        $httpProvider.interceptors.push('httpConfig');
        $httpProvider.defaults.usexdomain = true; 
    }

    var keyCodes = {
        backspace: 8,
        tab: 9,
        enter: 13,
        esc: 27,
        space: 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        insert: 45,
        del: 46
    };

    var imageSettings = {
        imageBasePath: '../assets/images/',
        unknownPersonImageSource: 'unknown_person.jpg'
    };

    var events = {
        controllerActivateSuccess: 'controller.activateSuccess',
        entitiesChanged: 'datacontext.entitiesChanged',
        entitiesImported: 'datacontext.entitiesImported',
        hasChangesChanged: 'datacontext.hasChangesChanged',
        storage: {
            error: 'store.error',
            storeChanged: 'store.changed',
            wipChanged: 'wip.changed'
        }
    };
    
    var supportLanguages = [ { key:'English', value:'en' },
    { key:'中文',value: 'zh_cn' } ];

    var config = {
        appErrorPrefix: '[Syq Error] ', //Configure the exceptionHandler decorator
        events: events,
        imageSettings: imageSettings,
        keyCodes: keyCodes,
        version: '1.1.0',
        supportLanguages: supportLanguages
    };

    core.constant('config', config);

    core.config(configure);

    configure.$inject = [
        '$logProvider', '$routeProvider', '$translateProvider',
        'exceptionConfigProvider', 'routehelperConfigProvider', 'toastr'
    ];

    /* @ngInject */
    function configure(
        $logProvider, $routeProvider, $translateProvider,
        exceptionConfigProvider, routehelperConfigProvider, toastr) {

        configureToastr();
        configureLogging();
        configureExceptions();
        configureRouting();
        configLanguage();

        function configureToastr() {
            toastr.options.timeOut = 4000;
            toastr.options.positionClass = 'toast-bottom-right';
        }

        function configureLogging() {
            // turn debugging off/on (no info or warn)
            if ($logProvider.debugEnabled) {
                $logProvider.debugEnabled(true);
            }
        }

        function configLanguage(){

            // prefix and suffix information  is required to specify a pattern
            // You can simply use the static-files loader with this pattern:
            $translateProvider.useStaticFilesLoader({
                prefix: 'assets/i18n/',
                suffix: '.json'
            });

            $translateProvider.preferredLanguage(config.supportLanguages[0].value);

            $translateProvider.useSanitizeValueStrategy(null);

        }

        function configureExceptions() {
            exceptionConfigProvider.config.appErrorPrefix = config.appErrorPrefix;
        }

        function configureRouting() {
            var routeCfg = routehelperConfigProvider;
            routeCfg.config.$routeProvider = $routeProvider;
            routeCfg.config.docTitle = 'Wos: ';
            routeCfg.config.resolveAlways = { /* @ngInject */
                ready: function() {
                    
                }
            };
        }
    }
})();