$().ready(function() {

	var num = 0;
	$('.tool1').click(function() {
		if (num++ % 2 == 0) {
			if ($(".tool").attr("data-mark") == 1) {
				$(".tool").show(100);
				$(".tool").attr("data-mark", "2");
			} else {
				$(".tool").hide(100);
				$(".tool").attr("data-mark", "1");
			}

		} else {
			if ($(".tool").attr("data-mark") == 1) {
				$(".tool").show(100);
				$(".tool").attr("data-mark", "2");
			} else {
				$(".tool").hide(100);
				$(".tool").attr("data-mark", "1");
			}
		}
	});

	$(".add").click(function() {
		$(".tool").hide();
		$(".tool").attr("data-mark", "1");
	});


	$(".select").click(function() {
		$(".tool").hide();
		$(".tool").attr("data-mark", "1");
	});

	//物科使用清单
	$("#wksyqd").click(function() {
		$(".wksyqd").css("display", "block");
		$(".wklx").css("display", "none");
		$(".kcbj ").css("display", "none");
	});

	//物科流向
	$("#wklx").click(function() {
		$(".wksyqd").css("display", "none");
		$(".wklx").css("display", "block");
		$(".kcbj ").css("display", "none");
		setcharts();
	});

	//库存报警
	$("#kcbj").click(function() {
		$(".wksyqd").css("display", "none");
		$(".wklx").css("display", "none");
		$(".kcbj ").css("display", "block");
	});

});

function setcharts() {
	//同比
	var pieChart = echarts.init(document.getElementById('pieChart'));
	pieChart.setOption(pieOption);

	//区域
	var barChart = echarts.init(document.getElementById('barChart'));
	barChart.setOption(barOption);

	//环比
	var ringChart = echarts.init(document.getElementById('ringChart'));
	ringChart.setOption(ringOption);
}

var labelTop = {
	normal: {
		label: {
			show: true,
			position: 'center',
			formatter: '{b}',
			textStyle: {
				baseline: 'bottom'
			}
		},
		labelLine: {
			show: false
		}
	}
};
var labelFromatter = {
	normal: {
		label: {
			formatter: function(params) {
				return params.value
			},
			textStyle: {
				baseline: 'top'
			}
		}
	},
}
var labelBottom = {
	normal: {
		color: '#ccc',
		label: {
			show: true,
			position: 'center'
		},
		labelLine: {
			show: false
		}
	},
	emphasis: {
		color: 'rgba(0,0,0,0)'
	}
};
var radius = [40, 48];
ringOption = {
	legend: {
		x: 'center',
		y: 'bottom',
		data: [
			'', '', ''
		]
	},
	series: [{
		type: 'pie',
		center: ['15%', '50%'],
		radius: radius,
		x: '0%', // for funnel
		itemStyle: labelFromatter,
		data: [{
			name: 'other',
			value: 140,
			itemStyle: labelBottom
		}, {
			name: '11月物料使用',
			value: 54,
			itemStyle: labelTop
		}]
	}, {
		type: 'pie',
		center: ['50%', '50%'],
		radius: radius,
		x: '20%', // for funnel
		itemStyle: labelFromatter,
		data: [{
			name: 'other',
			value: 100,
			itemStyle: labelBottom
		}, {
			name: '10月物料使用',
			value: 44,
			itemStyle: labelTop
		}]
	}, {
		type: 'pie',
		center: ['85%', '50%'],
		radius: radius,
		x: '40%', // for funnel
		itemStyle: labelFromatter,
		data: [{
			name: 'other',
			value: 80,
			itemStyle: labelBottom
		}, {
			name: '9月物料使用',
			value: 35,
			itemStyle: labelTop
		}]
	}]
};


pieOption = {
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d})"
	},
	color: ['#733B9E', '#555', "#009CDA", "#CE8483"],
	legend: {
		orient: 'horizontal',
		x: 'center',
		y: 'bottom',
		data: ['', ''],
	},
	series: [{
		name: '销量',
		type: 'pie',
		radius: '85%',
		center: ['50%', '50%'],
		data: [{
			value: 2000,
			name: '常德'
		}, {
			value: 1600,
			name: '长沙'
		}, {
			value: 1400,
			name: '岳阳'
		}, {
			value: 1800,
			name: '怀化'
		}],
		itemStyle: {
			normal: {
				label: {
					position: 'inner',
					formatter: '{b} :{c}',
					textStyle: {
						fontSize: '12',
					}
				},
				labelLine: {
					show: false
				}
			},
		},
	}]
};


barOption = {

	tooltip: {
		trigger: 'item'
	},

	calculable: true,
	grid: {
		borderWidth: 0,
		y: 40,
		y2: 20,
		x: 80,
		x2: 60
	},
	xAxis: [{
		type: 'category',
		show: false,
		data: ['本期使用量', '同期使用量']
	}],
	yAxis: [{
		type: 'value',
		show: false
	}],
	series: [{
		name: '物料使用同比',
		type: 'bar',
		itemStyle: {
			normal: {
				color: function(params) {
					var colorList = [
						'#009CDA', '#FFB848'
					];
					return colorList[params.dataIndex]
				},
				label: {
					show: true,
					position: 'top',
					formatter: '{b}\n{c}'
				}
			}
		},
		data: [172.67, 141.82],

	}]
};