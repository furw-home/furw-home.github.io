(function() {

	* //文档

	* // Grid 的 scrollable属性 为true时 grid行下标从0开始，为false时 下标从1开始。  

	* //grid config 配置
	config = {
		dataSouce: "url", //URL
		divId: "divId", //grid id
		sortable: false, // 排序
		pageable: true, //分页
		setBgColor: true, // 根据条件可 配置grid 行背景色 （ 无此功能可忽略 ）
		scrollable: true, //可滚动 （ 可选默认为 false ）
		queryCondition: { //默认参数 （ 无默认参数可忽略 ）
			"Year": _year,
			"Month": _month
		},
		statistical: true, //是否需要统计  ( 无统计功能可忽略 )
		callback // 回调函数1 统计回调函数   ( 无统计功能可忽略)  
		callback2 // 回调函数 2 
	};

	* //下拉框 config 配置
	config = {
		divId: "divId", //下拉框 id
		_pm: "parameter", //参数  （ 1个参数时可直接赋值, 多个参数时拼接 js对象，在赋值, 无参数可忽略 ）
		_id_multi_select: true, // ( 值为true 为复选框, false 为单选框, 默认false )
		_isAddAll: true, // （ 为true 时会在下拉框末级拼接全部属性 value 为-2, 无此需求可忽略 ）
		_url: "url", //url
		callback: callback //下拉框改变事件 回调
	};

})();