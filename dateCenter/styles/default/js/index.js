$(document).ready(function() {

	//默认 自有牌号
	chartAssignment(chanliang(50), taishan(20), syxl(30), gykc(13), sykc(29));
	num(50, 20, 30, 13, 29);

	//切换 单选 执行事件 ,并调用jygk()并传参数
	$(":radio").click(function() {

		//自有品牌
		if ($("#zyph").is(":checked")) {
			chartAssignment(chanliang(50), taishan(20), syxl(30), gykc(13), sykc(29));
			num(50, 20, 30, 13, 29);
		}
		//泰山品牌
		if ($("#tsph").is(":checked")) {
			chartAssignment(chanliang(30), taishan(90), syxl(50), gykc(73), sykc(39));
			num(30, 90, 50, 73, 39);
		}
		//三类以上品牌
		if ($("#slpp").is(":checked")) {
			chartAssignment(chanliang(50), taishan(20), syxl(30), gykc(13), sykc(29));
			num(50, 20, 30, 13, 29);
		}
		//一二类烟
		if ($("#yely").is(":checked")) {
			chartAssignment(chanliang(30), taishan(90), syxl(50), gykc(73), sykc(39));
			num(30, 90, 50, 73, 39);
		}
		//重点规格1
		if ($("#zdy").is(":checked")) {
			chartAssignment(chanliang(50), taishan(20), syxl(30), gykc(13), sykc(29));
			num(50, 20, 30, 13, 29);
		}
		//重点规格2
		if ($("#zde").is(":checked")) {
			chartAssignment(chanliang(30), taishan(90), syxl(50), gykc(73), sykc(39));
			num(30, 90, 50, 73, 39);
		}
	})
})

function num(value1, value2, value3, value4, value5) {
	$(".charts #cl_num").html(value1);
	$(".charts #gytbl_num").html(value2);
	$(".charts #syxl_num").html(value3);
	$(".charts #gykc_num").html(value4);
	$(".charts #sykc_num").html(value5);
};

