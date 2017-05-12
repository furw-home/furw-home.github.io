$().ready(function() {

	//基本信息
	$("#jbxx").click(function() {
		$(".jbxx").css("display", "block");
		$(".jgfx").css("display", "none");
	});

	//价格分析
	$("#jgfx").click(function() {
		$(".jbxx").css("display", "none");
		$(".jgfx").css("display", "block");
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

	//近期价格统计
	var jqjgtj = echarts.init(document.getElementById('jqjgtj'));
	jqjgtj.setOption(jqjgtjOption);

	//近期价格倒挂
	var jgdg = echarts.init(document.getElementById('jgdg'));
	jgdg.setOption(jgdgOption);

}

jgdgOption = {
	legend: {
		data: ['成本价', '倒挂价'],
		y: 'top',
		x: 'right'
	},
	calculable: false,
	grid: {
		x: 30,
		y: 50,
		x2: 10,
		y2: 60,
		borderColor: 'white',
	},
	xAxis: [{
		type: 'category',
		data: ['12-3', '12-5', '12-7'],
		axisLine: {
			lineStyle: {
				color: '#ccc',
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
		axisLine: {
			lineStyle: {
				color: '#ccc',
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
		name: '成本价',
		type: 'bar',
		data: [76.7, 60.4, 34.6, 29.8, 18.7, 19.4],
		itemStyle: {
			normal: {
				label: {
					show: true,
				},
				color: '#28B779',
			},
		},
	}, {
		name: '倒挂价',
		type: 'bar',
		data: [70.7, 50.4, 29.16, 26.8, 13.7, 11.4],
		itemStyle: {
			normal: {
				label: {
					show: true,
				},
				color: '#FFB848',
			},
		},
	}]
};

jqjgtjOption = {
	legend: {
		data: ['', ''],
		y: 'bottom',
	},
	grid: {
		x: 20,
		y: 15,
		x2: 5,
		y2: 50,
		borderColor: 'white',
	},
	xAxis: [{
		type: 'category',
		data: ['12-2', '12-3', '12-4', '12-5', '12-6', '12-7'],
		axisLine: {
			lineStyle: {
				color: '#ccc',
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
		axisLine: {
			lineStyle: {
				color: '#ccc',
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
		name: '降水量',
		type: 'line',
		data: [30.7, 40.4, 34.16, 26.8, 33.7, 21.4],
		itemStyle: {
			normal: {
				label: {
					show: true,
				},
				color: '#FFB848',
			},
		},

	}]
};