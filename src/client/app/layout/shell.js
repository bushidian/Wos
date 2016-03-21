(function(){
	
	angular
	    .module('app.layout')
		.controller('Shell', Shell);
	
	Shell.$inject = ['common', '$translate', 'config'];
	
	function Shell(common, $translate, config){
		/*jshint validthis: true */
        var vm = this;
		
		var logger = common.logger;
		
		vm.showSplash = true;
		vm.busyMessage = 'Please wait ...';
		
		activate();
		
		function activate(){
			bindLanguage();

			logger.success('Wos Project loaded!', null);

			hideSplash();
		}
		
		function hideSplash(){
			//Force a 1 second delay so we can see the splash.
            common.$timeout(function () {
                vm.showSplash = false;
            }, 1000);
		}

		function bindLanguage(){
			$translate.use(common.storage.get('lang',
				config.supportLanguages[0].value));
		}

	}
	
})();