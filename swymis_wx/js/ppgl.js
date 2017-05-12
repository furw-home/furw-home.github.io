$().ready(function() {

	$("#jbxx").click(function() {
		$(".jbxx").css("display", "block");
		$(".gylfx").css("display", "none");
		$(".wdhy").css("display", "none");
	});

	$("#gylfx").click(function() {
		$(".jbxx").css("display", "none");
		$(".gylfx").css("display", "block");
		$(".wdhy").css("display", "none");
	});

	$("#wdhy").click(function() {
		$(".jbxx").css("display", "none");
		$(".gylfx").css("display", "none");
		$(".wdhy").css("display", "block");
	});

	$(".brand_list li").each(function() {
		$(this).click(function() {
			$(".brand_list .brand_list_menu").removeClass("brand_list_menu");
			$(this).addClass("brand_list_menu");
			return false; //防止页面跳转  
		});
	});

	setcharts();
});

function setcharts() {
	//同比
	var pieChart = echarts.init(document.getElementById('hyfxqk'));
	pieChart.setOption(pieOption);

	//区域
	var barChart = echarts.init(document.getElementById('hyqkydbh'));
	barChart.setOption(barOption);

	//货源流出
	var hylc = echarts.init(document.getElementById('hylc'));
	hylc.setOption(hylcOption);

	//货源流入
	var hylr = echarts.init(document.getElementById('hylr'));
	hylr.setOption(hylrOption);
}

pieOption = {
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d})"
	},
	color: ['#C0A16B', '#4CAE4C', "#CE8483"],
	legend: {
		orient: 'horizontal',
		x: 'center',
		y: 'bottom',
		data: ['', ''],
	},
	series: [{
		name: '销量',
		type: 'pie',
		radius: '80%',
		center: ['50%', '50%'],
		data: [{
			value: 2000,
			name: '偏紧'
		}, {
			value: 1600,
			name: '充足'
		}, {
			value: 1400,
			name: '紧缺'
		}],
		itemStyle: {
			normal: {
				label: {
					position: 'inner',
					formatter: '{b}:{d}%',
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


barOption = {
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		data: ['充足', '紧缺', '偏紧'],
		y: 'top',
		x: 'right',
	},
	grid: {
		borderWidth: 0,
		y: 30,
		y2: 20,
		x: 20,
		x2: 5
	},
	xAxis: [{
		type: 'category',
		boundaryGap: false,
		data: ['1', '2', '3', '4', '5', '6', '7'],
		axisLine: {
			lineStyle: {
				color: '#ccc',
				width: 1,
				type: 'solid'
			},
		},
		splitLine: {
			lineStyle: {
				color: ['white'],
				width: 1,
				type: 'solid'
			},
		},
	}],
	yAxis: [{
		type: 'value',
		axisLine: {
			lineStyle: {
				color: '#ccc',
				width: 1,
				type: 'solid'
			},
		},
		splitLine: {
			lineStyle: {
				color: ['white'],
				width: 1,
				type: 'solid'
			},
		},
	}],
	series: [{
		name: '充足',
		type: 'line',
		data: [12, 13, 10, 13, 20, 16, 11]
	}, {
		name: '紧缺',
		type: 'line',
		data: [22, 18, 19, 23, 14, 24, 15]
	}, {
		name: '偏紧',
		type: 'line',
		data: [15, 23, 20, 15, 19, 33, 41]
	}]
};


hylcOption = {
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d})"
	},
	color: ['#C0A16B', '#4CAE4C', "#CE8483", '#4D4D4D'],
	legend: {
		orient: 'horizontal',
		x: 'left',
		y: 'bottom',
		data: ['常德市', '长沙市', '邵阳市', '株洲市'],
	},
	series: [{
		name: '销量',
		type: 'pie',
		radius: '60%',
		center: ['50%', '40%'],
		data: [{
			value: 324,
			name: '常德市'
		}, {
			value: 354,
			name: '长沙市'
		}, {
			value: 345,
			name: '邵阳市'
		}, {
			value: 234,
			name: '株洲市'
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


hylrOption = {
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d})"
	},
	color: ['#C0A16B', '#FFAD6D', "#CE8483", '#23CCFE'],
	legend: {
		orient: 'horizontal',
		x: 'left',
		y: 'bottom',
		data: ['常德市', '长沙市', '邵阳市', '株洲市'],
	},
	series: [{
		name: '销量',
		type: 'pie',
		radius: '60%',
		center: ['50%', '40%'],
		data: [{
			value: 324,
			name: '常德市'
		}, {
			value: 354,
			name: '长沙市'
		}, {
			value: 345,
			name: '邵阳市'
		}, {
			value: 234,
			name: '株洲市'
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