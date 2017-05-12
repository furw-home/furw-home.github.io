(function() {
	/**
	 * 作者: furw
	 * 描述: 部门提成
	 */
	var bmwdjxModule = angular.module('bmwdjxModule', ['mainModule']);

	/**
	 * 作者: furw
	 * 描述: 部门提成
	 */
	bmwdjxModule.controller('bmwdjxCtrl', ['$scope', 'utilService', 'uiService',
		function($scope, utilService, uiService) {

			//跳转 新窗口
			$scope.open111 = function() {
				var pm_123 = "销售提成系统" + "," + "部门提成" + "," + "http://wxtest1.98ep.com/backstage/consumer/select.do?consumerid=130468&xj_source=nb";
				//加密
				pm_123 = escape(pm_123);
				window.open("http://wxtest1.98ep.com/page/usercenter/app/index.html?pm=" + pm_123);
			}

			var grid, //Grid
				columns, //Grid 列
				config, //grid 配置
				yjbm, //一级部门
				yjbm_config, //一级部门配置
				ejbm, //二级部门
				ejbm_config; //二级部门配置

			//读取日期数据并渲染到页面
			$.ajax({
				type: 'get',
				url: utilService.JXGL_SERVICE_URL + "baseorder/getalltime",
				async: false,
				dataType: 'json',
				success: function(data) {
					var data = data.data;
					//渲染数据
					for(var i = 0; i < data.length; i++) {
						if(i == 0) {
							$(".years").html(data[i].year + "年");
							for(var j = 0; j < data.length; j++) {
								if(data[j].year == data[i].year) {
									$(".month").html("");
									for(var n = 0; n < data[j].month.length; n++) {
										if(n == 0) {
											$(".month").append("<li class='hove'>" + data[j].month[n].name + "</li>")
										} else {
											$(".month").append("<li>" + data[j].month[n].name + "</li>")
										}
									}
								}
							}
						}
						$(".dropdown-menu").append("<li><a href='###'>" + data[i].year + "年" + "</a></li>")
					};

					select_month(); //切换月份

					//获取选中年份
					$(".dropdown-menu li").click(function() {
						var name = $(this).find("a").html();
						$(".years").html(name);

						for(var j = 0; j < data.length; j++) {
							if(data[j].year + "年" == name) {
								$(".month").html("");
								for(var n = 0; n < data[j].month.length; n++) {
									if(n == 0) {
										$(".month").append("<li class='hove'>" + data[j].month[n].name + "</li>")
									} else {
										$(".month").append("<li>" + data[j].month[n].name + "</li>")
									}
								}
								select_month(); //切换月份
							}
						}
						$scope.cascadeQuery(); //日期级联查询 数据
					});
				}
			});

			//切换月份
			function select_month() {
				for(var x = 0; x < $(".month li").length; x++) {
					$(".month li").eq(x).click(function() {
						//取消选中状态
						for(var j1 = 0; j1 < $(".month li").length; j1++) {
							$(".month li").eq(j1).removeClass("hove");
						};
						$(this).addClass("hove");
						$scope.cascadeQuery(); //日期级联查询 数据
					});
				};
			};

			//获取年
			var _year = $(".years").html();
			_year = _year.substr(0, _year.lastIndexOf("年"));
			_year = parseInt(_year);

			//获取月
			var _month;
			for(var x = 0; x < $(".month li").length; x++) {
				if($(".month li").eq(x).attr("class") == "hove") {
					_month = $(".month li").eq(x).html();
				}
			};
			_month = _month.substr(0, _month.lastIndexOf("月"));
			_month = parseInt(_month);

			//初始化
			$scope.init = function() {
				$scope.initDropdownlist(); //初始化下拉框
				$scope.initGrid(); // 初始化 grid
				$scope.project1 = {};
			};

			//初始化下拉框
			$scope.initDropdownlist = function() {
				yjbm = uiService.createDropdownlist(yjbm_config);
				ejbm = uiService.createDropdownlist(ejbm_config);
			};

			//初始化 grid
			$scope.initGrid = function() {
				grid = uiService.createGrid(columns, config);
			};

			//一级部门 下拉参数
			var _yjbmPm = {
				"Year": _year,
				"Month": _month,
				"column": "G_CName1"
			};

			//二级部门 下拉参数
			var _ejbmPm = {
				"Year": _year,
				"Month": _month,
				"column": "G_CName",
				"Parent": ""
			};

			//一级部门下拉配置
			yjbm_config = {
				divId: "yjbm", //下拉框id
				_pm: _yjbmPm, //参数
				_id_multi_select: true,
				callback: onChange,
				_url: utilService.JXGL_SERVICE_URL + "baseorder/getdropdown", //url
			};

			//二级部门下拉配置
			ejbm_config = {
				divId: "ejbm", //下拉框id
				_pm: _ejbmPm, //参数
				_id_multi_select: true,
				enable: false,
				_url: utilService.JXGL_SERVICE_URL + "dep/GetTwoDep", //url
			};

			//Grid 配置
			config = {
				dataSouce: utilService.JXGL_SERVICE_URL + "dep/getlist", //URL
				divId: "grid", //grid id
				sortable: false, // 排序
				pageable: true, //分页
				scrollable: true, //可滚动
				queryCondition: { //参数
					"Year": _year,
					"Month": _month
				}
			};

			//一级下拉框改变事件 回调
			function onChange(e) {

				var value = this.value();
				value = value.join(",");

				var _year7 = $(".years").html();
				_year7 = _year7.substr(0, _year7.lastIndexOf("年"));
				_year7 = parseInt(_year7);

				//获取月
				var _month7;
				for(var x = 0; x < $(".month li").length; x++) {
					if($(".month li").eq(x).attr("class") == "hove") {
						_month7 = $(".month li").eq(x).html();
					}
				};
				_month7 = _month7.substr(0, _month7.lastIndexOf("月"));
				_month7 = parseInt(_month7);

				//部门 下拉参数
				var _ejbmPm1 = {
					"Year": _year7,
					"Month": _month7,
					"column": "G_CName",
					"Parent": value
				};

				//部门  下拉配置
				ejbm_config = {
					divId: "ejbm", //下拉框id
					_pm: _ejbmPm1, //参数
					_url: utilService.JXGL_SERVICE_URL + "dep/GetTwoDep", //url
				};

				var multiselect = $("#ejbm").data("kendoMultiSelect");
				if(value == "") {
					multiselect.enable(false); //禁用
					multiselect.value("可多选");
				} else {
					multiselect.enable(true); //启用
				}

				ejbm.rebindDropdownlistData(ejbm_config); //重新渲染二级部门

			};

			//搜索
			$scope.retrieve = function() {

				var project = {}

				//获取年
				var _year3 = $(".years").html();
				_year3 = _year3.substr(0, _year3.lastIndexOf("年"));
				_year3 = parseInt(_year3);
				//获取月
				var _month3;
				for(var x = 0; x < $(".month li").length; x++) {
					if($(".month li").eq(x).attr("class") == "hove") {
						_month3 = $(".month li").eq(x).html();
					}
				};
				_month3 = _month3.substr(0, _month3.lastIndexOf("月"));
				_month3 = parseInt(_month3);

				project.Year = _year3;
				project.Month = _month3;

				//一级部门
				var yjbmItemData = yjbm.getItems("yjbm");
				project.G_CName1 = yjbmItemData;
				project.G_CName1 = project.G_CName1.join(",");

				//二级部门
				var ejbmItemData = ejbm.getItems("ejbm");
				project.G_CName = ejbmItemData;
				project.G_CName = project.G_CName.join(",");

				grid.search(project); //搜索

			};

			//上传图片
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

			//刷新dom
			function CheckScopeBeforeApply() {
				if(!$scope.$$phase) {
					$scope.$apply();
				}
			};

			//打开录入调整额度
			$scope.rltzed = function() {

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
					uiService.alert("请选择部门！");
				} else if(idsToSend.length > 1) {
					uiService.alert("只能选择一个部门！");
				} else {

					//图片预览
					if(idsToSend[0].filepath == "") {
						$("#file-list_1").html("");
					} else {
						$("#file-list_1").html("");
						$("#file-list_1").append('<div style="margin-top:10px" class="see_photo" data-path=' + idsToSend[0].filepath + '><a target="_blank" style="color:blue" href="http://filed.98ep.com/' + idsToSend[0].filepath + '">' + idsToSend[0].filepath + '</a><span class="glyphicon glyphicon-remove remove_1" style="color: #BE0004;margin-left:10px; cursor: pointer"></span></div>');
						//清空图片预览
						$("#file-list_1 .see_photo span").click(function() {
							$("#file-list_1").html("");
						});
					};

					var _osskey_bmjx = window.sessionStorage.getItem("_osskey_bmjx");
					if(_osskey_bmjx == null) {} else {
						sessionStorage.removeItem("_osskey_bmjx"); //移除
					};

					//配置 window config
					var window_config;
					window_config = {
						divId: "bcqtxx_window",
						width: "450px",
						height: "420px",
						title: "录入调整额度",
						onClose: onClose,
					};

					$scope.project1.money = ""; //清空其他费用文本框
					$scope.project1.remark = ""; //清空备注文本框

					$scope.project1.money = idsToSend[0].othervalue;
					$scope.project1.remark = idsToSend[0].remark;
					CheckScopeBeforeApply();

					//生成window
					window_bcqtxx = uiService.window(window_config);

					//监听关闭事件
					function onClose(e) {
						var breadcrumb = window.parent.document.getElementById("breadcrumb");
						breadcrumb.style.borderBottom = "1px solid #ddd";
					};
				}

			};

			//关闭window
			$scope.close = function() {
				window_bcqtxx.close();
			}

			//补充其他信息保存
			$scope.bctjbc = function(str) {
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

					//获取年
					var _year8 = $(".years").html();
					_year8 = _year8.substr(0, _year8.lastIndexOf("年"));
					_year8 = parseInt(_year8);

					//获取月
					var _month8;
					for(var x = 0; x < $(".month li").length; x++) {
						if($(".month li").eq(x).attr("class") == "hove") {
							_month8 = $(".month li").eq(x).html();
						}
					};
					_month8 = _month8.substr(0, _month8.lastIndexOf("月"));
					_month8 = parseInt(_month8);

					var _ordercode = idsToSend[0].G_CName1 + idsToSend[0].G_CName + _year8 + _month8;

					str.money = parseFloat(str.money);
					str.ordercode = _ordercode;

					//获取图片地址
					var _osskey_bmjx = window.sessionStorage.getItem("_osskey_bmjx");
					if(null == _osskey_bmjx) {
						str.filepath = "";
						var _filepath = $("#file-list_1 .see_photo").attr("data-path");
						if(_filepath != null) {
							str.filepath = _filepath;
						}
					} else {
						_osskey_bmjx = JSON.parse(_osskey_bmjx);
						str.filepath = _osskey_bmjx[0].qcfilekey;
						//str.filename = _osskey_fyjl[0].qcfilename;
					} //结束

					$.ajax({
						type: 'POST',
						url: utilService.JXGL_SERVICE_URL + "ExpenseRecord/UpdateOrderOther",
						data: str,
						dataType: 'json',
						//contentType: "application/json",
						success: function(data) {
							if(data.state == 1) {
								grid.reload(); //刷新表格
								window_bcqtxx.close();
								uiService.notification().successMsg("操作成功!"); //操作提示消息
							} else {
								uiService.alert(data.msg);
							}
						}
					});
				}
			};

			//关闭图片预览
			$(".photo span").click(function() {
				$(".photo").css("display", "none");
			});

			//导出
			$scope.export = function() {

				//获取 ticket
				var ticket = utilService.TICKET;

				var project = {}

				//获取年
				var _year3 = $(".years").html();
				_year3 = _year3.substr(0, _year3.lastIndexOf("年"));
				_year3 = parseInt(_year3);
				//获取月
				var _month3;
				for(var x = 0; x < $(".month li").length; x++) {
					if($(".month li").eq(x).attr("class") == "hove") {
						_month3 = $(".month li").eq(x).html();
					}
				};
				_month3 = _month3.substr(0, _month3.lastIndexOf("月"));
				_month3 = parseInt(_month3);

				project.Year = _year3;
				project.Month = _month3;

				//一级部门
				var yjbmItemData = yjbm.getItems("yjbm");
				project.G_CName1 = yjbmItemData;
				project.G_CName1 = project.G_CName1.join(",");

				//二级部门
				var ejbmItemData = ejbm.getItems("ejbm");
				project.G_CName = ejbmItemData;
				project.G_CName = project.G_CName.join(",");

				var query = JSON.stringify(project);

				//模拟from 提交 实现下载文件流
				var form = $("<form>");
				form.attr('style', 'display:none');
				form.attr('target', '');
				form.attr('method', 'post');
				form.attr('action', utilService.JXGL_SERVICE_URL + "/Dep/outExcel" + "?ticket=" + ticket + "&query=" + query);
				$('body').append(form);
				form.submit();
			};

			//分配
			$scope.fp = function() {

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

				//获取年
				var _year9 = $(".years").html();
				_year9 = _year9.substr(0, _year9.lastIndexOf("年"));
				_year9 = parseInt(_year9);

				//获取月
				var _month9;
				for(var x = 0; x < $(".month li").length; x++) {
					if($(".month li").eq(x).attr("class") == "hove") {
						_month9 = $(".month li").eq(x).html();
					}
				};

				_month9 = _month9.substr(0, _month9.lastIndexOf("月"));
				_month9 = parseInt(_month9);

				if(idsToSend.length == 0) {
					uiService.alert("请选择部门！");
				} else if(idsToSend.length > 1) {
					uiService.alert("只能选择一个部门！");
				} else {
					var only_code = idsToSend[0].G_CName1 + idsToSend[0].G_CName;
					var pm_ = idsToSend[0].G_CName1 + "," + idsToSend[0].G_CName + "," + _year9 + "," + _month9;
					//pm_ = encodeURI(pm_);
					//加密
					pm_ = escape(pm_);
					createTab(idsToSend[0].G_CName + " - 绩效分配", only_code, utilService.ADDRESS + '/jxgl/jxfp.html?pm=' + pm_);
				};

			};

			//配置表格标头信息
			columns = [{
					headerTemplate: '<input type="checkbox" class="checkbox_all" name="testId" />',
					template: '<input type="checkbox" class="checkbox" name="testId" />',
					width: 30,
					locked: false
				}, {
					field: "G_CName1",
					title: "一级部门",
					width: 100
				}, {
					field: "G_CName",
					title: "二级部门",
					width: 200
				}, {
					field: "MonthTC",
					title: "本月提成",
					width: 120
				}, {
					field: "othervalue",
					title: "调整金额",
					width: 120
				}, {
					field: "remark",
					title: "调整备注",
					width: 200
				}, {
					field: "filepath",
					title: "辅证",
					width: 80,
					template: "#= (filepath) ? a='查看图片': b='' #",
					attributes: {
						onclick: 'seePhoto(this)',
						style: "color:blue; text-align: left;height:5px;padding-left: 10px;text-decoration:underline",
						onmouseover: "this.style.cursor='pointer'"
					},
				}, {
					field: "ZongTich",
					title: "总提成",
					width: 120
				}, {
					field: "OrderMoneyYun",
					title: "订单金额+运费",
					width: 120
				}, {
					field: "RealityMoney",
					title: "已回款金额",
					width: 120
				}, {
					field: "fourItemMoney",
					title: "承印费四项合计",
					width: 120
				}, {
					field: "LogisticsMoney",
					title: "物流费",
					width: 120
				}, {
					field: "otherMoney",
					title: "其他费用",
					width: 120
				}, {
					field: "Maoli",
					title: "毛利",
					width: 120
				}
				//			,{
				//				field: "BdTicheng",
				//				title: "bd提成1/3",
				//				width: 120
				//			}, {
				//				field: "BdBm",
				//				title: "bd部门提成1/6",
				//				width: 120
				//			}, {
				//				field: "BdChiZi",
				//				title: "bd费用池子1/6",
				//				width: 120
				//			}, {
				//				field: "PM",
				//				title: "PM1/6",
				//				width: 120
				//			}, {
				//				field: "GongYil",
				//				title: "供应链1/6",
				//				width: 120
				//			}
			];

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
				var _url1 = idsToSend[0].filepath;

				if(_url1 != "") {
					_url1.substring(-1, (_url1 - 1));
					_url1 = "http://filed.98ep.com/" + _url1;

					$(".photo img").attr("src", _url1);
					$(".photo").css("display", "block");
				}
			};

			//日期级联查询 数据
			$scope.cascadeQuery = function() {

				//获取年
				var _year2 = $(".years").html();
				_year2 = _year2.substr(0, _year2.lastIndexOf("年"));
				_year2 = parseInt(_year2);
				//获取月
				var _month2;
				for(var x = 0; x < $(".month li").length; x++) {
					if($(".month li").eq(x).attr("class") == "hove") {
						_month2 = $(".month li").eq(x).html();
					}
				};
				_month2 = _month2.substr(0, _month2.lastIndexOf("月"));
				_month2 = parseInt(_month2);

				var pm = {
					"Year": _year2,
					"Month": _month2
				};

				//一级部门 下拉参数
				var _yjbmPm1 = {
					"Year": _year2,
					"Month": _month2,
					"column": "G_Cname1"
				};

				//一级部门  下拉配置
				yjbm_config1 = {
					divId: "yjbm", //下拉框id
					_pm: _yjbmPm1, //参数
					_url: utilService.JXGL_SERVICE_URL + "baseorder/getdropdown", //url
				};

				//yjbm.rebindDropdownlistData(yjbm_config1); //部门

				grid.search(pm); //搜索
			};

		}
	]);
})();