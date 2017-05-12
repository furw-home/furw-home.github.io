//打开工具栏
function openTool() {
	var nums = 0;
	$(".sidebar_icon").click(function() {
		$(".sidebar_icon").css("display", "none");
		if (nums++ % 2 == 0) {
			if ($(".right_sidebar").css("margin-right") == "0px") {
				$(".right_sidebar").attr("style", "margin-right:-190px");
			} else {
				$(".right_sidebar").attr("style", "margin-right:0px");
			}
		} else {
			if ($(".right_sidebar").css("margin-right") == "0px") {
				$(".right_sidebar").attr("style", "margin-right:-190px");
			} else {
				$(".right_sidebar").attr("style", "margin-right:0px");
			}
		}
	});

	$(".tool_title").click(function() {
		$(".right_sidebar").attr("style", "margin-right:-190px");
		$(".sidebar_icon").css("display", "block");
	});
};

//表格操作
function tableOption() {
	optionTableColor();
	// 隐藏选中行
	$(".hiddenLine").click(function() {
		hiddenRows(curtable);
	});
	//显示隐藏行
	$(".showLine").click(function() {
		showHiddenRows(curtable);
	});
	//隐藏选中列
	$(".hiddenColumns").click(function() {
		hiddenCol(curtable, curCol);
	});

	//显示隐藏列
	$(".showColumns").click(function() {
		showHiddenCol(curtable);
	});

	//隐藏其他列
	$(".hideOtherColumns").click(function() {
		hideOtherCol(curtable, curCol);
	});

	//隐藏其他行
	$(".hideOtherLines").click(function() {
		hideOtherRows(curtable);
	});

	//选择列标红
	$(".columnColor").click(function() {
		selectColRed(curtable);
	});

	//选择行标红
	$(".rowColor").click(function() {
		selectRowRed(curtable);
	});
}

/**
 * 隐藏选中table的行
 * @param {Object} curtable
 */
function hiddenRows(curtable) {
	for (i = 0; i < $("#" + curtable + " tr").length; i++) {
		var checked = $("#" + curtable + " tr:eq(" + (i + 1) + ")").find("td input").prop("checked");
		if (checked) {
			$("#" + curtable + " tr:eq(" + (i + 1) + ")").css("display", "none");
		}
	}
};

/**
 * 隐藏选中table的列
 * @param {Object} curtable
 */
function hiddenCol(curtable, curCol) {
	for (var y = 0; y < $("." + curtable + " .ui-jqgrid-htable th").length; y++) {
		//隐藏当前被标记颜色的列
		if ($("." + curtable + " .ui-jqgrid-htable th:eq(" + y + ")").css("background-color") == "rgb(2, 189, 133)") {
			//移除标头
			$("." + curtable + " .ui-jqgrid-htable th:eq(" + y + ")").css("display", "none");
			//移除对应的列
			for (var i = 0; i < $("#" + curtable + " tr").length; i++) {
				if ($("#" + curtable + " tr:eq(" + i + ")").find("td:eq(" + y + ")").index() == curCol) {
					$("#" + curtable + " tr:eq(" + i + ")").find("td:eq(" + y + ")").css("display", "none");
				}
			}
		}
	}
};

/**
 * 显示隐藏行
 * @param {Object} curtable
 */
function showHiddenRows(id) {
	for (i = 0; i < $("#" + id + " tr").length; i++) {
		$("#" + id + " tr:eq(" + (i + 1) + ")").css("display", "");
	}
};

/**
 * 显示隐藏列
 * @param {Object} curtable
 */
function showHiddenCol(curtable) {
	for (var y = 0; y < $("." + curtable + " .ui-jqgrid-htable th").length; y++) {
		$("." + curtable + " .ui-jqgrid-htable th:eq(" + y + ")").css("display", "");
	}
	for (i = 0; i < $("#" + curtable + " tr").length; i++) {
		for (j = 0; j < $("#" + curtable + " tr:eq(" + i + ")").find("td").length; j++) {
			$("#" + curtable + " tr:eq(" + i + ")").find("td:eq(" + j + ")").css("display", "");
		}
	}
}

/**
 * 列选中
 * @param {Object} colObj
 */
function colSelect(colObj) {
	$(".ui-jqgrid-htable th").css("background", "");
	$(".ui-jqgrid-htable th").css("color", "");
	$(colObj).css("background", "#02BD85");
	$(colObj).css("color", "white");
}


//设置超标数据 行背景色
var mbz = 2080; //目标值 , 需要后台提供
function testJqfrid() {
	var obj = $("#list1").jqGrid("getRowData");
	for (i = 0; i < obj.length; i++) {
		if (obj[i].number <= mbz) {
			$("#list1 tr:eq(" + (i + 1) + ")").css("background", "#FE8463");
			$("#list1 tr:eq(" + (i + 1) + ")").css("color", "white");
		}
	}
}
/**
 * 隐藏其他列
 * @param {Object} colObj
 */
function hideOtherCol(cls, thIndex) {
	for (y = 0; y < $("." + cls + " .ui-jqgrid-htable th").length; y++) {
		if ($("." + cls + " .ui-jqgrid-htable th:eq(" + y + ")").index() == thIndex) {} else {
			$("." + cls + " .ui-jqgrid-htable th:eq(" + y + ")").css("display", "none");
		}
	}
	for (i = 0; i < $("#" + cls + " tr").length; i++) {
		for (j = 0; j < $("#" + cls + " tr:eq(" + i + ")").find("td").length; j++) {
			if ($("#" + cls + " tr:eq(" + i + ")").find("td:eq(" + j + ")").index() == thIndex) {} else {
				$("#" + cls + " tr:eq(" + i + ")").find("td:eq(" + j + ")").css("display", "none");
			}
		}
	}
};

/**
 * 选中列标红
 * @param {Object} colObj
 */
function selectColRed(cls) {
	for (y = 0; y < $("." + cls + " .ui-jqgrid-htable th").length; y++) {
		//标色当前被标记颜色的列
		if ($("." + cls + " .ui-jqgrid-htable th:eq(" + y + ")").css("background-color") == "rgb(2, 189, 133)") {
			for (i = 0; i < $("#" + cls + " tr").length; i++) {
				$("#" + cls + " tr:eq(" + i + ")").find("td:eq(" + y + ")").css("background", "#FE8463");
				$("#" + cls + " tr:eq(" + i + ")").find("td:eq(" + y + ")").css("color", "white");
			}
		}
	}
};

/**
 * 隐藏其他行
 * @param {Object} colObj
 */
function hideOtherRows(id) {
	for (i = 0; i < $("#" + id + " tr").length; i++) {
		var checked = $("#" + id + " tr:eq(" + (i + 1) + ")").find("td input").prop("checked");
		if (checked) {} else {
			$("#" + id + " tr:eq(" + (i + 1) + ")").css("display", "none");
		}
	}
}

