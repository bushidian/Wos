(function(){
    'use strict';

    angular
        .module('blocks.storage')
        .factory('storage', storage);

    storage.$inject = ['localStorageService'];

    function storage(localStorageService){

        var service = {
            cookie: localStorageService.cookie, //set remove get
            set: set,
            get: get,
            isExist: isExist,
            remove: remove,
            removeByPrefix: removeByPrefix,
            clear: clear
        };

        return service;
        //////////////////////

        function set(key, object){
            localStorageService.set(key, object);
        }

        function get(key, callback){
            var data = localStorageService.get(key);
            if((data === undefined || data === null) && callback !==undefined){
                data = typeof(callback) === 'function' ? callback() : callback;
                set(key, data);
            }
            return data;
        }

        function isExist(key){
            var value = get(key)
            return value !== null && value !== undefined;
        }

        function remove(key){
            localStorageService.remove(key);
        }

        function removeByPrefix(str){
            var keys = localStorageService.keys;
            var reg = new RegExp("^" + str, "i");
            for(var i=0; i < keys.length; i++){
                if(reg.test(keys[i].toLowerCase())){
                    localStorageService.remove(keys[i]);
                }
            }
        }

        function clear(){
            localStorageService.clearAll();
        }

    }

})();