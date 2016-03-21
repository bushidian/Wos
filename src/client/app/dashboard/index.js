(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['common', '$http'];

    function Dashboard() {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Dashboard';

        activate();

        function activate() {

        }
    }
})();