//自有品牌合计
function chanliang(num) {
	cl0ption = {
		tooltip: {
			formatter: "{a} <br/>{b} : {c}%"
		},
		series: [{
			name: '业务指标',
			type: 'gauge',
			splitNumber: 5,
			axisLine: {
				lineStyle: {
					color: [
						[0.2, '#28B779'],
						[0.8, '#8FC1DC'],
						[1, '#FFB848']
					],
					width: 6
				}
			},
			center: ['50%', '55%'],
			radius: 60,
			axisTick: {
				splitNumber: 10,
				length: 12,
				lineStyle: {
					color: 'auto'
				}
			},
			axisLabel: {
				textStyle: {
					color: 'auto'
				}
			},
			splitLine: {
				show: true,
				length: 22,
				lineStyle: {
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
				formatter: '{value}',
				textStyle: {
					color: 'auto',
					fontSize: '17',
				}
			},
			data: [{
				value: num,
			}]
		}]
	};
	return cl0ption;
};

//泰山品牌
function taishan(num) {
	ts0ption = {
		tooltip: {
			formatter: "{a} <br/>{b} : {c}%"
		},
		series: [{
			name: '业务指标',
			type: 'gauge',
			splitNumber: 5,
			axisLine: {
				lineStyle: {
					color: [
						[0.2, '#28B779'],
						[0.8, '#8FC1DC'],
						[1, '#FFB848']
					],
					width: 6
				}
			},
			center: ['50%', '55%'],
			radius: 60,
			axisTick: {
				splitNumber: 10,
				length: 12,
				lineStyle: {
					color: 'auto'
				}
			},
			axisLabel: {
				textStyle: {
					color: 'auto'
				}
			},
			splitLine: {
				show: true,
				length: 22,
				lineStyle: {
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
				formatter: '{value}',
				textStyle: {
					color: 'auto',
					fontSize: '17',
				}
			},
			data: [{
				value: num,
			}]
		}]
	};
	return ts0ption;
};

//商业销量
function syxl(num) {
	syxl0ption = {
		tooltip: {
			formatter: "{a} <br/>{b} : {c}%"
		},
		series: [{
			name: '业务指标',
			type: 'gauge',
			splitNumber: 5,
			axisLine: {
				lineStyle: {
					color: [
						[0.2, '#28B779'],
						[0.8, '#8FC1DC'],
						[1, '#FFB848']
					],
					width: 6
				}
			},
			center: ['50%', '55%'],
			radius: 60,
			axisTick: {
				splitNumber: 10,
				length: 12,
				lineStyle: {
					color: 'auto'
				}
			},
			axisLabel: {
				textStyle: {
					color: 'auto'
				}
			},
			splitLine: {
				show: true,
				length: 22,
				lineStyle: {
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
				formatter: '{value}',
				textStyle: {
					color: 'auto',
					fontSize: '17',
				}
			},
			data: [{
				value: num,
			}]
		}]
	};
	return syxl0ption;
};

//商业销量
function gykc(num) {
	gykc0ption = {
		tooltip: {
			formatter: "{a} <br/>{b} : {c}%"
		},
		series: [{
			name: '业务指标',
			type: 'gauge',
			splitNumber: 5,
			axisLine: {
				lineStyle: {
					color: [
						[0.2, '#28B779'],
						[0.8, '#8FC1DC'],
						[1, '#FFB848']
					],
					width: 6
				}
			},
			center: ['50%', '55%'],
			radius: 60,
			axisTick: {
				splitNumber: 10,
				length: 12,
				lineStyle: {
					color: 'auto'
				}
			},
			axisLabel: {
				textStyle: {
					color: 'auto'
				}
			},
			splitLine: {
				show: true,
				length: 22,
				lineStyle: {
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
				formatter: '{value}',
				textStyle: {
					color: 'auto',
					fontSize: '17',
				}
			},
			data: [{
				value: num,
			}]
		}]
	};
	return gykc0ption;
};

//商业库存
function sykc(num) {
	sykc0ption = {
		tooltip: {
			formatter: "{a} <br/>{b} : {c}%"
		},
		series: [{
			name: '业务指标',
			type: 'gauge',
			splitNumber: 5,
			axisLine: {
				lineStyle: {
					color: [
						[0.2, '#28B779'],
						[0.8, '#8FC1DC'],
						[1, '#FFB848']
					],
					width: 6
				}
			},
			center: ['50%', '55%'],
			radius: 60,
			axisTick: {
				splitNumber: 10,
				length: 12,
				lineStyle: {
					color: 'auto'
				}
			},
			axisLabel: {
				textStyle: {
					color: 'auto'
				}
			},
			splitLine: {
				show: true,
				length: 22,
				lineStyle: {
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
				formatter: '{value}',
				textStyle: {
					color: 'auto',
					fontSize: '17',
				}
			},
			data: [{
				value: num,
			}]
		}]
	};
	return sykc0ption;
};

function chartAssignment(option1, option2, option3, option4, option5) {
	var clChert = echarts.init(document.getElementById('cl'));
	clChert.setOption(option1);

	var gytbl = echarts.init(document.getElementById('gytbl'));
	gytbl.setOption(option2);

	var syxl = echarts.init(document.getElementById('syxl'));
	syxl.setOption(option3);

	var gykc = echarts.init(document.getElementById('gykc'));
	gykc.setOption(option4);

	var sykc = echarts.init(document.getElementById('sykc'));
	sykc.setOption(option5);
};

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

option = {
	grid: {
		borderWidth: 0,
		y: 25,
		y2: 35,
		x: 20,
		x2: 20
	},
	xAxis: [{
		type: 'category',
		show: true,
		data: ['本期', '同期'],
		splitLine: {
			show: false
		}
	}],
	yAxis: [{
		type: 'value',
		show: false,
		splitLine: {
			show: false
		}
	}],
	series: [{
		name: '年累计',
		type: 'bar',
		itemStyle: {
			normal: {
				color: function(params) {
					var colorList = [
						'#87D7A5', '#00ADC7'
					];
					return colorList[params.dataIndex]
				},
				label: {
					show: true,
					position: 'top',
					formatter: '{c}亿元'
				}
			}
		},
		data: [172.67, 141.82],
	}]
};

meter = {
	tooltip: {
		formatter: "{a}: {c}万箱"
	},
	series: [{
		name: '完成情况',
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
		min: 0,
		max: 2000,
		startAngle: 195,
		endAngle: -15,
		center: ['50%', '75%'], // 默认全局居中
		radius: 90,
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
			value: 873.4,
		}]
	}]
};