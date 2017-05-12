(function() {
	/**
	 * 作者: furw
	 * 描述: 费用记录 module
	 */
	var fyjlModule = angular.module('fyjlModule', ['mainModule']);

	/**
	 * 作者: furw
	 * 描述: 费用记录 控制器
	 */
	fyjlModule.controller('fyjlCtrl', ['$scope', 'utilService', 'uiService',
		function($scope, utilService, uiService) {

			var grid, //Grid
				columns, //Grid 列
				config, //grid 配置
				window_edit, //编辑 window
				window_bcqtxx, //window 窗口
				xdbd, //BD 下拉框
				xdbd_config, //BD 下拉框配置
				wljjfa, //物流解决方案
				wljjfa_config, //物流解决方案配置
				ddlx, //订单类型
				ddlx_config, //订单类型配置
				ddzt, //订单状态
				ddzt_config, //订单状态配置
				logGrid,
				logColumns,
				logConfig,
				start_dataTime, //开始时间
				end_dataTime, //结束时间
				end_dataTime_config, //日期选择配置
				start_dataTime_config; //日期选择配置
			var _CStartTime;
			var _CEndTime;
			var CStartTime_config;
			var CEndTime_config;

			//初始化
			$scope.init = function() {
				$scope.initDropdownlist(); //初始化下拉框
				$scope.initGrid(); // 初始化 grid
				$scope.project1 = {}; //初始化 
				$scope.initDatepicker(); // 初始化日期控件
			};

			//初始化下拉框
			$scope.initDropdownlist = function() {
				xdbd = uiService.createDropdownlist(xdbd_config);
				wljjfa = uiService.createDropdownlist(wljjfa_config);
				ddlx = uiService.createDropdownlist(ddlx_config);
				ddzt = uiService.createDropdownlist(ddzt_config);
			};

			//初始化日期控件
			$scope.initDatepicker = function() {
				start_dataTime = uiService.createDatepicker(start_dataTime_config);
				end_dataTime = uiService.createDatepicker(end_dataTime_config);

				_CStartTime = uiService.createDatepicker(CStartTime_config);
				_CEndTime = uiService.createDatepicker(CEndTime_config);
			};

			//初始化 grid
			$scope.initGrid = function() {
				grid = uiService.createGrid(columns, config);
			};

			//开始日期 配置
			start_dataTime_config = {
				divId: "start_dataTime", //日期控件id
			};

			//结束日期 配置
			end_dataTime_config = {
				divId: "end_dataTime", //日期控件id
			};

			//下单开始时间 配置
			CStartTime_config = {
				divId: "CStartTime", //日期控件id
			};

			//下单结束时间 配置
			CEndTime_config = {
				divId: "CEndTime", //日期控件id
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

			//DB下拉框配置
			xdbd_config = {
				divId: "xdbd", //下拉框id
				_id_multi_select: true,
				_url: utilService.JXGL_SERVICE_URL + "ExpenseRecord/GetBDList", //url
			};

			//物流解决方案
			wljjfa_config = {
				divId: "wljjfa", //下拉框id
				_id_multi_select: true,
				_url: utilService.JXGL_SERVICE_URL + "ExpenseRecord/GetLogisticsSolution", //url
			};

			//订单类型
			ddlx_config = {
				divId: "ddlx", //下拉框id
				_id_multi_select: true,
				_url: utilService.JXGL_SERVICE_URL + "ExpenseRecord/GetStockList", //url
			};

			//订单类型
			ddzt_config = {
				divId: "ddzt", //下拉框id
				_id_multi_select: true,
				_url: utilService.JXGL_SERVICE_URL + "ExpenseRecord/GetState", //url
			};

			//Grid 配置
			config = {
				dataSouce: utilService.JXGL_SERVICE_URL + "ExpenseRecord/GetList", //URL
				divId: "grid", //grid id
				sortable: true, // 排序
				pageable: true, //分页
				setBgColor: true, //背景色
				scrollable: true, //可滚动
				callback2: setColor //回调函数
			};

			//支付方式
			var zffs = [{
				text: "请选择",
				value: "-1"
			}, {
				text: "货到付款",
				value: "0"
			}, {
				text: "免单",
				value: "4"
			}, {
				text: "预存款",
				value: "3"
			}, {
				text: "预付款",
				value: "3"
			}, {
				text: "账期付款",
				value: "5"
			}, {
				text: "在线支付",
				value: "1"
			}];

			// 初始化是否接收下拉框
			$("#zffs").kendoDropDownList({
				dataTextField: "text",
				dataValueField: "value",
				dataSource: zffs
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

					var _osskey_fyjl = window.sessionStorage.getItem("_osskey_fyjl");
					if(_osskey_fyjl == null) {} else {
						sessionStorage.removeItem("_osskey_fyjl"); //移除
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
					var _osskey_fyjl = window.sessionStorage.getItem("_osskey_fyjl");
					if(null == _osskey_fyjl) {
						str.filepath = "";
						var _filepath = $("#file-list_1 .see_photo").attr("data-path");
						if(_filepath != null) {
							str.filepath = _filepath;
						}
					} else {
						_osskey_fyjl = JSON.parse(_osskey_fyjl);
						str.filepath = _osskey_fyjl[0].qcfilekey;
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

			//导出
			$scope.export = function(project) {

				//获取 ticket
				var ticket = utilService.TICKET;

				if(undefined == project) {
					project = {};
				} else {}

				hideMenu();
				$("#menuBtn1").html("请选择");

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
				
				//订单状态
				var ddztItemData = xdbd.getItems("ddzt");
				project.OrderState = ddztItemData;
				project.OrderState = project.OrderState.join(",");

				//补充信息
				var bcxx = $("#isRemark").data("kendoDropDownList").value();
				project.isRemark = bcxx;

				//所属部门
				var ssbmItemData = $("#multiSelect").attr("data-id");
				project.G_CName = ssbmItemData;

				//获取开始日期
				var startDataTime = start_dataTime.getDatatime("start_dataTime"); //获取

				if(startDataTime != "") {
					project.cptimestart = startDataTime;
				};

				//获取结束日期
				var endDataTime = end_dataTime.getDatatime("end_dataTime"); //获取

				if(endDataTime != "") {
					project.cptimeend = endDataTime;
				};

				//获取下单开始日期
				var CStartTime = _CStartTime.getDatatime("CStartTime"); //获取

				if(CStartTime != "") {
					project.CStartTime = CStartTime;
				};

				//获取下单结束日期
				var CEndTime = _CEndTime.getDatatime("CEndTime"); //获取

				if(CEndTime != "") {
					project.CEndTime = CEndTime;
				};

				//支付方式
				var _zffs = $("#zffs").data("kendoDropDownList").value();
				project.Payment = _zffs;

				//Nopay 
				var Nopay = $(".Nopay").attr("checked");

				if($(".Nopay").is(":checked")) { //选中  
					project.Nopay = true;
				} else {
					project.Nopay = false;
				}

				var query = JSON.stringify(project);

				//模拟from 提交 实现下载文件流
				var form = $("<form>");
				form.attr('style', 'display:none');
				form.attr('target', '');
				form.attr('method', 'post');
				form.attr('action', utilService.JXGL_SERVICE_URL + "ExpenseRecord/outExcel" + "?ticket=" + ticket + "&query=" + query);
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

				hideMenu();
				$("#menuBtn1").html("请选择");

				//下单BD
				var xdbdItemData = xdbd.getItems("xdbd");
				project.bdname = xdbdItemData;
				project.bdname = project.bdname.join(",");
				
				//订单状态
				var ddztItemData = xdbd.getItems("ddzt");
				project.OrderState = ddztItemData;
				project.OrderState = project.OrderState.join(",");

				//物流解决方案
				var wljjfaItemData = wljjfa.getItems("wljjfa");
				project.LogisticsSolution = wljjfaItemData;
				project.LogisticsSolution = project.LogisticsSolution.join(",");

				//订单类型
				var ddlxItemData = ddlx.getItems("ddlx");
				project.IsStock = ddlxItemData;
				project.IsStock = project.IsStock.join(",");

				//所属部门
				var ssbmItemData = $("#multiSelect").attr("data-id");
				project.G_CName = ssbmItemData;

				//补充信息
				var bcxx = $("#isRemark").data("kendoDropDownList").value();
				project.isRemark = bcxx;

				//支付方式
				var _zffs = $("#zffs").data("kendoDropDownList").value();
				project.Payment = _zffs;

				//获取开始日期
				var startDataTime = start_dataTime.getDatatime("start_dataTime"); //获取

				if(startDataTime != "") {
					project.cptimestart = startDataTime;
				};

				//获取结束日期
				var endDataTime = end_dataTime.getDatatime("end_dataTime"); //获取

				if(endDataTime != "") {
					project.cptimeend = endDataTime;
				};

				//获取下单开始日期
				var CStartTime = _CStartTime.getDatatime("CStartTime"); //获取

				if(CStartTime != "") {
					project.CStartTime = CStartTime;
				};

				//获取下单结束日期
				var CEndTime = _CEndTime.getDatatime("CEndTime"); //获取

				if(CEndTime != "") {
					project.CEndTime = CEndTime;
				};

				//Nopay 
				var Nopay = $(".Nopay").attr("checked");

				if($(".Nopay").is(":checked")) { //选中  
					project.Nopay = true;
				} else {
					project.Nopay = false;
				}

				grid.search(project); //搜索
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
					locked: false,
					sortable: false
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
					width: 120,
					sortable: false
				}, {
					field: "OrderName",
					title: "订单名称",
					width: 360,
					sortable: false
				}, {
					field: "yingshou",
					title: "应收-应付",
					width: 100,
					sortable: false
				}, {
					field: "Quantity",
					title: "数量",
					width: 80,
					sortable: false
				}, {
					field: "OrderMoneyYun",
					title: "订单金额+运费",
					width: 120
				}, {
					field: "RealityMoney",
					title: "已回款金额",
					width: 120,
					sortable: false
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
					width: 80,
					sortable: false
				}, {
					field: "Remark",
					title: "备注信息",
					width: 230,
					sortable: false
				}, {
					field: "filepath",
					title: "辅证",
					width: 80,
					template: "#= (filepath == '') ? a='': b='查看图片' #",
					attributes: {
						onclick: 'seePhoto(this)',
						style: "color:blue; text-align: left;height:5px;padding-left: 10px;text-decoration:underline",
						onmouseover: "this.style.cursor='pointer'"
					},
					sortable: false
				}, {
					field: "IsStock",
					title: "订单类型",
					width: 80,
					sortable: false
				}, {
					field: "CreateTime",
					title: "下单时间",
					width: 130,
					sortable: false
				}, {
					field: "File_Time",
					title: "文件检查合格时间",
					width: 130,
					sortable: false
				}, {
					field: "gysjdtime",
					title: "供应商接单时间",
					width: 130,
					sortable: false
				}, {
					field: "Cptime",
					title: "标记回全款时间",
					width: 130,
					sortable: false
				}, {
					field: "Payment",
					title: "支付方式",
					width: 80,
					sortable: false
				}, {
					field: "PayState",
					title: "支付状态",
					width: 80,
					sortable: false
				}, {
					field: "orderState",
					title: "订单状态",
					width: 80,
					sortable: false
				}, {
					field: "LogisticsSolution",
					title: "物流解决方案",
					width: 120,
					sortable: false
				}, {
					field: "Creator",
					title: "下单人姓名",
					width: 80,
					sortable: false
				}, {
					field: "CreatorDep",
					title: "下单人部门",
					width: 120,
					sortable: false
				}, {
					field: "bdname",
					title: "下单BD",
					width: 80,
					sortable: false
				}, {
					field: "bddep2",
					title: "下单BD部门",
					width: 120,
					sortable: false
				}, {
					field: "filecreator",
					title: "文件上传人",
					width: 80,
					sortable: false
				}, {
					field: "wfCreator",
					title: "外发人",
					width: 80,
					sortable: false
				}, {
					field: "providername",
					title: "供应商",
					width: 230,
					sortable: false
				}, {
					field: "ChengPrintRealMoney",
					title: "已付费用",
					width: 80,
					sortable: false
				}, {
					field: "CompanyName",
					title: "公司名称",
					width: 200,
					sortable: false
				}, {
					field: "UserName",
					title: "用户账号",
					width: 160,
					sortable: false
				}, {
					field: "utype",
					title: "客户类型",
					width: 160,
					sortable: false
				}, {
					field: "delayPay",
					title: "账期时间",
					width: 180,
					sortable: false
				}, {
					field: "G_CName1",
					title: "一级部门",
					width: 120,
					sortable: false
				}, {
					field: "G_CName",
					title: "客户所属部门",
					width: 130,
					sortable: false
				}, {
					field: "JXLX",
					title: "提成类型",
					width: 80,
					sortable: false
				}, {
					field: "Lastdate",
					title: "到期时间",
					width: 130,
					sortable: false
				}, {
					field: "Maoli",
					title: "毛利",
					width: 80,
					sortable: false
				}, {
					field: "Hesuan",
					title: "核算账期",
					template: "#= (Hesuan +'%') #", //对数据进行逻辑操作                             
					width: 80,
					sortable: false
				}, {
					field: "ZongTich",
					title: "总提成",
					width: 80,
					sortable: false
				}
				//			, {
				//				field: "BdTicheng",
				//				title: "bd提成1/3",
				//				width: 80,
				//				sortable: false
				//			}, {
				//				field: "BdBm",
				//				title: "bd部门提成1/6",
				//				width: 120,
				//				sortable: false
				//			}, {
				//				field: "BdChiZi",
				//				title: "bd费用池子1/6",
				//				width: 120,
				//				sortable: false
				//			}, {
				//				field: "PM",
				//				title: "PM1/6",
				//				width: 80,
				//				sortable: false
				//			}, {
				//				field: "GongYil",
				//				title: "供应链1/6",
				//				width: 80,
				//				sortable: false
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
						left: cityOffset.left + "px",
						//top: cityOffset.top + cityObj.outerHeight() + "px"
					}).slideDown("fast");

					//$("body").bind("mousedown", onBodyDown);

					$("#menuBtn1").html("关闭");

				} else {
					hideMenu();
					$("#menuBtn1").html("请选择");
				};

			});

			//清空
			$("#menuBtn2").click(function() {
				$("#multiSelect").attr("value", "");

				//				var zTree1 = $.fn.zTree.getZTreeObj("multiSelectTree");
				//				var nodes1 = zTree1.getCheckedNodes(true);

				var treeObj = $.fn.zTree.getZTreeObj("multiSelectTree");
				treeObj.checkAllNodes(false);

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

			$.ajax({
				type: "get",
				url: utilService.JXGL_SERVICE_URL + "ExpenseRecord/GetDepList",
				dataType: 'json',
				success: function(data) {
					$.fn.zTree.init($("#multiSelectTree"), setting, data);
				}
			});

		}
	]);
})();