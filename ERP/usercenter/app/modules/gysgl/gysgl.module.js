(function() {
	/**
	 * 作者: furw
	 * 描述: 供应商管理 模块
	 */
	var gyslbModule = angular.module('gysglModule', ['mainModule']);

	/**
	 * 作者: furw
	 * 描述: 供应商管理 控制器
	 */
	gyslbModule.controller('gysglCtrl', ['$scope', '$resource', 'utilService', 'uiService',
		function($scope, $resource, utilService, uiService) {

			//初始化
			$scope.init = function() {}

			/*$("#tabstrip").kendoTabStrip({
	        animation: {
	            open: {
	                duration: 200,
	                effects: "expand:vertical"
	            }
	        }

    });*/
			var tabToActivate = $("#tab1");
			$("#tabstrip").kendoTabStrip().data("kendoTabStrip").activateTab(tabToActivate);

		}
	]);
})();