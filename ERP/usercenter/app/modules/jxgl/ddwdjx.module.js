(function() {
	/**
	 * 作者: furw
	 * 描述: 订单维度绩效 module
	 */
	var ddwdjxModule = angular.module('ddwdjxModule', ['mainModule']);

	/**
	 * 作者: furw
	 * 描述: 订单维度绩效 控制器
	 */
	ddwdjxModule.controller('ddwdjxCtrl', ['$scope', 'utilService', 'uiService',
		function($scope, utilService, uiService) {

			var grid, //Grid
				columns, //Grid 列
				config, //grid 配置
				window_edit, //编辑 window
				window_bcqtxx, //window 窗口
				ssbm, //所属部门下拉
				ssbm_config, //所属部门下拉配置
				xdbd, //BD 下拉框
				xdbd_config, //BD 下拉框配置
				wljjfa, //物流解决方案
				wljjfa_config, //物流解决方案配置
				ddlx, //订单类型
				ddlx_config, //订单类型配置
				logGrid,
				logColumns,
				logConfig;

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
				$scope.project1 = {}; //初始化 
			};

			//初始化下拉框
			$scope.initDropdownlist = function() {
				ssbm = uiService.createDropdownlist(ssbm_config);
				xdbd = uiService.createDropdownlist(xdbd_config);
				wljjfa = uiService.createDropdownlist(wljjfa_config);
				ddlx = uiService.createDropdownlist(ddlx_config);
			};

			//初始化 grid
			$scope.initGrid = function() {
				grid = uiService.createGrid(columns, config);
			};

			//设置是否接收下拉框数据
			var isRemark = [{
				text: "全部",
				value: "全部"
			}, {
				text: "是",
				value: "是"
			}, {
				text: "否",
				value: "否"
			}];

			// 初始化是否接收下拉框
			$("#isRemark").kendoDropDownList({
				dataTextField: "text",
				dataValueField: "value",
				dataSource: isRemark
			});

			//所属部门 下拉参数
			var _ssbmPm = {
				"Year": _year,
				"Month": _month,
				"column": "G_CName"
			};

			//下单BD 下拉参数
			var _xdbdPm = {
				"Year": _year,
				"Month": _month,
				"column": "bdname"
			};

			//物流解决方案 下拉参数
			var _wljjfaPm = {
				"Year": _year,
				"Month": _month,
				"column": "LogisticsSolution"
			};

			//物流解决方案 下拉参数
			var _ddlxPm = {
				"Year": _year,
				"Month": _month,
				"column": "IsStock"
			};

			//所属部门下拉配置
			ssbm_config = {
				divId: "ssbm", //下拉框id
				_pm: _ssbmPm, //参数
				_id_multi_select: true,
				_url: utilService.JXGL_SERVICE_URL + "baseorder/getdropdown", //url
			};

			//DB下拉框配置
			xdbd_config = {
				divId: "xdbd", //下拉框id
				_pm: _xdbdPm, //参数
				_id_multi_select: true,
				_url: utilService.JXGL_SERVICE_URL + "baseorder/getdropdown", //url
			};

			//DB下拉框配置
			wljjfa_config = {
				divId: "wljjfa", //下拉框id
				_pm: _wljjfaPm, //参数
				_id_multi_select: true,
				_url: utilService.JXGL_SERVICE_URL + "baseorder/getdropdown", //url
			};

			//订单类型
			ddlx_config = {
				divId: "ddlx", //下拉框id
				_pm: _ddlxPm, //参数
				_id_multi_select: true,
				_url: utilService.JXGL_SERVICE_URL + "baseorder/getdropdown", //url
			};

			//Grid 配置
			config = {
				dataSouce: utilService.JXGL_SERVICE_URL + "baseorder/GetBaseOrder", //URL
				divId: "grid", //grid id
				sortable: false, // 排序
				pageable: true, //分页
				setBgColor: true, //背景色
				scrollable: true, //可滚动
				queryCondition: { //参数
					"Year": _year,
					"Month": _month
				},
				callback2: setColor //回调函数
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

			//数据时间
			$.ajax({
				type: 'POST',
				url: utilService.JXGL_SERVICE_URL + "BaseOrder/GetRePortLog",
				data: JSON.stringify({
					year: _year,
					month: _month
				}),
				dataType: 'json',
				contentType: "application/json",
				success: function(data) {
					if(data.data == "[]") {
						$("._title span").html("");
					} else {
						$("._title span").html(data.data);
					}
				}
			});

			//弹出补充其他信息窗口
			$scope.bcqtxx = function() {

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
					uiService.alert("请选择订单！");
				} else if(idsToSend.length > 1) {
					uiService.alert("只能选择一条订单！");
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

					var _osskey_ddwd = window.sessionStorage.getItem("_osskey_ddwd");
					if(_osskey_ddwd == null) {} else {
						sessionStorage.removeItem("_osskey_ddwd"); //移除
					};

					//配置 window config
					var window_config;
					window_config = {
						divId: "bcqtxx_window",
						width: "450px",
						height: "380px",
						title: "补充其他信息",
						onClose: onClose,
					};

					$scope.project1.money = ""; //清空其他费用文本框
					$scope.project1.remark = ""; //清空备注文本框

					$scope.project1.money = idsToSend[0].otherMoney;
					$scope.project1.remark = idsToSend[0].Remark;

					//生成window
					window_bcqtxx = uiService.window(window_config);

					//监听关闭事件
					function onClose(e) {
						var breadcrumb = window.parent.document.getElementById("breadcrumb");
						breadcrumb.style.borderBottom = "1px solid #ddd";
					};
				}
			};

			//关闭补充其他信息窗口
			$scope.close = function() {
				window_bcqtxx.close();
			};

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
							idsToSend.push(ds[i].OrderCode); //将当前行 id 存进集合
						}
					};

					str.money = parseFloat(str.money);
					str.ordercode = idsToSend[0]

					//获取图片地址
					var _osskey_ddwd = window.sessionStorage.getItem("_osskey_ddwd");
					if(null == _osskey_ddwd) {
						str.filepath = "";
						var _filepath = $("#file-list_1 .see_photo").attr("data-path");
						if(_filepath != null) {
							str.filepath = _filepath;
						}
					} else {
						_osskey_ddwd = JSON.parse(_osskey_ddwd);
						str.filepath = _osskey_ddwd[0].qcfilekey;
						//str.filename = _osskey_fyjl[0].qcfilename;
					} //结束

					$.ajax({
						type: 'POST',
						//url: utilService.JXGL_SERVICE_URL + "baseorder/UpdateOrderOther",
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

			//导出
			$scope.export = function(project) {

				//获取 ticket
				var ticket = utilService.TICKET;

				if(undefined == project) {
					project = {};
				} else {}

				//承印费金额
				project.Minfouritemmoney = parseInt(project.Minfouritemmoney);
				project.Maxfouritemmoney = parseInt(project.Maxfouritemmoney);

				//运费金额
				project.Mindeliveryfee = parseInt(project.Mindeliveryfee);
				project.Maxdeliveryfee = parseInt(project.Maxdeliveryfee);

				//下单BD
				var xdbdItemData = xdbd.getItems("xdbd");
				project.bdname = xdbdItemData;
				project.bdname = project.bdname.join(",");

				//物流解决方案
				var wljjfaItemData = wljjfa.getItems("wljjfa");
				project.LogisticsSolution = wljjfaItemData;
				project.LogisticsSolution = project.LogisticsSolution.join(",");

				//订单类型
				var ddlxItemData = ddlx.getItems("ddlx");
				project.IsStock = ddlxItemData;
				project.IsStock = project.IsStock.join(",");

				//订单类型
				var ssbmItemData = ssbm.getItems("ssbm");
				project.G_CName = ssbmItemData;
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

				//补充信息
				var bcxx = $("#isRemark").data("kendoDropDownList").value();
				project.isRemark = bcxx;

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
				form.attr('action', utilService.JXGL_SERVICE_URL + "baseorder/outexcel" + "?ticket=" + ticket + "&query=" + query);
				$('body').append(form);
				form.submit();
			};

			//实例化一个plupload上传对象
			var uploader = new plupload.Uploader({
				runtimes: 'html5,flash,silverlight,html4',
				browse_button: 'browse', //触发文件选择对话框的按钮，为那个元素id
				url: utilService.JXGL_SERVICE_URL + 'baseorder/FileUpLoad', //服务器端的上传页面地址
				filters: {},
			});

			//初始化upload
			uploader.init();

			//绑定文件添加进队列事件
			uploader.bind('FilesAdded', function(uploader, files) {
				$(".fieldlist1 span").html("");
				$("#file-list").html(""); //清空
				for(var i = 0, len = files.length; i < len; i++) {
					var file_name = files[i].name; //文件名
					//构造html来更新UI
					var html = '<div id="file-' + files[i].id + '"><p class="file-name">' + file_name + '</p><p class="progress"></p></div>';
					$(html).appendTo('#file-list');
				}
			});

			//绑定文件添加进队列事件
			uploader.bind('UploadProgress', function(up, file) {
				$("#file-list .progress").css("width", file.percent + "%")
			});

			//上传成功后
			uploader.bind('FileUploaded', function(up, file, res) {
				import_window.close();
				uiService.alert("导入文件成功！");
				grid.reload();
			});

			//上传失败
			uploader.bind('Error', function(up, err) {
				if(err.code == -600) {
					alert("\n选择的文件太大了，目前仅支持上传10MB以内的文件！");
				} else if(err.code == -601) {
					alert("\n选择的文件后缀不对，目前仅支持 zip,rar 格式");
				} else if(err.code == -602) {
					alert("\n这个文件已经在文件列表中")
				} else {
					alert("\nError xml:" + err.response);
				}
			});

			//开始上传
			$("#upload-btn").click(function() {
				//获取 ticket
				var ticket = utilService.TICKET;
				uploader.settings.url = utilService.JXGL_SERVICE_URL + "baseorder/FileUpLoad" + "?ticket=" + ticket;
				uploader.start();
			});

			//导入
			var import_window;
			$scope.theImport = function() {

				//配置 window config
				var import_window_config;
				import_window_config = {
					divId: "import_window",
					width: "450px",
					height: "280px",
					title: "导入",
					onClose: onClose,
				};

				$(".fieldlist1 span").html("请选择要导入的文件！");
				$("#file-list").html(""); //清空

				//生成window
				import_window = uiService.window(import_window_config);

				//监听关闭事件
				function onClose(e) {
					var breadcrumb = window.parent.document.getElementById("breadcrumb");
					breadcrumb.style.borderBottom = "1px solid #ddd";
				};
			};

			//关闭导入窗口
			$scope._close = function() {
				import_window.close();
			};

			//搜索
			$scope.retrieve = function(project) {

				if(undefined == project) {
					project = {};
				} else {}

				//承印费金额
				project.Minfouritemmoney = parseInt(project.Minfouritemmoney);
				project.Maxfouritemmoney = parseInt(project.Maxfouritemmoney);

				//运费金额
				project.Mindeliveryfee = parseInt(project.Mindeliveryfee);
				project.Maxdeliveryfee = parseInt(project.Maxdeliveryfee);

				//下单BD
				var xdbdItemData = xdbd.getItems("xdbd");
				project.bdname = xdbdItemData;
				project.bdname = project.bdname.join(",");

				//物流解决方案
				var wljjfaItemData = wljjfa.getItems("wljjfa");
				project.LogisticsSolution = wljjfaItemData;
				project.LogisticsSolution = project.LogisticsSolution.join(",");

				//订单类型
				var ddlxItemData = ddlx.getItems("ddlx");
				project.IsStock = ddlxItemData;
				project.IsStock = project.IsStock.join(",");

				//所属部门
				var ssbmItemData = ssbm.getItems("ssbm");
				project.G_CName = ssbmItemData;
				project.G_CName = project.G_CName.join(",");

				//获取年
				var _year3 = $(".years").html();
				_year3 = _year3.substr(0, _year3.lastIndexOf("年"));
				_year3 = parseInt(_year3);

				//补充信息
				var bcxx = $("#isRemark").data("kendoDropDownList").value();
				project.isRemark = bcxx;

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

			//刷新
			$scope.refresh = function() {

				Showbo.Msg.confirm('您确定要刷新吗？', function(flag) {
					if(flag == 'yes') {
						$("#_body2").show();
						$("#refresh").html("正在刷新...")

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

						var _pm = {
							"Year": _month6,
							"Month": _month6
						}

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
									$("#_body2").hide();
									$("#refresh").html("确定");
									var project = {};
									$scope.retrieve(project);
								} else {
									uiService.alert(data.msg);
									$("#_body2").hide();
									$("#refresh").html("确定");
								}
							}
						});
					} else if(flag == 'no') {}
				});
			};

			//设置行颜色 Grid 回调函数
			function setColor() {
				var grid = $("#grid").data("kendoGrid");
				var ds = grid.dataSource.view();
				for(var i = 0; i < ds.length; i++) {
					var row = grid.table.find("tr[data-uid='" + ds[i].uid + "']");
					if(ds[i].bdname == "") {
						row.css("background-color", "#E58519");
						row.css("color", "white");
					} else if(ds[i].bddep2 != ds[i].G_CName) {
						row.css("background-color", "#E58519");
						row.css("color", "white");
					}
				}
			};

			//grid 列配置
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
					field: "OrderCode",
					title: "订单编号",
					attributes: {
						onclick: 'downCount(this)',
						style: "color:blue; text-align: left;height:5px;padding-left: 10px;text-decoration:underline",
						onmouseover: "this.style.cursor='pointer'"
					},
					width: 120
				}, {
					field: "OrderName",
					title: "订单名称",
					width: 360
				}, {
					field: "Hesuan",
					title: "核算账期",
					template: "#= (Hesuan +'%') #", //对数据进行逻辑操作                             
					width: 80
				}, {
					field: "ZongTich",
					title: "总提成",
					width: 80
				}, {
					field: "Quantity",
					title: "数量",
					width: 80
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
					title: "物流费用",
					width: 80
				}, {
					field: "otherMoney",
					title: "其他费用",
					width: 80
				}, {
					field: "Remark",
					title: "备注信息",
					width: 230
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
					field: "IsStock",
					title: "订单类型",
					width: 80
				}, {
					field: "QuotationSource",
					title: "报价来源",
					width: 80
				}, {
					field: "CreateTime",
					title: "下单时间",
					width: 130
				}, {
					field: "File_Time",
					title: "文件检查合格时间",
					width: 130
				}, {
					field: "gysjdtime",
					title: "供应商接单时间",
					width: 130
				}, {
					field: "Cptime",
					title: "标记回全款时间",
					width: 130
				}, {
					field: "Payment",
					title: "支付方式",
					width: 80
				}, {
					field: "PayState",
					title: "支付状态",
					width: 80
				}, {
					field: "orderState",
					title: "订单状态",
					width: 80
				}, {
					field: "LogisticsSolution",
					title: "物流解决方案",
					width: 120
				}, {
					field: "Creator",
					title: "下单人姓名",
					width: 80
				}, {
					field: "CreatorDep",
					title: "下单人部门",
					width: 120
				}, {
					field: "bdname",
					title: "下单BD",
					width: 80
				}, {
					field: "bddep2",
					title: "下单BD部门",
					width: 120
				}, {
					field: "filecreator",
					title: "文件上传人",
					width: 80
				}, {
					field: "wfCreator",
					title: "外发人",
					width: 80
				}, {
					field: "providername",
					title: "供应商",
					width: 230
				}, {
					field: "ChengPrintRealMoney",
					title: "已付费用",
					width: 80
				}, {
					field: "CompanyName",
					title: "公司名称",
					width: 200
				}, {
					field: "UserName",
					title: "用户账号",
					width: 160
				}, {
					field: "utype",
					title: "客户类型",
					width: 160,
					sortable: false
				}, {
					field: "delayPay",
					title: "账期时间",
					width: 180
				}, {
					field: "G_CName1",
					title: "一级部门",
					width: 120
				}, {
					field: "G_CName",
					title: "客户所属部门",
					width: 130
				}, {
					field: "JXLX",
					title: "提成类型",
					width: 80
				}, {
					field: "Lastdate",
					title: "到期时间",
					width: 130
				}, {
					field: "Maoli",
					title: "毛利",
					width: 80
				}
				//			, {
				//				field: "BdTicheng",
				//				title: "bd提成1/3",
				//				width: 80
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

			//recordColumns 配置
			logColumns = [{
				field: "No",
				title: "序号",
				template: "#= ++record #",
				sortable: false,
				width: 50
			}, {
				field: "ordercode",
				title: "订单编号"
			}, {
				field: "money",
				title: "填写金额",
				width: 100
			}, {
				field: "remark",
				title: "备注"
			}, {
				field: "creator",
				title: "创建人"
			}, {
				field: "createdtime",
				title: "创建时间"
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
				var _url1 = idsToSend[0].filepath;

				if(_url1 != "") {
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

			//查看当前行数据 (日志)
			var window_log;
			downCount = function(this_1) {

				//获取选中行数据
				idsToSend = [];
				var _this = this_1.parentNode.rowIndex;
				var grid = $("#grid").data("kendoGrid");
				var ds = grid.dataSource.view();
				for(var i = 0; i < ds.length; i++) {
					var row = grid.table.find("tr[data-uid='" + ds[i].uid + "']");
					if(i == _this) {
						idsToSend.push(ds[i]);
					}
				};

				//配置 window config
				var log_window_config;
				log_window_config = {
					divId: "log_window",
					width: "700px",
					height: "400px",
					title: "补充信息日志",
					onClose: onClose,
				};

				//生成window
				window_log = uiService.window(log_window_config);

				//recordGrid 配置
				logConfig = {
					_dataSouce: utilService.JXGL_SERVICE_URL + "BaseOrder/GetUpdateLog", //URL
					_divId: "logGrid", //grid id
					_sortable: false, //排序
					_pageable: false, //分页
					_queryCondition: { //默认参数 （ 无默认参数可忽略 ）
						"ordercode": idsToSend[0].OrderCode
					},
				};

				//初始化
				logdGrid = uiService.generateGrid(logColumns, logConfig);

				//监听关闭事件
				function onClose(e) {
					var breadcrumb = window.parent.document.getElementById("breadcrumb");
					breadcrumb.style.borderBottom = "1px solid #ddd";
				};

			};

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

				//重新绑定下拉数据

				//所属部门 下拉参数
				var _ssbmPm1 = {
					"Year": _year2,
					"Month": _month2,
					"column": "G_CName"
				};

				//下单BD 下拉参数
				var _xdbdPm1 = {
					"Year": _year2,
					"Month": _month2,
					"column": "bdname"
				};

				//物流解决方案 下拉参数
				var _wljjfaPm1 = {
					"Year": _year2,
					"Month": _month2,
					"column": "LogisticsSolution"
				};

				//订单类型 下拉参数
				var _ddlxPm1 = {
					"Year": _year2,
					"Month": _month2,
					"column": "IsStock"
				};

				//下单BD 下拉配置
				xdbd_config = {
					divId: "xdbd", //下拉框id
					_pm: _xdbdPm1, //参数
					_url: utilService.JXGL_SERVICE_URL + "baseorder/getdropdown", //url
				};

				//所属部门下拉配置
				ssbm_config = {
					divId: "ssbm", //下拉框id
					_pm: _ssbmPm1, //参数
					_url: utilService.JXGL_SERVICE_URL + "baseorder/getdropdown", //url
				};

				// 物流解决方案下拉 配置
				wljjfa_config = {
					divId: "wljjfa", //下拉框id
					_pm: _wljjfaPm1, //参数
					_url: utilService.JXGL_SERVICE_URL + "baseorder/getdropdown", //url
				};

				//订单类型
				ddlx_config = {
					divId: "ddlx", //下拉框id
					_pm: _ddlxPm, //参数
					_url: utilService.JXGL_SERVICE_URL + "baseorder/getdropdown", //url
				};

				xdbd.rebindDropdownlistData(xdbd_config); //下单BD
				ssbm.rebindDropdownlistData(ssbm_config); //所属部门
				wljjfa.rebindDropdownlistData(wljjfa_config); //物流解决方案
				ddlx.rebindDropdownlistData(ddlx_config); //订单类型

				//数据时间
				$.ajax({
					type: 'POST',
					url: utilService.JXGL_SERVICE_URL + "BaseOrder/GetRePortLog",
					data: JSON.stringify({
						year: _year2,
						month: _month2
					}),
					dataType: 'json',
					contentType: "application/json",
					success: function(data) {
						if(data.data == "[]") {
							$("._title span").html("");
						} else {
							$("._title span").html(data.data);
						}
					}
				});

				grid.search(pm); //搜索
			};

		}
	]);
})();