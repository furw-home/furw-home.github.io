(function() {
	kendo.culture("zh-CN"); //Kendo ui 国际化
	var notificationBar; //操作通知

	//去掉按钮点击边框
	$("button").focus(function() {
		this.blur();
	});

	/**
	 * 作者: furw
	 * 描述: 组件基类
	 */
	var uiModule = angular.module('uiModule', ['utilModule', 'mainModule', 'configModule']);

	//UI service
	uiModule.factory('uiService', function(utilService, configService) {

		var service = {};

		//validform（表单验证）
		service.createValidForm = function(fromLaber, msgLaber) {
			return $("#" + fromLaber).Validform({
				tiptype: function(msg, o, cssctl) {
					var objtip = $("." + msgLaber);
					if(o.type == 2) {
						cssctl(objtip, o.type);
						objtip.text("");
					} else {
						cssctl(objtip, o.type);
						objtip.text(msg);
					}
				},
			});
		};

		//Grid (表格)
		service.createGrid = function(columns, config) {
			return new skydevGrid(columns, config, utilService, configService);
		};

		//Grid (表格1)
		service.generateGrid = function(columns, config) {
			return new skydevGrid_(columns, config, utilService);
		};

		//下拉列表
		service.createDropdownlist = function(config) {
			return new skydevDropdownlist(config);
		};

		//操作通知
		service.notification = function(message, title) {
			return new skydevNotification(message, title);
		};

		//日期选择器
		service.createDatepicker = function(config) {
			return new skydevDatepicker(config);
		};

		//清空表单
		service.formReset = function(divId) {
			return new skydevRest(divId);
		};

		//模态窗口
		service.window = function(config) {
			return new skydevWindow(config);
		};

		//提示消息 alert
		service.alert = function(config) {
			return new skydevAlert(config);
		};

		//提示消息 confirm
		service.confirm = function(config) {
			return new skydevConfirm(config);
		};

		return service;
	});

	/**
	 * 作者: furw
	 * 描述: 组件封装
	 */

	//封装提示消息 alert
	function skydevAlert(config) {
		return Showbo.Msg.alert(config)
	};

	//封装提示消息 confirm
	function skydevConfirm(config) {
		return Showbo.Msg.confirm(config)
	};

	//清空表单
	function skydevRest(divId) {
		$('#' + divId)[0].reset(); //清空表单记录
	};

	//封装模态窗口
	function skydevWindow(config) {

		this.window;

		this.window = $("#" + config.divId).kendoWindow({
			width: config.width,
			height: config.height,
			title: config.title,
			visible: true, //是否显示
			resizable: false, //调整大小
			draggable: true, //拖拽
			modal: true, //遮罩
			pinned: true, //固定
			close: config.onClose, //关闭回调
		}).data("kendoWindow");
		this.window.center(); //窗口显示在屏幕中心
		this.window.open(); //打开窗口

		//去掉父页面面包屑导航样式
		var breadcrumb = window.parent.document.getElementById("breadcrumb");
		breadcrumb.style.border = "0px";

		//关闭窗口
		this.close = function() {
			this.window.close();
		};
	};

	//封装日期控件
	function skydevDatepicker(config, resource) {

		this.datepicker;

		datepicker = $("#" + config.divId).kendoDatePicker({
			format: "yyyy-MM-dd"
		});

		//设置日期
		this.setDatetime = function(divId, data) {
			$("#" + divId).val(data);
		};

		//获取日期
		this.getDatatime = function(divId) {
			return $("#" + divId).val();
		};
	};

	//封装下拉框 （可配置 参数 ，是否拼接全部节点）
	function skydevDropdownlist(config, resource) {
		this.combobox;
		var dataSource;
		var data = {};

		if(undefined == config.enable) {
			config.enable = true;
		};

		//验证是否有参数
		if(config._pm != undefined) {
			data.flag = config._pm;
			data = JSON.stringify(data);
		} else {}

		$.ajax({ //请求后台 获取下拉框数据接口
			type: 'POST',
			url: config._url,
			data: data,
			dataType: 'json',
			contentType: "application/json",
			success: function(data) {

				//拼接全部节点
				if(config._isAddAll) {
					var add_all = {
						"text": "全部",
						"value": -2
					};
					data.data.push(add_all);
				} else {}

				if(undefined == config._id_multi_select) {
					//初始化
					combobox = $("#" + config.divId).kendoDropDownList({
						dataTextField: "text",
						dataValueField: "value",
						filter: "contains",
						dataSource: data
					}).data("kendoDropDownList");
				} else {
					combobox = $("#" + config.divId).kendoMultiSelect({
						dataTextField: "text",
						dataValueField: "value",
						filter: "contains",
						placeholder: "可多选",
						dataSource: data,
						enable: config.enable,
						change: config.callback,
					}).data("kendoMultiSelect");
				};
			}
		});

		//重新绑定下拉框数据
		this.rebindDropdownlistData = function(_config) {

			var _data = {};

			//验证是否有参数
			if(_config._pm != undefined) {
				_data.flag = _config._pm;
				_data = JSON.stringify(_data);
			} else {}

			$.ajax({ //请求后台 获取下拉框数据接口
				type: 'POST',
				url: _config._url,
				data: _data,
				dataType: 'json',
				contentType: "application/json",
				success: function(data) {
					var multiselect = $("#" + _config.divId).data("kendoMultiSelect");
					multiselect.value("可多选");
					multiselect.setDataSource(data);
				}
			});
		};

		//设置选中
		this.setText = function(divId, text) {
			if(text) {
				$("#" + divId).data("kendoDropDownList").text(text);
			} else {
				$("#" + divId).data("kendoDropDownList").text(data[0].text);
			}
		};

		//获取当前选中文本
		this.getText = function(divId) {
			return $("#" + divId).data("kendoDropDownList").text();
		};

		//获取当前选中value
		this.getValue = function(divId) {
			return $("#" + divId).data("kendoDropDownList").value();
		};

		//获取多选下拉value
		this.getItems = function(divId) {
			return city = $("#" + divId).data("kendoMultiSelect").value();
		}

	};

	//封装Grid
	function skydevGrid(columns, config, utilService, configService) {

		//Grid
		var codeGridSource;

		//是否带滚动条  (如果为 true 时 grid 行下标从0开始，为 false 时 下标从1开始)；
		if(config.scrollable == undefined) {
			config.scrollable = false;
		};

		//判断是否分页
		var pageObj = "";
		if(config.pageable) {
			pageObj = {
				input: true,
				buttonCount: 10,
				refresh: true,
				pageSizes: true,
				page: 1,
				pageSize: 10,
				pageSizes: [5, 10, 20, 30, 50, 100],
				messages: {
					display: "共 {2} 条数据",
					empty: "没有数据",
					refresh: "刷新"
				}
			}
		} else {
			pageObj = false;
		};

		//参数对象
		param = new Object();
		param.query = {};
		param.ordercolumns = {};
		param.pager = {};

		//检索
		this.search = function(param, conditions) {
			if(conditions == undefined) {
				var conditions = {};
				conditions.statistical = false;
				search(param, conditions);
			} else {
				search(param, conditions);
			}
		};

		//初始化
		codeGridSource = new kendo.data.DataSource({
			transport: {
				read: function(options) {

					var map = {}; //参数列表

					$(".checkbox_all").prop("checked", false); //取消全选

					//获取当前页数
					if(options.data.page)
						map.pageIndex = options.data.page;
					if(options.data.pageSize)
						map.pageSize = options.data.pageSize;

					//排序
					if(!options.data.sort) {} else {
						var j = 0;
						$.each(options.data.sort, function(i, element) {
							if(options.data.sort[i].field) {
								map.sortby = options.data.sort[i].field;
								map.order = options.data.sort[i].dir;
								j++;
							}
						});
					};

					//判断当前参数 是否为对象
					if(typeof param == 'string') {
						param = JSON.parse(param);
						param.pager.size = map.pageSize; //分页参数
						param.pager.page = map.pageIndex; //排序参数
						param.ordercolumns.column = map.sortby;
						param.ordercolumns.orderway = map.order;
					} else {
						param.pager.size = map.pageSize; //分页参数
						param.pager.page = map.pageIndex; //排序参数
						param.ordercolumns.column = map.sortby;
						param.ordercolumns.orderway = map.order;
					};

					//默认查询条件
					if(undefined == config.queryCondition) {
						//不在任何操作
					} else {
						if(config.queryCondition != "") {
							param.query = config.queryCondition;
						};
					};

					//手动输入查询条件
					search = function(searchParam, conditions) {

						config.queryCondition = undefined; //将默认参数设置空

						//判断当前参数 是否为对象
						if(typeof param == 'string') {
							param = JSON.parse(param);
							param.query = searchParam;
							param = JSON.stringify(param);
						} else {
							param.query = searchParam;
							param = JSON.stringify(param);
						};
						codeGridSource.page(1); //默认选中第一页
						//codeGridSource.read(); //刷新表格

					};

					//判断当前参数 是否为对象
					if(typeof param == 'string') {} else {
						param = JSON.stringify(param);
					};

					$.ajax({
						type: 'POST',
						url: config.dataSouce,
						data: param,
						dataType: 'json',
						contentType: "application/json",
						success: function(data) {
							
							//绑定数据
							options.success(data);
							//验证是否需要开启统计功能
							if(config.statistical) {
								config.callback(data.sum);
							} else {}
						}
					});
				},
			},
			pageSize: configService.PAGE_SIZE, //每页显示条数
			serverPaging: true, //服务器分页
			serverSorting: true, //服务器排序
			serverFiltering: false, //支持查询功能
			//			batch: true, //多选
			schema: { // 定义分页
				data: "data", //定义数据来源
				total: "Total", //页码总数
			}
		});

		//绑定数据源
		var _gridObj = $('#' + config.divId).kendoGrid({
			dataSource: codeGridSource, //数据源加载
			sortable: config.sortable, //可排序
			//			selectable: "multiple row", //开启多选
			//			selectable: "multiple cell", //开启多选
			//			allowCopy: true, //允许拷贝
			scrollable: config.scrollable, //去掉滚动条区域
			reorderable: true, //列排序
			dataBound: onDataBound, //数据绑定
			resizable: true, //可调整大小
			dataBinding: function() { //计算序号
				record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
			},
			//配置表格标头信息
			columns: columns,
			//分页信息
			pageable: pageObj
		}).data("kendoGrid"); //Grid 结束

		//刷新
		this.reload = function() {
			codeGridSource.read();
		};

		//全选按钮不选
		this.checkFalse = function() {
			$(".checkbox_all").prop("checked", false);
		};

		//全选
		function onDataBound(e) {
			var row = _gridObj.table.find("tr");
			$(".checkbox_all").click(function() {
				for(var i = 0; i < row.length; i++) {
					var checkbox = row.eq(i).find(".checkbox");
					if($(this).is(":checked")) {
						checkbox.prop("checked", true);
					} else {
						checkbox.prop("checked", false);
					}
				}
			});

			//设置表格行背景颜色
			if(config.setBgColor == true) {
				config.callback2(); //设置背景颜色
			}

		};

		//行拖动
		//		_gridObj.table.kendoSortable({
		//			filter: ">tbody >tr",
		//			hint: $.noop,
		//			cursor: "move",
		//			placeholder: function(element) {
		//				return element.clone().addClass("k-state-hover").css("opacity", 0.65);
		//			},
		//			container: "#grid tbody",
		//			change: function(e) {
		//				var skip = _gridObj.dataSource.skip(),
		//					oldIndex = e.oldIndex + skip,
		//					newIndex = e.newIndex + skip,
		//					data = _gridObj.dataSource.data(),
		//					dataItem = _gridObj.dataSource.getByUid(e.item.data("uid"));
		//
		//				_gridObj.dataSource.remove(dataItem);
		//				_gridObj.dataSource.insert(newIndex, dataItem);
		//			}
		//		});

		//Grid 高度自适应
		//		if(config.adaptive) {
		//			resizeGrid(config.divId);
		//
		//			function resizeGrid(divId) {
		//				var _grid = $("#" + divId);
		//				var parentHeight = $("#" + config.parentWindowId).height();
		//				var dataArea = _grid.find(".k-grid-content");
		//				var bottomArea = _grid.find(".k-grid-pager");
		//				var newHeight = parentHeight - _grid.offset().top;
		//				newHeight = newHeight - 5;
		//				var diff = _grid.innerHeight() - dataArea.innerHeight();
		//				if(dataArea.innerHeight() != null) {
		//					newHeight = newHeight + 42;
		//				}
		//				_grid.height(newHeight - bottomArea.innerHeight());
		//				dataArea.height(newHeight - diff - bottomArea.innerHeight());
		//			};
		//			$(window).resize(function() {
		//				resizeGrid(config.divId);
		//			});
		//		};
	};

	//封装Grid
	function skydevGrid_(_columns, _config, utilService) {

		//Grid
		var gridSource;

		//页数
		if(undefined == _config._pageSize) {
			_config._pageSize = 5;
		}

		//判断是否分页
		var _pageObj = "";
		if(_config._pageable) {
			_pageObj = {
				input: true,
				buttonCount: 10,
				refresh: true,
				pageSizes: true,
				page: 1,
				pageSize: 10,
				pageSizes: [10, 20, 30],
				messages: {
					display: "共 {2} 条数据",
					empty: "没有数据",
					refresh: "刷新"
				}
			}
		} else {
			_pageObj = false;
		};

		//参数对象
		_param = new Object();
		_param.query = {};
		_param.ordercolumns = {};
		_param.pager = {};

		//检索
		this.retrieve = function(_param, conditions) {
			
			if(conditions == undefined) {
				var conditions = {};
				conditions.statistical = false;
				_search(_param, conditions);
			} else {
				_search(_param, conditions);
			}
		};

		//初始化
		gridSource = new kendo.data.DataSource({
			transport: {
				read: function(options_) {

					var _map = {}; //参数列表

					$(".checkbox_all").prop("checked", false); //取消全选

					//获取当前页数
					if(options_.data.page)
						_map.pageIndex = options_.data.page;
					if(options_.data.pageSize)
						_map.pageSize = options_.data.pageSize;

					//排序
					if(!options_.data.sort) {} else {
						var j = 0;
						$.each(options_.data.sort, function(i, element) {
							if(options_.data.sort[i].field) {
								_map.sortby = options_.data.sort[i].field;
								_map.order = options_.data.sort[i].dir;
								j++;
							}
						});
					};

					//判断当前参数 是否为对象
					if(typeof _param == 'string') {
						_param = JSON.parse(_param);
						_param.pager.size = _map.pageSize; //分页参数
						_param.pager.page = _map.pageIndex; //排序参数
						_param.ordercolumns.column = _map.sortby;
						_param.ordercolumns.orderway = _map.order;
					} else {
						_param.pager.size = _map.pageSize; //分页参数
						_param.pager.page = _map.pageIndex; //排序参数
						_param.ordercolumns.column = _map.sortby;
						_param.ordercolumns.orderway = _map.order;
					};

					//默认查询条件
					if(undefined == _config._queryCondition) {
						//不在任何操作
					} else {
						if(_config._queryCondition != "") {
							_param.query = _config._queryCondition;
						};
					};

					//手动输入查询条件
					_search = function(searchParam, conditions) {
						
						_config._queryCondition = undefined; //将默认参数设置空

						//判断当前参数 是否为对象
						if(typeof _param == 'string') {
							_param = JSON.parse(_param);
							_param.query = searchParam;
							_param = JSON.stringify(_param);
						} else {
							_param.query = searchParam;
							_param = JSON.stringify(_param);
						};

						gridSource.page(1); //默认选中第一页
						//gridSource.read(); //刷新表格

					};

					//判断当前参数 是否为对象
					if(typeof _param == 'string') {} else {
						_param = JSON.stringify(_param);
					};

					$.ajax({
						type: 'POST',
						url: _config._dataSouce,
						data: _param,
						dataType: 'json',
						contentType: "application/json",
						success: function(data) {

							//绑定数据
							options_.success(data);
							//验证是否需要开启统计功能
							if(_config.statistical) {
								_config.callback(data.sum);
							} else {}
						}
					});

				},
			},
			pageSize: _config._pageSize, //每页显示条数
			serverPaging: true, //服务器分页
			serverSorting: true, //服务器排序
			serverFiltering: false, //支持查询功能
			//			batch: true, //多选
			schema: { // 定义分页
				data: "data", //定义数据来源
				total: "Total", //页码总数
			}
		});

		//绑定数据源
		var gridObj = $('#' + _config._divId).kendoGrid({
			dataSource: gridSource, //数据源加载
			sortable: _config._sortable, //可排序
			//			selectable: "multiple row", //开启多选
			scrollable: false, //去掉滚动条区域
			dataBinding: function() {
				record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
			},
			//配置表格标头信息
			columns: _columns,
			dataBound: onDataBoundDiv, //数据绑定
			//分页设置
			pageable: _pageObj
		}).data("kendoGrid"); //Grid 结束

		//刷新
		this._reload = function() {
			gridSource.read();
		};

		/*//全选按钮不选
		this.checkFalse = function(){
			$(".checkbox_all").prop("checked",false);
		}*/

		//全选
		function onDataBoundDiv() {
			var row = gridObj.table.find("tr");
			$(".checkbox_all_1").click(function() {
				for(var i = 0; i < row.length; i++) {
					var checkbox = row.eq(i).find(".checkbox");
					if($(this).is(":checked")) {
						checkbox.prop("checked", true);
					} else {
						checkbox.prop("checked", false);
					}
				}
			});
		}
	};

	//消息框 初始化
	notificationBar = $("#notification").kendoNotification({
		position: {
			pinned: true,
			bottom: 30,
			right: 30
		},
		autoHideAfter: 3000,
		stacking: "up",
		templates: [{
			type: "error",
			template: $("#errorTemplate").html()
		}, {
			type: "upload-success",
			template: $("#successTemplate").html()
		}]
	}).data("kendoNotification");

	//配置加载效果
	function skydevNotification() {
		//成功
		this.successMsg = function(message) {
			notificationBar.show({
				message: message
			}, "upload-success");
		};
		//失败
		this.errorMsg = function(title, message) {
			notificationBar.show({
				title: title,
				message: message
			}, "error");
		};
	};

})();