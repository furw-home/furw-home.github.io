// 单箱嘴棒消耗量分析# 定制界面

var curIndex = null; //当前指标
var curtable = null; //当前表格
var curRow = null; //当前行
var curCol = null; //当前列

$().ready(function() {
	//获取当前指标
	curIndex = JSON.parse(sessionStorage.getItem("selectedIndex"));
	//根据当前指标获取界面的配置信息
	loadUIInfor();

	//生成工具栏容器
	$(".body").append("<div class = 'right_sidebar'></div>");
	//添加组件 到工具栏
	$(".right_sidebar").load("../../../styles/default/html/toolbar.html", function() {
		openTool(); //打开工具栏
		setZywd(); //中烟维度  
		setChart(); //图表操作
		setGrade(); //牌号选择
		setSlider(); //力度选择组件
		setSalesAreas(); //销区选择组件
		setProduction(); //生产维度组件
		setTable0peration(); //表格控件
		componentControl(); //组件控制 (隐藏显示)
	});

	loadTitle(); //加载表头
	setcharts(); //2015年 3~8月单箱消耗
	setLinecharts(); //异常分析
	setJqgrid(); //列表1
	setJqgrid1(); //列表2
	setJqgrid2(); //列表3
	setJqgrid3(); //列表4
	setJqgrid4(); //列表5
	loadIndexTree(); //加载左侧指标树
	window.onresize = function() {
		setcharts(); //2015年 3~8月单箱消耗
		setLinecharts(); //异常分析
		//		$("#list1").setGridWidth($(".content").width());
	}
	openLeftTool(); //左侧指标树

	//为表格添加刷新按钮
	$(".ui-jqgrid-titlebar").append("<a href='###' style='color:#444' class='refresh'>刷新</a>");

	//列注册
	$(".ui-jqgrid th").click(function() {
		var tbid = $(this).parent().parent().parent().parent().parent().parent().parent().parent().prop("class");
		curtable = tbid;
		curCol = $(this).index();
		colSelect($(this));
		$(".table0peration_content ul").html("");
		$(".table0peration_content ul").append("<li class ='hiddenColumns'>隐藏列 </li><li class='showColumns'>显示隐藏列</li><li class ='hideOtherColumns'>隐藏其他列 </li><li class ='columnColor'>列标红 </li>");
		loadRightSidebar();
		tableOption();
	});

	//行注册
	$(".ui-jqgrid-btable").click(function() {
		curtable = $(this).prop("id");
		$(".table0peration_content ul").html("");
		$(".table0peration_content ul").append("<li class = 'hiddenLine'>隐藏行 </li><li class='showLine'>显示隐藏行</li ><li class = 'hideOtherLines'>隐藏其他行 </li><li class='rowColor'>行标红</li>");
		loadRightSidebar();
		tableOption();
	});

});
//控制 左侧边栏 打开 及 关闭
function openLeftTool() {
	var nums3 = 0;
	$(".left_sidebar_icon").click(function() {
		if (nums3++ % 2 == 0) {
			if ($(".left_sidebar").css("margin-left") == "0px") {
				$(".left_sidebar").attr("style", "margin-left:-190px");
			} else {
				$(".left_sidebar").attr("style", "margin-left:0px");
			}
		} else {
			if ($(".left_sidebar").css("margin-left") == "0px") {
				$(".left_sidebar").attr("style", "margin-left:-190px");
			} else {
				$(".left_sidebar").attr("style", "margin-left:0px");
			}
		}
	});
};

/**
 * 加载表头
 */
function loadTitle() {
	$(".head h2").html(curIndex.name + "分析");
};

/**
 *  获取界面的配置信息
 */
function loadUIInfor() {

};

//关闭 指标树全景图
$(".closes").click(function() {
	var self1 = $(this).parent();
	self1.hide(1000);
});

//指标推送
$(".dynamic_index").append("<p class = 'dynamic_index_head'> 指标推送区 </p><ul>上柜率指标</ul><ul> 断货率指标 </ul><ul>在购率指标</ul ><ul>单箱消耗叶量指标 </ul><ul>各类设备运行效率指标</ul>");

//列表1 数据1
function setJqgrid() {

	$(".list1").append("<table id='list1'></table>");
	var colNames = ['时间', '单箱耗嘴棒量(支 / 万支)', '目标值(<=2501)标注需关注行'];
	var tableName = "时间";

	$("#list1").jqGrid({
		url: server_url + '?handle=getZbdhList&list=list1',
		datatype: "json",
		height: "100%",
		colNames: colNames,
		colModel: [{
			name: 'time',
			index: 'time',
			width: 278,
			sortable: false,
			align: "center"
		}, {
			name: 'number',
			index: 'number',
			width: 350,
			sortable: false,
			align: "center"
		}, {
			name: 'value',
			index: 'value',
			width: 380,
			sortable: false,
			align: "center"
		}],
		sortname: 'id',
		viewrecords: true,
		multiselect: true,
		pgbuttons: true,
		caption: tableName,
		gridview: true,
		sortable: false,
		viewrecords: true,
		gridComplete: function() {
			testJqfrid();
		},
	});
	$("#list1").jqGrid('navGrid');
};

