$().ready(function() {
	//加载预警信息
	loadAlertInfor();
})

$(function() {
	$('#quyu').highcharts({
		chart: {
			type: 'area',
			marginLeft: 58,
			marginRight: 20
		},
		title: {
			text: ''
		},
		credits: {
			enabled: false
		},
		legend: {
			enabled: false
		},
		subtitle: {
			text: ''
		},
		xAxis: {
			labels: {
				formatter: function() {
					return this.value;
				}
			}
		},
		yAxis: {
			title: {
				text: ''
			},
			labels: {
				formatter: function() {
					return this.value / 1000 + '%';
				}
			}
		},
		tooltip: {
			pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
		},
		plotOptions: {
			area: {
				pointStart: 1940,
				marker: {
					enabled: false,
					symbol: 'circle',
					radius: 2,
					states: {
						hover: {
							enabled: true
						}
					}
				}
			}
		},
		series: [{
			name: 'USA',
			data: [1436, 369, 32, 110, 369, 1005, 11, 32, 110, 235, 369, 640, 1005, 1436,
				2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126, 27387, 29459, 31056, 31982,
				32040, 31233, 29224, 27342, 26662, 26956, 27912, 28999, 28965, 27826, 25579,
				25722, 24826, 24605, 24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344,
				23586, 22380, 21004, 15468, 14747, 13076, 12555, 12144, 11009, 10950,
				10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104
			]
		}]
	});
});


$(function() {
	$('#ydxl').highcharts({
		chart: {
			type: 'line'
		},
		title: {
			text: ''
		},
		subtitle: {
			text: ''
		},
		credits: {
			enabled: false
		},
		legend: {
			enabled: false
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
				return '<b>' + this.series.name + '</b><br/>' + this.x + ': ' + this.y + '°C';
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
			name: 'Tokyo',
			data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
		}]
	});
});

/**
 * 加载预警信息
 */
function loadAlertInfor() {
	$.ajax({
		type: "POST",
		data: "handle=getAlertInfor",
		url: server_url,
		beforeSend: function(XMLHttpRequest) {
			//$("#loading_div").show();
		},
		complete: function(XMLHttpRequest, textStatus) {
			//$("#loading_div").hide();
		},
		success: function(msg) {
			$("#yujing").html(msg);
		}
	});
};