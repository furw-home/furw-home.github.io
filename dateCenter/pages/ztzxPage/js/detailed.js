//获取session 数据
$().ready(function() {
	var obj = sessionStorage.getItem("userinfo");
	$(".head h2").html(obj + "分析");

	//生成工具栏容器
	$(".body").append("<div class = 'right_sidebar' ></div>");
	//添加组件 到工具栏
	$(".right_sidebar").load("../../styles/default/html/toolbar.html", function() {
		openTool();
		setSlider(); //力度选择组件
		setSalesAreas(); //销区选择组件
		setProduction(); //生产维度组件
		setZywd(); //中烟维度  
		setChart(); //图表操作
		setGrade(); //牌号选择
		setTable0peration(); //表格操作
		componentControl(); //组件控制 (隐藏显示)
	});
	setcharts(); //年度同比分析
	setJqgrid(); //中烟公司、年累计、销售同比分析
	setJqgrid2(); // 
	setJqgrid3(); //
	setJqgrid4(); //
	qsbh(); //趋势变化
	setSlyixlgc(); //三类以上销量构成
	setSnwxl(); //省内外销量构成
	setXqxlgc(); //省内销区销量构成
	setSwxlgc(); //省外销量构成
	setJlfx(); //按价类分析
	setXqfx(); //山东中烟省内省外销量构成
	setQsbhqy(); //趋势变化区域
	loadIndexTree(); //加载左侧主题树
});

//指标卡片切换
$(".am-slides li").each(function() {
	$(this).click(function() {
		$(".am-slides li").removeClass("nav_first");
		$(this).addClass("nav_first");
		return false;
	});
});

//主题树设置
var setting = {
	view: {
		dblClickExpand: false,
		showLine: false
	},
	callback: {
		onClick: onClick
	}
};

//加载主题树
var zNodes = "json/member.json";

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

//主题树单击事件
function onClick(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("tree");
	zTree.expandNode(treeNode);
};

//侧边栏
var nums1 = 0;
$(".left_sidebar_icon").click(function() {
	if (nums1++ % 2 == 0) {
		if ($(".left_sidebar").css("margin-left") == "0px") {
			$(".left_sidebar").attr("style", "margin-left:-200px");
		} else {
			$(".left_sidebar").attr("style", "margin-left:0px");
		}
	} else {
		if ($(".left_sidebar").css("margin-left") == "0px") {
			$(".left_sidebar").attr("style", "margin-left:-200px");
		} else {
			$(".left_sidebar").attr("style", "margin-left:0px");
		}
	}
});

//页面锚点定位

//价格分类
$(".jlfx").click(function() {
	$(".body").animate({
		scrollTop: 848
	}, '500');
});
//销区分类
$(".xqfx").click(function() {
	$(".body").animate({
		scrollTop: 1410
	}, '500');
});
//趋势变化
$(".qsbhqy").click(function() {
	$(".body").animate({
		scrollTop: 1810
	}, '500');
});
//回到顶部
$(".top").click(function() {
	$(".body").animate({
		scrollTop: 0
	}, '500');
});
//俺价格分类
$(".ajgfl").click(function() {
	$(".body").animate({
		scrollTop: 848
	}, '500');
});
//按品牌分类
$(".appfl").click(function() {
	$(".body").animate({
		scrollTop: 1128
	}, '500');
});
//按销区分类
$(".axqfl").click(function() {
	$(".body").animate({
		scrollTop: 1410
	}, '500');
});
//按趋势变化
$(".aqsbh").click(function() {
	$(".body").animate({
		scrollTop: 1810
	}, '500');
});
//年度销售累计同比
function setcharts() {
	$('#bar').highcharts({
		chart: {
			type: 'column',
		},
		credits: {
			enabled: false // 禁用版权信息
		},
		title: {
			text: ''
		},
		subtitle: {
			text: ''
		},
		xAxis: {
			categories: [
				'行业平均',
				'红塔集团',
				'红云红河',
				'湖南中烟',
				'广东中烟',
				'湖北中烟',
				'浙江中烟',
				'上海中烟',
				'河南中烟',
				'江苏中烟'
			]
		},
		yAxis: {
			min: 0,
			title: {
				text: ''
			}
		},
		tooltip: {
			headerFormat: '<span style="font-size:10px">{point.key}</span>',
			pointFormat: '' +
				'',
			footerFormat: '<table><tbody><tr><td style="color:{series.color};padding:0">{series.name}: </td><td style="padding:0"><b>{point.y:.1f} mm</b></td></tr></tbody></table>',
			shared: true,
			useHTML: true,
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0
			}
		},
		series: [{
			name: '本期销量',
			data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1]

		}, {
			name: '上期销量',
			data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5]

		}, {
			name: '同比',
			data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2]

		}, {
			name: '本期销售额',
			data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1]

		}, {
			name: '上期销售额',
			data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2]

		}, {
			name: '同比2',
			data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1]

		}]
	});
};

