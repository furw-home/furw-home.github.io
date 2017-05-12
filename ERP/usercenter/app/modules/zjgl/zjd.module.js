(function() {
	/**
	 * 作者: furw
	 * 描述: 质检单 module
	 */
	var zjdModule = angular.module('zjdModule', ['mainModule']);

	/**
	 * 作者: furw
	 * 描述: 质检单 控制器
	 */
	zjdModule.controller('zjdCtrl', ['$scope', 'utilService', 'uiService',
		function($scope, utilService, uiService) {

			var qualityCheckLevel, // 质检级别下拉
				state_sel_project, // 选择项目下拉
				qualityCheckSamplinglevel, //抽检水平下拉
				qualityCheckLevel_config, //质检级别下拉配置
				qualityCheckSamplinglevel_config, //抽检水平下拉配置
				templateList, //质检模版下拉
				$itemStandard,
				$itemName,
				$id,
				$itemCode,
				$SortNo,
				dataItem,
				zjTime, //日期选择
				zjTime_config, //日期选择配置
				save_project = [],
				_window;
			var _version;

			//获取缓存数据
			_qualityItem = sessionStorage.getItem("zjpt_dzj_order_dataVersion");
			_qualityItem = JSON.parse(_qualityItem);
			_version = _qualityItem[0].OrderDataVersion;

			//初始化
			$scope.init = function() {
				//质检项
				$scope.initDropdownlist(); //初始化下拉框
				$scope.initDatepicker(); // 初始化日期控件

				//根据id 获取质检单信息
				$.ajax({
					type: 'GET',
					url: utilService.ZJGL_SERVICE_URL + "QualityUnCheckOrder/GetQCInfoByOrderCode?id=" + url_parame + "&version=" + _version,
					dataType: 'json',
					contentType: "application/json",
					success: function(data) {
						
						zjTime.setDatetime("zj_Time", data.data.QualityTime); //设置时间
						
						//质检级别
						qualityCheckLevel.setText("qualityCheckLevel", data.data.QualityLevelName); //设置质检级别
						//$("#qualityCheckLevel").attr("value", data.data.QualityLevel);
						
						$scope.project = {
							ordercode: data.data.OrderCode, //订单号
							qualityamount: data.data.QualityAmount, //质检数量
							remark: data.data.Remark, //备注
							supplier: data.data.Supplier, //供应商
							order_info: data.data.OrderInfo, //订单详情
							qcperson: data.data.QCPerson, //质检员
						};
						CheckScopeBeforeApply();
					}

				}); //结束
			};

			//刷新dom
			function CheckScopeBeforeApply() {
				if(!$scope.$$phase) {
					$scope.$apply();
				}
			};

			//获取URL参数 判断来自那一个页面
			var url_parame = window.location.search;
			url_parame = url_parame.substr(url_parame.lastIndexOf("="));
			url_parame = url_parame.substr(1);

			//附件数组
			var osskey = window.sessionStorage.getItem("osskey");
			if(osskey == null) {} else {
				sessionStorage.removeItem("osskey"); //移除
			};

			//上传文件的  原始名称 及 key
			var _osskey = window.sessionStorage.getItem("_osskey");
			if(_osskey == null) {} else {
				sessionStorage.removeItem("_osskey"); //移除
			};

			//初始化日期控件
			$scope.initDatepicker = function() {
				zjTime = uiService.createDatepicker(zjTime_config);
			};

			//质检级别下拉配置
			$scope.initDropdownlist = function() {
				qualityCheckLevel = uiService.createDropdownlist(qualityCheckLevel_config);
				qualityCheckSamplinglevel = uiService.createDropdownlist(qualityCheckSamplinglevel_config);
			};

			//质检级别下拉 配置
			qualityCheckLevel_config = {
				divId: "qualityCheckLevel", //下拉框id
				_pm: "QualityCheckLevel", //参数
				_isAddAll: false, //是否拼接全部节点
				_url: utilService.ZJGL_SERVICE_URL + "Base/GetDropDownListByFlag", //URL
			};

			//抽检水平下拉配置
			qualityCheckSamplinglevel_config = {
				divId: "qualityCheckSamplinglevel", //下拉框id
				_pm: "QualityCheckSamplinglevel", //参数
				_isAddAll: false, //是否拼接全部节点
				_url: utilService.ZJGL_SERVICE_URL + "Base/GetDropDownListByFlag", //URL
			};

			//日期 配置
			zjTime_config = {
				divId: "zj_Time" //日期id
			};

			//设置是否接收下拉框数据
			var isReceive = [{
				text: "是",
				value: "1"
			}, {
				text: "否",
				value: "0"
			}];

			// 初始化是否接收下拉框
			$("#state_sfjs").kendoDropDownList({
				dataTextField: "text",
				dataValueField: "value",
				dataSource: isReceive
			});

			//设置实际情况下拉框数据
			var physicalTruth = [{
				text: "合格",
				value: "1"
			}, {
				text: "不合格",
				value: "0"
			}];

			//选择项目下拉列表
			var _data = {};
			_data = JSON.stringify(_data);
			$.ajax({
				type: 'POST',
				url: utilService.ZJGL_SERVICE_URL + "QualityItem/GetDropdownItems",
				data: _data,
				dataType: 'json',
				contentType: "application/json",
				success: function(data) {
					var item_data = {
						ItemName: "请选择",
						ItemCode: "-1"
					};
					data.data.push(item_data);
					state_sel_project = $("#state_sel_project").kendoDropDownList({ //初始化
						dataTextField: "ItemName",
						dataValueField: "ItemCode",
						dataSource: data,
						index: -1,
						select: function(e) {
							dataItem = this.dataItem(e.item.index());
							$itemStandard = dataItem.ItemStandard;
							$itemName = dataItem.ItemName;
							$id = dataItem.Id;
							$itemCode = dataItem.ItemCode;
							$SortNo = dataItem.SortNo;
						}
					}).data("kendoDropDownList");
				}
			}); //结束

			//获取质检模版下拉
			$.ajax({
				type: 'GET',
				url: utilService.ZJGL_SERVICE_URL + "QualityTemplate/GetTemplateList",
				dataType: 'json',
				async: false,
				contentType: "application/json",
				success: function(data) {

					//					if(data.status == 0) {} else {
					templateList = $("#templateList").kendoDropDownList({ //初始化
						dataTextField: "TemplateName",
						dataValueField: "Id",
						dataSource: data
					}).data("kendoDropDownList");

					var _dropdownlist = $("#templateList").data("kendoDropDownList");
					_dropdownlist.bind("change", dropdownlist_select);
					//					}

				}
			}); //结束

			var templateList_value = $("#templateList").data("kendoDropDownList").value();

			$.ajax({
				type: 'GET',
				url: utilService.ZJGL_SERVICE_URL + "QualityTemplate/QueryById?id=" + templateList_value,
				dataType: 'json',
				contentType: "application/json",
				success: function(data) {
					//清空质检项
					$("#zjxm_body").html("");

					for(var i = 0; i < data.data.Items.length; i++) {
						$("#zjxm_body").append(
							'<ul data-itemStandard=' + data.data.Items[i].ItemStandard + ' data-itemName=' + data.data.Items[i].ItemName + ' data-id=' + data.data.Items[i].Id + ' data-itemCode=' + data.data.Items[i].ItemCode + ' data-sortNo=' + data.data.Items[i].SortNo + '>' +
							'<li>' + data.data.Items[i].ItemName + '</li>' +
							'<li style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title=' + data.data.Items[i].ItemStandard + '>' + data.data.Items[i].ItemStandard + '</li>' +
							'<li><input class="zjxm_qualified" value="1" style="width: 120px;" /></li>' +
							'<li><input type="text" class="k-textbox wtsl" style="width: 128px;border: none;text-align: center;height: 35px;"/></li>' +
							'<li><input type="text" class="k-textbox bz" style="width: 128px;border: none;text-align: center;height: 35px;"/></li>' +
							'<li class="font20 nobr cursor zjxm_remove"><button class="btn btn-danger">- 移除</button></li>' +
							'</ul>'
						);

						$(".zjxm_remove").click(function() {
							$(this).parent().remove();
						});

					};

					// 初始化实际情况下拉框
					$(".zjxm_qualified").kendoDropDownList({
						dataTextField: "text",
						dataValueField: "value",
						dataSource: physicalTruth,
						index: 1,
						change: function(e) {
							isreceive_state(); //改变是否接收状态
						}
					});

				}
			}); //结束

			//下拉框单机事件
			function dropdownlist_select(e) {
				var value = this.value();
				//根据id获取
				$.ajax({
					type: 'GET',
					url: utilService.ZJGL_SERVICE_URL + "QualityTemplate/QueryById?id=" + value,
					dataType: 'json',
					contentType: "application/json",
					success: function(data) {

						//清空质检项
						$("#zjxm_body").html("");

						for(var i = 0; i < data.data.Items.length; i++) {
							$("#zjxm_body").append(
								'<ul data-itemStandard=' + data.data.Items[i].ItemStandard + ' data-itemName=' + data.data.Items[i].ItemName + ' data-id=' + data.data.Items[i].Id + ' data-itemCode=' + data.data.Items[i].ItemCode + ' data-sortNo=' + data.data.Items[i].SortNo + '>' +
								'<li>' + data.data.Items[i].ItemName + '</li>' +
								'<li style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title=' + data.data.Items[i].ItemStandard + '>' + data.data.Items[i].ItemStandard + '</li>' +
								'<li><input class="zjxm_qualified" value="1" style="width: 120px;" /></li>' +
								'<li><input type="text" class="k-textbox wtsl" style="width: 128px;border: none;text-align: center;height: 35px;"/></li>' +
								'<li><input type="text" class="k-textbox bz" style="width: 128px;border: none;text-align: center;height: 35px;"/></li>' +
								'<li class="font20 nobr cursor zjxm_remove"><button class="btn btn-danger">- 移除</button></li>' +
								'</ul>'
							);

							$(".zjxm_remove").click(function() {
								$(this).parent().remove();
							});

						};

						// 初始化实际情况下拉框
						$(".zjxm_qualified").kendoDropDownList({
							dataTextField: "text",
							dataValueField: "value",
							dataSource: physicalTruth,
							index: 1,
							change: function(e) {
								isreceive_state(); //改变是否接收状态
							}
						});

					}
				}); //结束

			};

			$("#upload-btn").Pluploader({
				vmodulename: "qa_files",
				vbrowse_button: "browse"
			}, function(res) {
				uploaded(res);
			});

			$("#upload-btn-1").Pluploader_1({
				vmodulename: "qa_files",
				vbrowse_button: "browse_1"
			}, function(res) {
				uploaded(res);
			});

			//清除所有附件按钮
			$("#remove_accessory").click(function() {
				$("#file-list").html("");
			});

			function uploaded(res) {
				$('#file-list').val(res.osskey); // osskey 文件存储路径 可用于文件下载使用 需要保存并上传回服务器
			};

			$("#zjxm_add").click(function() {
				//配置 window config
				var window_config;
				window_config = {
					divId: "window",
					width: "400px",
					height: "101px",
					title: "质检单/ 增加项目",
					onClose: onClose,
				};

				//生成window
				_window = uiService.window(window_config);

				//监听关闭事件
				function onClose(e) {
					var breadcrumb = window.parent.document.getElementById("breadcrumb");
					breadcrumb.setAttribute("style", "border-bottom: 1px solid #ddd;");
				};

				//新增质检项
				$scope.confirm = function() {

					if(($itemName == "请选择") || ($itemName == undefined)) {
						alert("请选择项目！");
					} else {
						$("#zjxm_body").append(
							'<ul data-itemStandard=' + $itemStandard + ' data-itemName=' + $itemName + ' data-id=' + $id + ' data-itemCode=' + $itemCode + ' data-sortNo=' + $SortNo + '>' +
							'<li>' + $itemName + '</li>' +
							'<li style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + $itemStandard + '</li>' +
							'<li><input class="zjxm_qualified" value="1" style="width: 120px;" /></li>' +
							'<li><input type="text" class="k-textbox wtsl" style="width: 128px;border: none;text-align: center;height: 35px;"/></li>' +
							'<li><input type="text" class="k-textbox bz" style="width: 128px;border: none;text-align: center;height: 35px;"/></li>' +
							'<li class="font20 nobr cursor zjxm_remove"><button class="btn btn-danger">- 移除</button</li>' +
							'</ul>'
						);

						var _leh = $("#zjxm_body ul").length;
						_leh = _leh - 1;

						$(".zjxm_remove").click(function() {
							$(this).parent().remove();
						});

						// 初始化实际情况下拉框
						$("#zjxm_body ul").eq(_leh).find(".zjxm_qualified").kendoDropDownList({
							dataTextField: "text",
							dataValueField: "value",
							dataSource: physicalTruth,
							change: function(e) {
								isreceive_state(); //改变是否接收状态
							}
						});

						isreceive_state(); //改变是否接收状态

						_window.close();
					}

				};

			});

			//改变是否接收状态
			function isreceive_state() {
				var _isreceive;
				for(var i1 = 0; i1 < $("#zjxm_body ul").length; i1++) {
					var isqualified1 = $("#zjxm_body ul").eq(i1).find(".zjxm_qualified .k-input").html();
					if(isqualified1 == "合格") {
						_isreceive = true;
						break;
					} else {
						_isreceive = false;
					}
				}
				if(_isreceive) {
					$("#state_sfjs").data("kendoDropDownList").text("是");
				} else {
					$("#state_sfjs").data("kendoDropDownList").text("否");
				}
			}

			//质检完成
			$scope.save = function(project) {

				//循环质检项，将质检项添加到 Array
				for(var i = 0; i < $("#zjxm_body ul").length; i++) {
					var str = {};
					var id = $("#zjxm_body ul").eq(i).attr("data-id"); //质检项id
					var itemName = $("#zjxm_body ul").eq(i).attr("data-itemName"); //质检项名称
					var itemCode = $("#zjxm_body ul").eq(i).attr("data-itemCode"); //质检项编码
					var itemStandard = $("#zjxm_body ul").eq(i).attr("data-itemStandard"); //质检项标准
					var wtsl = $("#zjxm_body ul").eq(i).find(".wtsl").val(); //问题数量
					var bz = $("#zjxm_body ul").eq(i).find(".bz").val(); //项目备注
					var isqualified = $("#zjxm_body ul").eq(i).find(".zjxm_qualified .k-input").html();

					if(isqualified == "合格") {
						str.isqualified = true;
					} else {
						str.isqualified = false;
					}

					str.itemname = itemName;
					str.id = id;
					str.itemcode = itemCode;
					str.remark = bz;
					str.itemstandard = itemStandard;
					str.problemAmount = wtsl;
					save_project.push(str);
				}

				//附件数组
				var osskey = window.sessionStorage.getItem("osskey");
				if(osskey == null) {

				} else {
					osskey = JSON.parse(osskey);
					project.attachments = osskey;
				}

				//上传文件的  原始名称 及 key
				var _osskey = window.sessionStorage.getItem("_osskey");
				if(_osskey == null) {

				} else {
					_osskey = JSON.parse(_osskey);
					project.qcfilekey = _osskey[0].qcfilekey;
					project.qcfilename = _osskey[0].qcfilename;
				}

				//模版id
				var templateid = $("#templateList").data("kendoDropDownList").value();
				project.templateid = templateid;

				//是否接收
				var isrecieve = $("#state_sfjs").data("kendoDropDownList").value();
				if(isrecieve == 1) {
					project.isrecieve = true;
				} else {
					project.isrecieve = false;
				};

				//抽检水平
				var samplinglevel = qualityCheckSamplinglevel.getValue("qualityCheckSamplinglevel");
				project.samplingLevel = parseInt(samplinglevel);

				//质检级别
				var _qualitylevel = qualityCheckLevel.getValue("qualityCheckLevel");
				project.QualityLevel = parseInt(_qualitylevel);

				project.items = save_project; //质检项数组
				project.qc_time = $("#zj_Time").val(); //质检时间
				project.isfinish = true; //质检状态
				project.orderdataversion = _version; //数据版本号
				project = JSON.stringify(project);

				//生成质检单
				$.ajax({
					type: 'POST',
					url: utilService.ZJGL_SERVICE_URL + "QualityUnCheckOrder/QualityCheck",
					data: project,
					dataType: 'json',
					contentType: "application/json",
					success: function(data) {
						if(data.status == 1) {
							window.location.href = utilService.ADDRESS + '/zjgl/djclb.html';
						} else {
							alert(data.msg);
						}
					}
				}); //结束
			};

			//暂存
			$scope.zc = function(project) {

				//循环质检项，将质检项添加到 Array
				for(var i = 0; i < $("#zjxm_body ul").length; i++) {
					var str = {};
					var id = $("#zjxm_body ul").eq(i).attr("data-id"); //质检项id
					var itemName = $("#zjxm_body ul").eq(i).attr("data-itemName"); //质检项名称
					var itemCode = $("#zjxm_body ul").eq(i).attr("data-itemCode"); //质检项编码
					var itemStandard = $("#zjxm_body ul").eq(i).attr("data-itemStandard"); //质检项标准
					var wtsl = $("#zjxm_body ul").eq(i).find(".wtsl").val(); //问题数量
					var bz = $("#zjxm_body ul").eq(i).find(".bz").val(); //项目备注
					var isqualified = $("#zjxm_body ul").eq(i).find(".zjxm_qualified .k-input").html();

					if(isqualified == "合格") {
						str.isqualified = true;
					} else {
						str.isqualified = false;
					}

					str.itemname = itemName;
					str.id = id;
					str.itemcode = itemCode;
					str.remark = bz;
					str.itemstandard = itemStandard;
					str.problemAmount = wtsl;
					save_project.push(str);
				}

				//附件数组
				var osskey = window.sessionStorage.getItem("osskey");
				if(osskey == null) {

				} else {
					osskey = JSON.parse(osskey);
					project.attachments = osskey;
				}

				//上传文件的  原始名称 及 key
				var _osskey = window.sessionStorage.getItem("_osskey");
				if(_osskey == null) {

				} else {
					_osskey = JSON.parse(_osskey);
					project.qcfilekey = _osskey[0].qcfilekey;
					project.qcfilename = _osskey[0].qcfilename;
				}

				//模版id
				var templateid = $("#templateList").data("kendoDropDownList").value();
				project.templateid = templateid;

				//是否接收
				var isrecieve = $("#state_sfjs").data("kendoDropDownList").value();
				if(isrecieve == 1) {
					project.isrecieve = true;
				} else {
					project.isrecieve = false;
				};

				//抽检水平
				var samplinglevel = qualityCheckSamplinglevel.getValue("qualityCheckSamplinglevel");
				project.samplingLevel = parseInt(samplinglevel);

				//质检级别
				var _qualitylevel = qualityCheckLevel.getValue("qualityCheckLevel");
				project.QualityLevel = parseInt(_qualitylevel);

				project.items = save_project; //质检项数组
				project.qc_time = $("#zj_Time").val(); //质检时间
				project.isfinish = false //质检状态 为暂存
				project.orderdataversion = _version; //数据版本号

				project = JSON.stringify(project);

				//生成质检单
				$.ajax({
					type: 'POST',
					url: utilService.ZJGL_SERVICE_URL + "QualityUnCheckOrder/QualityCheck",
					data: project,
					dataType: 'json',
					contentType: "application/json",
					success: function(data) {
						if(data.status == 1) {
							window.location.href = utilService.ADDRESS + '/zjgl/djclb.html';
						} else {
							alert(data.msg);
						}
					}
				}); //结束
			};

			//返回
			$scope.fh = function() {
				//				removeTab();
				window.location.href = utilService.ADDRESS + '/zjgl/djclb.html';
			}

		}
	]);
})();