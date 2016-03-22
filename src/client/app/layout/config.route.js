(function(){
    'use strict';

    angular.module('app.layout').run(routeConfig);

    routeConfig.$inject = ['routehelper'];

    /* @ngInject */
    function routeConfig(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/403',
                config:{
                    templateUrl: 'app/layout/403.html',
                    title: '403',
                    settings: {
                        nav: 403,
                        content: '403'
                    }
                }
            },
            {
                url: '/404',
                config: {
                    templateUrl: 'app/layout/404.html',
                    title: '404',
                    settings: {
                        nav: 404,
                        content: '404'
                    }
                }
            },
            {
                url: '/500',
                config: {
                    templateUrl: 'app/layout/500.html',
                    title: '500',
                    settings: {
                        nav: 500,
                        content: '500'
                    }
                }
            }
        ];
    }
})();