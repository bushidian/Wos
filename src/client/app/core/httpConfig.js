(function(){
    'use strict';
    
    angular
	    .module('app.core')
	    .factory('httpConfig', httpConfig);
        
    httpConfig.$inject = ['config', '$location', 'common'];
    
    function httpConfig(config, $location, common){
        
        var serivce = {
			responseError: responseError
		};
		
	    return serivce;
        //////////////////////
        
        function request(requestConfig){
             
        }
         
        function response(response){
            
        }
        
        function responseError(response){
            var logger = common.logger;
            switch(response.status){
                case 403:
                     logger.error(response.data.Error.Message, '权限受限');
                     break;
                case 404:
                      logger.error('找不到地址:{'+ response.config.url +'},'+
                      '访问方式{'+ response.config.method +'},请联系管理员!','访问出错！');
                     break;
                case 301:
                case 500:
                     logger.error(response.data, '错误');
                     break;
            }
            return common.$q.reject(response);
        }
        
    }
})();