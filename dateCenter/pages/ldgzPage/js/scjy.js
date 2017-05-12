barOption = {

	tooltip: {
		trigger: 'item'
	},

	calculable: true,
	grid: {
		borderWidth: 0,
		y: 40,
		y2: 20,
		x: 60,
		x2: 60
	},
	xAxis: [{
		type: 'category',
		show: false,
		data: ['本期', '同期']
	}],
	yAxis: [{
		type: 'value',
		show: false,
	}],
	series: [{
		name: '年累计',
		type: 'bar',
		itemStyle: {
			normal: {
				color: function(params) {
					var colorList = [
						'#28B779', '#FFB848'
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

$(function() {
	$('#lnlsqk_chart').highcharts({

		chart: {
			type: 'column',
			options3d: {
				enabled: true,
				alpha: 10,
				beta: 10,
				viewDistance: 25,
				depth: 40,
			},
			marginTop: 60,
			marginRight: 40,
		},

		title: {
			text: '本年实现税利情况（亿元）'
		},

		xAxis: {
			categories: ['2011', '2012', '2013', '2014', '2015(1-6月)']
		},

		yAxis: {
			allowDecimals: false,
			min: 0,
			title: {
				text: ''
			}
		},
		credits: {
			enabled: false
		},
		tooltip: {
			headerFormat: '<b>{point.key}</b><br>',
			pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
		},

		plotOptions: {
			column: {
				stacking: 'normal',
				depth: 40
			},
		},

		series: [{
			name: '销售收入',
			data: [129.95, 140.49, 165.6, 202.75, 242.95],
			stack: 'male'
		}, {
			name: '税利合计',
			data: [78.63, 93.21, 110.12, 143.21, 178.74],
			stack: 'female'
		}]
	});
});

option = {
	tooltip: {
		formatter: "{a} <br/>{b} : {c}%"
	},
	series: [{
		name: '业务指标',
		type: 'gauge',
		splitNumber: 5, // 分割段数，默认为5
		axisLine: { // 坐标轴线
			lineStyle: { // 属性lineStyle控制线条样式
				color: [
					[0.2, '#28B779'],
					[0.8, '#8FC1DC'],
					[1, '#FFB848']
				],
				width: 6
			}
		},
		center: ['50%', '50%'], // 默认全局居中
		radius: 70,
		axisTick: { // 坐标轴小标记
			splitNumber: 10, // 每份split细分多少段
			length: 12, // 属性length控制线长
			lineStyle: { // 属性lineStyle控制线条样式
				color: 'auto'
			}
		},
		axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
			textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
				color: 'auto'
			}
		},
		splitLine: { // 分隔线
			show: true, // 默认显示，属性show控制显示与否
			length: 22, // 属性length控制线长
			lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
				color: 'auto'
			}
		},
		pointer: {
			width: 5
		},
		title: {
			show: true,
			offsetCenter: [0, '-40%'],
			textStyle: {
				fontWeight: 'bolder'
			}
		},
		detail: {
			formatter: '{value}%',
			textStyle: {
				color: 'auto',
				fontWeight: 'bolder',
				fontSize: '19'
			}
		},
		data: [{
			value: 73.4,
			name: ''
		}]
	}]
};

$(function() {
	$('#gjlxsqk_chart').highcharts({

		chart: {
			type: 'column',
			options3d: {
				enabled: true,
				alpha: 10,
				beta: 10,
				viewDistance: 25,
				depth: 40,
			},
			marginTop: 60,
			marginRight: 40,
		},

		title: {
			text: '各价类销售情况'
		},

		xAxis: {
			categories: ['一类烟', '二类烟', '三类烟', '四类烟', '五类烟']
		},

		yAxis: {
			allowDecimals: false,
			min: 0,
			title: {
				text: ''
			}
		},
		credits: {
			enabled: false
		},
		tooltip: {
			headerFormat: '<b>{point.key}</b><br>',
			pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
		},

		plotOptions: {
			column: {
				stacking: 'normal',
				depth: 40
			},
		},

		series: [{
			name: '本期比重',
			data: [129.95, 140.49, 165.6, 202.75, 242.95],
			stack: 'male'
		}, {
			name: '同期比重',
			data: [78.63, 93.21, 110.12, 143.21, 178.74],
			stack: 'female'
		}]
	});
});

$(function() {
	$('#cxqsfx_chart').highcharts({
		title: {
			text: '产销存趋势分析'
		},
		xAxis: {
			categories: ['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']
		},
		yAxis: {
			allowDecimals: false,
			min: 0,
			title: {
				text: ''
			}
		},

		credits: {
			enabled: false
		},
		tooltip: {
			formatter: function() {
				var s;
				if (this.point.name) { // the pie chart
					s = '' +
						this.point.name + ': ' + this.y + ' fruits';
				} else {
					s = '' +
						this.x + ': ' + this.y;
				}
				return s;
			}
		},
		labels: {
			items: [{
				html: '',
				style: {
					left: '40px',
					top: '8px',
					color: 'black'
				}
			}]
		},
		series: [{
			type: 'column',
			name: 'Jane',
			data: [3, 2, 1, 3, 4]
		}, {
			type: 'column',
			name: 'John',
			data: [2, 3, 5, 7, 6]
		}, {
			type: 'column',
			name: 'Joe',
			data: [4, 3, 3, 9, 0]
		}, {
			type: 'spline',
			name: 'Average',
			data: [3, 2.67, 3, 6.33, 3.33],
			marker: {
				lineWidth: 2,
				lineColor: Highcharts.getOptions().colors[3],
				fillColor: 'white'
			}
		}]
	});
});

	mapOption = {
    tooltip : {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        x:'left',
        data:['iphone3','iphone4','iphone5']
    },
    dataRange: {
        min: 0,
        max: 2500,
        x: 'left',
        y: 'bottom',
        text:['高','低'],
        calculable : true
    },

    series : [
        {
            name: 'iphone3',
            type: 'map',
            mapType: 'china',
            roam: false,
            itemStyle:{
                normal:{label:{show:true}},
                emphasis:{label:{show:true}}
            },
            data:[
                {name: '北京',value: Math.round(Math.random()*1000)},
                {name: '天津',value: Math.round(Math.random()*1000)},
                {name: '上海',value: Math.round(Math.random()*1000)},
                {name: '重庆',value: Math.round(Math.random()*1000)},
                {name: '河北',value: Math.round(Math.random()*1000)},
                {name: '河南',value: Math.round(Math.random()*1000)},
                {name: '云南',value: Math.round(Math.random()*1000)},
                {name: '辽宁',value: Math.round(Math.random()*1000)},
                {name: '黑龙江',value: Math.round(Math.random()*1000)},
                {name: '湖南',value: Math.round(Math.random()*1000)},
                {name: '安徽',value: Math.round(Math.random()*1000)},
                {name: '山东',value: Math.round(Math.random()*1000)},
                {name: '新疆',value: Math.round(Math.random()*1000)},
                {name: '江苏',value: Math.round(Math.random()*1000)},
                {name: '浙江',value: Math.round(Math.random()*1000)},
                {name: '江西',value: Math.round(Math.random()*1000)},
                {name: '湖北',value: Math.round(Math.random()*1000)},
                {name: '广西',value: Math.round(Math.random()*1000)},
                {name: '甘肃',value: Math.round(Math.random()*1000)},
                {name: '山西',value: Math.round(Math.random()*1000)},
                {name: '内蒙古',value: Math.round(Math.random()*1000)},
                {name: '陕西',value: Math.round(Math.random()*1000)},
                {name: '吉林',value: Math.round(Math.random()*1000)},
                {name: '福建',value: Math.round(Math.random()*1000)},
                {name: '贵州',value: Math.round(Math.random()*1000)},
                {name: '广东',value: Math.round(Math.random()*1000)},
                {name: '青海',value: Math.round(Math.random()*1000)},
                {name: '西藏',value: Math.round(Math.random()*1000)},
                {name: '四川',value: Math.round(Math.random()*1000)},
                {name: '宁夏',value: Math.round(Math.random()*1000)},
                {name: '海南',value: Math.round(Math.random()*1000)},
                {name: '台湾',value: Math.round(Math.random()*1000)},
                {name: '香港',value: Math.round(Math.random()*1000)},
                {name: '澳门',value: Math.round(Math.random()*1000)}
            ]
        },
        {
            name: 'iphone4',
            type: 'map',
            mapType: 'china',
            itemStyle:{
                normal:{label:{show:true}},
                emphasis:{label:{show:true}}
            },
            data:[
                {name: '北京',value: Math.round(Math.random()*1000)},
                {name: '天津',value: Math.round(Math.random()*1000)},
                {name: '上海',value: Math.round(Math.random()*1000)},
                {name: '重庆',value: Math.round(Math.random()*1000)},
                {name: '河北',value: Math.round(Math.random()*1000)},
                {name: '安徽',value: Math.round(Math.random()*1000)},
                {name: '新疆',value: Math.round(Math.random()*1000)},
                {name: '浙江',value: Math.round(Math.random()*1000)},
                {name: '江西',value: Math.round(Math.random()*1000)},
                {name: '山西',value: Math.round(Math.random()*1000)},
                {name: '内蒙古',value: Math.round(Math.random()*1000)},
                {name: '吉林',value: Math.round(Math.random()*1000)},
                {name: '福建',value: Math.round(Math.random()*1000)},
                {name: '广东',value: Math.round(Math.random()*1000)},
                {name: '西藏',value: Math.round(Math.random()*1000)},
                {name: '四川',value: Math.round(Math.random()*1000)},
                {name: '宁夏',value: Math.round(Math.random()*1000)},
                {name: '香港',value: Math.round(Math.random()*1000)},
                {name: '澳门',value: Math.round(Math.random()*1000)}
            ]
        },
        {
            name: 'iphone5',
            type: 'map',
            mapType: 'china',
            itemStyle:{
                normal:{label:{show:true}},
                emphasis:{label:{show:true}}
            },
            data:[
                {name: '北京',value: Math.round(Math.random()*1000)},
                {name: '天津',value: Math.round(Math.random()*1000)},
                {name: '上海',value: Math.round(Math.random()*1000)},
                {name: '广东',value: Math.round(Math.random()*1000)},
                {name: '台湾',value: Math.round(Math.random()*1000)},
                {name: '香港',value: Math.round(Math.random()*1000)},
                {name: '澳门',value: Math.round(Math.random()*1000)}
            ]
        }
    ]
};
