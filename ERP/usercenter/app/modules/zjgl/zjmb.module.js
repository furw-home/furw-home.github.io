(function() {
	/**
	 * 作者: furw
	 * 描述: 质检模版 module
	 */
	var zjmbModule = angular.module('zjmbModule', ['mainModule']);

	/**
	 * 作者: furw
	 * 描述: 质检模版 控制器
	 */
	zjmbModule.controller('zjmbCtrl', ['$scope', 'utilService', 'uiService',
		function($scope, utilService, uiService) {

			//声明变量
			var zjmbGrid, //Grid
				columns, //Grid 列
				gridConfig, //grid 配置
				window_edit, //编辑 window
				window_add, //新建 window
				dropdownlist, //模版下拉
				dropdownlist_config, // 模版下拉配置
				mb_state, //新增模版下拉
				mb_state_config, //新增模版下拉配置
				mb_state_edit, //编辑模版下拉
				mb_state_edit_config; //编辑模版下拉配置

			//初始化
			$scope.init = function() {
				$scope.editProject = {}; //初始化编辑对象
				$scope.initDropdownlist(); //初始化下拉框
				$scope.initGrid(); // 初始化 grid
			}

			//初始化下拉框
			$scope.initDropdownlist = function() {
				dropdownlist = uiService.createDropdownlist(dropdownlist_config);
				mb_state = uiService.createDropdownlist(mb_state_config);
				mb_state_edit = uiService.createDropdownlist(mb_state_edit_config);
			}

			//初始化 grid
			$scope.initGrid = function() {
				zjmbGrid = uiService.createGrid(columns, gridConfig);
			};

			//模版下拉配置
			dropdownlist_config = {
				divId: "state", //下拉框 id
				_pm: "ItemStatus", //参数
				_isAddAll: true, //是否拼接全部节点
				_url: utilService.ZJGL_SERVICE_URL + "Base/GetDropDownListByFlag", //URL
			};

			//新增模版下拉配置
			mb_state_config = {
				divId: "mb_state", //下拉框 id
				_pm: "ItemStatus", //参数
				_isAddAll: false, //是否拼接全部节点
				_url: utilService.ZJGL_SERVICE_URL + "Base/GetDropDownListByFlag", //URL
			};

			//新增模版下拉配置
			mb_state_edit_config = {
				divId: "mb_state_edit", //下拉框 id
				_pm: "ItemStatus", //参数
				_isAddAll: false, //是否拼接全部节点
				_url: utilService.ZJGL_SERVICE_URL + "Base/GetDropDownListByFlag", //URL
			};

			//Grid 配置
			gridConfig = {
				dataSouce: utilService.ZJGL_SERVICE_URL + "QualityTemplate/Query", //URL
				divId: "grid", //grid id
				sortable: true, // 排序
				pageable: true, //分页
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
				width: 80
			}, {
				field: "TemplateNo",
				title: "模版编号",
				attributes: {
					onclick: 'downCount(this)',
					style: "color:blue; text-align: left;height:5px;padding-left: 10px;text-decoration:underline",
					onmouseover: "this.style.cursor='pointer'"
				}
			}, {
				field: "TemplateName",
				title: "模版名称",
			}, {
				field: "OrderNo",
				title: "显示顺序",
			}, {
				field: "Creator",
				title: "创建人",
			}, {
				field: "CreateTime",
				title: "创建时间",
			}, {
				field: "Status",
				title: "状态",
				values: [{ // 1为新建 ，2为激活 ，3为失效
					text: "新建",
					value: 2
				}, {
					text: "激活",
					value: 1
				}, {
					text: "失效",
					value: 3
				}]
			}];

			//检索
			$scope.search = function(tmp) {

				if(undefined == tmp) {
					tmp = {};
				} else {}

				var status = dropdownlist.getValue("state");
				status = parseInt(status);
				tmp.status = status;

				//调用grid 的检索方法
				zjmbGrid.search(tmp);
			};

			//清空
			$scope.empty = function(tmp) {
				if(undefined == tmp) {
					dropdownlist.setText("state", "全部");
				} else {
					dropdownlist.setText("state", "全部");
					$scope.tmp.templateno = "";
					$scope.tmp.templatename = "";
					$scope.tmp.creator = "";
				}
			};

			//查看当前行数据
			downCount = function(this_1) {

				$(".tbody_edit").html("");

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
					width: "830px",
					height: "450px",
					title: "质检项目／信息维护",
					onClose: onClose,
				};

				//生成window
				window_edit = uiService.window(window_config);

				//监听关闭事件
				function onClose(e) {
					var breadcrumb = window.parent.document.getElementById("breadcrumb");
					breadcrumb.style.borderBottom  = "1px solid #ddd";
				};

				//绑定数据
				$scope.editProject.Id = idsToSend[0].Id;
				$scope.editProject.templateno = idsToSend[0].TemplateNo;
				$scope.editProject.templatename = idsToSend[0].TemplateName;
				$scope.editProject.orderno = idsToSend[0].OrderNo;

				//设置下拉框选中
				mb_state_edit.setText("mb_state_edit", idsToSend[0].StatusName);
				$scope.$apply();

				//ztree 配置
				var setting = {
					check: {
						enable: true,
						chkDisabledInherit: true
					},
					view: {
						showLine: false,
						showIcon: false,
						selectedMulti: false,
						dblClickExpand: false,
					},
					callback: {
						onClick: onClick
					},
					data: {
						key: {
							name: "Item_Name",
							children: "Items"
						}
					}
				};

				//获取树形菜单数据
				$.ajax({
					type: 'GET',
					async: false,
					url: utilService.ZJGL_SERVICE_URL + "QualityItem/GetItems",
					dataType: 'json',
					success: function(data) {
						var treeObject = $.fn.zTree.init($("#tree_edit"), setting, data.data);
						treeObject.expandAll(true); //展开所有节点
					}
				});

				//指标树单击事件
				function onClick(e, treeId, treeNode) {
					//展开节点
					var zTree = $.fn.zTree.getZTreeObj("tree_edit");
					zTree.expandNode(treeNode);
				};

				//移除根结点 复选框
				var zTree = $.fn.zTree.getZTreeObj("tree_edit");
				//这里只能找到最外层所有的节点
				var allnodes = zTree.getNodes();
				if(allnodes.length > 0) {
					for(var i = 0; i < allnodes.length; i++) {
						if(allnodes[i].isParent) {
							allnodes[i].nocheck = true;
							zTree.updateNode(allnodes[i]);
						}
					}
				};

				//获取模版数据
				$.ajax({
					type: 'GET',
					async: false,
					url: utilService.ZJGL_SERVICE_URL + "QualityTemplate/QueryById?id=" + idsToSend[0].Id,
					dataType: 'json',
					success: function(data) {

						if(data.data.Items.length > 0) {
							for(var j = 0; j < data.data.Items.length; j++) {
								$(".tbody_edit").append("<ul data-id=" + data.data.Items[j].Id + "> <li>" + data.data.Items[j].ItemCode + "</li> <li>" + data.data.Items[j].ItemName + "</li> </ul>")
							}

							//添加选中效果
							$(".tbody_edit ul").each(function() {
								$(this).click(function() {
									$(".tbody_edit .hove").removeClass("hove");
									$(this).addClass("hove");
									return false; //防止页面跳转
								});
							});

							//上移
							$scope.up_1 = function() {
								var index = "";
								for(var i = 0; i < $(".tbody_edit ul").length; i++) {
									if($(".tbody_edit ul").eq(i).attr("class") == "hove") {
										index = $(".tbody_edit ul").eq(i).index();
										break;
									} else {}
								}

								if($(".tbody_edit ul").eq(index).prev()) {
									$(".tbody_edit ul").eq(index).prev().before($(".tbody_edit ul").eq(index));
								} else {}
							}

							//下移
							$scope.down_1 = function() {
								var index = "";
								for(var i = 0; i < $(".tbody_edit ul").length; i++) {
									if($(".tbody_edit ul").eq(i).attr("class") == "hove") {
										index = $(".tbody_edit ul").eq(i).index();
										break;
									} else {}
								}

								if($(".tbody_edit ul").eq(index).next()) {
									$(".tbody_edit ul").eq(index).next().after($(".tbody_edit ul").eq(index));
								} else {}
							};

						} else {}
					}
				});

				var node_id = "";

				var treeObj = $.fn.zTree.getZTreeObj("tree_edit"),
					nodes = treeObj.getCheckedNodes(true);

				//获取 移除节点的id
				for(var i = 0; i < $(".tbody_edit ul").length; i++) {
					node_id = $(".tbody_edit ul").eq(i).attr("data-id");

					//查找属性id的 值为node_id的节点
					var node = treeObj.getNodeByParam("Id", node_id, null);
					treeObj.checkNode(node, true, true) //选中
					node.chkDisabled = true; //禁用
				};

			};

			//模版新增保存
			$scope.mb_save = function(project) {
				//表单验证
				var validation = uiService.createValidForm("add_validForm", "createValidMsg");
				if(validation.check()) {

					//将顺序号转换成number
					project.orderno = parseInt(project.orderno);

					//获取项目类型
					p_id = mb_state.getValue("mb_state");
					p_id = parseInt(p_id);
					project.status = p_id;

					var _data = [];
					for(var i = 0; i < $(".tbody ul").length; i++) {
						var pm = {};
						pm.id = $(".tbody ul").eq(i).attr("data-id");
						pm.index = $(".tbody ul").eq(i).index();
						_data.push(pm);
					};

					//获取模版编码
					var templateno = project.templateno;

					project.items = _data;
					project = JSON.stringify(project);

					// 检查质检项目编号是否存在
					$.ajax({
						type: 'GET',
						url: utilService.ZJGL_SERVICE_URL + "QualityTemplate/CheckQATemplateNoExists?code=" + templateno,
						dataType: 'json',
						async: false,
						contentType: "application/json",
						success: function(data) {
							if(data.status == 0) {
								uiService.alert(data.msg);
							} else {
								//调用后台 新增模版接口 新增接口
								$.ajax({
									type: 'POST',
									url: utilService.ZJGL_SERVICE_URL + "QualityTemplate/Edit",
									data: project,
									dataType: 'json',
									contentType: "application/json",
									success: function(data) {
										if(data.status == 1) {
											window_add.close(); //关闭新增窗口
											zjmbGrid.reload(); //刷新表格
											uiService.notification().successMsg("保存成功!"); //操作提示消息
										} else {
											window_add.close(); //关闭新增窗口
											uiService.notification().errorMsg("添加", "失败!"); //操作提示消息
										}
									}
								});
							};//
						}
					});
				}
			};

			//编辑模版保存
			$scope.mb_save_edit = function(project) {

				//表单验证
				var validation = uiService.createValidForm("edit_validForm", "editValidMsg");
				if(validation.check()) {

					//将顺序号转换成number
					project.orderno = parseInt(project.orderno);

					//获取模版类型
					var m_id = mb_state_edit.getValue("mb_state_edit");
					m_id = parseInt(m_id);
					project.status = m_id;

					var _data = [];
					for(var i = 0; i < $(".tbody_edit ul").length; i++) {
						var pm = {};
						pm.id = $(".tbody_edit ul").eq(i).attr("data-id");
						pm.index = $(".tbody_edit ul").eq(i).index();
						_data.push(pm);
					};

					project.items = _data;
					project = JSON.stringify(project);

					//调用后台 新增模版接口 新增接口
					$.ajax({
						type: 'POST',
						url: utilService.ZJGL_SERVICE_URL + "QualityTemplate/Edit",
						data: project,
						dataType: 'json',
						contentType: "application/json",
						success: function(data) {
							if(data.status == 1) {
								window_edit.close(); //关闭新增窗口
								zjmbGrid.reload(); //刷新表格
								uiService.notification().successMsg("修改成功!"); //操作提示消息
							} else {
								window_edit.close(); //关闭新增窗口
								uiService.notification().errorMsg("修改", "失败!"); //操作提示消息
							}
						}
					});
				};
			};

			//激活
			$scope.activation = function() {

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
					var pam = "?uuids="

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
						url: utilService.ZJGL_SERVICE_URL + "QualityTemplate/Change" + pam,
						dataType: 'json',
						contentType: "application/json",
						success: function(data) {
							if(data.status == 1) {
								zjmbGrid.reload(); //刷新表格
								zjmbGrid.checkFalse(); //全选刷新
								uiService.notification().successMsg("激活成功!"); //操作提示消息
							} else {
								uiService.notification().errorMsg("激活", "失败!"); //操作提示消息
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
						idsToSend.push(ds[i]); //将当前行 id 存进集合
					}
				};

				if(idsToSend.length == 0) {
					uiService.alert("请选择质检项");
				} else {

					var verify_status = true;
					//判断当前质检项状态
					for(var j = 0; j < idsToSend.length; j++) {
						if(idsToSend[j].StatusName == "失效") {
							verify_status = true;
						} else {
							verify_status = false;
							break;
						}
					};

					if(verify_status) {
						//参数
						var pam = "?uuids="

						//拼接get 请求参数
						for(var i = 0; i < idsToSend.length; i++) {
							if(i > 0) {
								pam = pam + "," + idsToSend[i].Id;
							} else {
								pam += idsToSend[i].Id;
							}
						}

						//拼接请求参数
						pam = pam + "&operateFlag=del"

						//调用后台删除接口
						$.ajax({
							type: 'GET',
							url: utilService.ZJGL_SERVICE_URL + "QualityTemplate/Change" + pam,
							dataType: 'json',
							contentType: "application/json",
							success: function(data) {
								if(data.status == 1) {
									zjmbGrid.reload(); //刷新表格
									zjmbGrid.checkFalse(); //全选刷新
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
				}

				if(idsToSend.length == 0) {
					uiService.alert("请选择质检项");
				} else {

					//参数
					var pam = "?uuids="

					//拼接get 请求参数
					for(var i = 0; i < idsToSend.length; i++) {
						if(i > 0) {
							pam = pam + "," + idsToSend[i];
						} else {
							pam += idsToSend[i];
						}
					}

					//拼接请求参数
					pam = pam + "&operateFlag=invalid"

					//调用后台删除接口
					$.ajax({
						type: 'GET',
						url: utilService.ZJGL_SERVICE_URL + "QualityTemplate/Change" + pam,
						dataType: 'json',
						contentType: "application/json",
						success: function(data) {
							if(data.status == 1) {
								zjmbGrid.reload(); //刷新表格
								zjmbGrid.checkFalse(); //全选刷新
								uiService.notification().successMsg("操作成功!"); //操作提示消息
							} else {
								uiService.notification().errorMsg("操作", "失败!"); //操作提示消息
							}
						}
					});
				}
			};

			//新增模版窗口
			$scope.add = function() {

				//配置 window config
				var window_config;
				window_config = {
					divId: "add_window",
					width: "830px",
					height: "466px",
					title: "质检项目／信息维护",
					onClose: onClose,
				};

				//生成window
				window_add = uiService.window(window_config);

				//监听关闭事件
				function onClose(e) {
					$(".tbody").html("");
					$("#add_window input").val("");
					var breadcrumb = window.parent.document.getElementById("breadcrumb");
					breadcrumb.style.borderBottom  = "1px solid #ddd";
				};

				//新建 XXX创建于xx时间
				var founder = utilService.USER_NAME,
					creationTime = utilService.getDataTime();
				$(".founder").html(founder);
				$(".creationTime").html(creationTime);

				//ztree 配置
				var setting = {
					check: {
						enable: true,
						chkDisabledInherit: true
					},
					view: {
						showLine: false,
						showIcon: false,
						selectedMulti: false,
						dblClickExpand: false,
					},
					callback: {
						onClick: onClick
					},
					data: {
						key: {
							name: "Item_Name",
							children: "Items"
						}
					}
				};

				//获取树形菜单数据
				$.ajax({
					type: 'get',
					async: false,
					url: utilService.ZJGL_SERVICE_URL + "QualityItem/GetItems",
					dataType: 'json',
					success: function(data) {
						var treeObject = $.fn.zTree.init($("#tree"), setting, data.data);
						treeObject.expandAll(true); //展开所有节点
					}
				});

				//指标树单击事件
				function onClick(e, treeId, treeNode) {
					//展开节点
					var zTree = $.fn.zTree.getZTreeObj("tree");
					zTree.expandNode(treeNode);
				};

				//移除根结点 复选框
				var zTree = $.fn.zTree.getZTreeObj("tree");
				//这里只能找到最外层所有的节点
				var allnodes = zTree.getNodes();
				if(allnodes.length > 0) {
					for(var i = 0; i < allnodes.length; i++) {
						if(allnodes[i].isParent) {
							allnodes[i].nocheck = true;
							zTree.updateNode(allnodes[i]);
						}
					}
				};

			};

			//获取当前节点 添加到 项目模版列表
			$scope.add_node = function() {

				var treeObj = $.fn.zTree.getZTreeObj("tree"),
					nodes = treeObj.getCheckedNodes(true),
					data = [];

				for(var i = 0; i < nodes.length; i++) {
					nodes[i].chkDisabled = true;

					if(nodes[i].isParent) {} else {
						var _param = {};
						_param.name = nodes[i].Item_Name;
						_param.id = nodes[i].Id;
						_param.code = nodes[i].Item_Code;
						data.push(_param);
					}
				}

				for(var j = 0; j < data.length; j++) {
					$(".tbody").append("<ul data-id=" + data[j].id + "> <li>" + data[j].code + "</li> <li>" + data[j].name + "</li> </ul>")
				}

				//添加选中效果
				$(".tbody ul").each(function() {
					$(this).click(function() {
						$(".tbody .hove").removeClass("hove");
						$(this).addClass("hove");
						return false; //防止页面跳转
					});
				});

				//上移
				$scope.up = function() {
					var index = "";
					for(var i = 0; i < $(".tbody ul").length; i++) {
						if($(".tbody ul").eq(i).attr("class") == "hove") {
							index = $(".tbody ul").eq(i).index();
							break;
						} else {}
					}

					if($(".tbody ul").eq(index).prev()) {
						$(".tbody ul").eq(index).prev().before($(".tbody ul").eq(index));
					} else {}
				};

				//下移
				$scope.down = function() {
					var index = "";
					for(var i = 0; i < $(".tbody ul").length; i++) {
						if($(".tbody ul").eq(i).attr("class") == "hove") {
							index = $(".tbody ul").eq(i).index();
							break;
						} else {}
					}

					if($(".tbody ul").eq(index).next()) {
						$(".tbody ul").eq(index).next().after($(".tbody ul").eq(index));
					} else {}
				};

			}; //添加项目模版结束

			//移除节点
			$scope.rm_node = function() {

				var node_id = "";

				//获取 移除节点的id
				for(var i = 0; i < $(".tbody ul").length; i++) {
					if($(".tbody ul").eq(i).attr("class") == "hove") {
						node_id = $(".tbody ul").eq(i).attr("data-id");
						$(".tbody ul").eq(i).remove();
					} else {}
				};

				var treeObj = $.fn.zTree.getZTreeObj("tree"),
					nodes = treeObj.getCheckedNodes(true);

				//查找属性id的 值为node_id的节点
				var node = treeObj.getNodeByParam("Id", node_id, null);
				node.chkDisabled = false; //取消禁用
				treeObj.checkNode(node, false, false) //取消选中
			};

			//编辑节点
			$scope.edit_node = function() {

				var _treeObj = $.fn.zTree.getZTreeObj("tree_edit"),
					_nodes = _treeObj.getCheckedNodes(true),
					_data1 = [];

				for(var i = 0; i < _nodes.length; i++) {
					_nodes[i].chkDisabled = true;

					if(_nodes[i].isParent) {} else {
						var _param1 = {};
						_param1.name = _nodes[i].Item_Name;
						_param1.id = _nodes[i].Id;
						_param1.code = _nodes[i].Item_Code;
						_data1.push(_param1);
					}
				}

				for(var j = 0; j < _data1.length; j++) {
					$(".tbody_edit").append("<ul data-id=" + _data1[j].id + "> <li>" + _data1[j].code + "</li> <li>" + _data1[j].name + "</li> </ul>")
				}

				//添加选中效果
				$(".tbody_edit ul").each(function() {
					$(this).click(function() {
						$(".tbody_edit .hove").removeClass("hove");
						$(this).addClass("hove");
						return false; //防止页面跳转
					});
				});

				//上移
				$scope.up_1 = function() {
					var _index1 = "";
					for(var i = 0; i < $(".tbody_edit ul").length; i++) {
						if($(".tbody_edit ul").eq(i).attr("class") == "hove") {
							_index1 = $(".tbody_edit ul").eq(i).index();
							break;
						} else {}
					}

					if($(".tbody_edit ul").eq(_index1).prev()) {
						$(".tbody_edit ul").eq(_index1).prev().before($(".tbody_edit ul").eq(_index1));
					} else {}
				}

				//下移
				$scope.down_1 = function() {
					var _index2 = "";
					for(var i = 0; i < $(".tbody_edit ul").length; i++) {
						if($(".tbody_edit ul").eq(i).attr("class") == "hove") {
							_index2 = $(".tbody_edit ul").eq(i).index();
							break;
						} else {}
					}

					if($(".tbody_edit ul").eq(_index2).next()) {
						$(".tbody_edit ul").eq(_index2).next().after($(".tbody_edit ul").eq(_index2));
					} else {}
				};

			}; // 添加项目模版结束

			//移除节点
			$scope.rm_node_1 = function() {
				var node_id = "";
				//获取 移除节点的id
				for(var i = 0; i < $(".tbody_edit ul").length; i++) {
					if($(".tbody_edit ul").eq(i).attr("class") == "hove") {
						node_id = $(".tbody_edit ul").eq(i).attr("data-id");
						$(".tbody_edit ul").eq(i).remove();
					} else {}
				};

				var treeObj = $.fn.zTree.getZTreeObj("tree_edit"),
					nodes = treeObj.getCheckedNodes(true);

				//查找属性id的 值为node_id的节点
				var _node_edit = treeObj.getNodeByParam("Id", node_id, null);
				_node_edit.chkDisabled = false; //取消禁用
				treeObj.checkNode(_node_edit, false, false) //取消选中
			};

		}
	]);
})();