//列表1 数据1
function setJqgrid() {

	var colNames = ['中烟公司', '排名', '本期销量', '上期销量', '销量同比', '本期销售额', '上期销售额', '销售额同比'];

	var contentWhite = $("section").width();
	var columnNum = colNames.length;
	var columnWhite = (contentWhite - 20) / columnNum;

	$("#list1").jqGrid({
		url: server_url + '?handle=getZbdhList&list=list1',
		datatype: "json",
		height: "100%",
		colNames: colNames,
		colModel: [{
			name: 'zygs',
			index: 'time',
			width: columnWhite,
			sortable: false,
			align: "center"
		}, {
			name: 'pm',
			index: 'number',
			width: columnWhite,
			sortable: false,
			align: "center"
		}, {
			name: 'bqxl',
			index: 'value',
			width: columnWhite,
			sortable: false,
			align: "center"
		}, {
			name: 'sqxl',
			index: 'value',
			width: columnWhite,
			sortable: false,
			align: "center"
		}, {
			name: 'xltb',
			index: 'value',
			width: columnWhite,
			sortable: false,
			align: "center"
		}, {
			name: 'bqxse',
			index: 'value',
			width: columnWhite,
			sortable: false,
			align: "center"
		}, {
			name: 'sqsse',
			index: 'value',
			width: columnWhite,
			sortable: false,
			align: "center"
		}, {
			name: 'xsetb',
			index: 'value',
			width: columnWhite,
			sortable: false,
			align: "center"
		}],
		sortname: 'id',
		viewrecords: true,
		multiselect: true,
		pgbuttons: true,
		caption: "中烟公司、年累计、销售同比分析",
		gridview: true,
		sortable: false,
		viewrecords: true,
	});
	$("#list1").jqGrid('navGrid');
};

//列表2 数据2
function setJqgrid2() {

	var colNames = ['价类', '本期销量', '上期销量', '销量同比', '本期销售额', '上期销售额', '销售额同比'];

	$("#list2").jqGrid({
		url: server_url + '?handle=getZbdhList&list=list1',
		datatype: "json",
		height: "100%",
		colNames: colNames,
		colModel: [{
			name: 'jl',
			index: 'time',
			width: 90,
			sortable: false,
			align: "center"
		}, {
			name: 'bqxl',
			index: 'number',
			width: 90,
			sortable: false,
			align: "center"
		}, {
			name: 'sqxl',
			index: 'value',
			width: 90,
			sortable: false,
			align: "center"
		}, {
			name: 'xltb',
			index: 'value',
			width: 90,
			sortable: false,
			align: "center"
		}, {
			name: 'bqxse',
			index: 'value',
			width: 60,
			sortable: false,
			align: "center"
		}, {
			name: 'sqxse',
			index: 'value',
			width: 100,
			sortable: false,
			align: "center"
		}, {
			name: 'ssetb',
			index: 'value',
			width: 100,
			sortable: false,
			align: "center"
		}],
		sortname: 'id',
		viewrecords: true,
		multiselect: true,
		pgbuttons: true,
		caption: "山东中烟、年累计、三类以上、销售同比分析",
		gridview: true,
		sortable: false,
		viewrecords: true,
	});
	$("#list2").jqGrid('navGrid');
};

//列表3 数据3
function setJqgrid3() {

	var colNames = ['牌号', '本期销量', '上期销量', '销量同比', '本期销售额', '上期销售额', '销售额同比'];

	var contentWhite = $("section").width();
	var columnNum = colNames.length;
	var columnWhite = (contentWhite - 20) / columnNum;

	$("#list3").jqGrid({
		url: server_url + '?handle=getZbdhList&list=list1',
		datatype: "json",
		height: "100%",
		colNames: colNames,
		colModel: [{
			name: 'jl',
			index: 'time',
			width: columnWhite,
			sortable: false,
			align: "center"
		}, {
			name: 'bqxl',
			index: 'number',
			width: columnWhite,
			sortable: false,
			align: "center"
		}, {
			name: 'sqxl',
			index: 'value',
			width: columnWhite,
			sortable: false,
			align: "center"
		}, {
			name: 'xltb',
			index: 'value',
			width: columnWhite,
			sortable: false,
			align: "center"
		}, {
			name: 'bqxse',
			index: 'value',
			width: columnWhite,
			sortable: false,
			align: "center"
		}, {
			name: 'sqxse',
			index: 'value',
			width: columnWhite,
			sortable: false,
			align: "center"
		}, {
			name: 'ssetb',
			index: 'value',
			width: columnWhite,
			sortable: false,
			align: "center"
		}],
		sortname: 'id',
		viewrecords: true,
		multiselect: true,
		pgbuttons: true,
		caption: "山东中烟、年累计、重点牌号、销售同比分析",
		gridview: true,
		sortable: false,
		viewrecords: true,
	});
	$("#list3").jqGrid('navGrid');
};

