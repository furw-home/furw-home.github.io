(function() {
	/**
	 * 作者: furw
	 * 描述: example module
	 */
	var exampleModule = angular.module('exampleModule', ['mainModule']);

	/**
	 * 作者: furw
	 * 描述: example 控制器
	 */
	exampleModule.controller('exampleCtrl', ['$scope', 'utilService', 'uiService',
		function($scope, utilService, uiService) {

			//初始化
			$scope.init = function() {};

		}
	]);
})();