(function(){
    'use strict';

    angular
        .module('blocks.cache')
        .factory('cache', cache);

    cache.$inject = ['CacheFactory'];

    function cache(CacheFactory){

        CacheFactory('dataCache', {
            maxAge: 60 * 60 * 1000, // Items added to this cache expire after 1 hour
            cacheFlushInterval: 240 * 60 * 1000, // This cache will clear itself 4 hours
        });
        var dataCache = CacheFactory.get('dataCache');

        var service ={
            set: set,
            get: get,
            isExist: isExist,
            remove: remove,
            removeByPrefix: removeByPrefix,
            clear: clear
        };

        return service;
        /////////////////////

        function set(key, object){
            dataCache.put(key, object);
        }

        function get(key, callback){
            var data = dataCache.get(key);
            if((data === undefined || data === null) && callback !==undefined){
                data = typeof(callback) === 'function' ? callback() : callback;
                set(key, data);
            }
            return data;
        }

        function isExist(key){
            var value = get(key);
            return value !== null && value !== undefined;
        }

        function remove(key){
            dataCache.remove(key);
        }

        function removeByPrefix(str){
            var keys = dataCache.keys;
            var reg = new RegExp("^" + str, "i");
            for(var i=0; i < keys.length; i++){
                if(reg.test(keys[i].toLowerCase())){
                    dataCache.remove(keys[i]);
                }
            }
        }

        function clear(){
            dataCache.clearAll();
        }
    }
})();