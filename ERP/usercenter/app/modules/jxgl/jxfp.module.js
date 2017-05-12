(function() {
	/**
	 * 作者: furw
	 * 描述: 绩效分配 module
	 */
	var jxfpModule = angular.module('jxfpModule', ['mainModule']);

	/**
	 * 作者: furw
	 * 描述: 绩效分配 控制器
	 */
	jxfpModule.controller('jxfpCtrl', ['$scope', 'utilService', 'uiService',
		function($scope, utilService, uiService) {

			var grid, //Grid
				columns, //Grid 列
				config, //grid 配置
				_user_grid, //Grid
				_user_columns, //Grid 列
				_user_config; //grid 配置

			//刷新dom
			function CheckScopeBeforeApply() {
				if(!$scope.$$phase) {
					$scope.$apply();
				}
			};

			//获取URL参数 
			var url_parame = window.location.search;

			url_parame = unescape(url_parame); //解密

			url_parame = url_parame.substr(url_parame.lastIndexOf("="));
			url_parame = url_parame.substr(1);
			url_parame = decodeURI(url_parame); //转码

			var arr = url_parame.split(','); //截取字符串(按,截取)

			var dep1 = arr[0]; //参数客户一部
			var dep2 = arr[1]; //参数客户二部
			var year = arr[2]; //参数年
			var month = arr[3]; //参数月

			$("#dep1").html(dep2);
			$("#dep2").html(dep2);

			//初始化
			$scope.init = function() {
				$scope.initGrid(); // 初始化 grid
				$scope.project1 = {};
				$scope.project2 = {};
				$scope.project3 = {};
			};

			//初始化 grid
			$scope.initGrid = function() {
				grid = uiService.createGrid(columns, config);
			};

			//参数
			var parameter = {
				"dep1": dep1,
				"dep2": dep2,
				"year": year,
				"month": month
			};

			//获取部门提成详细
			$.ajax({
				type: 'get',
				url: utilService.JXGL_SERVICE_URL + "Bonus/getinfo",
				data: parameter,
				async: false,
				dataType: 'json',
				success: function(data) {
					var _data = data.data;
					$(".dep1").html(_data.dep1);
					$(".dep2").html(_data.dep2);
					$(".bd").html(_data.bd);
					$(".bm").html(_data.bm);
					$(".chizi").html(_data.chizi);
					$(".pm").html(_data.pm);
					$(".zong").html(_data.zong);
				}
			});

			//Grid 配置
			config = {
				dataSouce: utilService.JXGL_SERVICE_URL + "Bonus/GetList", //URL
				divId: "grid", //grid id
				sortable: true, // 排序
				pageable: false, //分页
				scrollable: true, //可滚动
				queryCondition: { //参数
					"dep1": dep1,
					"dep2": dep2,
					"year": year,
					"month": month
				},
				setBgColor: true,
				callback2: setColor //回调函数
			};

			//设置行颜色 Grid 回调函数
			function setColor() {
				var grid = $("#grid").data("kendoGrid");
				var ds = grid.dataSource.view();
				for(var i = 0; i < ds.length; i++) {
					var row = grid.table.find("tr[data-uid='" + ds[i].uid + "']");
					if(i == 0) {
						row.find("td").eq(12).css("color", "red");
						row.find("td").eq(2).css("border-right", "0px");
						row.find("td").eq(3).css("border-right", "0px");
						row.find("td").eq(3).css("border-left", "0px");
						row.find("td").eq(3).html("合计");
						row.find("td").eq(3).css("text-align", "center");
						row.find("td").eq(3).css("color", "red");
						row.find("td").eq(4).css("border-left", "0px");
						$(row).find(".checkbox").attr("disabled", "disabled");
					}
				}
			};

			//用户列表 Grid 配置
			_user_config = {
				_dataSouce: utilService.JXGL_SERVICE_URL + "Bonus/GetUserList", //URL
				_divId: "user_grid", //grid id
				_sortable: false, // 排序
				_pageable: true, //分页
				_pageSize: 7
			};

			//上传文件配置
			$("#upload-btn_1").Pluploader_1({
				vmodulename: "qa_files",
				vbrowse_button: "browse_1"
			}, function(res) {
				uploaded(res);
			});

			function uploaded(res) {
				$('#file-list_1').val(res.osskey); // osskey 文件存储路径 可用于文件下载使用 需要保存并上传回服务器
			};

			//打开其他费用window
			$scope.qtfy = function() {

				//获取选中行的值
				idsToSend = [];
				var grid = $("#grid").data("kendoGrid");
				var ds = grid.dataSource.view();
				for(var i = 0; i < ds.length; i++) {
					var row = grid.table.find("tr[data-uid='" + ds[i].uid + "']");
					var checkbox = $(row).find(".checkbox");
					if(checkbox.is(":checked")) {
						idsToSend.push(ds[i]); //将当前行 id 存进集合
					}
				};

				if(idsToSend.length == 0) {
					uiService.alert("请选择人员！");
				} else if(idsToSend.length > 1) {
					uiService.alert("只能选择一个人员！");
				} else {

					//配置 window config
					var window_config;
					window_config = {
						divId: "qtfy_window",
						width: "430",
						height: "280px",
						title: "其他费用",
						onClose: onClose,
					};

					$scope.project3.bm = ""; //bd部门提成
					$scope.project3.BDPond = ""; //bd费用池子
					$scope.project3.pm = ""; //pm

					$scope.project3.bm = idsToSend[0].DepCommission;
					$scope.project3.BDPond = idsToSend[0].BDPond;
					$scope.project3.pm = idsToSend[0].PM;
					CheckScopeBeforeApply();

					//生成window
					qtfy_window = uiService.window(window_config);

					//监听关闭事件
					function onClose(e) {
						var breadcrumb = window.parent.document.getElementById("breadcrumb");
						breadcrumb.style.borderBottom = "1px solid #ddd";
					};
				}
			};

			//关闭 其他费用 window
			$scope.close1 = function() {
				qtfy_window.close();
			};

			//其他费用保存
			$scope.bcqtfy = function(str) {

				//表单验证
				var validation = uiService.createValidForm("save_validForm1", "editValidMsg2");
				if(validation.check()) {

					if(undefined == str) {
						str = {};
					} else {}

					//获取选中行的值
					idsToSend = [];
					var _grid = $("#grid").data("kendoGrid");
					var ds = _grid.dataSource.view();
					for(var i = 0; i < ds.length; i++) {
						var row = _grid.table.find("tr[data-uid='" + ds[i].uid + "']");
						var checkbox = $(row).find(".checkbox");
						if(checkbox.is(":checked")) {
							idsToSend.push(ds[i]); //将当前行 id 存进集合
						}
					};

					str.guid = idsToSend[0].GUID;

					$.ajax({
						type: 'POST',
						url: utilService.JXGL_SERVICE_URL + "Bonus/UpdateBonus",
						data: str,
						dataType: 'json',
						//contentType: "application/json",
						success: function(data) {
							if(data.state == 1) {
								grid.reload(); //刷新表格
								qtfy_window.close();
								uiService.notification().successMsg("操作成功!"); //操作提示消息
							} else {
								uiService.alert(data.msg);
							}
						}
					});

				}
			};

			//打开调整金额 window
			$scope.tzje = function() {

				//获取选中行的值
				idsToSend = [];
				var grid = $("#grid").data("kendoGrid");
				var ds = grid.dataSource.view();
				for(var i = 0; i < ds.length; i++) {
					var row = grid.table.find("tr[data-uid='" + ds[i].uid + "']");
					var checkbox = $(row).find(".checkbox");
					if(checkbox.is(":checked")) {
						idsToSend.push(ds[i]); //将当前行 id 存进集合
					}
				};

				if(idsToSend.length == 0) {
					uiService.alert("请选择人员！");
				} else if(idsToSend.length > 1) {
					uiService.alert("只能选择一个人员！");
				} else {

					//图片预览
					if(idsToSend[0].EvidencePath == "") {
						$("#file-list_1").html("");
					} else {
						$("#file-list_1").html("");
						$("#file-list_1").append('<div style="margin-top:10px" class="see_photo" data-path=' + idsToSend[0].EvidencePath + '><a target="_blank" style="color:blue" href="http://filed.98ep.com/' + idsToSend[0].EvidencePath + '">' + idsToSend[0].EvidencePath + '</a><span class="glyphicon glyphicon-remove remove_1" style="color: #BE0004;margin-left:10px; cursor: pointer"></span></div>');
						//清空图片预览
						$("#file-list_1 .see_photo span").click(function() {
							$("#file-list_1").html("");
						});
					};

					var _osskey_jxfp = window.sessionStorage.getItem("_osskey_jxfp");
					if(_osskey_jxfp == null) {} else {
						sessionStorage.removeItem("_osskey_jxfp"); //移除
					};

					//配置 window config
					var window_config;
					window_config = {
						divId: "tzje_window",
						width: "450",
						height: "410px",
						title: "调整金额",
						onClose: onClose,
					};

					$scope.project1.othermoney = ""; //清空其他费用文本框
					$scope.project1.remark = ""; //清空备注文本框

					$scope.project1.othermoney = idsToSend[0].AdjustmentMoney;
					$scope.project1.remark = idsToSend[0].AdjustmentRemark;
					CheckScopeBeforeApply();

					//生成window
					tzje_window = uiService.window(window_config);

					//监听关闭事件
					function onClose(e) {
						var breadcrumb = window.parent.document.getElementById("breadcrumb");
						breadcrumb.style.borderBottom = "1px solid #ddd";
					};
				}
			};

			//关闭 调整金额 window
			$scope.close = function() {
				tzje_window.close();
			};

			//调整金额 保存
			$scope.bctzje = function(str) {

				//表单验证
				var validation = uiService.createValidForm("save_validForm", "editValidMsg1");
				if(validation.check()) {

					//获取选中行的值
					idsToSend = [];
					var _grid = $("#grid").data("kendoGrid");
					var ds = _grid.dataSource.view();
					for(var i = 0; i < ds.length; i++) {
						var row = _grid.table.find("tr[data-uid='" + ds[i].uid + "']");
						var checkbox = $(row).find(".checkbox");
						if(checkbox.is(":checked")) {
							idsToSend.push(ds[i]); //将当前行 id 存进集合
						}
					};

					str.guid = idsToSend[0].GUID;

					var othermoney = parseFloat(str.othermoney);
					str.othermoney = othermoney;

					//获取图片地址
					var _osskey_jxfp = window.sessionStorage.getItem("_osskey_jxfp");
					if(null == _osskey_jxfp) {
						str.filepath = "";
						var _filepath = $("#file-list_1 .see_photo").attr("data-path");
						if(_filepath != null) {
							str.filepath = _filepath;
						}
					} else {
						_osskey_jxfp = JSON.parse(_osskey_jxfp);
						str.filepath = _osskey_jxfp[0].qcfilekey;
						//str.filename = _osskey_fyjl[0].qcfilename;
					}

					$.ajax({
						type: 'POST',
						url: utilService.JXGL_SERVICE_URL + "Bonus/UpdateBonusMoney",
						data: str,
						dataType: 'json',
						//contentType: "application/json",
						success: function(data) {
							if(data.state == 1) {
								grid.reload(); //刷新表格
								tzje_window.close();
								uiService.notification().successMsg("修改成功"); //操作提示消息
							} else {
								uiService.alert(data.msg);
							}
						}
					});
				}
			};

			//打开增加人员 window
			$scope.zjry = function() {

				//配置 window config
				var window_config;
				window_config = {
					divId: "zjry_window",
					width: "860px",
					height: "430px",
					title: "增加人员",
					onClose: onClose,
				};

				$("#multiSelect").attr("data-id", "");

				_user_grid = uiService.generateGrid(_user_columns, _user_config);

				$.ajax({
					type: "get",
					url: utilService.JXGL_SERVICE_URL + "ExpenseRecord/GetDepList",
					dataType: 'json',
					success: function(data) {
						$.fn.zTree.init($("#multiSelectTree"), setting, data);
					}
				});

				//生成window
				zjry_window = uiService.window(window_config);

				//监听关闭事件
				function onClose(e) {
					var breadcrumb = window.parent.document.getElementById("breadcrumb");
					breadcrumb.style.borderBottom = "1px solid #ddd";
					hideMenu();
					$("#menuBtn1").html("请选择");
					$(".multiSelect").attr("value", "");
					$scope.project2.username = "";
				};
			};

			//关闭增加用户窗口
			$scope.close_user = function() {
				zjry_window.close();
				hideMenu();
				$("#menuBtn1").html("请选择");
				$(".multiSelect").attr("value", "");
				$scope.project2.username = "";
			};

			//查询 用户
			$scope.s_user = function(str) {

				if(undefined == str) {
					str = {};
				} else {}

				hideMenu();
				$("#menuBtn1").html("请选择");

				//所属部门
				var ssbmItemData = $("#multiSelect").attr("data-id");
				str.dep = ssbmItemData;

				_user_grid.retrieve(str); //搜索

			};

			//保存用户
			$scope.save_user = function() {

				//获取选中行的值
				idsToSend = [];
				var _grid = $("#user_grid").data("kendoGrid");
				var ds = _grid.dataSource.view();
				for(var i = 0; i < ds.length; i++) {
					var row = _grid.table.find("tr[data-uid='" + ds[i].uid + "']");
					var checkbox = $(row).find(".checkbox");
					if(checkbox.is(":checked")) {
						idsToSend.push(ds[i]); //将当前行 id 存进集合
					}
				};

				if(idsToSend.length == 0) {
					uiService.alert("请选择需要添加的人员");
					//				} else if(idsToSend.length > 1) {
					//					uiService.alert("一次只能添加一名人员");
				} else {
					var _list = [];

					var flag = dep1 + dep2 + year + month;

					for(var i = 0; i < idsToSend.length; i++) {
						var opt = {};
						//参数
						opt.dep1 = idsToSend[i].dep1; //一级部门
						opt.dep2 = idsToSend[i].dep2; //二级部门
						opt.year = year; //年
						opt.month = month; //月
						opt.BDName = idsToSend[i].cname; //用户名
						opt.BDloginName = idsToSend[i].loginname; //登录名
						opt.flag = flag; //唯一健
						_list.push(opt);
					};

					_list = JSON.stringify(_list);

					$.ajax({
						type: 'POST',
						url: utilService.JXGL_SERVICE_URL + "Bonus/InserUser",
						data: {
							strList: _list
						},
						dataType: 'json',
						//traditional: true,
						//contentType: "application/json",
						success: function(data) {
							if(data.state == 1) {
								grid.reload(); //刷新表格
								zjry_window.close();
								uiService.notification().successMsg("添加成功"); //操作提示消息
							} else {
								uiService.alert(data.msg);
							}
						}
					});
				}
			};

			//配置表格标头信息
			columns = [{
					headerTemplate: '<input type="checkbox" class="checkbox_all" name="testId" />',
					template: '<input type="checkbox" class="checkbox" name="testId" />',
					width: 30,
					locked: false
				}, {
					field: "No",
					title: "序号",
					template: "#= ++record #",
					sortable: false,
					width: 60
				}, {
					field: "Dep1",
					title: "一级部门",
					width: 100,
					sortable: false
				}, {
					field: "Dep2",
					title: "二级部门",
					width: 200,
					sortable: false
				}, {
					field: "BDName",
					title: "姓名",
					width: 100
				}
				//			, {
				//				field: "BDCommission",
				//				title: "bd提成（自动核算）",
				//				width: 160
				//			}, {
				//				field: "DepCommission",
				//				title: "bd部门提成",
				//				width: 130
				//			}, {
				//				field: "BDPond",
				//				title: "bd费用池子",
				//				width: 130
				//			}, {
				//				field: "PM",
				//				title: "PM",
				//				width: 120
				//			}
				, {
					field: "BDCommission",
					title: "原提成",
					width: 120
				}, {
					field: "AdjustmentMoney",
					title: "调整金额",
					width: 120
				}, {
					field: "AdjustmentRemark",
					title: "调整备注",
					width: 180
				}, {
					field: "EvidencePath",
					title: "辅证",
					width: 100,
					template: "#= (EvidencePath) ? a='查看图片': b='' #",
					attributes: {
						onclick: 'seePhoto(this)',
						style: "color:blue; text-align: left;height:5px;padding-left: 10px;text-decoration:underline",
						onmouseover: "this.style.cursor='pointer'"
					},
					sortable: false
				}, {
					field: "LastCommission",
					title: "总提成",
					width: 120
				}
			];

			//配置表格标头信息
			_user_columns = [{
				headerTemplate: '<input type="checkbox" class="checkbox_all_1" name="testId" />',
				template: '<input type="checkbox" class="checkbox" name="testId" />',
				width: 30,
				locked: false
			}, {
				field: "No",
				title: "序号",
				template: "#= ++record #",
				sortable: false,
				width: 30,
			}, {
				field: "dep1",
				title: "一级部门",
			}, {
				field: "dep2",
				title: "二级部门",
			}, {
				field: "cname",
				title: "姓名",
			}, {
				field: "loginname",
				title: "登录名",
			}];

			//查看图片
			seePhoto = function(this_2) {
				//获取选中行数据
				idsToSend = [];
				var _this = this_2.parentNode.rowIndex;
				var grid = $("#grid").data("kendoGrid");
				var ds = grid.dataSource.view();
				for(var i = 0; i < ds.length; i++) {
					var row = grid.table.find("tr[data-uid='" + ds[i].uid + "']");
					if(i == _this) {
						idsToSend.push(ds[i]);
					}
				};

				var _url1 = idsToSend[0].EvidencePath;

				if(_url1 != "" && _url1 != null) {
					_url1.substring(-1, (_url1 - 1));
					_url1 = "http://filed.98ep.com/" + _url1;

					$(".photo img").attr("src", _url1);
					$(".photo").css("display", "block");
				}
			};

			//关闭图片预览
			$(".photo span").click(function() {
				$(".photo").css("display", "none");
			});

			//下拉树
			var setting = {
				check: {
					enable: true,
					chkboxType: {
						"Y": "s",
						"N": "s"
					}
				},
				view: {
					dblClickExpand: false
				},
				data: {
					simpleData: {
						enable: true
					}
				},
				callback: {
					beforeClick: beforeClick,
					onCheck: onCheck
				}
			};

			function beforeClick(treeId, treeNode) {
				var zTree = $.fn.zTree.getZTreeObj("multiSelectTree");
				zTree.checkNode(treeNode, !treeNode.checked, null, true);
				return false;
			};

			function onCheck(e, treeId, treeNode) {
				var zTree = $.fn.zTree.getZTreeObj("multiSelectTree"),
					nodes = zTree.getCheckedNodes(true),
					v = "",
					v1 = "";
				for(var i = 0, l = nodes.length; i < l; i++) {
					if(nodes[i].children == "") {
						v += nodes[i].name + ",";
						v1 += nodes[i].id + ",";
					}
				}
				if(v.length > 0) v = v.substring(0, v.length - 1);
				if(v1.length > 0) v1 = v1.substring(0, v1.length - 1);
				var cityObj = $("#multiSelect");
				cityObj.attr("value", v);
				cityObj.attr("data-id", v1);
			};

			$("#menuBtn1").click(function() {

				var display = $('.multiselectContent').css('display');
				if(display == 'none') {

					var cityObj = $("#multiSelect");
					var cityOffset = $("#multiSelect").offset();
					$("#multiselectContent").css({
						//left: cityOffset.left + "px",
						//top: cityOffset.top + cityObj.outerHeight() + "px"
					}).slideDown("fast");

					//$("body").bind("mousedown", onBodyDown);

					$("#menuBtn1").html("关闭");

				} else {
					hideMenu();
					$("#menuBtn1").html("请选择");
				};

			});

			//改变窗口时, 关闭下拉
			$(window).resize(function() {
				hideMenu();
			});

			function hideMenu() {
				$("#multiselectContent").fadeOut("fast");
				$("body").unbind("mousedown", onBodyDown);
			};

			function onBodyDown(event) {
				if(!(event.target.id == "menuBtn" || event.target.id == "multiSelect" || event.target.id == "multiselectContent" || $(event.target).parents("#multiselectContent").length > 0)) {
					hideMenu();
				}
			};

		}
	]);
})();