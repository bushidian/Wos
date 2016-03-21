(function(){
	'use strict';
	
	angular
	    .module('app.widgets')
	    .directive('ssImg', ssImg);
	
	ssImg.$inject = ['config'];
	
	function ssImg(config){
	    //Usage:
        //<img ss-img="{{s.speaker.imageSource}}"/>
		var basePath = config.imageSettings.imageBasePath;
		var unknownImgage = config.imageSettings.unknownImageSource;
		var directive = {
			link: link,
			restrict:'A'
		};
		
		return directive;

		function link(scope, element, attrs){
			/*jshint validthis: true */
			attrs.$observe('ssImg',function(value){
				value = basePath + (value || unknownImgage);
			    attrs.$set('src',value); 
			});
		}
	}
	
})();