/**
 * 行标红
 * @param {Object} colObj
 */
function selectRowRed(id) {
	for (i = 0; i < $("#" + id + " tr").length; i++) {
		var checked = $("#" + id + " tr:eq(" + (i + 1) + ")").find("td input").prop("checked");
		if (checked) {
			$("#" + id + " tr:eq(" + (i + 1) + ")").css("background", "#FE8463");
			$("#" + id + " tr:eq(" + (i + 1) + ")").css("color", "white");
		} else {}
	}
}

//动态加载右侧工具栏
function loadRightSidebar() {
	$(".right_sidebar").attr("style", "margin-right:0px");
	$(".table0peration_head i").attr("class", "glyphicon glyphicon-chevron-up");
	$(".table0peration_content").css("display", "block");

	if ($(".sales_areas").is(":hidden")) {} else {
		$(".select_sales_areas span").attr("class", "am-icon-angle-down");
		$(".sales_areas").css("display", "none");
	}
	if ($(".dimension_list").is(":hidden")) {} else {
		$(".grade_head i").attr("class", "glyphicon glyphicon-chevron-down");
		$(".dimension_list").css("display", "none");
	}
	if ($(".production_content").is(":hidden")) {} else {
		$(".production_head i").attr("class", "glyphicon glyphicon-chevron-down");
		$(".production_content").css("display", "none");
	}
	if ($(".zywd_content").is(":hidden")) {} else {
		$(".zywd_head i").attr("class", "glyphicon glyphicon-chevron-down");
		$(".zywd_content").css("display", "none");
	}
	if ($(".chart_content").is(":hidden")) {} else {
		$(".chart_head i").attr("class", "glyphicon glyphicon-chevron-down");
		$(".chart_content").css("display", "none");
	}
};

//图表操作
function setChart() {
	var num = 0;
	$(".chart_head").click(function() {
		if (num++ % 2 == 0) {

			if ($(".chart_content").is(":hidden")) {
				$(".chart_head i").attr("class", "glyphicon glyphicon-chevron-up");
				$(".chart_content").css("display", "block");
			} else {
				$(".chart_head i").attr("class", "glyphicon glyphicon-chevron-down");
				$(".chart_content").css("display", "none");
			}

		} else {
			if ($(".chart_content").is(":hidden")) {
				$(".chart_head i").attr("class", "glyphicon glyphicon-chevron-up");
				$(".chart_content").css("display", "block");
			} else {
				$(".chart_head i").attr("class", "glyphicon glyphicon-chevron-down");
				$(".chart_content ").css("display", "none");
			}
		}
	});

	$(".chart_content li").each(function() {
		$(this).click(function() {
			$(".chart_content li").css("border", "");
			$(this).css("border", "1px solid red");
		});

	});
}

//表格操作
function setTable0peration() {
	var num = 0;
	$(".table0peration_head").click(function() {
		if (num++ % 2 == 0) {

			if ($(".table0peration_content").is(":hidden")) {
				$(".table0peration_head i").attr("class", "glyphicon glyphicon-chevron-up");
				$(".table0peration_content").css("display", "block");
			} else {
				$(".table0peration_head i").attr("class", "glyphicon glyphicon-chevron-down");
				$(".table0peration_content").css("display", "none");
			}

		} else {
			if ($(".table0peration_content").is(":hidden")) {
				$(".table0peration_head i").attr("class", "glyphicon glyphicon-chevron-up");
				$(".table0peration_content").css("display", "block");
			} else {
				$(".table0peration_head i").attr("class", "glyphicon glyphicon-chevron-down");
				$(".table0peration_content").css("display", "none");
			}
		}
	});
	$(".table0peration_content li").each(function() {
		$(this).click(function() {
			$(".table0peration_content li").css("background", "");
			$(".table0peration_content li").css("color", "");
			$(this).css("background", "#F0AD4E");
			$(this).css("color", "white");
		});
	});
}

//中烟维度
function setZywd() {

	var zNodes = "../json/zywd.json";
	$.ajax({
		type: 'get',
		url: zNodes,
		dataType: 'json',
		success: function(data) {
			setZywdList(data);
		}
	});

	var num = 0;
	$(".zywd_head").click(function() {
		if (num++ % 2 == 0) {

			if ($(".zywd_content").is(":hidden")) {
				$(".zywd_head i").attr("class", "glyphicon glyphicon-chevron-up");
				$(".zywd_content").css("display", "block");
			} else {
				$(".grade_head i").attr("class", "glyphicon glyphicon-chevron-down");
				$(".zywd_content").css("display", "none");
			}

		} else {
			if ($(".zywd_content").is(":hidden")) {
				$(".zywd_head i").attr("class", "glyphicon glyphicon-chevron-up");
				$(".zywd_content").css("display", "block");
			} else {
				$(".zywd_head i").attr("class", "glyphicon glyphicon-chevron-down");
				$(".zywd_content").css("display", "none");
			}
		}
	});

	function setZywdList(data) {
		for (i = 0; i < data.length; i++) {
			$(".zywd_content ul").append("<li ttitle='" + data[i].name + "'>" + data[i].name + "</li>");
		}
		$(".zywd_content li").each(function() {
			$(this).click(function() {
				$(".zywd li").css("background", "");
				$(".zywd li").css("color", "");
				$(this).css("background", "#F0AD4E");
				$(this).css("color", "white");
			});
		});
	}
};
//牌号选择
function setGrade() {
	$(".confirm").click(function() {
		var GradeList = new Array($(".grade_frame li").length);
		for (i = 0; i < $(".grade_frame li").length; i++) {
			GradeList[i] = $(".grade_frame li:eq(" + i + ")").html();
		}
		alert(GradeList);
	});
	var num = 0;
	$(".grade_head").click(function() {
		if (num++ % 2 == 0) {

			if ($(".dimension_list").is(":hidden")) {
				$(".grade_head i").attr("class", "glyphicon glyphicon-chevron-up");
				$(".dimension_list").css("display", "block");
			} else {
				$(".grade_head i").attr("class", "glyphicon glyphicon-chevron-down");
				$(".dimension_list").css("display", "none");
			}

		} else {
			if ($(".dimension_list").is(":hidden")) {
				$(".grade_head i").attr("class", "glyphicon glyphicon-chevron-up");
				$(".dimension_list").css("display", "block");
			} else {
				$(".grade_head i").attr("class", "glyphicon glyphicon-chevron-down");
				$(".dimension_list").css("display", "none");
			}
		}
	});
	var zNodes = "json/grade.json";
	$.ajax({
		type: 'get',
		url: server_url + '?handle=getWidget&type=paihao',
		dataType: 'json',
		success: function(data) {
			addGrade(data);
		}
	});
	setGradeColor();
};
//加载二级列表
var index;

