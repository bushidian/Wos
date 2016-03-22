(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .run(routeConfig);

    routeConfig.$inject = ['routehelper'];
    /* @ngInject */
    function routeConfig(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app/dashboard/index.html',
                    title: 'dashboard',
                    /*
                     * If we specify the controller and
                     * controllerAs in the route we can inject
                     * this resolver into the controller, too.
                     */

                    controller: 'Dashboard',
                    controllerAs: 'vm',
                    /*
                    resolve: {
                        toasty: function($q) {
                            var deferred = $q.defer();
                            var people =[
                                {name: 'John', state: 'Florida'},
                                {name: 'Sandy', state: 'New Jersey'},
                                {name: 'Julie', state: 'New York'}
                            ];
                            deferred.resolve(people);
                            toastr.warning('yes, yes i do');
                            return deferred.promise;
                        }
                    },
                    */
                    settings: {
                        nav: 1,
                        content: 'Dashboard'
                    }
                }
            }
        ];
    }
})();