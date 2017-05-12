(function() {
	/**
	 * 作者: furw
	 * 描述: 质检单列表 module
	 */
	var zjdlbModule = angular.module('zjdlbModule', ['mainModule']);

	/**
	 * 作者: furw
	 * 描述: 质检单列表 控制器
	 */
	zjdlbModule.controller('zjdlbCtrl', ['$scope', 'utilService', 'uiService',
		function($scope, utilService, uiService) {

			var zjdlbGrid, //Grid
				columns, //Grid 列
				gridConfig, //grid 配置
				qc_Time, //日期
				qc_Timee_config, //日期选择配置
				qualitystatus, // 质检状态下拉
				qualitystatus_config, //质检状态下拉配置
				qualitylevel, //质检单级别下拉
				qualitylevel_config; //质检单级别下拉配置

			//初始化
			$scope.init = function() {
				$scope.initDatepicker(); // 初始化日期
				$scope.initDropdownlist(); //初始化下拉框
				$scope.initGrid(); // 初始化 grid
			};

			//初始化 grid
			$scope.initGrid = function() {
				zjdlbGrid = uiService.createGrid(columns, gridConfig);
			};

			//初始化日期
			$scope.initDatepicker = function() {
				qc_Time = uiService.createDatepicker(qc_Timee_config);
			};

			//初始化下拉框
			$scope.initDropdownlist = function() {
				qualitystatus = uiService.createDropdownlist(qualitystatus_config);
				qualitylevel = uiService.createDropdownlist(qualitylevel_config);
			}

			//Grid 配置
			gridConfig = {
				dataSouce: utilService.ZJGL_SERVICE_URL + "QualityCheck/QualityCheckList", //URL
				divId: "grid", //grid id
				sortable: true, //排序
				pageable: true //分页
			};

			//质检状态下拉配置
			qualitystatus_config = {
				divId: "qualitystatus", //下拉框id
				_pm: "QualityCheckStatus", //参数
				_isAddAll: true, //是否拼接全部节点
				_url: utilService.ZJGL_SERVICE_URL + "Base/GetDropDownListByFlag", //URL
			};

			//质检级别下拉配置
			qualitylevel_config = {
				divId: "qualitylevel", //下拉框id
				_pm: "QualityCheckLevel", //参数
				_isAddAll: true, //是否拼接全部节点
				_url: utilService.ZJGL_SERVICE_URL + "Base/GetDropDownListByFlag", //URL
			};

			//日期 配置
			qc_Timee_config = {
				divId: "qc_Time",
			};

			//设置是否接收下拉数据
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

			// 初始化是否接收下拉框
			$("#isReceive").kendoDropDownList({
				dataTextField: "text",
				dataValueField: "value",
				dataSource: isReceive
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
				title: "订单编号",
			}, {
				field: "QCode",
				title: "质检单号",
				attributes: {
					onclick: 'downCount(this)',
					style: "color:blue; text-align: left;height:5px;padding-left: 10px;text-decoration:underline",
					onmouseover: "this.style.cursor='pointer'"
				}
			}, {
				field: "QcTime",
				title: "质检日期"
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
				field: "QualityLevel",
				title: "质检级别",
			}, {
				field: "Supplier",
				title: "供应商",
			}, {
				field: "Remark",
				title: "备注",
			}, {
				field: "QualityStatus",
				title: "质检状态",
				sortable: false,
			}];

			//清空
			$scope.empty = function(project) {
				if(undefined == project) {
					qualitystatus.setText("qualitystatus", "全部");
					qualitylevel.setText("qualitylevel", "全部");
					$("#isReceive").data("kendoDropDownList").text("全部");
					$("#qc_Time").val("");
				} else {
					qualitystatus.setText("qualitystatus", "全部");
					qualitylevel.setText("qualitylevel", "全部");
					$("#isReceive").data("kendoDropDownList").text("全部");
					$("#qc_Time").val("");
					$scope.project.qcode = "";
					$scope.project.supplier = "";
					$scope.project.ordercode = "";
					$scope.project.qc_remark = "";
				}
			};

			//搜索
			$scope.search = function(project) {

				if(undefined == project) {
					project = {};
				} else {}

				// 获取是否接收 value
				var isReceive_id = $("#isReceive").data("kendoDropDownList").value();
				project.isrecived = parseInt(isReceive_id);

				//获取质检级别 value
				var qualitylevel_id = qualitylevel.getValue("qualitylevel");
				project.qualitylevel = parseInt(qualitylevel_id);

				//获取质检状态 value
				var qualitystatus_id = qualitystatus.getValue("qualitystatus");
				project.qualitystatus = parseInt(qualitystatus_id);

				//获取质检日期
				var _qc_Time = qc_Time.getDatatime("qc_Time");
				project.qc_Time = _qc_Time;

				//调用grid 的检索方法
				zjdlbGrid.search(project);
			}

			//导出
			//			$scope.export = function(project) {
			//
			//				var pm = "";
			//
			//				if(undefined == project) {
			//					pm += "?qcode=" + "''";
			//					pm += "&supplier=" + "''";
			//					pm += "&ordercode=" + "''";
			//					pm += "&qc_remark=" + "''";
			//				} else {
			//					pm += "?qcode=" + project.qcode; //拼接供应商参数
			//					pm += "&supplier=" + project.supplier;
			//					pm += "&ordercode=" + project.ordercode;
			//					pm += "&qc_remark=" + project.qc_remark;
			//				}
			//
			//				// 获取是否接收 value
			//				var isReceive_id = $("#isReceive").data("kendoDropDownList").value();
			//				pm += "&isrecived=" + parseInt(isReceive_id); //拼接是否接收参数
			//
			//				//获取质检级别 value
			//				var qualitylevel_id = qualitylevel.getValue("qualitylevel");
			//				pm += "&qualitylevel=" + parseInt(qualitylevel_id); //拼接质检级别参数
			//
			//				//获取质检状态 value
			//				var qualitystatus_id = qualitystatus.getValue("qualitystatus");
			//				pm += "&qualitystatus=" + parseInt(qualitystatus_id); //拼接质检状态参数
			//
			//				//获取质检日期
			//				var _qc_Time = qc_Time.getDatatime("qc_Time");
			//				pm += "&qc_Time=" + _qc_Time; //拼接质检状态参数
			//
			//				//获取 ticket
			//				var ticket = utilService.TICKET;
			//
			//				//模拟from 提交 实现下载文件流
			//				var form = $("<form>");
			//				form.attr('style', 'display:none');
			//				form.attr('target', '');
			//				form.attr('method', 'post');
			//				form.attr('action', 'http://test.98ep.com:9001/QualityCheck/ExportQualityCheckList' + pm + "&ticket=" + ticket);
			//				$('body').append(form);
			//				form.submit();
			//
			//			};

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

			//上传文件
			var window_scwj;
			$scope.upload_file = function() {

				//清除上传文件
				$("#file-list").html("");
				var _osskey_zjdlb = window.sessionStorage.getItem("_osskey_zjdlb");
				if(_osskey_zjdlb == null) {} else {
					sessionStorage.removeItem("_osskey_zjdlb"); //移除
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

				var isStatus = false;
				for(var i = 0; i < idsToSend.length; i++) {
					if(idsToSend[i].QualityStatus == "完成") {
						isStatus = true;
						break;
					}
				}

				if(idsToSend.length == 0) {
					uiService.alert("请选择质检单");
				} else if(isStatus) {
					uiService.alert("只能操作状态为 《 未完成 》的质检单");
				} else {

					//配置 window config
					var window_config;
					window_config = {
						divId: "scwj_window",
						width: "400px",
						height: "300px",
						title: "待质检订单列表／上传文件",
						onClose: onClose,
					};

					//生成window
					window_scwj = uiService.window(window_config);

					//监听关闭事件
					function onClose(e) {
						var breadcrumb = window.parent.document.getElementById("breadcrumb");
						breadcrumb.style.borderBottom = "1px solid #ddd";

						//清除上传文件
						$("#file-list").html("");
						var _osskey_zjdlb = window.sessionStorage.getItem("_osskey_zjdlb");
						if(_osskey_zjdlb == null) {} else {
							sessionStorage.removeItem("_osskey_zjdlb"); //移除
						};
					};

				}
			};

			//上传文件保存
			$scope.scwj_save = function() {

				var obj = new Object();

				//获取选中行的值
				var idsToSend = [];
				var grid = $("#grid").data("kendoGrid");
				var ds = grid.dataSource.view();
				for(var i = 0; i < ds.length; i++) {
					var row = grid.table.find("tr[data-uid='" + ds[i].uid + "']");
					var checkbox = $(row).find(".checkbox");
					if(checkbox.is(":checked")) {
						idsToSend.push(ds[i].Id); //将当前行 数据存进集合
					}
				};

				//拼接质检id
				obj.ids = [];
				for(var j = 0; j < idsToSend.length; j++) {
					obj.ids[j] = idsToSend[0];
				};

				var _osskey_zjdlb = window.sessionStorage.getItem("_osskey_zjdlb");

				if(null == _osskey_zjdlb) {} else {
					_osskey_zjdlb = JSON.parse(_osskey_zjdlb);
					obj.filekey = _osskey_zjdlb[0].qcfilekey;
					obj.filename = _osskey_zjdlb[0].qcfilename;
				}

				obj = JSON.stringify(obj);

				//调用后台批量复检接口
				$.ajax({
					type: 'POST',
					url: utilService.ZJGL_SERVICE_URL + "QualityCheck/UploadQcFile",
					data: obj,
					dataType: 'json',
					contentType: "application/json",
					success: function(data) {
						if(data.status == 1) {
							window_scwj.close();
							zjdlbGrid.reload();
							uiService.notification().successMsg("上传文件成功!");

							//清除上传文件
							$("#file-list").html("");
							var _osskey_zjdlb = window.sessionStorage.getItem("_osskey_zjdlb");
							if(_osskey_zjdlb == null) {} else {
								sessionStorage.removeItem("_osskey_zjdlb"); //移除
							};

						} else {
							uiService.alert(data.msg);
						}
					}
				}); //结束

			};

			//打印
			$scope.pint = function(project) {

				var pm = "";

				//获取选中行的值
				var idsToSend = [];
				var grid = $("#grid").data("kendoGrid");
				var ds = grid.dataSource.view();
				for(var i = 0; i < ds.length; i++) {
					var row = grid.table.find("tr[data-uid='" + ds[i].uid + "']");
					var checkbox = $(row).find(".checkbox");
					if(checkbox.is(":checked")) {
						idsToSend.push(ds[i].Id); //将当前行 数据存进集合
					}
				};

				if(undefined == project) {
					pm += "?qcode=" + "";
					pm += "&supplier=" + "";
					pm += "&ordercode=" + "";
					pm += "&qc_remark=" + "";
				} else {
					pm += "?qcode=" + project.qcode; //拼接供应商参数
					pm += "&supplier=" + project.supplier;
					pm += "&ordercode=" + project.ordercode;
					pm += "&qc_remark=" + project.qc_remark;
				}

				// 获取是否接收 value
				var isReceive_id = $("#isReceive").data("kendoDropDownList").value();
				//				project.isrecived = isReceive_id;
				pm += "&isrecived=" + parseInt(isReceive_id); //拼接是否接收参数

				//获取质检级别 value
				var qualitylevel_id = qualitylevel.getValue("qualitylevel");
				//				project.qualitylevel = qualitylevel_id;
				pm += "&qualitylevel=" + parseInt(qualitylevel_id); //拼接质检级别参数

				//获取质检状态 value
				var qualitystatus_id = qualitystatus.getValue("qualitystatus");
				//				project.qualitystatus = qualitystatus_id;
				pm += "&qualitystatus=" + parseInt(qualitystatus_id); //拼接质检状态参数

				//获取质检日期
				var _qc_Time = qc_Time.getDatatime("qc_Time");
				//				project.qc_Time = _qc_Time;
				pm += "&qc_Time=" + _qc_Time; //拼接质检状态参数

				var _pm = "";
				//拼接get 请求参数
				for(var i = 0; i < idsToSend.length; i++) {
					if(i == 0) {
						_pm = _pm + idsToSend[i];
					} else {
						_pm = _pm + "," + idsToSend[i];
					}
				};

				pm += "&checkedcode=" + _pm;

				//获取 ticket
				//var ticket = utilService.TICKET;

				$.post(utilService.ZJGL_SERVICE_URL + '/QualityCheck/ExportQualityCheckList' + pm, function(res) {
					printContentInNewWindow(res, 100);
				});

			};

			//进行质检 或 查看
			downCount = function(this_1) {

				//获取选中行数据
				var idsToSend = [];
				var _this = this_1.parentNode.rowIndex - 1;
				var grid = $("#grid").data("kendoGrid");
				var ds = grid.dataSource.view();
				for(var i = 0; i < ds.length; i++) {
					var row = grid.table.find("tr[data-uid='" + ds[i].uid + "']");
					if(i == _this) {
						idsToSend.push(ds[i]); //获取选中行 数据存入集合
					}
				};

				//将对象转换为字符串
				var idsToSendStr = JSON.stringify(idsToSend);
				//质检单id
				var idsToSendStr_id = idsToSend[0].Id;

				if(idsToSend[0].QualityStatus == "完成") { //质检状态为 完成 跳转到质检单查看页面
					window.sessionStorage.setItem("zjpt_zjd_zjd_dataVersion", idsToSendStr);
					window.location.href = utilService.ADDRESS + '/zjgl/zjd_detail.html?id=' + idsToSendStr_id;
					//打开新的tab 页签
					//createTab("质检单", idsToSend[0].QCode, utilService.ADDRESS + '/zjgl/zjd_detail.html?id=' + idsToSendStr_id);

				} else { //质检状态为 未完成 跳转到质检单编辑页面
					window.sessionStorage.setItem("zjpt_zjd_zjd_info_edit", idsToSendStr);
					window.location.href = utilService.ADDRESS + '/zjgl/zjd_edit.html?id=zjdlb';
					//打开新的tab 页签
					//createTab("质检单", idsToSend[0].QCode, utilService.ADDRESS + '/zjgl/zjd_edit.html?id=zjdlb');
				}
			}; //进行质检 结束

		}
	]);
})();