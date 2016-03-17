(function(){
    'use strict'; 
    
    appSettings.$inject = ['$rootScope', 'utils'];

    angular.module('app').run(appSettings);
    
    function appSettings($rootScope, utils){
	
	    // GLOBAL APP SCOPE
        // set below basic information
        $rootScope.app = {
            title: $rootScope.title || 'Wos Project',
            name: 'Wos Web Project',
            author: 'bushidian',
            description: 'Wos Project',
            version: 1.0,
            year: (new Date().getFullYear().toString()),
            utils: utils,
            layout:{
                theme: 'theme-1',
                logo: 'logo.png'
            }
        };
    }

})();



