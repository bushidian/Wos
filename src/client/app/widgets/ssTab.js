(function(){
    'use strict';

    angular.module('app.widgets')
        .directive('ssTab', ssTab);

    function ssTab(){

        //Usage:
        //<ss-tab>
        //<ss-tab-item title="home" icon="fa fa-home" >home</ss-tab-item>
        //<ss-tab-item title="product" >product</ss-tab-item>
        //</ss-tab>
        var directive = {
            controller:bfeTabController,
            controllerAs:'vm',
            restrict: 'E',
            replace: true,
            scope: true,
			transclude: true
		};

        return directive;

        function bfeTabController(){
            /*jshint validthis: true */
            var vm = this;
            vm.tabs = [];
            vm.addTab = addTab;
            vm.select = select;
            vm.getIcon = getIcon;
            function addTab(tab){
                vm.tabs.push(tab);
                if(vm.tabs.length===1){
                    tab.selected = true;
                }
            }
            
            function select(tab){
                tab.selected = true;
                vm.tabs.forEach(function(curTab){
                    if(curTab !== tab){
                        curTab.selected = false;
                    }
                });
            }
            
            function getIcon(tab){
                return !!tab.icon ? tab.icon:'';
            }
            
        }

    }
     
    angular.module('app.widgets')
        .directive('ssTabItem', ssTabItem);
        
    function ssTabItem(){
         var directive ={
            link: link,
			restrict: 'E',
            replace: true,
            require:'^ssTab',
            scope:{
				'title':'@',
                'icon':'@'
			},
            template: '<div ng-show="selected" ng-transclude></div>',
            transclude: true
		};
        
        return directive;

        function link(scope, element, attrs, controller){
            controller.addTab(scope);
        }
    }


})();