//列表1 数据2
function setJqgrid1() {

	$(".list2").append("<table id='list2'></table>");
	var colNames = ['机台', '单箱耗嘴棒量', '目标值', '标注关注行'];
	var tableName = "机台";

	$("#list2").jqGrid({
		url: server_url + '?handle=getZbdhList&list=list2',
		datatype: "json",
		height: "100%",
		colNames: colNames,
		colModel: [{
			name: 'machine',
			index: 'machine',
			width: 198,
			align: "center",
			sortable: false
		}, {
			name: 'number',
			index: 'number',
			width: 320,
			sortable: false,
			align: "center"
		}, {
			name: 'value',
			index: 'value',
			width: 310,
			sortable: false,
			align: "center"
		}, {
			name: 'tagging',
			index: 'tagging',
			width: 180,
			sortable: false,
			align: "center"
		}],
		sortname: 'id',
		viewrecords: true,
		multiselect: true,
		pgbuttons: true,
		caption: tableName,
		viewrecords: true
	});
	$("#list2").jqGrid('navGrid');
};

//列表1 数据3
function setJqgrid2() {

	$(".list3").append("<table id='list3'></table>");
	var colNames = ['牌号', '单箱耗嘴棒量', '目标值', '标注关注行'];
	var tableName = "规格";

	$("#list3").jqGrid({
		url: server_url + '?handle=getZbdhList&list=list3',
		datatype: "json",
		height: "100%",
		colNames: colNames,
		colModel: [{
			name: 'grade',
			index: 'grade',
			width: 198,
			sortable: false,
			align: "center"
		}, {
			name: 'number',
			index: 'number',
			width: 320,
			sortable: false,
			align: "center"
		}, {
			name: 'value',
			index: 'value',
			width: 310,
			sortable: false,
			align: "center"
		}, {
			name: 'tagging',
			index: 'tagging',
			width: 180,
			sortable: false,
			align: "center"
		}],
		sortable: false,
		sortname: 'id',
		viewrecords: true,
		multiselect: true,
		pgbuttons: true,
		caption: tableName,
		viewrecords: true
	});
	$("#list3").jqGrid('navGrid');
}

//二级列表
function setJqgrid3() {

	$(".list4").append("<table id='list4'></table>");
	var colNames = ['时间', '单箱耗嘴棒量(万支)', '目标值', '标注关注行'];
	var tableName = "二级列表";

	$("#list4").jqGrid({
		url: server_url + '?handle=getZbdhList&list=list4',
		datatype: "json",
		height: "100%",
		colNames: colNames,
		colModel: [{
			name: 'time',
			index: 'time',
			width: 228,
			sortable: false,
			align: "center"
		}, {
			name: 'number',
			index: 'number',
			width: 320,
			sortable: false,
			align: "center"
		}, {
			name: 'value',
			index: 'value',
			width: 280,
			sortable: false,
			align: "center"
		}, {
			name: 'tagging',
			index: 'tagging',
			width: 180,
			sortable: false,
			align: "center"
		}],
		sortable: false,
		sortname: 'id',
		viewrecords: true,
		multiselect: true,
		pgbuttons: true,
		caption: tableName,
		viewrecords: true
	});
	$("#list4").jqGrid('navGrid');
};

//三级列表
function setJqgrid4() {

	$(".list5").append("<table id='list5'></table>");
	var colNames = ['时间', '班次', '单箱耗嘴棒量', '目标值', '标注关注行'];
	var tableName = "三级列表";

	$("#list5").jqGrid({
		url: server_url + '?handle=getZbdhList&list=list5',
		datatype: "json",
		height: "100%",
		colNames: colNames,
		colModel: [{
			name: 'time',
			index: 'time',
			width: 228,
			sortable: false,
			align: "center"
		}, {
			name: 'shift',
			index: 'shift',
			width: 210,
			sortable: false,
			align: "center"
		}, {
			name: 'number',
			index: 'number',
			width: 120,
			sortable: false,
			align: "center"
		}, {
			name: 'value',
			index: 'value',
			width: 290,
			sortable: false,
			align: "center"
		}, {
			name: 'tagging',
			index: 'tagging',
			width: 160,
			sortable: false,
			align: "center"
		}],
		sortable: false,
		sortname: 'id',
		viewrecords: true,
		multiselect: true,
		pgbuttons: true,
		caption: tableName,
		viewrecords: true
	});
	$("#list5").jqGrid('navGrid');
}

