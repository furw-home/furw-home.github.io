(function() {
	/**
	 * 作者: furw
	 * 描述: 客户维度绩效 module
	 */
	var khwdjxModule = angular.module('khwdjxModule', ['mainModule']);

	/**
	 * 作者: furw
	 * 描述: 客户维度绩效 控制器
	 */
	khwdjxModule.controller('khwdjxCtrl', ['$scope', 'utilService', 'uiService',
		function($scope, utilService, uiService) {

			var grid, //Grid
				columns, //Grid 列
				config, //grid 配置
				bm, //部门
				bm_config, //部门配置
				jxlx, //绩效类型
				jxlx_config; //绩效类型配置

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
						$scope.cascadeQuery(); //级联查询
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
						$scope.cascadeQuery(); //级联查询
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
			};

			//初始化下拉框
			$scope.initDropdownlist = function() {
				bm = uiService.createDropdownlist(bm_config);
				jxlx = uiService.createDropdownlist(jxlx_config);
			};

			//初始化 grid
			$scope.initGrid = function() {
				grid = uiService.createGrid(columns, config);
			};

			//部门 下拉参数
			var _bmPm = {
				"Year": _year,
				"Month": _month,
				"column": "G_CName"
			};

			//绩效类型 下拉参数
			var _jxlxPm = {
				"Year": _year,
				"Month": _month,
				"column": "JXLX"
			};

			//部门下拉配置
			bm_config = {
				divId: "bm", //下拉框id
				_pm: _bmPm, //参数
				_id_multi_select: true,
				_url: utilService.JXGL_SERVICE_URL + "baseorder/getdropdown", //url
			};

			//绩效类型下拉配置
			jxlx_config = {
				divId: "jxlx", //下拉框id
				_pm: _jxlxPm, //参数
				_id_multi_select: true,
				_url: utilService.JXGL_SERVICE_URL + "baseorder/getdropdown", //url
			};

			//Grid 配置
			config = {
				dataSouce: utilService.JXGL_SERVICE_URL + "Cust/getlist", //URL
				divId: "grid", //grid id
				sortable: false, // 排序
				pageable: true, //分页
				scrollable: true, //可滚动
				queryCondition: { //参数
					"Year": _year,
					"Month": _month
				}
			};

			//检索
			$scope.retrieve = function(project) {

				if(undefined == project) {
					project = {};
				} else {}

				//订单类型
				var jxlxItemData = jxlx.getItems("jxlx");
				project.JXLX = jxlxItemData;
				project.JXLX = project.JXLX.join(",");

				//所属部门
				var bmItemData = bm.getItems("bm");
				project.G_CName = bmItemData;
				project.G_CName = project.G_CName.join(",");

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

				grid.search(project); //搜索
			};

			//导出
			$scope.export = function(project) {

				//获取 ticket
				var ticket = utilService.TICKET;

				if(undefined == project) {
					project = {};
				} else {}

				//订单类型
				var jxlxItemData = jxlx.getItems("jxlx");
				project.JXLX = jxlxItemData;
				project.JXLX = project.JXLX.join(",");

				//所属部门
				var bmItemData = bm.getItems("bm");
				project.G_CName = bmItemData;
				project.G_CName = project.G_CName.join(",");

				//获取年
				var _year5 = $(".years").html();
				_year5 = _year5.substr(0, _year5.lastIndexOf("年"));
				_year5 = parseInt(_year5);

				//获取月
				var _month5;
				for(var x = 0; x < $(".month li").length; x++) {
					if($(".month li").eq(x).attr("class") == "hove") {
						_month5 = $(".month li").eq(x).html();
					}
				};

				_month5 = _month5.substr(0, _month5.lastIndexOf("月"));
				_month5 = parseInt(_month5);

				project.Year = _year5;
				project.Month = _month5;

				var query = JSON.stringify(project);

				//模拟from 提交 实现下载文件流
				var form = $("<form>");
				form.attr('style', 'display:none');
				form.attr('target', '');
				form.attr('method', 'post');
				form.attr('action', utilService.JXGL_SERVICE_URL + "Cust/outExcel" + "?ticket=" + ticket + "&query=" + query);
				$('body').append(form);
				form.submit();
			};

			//刷新
			$scope.refresh = function() {

				//获取年
				var _year6 = $(".years").html();
				_year6 = _year6.substr(0, _year6.lastIndexOf("年"));
				_year6 = parseInt(_year6);

				//获取月
				var _month6;
				for(var x = 0; x < $(".month li").length; x++) {
					if($(".month li").eq(x).attr("class") == "hove") {
						_month6 = $(".month li").eq(x).html();
					}
				};

				_month6 = _month6.substr(0, _month6.lastIndexOf("月"));
				_month6 = parseInt(_month6);

				var _data = {
					"year": _year6,
					"month": _month6
				};

				//调用刷新接口
				$.ajax({
					type: 'POST',
					url: utilService.JXGL_SERVICE_URL + "baseorder/ReSyncOrder",
					data: JSON.stringify(_data),
					dataType: 'json',
					contentType: "application/json",
					success: function(data) {
						if(data.state == 1) {
							uiService.alert("数据刷新成功！");
						} else {
							uiService.alert(data.msg);
						}
					}
				});
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
					width: 80
				}, {
					field: "CompanyName",
					title: "公司名称",
					width: 200
				}, {
					field: "UserName",
					title: "用户账号",
					width: 120
				}, {
					field: "G_CName1",
					title: "一级部门",
					width: 100
				}, {
					field: "G_CName",
					title: "二级部门",
					width: 200
				}, {
					field: "JXLX",
					title: "提成类型",
					width: 80
				}, {
					field: "delayPay",
					title: "账期时间",
					width: 80
				}, {
					field: "ZongTich",
					title: "总提成",
					width: 80
				}, {
					field: "OrderMoneyYun",
					title: "订单金额+运费",
					width: 120
				}, {
					field: "RealityMoney",
					title: "已回款金额",
					width: 80
				}, {
					field: "fourItemMoney",
					title: "承印费四项合计",
					width: 120
				}, {
					field: "LogisticsMoney",
					title: "物流费用",
					width: 80
				}, {
					field: "otherMoney",
					title: "其他费用",
					width: 120
				}, {
					field: "Maoli",
					title: "毛利",
					width: 80
				}
				//			, {
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
				//				width: 80
				//			}, {
				//				field: "GongYil",
				//				title: "供应链1/6",
				//				width: 80
				//			}
			];

			//级联查询
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

				//部门 下拉参数
				var _bmPm1 = {
					"Year": _year2,
					"Month": _month2,
					"column": "G_CName"
				};

				//绩效类型 下拉参数
				var _jxlxPm1 = {
					"Year": _year2,
					"Month": _month2,
					"column": "JXLX"
				};

				//部门  下拉配置
				bm_config = {
					divId: "bm", //下拉框id
					_pm: _bmPm1, //参数
					_url: utilService.JXGL_SERVICE_URL + "baseorder/getdropdown", //url
				};

				//绩效类型 下拉配置
				jxlx_config = {
					divId: "jxlx", //下拉框id
					_pm: _jxlxPm1, //参数
					_url: utilService.JXGL_SERVICE_URL + "baseorder/getdropdown", //url
				};

				bm.rebindDropdownlistData(bm_config); //部门
				jxlx.rebindDropdownlistData(jxlx_config); //绩效类型

				grid.search(pm); //搜索
			};

		}
	]);
})();