function addGrade(data) {
	$(".list_2 li").dblclick(function() {
		index = $(this).index();
		$(".dimension_content").html("");
		$(".back").css("display", "block");
		for (i = 0; i < data[index].children.length; i++) {
			$(".dimension_content").append("<li title='" + data[index].children[i].name + "'>" + data[index].children[i].name + "</li>");
			$(".dimension_content li").css("background", "#23ABF0");
			$(".dimension_content li").css("color", "white");
		}
		reverse_selection(data, index); //取消选中
		back(data, index); //返回上一级
	});
};
//返回上一级
function back(data, index) {
	$(".back").click(function() {
		$(".dimension_content").html("");
		$(".back").css("display", "none");
		$(".dimension_content").css("overflow-x", "hidden");
		$(".dimension_content").append("<ul class='list_1'><li title='三类及以上' class='box'>三类及以上</li><li title='零售百元以上' class='box' style='line-height: 30px;font-size: 11px;'>零售百元以上</li><li title='硬包' class='box'>硬包</li><li title='软包' class='box'>软包</li></ul><ul class='list_2'><li title='价类' class='box'>价类</li><li title='品牌' class='box'>品牌</li><li title='重点品牌' class='box'>重点品牌</li><li title='牌号' class='box'>牌号</li></ul>");
		for (j = 0; j < $(".grade_frame li").length; j++) {
			if (data[index].grade == $(".grade_frame li:eq(" + j + ")").html()) {
				$(".dimension_content").find("li[title =" + $(".grade_frame li:eq(" + j + ")").html() + "]").css("background", "#23ABF0");
				$(".dimension_content").find("li[title =" + $(".grade_frame li:eq(" + j + ")").html() + "]").css("color", "white");
				$(".dimension_content").find("li[title =" + $(".grade_frame li:eq(" + j + ")").html() + "]").css("border", "0");
			} else {
				$(".dimension_content").find("li[title =" + data[index].grade + "]").css("background", "#FE8463");
				$(".dimension_content").find("li[title =" + data[index].grade + "]").css("color", "white");
				$(".dimension_content").find("li[title =" + data[index].grade + "]").css("border", "0");
			}
		}
		$(".list_2 li").dblclick(function() {
			index = $(this).index();
			$(".dimension_content").html("");
			$(".back").css("display", "block");
			for (i = 0; i < data[index].children.length; i++) {
				$(".dimension_content").append("<li title='" + data[index].children[i].name + "'>" + data[index].children[i].name + "</li>");
				$(".dimension_content li").css("background", "#23ABF0");
				$(".dimension_content li").css("color", "white");
			}
			reverse_selection(data, index); //取消选中
		});
		setGradeColor();
	});
};
//选中一级列表至颜色
function setGradeColor() {
	$(".dimension_content li").click(function() {
		$(".dimension_list li").css("background", "");
		$(".dimension_list li").css("color", "");
		$(this).css("background", "#23ABF0");
		$(this).css("color", "white");
		$(this).css("border", "0");
		$(".grade_frame").html("");
		$(".grade_frame").append("<li data-color='#23ABF0' title='" + $(this).html() + "'>" + $(this).html() + "</li>");
	});
};
//二级列表反选
function reverse_selection(data, index) {
	$(".dimension_content li").each(function() {
		var num1 = 0;
		$(this).click(function() {
			if (num1++ % 2 == 0) {
				if ($(this).css("background-color") != "rgb(35, 171, 240)") {
					$(this).css("background", "#23ABF0");
					$(this).css("color", "white");
					$(".grade_frame").append("<li title='" + $(this).html() + "'>" + $(this).html() + "</li>")
					if (data[index].children.length == $(".grade_frame li").length) {
						$(".grade_frame").html("");
						$(".grade_frame").append("<li data-color='#23ABF0' title='" + data[index].grade + "'>" + data[index].grade + "</li>")
					} else {}
				} else {
					$(this).css("background", "");
					$(this).css("color", "");
					$(".grade_frame").html("");
					for (i = 0; i < $(".dimension_content li").length; i++) {
						var colors = $(".dimension_content li:eq(" + i + ")").css("background-color");
						if (colors == 'rgb(35, 171, 240)') {
							$(".grade_frame").append("<li title='" + $(".dimension_content li:eq(" + i + ")").html() + "'>" + $(".dimension_content li:eq(" + i + ")").html() + "</li>");
						}
					}
				}
			} else {
				if ($(this).css("background-color") != "rgb(35, 171, 240)") {
					$(this).css("background", "#23ABF0");
					$(this).css("color", "white");
					$(".grade_frame").append("<li title='" + $(this).html() + "'>" + $(this).html() + "</li>")
					if (data[index].children.length == $(".grade_frame li").length) {
						$(".grade_frame").html("");
						$(".grade_frame").append("<li data-color='#23ABF0' title='" + data[index].grade + "'>" + data[index].grade + "</li>")
					} else {}
				} else {
					$(this).css("background", "");
					$(this).css("color", "");
					$(".grade_frame").html("");
					for (i = 0; i < $(".dimension_content li").length; i++) {
						var colors = $(".dimension_content li:eq(" + i + ")").css("background-color");
						if (colors == 'rgb(35, 171, 240)') {
							$(".grade_frame").append("<li data-color='#23ABF0' title='" + $(".dimension_content li:eq(" + i + ")").html() + "'>" + $(".dimension_content li:eq(" + i + ")").html() + "</li>");
						}
					}
				}
			}
		});
	});
};
//销区控件
function setSalesAreas() {
	$("button").focus(function() {
		this.blur();
	});
	var num = 0;
	$(".select_sales_areas button").click(function() {
		if (num++ % 2 == 0) {
			if ($(".sales_areas").is(":hidden")) {
				$(".sales_areas").css("display", "block");
				$(".select_sales_areas span").attr("class", "am-icon-angle-up");
			} else {
				$(".sales_areas").css("display", "none");
				$(".select_sales_areas span").attr("class", "am-icon-angle-down");
			}
		} else {
			if ($(".sales_areas").is(":hidden")) {
				$(".sales_areas").css("display", "block");
				$(".select_sales_areas span").attr("class", "am-icon-angle-up");
			} else {
				$(".sales_areas").css("display", "none");
				$(".select_sales_areas span").attr("class", "am-icon-angle-down");
			}
		}
	});
	//销区json
	var largeAreaData;
	var zNodes = "json/area.json";
	$.ajax({
		type: 'get',
		url: server_url + '?handle=getWidget&type=xiaoqu',
		dataType: 'json',
		success: function(data) {
			largeAreaData = data;
		}
	});
	//地区json	
	var areaData;
	var zNodes = "json/city.json";
	$.ajax({
		type: 'post',
		url: server_url + '?handle=getWidget&type=shengshi',
		dataType: 'json',
		success: function(data) {
			areaData = data;
		}
	});
	$(".sales_areas ul li").each(function() {
		$(this).click(function() {
			$(".sales_areas ul li").removeClass("menu_first");
			$(this).addClass("menu_first");
			return false;
		});
	});
	$(".zdy").click(function() {
		$(".custom").css("display", "block");
		$(".large_area").css("display", "none");
		$(".area1").css("display", "none");
	});
	$(".xq").click(function() {
		$(".custom").css("display", "none");
		$(".large_area").css("display", "block");
		$(".area1").css("display", "none");
		showSalesAreas(largeAreaData);
		$(".large_area .return").css("display", "none");
	});
	$(".dq").click(function() {
		$(".custom").css("display", "none");
		$(".large_area").css("display", "none");
		$(".area1").css("display", "block");
		showArea(areaData);
		$(".area1 .return").css("display", "none");
	});
};
//显示地区
function showArea(data) {
	$(".area1 ul").html("");
	for (i = 0; i < data.length; i++) {
		$(".area1 ul").append("<li title='" + data[i].province + "'>" + data[i].province + "</li>");
	}
	isChecked1();
	areaNext2(data);
	setColor();
};
//进入销区二级列表
function areaNext2(data) {
	$(".area1 ul li").each(function() {
		$(this).dblclick(function() {
			var index = $(this).index();
			$(".area1 ul").html("");
			$(".area1 .return").css("display", "block");
			for (j = 0; j < data[index].city.length; j++) {
				$(".area1 ul").append("<li title='" + data[index].city[j].cityName + "'>" + data[index].city[j].cityName + "</li>");
			}
			isChecked1();
			areaReturn1(data);
			setColor();
		});
	});
};
//返回地区一级列表
function areaReturn1(data) {
	$(".area1 .return").click(function() {
		$(".area1 ul").html("");
		for (i = 0; i < data.length; i++) {
			$(".area1 ul").append("<li title='" + data[i].province + "'>" + data[i].province + "</li>");
		};
		$(".area1 .return").css("display", "none");
		showArea(data);
	});
};
//显示销区一级列表
function showSalesAreas(data) {
	$(".large_area ul").html("");
	for (i = 0; i < data.length; i++) {
		$(".large_area ul").append("<li title='" + data[i].name + "'>" + data[i].name + "</li>");
	};
	isChecked();
	salesAreasNext2(data);
	setColor1();
};
//进入销区二级列表
function salesAreasNext2(data) {
	$(".large_area ul li").each(function() {
		$(this).dblclick(function() {
			var index = $(this).index();
			$(".large_area ul").html("");
			$(".large_area .return").css("display", "block");
			for (i = 0; i < data[index].children.length; i++) {
				$(".large_area ul").append("<li title='" + data[index].children[i].name + "'>" + data[index].children[i].name + "</li>");
				if ($(this).css("background-color") == "rgb(0, 156, 218)") {
					$(".large_area ul li").css("background", "#009CDA");
					$(".large_area ul li").css("color", "white");
				}
			}
			isChecked();
			setColor1();
			salesAreasReturn1(data);
			salesAreasNext3(data, index);
		});
	});
};
//进入销区三级列表
function salesAreasNext3(data, index) {
	$(".large_area ul li").each(function() {
		$(this).dblclick(function() {
			var index1 = $(this).index();
			$(".large_area ul").html("");
			for (i = 0; i < data[index].children[index1].children.length; i++) {
				$(".large_area ul").append("<li title='" + data[index].children[index1].children[i].name + "'>" + data[index].children[index1].children[i].name + "</li>");
			}
			isChecked();
			setColor1();
			salesAreasReturn2(data, index);
		});
	})
};
//返回销区二级列表
function salesAreasReturn2(data, index) {
	$(".large_area .return").click(function() {
		$(".large_area ul").html("");
		for (i = 0; i < data[index].children.length; i++) {
			$(".large_area ul").append("<li title='" + data[index].children[i].name + "'>" + data[index].children[i].name + "</li>");
		}
		isChecked();
		setColor1();
		salesAreasReturn1(data);
		salesAreasNext3(data, index);
		$(".large_area .return").css("display", "block");
	});
};
//返回销区一级列表
function salesAreasReturn1(data) {
	$(".large_area .return").click(function() {
		$(".large_area ul").html("");
		for (i = 0; i < data.length; i++) {
			$(".large_area ul").append("<li title='" + data[i].name + "'>" + data[i].name + "</li>");
		}
		isChecked();
		showSalesAreas(data);
		$(".large_area .return").css("display", "none");
	});
};
//验证选中
function isChecked() {
	for (j = 0; j < $(".list ul li").length; j++) {
		$(".large_area ul").find("li[title = '" + $(".list ul li:eq(" + j + ")").html() + "']").css("background", "#009CDA");
		$(".large_area ul").find("li[title = '" + $(".list ul li:eq(" + j + ")").html() + "']").css("color", "white");
	}
};

