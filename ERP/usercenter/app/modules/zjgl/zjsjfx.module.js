(function() {
	/**
	 * 作者: furw
	 * 描述: 质检数据分析 module
	 */
	var zjsjfxModule = angular.module('zjsjfxModule', ['mainModule']);

	/**
	 * 作者: furw
	 * 描述: 质检数据分析 控制器
	 */
	zjsjfxModule.controller('zjsjfxCtrl', ['$scope', 'utilService', 'uiService',
		function($scope, utilService, uiService) {

			var zjsjfxGrid, //Grid
				columns, //Grid 列
				gridConfig, //grid 配置
				start_dataTime, //开始时间
				end_dataTime, //结束时间
				supplier, //供应商下拉
				end_dataTime_config, //日期选择配置
				start_dataTime_config; //日期选择配置

			//初始化
			$scope.init = function() {
				$scope.initGrid(); //初始化表格
				$scope.initDatepicker(); // 初始化日期控件
			}

			//初始化 grid
			$scope.initGrid = function() {
				zjsjfxGrid = uiService.createGrid(columns, gridConfig);
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

			//获取供应商下拉框数据
			$.ajax({
				type: 'POST',
				url: utilService.ZJGL_SERVICE_URL + "ReportAnalysis/GetSupplier",
				dataType: 'json',
				contentType: "application/json",
				success: function(data) {

					//拼接全部节点
					var add_all = {
						"Supplier": "全部",
						"Supplier_Code": ''
					};
					data.data.push(add_all);

					supplier = $("#supplier").kendoDropDownList({ //初始化
						dataTextField: "Supplier",
						dataValueField: "Supplier_Code",
						dataSource: data
					}).data("kendoDropDownList");
				}
			}); //结束

			//grid 配置
			gridConfig = {
				dataSouce: utilService.ZJGL_SERVICE_URL + "ReportAnalysis/SupplierDataAnalysis", //URL
				divId: "grid", //grid id
				sortable: false, //排序
				pageable: false, //分页
			};

			//配置表格标头信息
			columns = [{
				field: "Qc_Date",
				title: "月份",
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
				field: "SupplierCheck",
				title: "供应商检验",
			}, {
				field: "SupplierDirectly",
				title: "供应商直发",
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

			//搜索
			$scope.search = function() {

				//获取供应商编码
				var supplier_text = $("#supplier").data("kendoDropDownList").text();
				$(".gys").html(supplier_text); //渲染到页面表头

				var project = {};

				//获取供应商编码
				var supplier = $("#supplier").data("kendoDropDownList").value();
				project.supplier_code = supplier;

				//获取开始月份
				var checktimestart = start_dataTime.getDatatime("start_dataTime");
				project.checktimestart = checktimestart;

				//获取结束月份
				var checktimeend = end_dataTime.getDatatime("end_dataTime");
				project.checktimeend = checktimeend;

				//调用grid 的检索方法
				zjsjfxGrid.search(project);

			};

			//导出
			$scope.export = function() {

				var pm = "";

				//获取供应商编码
				var supplier = $("#supplier").data("kendoDropDownList").value();
				pm += "?supplier_code=" + supplier;

				//获取开始月份
				var checktimestart = start_dataTime.getDatatime("start_dataTime");
				pm += "&checktimestart=" + checktimestart;

				//获取结束月份
				var checktimeend = end_dataTime.getDatatime("end_dataTime");
				pm += "&checktimeend=" + checktimeend;

				//获取 ticket
				var ticket = utilService.TICKET;

				//模拟from 提交 实现下载文件流
				var form = $("<form>");
				form.attr('style', 'display:none');
				form.attr('target', '');
				form.attr('method', 'post');
				form.attr('action', utilService.ZJGL_SERVICE_URL + '/ReportAnalysis/ExportDataAnalysis' + pm + "&ticket=" + ticket);
				$('body').append(form);
				form.submit();

			};

		}
	]);
})();