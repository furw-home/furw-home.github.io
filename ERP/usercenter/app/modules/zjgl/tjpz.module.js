(function() {
	/**
	 * 作者: furw
	 * 描述: 条件配置 module
	 */
	var tjpzModule = angular.module('tjpzModule', ['mainModule']);

	/**
	 * 作者: furw
	 * 描述: 条件配置 控制器
	 */
	tjpzModule.controller('tjpzCtrl', ['$scope', 'utilService', 'uiService',
		function($scope, utilService, uiService) {

			var grid1, //Grid
				columns, //Grid 列
				config; //grid 配置

			//初始化
			$scope.init = function() {
				$scope.initGrid(); // 初始化 grid
			};

			//初始化 grid
			$scope.initGrid = function() {
				grid1 = uiService.createGrid(columns, config);
			};

			//Grid 配置
			config = {
				dataSouce: utilService.ZJGL_SERVICE_URL + "Settings/GetQcLevel", //URL
				divId: "grid", //grid id
				sortable: false, //排序
				pageable: false, //分页
				setBgColor: true,
				callback2: _checkbox1 //回调函数
			};

			//配置表格标头信息
			columns = [{
				template: '<input type="checkbox" class="checkbox" name="testId" />',
				title: '',
				width: 30
			}, {
				field: "No",
				title: "序号",
				template: "#= ++record #",
				sortable: false,
				width: 80
			}, {
				field: "QcLevelName",
				title: "订单质检条件",
				sortable: false,
			}, {
				field: "QcLevelDesc",
				title: "备注",
				sortable: false,
			}];

			//绑定数据 （设置选中）
			function _checkbox1() {
				var grid = $("#grid").data("kendoGrid");
				var ds = grid.dataSource.view();
				for(var i = 0; i < ds.length; i++) {
					var row = grid.table.find("tr[data-uid='" + ds[i].uid + "']");
					if(ds[i].IsEnable) {
						$(row).find(".checkbox").prop("checked", true);
					}
				}
			};

			//保存
			$scope.save = function() {
				//获取选中行的值
				var idsToSend = [];
				var grid = $("#grid").data("kendoGrid");
				var ds = grid.dataSource.view();
				for(var i = 0; i < ds.length; i++) {
					pm = {};
					var row = grid.table.find("tr[data-uid='" + ds[i].uid + "']");
					var checkbox = $(row).find(".checkbox");
					pm.id = ds[i].Id;
					pm.isEnable = checkbox.is(":checked");
					pm.levelName = ds[i].QcLevelName;
					idsToSend.push(pm); //将当前行 订单编号 存进集合
					//}
				};

				idsToSend = JSON.stringify(idsToSend);

				$.ajax({
					type: 'POST',
					url: utilService.ZJGL_SERVICE_URL + "Settings/SetQcLevel",
					data: idsToSend,
					dataType: 'json',
					contentType: "application/json",
					success: function(data) {
						if(status == 0) {
							uiService.notification().successMsg("修改成功!");
							grid1.reload();
						} else {
							uiService.notification().errorMsg("修改", "失败!");
						}

					}
				});

			};

		}
	]);
})();