//列表4 数据4
function setJqgrid4() {

	var colNames = ['销区', '本期销量', '上期销量', '销量同比', '本期销售额', '上期销售额', '销售额同比'];

	var contentWhite = $("section").width();
	var columnNum = colNames.length;
	var columnWhite = (contentWhite - 20) / columnNum;

	$("#list4").jqGrid({
		url: server_url + '?handle=getZbdhList&list=list1',
		datatype: "json",
		height: "100%",
		colNames: colNames,
		colModel: [{
			name: 'jl',
			index: 'time',
			width: columnWhite,
			sortable: false,
			align: "center"
		}, {
			name: 'bqxl',
			index: 'number',
			width: columnWhite,
			sortable: false,
			align: "center"
		}, {
			name: 'sqxl',
			index: 'value',
			width: columnWhite,
			sortable: false,
			align: "center"
		}, {
			name: 'xltb',
			index: 'value',
			width: columnWhite,
			sortable: false,
			align: "center"
		}, {
			name: 'bqxse',
			index: 'value',
			width: columnWhite,
			sortable: false,
			align: "center"
		}, {
			name: 'sqxse',
			index: 'value',
			width: columnWhite,
			sortable: false,
			align: "center"
		}, {
			name: 'ssetb',
			index: 'value',
			width: columnWhite,
			sortable: false,
			align: "center"
		}],
		sortname: 'id',
		viewrecords: true,
		multiselect: true,
		pgbuttons: true,
		caption: "山东中烟、年累计、销区、销售同比分析",
		gridview: true,
		sortable: false,
		viewrecords: true,
	});
	$("#list4").jqGrid('navGrid');
};
//趋势变化
function qsbh() {
	$('#qsbh').highcharts({
		chart: {
			type: 'line'
		},
		credits: {
			enabled: false // 禁用版权信息
		},
		title: {
			text: ''
		},
		subtitle: {
			text: ''
		},
		xAxis: {
			categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
		},
		yAxis: {
			title: {
				text: ''
			}
		},
		tooltip: {
			enabled: false,
			formatter: function() {
				return '<b>' + this.series.name + '</b><br>' + this.x + ': ' + this.y + '°C';
			}
		},
		plotOptions: {
			line: {
				dataLabels: {
					enabled: true
				},
				enableMouseTracking: false
			}
		},
		series: [{
			name: '销量',
			data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
		}]
	});
};

//三类以上销量构成
function setSlyixlgc() {
	var slyixlgc_charts = echarts.init(document.getElementById('slyixlgc'));
	slyixlgc_charts.setOption(pieOption);
}
pieOption = {
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	},
	color: ['#A5A5A5', '#5B9BD5', '#ED7D31'],
	legend: {
		orient: 'horizontal',
		x: 'center',
		y: 'bottom',
		data: ['一类', '二类', '三类'],
	},
	series: [{
		name: '销量',
		type: 'pie',
		radius: '70%',
		center: ['50%', '45%'],
		data: [{
			value: 335,
			name: '一类'
		}, {
			value: 610,
			name: '二类'
		}, {
			value: 610,
			name: '三类'
		}],
		itemStyle: {
			normal: {
				label: {
					position: 'inner',
					formatter: '{d}%',
					textStyle: {
						fontSize: '14',
					}
				},
				labelLine: {
					show: false
				}
			},
		},
	}]
};

