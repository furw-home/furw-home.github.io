(function() {
	/**
	 * 作者: furw
	 * 描述: 供应商管理 模块
	 */
	var gys_jbxxModule = angular.module('gys_jbxxModule', ['mainModule']);

	/**
	 * 作者: furw
	 * 描述: 供应商管理 控制器
	 */
	gys_jbxxModule.controller('gys_jbxxCtrl', ['$scope', '$resource', 'utilService', 'uiService',
		function($scope, $resource, utilService, uiService) {

			//初始化
			$scope.init = function() {}

			$("#grid").kendoGrid({
				columns: [
					//{ field: "name",headerTemplate: '<input type="checkbox" id="check-all" /><label for="check-all">Check All</label>'},
					{
						field: "age"
					}, {
						command: [{
							name: "edit",
							text: {
								edit: "Custom edit",
								cancel: "Custom cancel",
								update: "Custom update"
							}
						}]
					}
				],
				dataSource: {
					data: [{
						id: 1,
						name: "Jane Doe",
						age: 30
					}, {
						id: 2,
						name: "Jane Doe",
						age: 30
					}],
					schema: {
						model: {
							id: "id"
						}
					}
				},
				editable: {
					mode: "inline"
				}
			});

		}
	]);
})();