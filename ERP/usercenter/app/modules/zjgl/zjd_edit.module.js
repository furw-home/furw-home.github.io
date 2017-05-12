(function() {
	/**
	 * 作者: furw
	 * 描述: 质检单 module
	 */
	var zjd_editModule = angular.module('zjd_editModule', ['mainModule']);

	/**
	 * 作者: furw
	 * 描述: 质检单 控制器
	 */
	zjd_editModule.controller('zjd_editCtrl', ['$scope', 'utilService', 'uiService',
		function($scope, utilService, uiService) {

			var qualityCheckLevel, // 质检级别下拉
				state_sel_project, // 选择项目下拉
				templateList, //质检模版下拉
				qualityCheckSamplinglevel, //抽检水平下拉
				qualityCheckLevel_config, //质检级别下拉配置
				qualityCheckSamplinglevel_config, //质检抽检水平下拉配置
				$itemStandard,
				$itemName,
				$id,
				$itemCode,
				$SortNo,
				dataItem,
				save_project = [],
				zjTime, //日期选择
				zjTime_config, //日期选择配置
				_window; //window 窗口

			//刷新dom
			function CheckScopeBeforeApply() {
				if(!$scope.$$phase) {
					$scope.$apply();
				}
			};

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

			var _status; //请求状态（判断是 复检, 还是质检）

			var zj_Id; //质检id
			var zj_QCode; //质检单号

			var _qualityItem;
			var _url; //获取订单信息请求地址 请求地址
			var _url_edit_save; //编辑保存请求地址
			var _parameter; //请求参数1
			var _version; //请求参数2

			//获取URL参数 判断来自那一个页面
			var url_parame = window.location.search;
			url_parame = url_parame.substr(url_parame.lastIndexOf("="));
			url_parame = url_parame.substr(1);

			if(url_parame == "dzjlb") { //带检查列表页面

				//获取缓存数据
				_qualityItem = sessionStorage.getItem("zjpt_dzj_order_info_edit");
				_qualityItem = JSON.parse(_qualityItem);

				_parameter = _qualityItem[0].OrderCode;
				_version = _qualityItem[0].OrderDataVersion;
				_url = "QualityUnCheckOrder/GetQCInfoByOrderCode";
				_url_edit_save = "QualityUnCheckOrder/QualityCheck";
				_status = 1;
				$("#templateList").attr("disabled", "disabled");

			} else if(url_parame == "zjdlb") { //质检单列表页面

				//获取缓存数据
				_qualityItem = sessionStorage.getItem("zjpt_zjd_zjd_info_edit");
				_qualityItem = JSON.parse(_qualityItem);

				_parameter = _qualityItem[0].Id;
				_version = _qualityItem[0].OrderDataVersion;
				_url = "QualityUnCheckOrder/GetQcInfoById";
				_url_edit_save = "QualityUnCheckOrder/QualityCheck";
				_status = 1;
				$("#templateList").attr("disabled", "disabled");

			} else { //已质检列表页面

				//获取缓存数据
				_qualityItem = sessionStorage.getItem("zjpt_yzj_zjd_info_edit");
				_qualityItem = JSON.parse(_qualityItem);

				_parameter = _qualityItem[0].Id;
				_version = _qualityItem[0].OrderDataVersion;
				_url = "QualityCheck/ReCheck";
				//				_url_edit_save = "QualityCheck/ReCheck?id=" + _parameter;
				_url_edit_save = "QualityUnCheckOrder/QualityCheck";
				_status = 2;

				$("#qualitylevel").attr("disabled", "disabled");

			};

			//初始化
			$scope.init = function() {
				$scope.initDropdownlist(); //初始化下拉框
				$scope.initDatepicker(); //初始化日期
				$scope.project = {};
				$scope.zjReturn();
			};

			//初始化日期控件
			$scope.initDatepicker = function() {
				zjTime = uiService.createDatepicker(zjTime_config);
			};

			//日期 配置
			zjTime_config = {
				divId: "zj_Time", //日期id
			};

			//质检级别下拉配置
			$scope.initDropdownlist = function() {
				qualityCheckLevel = uiService.createDropdownlist(qualityCheckLevel_config);
				qualityCheckSamplinglevel = uiService.createDropdownlist(qualityCheckSamplinglevel_config);
			};

			//质检级别下拉 配置
			qualityCheckLevel_config = {
				divId: "qualitylevel", //下拉框id
				_pm: "QualityCheckLevel", //参数
				_isAddAll: false, //是否拼接全部节点
				_url: utilService.ZJGL_SERVICE_URL + "Base/GetDropDownListByFlag", //URL
			};

			//抽检水平下拉 配置
			qualityCheckSamplinglevel_config = {
				divId: "qualityCheckSamplinglevel", //下拉框id
				_pm: "QualityCheckSamplinglevel", //参数
				_isAddAll: false, //是否拼接全部节点
				_url: utilService.ZJGL_SERVICE_URL + "Base/GetDropDownListByFlag", //URL
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
			var receive = $("#state_sfjs").kendoDropDownList({
				dataTextField: "text",
				dataValueField: "value",
				dataSource: isReceive
			});

			//获取质检单信息 & 订单信息
			$scope.zjReturn = function() {

				$.ajax({
					type: 'GET',
					url: utilService.ZJGL_SERVICE_URL + _url + "?id=" + _parameter + "&version=" + _version,
					dataType: 'json',
					async: false,
					contentType: "application/json",
					success: function(data) {

						zj_Id = data.data.Id; //质检单id
						zj_QCode = data.data.QCode; //质检单号

						//绑定数据到页面
						$scope.project = {
							qcode: data.data.QCode, //质检单号
							order_info: data.data.OrderInfo, //订单信息
							ordercode: data.data.OrderCode, //订单号
							qualityamount: data.data.QualityAmount, //质检数量
							remark: data.data.Remark, //备注
							supplier: data.data.Supplier, //供应商
							qcperson: data.data.QCPerson, //质检员
							leaderSign: data.data.LeaderSign, //主管签字
							reservedAmount: data.data.ReservedAmount //留样数量
						};

						if(null == data.data.QCode) {
							$scope.project.qcode = "自动生成";
						}

						//设置时间
						$("#zj_Time").val(data.data.QualityTime);
						//设置模版
						$("#templateList").attr("value", data.data.TemplateId);
						//质检级别
						$("#qualitylevel").attr("value", data.data.QualityLevel);
						//抽检水平
						$("#SamplingLevel").attr("value", data.data.SamplingLevel);
						//是否接收
						var _IsRecieve;
						if(data.data.IsRecieve) {
							_IsRecieve = 1;
						} else {
							_IsRecieve = 0;
						};

						$("#state_sfjs").attr("value", _IsRecieve);

						//质检项
						var dataItem = data.data.Items;

						for(var j = 0; j < dataItem.length; j++) {

							//实际情况
							var IsQualified;
							if(dataItem[j].IsQualified) {
								IsQualified = 1;
							} else {
								IsQualified = 0;
							};

							//非空处理
							var remark_;
							if(dataItem[j].Remark == null) {
								remark_ = "''";
							} else {
								remark_ = dataItem[j].Remark;
							};

							$("#zjxm_body").append(
								'<ul data-itemStandard=' + dataItem[j].ItemStandard + ' data-itemName=' + dataItem[j].ItemName + ' data-id=' + dataItem[j].Id + ' data-itemCode=' + dataItem[j].ItemCode + '>' +
								'<li>' + dataItem[j].ItemName + '</li>' +
								'<li style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title=' + dataItem[j].ItemStandard + '>' + dataItem[j].ItemStandard + '</li>' +
								'<li><input class="zjxm_qualified" value=' + IsQualified + ' style="width: 120px;" /></li>' +
								'<li><input type="text" value=' + dataItem[j].ProblemAmount + ' class="k-textbox wtsl" style="width: 128px;border: none;text-align: center;height: 35px;"/></li>' +
								'<li><input type="text" value=' + remark_ + ' class="k-textbox bz" style="width: 128px;border: none;text-align: center;height: 35px;"/></li>' +
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

						//质检表附件
						var qcFileKey = data.data.QcFileKey;
						var qcFileName = data.data.QcFileName;

						if(qcFileName == null) {
							$("#file-list-3").html("");
						} else {
							$("#file-list-3").append('<p data-osskey=' + qcFileKey + ' data-ossname=' + qcFileName + '><a title=' + qcFileName + ' target="_blank" href="http://filed.98ep.com/' + qcFileKey + '">' + qcFileName + '</a><span class="glyphicon glyphicon-remove remove_1" style="color: #BE0004;margin-left:10px; cursor: pointer"></span></p>');
						};

						//附件
						var attachments = data.data.Attachments;
						var str = "";
						for(var o = 0; o < attachments.length; o++) {

							$("#file-list-2").append(
								'<p data-osskey=' + attachments[o].QCFileKey + ' data-ossname=' + attachments[o].QCFileName + '><a title=' + qcFileName + ' target="_blank" href="http://filed.98ep.com/' + attachments[o].QCFileKey + '">' + attachments[o].QCFileName + '</a><span class="glyphicon glyphicon-remove"></span> </p>'
							);
						};

						$(".glyphicon-remove").click(function() {
							$(this).parent().remove();
						});

						CheckScopeBeforeApply();
					}
				}); //结束

			};

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
				contentType: "application/json",
				success: function(data) {
					templateList = $("#templateList").kendoDropDownList({ //初始化
						dataTextField: "TemplateName",
						dataValueField: "Id",
						dataSource: data
					}).data("kendoDropDownList");

					var _dropdownlist = $("#templateList").data("kendoDropDownList");
					_dropdownlist.bind("change", dropdownlist_select);
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

			//设置实际情况下拉框数据
			var physicalTruth = [{
				text: "合格",
				value: "1"
			}, {
				text: "不合格",
				value: "0"
			}];

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
				$("#file-list-2").html("");
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

				$scope.confirm = function() {

					$("#zjxm_body").append(
						'<ul data-itemStandard=' + $itemStandard + ' data-itemName=' + $itemName + ' data-id=' + $id + ' data-itemCode=' + $itemCode + ' data-sortNo=' + $SortNo + '>' +
						'<li>' + $itemName + '</li>' +
						'<li style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title=' + $itemStandard + '>' + $itemStandard + '</li>' +
						'<li><input class="zjxm_qualified" value="1" style="width: 120px;" /></li>' +
						'<li><input type="text" class="k-textbox wtsl" style="width: 128px;border: none;text-align: center;height: 35px;"/></li>' +
						'<li><input type="text" class="k-textbox bz" style="width: 128px;border: none;text-align: center;height: 35px;"/></li>' +
						'<li class="font20 nobr cursor zjxm_remove"><button class="btn btn-danger">- 移除</button></li>' +
						'</ul>'
					);

					$(".zjxm_remove").click(function() {
						$(this).parent().remove();
					});

					var _leh = $("#zjxm_body ul").length;
					_leh = _leh - 1;

					// 初始化实际情况下拉框
					$("#zjxm_body ul").eq(_leh).find(".zjxm_qualified").kendoDropDownList({
						dataTextField: "text",
						dataValueField: "value",
						dataSource: physicalTruth,
						change: function(e) {
							isreceive_state(); //改变是否接收状态
						}
					}).data("kendoDropDownList");

					isreceive_state(); //改变是否接收状态

					_window.close();
				}
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

			//导出
			$scope.export = function() {

				//获取 ticket
				var ticket = utilService.TICKET;

				if(null == zj_QCode) {
					uiService.alert("质检单号为空,当前质检单不支持导出");
				} else {
					//模拟from 提交 实现下载文件流
					var form = $("<form>");
					form.attr('style', 'display:none');
					form.attr('target', '');
					form.attr('method', 'post');
					form.attr('action', utilService.ZJGL_SERVICE_URL + '/QualityCheck/ExportSingleQCSheet/' + zj_Id + "?ticket=" + ticket);
					$('body').append(form);
					form.submit();
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
					var attachments = [];
					//已经上传的文件列表
					for(var i = 0; i < $("#file-list-2 p").length; i++) {
						var _items = {};
						_items.qcfilekey = $("#file-list-2 p").eq(i).attr("data-osskey");
						_items.qcfilename = $("#file-list-2 p").eq(i).attr("data-ossname");
						attachments.push(_items);
					}
					project.attachments = attachments;
				} else {
					osskey = JSON.parse(osskey);
					//已经上传的文件列表
					for(var i = 0; i < $("#file-list-2 p").length; i++) {
						var _items = {};
						_items.qcfilekey = $("#file-list-2 p").eq(i).attr("data-osskey");
						_items.qcfilename = $("#file-list-2 p").eq(i).attr("data-ossname");
						osskey.push(_items);
					}
					project.attachments = osskey;
				}

				//上传文件的  原始名称 及 key
				var _osskey = window.sessionStorage.getItem("_osskey");

				if(_osskey == null) {
					//获取已经上传的文件
					_osskey = JSON.parse(_osskey);
					project.qcfilekey = $("#file-list-3 p").attr("data-osskey");
					project.qcfilename = $("#file-list-3 p").attr("data-ossname");
				} else {
					_osskey = JSON.parse(_osskey);
					project.qcfilekey = _osskey[0].qcfilekey;
					project.qcfilename = _osskey[0].qcfilename;
				};

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
				var _qualitylevel = qualityCheckLevel.getValue("qualitylevel");
				project.QualityLevel = parseInt(_qualitylevel);

				if(_status == 2) {} else {
					project.id = zj_Id; //质检单id
				}

				project.items = save_project; //质检项数组
				project.qcode = zj_QCode; //质检单号
				project.qc_time = $("#zj_Time").val(); //质检时间

				project.isfinish = true; //质检状态

				project.orderdataversion = _version; //数据版本号

				project = JSON.stringify(project);

				//判断是质检， 还是复检
				if(_status == 2) {
					//进行复检
					$.ajax({
						type: 'POST',
						url: utilService.ZJGL_SERVICE_URL + _url_edit_save,
						data: project,
						dataType: 'json',
						contentType: "application/json",
						success: function(data) {
							if(data.status == 1) {
								window.location.href = utilService.ADDRESS + '/zjgl/yzjlb.html';
							} else {
								alert(data.msg);
							}
						}
					}); //结束

				} else {
					//进行质检
					$.ajax({
						type: 'POST',
						url: utilService.ZJGL_SERVICE_URL + _url_edit_save,
						data: project,
						dataType: 'json',
						contentType: "application/json",
						success: function(data) {
							if(data.status == 1) {
								if(url_parame == "dzjlb") {
									window.location.href = utilService.ADDRESS + '/zjgl/djclb.html';
								} else if(url_parame == "zjdlb") {
									window.location.href = utilService.ADDRESS + '/zjgl/zjdlb.html';
								} else {}
							} else {
								alert(data.msg);
							}
						}
					}); //结束
				}

			}; //质检完成结束

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
					var attachments = [];
					//已经上传的文件列表
					for(var i = 0; i < $("#file-list-2 p").length; i++) {
						var _items = {};
						_items.qcfilekey = $("#file-list-2 p").eq(i).attr("data-osskey");
						_items.qcfilename = $("#file-list-2 p").eq(i).attr("data-ossname");
						attachments.push(_items);
					}
					project.attachments = attachments;
				} else {
					osskey = JSON.parse(osskey);
					//已经上传的文件列表
					for(var i = 0; i < $("#file-list-2 p").length; i++) {
						var _items = {};
						_items.qcfilekey = $("#file-list-2 p").eq(i).attr("data-osskey");
						_items.qcfilename = $("#file-list-2 p").eq(i).attr("data-ossname");
						osskey.push(_items);
					}
					project.attachments = osskey;
				};

				//上传文件的  原始名称 及 key
				var _osskey = window.sessionStorage.getItem("_osskey");

				if(_osskey == null) {
					//获取已经上传的文件
					_osskey = JSON.parse(_osskey);
					project.qcfilekey = $("#file-list-3 p").attr("data-osskey");
					project.qcfilename = $("#file-list-3 p").attr("data-ossname");
				} else {
					_osskey = JSON.parse(_osskey);
					project.qcfilekey = _osskey[0].qcfilekey;
					project.qcfilename = _osskey[0].qcfilename;
				};

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
				var _qualitylevel = qualityCheckLevel.getValue("qualitylevel");
				project.QualityLevel = parseInt(_qualitylevel);

				if(_status == 2) {} else {
					project.id = zj_Id; //质检单id
				}

				project.items = save_project; //质检项数组
				project.qcode = zj_QCode; //质检单号
				project.qc_time = $("#zj_Time").val(); //质检时间

				project.isfinish = false; //质检状态

				project.orderdataversion = _version; //数据版本号

				project = JSON.stringify(project);

				//判断是质检 ，还是复检
				if(_status == 2) {
					//进行复检
					$.ajax({
						type: 'POST',
						url: utilService.ZJGL_SERVICE_URL + _url_edit_save,
						data: project,
						dataType: 'json',
						contentType: "application/json",
						success: function(data) {
							if(data.status == 1) {
								window.location.href = utilService.ADDRESS + '/zjgl/yzjlb.html';
							} else {
								alert(data.msg);
							}
						}
					}); //结束

				} else {
					//进行质检
					$.ajax({
						type: 'POST',
						url: utilService.ZJGL_SERVICE_URL + _url_edit_save,
						data: project,
						dataType: 'json',
						contentType: "application/json",
						success: function(data) {
							if(data.status == 1) {
								if(url_parame == "dzjlb") {
									window.location.href = utilService.ADDRESS + '/zjgl/djclb.html';
								} else if(url_parame == "zjdlb") {
									window.location.href = utilService.ADDRESS + '/zjgl/zjdlb.html';
								} else {}
							} else {
								alert(data.msg);
							}
						}
					}); //结束
				}
			}; //暂存结束

			//返回
			$scope.fh = function() {
				if(url_parame == "dzjlb") {
					window.location.href = utilService.ADDRESS + '/zjgl/djclb.html';
				} else if(url_parame == "zjdlb") {
					window.location.href = utilService.ADDRESS + '/zjgl/zjdlb.html';
				} else {
					window.location.href = utilService.ADDRESS + '/zjgl/yzjlb.html';
				}
			};

		}
	]);
})();