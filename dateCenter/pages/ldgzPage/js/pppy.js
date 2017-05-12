option = {
	tooltip: {
		formatter: "{a} <br/>{b} : {c}%"
	},
	series: [{
		name: '业务指标',
		type: 'gauge',
		splitNumber: 10, // 分割段数，默认为5
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
		center: ['50%', '55%'], // 默认全局居中
		radius: 100,
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
				fontWeight: 'bolder'
			}
		},
		data: [{
			value: 73.4,
			name: '完成率'
		}]
	}]
};

$(function() {
	$('#ndxyxsqk').highcharts({

		chart: {
			type: 'column',
			options3d: {
				enabled: true,
				alpha: 10,
				beta: 10,
				viewDistance: 25,
				depth: 40,
			},
			marginTop: 50,
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
			name: '销量',
			data: [45, 155.85, 85.85, 95.57, 62.6],
			stack: 'male'
		}, {
			name: '占有率(%)',
			data: [10.34, 11.82, 12.76, 13.15, 14.68],
			stack: 'female'
		}]
	});
});


barOption1 = {
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		data: ['调拨171以上', '批发600以上'],
		y: 'top',
		x: 'right'
	},
	calculable: true,
	grid: {
		x: 30,
		y: 50,
		x2: 10,
		y2: 30,
		//			borderColor: '#ebebeb',
		borderColor: 'whitesmoke',
	},
	xAxis: [{
		type: 'category',
		data: ['产量', '调拨量', '商业销量', '工业库存'],
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
		name: '调拨171以上',
		type: 'bar',
		data: [8.6, 8.97, 8.9, 2.3],
		itemStyle: {
			normal: {
				label: {
					show: true,
				},
				color: '#28B779',
			},
		},
	}, {
		name: '批发600以上',
		type: 'bar',
		data: [4.34, 4.82, 4.76, 1.15],
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


mapOption = {
    tooltip : {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        x:'left',
        data:['销量 （5,000 - 10,000）','销量 （10,000 - 30,0000）','销量（30，000+）']
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
            name: '销量 （5,000 - 10,000）',
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
            name: '销量 （10,000 - 30,0000）',
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
            name: '销量（30，000+）',
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
