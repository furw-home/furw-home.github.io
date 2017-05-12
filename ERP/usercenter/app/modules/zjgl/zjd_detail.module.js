(function() {
	/**
	 * 作者: furw
	 * 描述: 质检单 module
	 */
	var zjd_detailModule = angular.module('zjd_detailModule', ['mainModule']);

	/**
	 * 作者: furw
	 * 描述: 质检单 控制器
	 */
	zjd_detailModule.controller('zjd_detailCtrl', ['$scope', 'utilService', 'uiService',
		function($scope, utilService, uiService) {

			var zj_qcode;
			var zj_Id;
			var _version;

			//初始化
			$scope.init = function() {
				$scope.project = {}; //质检项
				$scope.zjReturn();
			};

			//刷新dom
			function CheckScopeBeforeApply() {
				if(!$scope.$$phase) {
					$scope.$apply();
				}
			};

			//获取缓存数据
			_qualityItem = sessionStorage.getItem("zjpt_zjd_zjd_dataVersion");
			_qualityItem = JSON.parse(_qualityItem);
			_version = _qualityItem[0].OrderDataVersion;

			//获取URL参数 (质检单id)
			var url_parame = window.location.search;
			url_parame = url_parame.substr(url_parame.lastIndexOf("="));
			url_parame = url_parame.substr(1);

			//根据质检id 获取质检单信息
			$scope.zjReturn = function() {
				$.ajax({
					type: 'GET',
					url: utilService.ZJGL_SERVICE_URL + "QualityUnCheckOrder/GetQcInfoById?version=" + _version,
					data: {
						id: url_parame
					},
					async: false,
					dataType: 'json',
					contentType: "application/json",
					success: function(data) {

						zj_qcode = data.data.QCode;
						zj_Id = data.data.Id;

						//质检项
						var dataItem = data.data.Items;

						for(var j = 0; j < dataItem.length; j++) {

							//项目备注 非空处理
							var _remark;
							if(dataItem[j].Remark == null) {
								_remark = "";
							} else {
								_remark = dataItem[j].Remark;
							};

							//实际情况
							var _isQualified;
							if(dataItem[j].IsQualified) {
								_isQualified = "合格";
							} else {
								_isQualified = "不合格";
							};

							$("#zjxm_body").append(
								'<ul data-itemStanard=' + dataItem[j].ItemStandard + ' data-itemName=' + dataItem[j].ItemName + ' data-id=' + dataItem[j].Id + ' data-itemCode=' + dataItem[j].ItemCode + '>' +
								'<li>' + dataItem[j].ItemName + '</li>' +
								'<li style="padding: 5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title=' + dataItem[j].ItemStandard + '>' + dataItem[j].ItemStandard + '</li>' +
								'<li>' + _isQualified + '</li>' +
								'<li>' + dataItem[j].ProblemAmount + '</li>' +
								'<li>' + _remark + '</li>' +
								'<li class="font20 nobr cursor zjxm_remove"></li>' +
								'</ul>'
							);
						};

						//质检表
						var qcFileKey = data.data.QcFileKey;
						var qcFileName = data.data.QcFileName;

						if(qcFileName == null) {
							$("#file-list-1").html("");
						} else {
							$("#file-list-1").append('<a target="_blank" href="http://filed.98ep.com/' + qcFileKey + '">' + qcFileName + '</a>');
						};

						//附件
						var attachments = data.data.Attachments;
						var str = "";
						for(var i = 0; i < attachments.length; i++) {
							str += '<p><a target="_blank" href="http://filed.98ep.com/' + attachments[i].QCFileKey + '">' + attachments[i].QCFileName + '</a></p>';
						};

						$("#file-list").append(str);

						//判断实际情况
						var _isQualified1;
						for(var j1 = 0; j1 < dataItem.length; j1++) {
							if(dataItem[j1].IsQualified) {
								_isQualified1 = true;
								break;
							} else {
								_isQualified1 = false;
							};
						}

						//判断是否接收
						var IsRecieve;
						if(_isQualified1) {
							IsRecieve = "是";
						} else {
							IsRecieve = "否";
						};

						$scope.project = {
							qcode: data.data.QCode, //质检单号
							ordercode: data.data.OrderCode, //订单号
							qualityamount: data.data.QualityAmount, //质检数量
							remark: data.data.Remark, //备注
							supplier: data.data.Supplier, //供应商
							templateList: data.data.TemplateName, //质检模版
							qualitylevel: data.data.QualityLevelName, //质检级别
							qc_time: data.data.QualityTime, //质检时间
							samplingLevel: data.data.SamplingLevelName, //质检水平
							orderinfo: data.data.OrderInfo, //订单信息
							qcperson: data.data.QCPerson, //质检员
							leaderSign: data.data.LeaderSign, //主管签字
							isrecieve: IsRecieve, //是否接收
							reservedAmount: data.data.ReservedAmount //留样数量
						};

						CheckScopeBeforeApply(); //刷新dom
					}
				}); //结束
			};
			//导出
			$scope.export = function() {

				//获取 ticket
				var ticket = utilService.TICKET;

				if(null == zj_qcode) {
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

			//返回
			$scope.returnBack = function() {
				//removeTab();
				window.location.href = utilService.ADDRESS + "/zjgl/zjdlb.html";
			}
		}
	]);
})();