//表格操作样式
function optionTableColor() {
	$(".table0peration_content li").each(function() {
		$(this).click(function() {
			$(".table0peration_content li").css("background", "");
			$(".table0peration_content li").css("color", "");
			$(this).css("background", "#F0AD4E");
			$(this).css("color", "white");
		});
	});
};

//指标树参数
var setting = {
	view: {
		dblClickExpand: false,
		showLine: false
	},
	callback: {
		onClick: onClick
	}
};

//加载指标树
var zNodes = "../json/member.json";

function loadIndexTree() {
	$.ajax({
		type: 'get',
		url: zNodes,
		dataType: 'json',
		success: function(data) {
			$.fn.zTree.init($("#tree"), setting, data);
		}
	});
};

//指标树单击事件
function onClick(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("tree");
	zTree.expandNode(treeNode);
};

//单箱消耗嘴棒 图表切换
$(".chart_title i").click(function() {
	$(".sidebar_icon").css("display", "none");
	$(".right_sidebar").attr("style", "margin-right:0px");
	$(".chart_head i").attr("class", "glyphicon glyphicon-chevron-up");
	$(".chart_content").css("display", "block");
	$(".chart_content ul").html("");
	$(".chart_content ul").append("<li class='bar'><img src='../img/bar.png'/> <//li><li class='line'><img src='../img/1.png'/> </li>")
	setcharts();
	if ($(".sales_areas").is(":hidden")) {} else {
		$(".select_sales_areas span").attr("class", "am-icon-angle-down");
		$(".sales_areas").css("display", "none");
	}
	if ($(".dimension_list").is(":hidden")) {} else {
		$(".grade_head i").attr("class", "glyphicon glyphicon-chevron-down");
		$(".dimension_list").css("display", "none");
	}
	if ($(".production_content").is(":hidden")) {} else {
		$(".production_head i").attr("class", "glyphicon glyphicon-chevron-down");
		$(".production_content").css("display", "none");
	}
	if ($(".zywd_content").is(":hidden")) {} else {
		$(".zywd_head i").attr("class", "glyphicon glyphicon-chevron-down");
		$(".zywd_content").css("display", "none");
	}
	if ($(".table0peration_content").is(":hidden")) {} else {
		$(".table0peration_head i").attr("class", "glyphicon glyphicon-chevron-down");
		$(".table0peration_content").css("display", "none");
	}
});

//卷包机 图表切换
$(".abnormal_title i").click(function() {
	$(".sidebar_icon").css("display", "none");
	$(".right_sidebar").attr("style", "margin-right:0px");
	$(".chart_head i").attr("class", "glyphicon glyphicon-chevron-up");
	$(".chart_content").css("display", "block");
	$(".chart_content ul").html("");
	$(".chart_content ul").append("<li class='bar'><img src='../img/bar.png'/> <//li><li class='line'><img src='../img/1.png'/> </li>")
	setLinecharts();
	if ($(".sales_areas").is(":hidden")) {} else {
		$(".select_sales_areas span").attr("class", "am-icon-angle-down");
		$(".sales_areas").css("display", "none");
	}
	if ($(".dimension_list").is(":hidden")) {} else {
		$(".grade_head i").attr("class", "glyphicon glyphicon-chevron-down");
		$(".dimension_list").css("display", "none");
	}
	if ($(".production_content").is(":hidden")) {} else {
		$(".production_head i").attr("class", "glyphicon glyphicon-chevron-down");
		$(".production_content").css("display", "none");
	}
	if ($(".zywd_content").is(":hidden")) {} else {
		$(".zywd_head i").attr("class", "glyphicon glyphicon-chevron-down");
		$(".zywd_content").css("display", "none");
	}
	if ($(".table0peration_content").is(":hidden")) {} else {
		$(".table0peration_head i").attr("class", "glyphicon glyphicon-chevron-down");
		$(".table0peration_content").css("display", "none");
	}
});

