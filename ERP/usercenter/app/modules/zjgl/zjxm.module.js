(function() {
	/**
	 * 作者: furw
	 * 描述: 质检项目 module
	 */
	var zjxmModule = angular.module('zjxmModule', ['mainModule']);

	/**
	 * 作者: furw
	 * 描述: 质检项目 控制器
	 */
	zjxmModule.controller('zjxmCtrl', ['$scope', 'utilService', 'uiService',
		function($scope, utilService, uiService) {

			var zjxmGrid, //Grid
				gridConfig, //Grid 参数配置
				columns, //Grid 列配置
				window_edit, //编辑 window
				window_add, //新建 window
				state_add, //项目状态_ 添加
				state_add_config, //项目状态配置_ 添加
				state_edit, //项目状态_编辑
				state_edit_config, //项目状态配置_编辑
				dropdownlist, //档案状态下拉
				dropdownlist_config; // 档案状态下拉配置

			//初始化
			$scope.init = function() {
				$scope.editProject = {}; //初始化编辑框对象
				$scope.initDropdownlist(); //初始化下拉框
				$scope.initGrid(); // 初始化 Grid
			};

			//初始化下拉框
			$scope.initDropdownlist = function() {
				dropdownlist = uiService.createDropdownlist(dropdownlist_config);
				state_add = uiService.createDropdownlist(state_add_config);
				state_edit = uiService.createDropdownlist(state_edit_config);
			};

			//初始化 Grid
			$scope.initGrid = function() {
				zjxmGrid = uiService.createGrid(columns, gridConfig);
			};

			//档案状态下拉配置
			dropdownlist_config = {
				divId: "state_dazt", //下拉框id
				_isAddAll: true, //是否拼接全部节点
				_url: utilService.ZJGL_SERVICE_URL + "QualityItem/GetItemStatus", //URL
			};

			//新增窗口 项目状态下拉配置
			state_add_config = {
				divId: "state_add", //下拉框id
				_isAddAll: false, //是否拼接全部节点
				_url: utilService.ZJGL_SERVICE_URL + "QualityItem/GetItemStatus", //URL
			};

			//新增编辑 项目状态下拉配置
			state_edit_config = {
				divId: "state_edit", //下拉框id
				_isAddAll: false, //是否拼接全部节点
				_url: utilService.ZJGL_SERVICE_URL + "QualityItem/GetItemStatus", //URL
			};

			//Grid 配置
			gridConfig = {
				dataSouce: utilService.ZJGL_SERVICE_URL + "QualityItem/Query", //URL
				divId: "grid", //grid id
				sortable: false, //排序
				pageable: true, //分页
			};

			//Grid columns
			columns = [{
				headerTemplate: '<input type="checkbox" class="checkbox_all" name="testId" />',
				template: '<input type="checkbox" class="checkbox" name="testId" />',
				width: 30
			}, {
				field: "No",
				title: "序号",
				template: "#= ++record #",
				sortable: false,
				width: 80
			}, {
				field: "ItemNo",
				title: "项目编号",
				attributes: {
					onclick: 'downCount(this)',
					style: "color:blue; text-align: left;height:5px;padding-left: 10px;text-decoration:underline",
					onmouseover: "this.style.cursor='pointer'"
				}
			}, {
				field: "ItemName",
				title: "项目名称",
				hidden: false //隐藏列
			}, {
				field: "OrderNo",
				title: "显示顺序",
				hidden: false //隐藏列
			}, {
				field: "ItemType",
				title: "项目类型",
				hidden: false //隐藏列
			}, {
				field: "Standard",
				title: "标准",
			}, {
				field: "Creator",
				title: "创建人",
			}, {
				field: "CreateTime",
				title: "创建时间",
				width: 200
			}, {
				field: "ItemStatus",
				title: "状态",
				sortable: false,
			}];

			//查询
			$scope.search = function(project) {

				if(undefined == project) {
					project = {};
				} else {}

				dropdownlist_id = dropdownlist.getValue("state_dazt");
				dropdownlist_id = parseInt(dropdownlist_id);
				project.itemstatus = dropdownlist_id;

				//调用grid 的检索方法
				zjxmGrid.search(project);
			};

			//新增
			$scope.save = function(project) {

				//表单验证
				var validation = uiService.createValidForm("add_validForm", "createValidMsg");
				if(validation.check()) {

					//获取项目状态id
					state_id = dropdownlist.getValue("state_add");
					state_id = parseInt(state_id);
					project.ItemStatus = state_id;

					//将提交的表单对象转换为字符串
					var _data = JSON.stringify(project);

					// 检查质检项目编号是否存在
					$.ajax({
						type: 'POST',
						url: utilService.ZJGL_SERVICE_URL + "/QualityItem/CheckQAItemNoExists?code=" + project.ItemNo,
						dataType: 'json',
						async: false,
						contentType: "application/json",
						success: function(data) {
							if(data.status == 0) {
								uiService.alert(data.msg);
							} else {

								//调用后台新增接口
								$.ajax({
									type: 'POST',
									url: utilService.ZJGL_SERVICE_URL + "QualityItem/Edit",
									data: _data,
									dataType: 'json',
									contentType: "application/json",
									success: function(data) {
										if(data.status == 1) {
											window_add.close(); //关闭新增窗口
											zjxmGrid.reload(); //刷新表格
											uiService.notification().successMsg("添加成功!"); //操作提示消息
										} else {
											window_add.close(); //关闭新增窗口
											uiService.notification().errorMsg("添加", "失败!"); //操作提示消息
										}
									}
								}); //新增接口结束
							}
						}
					});
				}
			};

			//编辑保存
			$scope.ediSave = function(project) {

				//表单验证
				var validation = uiService.createValidForm("edit_validForm", "editValidMsg");
				if(validation.check()) {

					//获取项目状态id
					state_id = dropdownlist.getValue("state_edit");
					state_id = parseInt(state_id);
					project.ItemStatus = state_id;

					//将提交的表单对象转换为字符串
					var data = JSON.stringify(project);

					//调用后台的编辑接口
					$.ajax({
						type: 'POST',
						url: utilService.ZJGL_SERVICE_URL + "QualityItem/Edit",
						data: data,
						dataType: 'json',
						contentType: "application/json",
						success: function(data) {
							if(data.status == 1) {
								window_edit.close(); //关闭编辑窗口
								zjxmGrid.reload(); //刷新表格
								uiService.notification().successMsg("修改成功!"); //操作提示消息
							} else {
								window_edit.close(); //关闭编辑窗口
								uiService.notification().errorMsg("修改", "失败!"); //操作提示消息
							}
						}
					});
				}
			};
			
			//删除选中质检项
			$scope.del = function() {

				//获取选中行的值
				idsToSend = [];
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
					uiService.alert("请选择质检项");
				} else {

					var verify_status = true;
					//判断当前质检项状态
					for(var j = 0; j < idsToSend.length; j++) {
						if(idsToSend[j].ItemStatus == "失效") {
							verify_status = true;
						} else {
							verify_status = false;
							break;
						}
					};

					if(verify_status) {
						//参数
						var pam = "?ids="

						//拼接get 请求参数
						for(var i = 0; i < idsToSend.length; i++) {
							if(i > 0) {
								pam = pam + "," + idsToSend[i].Id;
							} else {
								pam += idsToSend[i].Id;
							}
						}

						//拼接请求参数
						pam = pam + "&operateflag=del"

						//调用后台删除接口
						$.ajax({
							type: 'GET',
							url: utilService.ZJGL_SERVICE_URL + "QualityItem/Change" + pam,
							dataType: 'json',
							contentType: "application/json",
							success: function(data) {
								if(data.status == 1) {
									zjxmGrid.reload(); //刷新表格
									uiService.notification().successMsg("删除成功!"); //操作提示消息
								} else {
									uiService.notification().errorMsg("删除", "失败!"); //操作提示消息
								}
							}
						});
					} else {
						uiService.alert("只能删除状态为失效的质检项");
					}

				}
			};

			//清空查询文本框
			$scope.empty = function(project) {
				if(undefined == project) {
					dropdownlist.setText("state_dazt", "全部");
				} else {
					dropdownlist.setText("state_dazt", "全部");
					$scope.project.itemno = "";
					$scope.project.itemname = "";
					$scope.project.itemtype = "";
					$scope.project.standard = "";
					$scope.project.creator = "";
				}
			};

			//激活
			$scope.see = function() {

				//获取选中行的值
				idsToSend = [];
				var grid = $("#grid").data("kendoGrid");
				var ds = grid.dataSource.view();
				for(var i = 0; i < ds.length; i++) {
					var row = grid.table.find("tr[data-uid='" + ds[i].uid + "']");
					var checkbox = $(row).find(".checkbox");
					if(checkbox.is(":checked")) {
						idsToSend.push(ds[i].Id); //将当前行 id 存进集合
					}
				};

				if(idsToSend.length == 0) {
					uiService.alert("请选择质检项");
				} else {

					//参数
					var pam = "?ids="

					//拼接get 请求参数
					for(var i = 0; i < idsToSend.length; i++) {
						if(i > 0) {
							pam = pam + "," + idsToSend[i];
						} else {
							pam += idsToSend[i];
						}
					};

					//拼接请求参数
					pam = pam + "&operateflag=active"

					//调用后台删除接口
					$.ajax({
						type: 'GET',
						url: utilService.ZJGL_SERVICE_URL + "QualityItem/Change" + pam,
						dataType: 'json',
						contentType: "application/json",
						success: function(data) {
							if(data.status == 1) {
								zjxmGrid.reload(); //刷新表格
								uiService.notification().successMsg("激活成功!"); //操作提示消息
								zjxmGrid.checkFalse();	//全选刷新
							} else {
								uiService.notification().errorMsg("激活", "失败!"); //操作提示消息
							}
						}
					});
				}
			};

			//失效
			$scope.failure = function() {
				//获取选中行的值
				idsToSend = [];
				var grid = $("#grid").data("kendoGrid");
				var ds = grid.dataSource.view();
				for(var i = 0; i < ds.length; i++) {
					var row = grid.table.find("tr[data-uid='" + ds[i].uid + "']");
					var checkbox = $(row).find(".checkbox");
					if(checkbox.is(":checked")) {
						idsToSend.push(ds[i].Id); //将当前行 id 存进集合
					}
				};

				if(idsToSend.length == 0) {
					uiService.alert("请选择质检项");
				} else {
					//参数
					var pam = "?ids="

					//拼接get 请求参数
					for(var i = 0; i < idsToSend.length; i++) {
						if(i > 0) {
							pam = pam + "," + idsToSend[i];
						} else {
							pam += idsToSend[i];
						}
					};

					//拼接请求参数
					pam = pam + "&operateflag=invalid"

					//调用后台删除接口
					$.ajax({
						type: 'GET',
						url: utilService.ZJGL_SERVICE_URL + "QualityItem/Change" + pam,
						dataType: 'json',
						contentType: "application/json",
						success: function(data) {
							if(data.status == 1) {
								zjxmGrid.reload(); //刷新表格
								uiService.notification().successMsg("失效成功!"); //操作提示消息
								zjxmGrid.checkFalse();  //全选刷新
							} else {
								uiService.notification().errorMsg("失效", "失败!"); //操作提示消息
							}
						}
					});
				}
			};

			//查看当前行数据 (编辑)
			downCount = function(this_1) {

				//获取选中行数据
				idsToSend = [];
				var _this = this_1.parentNode.rowIndex - 1;
				var grid = $("#grid").data("kendoGrid");
				var ds = grid.dataSource.view();
				for(var i = 0; i < ds.length; i++) {
					var row = grid.table.find("tr[data-uid='" + ds[i].uid + "']");
					if(i == _this) {
						idsToSend.push(ds[i]);
					}
				};

				//配置 window config
				var window_config;
				window_config = {
					divId: "edit_window",
					width: "660px",
					height: "180px",
					title: "质检项目／信息维护",
					onClose: onClose,
				};

				//生成window
				window_edit = uiService.window(window_config);

				//监听关闭事件
				function onClose(e) {
					var breadcrumb = window.parent.document.getElementById("breadcrumb");
					breadcrumb.style.borderBottom = "1px solid #ddd";
				};
				
				//绑定数据
				$scope.editProject.Id = idsToSend[0].Id;
				$scope.editProject.ItemNo = idsToSend[0].ItemNo;
				$scope.editProject.ItemName = idsToSend[0].ItemName;
				$scope.editProject.ItemType = idsToSend[0].ItemType;
				//设置下拉框选中
				state_edit.setText("state_edit", idsToSend[0].ItemStatus);

				$scope.editProject.OrderNo = idsToSend[0].OrderNo;
				$scope.editProject.Standard = idsToSend[0].Standard;
				$scope.$apply();
			};

			//打开新建窗口
			$scope.add = function() {

				//配置 window config
				var window_config;
				window_config = {
					divId: "add_window",
					width: "660px",
					height: "191px",
					title: "质检项目／信息维护",
					onClose: onClose,
				};

				//生成window
				window_add = uiService.window(window_config);

				//监听关闭事件
				function onClose(e) {
					var breadcrumb = window.parent.document.getElementById("breadcrumb");
					breadcrumb.style.borderBottom = "1px solid #ddd";
					$("#add_window .k-textbox").val(""); //清空表单记录
					$(".createValidMsg").html(""); //清空提示消息
					$(".createValidMsg").removeClass("Validform_checktip"); //移除提示消息图表
					$(".createValidMsg").removeClass("Validform_wrong");
				};
				//新建 XXX创建于XX时间
				var founder = utilService.USER_NAME,
					creationTime = utilService.getDataTime();
				$(".founder").html(founder);
				$(".creationTime").html(creationTime);

			}; //新建 window结束
		}
	]);
})();