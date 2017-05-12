//省内销量饼图
$(function() {
	$('#snPie').highcharts({
		chart: {
			type: 'pie',
			options3d: {
				enabled: true,
				alpha: 45,
				beta: 0
			},
			marginTop: 0,
			marginRight: 10,
		},
		credits: {
			enabled: false
		},
		title: {
			text: ''
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				depth: 35,
				dataLabels: {
					enabled: true,
					format: '{point.name}'
				},
				colors: ['#5C5C61', '#95CEFF'],
			}
		},
		series: [{
			type: 'pie',
			name: '销量',
			data: [
				['还差', 26.8],
				['已售', 45.0],
			]
		}]
	});
});

//省外销量饼图
$(function() {
	$('#swPie').highcharts({
		chart: {
			type: 'pie',
			options3d: {
				enabled: true,
				alpha: 45,
				beta: 0
			},
			marginTop: 0,
			marginRight: 10,
		},
		credits: {
			enabled: false
		},
		title: {
			text: ''
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				depth: 35,
				dataLabels: {
					enabled: true,
					format: '{point.name}'
				},
				colors: ['#5C5C61', '#95CEFF'],
			}
		},
		series: [{
			type: 'pie',
			name: '销量',
			data: [
				['还差', 26.8],
				['已售', 45.0],
			]
		}]
	});
});

//高档竞品销售情况
$(function() {
	$('#gdjpxsqk').highcharts({
		chart: {
			type: 'column',
			options3d: {
				enabled: true,
				alpha: 10,
				beta: 10,
				viewDistance: 25,
				depth: 40
			},
			marginTop: 20,
			marginRight: 40,
			marginBottom: 75,

		},
		title: {
			text: ''
		},
		credits: {
			enabled: false
		},
		xAxis: {
			categories: ['利群', '玉溪', '芙蓉王', '黄鹤楼', '中华']
		},
		yAxis: {
			allowDecimals: false,

			min: 0,
			title: {
				text: ''
			},
//			tickPositions: [0  , 20, 50, 100],
			categories: ['10m', '20m', '30m', '40m', '50m']
//			categories: ['', 'Bananas', 'Oranges', '111']

		},
		tooltip: {
			headerFormat: '<b>{point.key}</b><br>',
			pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
		},
		plotOptions: {
			column: {
				stacking: 'normal',
				depth: 40
			}
		},
		series: [{
			name: '销量',
			data: [10, 20, 33, 23, 40],
			stack: 'male'
		}, {
			name: '同比',
			data: [23, 10, 24, 34, 3],
			stack: 'female'
		}]
	});
});

$(function() {
	$('#zdxsqk').highcharts({
		chart: {
			type: 'column',
			options3d: {
				enabled: true,
				alpha: 10,
				beta: 10,
				viewDistance: 25,
				depth: 40
			},
			marginTop: 30,
			marginRight: 40
		},
		credits: {
			enabled: false
		},
		title: {
			text: ''
		},
		xAxis: {
			categories: ['利群', '玉溪', '芙蓉王', '黄鹤楼', '中华']
		},

		yAxis: {
			allowDecimals: false,
			min: 0,
			title: {
				text: ''
			}
		},
		tooltip: {
			headerFormat: '<b>{point.key}</b><br>',
			pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
		},
		plotOptions: {
			column: {
				stacking: 'normal',
				depth: 40
			}
		},
		series: [{
			name: '销量',
			data: [10, 20, 33, 23, 40],
			stack: 'male'
		}, {
			name: '同比%',
			data: [23, 10, 24, 34, 3],
			stack: 'female'
		}]
	});
});