function isChecked1() {
	for (j = 0; j < $(".list ul li").length; j++) {
		$(".area1 ul").find("li[title = '" + $(".list ul li:eq(" + j + ")").html() + "']").css("background", "#009CDA");
		$(".area1 ul").find("li[title = '" + $(".list ul li:eq(" + j + ")").html() + "']").css("color", "white");
	}
};
//设置选中颜色
function setColor() {
	$(".area1 ul li").each(function() {
		var num = 0;
		$(this).click(function() {
			if (num++ % 2 == 0) {
				if ($(this).css("background-color") == "rgb(0, 156, 218)") {
					$(".list ul").find("li[title = '" + $(this).html() + "']").remove();
					$(this).css("background", "whitesmoke");
					$(this).css("color", "#444");
				} else {
					$(this).css("background", "#009CDA");
					$(this).css("color", "white");
					$(".list").find("li[title = '" + $(this).html() + "']").remove();
					$(".list ul").append("<li title='" + $(this).html() + "'>" + $(this).html() + "</li>");
				}
			} else {
				if ($(this).css("background-color") == "rgb(0, 156, 218)") {
					$(".list ul").find("li[title = '" + $(this).html() + "']").remove();
					$(this).css("background", "whitesmoke");
					$(this).css("color", "#444");
				} else {
					$(this).css("background", "#009CDA");
					$(this).css("color", "white");
					$(".list").find("li[title = '" + $(this).html() + "']").remove();
					$(".list ul").append("<li title='" + $(this).html() + "'>" + $(this).html() + "</li>");
				}
			}
		});
	});
};

