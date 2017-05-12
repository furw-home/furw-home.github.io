(function() {
	/**
	 * 作者: furw
	 * 描述: BD提成查询
	 */
	var bdtccxModule = angular.module('bdtccxModule', ['mainModule']);

	/**
	 * 作者: furw
	 * 描述: BD提成查询
	 */
	bdtccxModule.controller('bdtccxCtrl', ['$scope', 'utilService', 'uiService',
		function($scope, utilService, uiService) {

			var grid, //Grid
				columns, //Grid 列配置
				config, //Grid 参数配置
				ssbm_bd, //部门下拉
				ssbm_bd_config; //部门下拉配置

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
			};

			//初始化下拉框
			$scope.initDropdownlist = function() {
				ssbm_bd = uiService.createDropdownlist(ssbm_bd_config);
			};

			//初始化 grid
			$scope.initGrid = function() {
				grid = uiService.createGrid(columns, config);
			};

			//所属部门 下拉参数
			var _ssbmPm2 = {
				"Year": _year,
				"Month": _month,
				"column": "G_CName",
			};

			//所属部门 下拉配置
			ssbm_bd_config = {
				divId: "ssbm_bd", //下拉框id
				_pm: _ssbmPm2, //参数
				_id_multi_select: true,
				_url: utilService.JXGL_SERVICE_URL + "baseorder/getdropdown", //url
			};

			//Grid 配置
			config = {
				dataSouce: utilService.JXGL_SERVICE_URL + "bd/getlist", //URL
				divId: "grid", //grid id
				sortable: false, // 排序
				pageable: true, //分页
				scrollable: true, //可滚动
				queryCondition: { //参数
					"Year": _year,
					"Month": _month
				}
			};

			//查询
			$scope.retrieve = function(project) {

				if(undefined == project) {
					project = {};
				} else {}

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

				//所属部门
				var ssbm_db_ItemData = ssbm_bd.getItems("ssbm_bd");
				project.G_CName = ssbm_db_ItemData;
				project.G_CName = project.G_CName.join(",");

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

				//获取年
				var _year4 = $(".years").html();
				_year4 = _year4.substr(0, _year4.lastIndexOf("年"));
				_year4 = parseInt(_year4);

				//获取月
				var _month4;
				for(var x = 0; x < $(".month li").length; x++) {
					if($(".month li").eq(x).attr("class") == "hove") {
						_month4 = $(".month li").eq(x).html();
					}
				};
				_month4 = _month4.substr(0, _month4.lastIndexOf("月"));
				_month4 = parseInt(_month4);

				//所属部门
				var ssbm_db_ItemData = ssbm_bd.getItems("ssbm_bd");
				project.G_CName = ssbm_db_ItemData;
				project.G_CName = project.G_CName.join(",");

				project.Year = _year4;
				project.Month = _month4;

				var query = JSON.stringify(project);

				//模拟from 提交 实现下载文件流
				var form = $("<form>");
				form.attr('style', 'display:none');
				form.attr('target', '');
				form.attr('method', 'post');
				form.attr('action', utilService.JXGL_SERVICE_URL + "bd/outExcel" + "?ticket=" + ticket + "&query=" + query);
				$('body').append(form);
				form.submit();

			};

			//配置表格标头信息
			columns = [{
				headerTemplate: '<input type="checkbox" class="checkbox_all" name="testId" />',
				template: '<input type="checkbox" class="checkbox" name="testId" />',
				width: 30,
				locked: false
			}, {
				field: "BDLoginName",
				title: "BD账号",
				width: 120
			}, {
				field: "BDName",
				title: "BD姓名",
				width: 120
			}, {
				field: "G_CName1",
				title: "一级部门",
				width: 120
			}, {
				field: "G_CName",
				title: "二级部门",
				width: 120
			}, {
				field: "OrderMoneyYun",
				title: "订单金额+运费",
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
				field: "RealityMoney",
				title: "以回款金额",
				width: 120
			}, {
				field: "Maoli",
				title: "毛利",
				width: 120
			}, {
				field: "ZongTich",
				title: "总提成",
				width: 120
			}, {
				field: "BdTicheng",
				title: "BD提成1/3",
				width: 120
			}, {
				field: "BdBm",
				title: "BD部门提成1/6",
				width: 120
			}, {
				field: "BdChiZi",
				title: "BD费用池子1/6",
				width: 120
			}, {
				field: "PM",
				title: "PM1/6",
				width: 120
			}, {
				field: "GongYil",
				title: "供应链1/6",
				width: 120
			}];

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
				var _ssbmPm1 = {
					"Year": _year2,
					"Month": _month2,
					"column": "G_CName"
				};

				//一级部门  下拉配置
				var ssbm_config = {
					divId: "ssbm_bd", //下拉框id
					_pm: _ssbmPm1, //参数
					_url: utilService.JXGL_SERVICE_URL + "baseorder/getdropdown", //url
				};

				ssbm_bd.rebindDropdownlistData(ssbm_config); //部门

				grid.search(pm); //搜索
			};

		}
	]);
})();