//省内外销量构成snwxl
function setSnwxl() {
	var ssnwxl_charts = echarts.init(document.getElementById('snwxl'));
	ssnwxl_charts.setOption(snwxlOption);
}
snwxlOption = {
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	},
	color: ['#5B9BD5', '#ED7D31'],
	legend: {
		orient: 'horizontal',
		x: 'center',
		y: 'bottom',
		data: ['省内', '省外'],
	},
	series: [{
		name: '销量',
		type: 'pie',
		radius: '70%',
		center: ['50%', '40%'],
		data: [{
			value: 335,
			name: '省内'
		}, {
			value: 610,
			name: '省外'
		}],
		itemStyle: {
			normal: {
				label: {
					position: 'inner',
					formatter: '{d}%',
					textStyle: {
						fontSize: '14',
					}
				},
				labelLine: {
					show: false
				}
			},
		},
	}]
};
//省内销区销量构成 xqxlgc
function setXqxlgc() {
	var xqxlgc_charts = echarts.init(document.getElementById('xqxlgc'));
	xqxlgc_charts.setOption(xqxlgcOption);
}
xqxlgcOption = {
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	},
	color: ['#A3A3A3', '#5B9BD5', '#ED7D31', '#FFC611'],
	legend: {
		orient: 'horizontal',
		x: 'center',
		y: 'bottom',
		data: ['济南', '青岛', '青州', '滕州'],
	},
	series: [{
		name: '销量',
		type: 'pie',
		radius: '70%',
		center: ['50%', '40%'],
		data: [{
			value: 335,
			name: '济南'
		}, {
			value: 610,
			name: '青岛'
		}, {
			value: 610,
			name: '青州'
		}, {
			value: 610,
			name: '滕州'
		}],
		itemStyle: {
			normal: {
				label: {
					position: 'inner',
					formatter: '{d}%',
					textStyle: {
						fontSize: '11',
					}
				},
				labelLine: {
					show: false
				}
			},
		},
	}]
};

//省外销量构成  
function setSwxlgc() {
	var swxlgc_charts = echarts.init(document.getElementById('swxlgc'));
	swxlgc_charts.setOption(swxlgcOption);
}
swxlgcOption = {
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	},
	color: ['#A3A3A3', '#5B9BD5', '#ED7D31', '#FFC611', '#70AD47', '#4472C4'],
	legend: {
		orient: 'horizontal',
		x: 'center',
		y: 'bottom',
		data: ['西北', '华北', '华东', '东北', '中南', '南方'],
	},
	series: [{
		name: '销量',
		type: 'pie',
		radius: '70%',
		center: ['50%', '40%'],
		data: [{
			value: 335,
			name: '西北'
		}, {
			value: 610,
			name: '华北'
		}, {
			value: 610,
			name: '华东'
		}, {
			value: 610,
			name: '东北'
		}, {
			value: 610,
			name: '中南'
		}, {
			value: 610,
			name: '南方'
		}],
		itemStyle: {
			normal: {
				label: {
					position: 'inner',
					formatter: '{d}%',
					textStyle: {
						fontSize: '11',
					}
				},
				labelLine: {
					show: false
				}
			},
		},
	}]
};
//按价类分析 jlfx
function setJlfx() {
	var jlfx_charts = echarts.init(document.getElementById('jlfx'));
	jlfx_charts.setOption(jlfxOption);
}
jlfxOption = {
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	},
	color: ['#A2A2A2', '#5B9BD5', '#ED7D31'],
	legend: {
		orient: 'horizontal',
		x: 'center',
		y: 'bottom',
		data: ['一类', '二类', '三类'],
	},
	series: [{
		name: '销量',
		type: 'pie',
		radius: '70%',
		center: ['50%', '40%'],
		data: [{
			value: 335,
			name: '一类'
		}, {
			value: 610,
			name: '二类'
		}, {
			value: 610,
			name: '三类'
		}],
		itemStyle: {
			normal: {
				label: {
					position: 'inner',
					formatter: '{d}%',
					textStyle: {
						fontSize: '11',
					}
				},
				labelLine: {
					show: false
				}
			},
		},
	}]
};

//山东中烟省内省外销量构成
function setXqfx() {
	var xqfx_charts = echarts.init(document.getElementById('xqfx'));
	xqfx_charts.setOption(xqfxOption);
}
xqfxOption = {
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	},
	color: ['#5B9BD5', '#ED7D31'],
	legend: {
		orient: 'horizontal',
		x: 'center',
		y: 'bottom',
		data: ['省内', '省外'],
	},
	series: [{
		name: '销量',
		type: 'pie',
		radius: '70%',
		center: ['50%', '40%'],
		data: [{
			value: 335,
			name: '省内'
		}, {
			value: 610,
			name: '省外'
		}],
		itemStyle: {
			normal: {
				label: {
					position: 'inner',
					formatter: '{d}%',
					textStyle: {
						fontSize: '11',
					}
				},
				labelLine: {
					show: false
				}
			},
		},
	}]
};
//趋势变化区域
function setQsbhqy() {

}