function setColor1() {
	$(".large_area ul li").each(function() {
		var num = 0;
		$(this).click(function() {
			if (num++ % 2 == 0) {
				if ($(this).css("background-color") == "rgb(0, 156, 218)") {
					$(".list ul").find("li[title = '" + $(this).html() + "']").remove();
					$(this).css("background", "whitesmoke");
					$(this).css("color", "#444");
				} else {
					$(this).css("background", "#009CDA");
					$(this).css("color", "white");
					$(".list").find("li[title = '" + $(this).html() + "']").remove();
					$(".list ul").append("<li title='" + $(this).html() + "'>" + $(this).html() + "</li>");
				}
			} else {
				if ($(this).css("background-color") == "rgb(0, 156, 218)") {
					$(".list ul").find("li[title = '" + $(this).html() + "']").remove();
					$(this).css("background", "whitesmoke");
					$(this).css("color", "#444");
				} else {
					$(this).css("background", "#009CDA");
					$(this).css("color", "white");
					$(".list").find("li[title = '" + $(this).html() + "']").remove();
					$(".list ul").append("<li title='" + $(this).html() + "'>" + $(this).html() + "</li>");
				}
			}
		});
	});
}

//生产维度
function setProduction() {
	//隐藏显示 生产维度列表
	var num = 0;
	$(".production_head").click(function() {
		if (num++ % 2 == 0) {
			if ($(".production_content").is(":hidden")) {
				$(".production_content").css("display", "block");
				$(".production_head i").attr("class", "glyphicon glyphicon-chevron-up");
			} else {
				$(".production_content").css("display", "none");
				$(".production_head i").attr("class", "glyphicon glyphicon-chevron-down");
			}
		} else {
			if ($(".production_content").is(":hidden")) {
				$(".production_content").css("display", "block");
				$(".production_head i").attr("class", "glyphicon glyphicon-chevron-up");
			} else {
				$(".production_content").css("display", "none");
				$(".production_head i").attr("class", "glyphicon glyphicon-chevron-down");
			}
		}
	});

	$(".production_confirm").click(function() {
		var GradeList = new Array($(".grade_frame li").length);
		for (i = 0; i < $(".dimension_candidate li").length; i++) {
			GradeList[i] = $(".dimension_candidate li:eq(" + i + ")").html();
		}
		alert(GradeList);
	});

	var zNodes = "json/production.json";
	$.ajax({
		type: 'get',
		//		url: zNodes,
		url: server_url + '?handle=getWidget&type=shengchanweidu',
		dataType: 'json',
		success: function(data) {
			getProduction(data);
		}
	});
};
//加载一级列表
function getProduction(data) {
	for (i = 0; i < data.length; i++) {
		$(".production_list ul").append("<li title='" + data[i].name + "'>" + data[i].name + "</li>");
		for (j = 0; j < $(".dimension_candidate li").length; j++) {
			if ($(".dimension_candidate li:eq(" + j + ")").html() == data[i].name) {
				$(".production_list").find("li[title =" + data[i].name + "]").css("background", "#19A7F0");
				$(".production_list").find("li[title =" + data[i].name + "]").css("color", "white");
				$(".production_list").find("li[title =" + data[i].name + "]").css("border", "0");
			}
		}
	}
	$(".production_head p").html("生产维度");
	if ($(".production_head p").html() == "生产维度") {
		$(".production_back").css("display", "none");
	}
	setStyle();
	production_list2(data);
};
//加载二级列表
function getProduction2(data, index) {
	for (i = 0; i < data[index].children.length; i++) {
		$(".production_list").append("<li title='" + data[index].children[i].name + "'>" + data[index].children[i].name + "</li>");
		for (j = 0; j < $(".dimension_candidate li").length; j++) {
			if ($(".dimension_candidate li:eq(" + j + ")").html() == data[index].children[i].name) {
				$(".production_list").find("li[title =" + data[index].children[i].name + "]").css("background", "#19A7F0");
				$(".production_list").find("li[title =" + data[index].children[i].name + "]").css("color", "white");
				$(".production_list").find("li[title =" + data[index].children[i].name + "]").css("border", "0");
			}
			if ($(".dimension_candidate li:eq(" + j + ")").html() == data[index].name) {
				$(".production_list").find("li[title =" + data[index].children[i].name + "]").css("background", "#19A7F0");
				$(".production_list").find("li[title =" + data[index].children[i].name + "]").css("color", "white");
				$(".production_list").find("li[title =" + data[index].children[i].name + "]").css("border", "0");
			}
		}
	}
	var title = data[index].name;
	$(".production_head p").html(title);
	$(".production_back").css("display", "block");
	$(".production_back").click(function() {
		$(".production_list").html("");
		$(".production_list").append("<ul></ul>");
		getProduction(data);
	});
	setStyle2(data, index);
	production_list3(data, index);
};
//一级列表选中样式
function setStyle() {
	$(".production_list li").click(function() {
		$(".production_list li").css("background", "");
		$(".production_list li").css("color", "");
		$(".production_list li").css("border", "");
		$(this).css("border", "0");
		$(this).css("background", "#19A7F0");
		$(this).css("color", "white");
		$(".dimension_candidate").html("");
		$(".dimension_candidate").append("<li data-title='" + $(this).html() + "'>" + $(this).html() + "</li>");
	});
};
//二级列表选中样式
function setStyle2(data, index) {
	$(".production_list li").each(function() {
		var num1 = 0;
		$(this).click(function() {
			if (num1++ % 2 == 0) {
				if ($(this).css("background-color") == "rgb(25, 167, 240)") {
					$(this).css("border", "");
					$(this).css("background", "");
					$(this).css("color", "");
					//移除已选中的重复 上级节点
					for (j3 = 0; j3 < $(".dimension_candidate li").length; j3++) {
						if ($(".dimension_candidate li:eq(" + j3 + ")").html() == data[index].name) {
							$(".dimension_candidate li:eq(" + j3 + ")").remove();
						}
					}
					for (i = 0; i < $(".production_list li").length; i++) {
						for (j = 0; j < $(".dimension_candidate li").length; j++) {
							if ($(".dimension_candidate li:eq(" + j + ")").html() == $(".production_list li:eq(" + i + ")").html()) {
								$(".dimension_candidate li:eq(" + j + ")").remove();
							}
						}
						var colors = $(".production_list li:eq(" + i + ")").css("background-color");
						if (colors == 'rgb(25, 167, 240)') {
							$(".dimension_candidate").append("<li title='" + $(".production_list li:eq(" + i + ")").html() + "'>" + $(".production_list li:eq(" + i + ")").html() + "</li>");
						}
					}
				} else {
					$(this).css("border", "0");
					$(this).css("background", "#19A7F0");
					$(this).css("color", "white");
					$(".dimension_candidate").append("<li title='" + $(this).html() + "'>" + $(this).html() + "</li>")
						//如果子级全选，则转换成父级名字
					var size = 0;
					for (i1 = 0; i1 < data[index].children.length; i1++) {
						for (j1 = 0; j1 < $(".dimension_candidate li").length; j1++) {
							if ($(".dimension_candidate li:eq(" + j1 + ")").html() == data[index].children[i1].name) {
								size++;
							}
						}
					}
					if (data[index].children.length == size) {
						//移除已选中重复数据
						for (i2 = 0; i2 < data[index].children.length; i2++) {
							for (j2 = 0; j2 < $(".dimension_candidate li").length; j2++) {
								if ($(".production_list").find("li[title = " + data[index].children[i2].name + "]").css("background-color") == "rgb(25, 167, 240)") {
									if ($(".dimension_candidate li:eq(" + j2 + ")").html() == data[index].children[i2].name) {
										$(".dimension_candidate li:eq(" + j2 + ")").remove();
									}
								}
							}
						}
						//移除已选中的重复 上级节点
						for (j3 = 0; j3 < $(".dimension_candidate li").length; j3++) {
							if ($(".dimension_candidate li:eq(" + j3 + ")").html() == data[index].name) {
								$(".dimension_candidate li:eq(" + j3 + ")").remove();
							}
						}
						$(".dimension_candidate").html("");
						$(".dimension_candidate").append("<li data-color='#19A7F0' title='" + data[index].name + "'>" + data[index].name + "</li>")
					}
					//结束
				}
			} else {
				if ($(this).css("background-color") == "rgb(25, 167, 240)") {
					$(this).css("border", "");
					$(this).css("background", "");
					$(this).css("color", "");
					for (i = 0; i < $(".production_list li").length; i++) {
						for (j = 0; j < $(".dimension_candidate li").length; j++) {
							if ($(".dimension_candidate li:eq(" + j + ")").html() == $(".production_list li:eq(" + i + ")").html()) {
								$(".dimension_candidate li:eq(" + j + ")").remove();
							}
						}
						var colors = $(".production_list li:eq(" + i + ")").css("background-color");
						if (colors == 'rgb(25, 167, 240)') {
							$(".dimension_candidate").append("<li title='" + $(".production_list li:eq(" + i + ")").html() + "'>" + $(".production_list li:eq(" + i + ")").html() + "</li>");
						}
					}
				} else {
					$(this).css("border", "0");
					$(this).css("background", "#19A7F0");
					$(this).css("color", "white");
					$(".dimension_candidate").append("<li title='" + $(this).html() + "'>" + $(this).html() + "</li>")
						//如果子级全选，则转换成父级名字
					var size = 0;
					for (i1 = 0; i1 < data[index].children.length; i1++) {
						for (j1 = 0; j1 < $(".dimension_candidate li").length; j1++) {
							if ($(".dimension_candidate li:eq(" + j1 + ")").html() == data[index].children[i1].name) {
								size++;
							}
						}
					}
					if (data[index].children.length == size) {
						//移除已选中重复数据
						for (i2 = 0; i2 < data[index].children.length; i2++) {
							for (j2 = 0; j2 < $(".dimension_candidate li").length; j2++) {
								if ($(".production_list").find("li[title = " + data[index].children[i2].name + "]").css("background-color") == "rgb(25, 167, 240)") {
									if ($(".dimension_candidate li:eq(" + j2 + ")").html() == data[index].children[i2].name) {
										$(".dimension_candidate li:eq(" + j2 + ")").remove();
									}
								}
							}
						}
						//移除已选中的重复 上级节点
						for (j3 = 0; j3 < $(".dimension_candidate li").length; j3++) {
							if ($(".dimension_candidate li:eq(" + j3 + ")").html() == data[index].name) {
								$(".dimension_candidate li:eq(" + j3 + ")").remove();
							}
						}
						$(".dimension_candidate").html("");
						$(".dimension_candidate").append("<li data-color='#19A7F0' title='" + data[index].name + "'>" + data[index].name + "</li>")
					}
					//结束
				}
			}
		});
	});
};
//三级列表选中样式
function setStyle3(data, index, index1) {
	$(".production_list li").each(function() {
		var num1 = 0;
		$(this).click(function() {
			if (num1++ % 2 == 0) {
				if ($(this).css("background-color") == "rgb(25, 167, 240)") {
					$(this).css("border", "");
					$(this).css("background", "");
					$(this).css("color", "");
					//移除父级节点
					for (i = 0; i < $(".dimension_candidate li").length; i++) {
						if ($(".dimension_candidate li:eq(" + i + ")").html() == data[index].name) {
							$(".dimension_candidate li:eq(" + i + ")").remove();
						}
					}
					//添加二级节点
					for (j = 0; j < data[index].children.length; j++) {
						if (data[index].children[j].name != data[index].children[index1].name) {
							for (j1 = 0; j1 < $(".dimension_candidate li").length; j1++) {
								if ($(".dimension_candidate li:eq(" + j1 + ")").html() == data[index].children[j].name) {
									$(".dimension_candidate li:eq(" + j1 + ")").remove();
								}
							}
							$(".dimension_candidate").append("<li title='" + data[index].children[j].name + "'>" + data[index].children[j].name + "</li>")
						}
					}
					//添加三级节点
					for (i2 = 0; i2 < $(".production_list li").length; i2++) {
						for (j2 = 0; j2 < $(".dimension_candidate li").length; j2++) {
							if ($(".dimension_candidate li:eq(" + j2 + ")").html() == $(".production_list li:eq(" + i2 + ")").html()) {
								$(".dimension_candidate li:eq(" + j2 + ")").remove();
							}
						}
						var colors = $(".production_list li:eq(" + i2 + ")").css("background-color");
						if (colors == 'rgb(25, 167, 240)') {
							$(".dimension_candidate").append("<li title='" + $(".production_list li:eq(" + i2 + ")").html() + "'>" + $(".production_list li:eq(" + i2 + ")").html() + "</li>");
						}
					}
				} else {
					$(this).css("border", "0");
					$(this).css("background", "#19A7F0");
					$(this).css("color", "white");
					$(".dimension_candidate").append("<li title='" + $(this).html() + "'>" + $(this).html() + "</li>")
					var size1 = 0;
					for (i1 = 0; i1 < data[index].children[index1].children.length; i1++) {
						for (j1 = 0; j1 < $(".dimension_candidate li").length; j1++) {
							if ($(".dimension_candidate li:eq(" + j1 + ")").html() == data[index].children[index1].children[i1].name) {
								size1++;
							}
						}
					}
					if (data[index].children[index1].children.length == size1) {
						//移除已选中重复数据
						for (i2 = 0; i2 < data[index].children[index1].children.length; i2++) {
							for (j2 = 0; j2 < $(".dimension_candidate li").length; j2++) {
								if ($(".production_list").find("li[title = " + data[index].children[index1].children[i2].name + "]").css("background-color") == "rgb(25, 167, 240)") {
									if ($(".dimension_candidate li:eq(" + j2 + ")").html() == data[index].children[index1].children[i2].name) {
										$(".dimension_candidate li:eq(" + j2 + ")").remove();
									}
								}
							}
						}
						//移除已选中的重复 上级节点
						for (j3 = 0; j3 < $(".dimension_candidate li").length; j3++) {
							if ($(".dimension_candidate li:eq(" + j3 + ")").html() == data[index].children[j3].name) {
								$(".dimension_candidate li:eq(" + j3 + ")").remove();
							}
						}
						$(".dimension_candidate").append("<li data-color='#19A7F0' title='" + data[index].children[index1].name + "'>" + data[index].children[index1].name + "</li>")
						var size1 = 0;
						for (i3 = 0; i3 < data[index].children.length; i3++) {
							for (j5 = 0; j5 < $(".dimension_candidate li").length; j5++) {
								if ($(".dimension_candidate li:eq(" + j5 + ")").html() == data[index].children[i3].name) {
									size1++;
								}
							}
						}
						if (data[index].children.length == size1) {
							$(".dimension_candidate").html("");
							$(".dimension_candidate").append("<li data-color='#19A7F0' title='" + data[index].name + "'>" + data[index].name + "</li>")
						}
					}
				}
			} else {
				if ($(this).css("background-color") == "rgb(25, 167, 240)") {
					$(this).css("border", "");
					$(this).css("background", "");
					$(this).css("color", "");
					//移除父级节点
					for (i = 0; i < $(".dimension_candidate li").length; i++) {
						if ($(".dimension_candidate li:eq(" + i + ")").html() == data[index].children[index1].name) {
							$(".dimension_candidate li:eq(" + i + ")").remove();
						}
					}
					//添加三级节点
					for (i2 = 0; i2 < $(".production_list li").length; i2++) {
						for (j2 = 0; j2 < $(".dimension_candidate li").length; j2++) {
							if ($(".dimension_candidate li:eq(" + j2 + ")").html() == $(".production_list li:eq(" + i2 + ")").html()) {
								$(".dimension_candidate li:eq(" + j2 + ")").remove();
							}
						}
						var colors = $(".production_list li:eq(" + i2 + ")").css("background-color");
						if (colors == 'rgb(25, 167, 240)') {
							$(".dimension_candidate").append("<li title='" + $(".production_list li:eq(" + i2 + ")").html() + "'>" + $(".production_list li:eq(" + i2 + ")").html() + "</li>");
						}
					}
				} else {
					$(this).css("border", "0");
					$(this).css("background", "#19A7F0");
					$(this).css("color", "white");
					$(".dimension_candidate").append("<li title='" + $(this).html() + "'>" + $(this).html() + "</li>")
						//如果子级全选，则转换成父级名字
					var size = 0;
					for (i1 = 0; i1 < data[index].children[index1].children.length; i1++) {
						for (j1 = 0; j1 < $(".dimension_candidate li").length; j1++) {
							if ($(".dimension_candidate li:eq(" + j1 + ")").html() == data[index].children[index1].children[i1].name) {
								size++;
							}
						}
					}
					//如果全选, 则切换成父级节点
					if (data[index].children[index1].children.length == size) {
						//移除已选中重复数据
						for (i2 = 0; i2 < data[index].children[index1].children.length; i2++) {
							for (j2 = 0; j2 < $(".dimension_candidate li").length; j2++) {
								if ($(".production_list").find("li[title = " + data[index].children[index1].children[i2].name + "]").css("background-color") == "rgb(25, 167, 240)") {
									if ($(".dimension_candidate li:eq(" + j2 + ")").html() == data[index].children[index1].children[i2].name) {
										$(".dimension_candidate li:eq(" + j2 + ")").remove();
									}
								}
							}
						}
						//移除已选中的重复 上级节点
						for (j3 = 0; j3 < $(".dimension_candidate li").length; j3++) {
							if ($(".dimension_candidate li:eq(" + j3 + ")").html() == data[index].children[j3].name) {
								$(".dimension_candidate li:eq(" + j3 + ")").remove();
							}
						}
						$(".dimension_candidate").append("<li data-color='#19A7F0' title='" + data[index].children[index1].name + "'>" + data[index].children[index1].name + "</li>");
						var size1 = 0;
						for (i3 = 0; i3 < data[index].children.length; i3++) {
							for (j3 = 0; j3 < $(".dimension_candidate li").length; j3++) {
								if ($(".dimension_candidate li:eq(" + j3 + ")").html() == data[index].children[i3].name) {
									size1++;
								}
							}
						}
						if (data[index].children.length == size1) {
							$(".dimension_candidate").html("");
							$(".dimension_candidate").append("<li data-color='#19A7F0' title='" + data[index].name + "'>" + data[index].name + "</li>")
						}
					}
				}
			}
		});
	});
};
//双击进入二级列表
function production_list2(data) {
	$(".production_list li").dblclick(function() {
		var index = $(this).index();
		$(".production_list").html("");
		$(".production_back").css("display", "block");
		$(".production_head p").html(data[index].name);
		for (i = 0; i < data[index].children.length; i++) {
			$(".production_list").append("<li title='" + data[index].children[i].name + "'>" + data[index].children[i].name + "</li>");
			$(".production_list li").css("background", "#19A7F0");
			$(".production_list li").css("color", "white");
			$(".production_list li").css("border", "0");
		}
		$(".production_back").click(function() {
			$(".production_list").html("");
			$(".production_list").append("<ul></ul>")
			getProduction(data);
		});
		setStyle2(data, index);
		production_list3(data, index);
	});
};
//双击进入三级列表
function production_list3(data, index) {
	$(".production_list li").dblclick(function() {
		var index1 = $(this).index();
		if (data[index].children[index1].children) {
			$(".production_list").html("");
			$(".production_back").css("display", "block");
			$(".production_head p").html(data[index].children[index1].name);
			for (i = 0; i < data[index].children[index1].children.length; i++) {
				$(".production_list").append("<li title='" + data[index].children[index1].children[i].name + "'>" + data[index].children[index1].children[i].name + "</li>");
				for (j = 0; j < $(".dimension_candidate li").length; j++) {
					if ($(".dimension_candidate li:eq(" + j + ")").html() == data[index].children[index1].name) {
						$(".production_list li").css("background", "#19A7F0");
						$(".production_list li").css("color", "white");
						$(".production_list li").css("border", "0");
					}
					if ($(".dimension_candidate li:eq(" + j + ")").html() == data[index].name) {
						$(".production_list li").css("background", "#19A7F0");
						$(".production_list li").css("color", "white");
						$(".production_list li").css("border", "0");
					}
				}
			}
			$(".production_back").click(function() {
				$(".production_list").html("");
				getProduction2(data, index);
			});
			setStyle3(data, index, index1);
		} else {}
	});
};
//力度滑块
function setSlider() {
	var i = 0;
	$(".jia").click(function() {
		if (i == 5) {
			i = -1;
		}
		i++;
		$(".intensity li span").removeClass("show");
		$(".intensity li:eq(" + i + ")").find("span").addClass("show");
		$(".scale li span").removeClass("checked");
		$(".scale li:eq(" + i + ")").find("span").addClass("checked");
	});
	$(".jian").click(function() {
		if (i == 0) {
			i = 6;
		}
		i--;
		$(".intensity li span").removeClass("show");
		$(".intensity li:eq(" + i + ")").find("span").addClass("show");
		$(".scale li span").removeClass("checked");
		$(".scale li:eq(" + i + ")").find("span").addClass("checked");
	});
	$(".add").click(function() {
		for (j = 0; j < $(".intensity li").length; j++) {
			if ($(".intensity li:eq(" + j + ")").find("span").attr("class") == "show") {
				alert($(".intensity li:eq(" + j + ")").find("span").html());
			};
		};
	});
};

