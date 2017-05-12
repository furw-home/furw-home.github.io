(function() {
	/**
	 * 作者: furw
	 * 描述: 质检统计表 module
	 */
	var zjtjbModule = angular.module('zjtjbModule', ['mainModule']);

	/**
	 * 作者: furw
	 * 描述: 质检统计表 控制器
	 */
	zjtjbModule.controller('zjtjbCtrl', ['$scope', 'utilService', 'uiService',
		function($scope, utilService, uiService) {

			var zjtjGrid, //Grid
				columns, //Grid 列
				gridConfig, //grid 配置
				start_dataTime, //开始时间
				end_dataTime, //结束时间
				end_dataTime_config, //日期选择配置
				start_dataTime_config; //日期选择配置

			//初始化
			$scope.init = function() {
				$scope.initGrid(); // 初始化 grid
				$scope.initDatepicker(); // 初始化日期控件
			};

			//初始化 grid
			$scope.initGrid = function() {
				zjtjGrid = uiService.createGrid(columns, gridConfig);
			};

			//初始化日期控件
			$scope.initDatepicker = function() {
				start_dataTime = uiService.createDatepicker(start_dataTime_config);
				end_dataTime = uiService.createDatepicker(end_dataTime_config);
			};

			//开始日期 配置
			start_dataTime_config = {
				divId: "start_dataTime",
			};

			//结束日期 配置
			end_dataTime_config = {
				divId: "end_dataTime",
			};

			//Grid 配置
			gridConfig = {
				dataSouce: utilService.ZJGL_SERVICE_URL + "ReportAnalysis/Statistics", //URL
				divId: "grid", //grid 配置
				sortable: true, //排序
				pageable: true, //分页
				statistical: true, //是否需要统计
				callback: statistical, //统计回调函数
			};

			//配置表格标头信息
			columns = [{
				field: "Supplier",
				title: "供应商名称",
			}, {
				field: "CheckCount",
				title: "质检单数",
			}, {
				field: "NotRecieved",
				title: "不接收",
			}, {
				field: "Recieved",
				title: "接收",
			}, {
				field: "SupplierDirectly",
				title: "供应商直发",
			}, {
				field: "NotCheckedDirectly",
				title: "未检直发",
			}, {
				field: "NoCheckedRate",
				title: "未检率",
			}, {
				field: "FailureRatePercentStr",
				title: "不合格率",
			}, {
				field: "PassRatePercentStr",
				title: "合格率",
			}];

			//统计回调
			function statistical(sum) {
				$(".js").html(sum.Recieved);
				$(".bjs").html(sum.NotRecieved);
				$(".zjds").html(sum.CheckCount);
				$(".gyszf").html(sum.SupplierDirectly);
				$(".wjzf").html(sum.NotCheckedDirectly);
				$(".wjl").html(sum.NoCheckedRate);
				$(".bhgl").html(sum.FailureRatePercentStr);
				$(".hgl").html(sum.PassRatePercentStr);
			};

			//检索
			$scope.search = function(project) {

				if(undefined == project) {
					project = {};
				} else {}

				//获取开始日期
				var startDataTime = start_dataTime.getDatatime("start_dataTime"); //获取
				project.CheckTimeStart = startDataTime;

				$(".start_date").html(startDataTime); //渲染到表头

				//获取结束日期
				var endDataTime = end_dataTime.getDatatime("end_dataTime"); //获取
				project.CheckTimeEnd = endDataTime;

				$(".end_date").html(endDataTime); //渲染到表头

				//条件
				var conditions = {
					statistical: true, //是否需要统计
					callback: statistical, //统计回调函数
				}

				//调用grid 的检索方法
				zjtjGrid.search(project, conditions);
			};

			//导出
			$scope.export = function(project) {
				var pm = "";

				if(undefined == project) {
					pm += "?Supplier=" + "";
				} else {
					pm += "?Supplier=" + project.Supplier; //拼接供应商参数
				}

				//获取开始日期
				var startDataTime = start_dataTime.getDatatime("start_dataTime"); //获取

				pm += "&CheckTimeStart=" + startDataTime; //拼接开始日期参数

				//获取结束日期
				var endDataTime = end_dataTime.getDatatime("end_dataTime"); //获取

				pm += "&CheckTimeEnd=" + endDataTime; //拼接结束日期参数

				//获取 ticket
				var ticket = utilService.TICKET;

				//模拟from 提交 实现下载文件流
				var form = $("<form>");
				form.attr('style', 'display:none');
				form.attr('target', '');
				form.attr('method', 'post');
				form.attr('action', utilService.ZJGL_SERVICE_URL + '/ReportAnalysis/ExportStatistics' + pm + "&ticket=" + ticket);
				$('body').append(form);
				form.submit();
			};

		}
	]);
})();