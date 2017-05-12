(function() {
	/**
	 * 作者: furw
	 * 描述: 供应商列表 模块
	 */
	var gyslbModule = angular.module('gyslbModule', ['mainModule']);

	/**
	 * 作者: furw
	 * 描述: 供应商列表 控制器
	 */
	gyslbModule.controller('gyslbCtrl', ['$scope', '$resource', 'utilService', 'uiService',
		function($scope, $resource, utilService, uiService) {

			//初始化
			$scope.init = function() {}

			//设置 所在省 下拉框数据
			var data = [{
				text: "北京市",
				value: "1"
			}, {
				text: "河北省",
				value: "2"
			}, {
				text: "山东省",
				value: "3"
			}];

			//设置 所在市  下拉框数据
			var level = [{
				text: "北京市",
				value: "1"
			}, {
				text: "石家庄",
				value: "2"
			}, {
				text: "济南市",
				value: "3"
			}, {
				text: "天津市",
				value: "4"
			}];

			//初始化 所属类别 下拉框数据
			var category = [{
				text: "所属类别",
				value: "1"
			}, {
				text: "生产公司",
				value: "2"
			}, {
				text: "采购新供应商",
				value: "3"
			}, {
				text: "阳光印网",
				value: "4"
			}, {
				text: "物流公司",
				value: "5"
			}, {
				text: "渠道商",
				value: "6"
			}, {
				text: "储备金账户",
				value: "7"
			}, {
				text: "其他公司",
				value: "8"
			}];
			//初始化 审批状态 下拉框数据
			var status = [{
				text: "审批状态",
				value: "1"
			}, {
				text: "待审批",
				value: "2"
			}, {
				text: "审批通过",
				value: "3"
			}, {
				text: "审批不通过",
				value: "4"
			}];
			//初始化 企业规模 下拉框数据
			var scale = [{
				text: "企业规模",
				value: "1"
			}, {
				text: "50人以下",
				value: "2"
			}, {
				text: "50~100人",
				value: "3"
			}, {
				text: "100~200人",
				value: "4"
			}, {
				text: "200人以上",
				value: "5"
			}];
			//初始化 数据来源 下拉框数据
			var data_source = [{
				text: "数据来源",
				value: "1"
			},{
				text: "系统录入",
				value: "2"
			},{
				text: "历史数据",
				value: "3"
			},{
				text: "网络数据",
				value: "4"
			},{
				text: "报价新增",
				value: "5"
			},{
				text: "H5新增",
				value: "6"
			},{
				text: "供应商管理录入",
				value: "7"
			},{
				text: "外地供应商管理人员录入",
				value: "8"
			}];
			//初始化 付款方式 下拉框数据
			var payment = [{
				text: "付款方式",
				value: "1"
			},{
				text: "货到付款",
				value: "2"
			},{
				text: "预付款",
				value: "3"
			},{
				text: "在线支付",
				value: "4"
			},{
				text: "预付款",
				value: "5"
			},{
				text: "账期付款",
				value: "6"
			}];
			//初始化 注册基金 下拉框数据
			var register_fund = [{
				text: "注册基金"
			}, {
				text: "50万以下",
				value: "2"
			}, {
				text: "50~100万",
				value: "3"
			}, {
				text: "100~500万",
				value: "4"
			}, {
				text: "500万以上",
				value: "5"
			}];
			//初始化 供应商信息来源 下拉框数据
			var gys_message_source = [{
				text: "供应商信息来源",
				value: "1"
			},{
				text: "新媒体宣传",
				value: "2"
			},{
				text: "展会开发",
				value: "3"
			},{
				text: "客户指定",
				value: "4"
			},{
				text: "官网注册",
				value: "5"
			},{
				text: "公司内部录入",
				value: "6"
			}];
			//初始化 合作类型 下拉框数据
			var consociation_type = [{
				text: "合作类型",
				value: "1"
			},{
				text: "先发后审",
				value: "2"
			},{
				text: "其他合作类型",
				value: "3"
			}];
			// 初始化 所在省 下拉框
			$("#province").kendoDropDownList({
				dataTextField: "text",
				dataValueField: "value",
				dataSource: data
			});
			//初始化 所在市 下拉框
			$("#city").kendoDropDownList({
				dataTextField: "text",
				dataValueField: "value",
				dataSource: level
			});
			// 初始化 所属类别 下拉框
			$("#category").kendoDropDownList({
				dataTextField: "text",
				dataValueField: "value",
				dataSource: category
			});
			//初始化 审批状态 下拉框
			$("#status").kendoDropDownList({
				dataTextField: "text",
				dataValueFieled: "value",
				dataSource: status
			});
			//初始化 企业规模 下拉框
			$("#scale").kendoDropDownList({
				dataTextField: "text",
				dataValueField: "value",
				dataSource: scale
			});
			//初始化 数据来源 下拉框
			$("#data_source").kendoDropDownList({
				dataTextField: "text",
				dataValueField: "value",
				dataSource: data_source
			});
			//初始化 付款方式 下拉框
			$("#payment").kendoDropDownList({
				dataTextField: "text",
				dataValueField: "value",
				dataSource: payment
			});
			//初始化 注册基金 下拉框
			$("#register_fund").kendoDropDownList({
				dataTextField: "text",
				dataVlaueField: "value",
				dataSource: register_fund
			});
			//初始化 供应商信息来源 下拉框
			$("#gys_message_source").kendoDropDownList({
				dataTextField: "text",
				dataValueField: "value",
				dataSource: gys_message_source
			});
			//初始化  合作类型 下拉框
			$("#consociation_type").kendoDropDownList({
				dataTextField: "text",
				dataValueField: "value",
				dataSource: consociation_type
			});
			//日历
			$("#datepicker").kendoDatePicker();
			$("#datepicker1").kendoDatePicker();
			$("#datepicker2").kendoDatePicker();
			$("#datepicker3").kendoDatePicker();

			$('#search').selectpicker({
				size : 10,
				width : 150,
				noneSelectedText : '商品'
			});
			//Grid 初始化
			var dataSource = new kendo.data.DataSource({
				transport: {
					read: function(options) {

						var _data = {};
						//查询
						$.ajax({
							type: 'get',
							url: "../../json/gyslb.json",
							data: _data,
							dataType: 'json',
							success: function(data) {
								options.success(data);
							}
						});
					},
				},
				serverPaging: false, //服务器分页
				serverSorting: false, //服务器排序
				serverFiltering: false, //支持查询功能
				pageSize: 10, //每页显示条数
				batch: true, //多选
				schema: { // 定义分页
					data: "data", //定义数据来源
					total: "total", //页码总数
				}
			});

			//绑定数据源
			$('#grid').kendoGrid({
				dataSource: dataSource, //数据源加载
				sortable: true, //可排序
				scrollable: false, //去掉滚动条区域
				selectable: "multiple row", //开启多选

				//配置表格标头信息
				columns: [{
					field: "gys_num",
					title: "供应商编号"
				},{
					field: "Registration_status",
					title: "注册状态"
				},{
					field: "gys_name",
					title: "供应商名称"
				},{
					field: "contacts",
					title: "联系人"
				},{
					field: "phone",
					title: "电话"
				},{
					field: "province_city",
					title: "所在省市"
				},{
					field: "main_business",
					title: "主营业务"
				},{
					field: "creation_time",
					title: "创建时间"
				},{
					field: "creater",
					title: "创建人"
				},{
					field: "survey",
					title: "考察员"
				},{
					field: "interlinkage",
					title: "链接"
				},{
					field: "data_source",
					title: "数据来源"
				},{
					field: "track_record",
					title: "跟踪记录"
				}],
				pageable: {
					messages: {
						display: "共 {2} 条数据",
						empty: "没有数据",
					}
				},

			}); //Grid 结束

		}
	]);
})();