//2015年 3~8月单箱消耗
function setcharts() {

	$(".analysis_chart span").html("2015年 3~8月单箱消耗");
	$(".analysis_chart").append("<div id='bar' class='charts'></div>");

	//柱形图
	var targetValue = 2501.0; //目标值
	var month = ["1月", "2月", "3月", "4月", "5月", "6月"];
	var values = [2500.67, 2500.87, 2501.12, 2501.09, 2500.98, 2500.47];
	var colors = ["#3388FF", "#3388FF", "#FE8463", "#FE8463", "#3388FF", "#3388FF"];
	$.ajax({
		type: 'post',
		async: false,
		url: server_url + '?handle=getZbdhCharts&chart=chart1',
		dataType: 'json',
		success: function(data) {
			month = data.time;
			values = data.values;
			colors = data.colors;
		}
	});

	var barChart = echarts.init(document.getElementById('bar'));
	barChart.setOption(setDxhzb(month, values, colors, targetValue, "bar"));

	$(".bar").click(function() {
		barChart.setOption(setDxhzb(month, values, colors, targetValue, "line"));
	});
	$(".line").click(function() {
		barChart.setOption(setDxhzb(month, values, colors, targetValue, "bar"));
	});
};

function setDxhzb(month, values, colors, targetValue, parameter) {
	barOption = {
		tooltip: {
			trigger: 'axis'
		},
		toolbox: {
			show: true,
		},
		legend: {
			data: ['单箱消耗嘴棒'],
			y: 'bottom',
		},
		calculable: true,
		grid: {
			x: 60,
			y: 35,
			x2: 60,
			y2: 60,
			borderColor: 'whitesmoke',
		},
		xAxis: [{
			type: 'category',
			data: month,
			axisLine: {
				lineStyle: {
					color: 'whitesmoke',
					width: 1,
					type: 'solid'
				},
			},
			splitLine: {
				show: false,
				lineStyle: {
					color: ['#EBEBEB'],
					width: 1,
					type: 'solid'
				},
			},
		}],
		yAxis: [{
			type: 'value',
			scale: true,
			axisLine: {
				lineStyle: {
					color: 'whitesmoke',
					width: 1,
					type: 'solid'
				},

			},
			splitLine: {
				show: false,
				lineStyle: {
					color: ['#EBEBEB'],
					width: 1,
					type: 'solid'
				},
			},
		}],
		series: [{
			name: '单箱消耗嘴棒',
			type: parameter,
			data: values,
			itemStyle: {
				normal: {
					label: {
						show: true,
					},
					color: function(params) {
						var colorList = colors;
						return colorList[params.dataIndex]
					}
				},
			},
			markLine: {
				data: [
					[{
						name: '标线1起点',
						value: targetValue,
						xAxis: -1,
						yAxis: targetValue
					}, {
						name: '标线1终点',
						xAxis: 10,
						yAxis: targetValue
					}, ],

				]
			},
		}]
	};
	return barOption;
}

//折线图
function setLinecharts() {

	$(".abnormal span").html("卷包机2#");
	$(".abnormal").append("<div id='line' class='charts'></div>")

	//柱形图
	var time = ["1月", "2月", "3月", "4月", "5月", "6月"];
	var values = [2500.67, 2500.87, 2501.12, 2501.09, 2500.98, 2500.47];
	var colors = ["#3388FF", "#3388FF", "#FE8463", "#FE8463", "#3388FF", "#3388FF"];
	$.ajax({
		type: 'post',
		async: false,
		url: server_url + '?handle=getZbdhCharts&chart=chart2',
		dataType: 'json',
		success: function(data) {
			time = data.time;
			values = data.values;
			colors = data.colors;
		}
	});
	var lineChart = echarts.init(document.getElementById('line'));
	lineChart.setOption(LinechartsOptine("line"));

	$(".bar").click(function() {
		lineChart.setOption(LinechartsOptine("bar"));
	});
	$(".line").click(function() {
		lineChart.setOption(LinechartsOptine("line"));
	});

	function LinechartsOptine(parameter) {
		lineOption = {
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: ['卷包机2#'],
				y: 'bottom',
			},
			grid: {
				x: 42,
				y: 10,
				x2: 15,
				y2: 60,
				borderColor: 'whitesmoke',
			},
			xAxis: [{
				type: 'category',
				boundaryGap: false,
				data: time,
				axisLine: {
					lineStyle: {
						color: '#ccc',
						width: 1,
						type: 'solid'
					},
				},
				splitLine: {
					lineStyle: {
						color: ['whitesmoke'],
						width: 1,
						type: 'solid'
					},
				},
			}],
			yAxis: [{
				type: 'value',
				axisLabel: {
					formatter: '{value}'
				},
				axisLine: {
					lineStyle: {
						color: 'whitesmoke',
						width: 1,
						type: 'solid'
					},
				},
				splitLine: {
					lineStyle: {
						color: ['whitesmoke'],
						width: 1,
						type: 'solid'
					},
				},
			}],
			series: [{
				name: '卷包机2#',
				type: parameter,
				data: values,
				itemStyle: {
					normal: {
						color: '#28B779',
					},
				},
			}]
		};
		return lineOption;
	}
}