//组件控制
function componentControl() {
	//销区选择
	$(".select_sales_areas button").click(function() {

		if ($(".dimension_list").is(":hidden")) {} else {
			$(".grade_head i").attr("class", "glyphicon glyphicon-chevron-down");
			$(".dimension_list").css("display", "none");
		}
		if ($(".production_content").is(":hidden")) {} else {
			$(".production_head i").attr("class", "glyphicon glyphicon-chevron-down");
			$(".production_content").css("display", "none");
		}
		if ($(".zywd_content").is(":hidden")) {} else {
			$(".zywd_head i").attr("class", "glyphicon glyphicon-chevron-down");
			$(".zywd_content").css("display", "none");
		}
		if ($(".table0peration_content").is(":hidden")) {} else {
			$(".table0peration_head i").attr("class", "glyphicon glyphicon-chevron-down");
			$(".table0peration_content").css("display", "none");
		}
		if ($(".chart_content").is(":hidden")) {} else {
			$(".chart_head i").attr("class", "glyphicon glyphicon-chevron-down");
			$(".chart_content").css("display", "none");
		}
	});

	//牌号维度
	$(".grade_head").click(function() {
		if ($(".sales_areas").is(":hidden")) {} else {
			$(".select_sales_areas span").attr("class", "am-icon-angle-down");
			$(".sales_areas").css("display", "none");
		}
		if ($(".production_content").is(":hidden")) {} else {
			$(".production_head i").attr("class", "glyphicon glyphicon-chevron-down");
			$(".production_content").css("display", "none");
		}
		if ($(".zywd_content").is(":hidden")) {} else {
			$(".zywd_head i").attr("class", "glyphicon glyphicon-chevron-down");
			$(".zywd_content").css("display", "none");
		}
		if ($(".table0peration_content").is(":hidden")) {} else {
			$(".table0peration_head i").attr("class", "glyphicon glyphicon-chevron-down");
			$(".table0peration_content").css("display", "none");
		}
		if ($(".chart_content").is(":hidden")) {} else {
			$(".chart_head i").attr("class", "glyphicon glyphicon-chevron-down");
			$(".chart_content").css("display", "none");
		}
	});

	//生产维度
	$(".production_head").click(function() {
		if ($(".sales_areas").is(":hidden")) {} else {
			$(".select_sales_areas span").attr("class", "am-icon-angle-down");
			$(".sales_areas").css("display", "none");
		}
		if ($(".dimension_list").is(":hidden")) {} else {
			$(".grade_head i").attr("class", "glyphicon glyphicon-chevron-down");
			$(".dimension_list").css("display", "none");
		}
		if ($(".zywd_content").is(":hidden")) {} else {
			$(".zywd_head i").attr("class", "glyphicon glyphicon-chevron-down");
			$(".zywd_content").css("display", "none");
		}
		if ($(".table0peration_content").is(":hidden")) {} else {
			$(".table0peration_head i").attr("class", "glyphicon glyphicon-chevron-down");
			$(".table0peration_content").css("display", "none");
		}
		if ($(".chart_content").is(":hidden")) {} else {
			$(".chart_head i").attr("class", "glyphicon glyphicon-chevron-down");
			$(".chart_content").css("display", "none");
		}
	});

	//中烟维度
	$(".zywd_head").click(function() {
		if ($(".sales_areas").is(":hidden")) {} else {
			$(".select_sales_areas span").attr("class", "am-icon-angle-down");
			$(".sales_areas").css("display", "none");
		}
		if ($(".dimension_list").is(":hidden")) {} else {
			$(".grade_head i").attr("class", "glyphicon glyphicon-chevron-down");
			$(".dimension_list").css("display", "none");
		}
		if ($(".production_content").is(":hidden")) {} else {
			$(".production_head i").attr("class", "glyphicon glyphicon-chevron-down");
			$(".production_content").css("display", "none");
		}
		if ($(".table0peration_content").is(":hidden")) {} else {
			$(".table0peration_head i").attr("class", "glyphicon glyphicon-chevron-down");
			$(".table0peration_content").css("display", "none");
		}
		if ($(".chart_content").is(":hidden")) {} else {
			$(".chart_head i").attr("class", "glyphicon glyphicon-chevron-down");
			$(".chart_content").css("display", "none");
		}
	});

	//表格操作
	$(".table0peration_head").click(function() {
		if ($(".sales_areas").is(":hidden")) {} else {
			$(".select_sales_areas span").attr("class", "am-icon-angle-down");
			$(".sales_areas").css("display", "none");
		}
		if ($(".dimension_list").is(":hidden")) {} else {
			$(".grade_head i").attr("class", "glyphicon glyphicon-chevron-down");
			$(".dimension_list").css("display", "none");
		}
		if ($(".production_content").is(":hidden")) {} else {
			$(".production_head i").attr("class", "glyphicon glyphicon-chevron-down");
			$(".production_content").css("display", "none");
		}
		if ($(".zywd_content").is(":hidden")) {} else {
			$(".zywd_head i").attr("class", "glyphicon glyphicon-chevron-down");
			$(".zywd_content").css("display", "none");
		}
		if ($(".chart_content").is(":hidden")) {} else {
			$(".chart_head i").attr("class", "glyphicon glyphicon-chevron-down");
			$(".chart_content").css("display", "none");
		}
	});

	//图表维度
	$(".chart_head").click(function() {
		if ($(".sales_areas").is(":hidden")) {} else {
			$(".select_sales_areas span").attr("class", "am-icon-angle-down");
			$(".sales_areas").css("display", "none");
		}
		if ($(".dimension_list").is(":hidden")) {} else {
			$(".grade_head i").attr("class", "glyphicon glyphicon-chevron-down");
			$(".dimension_list").css("display", "none");
		}
		if ($(".production_content").is(":hidden")) {} else {
			$(".production_head i").attr("class", "glyphicon glyphicon-chevron-down");
			$(".production_content").css("display", "none");
		}
		if ($(".zywd_content").is(":hidden")) {} else {
			$(".zywd_head i").attr("class", "glyphicon glyphicon-chevron-down");
			$(".zywd_content").css("display", "none");
		}
		if ($(".table0peration_content").is(":hidden")) {} else {
			$(".table0peration_head i").attr("class", "glyphicon glyphicon-chevron-down");
			$(".table0peration_content").css("display", "none");
		}
	});
}