(function(){
    'use strict';

    angular
        .module('app.core')
        .factory('utils', utils);

    utils.$inject = ['moment'];

    function utils(moment){

        var service = {
            formatDate: formatDate
        };

        return service;
        ////////////////

        function formatDate(str, style){
            style = style || 'YYYY-MM-DD';
            return moment(str).format(style);
        }

    }

})();