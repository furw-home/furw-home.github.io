$().ready(function() {

	//生成指标树全景布局
	$(".qj").append("<div class='qj_content'></div>");

	//加载指标树 全景图
	$(".left_sidebar_head span").click(function() {
		$(".qj_content").load("/dateCenter/pages/zbzxPage/html/qj_tree.html", function() {
			loadZbsqjJson();
			$(".main").addClass("filter");
			$(".head").addClass("filter");
			$(".body").css("overflow-y", "hidden");
			$(".status_bar").css("display", "none");
			$(".early_warning_bar").css("display", "none");
			$(".right_sidebar").css("display", "none");

			$(".qj_set input").focus(function() {
				this.blur();
			})

			$(".qj_search button").focus(function() {
				this.blur();
			})

			$(".closes2 button").focus(function() {
				this.blur();
			})

			//关闭全景
			$(".closes2").click(function() {
				$(".qj").hide(1000);
				$(".main").removeClass("filter");
				$(".head").removeClass("filter");
				$(".body").css("overflow-y", "scroll");
				$(".right_sidebar").css("display", "block");
			});
		});
	});

	//打开全景
	$(".left_sidebar_head span").click(function() {
		$(".qj").show(1000);
		$(".left_sidebar").attr("style", "margin-left:-191px");
	});
})

//加载指标树全景数据
function loadZbsqjJson() {
	var zNodes = "/dateCenter/pages/zbzxPage/json/zbsqj.json";
	$.ajax({
		type: 'get',
		url: zNodes,
		dataType: 'json',
		success: function(data) {
			getMenu(data);
		}
	});
};

function getMenu(data) {
	indexList(data);
	$(".qj_search button").click(function() {
		var str = $(".qj_search input").val();
		if (str != null && str != "") {
			findInxex(str, data);
		} else {
			$(".jq_list").html("");
			$(".qj_set").css("display", "block");
			$(".qj_content").css("overflow-x", "scroll");
			indexList(data);
		}
	});

	$(".qj_set input").click(function() {
		if ($(".qj_set input").prop("checked")) {
			$(".jq_list").html("");
			gjIndexList(data);
		} else {
			$(".jq_list").html("");
			indexList(data);
		}
	});
}

//查找指标
function findInxex(str, data) {
	var changevalue;
	$(".jq_list").html("");
	$(".qj_search input").val("");
	$(".qj_content").css("overflow-x", "hidden");
	$(".qj_set").css("display", "none");
	$(".jq_list").append("<div class='findInxexList'></div>");
	for (var i = 0; i < data.length; i++) {
		for (var j = 0; j < data[i].index_list.length; j++) {
			if (data[i].index_list[j].changevalue == 0) {
				changevalue = "<span class='balance'>━</span>";
			}
			if (data[i].index_list[j].changevalue == 1) {
				changevalue = "<span class='rise'><i class='glyphicon glyphicon-arrow-up'></i></span>";
			}
			if (data[i].index_list[j].changevalue == 2) {
				changevalue = "<span class='drop'><i class='glyphicon glyphicon-arrow-down'></i></span>";
			}

			if (data[i].index_list[j].name.indexOf(str) != -1) {
				$(".jq_list div").append("<li class='tab3'>" + data[i].index_list[j].name + changevalue + "</li>");
			} else {

			}
		}
	}
	if ($(".jq_list div li").length == 0) {
		$(".jq_list div").append("<h1>没有找到您检索的 指标 ~</h1>");
	}
}

//全部指标
function indexList(data) {
	var changevalue;
	for (var i = 0; i < data.length; i++) {
		$(".jq_list").append("<ul data-name=" + data[i].name + "></ul>")
	}
	for (var i1 = 0; i1 < data.length; i1++) {
		$(".jq_list ul").each(function() {
			if ($(this).attr("data-name") == data[i1].name) {
				$(this).append("<li class='tab'>" + data[i1].name + "</li>")
			}
			if ($(this).attr("data-name") == data[i1].name) {
				for (var j = 0; j < data[i1].index_list.length; j++) {

					if (data[i1].index_list[j].changevalue == 0) {
						changevalue = "<span class='balance'>━</span>";
					}
					if (data[i1].index_list[j].changevalue == 1) {
						changevalue = "<span class='rise'><i class='glyphicon glyphicon-arrow-up'></i></span>";
					}
					if (data[i1].index_list[j].changevalue == 2) {
						changevalue = "<span class='drop'><i class='glyphicon glyphicon-arrow-down'></i></span>";
					}

					$(this).append("<li class='tab1'>" + data[i1].index_list[j].name + changevalue + "</li>");

					if (data[i1].index_list[j].index_list) {
						for (var y = 0; y < data[i1].index_list[j].index_list.length; y++) {

							if (data[i1].index_list[j].changevalue == 0) {
								changevalue = "<span class='balance'>━</span>";
							}
							if (data[i1].index_list[j].changevalue == 1) {
								changevalue = "<span class='rise'><i class='glyphicon glyphicon-arrow-up'></i></span>";
							}
							if (data[i1].index_list[j].changevalue == 2) {
								changevalue = "<span class='drop'><i class='glyphicon glyphicon-arrow-down'></i></span>";
							}

							$(this).append("<li class='tab2'>" + data[i1].index_list[j].index_list[y].name + changevalue + "</li>");
						}
					}
				}
			}
		});
	}
};

//关键指标
function gjIndexList(data) {
	for (var i = 0; i < data.length; i++) {
		$(".jq_list").append("<ul data-name=" + data[i].name + "></ul>")
	}

	for (var i1 = 0; i1 < data.length; i1++) {
		$(".jq_list ul").each(function() {
			if ($(this).attr("data-name") == data[i1].name) {
				$(this).append("<li class='tab'>" + data[i1].name + "</li>")
			}
			if ($(this).attr("data-name") == data[i1].name) {
				for (var j = 0; j < data[i1].index_list.length; j++) {
					if (data[i1].index_list[j].isKPI == 1) {
						if (data[i1].index_list[j].changevalue == 0) {
							changevalue = "<span class='balance'>━</span>";
						}
						if (data[i1].index_list[j].changevalue == 1) {
							changevalue = "<span class='rise'><i class='glyphicon glyphicon-arrow-up'></i></span>";
						}
						if (data[i1].index_list[j].changevalue == 2) {
							changevalue = "<span class='drop'><i class='glyphicon glyphicon-arrow-down'></i></span>";
						}
						$(this).append("<li class='tab1'>" + data[i1].index_list[j].name + changevalue + "</li>");
					}
					if (data[i1].index_list[j].index_list) {
						for (var y = 0; y < data[i1].index_list[j].index_list.length; y++) {
							if (data[i1].index_list[j].index_list[y].isKPI == 1) {
								if (data[i1].index_list[j].changevalue == 0) {
									changevalue = "<span class='balance'>━</span>";
								}
								if (data[i1].index_list[j].changevalue == 1) {
									changevalue = "<span class='rise'><i class='glyphicon glyphicon-arrow-up'></i></span>";
								}
								if (data[i1].index_list[j].changevalue == 2) {
									changevalue = "<span class='drop'><i class='glyphicon glyphicon-arrow-down'></i></span>";
								}
								$(this).append("<li class='tab2'>" + data[i1].index_list[j].index_list[y].name + changevalue + "</li>");
							}
						}
					}
				}
			}
		});
	}
}