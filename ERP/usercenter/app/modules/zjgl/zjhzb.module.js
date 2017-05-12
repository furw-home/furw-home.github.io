(function() {
	/**
	 * 作者: furw
	 * 描述: 质检汇总表 module
	 */
	var zjhzbModule = angular.module('zjhzbModule', ['mainModule']);

	/**
	 * 作者: furw
	 * 描述: 质检汇总表 控制器
	 */
	zjhzbModule.controller('zjhzbCtrl', ['$scope', 'utilService', 'uiService',
		function($scope, utilService, uiService) {

			var zjxmGrid, //Grid
				columns, //Grid 列
				gridConfig, //grid 配置
				start_dataTime, //开始时间
				end_dataTime, //结束时间
				end_dataTime_config, //日期选择配置
				start_dataTime_config, //日期选择配置
				checkLevel, //质检级别下拉
				checkLevel_config; //质检级别下拉配置

			//初始化
			$scope.init = function() {
				$scope.initDatepicker(); // 初始化日期控件
				$scope.initDropdownlist(); //初始化下拉框
				$scope.initGrid(); // 初始化 grid
			};

			//初始化 grid
			$scope.initGrid = function() {
				zjhzGrid = uiService.createGrid(columns, gridConfig);
			};

			//初始化日期控件
			$scope.initDatepicker = function() {
				start_dataTime = uiService.createDatepicker(start_dataTime_config);
				end_dataTime = uiService.createDatepicker(end_dataTime_config);
			};

			//初始化下拉框
			$scope.initDropdownlist = function() {
				checkLevel = uiService.createDropdownlist(checkLevel_config);
			};

			//开始日期 配置
			start_dataTime_config = {
				divId: "start_dataTime", //日期控件id
			};

			//结束日期 配置
			end_dataTime_config = {
				divId: "end_dataTime", //日期控件id
			};

			//质检级别下拉配置
			checkLevel_config = {
				divId: "level", //下拉框id
				_pm: "QualityCheckLevel", //参数
				_isAddAll: true, //是否拼接全部节点
				_url: utilService.ZJGL_SERVICE_URL + "Base/GetDropDownListByFlag", //url
			};

			//Grid 配置
			gridConfig = {
				dataSouce: utilService.ZJGL_SERVICE_URL + "ReportAnalysis/QualityCheckSummary", //URL
				divId: "grid", //grid id
				sortable: true, //排序
				pageable: true, //分页
			};

			//grid columns
			columns = [{
				field: "OrderCode",
				title: "订单编号",
			}, {
				field: "OrderInfo",
				title: "订单信息",
				sortable: false,
			}, {
				field: "QCode",
				title: "质检单号",
			}, {
				field: "Supplier",
				title: "供应商名称",
			}, {
				field: "SupplierCity",
				title: "城市",
				sortable: false,
			}, {
				field: "ExpectDeliveryTime",
				title: "预计交货时间",
				sortable: false,
			}, {
				field: "QualityLevel",
				title: "质检级别",
				sortable: false,
			}, {
				field: "IsRecieved",
				title: "接收",
				sortable: false,
			}, {
				field: "QcPerson",
				title: "质检员",
				sortable: false,
			}, {
				field: "QcTime",
				title: "质检时间",
			}, {
				field: "QcAmount",
				title: "抽检数量",
				sortable: false,
			}, {
				field: "SamplingLevel",
				title: "抽检水平",
				sortable: false,
			}, {
				field: "Remark",
				title: "质检备注",
				sortable: false,
			}];

			//检索
			$scope.search = function(project) {

				if(undefined == project) {
					project = {};
				} else {}

				//获取级别下拉value
				checkLevel_id = checkLevel.getValue("level");
				checkLevel_id = parseInt(checkLevel_id);
				project.Qualitylevel = checkLevel_id;

				//获取开始日期
				var startDataTime = start_dataTime.getDatatime("start_dataTime"); //获取
				project.CheckTimeStart = startDataTime;

				//获取结束日期
				var endDataTime = end_dataTime.getDatatime("end_dataTime"); //获取
				project.CheckTimeEnd = endDataTime;

				//获取是否接收下拉框
				isReceive_id = $("#isReceive").data("kendoDropDownList").value();
				isReceive_id = parseInt(isReceive_id);
				project.IsRecieved = isReceive_id;

				//调用grid 的检索方法
				zjhzGrid.search(project);

			};

			//导出
			$scope.export = function(project) {

				var pm = "";

				if(undefined == project) {
					pm += "?Supplier=" + "''";
				} else {
					pm += "?Supplier=" + project.Supplier; //拼接供应商参数
				}

				//获取级别下拉value
				checkLevel_id = checkLevel.getValue("level");
				checkLevel_id = parseInt(checkLevel_id);

				pm += "&Qualitylevel=" + checkLevel_id; //拼接级别参数

				//获取开始日期
				var startDataTime = start_dataTime.getDatatime("start_dataTime"); //获取

				pm += "&CheckTimeStart=" + startDataTime; //拼接开始日期参数

				//获取结束日期
				var endDataTime = end_dataTime.getDatatime("end_dataTime"); //获取

				pm += "&CheckTimeEnd=" + endDataTime; //拼接结束日期参数

				//获取是否接收下拉框
				isReceive_id = $("#isReceive").data("kendoDropDownList").value();
				isReceive_id = parseInt(isReceive_id);

				pm += "&IsRecieved=" + isReceive_id; //拼接是否接收参数

				//获取 ticket
				var ticket = utilService.TICKET;

				//模拟from 提交 实现下载文件流
				var form = $("<form>");
				form.attr('style', 'display:none');
				form.attr('target', '');
				form.attr('method', 'post');
				form.attr('action', utilService.ZJGL_SERVICE_URL + '/ReportAnalysis/ExportCheckSummary' + pm + "&ticket=" + ticket);
				$('body').append(form);
				form.submit();

			};

			//设置是否接收下拉框数据
			var isReceive = [{
				text: "全部",
				value: "-1"
			}, {
				text: "是",
				value: "1"
			}, {
				text: "否",
				value: "0"
			}];

			// 初始化是否接收下拉框
			$("#isReceive").kendoDropDownList({
				dataTextField: "text",
				dataValueField: "value",
				dataSource: isReceive
			});

		}
	]);
})();