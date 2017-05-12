(function() {
	/**
	 * 作者: furw
	 * 描述: 待质检列表 module
	 */
	var djclbModule = angular.module('djclbModule', ['mainModule']);

	/**
	 * 作者: furw
	 * 描述: 待质检列表 控制器
	 */
	djclbModule.controller('djclbCtrl', ['$scope', 'utilService', 'uiService',
		function($scope, utilService, uiService) {

			var djclbGrid, //Grid
				columns, //Grid 列
				gridConfig, //grid 配置
				order_grid, //订单grid
				order_grid_columns, //订单columns
				order_grid_config, //订单Config
				window_zjfa, //质检方案 window
				window_tjdd, //添加订单 window
				window_plzj, //批量质检 window
				template_zjfa, //质检模版下拉 （质检方案）
				template_plzj, //质检模版下拉 （批量质检）
				start_dataTime, //开始时间
				end_dataTime, //结束时间
				end_dataTime_config, //日期选择配置
				start_dataTime_config, //日期选择配置
				orderState, //订单状态下拉
				orderState_config, //质检级别下拉配置
				orderState_add, //订单状态下拉 (新增)
				orderState_add_config, //质检级别下拉配置 (新增)
				logisSolution, //物流方案下拉
				logisSolution_config, //物流方案下拉配置
				logisSolution_add, //物流方案下拉 (新增)
				logisSolution_add_config, //物流方案下拉配置 (新增)
				qualityCheckLevel, //质检级别下框
				qualityCheckLevel_config; //质检级别下拉

			//初始化
			$scope.init = function() {
				$scope.initDropdownlist(); //初始化下拉框
				$scope.initDatepicker(); // 初始化日期控件
				$scope.initGrid(); // 初始化 grid
			};

			//初始化 grid
			$scope.initGrid = function() {
				djclbGrid = uiService.createGrid(columns, gridConfig);
			};

			//初始化日期控件
			$scope.initDatepicker = function() {
				start_dataTime = uiService.createDatepicker(start_dataTime_config);
				end_dataTime = uiService.createDatepicker(end_dataTime_config);
			};

			//初始化下拉框
			$scope.initDropdownlist = function() {
				orderState = uiService.createDropdownlist(orderState_config);
				orderState_add = uiService.createDropdownlist(orderState_add_config);
				logisSolution = uiService.createDropdownlist(logisSolution_config);
				logisSolution_add = uiService.createDropdownlist(logisSolution_add_config);
				qualityCheckLevel = uiService.createDropdownlist(qualityCheckLevel_config);
			}

			//Grid 配置
			gridConfig = {
				dataSouce: utilService.ZJGL_SERVICE_URL + "QualityUnCheckOrder/Query", //URL
				divId: "grid", //grid id
				sortable: true, //排序
				pageable: true //分页
			};

			//订单grid 配置
			order_grid_config = {
				_dataSouce: utilService.ZJGL_SERVICE_URL + "QualityUnCheckOrder/GetEpOrderList", //URL
				_divId: "order_grid", //grid id
				_sortable: true, //排序
				_pageable: true //分页
			};

			//订单状态下拉框配置
			orderState_config = {
				divId: "order_state", //下拉框id
				_pm: "OrderState", //参数
				_isAddAll: true, //是否拼接全部节点
				_url: utilService.ZJGL_SERVICE_URL + "Base/GetDropDownListByFlag", //URL
			};

			//订单状态下拉框配置 （添加）
			orderState_add_config = {
				divId: "order_state_add", //下拉框id
				_pm: "OrderState", //参数
				_isAddAll: true, //是否拼接全部节点
				_url: utilService.ZJGL_SERVICE_URL + "Base/GetDropDownListByFlag", //URL
			};

			//物流方案下拉框配置
			logisSolution_config = {
				divId: "logis_solution", //下拉框id
				_pm: "LogisSolution", //参数
				_isAddAll: true, //是否拼接全部节点
				_url: utilService.ZJGL_SERVICE_URL + "Base/GetDropDownListByFlag", //URL
			};

			//物流方案下拉框配置 （添加）
			logisSolution_add_config = {
				divId: "logis_solution_add", //下拉框id
				_pm: "LogisSolution", //参数
				_isAddAll: true, //是否拼接全部节点
				_url: utilService.ZJGL_SERVICE_URL + "Base/GetDropDownListByFlag", //URL
			};

			//质检级别下拉框配置
			qualityCheckLevel_config = {
				divId: "quality_checkLevel", //下拉框id
				_pm: "QualityCheckLevel", //参数
				_isAddAll: true, //是否拼接全部节点
				_url: utilService.ZJGL_SERVICE_URL + "Base/GetDropDownListByFlag", //URL
			};

			//日期 配置
			start_dataTime_config = {
				divId: "start_dataTime", //日期id
			};

			//日期 配置
			end_dataTime_config = {
				divId: "end_dataTime", //日期id
			};

			//配置表格标头信息
			columns = [{
				headerTemplate: '<input type="checkbox" class="checkbox_all" name="testId" />',
				template: '<input type="checkbox" class="checkbox" name="testId" />',
				title: '',
				width: 30
			}, {
				field: "No",
				title: "序号",
				template: "#= ++record #",
				sortable: false,
				width: 30
			}, {
				field: "OrderCode",
				title: "订单编号",
				sortable: false,
			}, {
				field: "OrderInfo",
				title: "订单信息",
				sortable: false,
			}, {
				field: "Supplier",
				title: "供应商",
				sortable: false,
			}, {
				field: "QualityLevel",
				title: "质检级别",
				sortable: false,
			}, {
				field: "LogisSolution",
				title: "物流方案",
				sortable: false,
			}, {
				field: "OrderStatus",
				title: "订单状态",
				sortable: false,
			}, {
				field: "QualityStatus",
				title: "质检状态",
				sortable: false,
			}, {
				field: "ExpectDeliveryTime",
				title: "预计发货时间",
				sortable: false,
			}];

			//配置 订单 表格标头信息
			order_grid_columns = [{
				headerTemplate: '<input type="checkbox" class="checkbox_all" name="testId" />',
				template: '<input type="checkbox" class="checkbox" />',
				title: '',
				sortable: false,
				width: 30
			}, {
				field: "No",
				title: "序号",
				template: "#= ++record #",
				sortable: false,
				width: 30
			}, {
				field: "OrderCode",
				title: "订单编号",
			}, {
				field: "OrderName",
				title: "订单名称",
			}, {
				field: "Supplier",
				title: "供应商",
				sortable: false,
			}, {
				field: "SupplierCity",
				title: "供应商城市",
				sortable: false,
			}, {
				field: "LogisSolution",
				title: "物流方案",
				sortable: false,
			}, {
				field: "OrderStatus",
				title: "订单状态",
				sortable: false,
			}, {
				field: "ExpectDeliveryTime",
				title: "预计发货时间",
			}];

			//设置是否接收下拉框数据
			var isReceive = [{
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

			//获取质检模版下拉框数据
			$.ajax({
				type: 'GET',
				url: utilService.ZJGL_SERVICE_URL + "QualityTemplate/GetTemplateList",
				dataType: 'json',
				contentType: "application/json",
				success: function(data) {

					//质检方案
					template_zjfa = $("#template_zjfa").kendoDropDownList({ //初始化
						dataTextField: "TemplateName",
						dataValueField: "Id",
						dataSource: data
					}).data("kendoDropDownList");

					//批量质检
					template_plzj = $("#template_plzj").kendoDropDownList({ //初始化
						dataTextField: "TemplateName",
						dataValueField: "Id",
						dataSource: data
					}).data("kendoDropDownList");

				}
			}); //结束

			//清空
			$scope.empty = function(project) {

				if(undefined == project) {
					$("#start_dataTime").val("");
					$("#end_dataTime").val("");
					orderState.setText("order_state", "全部");
					logisSolution.setText("logis_solution", "全部");
					qualityCheckLevel.setText("quality_checkLevel", "全部");

				} else {
					$("#start_dataTime").val("");
					$("#end_dataTime").val("");
					orderState.setText("order_state", "全部");
					logisSolution.setText("logis_solution", "全部");
					qualityCheckLevel.setText("quality_checkLevel", "全部");

					$scope.project.ordercode = "";
					$scope.project.ordername = "";
					$scope.project.supplier = "";
					$scope.project.supplier_city = "";
				}
			};

			//搜索
			$scope.search = function(project) {

				if(undefined == project) {
					project = {};
				} else {}

				//系统代审
				if($("#_checkbox").is(':checked')) {
					project.containsSysRepCheck = true;
				} else {
					project.containsSysRepCheck = false;
				}

				// 获取订单状态 value
				var orderState_id = orderState.getValue("order_state");
				project.orderstatus = parseInt(orderState_id);

				//获取物流方案 value
				var logisSolution_id = logisSolution.getValue("logis_solution");
				project.logis_solution = parseInt(logisSolution_id);

				//获取质检级别 value
				var qualityCheckLevel_id = qualityCheckLevel.getValue("quality_checkLevel");
				project.qualitylevel = parseInt(qualityCheckLevel_id);

				//获取质检日期
				var startDataTime = start_dataTime.getDatatime("start_dataTime"); //获取
				project.expectdeliverystarttime = startDataTime;

				//获取结束日期
				var endDataTime = end_dataTime.getDatatime("end_dataTime"); //获取
				project.expectdeliveryendtime = endDataTime;

				//调用grid 的检索方法
				djclbGrid.search(project);

			};

			//任务领取
			$scope.rwlq = function() {
				$.ajax({
					type: 'GET',
					url: utilService.ZJGL_SERVICE_URL + "QualityUnCheckOrder/SummaryData",
					dataType: 'json',
					contentType: "application/json",
					success: function(data) {
						if(data.status == 1) {
							uiService.notification().successMsg("任务领取成功!"); //操作提示消息
						} else {
							uiService.alert(data.msg);
						}
					}
				});
			};

			//导出
			$scope.export = function(project) {

				var pm = "";

				if(undefined == project) {
					pm += "?ordercode=" + "''";
					pm += "&ordername=" + "''";
					pm += "&supplier=" + "''";
					pm += "&supplier_city=" + "''";
				} else {

					if(project.ordercode == undefined) {
						pm += "?ordercode=" + "''";
					} else {
						pm += "?ordercode=" + project.ordercode; //拼接供应商参数
					}

					if(project.ordername == undefined) {
						pm += "&ordername=" + "''";
					} else {
						pm += "&ordername=" + project.ordername; //拼接供应商参数
					}

					if(project.supplier == undefined) {
						pm += "&supplier=" + "''";
					} else {
						pm += "&supplier=" + project.supplier; //拼接供应商参数
					}

					if(project.supplier_city == undefined) {
						pm += "&supplier_city=" + "''";
					} else {
						pm += "&supplier_city=" + project.supplier_city; //拼接供应商参数
					}

				}

				//拼接订单状态参数
				var orderState_id = orderState.getValue("order_state");
				pm += "&orderstatus=" + parseInt(orderState_id);

				//拼接物流方案参数
				var logisSolution_id = logisSolution.getValue("logis_solution");
				pm += "&logis_solution=" + parseInt(logisSolution_id);

				//获取质检级别 value
				var qualityCheckLevel_id = qualityCheckLevel.getValue("quality_checkLevel");
				pm += "&qualitylevel=" + parseInt(qualityCheckLevel_id);

				//获取质检日期
				var startDataTime = start_dataTime.getDatatime("start_dataTime"); //获取
				pm += "&expectdeliverystarttime=" + startDataTime;

				//获取结束日期
				var endDataTime = end_dataTime.getDatatime("end_dataTime"); //获取
				pm += "&expectdeliveryendtime=" + endDataTime;

				//获取 ticket
				var ticket = utilService.TICKET;

				//系统代审
				if($("#_checkbox").is(':checked')) {
					pm += "&containsSysRepCheck=" + true;
				} else {
					pm += "&containsSysRepCheck=" + false;
				}

				//模拟from 提交 实现下载文件流
				var form = $("<form>");
				form.attr('style', 'display:none');
				form.attr('target', '');
				form.attr('method', 'post');
				form.attr('action', utilService.ZJGL_SERVICE_URL + '/QualityUnCheckOrder/ExportUnCheckOrders' + pm + "&ticket=" + ticket);
				$('body').append(form);
				form.submit();

			};

			//订单检索
			$scope.search_order = function(order) {

				if(undefined == order) {
					order = {};
				} else {}

				// 获取订单状态 value
				var orderState_add_id = orderState_add.getValue("order_state_add");
				order.orderstatus = parseInt(orderState_add_id);

				//获取物流方案 value
				var logisSolution_add_id = logisSolution_add.getValue("logis_solution_add");
				order.logis_solution = parseInt(logisSolution_add_id);

				order_grid.retrieve(order);

			};

			//打开质检方案 window
			$scope.zjfa = function() {

				//获取选中行的值
				var idsToSend = [];
				var grid = $("#grid").data("kendoGrid");
				var ds = grid.dataSource.view();
				for(var i = 0; i < ds.length; i++) {
					var row = grid.table.find("tr[data-uid='" + ds[i].uid + "']");
					var checkbox = $(row).find(".checkbox");
					if(checkbox.is(":checked")) {
						idsToSend.push(ds[i]); //将当前行 数据存进集合
					}
				};

				if(idsToSend.length == 0) {
					uiService.alert("请选择订单");
				} else if(idsToSend.length > 1) {
					uiService.alert("只能选择一条订单");
				} else if(idsToSend[0].QualityStatus == "未完成") {
					uiService.alert("只能选择质检状态为 未质检的订单");
				} else {
					//配置 window config
					var window_config;
					window_config = {
						divId: "zjfa_window",
						width: "500px",
						height: "260px",
						title: "待质检订单列表／质检方案",
						onClose: onClose,
					};

					//生成window
					window_zjfa = uiService.window(window_config);

					//监听关闭事件
					function onClose(e) {
						var breadcrumb = window.parent.document.getElementById("breadcrumb");
						breadcrumb.style.borderBottom = "1px solid #ddd";
					};
				}
			};

			//质检方案保存
			$scope.zjfa_save = function(project) {

				if(undefined == project) {
					project = {};
				} else {}

				//改变按钮状态
				$("#zjfa_window button").html("正在进行质检...");

				//获取选中行的值
				var idsToSend = [];
				var grid = $("#grid").data("kendoGrid");
				var ds = grid.dataSource.view();
				for(var i = 0; i < ds.length; i++) {
					var row = grid.table.find("tr[data-uid='" + ds[i].uid + "']");
					var checkbox = $(row).find(".checkbox");
					if(checkbox.is(":checked")) {
						idsToSend.push(ds[i].OrderCode); //将当前行 订单编号 存进集合
					}
				};

				var ordercodes = [];

				//拼接get 请求参数
				for(var j = 0; j < idsToSend.length; j++) {
					ordercodes[j] = idsToSend[j];
				};

				//获取模版id
				var t_id = $("#template_zjfa").data("kendoDropDownList").value();
				project.templateid = t_id;
				project.ordercodes = ordercodes;
				project = JSON.stringify(project);

				//调用后台质检方案接口
				$.ajax({
					type: 'POST',
					url: utilService.ZJGL_SERVICE_URL + "QualityUnCheckOrder/AddQualityCheckScheme",
					data: project,
					dataType: 'json',
					contentType: "application/json",
					success: function(data) {
						if(data.status == 0) {
							window_zjfa.close();
							uiService.alert(data.msg);
							//改变按钮状态
							$("#zjfa_window button").html("确认");
						} else {
							window_zjfa.close();
							djclbGrid.reload();
							uiService.notification().successMsg("操作成功!"); //操作提示消息
							//改变按钮状态
							$("#zjfa_window button").html("确认");
						}
					}
				}); //结束

			};

			//打开添加订单 window
			$scope.tjdd = function() {

				//配置 window config
				var window_config;
				window_config = {
					divId: "tjdd_window",
					width: "900px",
					height: "450px",
					title: "待质检订单列表／添加订单",
					onClose: onClose,
				};

				//生成window
				window_tjdd = uiService.window(window_config);

				//清空表单
				if(undefined == $scope.order) {
					orderState_add.setText("order_state_add", "全部");
					logisSolution_add.setText("logis_solution_add", "全部");
				} else {
					orderState_add.setText("order_state_add", "全部");
					logisSolution_add.setText("logis_solution_add", "全部");
					$scope.order.ordercode = "";
					$scope.order.ordername = "";
					$scope.order.supplier = "";
					$scope.order.supplier_city = "";
				};

				//加载订单信息 表格
				order_grid = uiService.generateGrid(order_grid_columns, order_grid_config);

				//监听关闭事件
				function onClose(e) {
					var breadcrumb = window.parent.document.getElementById("breadcrumb");
					breadcrumb.style.borderBottom = "1px solid #ddd";
				};
			};

			//添加订单
			$scope.add_order = function() {
				//获取选中行的值
				var idsToSend = [];
				var grid = $("#order_grid").data("kendoGrid");
				var ds = grid.dataSource.view();
				for(var i = 0; i < ds.length; i++) {
					var row = grid.table.find("tr[data-uid='" + ds[i].uid + "']");
					var checkbox = $(row).find(".checkbox");
					if(checkbox.is(":checked")) {
						idsToSend.push(ds[i].OrderCode); //将当前行 订单编号 存进集合
					}
				};

				if(idsToSend.length == 0) {
					uiService.alert("请选择订单");
				} else {
					//参数
					var pam = "?ordercodes="

					//拼接get 请求参数
					for(var j = 0; j < idsToSend.length; j++) {
						if(j > 0) {
							pam = pam + "," + idsToSend[j];
						} else {
							pam += idsToSend[j];
						}
					};

					var data = {};
					data = JSON.stringify(data);

					//调用后台 添加订单接口
					$.ajax({
						type: 'POST',
						url: utilService.ZJGL_SERVICE_URL + "QualityUnCheckOrder/AddUnCheckOrder" + pam,
						data: data,
						dataType: 'json',
						contentType: "application/json",
						success: function(data) {
							uiService.alert(data.msg + "," + data.data);
						}
					});
				}
			};

			//上传文件配置
			$("#upload-btn").Pluploader_1({
				vmodulename: "qa_files",
				vbrowse_button: "browse"
			}, function(res) {
				uploaded(res);
			});

			function uploaded(res) {
				$('#file-list').val(res.osskey); // osskey 文件存储路径 可用于文件下载使用 需要保存并上传回服务器
			};

			//打开批量质检窗口
			var plzj_window;
			$scope.plzj = function() {

				//清除上传文件
				$("#file-list").html("");
				var _osskey_djclb = window.sessionStorage.getItem("_osskey_djclb");
				if(_osskey_djclb == null) {} else {
					sessionStorage.removeItem("_osskey_djclb"); //移除
				};

				//获取选中行的值
				var idsToSend = [];
				var grid = $("#grid").data("kendoGrid");
				var ds = grid.dataSource.view();
				for(var i = 0; i < ds.length; i++) {
					var row = grid.table.find("tr[data-uid='" + ds[i].uid + "']");
					var checkbox = $(row).find(".checkbox");
					if(checkbox.is(":checked")) {
						idsToSend.push(ds[i]); //将当前行 数据存进集合
					}
				};

				var _is_state = 1;
				for(var j = 0; j < idsToSend.length; j++) {
					if(idsToSend[j].QualityStatus == "未完成") {
						_is_state = 1;
						break;
					} else {
						_is_state = 2;
					}
				};

				if(idsToSend.length == 0) {
					uiService.alert("请选择订单");
				} else if(_is_state == 1) {
					uiService.alert("只能选择 质检状态为 未质检的订单！");
				} else {
					//配置 window config
					var window_config;
					window_config = {
						divId: "plzj_window",
						width: "500px",
						height: "450px",
						title: "待质检订单列表／批量质检",
						onClose: onClose,
					};

					//生成window
					window_plzj = uiService.window(window_config);

					//监听关闭事件
					function onClose(e) {
						var breadcrumb = window.parent.document.getElementById("breadcrumb");
						breadcrumb.style.borderBottom = "1px solid #ddd";

						//清除上传文件
						$("#file-list").html("");
						var _osskey_djclb = window.sessionStorage.getItem("_osskey_djclb");
						if(_osskey_djclb == null) {} else {
							sessionStorage.removeItem("_osskey_djclb"); //移除
						};
					};
				}
			};

			//批量质检保存
			$scope.plzj_save = function(project) {

				if(undefined == project) {
					project = {};
				} else {}

				var _osskey_djclb = window.sessionStorage.getItem("_osskey_djclb");
				if(null == _osskey_djclb) {} else {
					_osskey_djclb = JSON.parse(_osskey_djclb);
					project.filekey = _osskey_djclb[0].qcfilekey;
					project.filename = _osskey_djclb[0].qcfilename;
				}

				//改变按钮状态
				$("#plzj_window .btn-info").html("正在进行质检...");

				//获取选中行的值
				var idsToSend = [];
				var grid = $("#grid").data("kendoGrid");
				var ds = grid.dataSource.view();
				for(var i = 0; i < ds.length; i++) {
					var row = grid.table.find("tr[data-uid='" + ds[i].uid + "']");
					var checkbox = $(row).find(".checkbox");
					if(checkbox.is(":checked")) {
						idsToSend.push(ds[i].OrderCode); //将当前行 订单编号 存进集合
					}
				}

				var ordercodes = [];

				//拼接get 请求参数
				for(var j = 0; j < idsToSend.length; j++) {
					ordercodes[j] = idsToSend[j];
				};

				//获取模版id
				var t_id = $("#template_plzj").data("kendoDropDownList").value();

				//获取是否接收
				var isrecieve = $("#isReceive").data("kendoDropDownList").value();

				if(isrecieve == 1) {
					project.isrecieve = true;
				} else {
					project.isrecieve = false;
				}

				project.templateid = t_id;
				project.ordercodes = ordercodes;
				project = JSON.stringify(project);

				//调用后台批量质检接口
				$.ajax({
					type: 'POST',
					url: utilService.ZJGL_SERVICE_URL + "QualityUnCheckOrder/BatchQualityCheck",
					data: project,
					dataType: 'json',
					contentType: "application/json",
					success: function(data) {
						if(data.status == 1) {
							window_plzj.close();
							djclbGrid.reload();
							$("#plzj_window .btn-info").html("确认");
							uiService.notification().successMsg("操作成功!"); //操作提示消息
						} else {
							window_plzj.close();
							$("#plzj_window .btn-info").html("确认");
							uiService.alert(data.msg);
						}

						//清除上传文件
						$("#file-list").html("");
						var _osskey_djclb = window.sessionStorage.getItem("_osskey_djclb");
						if(_osskey_djclb == null) {} else {
							sessionStorage.removeItem("_osskey_djclb"); //移除
						};

					}
				}); //结束
			};

			//进行质检
			$scope.jxzj = function() {

				//获取选中行的值
				var idsToSend = [];
				var grid = $("#grid").data("kendoGrid");
				var ds = grid.dataSource.view();
				for(var i = 0; i < ds.length; i++) {
					var row = grid.table.find("tr[data-uid='" + ds[i].uid + "']");
					var checkbox = $(row).find(".checkbox");
					if(checkbox.is(":checked")) {
						idsToSend.push(ds[i]); //将当前行数据 存进集合
					}
				};

				if(idsToSend.length == 0) {
					uiService.alert("请选择订单");
				} else {
					if(idsToSend.length > 1) {
						uiService.alert("只能选择一条订单");
					} else {

						//将选中行数据 转换为字符,方便存储到缓存
						var idsToSendStr = JSON.stringify(idsToSend);
						//订单编号
						idsToSend_code = idsToSend[0].OrderCode;

						if(idsToSend[0].QualityStatus == "未质检" || idsToSend[0].QualityStatus == "系统代检") { //状态为未质检 进行新增操作
							window.sessionStorage.setItem("zjpt_dzj_order_dataVersion", idsToSendStr);
							window.location.href = utilService.ADDRESS + '/zjgl/zjd.html?id=' + idsToSend_code;
							//							createTab("质检单", idsToSend[0].OrderCode, utilService.ADDRESS + '/zjgl/zjd.html?id=' + idsToSend_code);
						} else { //状态为未完成 进行编辑操作
							window.sessionStorage.setItem("zjpt_dzj_order_info_edit", idsToSendStr);
							window.location.href = utilService.ADDRESS + '/zjgl/zjd_edit.html?id=dzjlb';
						}

					}
				}
			}; //进行质检结束

		}
	]);
})();