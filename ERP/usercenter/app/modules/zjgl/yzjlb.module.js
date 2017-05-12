(function() {
	/**
	 * 作者: furw
	 * 描述: 已质检订单列表 module
	 */
	var yzjlbModule = angular.module('yzjlbModule', ['mainModule']);

	/**
	 * 作者: furw
	 * 描述: 已质检订单列表 控制器
	 */
	yzjlbModule.controller('yzjlbCtrl', ['$scope', 'utilService', 'uiService',
		function($scope, utilService, uiService) {

			var yzjlbGrid, //Grid
				columns, //Grid 列
				gridConfig, //grid 配置
				window_add, //新建 window
				//orderState, //订单状态下拉
				//orderState_config, //订单状态下拉配置
				qualityTemplate, //质检模版下拉 (复检)
				logisSolution, //物流方案下拉
				qualitystatus, //质检状态下拉
				qualitystatus_config, // 质检状态下拉配置
				logisSolution_config, //物流方案下拉配置
				qualityCheckLevel, //质检级别下拉
				qualityCheckLevel_config, //质检级别下拉
				qctimestart, //质检开始时间
				qctimeend, //质检结束时间
				qctimestart_config, //质检开始时间配置
				qctimeend_config; //质检结束时间配置

			//初始化
			$scope.init = function() {
				$scope.initDropdownlist(); //初始化下拉框
				$scope.initDatepicker(); //初始化日期控件
				$scope.initGrid(); // 初始化 grid
			};

			//初始化 grid
			$scope.initGrid = function() {
				yzjlbGrid = uiService.createGrid(columns, gridConfig);
			};

			//初始化日期控件
			$scope.initDatepicker = function() {
				qctimestart = uiService.createDatepicker(qctimestart_config);
				qctimeend = uiService.createDatepicker(qctimeend_config);
			};

			//初始化下拉框
			$scope.initDropdownlist = function() {
				qualityCheckLevel = uiService.createDropdownlist(qualityCheckLevel_config);
				//orderState = uiService.createDropdownlist(orderState_config);
				logisSolution = uiService.createDropdownlist(logisSolution_config);
				qualitystatus = uiService.createDropdownlist(qualitystatus_config);
			}

			//Grid 配置
			gridConfig = {
				dataSouce: utilService.ZJGL_SERVICE_URL + "QualityCheck/CheckedList", //URL
				divId: "grid", //grid id
				sortable: true, //排序
				pageable: true //分页
			};

			//日期 配置
			qctimestart_config = {
				divId: "qctimestart", //日期id
			};

			//日期 配置
			qctimeend_config = {
				divId: "qctimeend", //日期id
			};

			//质检级别下拉框配置
			qualityCheckLevel_config = {
				divId: "qualitylevel", //下拉框id
				_pm: "QualityCheckLevel", // 参数
				_isAddAll: true, //是否拼接全部节点
				_url: utilService.ZJGL_SERVICE_URL + "Base/GetDropDownListByFlag", //URL
			};

			//订单状态下拉框配置
			//	orderState_config = {
			//		divId: "order_state", //下拉框id
			//		_pm: "OrderState", // 参数
			//		_isAddAll: true, //是否拼接全部节点
			//		_url: utilService.ZJGL_SERVICE_URL + "Base/GetDropDownListByFlag", //URL
			//	};

			//物流方案下拉框配置
			logisSolution_config = {
				divId: "logis_solution", //下拉框id
				_pm: "LogisSolution", // 参数
				_isAddAll: true, //是否拼接全部节点
				_url: utilService.ZJGL_SERVICE_URL + "Base/GetDropDownListByFlag", //URL
			};

			//质检状态下拉框配置
			qualitystatus_config = {
				divId: "qualitystatus", //下拉框id
				_pm: "QualityCheckStatus", // 参数
				_isAddAll: true, //是否拼接全部节点
				_url: utilService.ZJGL_SERVICE_URL + "Base/GetDropDownListByFlag", //URL
			};

			//设置是否接收下拉框数据
			var isReceive = [{
				text: "全部",
				value: "-2"
			}, {
				text: "是",
				value: "1"
			}, {
				text: "否",
				value: "0"
			}];

			//设置是否接收下拉框数据
			var isReceive_fj = [{
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

			// 初始化是否接收下拉框
			$("#isReceive_fj").kendoDropDownList({
				dataTextField: "text",
				dataValueField: "value",
				dataSource: isReceive_fj
			});

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
				title: "订单编号"
			}, {
				field: "OrderInfo",
				title: "订单信息",
			}, {
				field: "QcTime",
				title: "质检时间",
				width: 100,
				sortable: false,
			}, {
				field: "Supplier",
				title: "供应商",
			}, {
				field: "QualityLevel",
				title: "质检级别",
				sortable: false,
			}, {
				field: "LogisSolution",
				title: "物流方案",
				sortable: false,
			}, {
				field: "IsRecieved",
				title: "是否接收",
				values: [{
					text: "是",
					value: true
				}, {
					text: "否",
					value: false
				}]
			}, {
				field: "QualityStatus",
				title: "质检状态",
			}, {
				field: "CheckCount",
				title: "已检次数",
			}];

			//获取供应商下拉框数据
			$.ajax({
				type: 'GET',
				url: utilService.ZJGL_SERVICE_URL + "QualityTemplate/GetTemplateList",
				dataType: 'json',
				contentType: "application/json",
				success: function(data) {

					//生成供应商下拉框
					qualityTemplate = $("#qualityTemplate_fj").kendoDropDownList({ //初始化
						dataTextField: "TemplateName",
						dataValueField: "Id",
						dataSource: data
					}).data("kendoDropDownList");

				}
			}); //结束

			//搜索
			$scope.search = function(project) {

				if(undefined == project) {
					project = {};
				} else {}

				//	获取订单状态 value
				//	var orderState_id = orderState.getValue("order_state");
				//	orderState_id = parseInt(orderState_id);

				// 获取是否接收 value
				var isReceive_id = $("#isReceive").data("kendoDropDownList").value();
				project.isrecived = parseInt(isReceive_id);

				//获取质检开始日期
				var startDataTime = qctimeend.getDatatime("qctimestart"); //获取
				project.qctimestart = startDataTime;

				//获取结结束束日期
				var endDataTime = qctimeend.getDatatime("qctimeend"); //获取
				project.qctimeend = endDataTime;

				//获取质检级别 value
				var qualitylevel_id = qualityCheckLevel.getValue("qualitylevel");
				project.qualitylevel = parseInt(qualitylevel_id);

				//获取质检状态 value
				var qualitystatus_id = qualitystatus.getValue("qualitystatus");
				project.qualitystatus = parseInt(qualitystatus_id);

				//获取物流方案 value
				var logisSolution_id = logisSolution.getValue("logis_solution");
				project.logis_solution = parseInt(logisSolution_id);

				//调用grid 的检索方法
				yzjlbGrid.search(project);
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

			//打开批量复检窗口
			$scope.plfj = function() {

				//清除上传文件
				$("#file-list").html("");
				var _osskey_yzjlb = window.sessionStorage.getItem("_osskey_yzjlb");
				if(_osskey_yzjlb == null) {} else {
					sessionStorage.removeItem("_osskey_yzjlb"); //移除
				};

				//配置 window config
				var window_config;
				window_config = {
					divId: "plfj_window",
					width: "500px",
					height: "430px",
					title: "待质检单列表／批量质检",
					onClose: onClose,
				};

				//获取选中行的值
				var idsToSend = [];
				var grid = $("#grid").data("kendoGrid");
				var ds = grid.dataSource.view();
				for(var i = 0; i < ds.length; i++) {
					var row = grid.table.find("tr[data-uid='" + ds[i].uid + "']");
					var checkbox = $(row).find(".checkbox");
					if(checkbox.is(":checked")) {
						idsToSend.push(ds[i].Id); //将当前行id存进集合
					}
				};

				//判断是否选择质检项
				if(idsToSend.length == 0) {
					uiService.alert("请选择质检项");
				} else {
					//生成window
					window_add = uiService.window(window_config);
				}

				//监听关闭事件
				function onClose(e) {
					var breadcrumb = window.parent.document.getElementById("breadcrumb");
					breadcrumb.style.borderBottom = "1px solid #ddd";

					//清除上传文件
					$("#file-list").html("");
					var _osskey_yzjlb = window.sessionStorage.getItem("_osskey_yzjlb");
					if(_osskey_yzjlb == null) {} else {
						sessionStorage.removeItem("_osskey_yzjlb"); //移除
					};
				};

			};

			//批量复检 保存
			$scope.fj_save = function(pm) {

				//验证参数是否为空
				if(undefined == pm) {
					pm = {};
				} else {}

				var _osskey_yzjlb = window.sessionStorage.getItem("_osskey_yzjlb");
				if(null == _osskey_yzjlb) {} else {
					_osskey_yzjlb = JSON.parse(_osskey_yzjlb);
					pm.filekey = _osskey_yzjlb[0].qcfilekey;
					pm.filename = _osskey_yzjlb[0].qcfilename;
				}

				//改变按钮状态
				$("#plfj_window .btn-info").html("正在进行复检...");

				var templateid = $("#qualityTemplate_fj").data("kendoDropDownList").value();
				var isrecieve = $("#isReceive_fj").data("kendoDropDownList").value();

				pm.templateid = templateid; //拼接模版id

				if(isrecieve == 1) { //拼接是否接收
					pm.isrecieve = true;
				} else {
					pm.isrecieve = false;
				}

				//获取选中行的值
				var idsToSend = [];
				var grid = $("#grid").data("kendoGrid");
				var ds = grid.dataSource.view();
				for(var i = 0; i < ds.length; i++) {
					var row = grid.table.find("tr[data-uid='" + ds[i].uid + "']");
					var checkbox = $(row).find(".checkbox");
					if(checkbox.is(":checked")) {
						idsToSend.push(ds[i].Id); //将当前行id存进集合
					}
				};

				//拼接质检id
				pm.ordercodes = [];
				for(var j = 0; j < idsToSend.length; j++) {
					pm.ordercodes[j] = idsToSend[0];
				};

				pm = JSON.stringify(pm);

				//调用后台批量复检接口
				$.ajax({
					type: 'POST',
					url: utilService.ZJGL_SERVICE_URL + "QualityCheck/BatchReCheck",
					data: pm,
					dataType: 'json',
					contentType: "application/json",
					success: function(data) {
						if(data.status == 0) {
							window_add.close();
							uiService.alert(data.msg);
							//改变按钮状态
							$("#plfj_window .btn-info").html("确认");
						} else {
							window_add.close();
							yzjlbGrid.reload();
							uiService.notification().successMsg("操作成功!"); //操作提示消息
							//改变按钮状态
							$("#plfj_window .btn-info").html("确认");
						}
						//清除上传文件
						$("#file-list").html("");
						var _osskey_yzjlb = window.sessionStorage.getItem("_osskey_yzjlb");
						if(_osskey_yzjlb == null) {} else {
							sessionStorage.removeItem("_osskey_yzjlb"); //移除
						};
					}
				}); //结束

			};

			//导出
			$scope.export = function(project) {

				var pm = "";

				if(undefined == project) {
					pm += "?ordercode=" + "''";
					pm += "&ordername=" + "''";
					pm += "&supplier=" + "''";
					pm += "&qcperson=" + "''";
				} else {

					if(project.ordercode == undefined) {
						pm += "?ordercode=" + "''";
					} else {
						pm += "?ordercode=" + project.ordercode; //拼接供应商参数
					}

					if(undefined == project.ordername) {
						pm += "&ordername=" + "''";
					} else {
						pm += "&ordername=" + project.ordername;
					}

					if(undefined == project.supplier) {
						pm += "&supplier=" + "''";
					} else {
						pm += "&supplier=" + project.supplier;
					}

					if(undefined == project.qcperson) {
						pm += "&qcperson=" + "''";
					} else {
						pm += "&qcperson=" + project.qcperson;
					}

				}

				var isReceive_id = $("#isReceive").data("kendoDropDownList").value();
				pm += "&isrecived=" + parseInt(isReceive_id); //拼接是否接收参数

				//获取质检级别 value
				var qualitylevel_id = qualityCheckLevel.getValue("qualitylevel");
				pm += "&qualitylevel=" + parseInt(qualitylevel_id); //拼接质检级别参数

				//获取质检状态 value
				var qualitystatus_id = qualitystatus.getValue("qualitystatus");
				pm += "&qualitystatus=" + parseInt(qualitystatus_id); //拼接质检状态参数

				//获取物流方案 value
				var logisSolution_id = logisSolution.getValue("logis_solution");
				pm += "&logis_solution=" + parseInt(logisSolution_id); //拼接物流方案参数

				//获取质检开始日期
				var startDataTime = qctimeend.getDatatime("qctimestart"); //获取
				pm += "&qctimestart=" + startDataTime;

				//获取结结束束日期
				var endDataTime = qctimeend.getDatatime("qctimeend"); //获取
				pm += "&qctimestart=" + endDataTime;

				//获取 ticket
				var ticket = utilService.TICKET;

				//模拟from 提交 实现下载文件流
				var form = $("<form>");
				form.attr('style', 'display:none');
				form.attr('target', '');
				form.attr('method', 'post');
				form.attr('action', utilService.ZJGL_SERVICE_URL + '/QualityCheck/ExportCheckedList' + pm + "&ticket=" + ticket);
				$('body').append(form);
				form.submit();

			};

			//清空
			$scope.empty = function(project) {

				if(undefined == project) {
					//	orderState.setText("order_state", "全部");
					qualityCheckLevel.setText("qualitylevel", "全部");
					qualitystatus.setText("qualitystatus", "全部");
					logisSolution.setText("logis_solution", "全部");
					$("#isReceive").data("kendoDropDownList").text("全部");
					$("#qctimestart").val("");
					$("#qctimeend").val("");
				} else {
					//  orderState.setText("order_state", "全部");
					qualityCheckLevel.setText("qualitylevel", "全部");
					qualitystatus.setText("qualitystatus", "全部");
					logisSolution.setText("logis_solution", "全部");
					$("#isReceive").data("kendoDropDownList").text("全部");
					$scope.project.ordercode = "";
					$scope.project.ordername = "";
					$scope.project.supplier = "";
					$scope.project.qcperson = "";
					$("#qctimestart").val("");
					$("#qctimeend").val("");
				}

			};

			//进行复检
			$scope.jxfj = function() {

				//获取选中行的值
				var idsToSend = [];
				var grid = $("#grid").data("kendoGrid");
				var ds = grid.dataSource.view();
				for(var i = 0; i < ds.length; i++) {
					var row = grid.table.find("tr[data-uid='" + ds[i].uid + "']");
					var checkbox = $(row).find(".checkbox");
					if(checkbox.is(":checked")) {
						idsToSend.push(ds[i]); //将当前行 数据 存进集合
					}
				}

				if(idsToSend.length == 0) {
					uiService.alert("请选择质检单");
				} else {
					if(idsToSend.length > 1) {
						uiService.alert("只能选择一条质检单数据");
					} else {

						//将对象转换为字符串, 方便存储到缓存
						var idsToSendStr = JSON.stringify(idsToSend);

						if(idsToSend[0].QualityStatus == "完成") {

							//进行复检
							$.ajax({
								type: 'GET',
								url: utilService.ZJGL_SERVICE_URL + "QualityCheck/ReCheck?id=" + idsToSend[0].Id + "&version=" + idsToSend[0].OrderDataVersion,
								dataType: 'json',
								contentType: "application/json",
								success: function(data) {
									if(data.status == 0) {
										uiService.alert(data.msg);
									} else {
										window.sessionStorage.setItem("zjpt_yzj_zjd_info_edit", idsToSendStr);
										window.location.href = utilService.ADDRESS + '/zjgl/zjd_edit.html?id=yzjlb';
									}
								}
							}); //结束

						} else {
							uiService.alert("请选择质检状态为 完成的质检项，进行质检");
						}
					}
				}
			}; //进行复检结束

		}
	]);
})();