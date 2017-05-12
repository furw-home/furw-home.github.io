//当前用户
var userName; //用户名
var page = 0; //当前页
var rows = 10; //每页显示行
var defaultRows = 10; //默认行数
var currentlySelect = 1; //当前选中
var selectName = ""; //指标查询名称

//获取 缓存的用户名称
var user_id = sessionStorage.userId;
var entry = sessionStorage.entry;
//指标数组
var indexMap = new Map();

//页面加载完毕执行
$().ready(function() {
	switchingTheme(); //切换主题
	loadIndexTree(); //左侧指标树
});

//左侧边栏
var nums2 = 0;
$(".left_sidebar_icon").click(function() {
	if (nums2++ % 2 == 0) {
		if ($(".left_sidebar").attr("data-type") == "close") {
			$(".left_sidebar").attr("style", "margin-left: 0px");
			$(".left_sidebar").attr("data-type", "open");
		} else {
			$(".left_sidebar").attr("style", "margin-left: -191px");
			$(".left_sidebar").attr("data-type", "close");
		}
	} else {
		if ($(".left_sidebar").attr("data-type") == "close") {
			$(".left_sidebar").attr("style", "margin-left: 0px");
			$(".left_sidebar").attr("data-type", "open");
		} else {
			$(".left_sidebar").attr("style", "margin-left: -191px");
		}
	}
});

//指标树设置
var setting = {
	data: {
		simpleData: {
			enable: true
		}
	},
	view: {
		dblClickExpand: false,
		showLine: false
	},
	callback: {
		onClick: onClick
	}
};

//加载左侧指标树
//var zNodes = "json/member.json";
function loadIndexTree() {
	$.ajax({
		type: 'post',
		data: 'handle=getIndexTree&entry=' + entry,
		url: server_url,
		dataType: 'json',
		success: function(data) {
			$.fn.zTree.init($("#tree"), setting, data);
		}
	});
};
//指标树单击事件
function onClick(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("tree");
	zTree.expandNode(treeNode);
}

//主题  导航切换
$(".head li").each(function() {
	$(this).click(function() {
		$(".head li p").removeClass("menu_first");
		$(this).find("p").addClass("menu_first");
		return false;
	});
});

//获取 点击指标 的id 存进sessionStorage
function openPage() {
	$(".content .link").each(function() {
		$(this).click(function() {
			var curIndex = indexMap.get($(this).find("p").html().trim());
			//将选择的指标写入本地存储
			sessionStorage.setItem('selectedIndex', JSON.stringify(curIndex));
			//根据配置的URL判断转向界面
			var url = "detailDefault.html"; //默认界面
			var select_url = curIndex.url;
			if (select_url != "") {
				url = select_url; //定制界面
			} else {
				//TODO 模板界面调用
				var templet_url = curIndex.templet_url;
				if (templet_url != "") {
					url = "template/" + templet_url;
				}
			}
			window.open(url);
		})
	})
};

//悬浮卡片时,在下方显示功能条
function foot() {
	$(".layout1 div").each(function() {
		$(this).mouseover(function() {
			$(this).find(("div[class='foot']")).css("display", "block");
		});
		$(this).mouseout(function() {
			$(this).find(("div[class='foot']")).css("display", "none");
		});
	});

	$(".layout2 div").each(function() {
		$(this).mouseover(function() {
			$(this).find(("div[class='foot']")).css("display", "block");
		});
		$(this).mouseout(function() {
			$(this).find(("div[class='foot']")).css("display", "none");
		});
	});
};

//切换主题
function switchingTheme() {
	//默认显示 第一个主题
	var postdata = [{
		"id": "INDEX08001"
	}];
	lodaIndexJson(JSON.stringify(postdata), "INDEX08001", "FA8786");

	//点击切换 加载对应主题下的 指标
	$(".head ul li").each(function() {
		$(this).click(function() {
			//当前主题id
			var id = $(this).attr("id");
			//当前主题颜色
			var bg = $(this).attr("data-bg");
			var indexName = $(this).find("label").html();
			$(".position").html(indexName);

			//卡片类型
			var cardType = $(".dropdown .switch_name").html();

			//调用加载指标列表函数
			var postdata = [{
				"id": id
			}];
			lodaIndexJson(JSON.stringify(postdata), id, bg, cardType);
		});
	});
};

//读取当前主题json
function lodaIndexJson(postdata, id, bg, cardType) {
	//加载指标json
	//var zNodes = "json/index.json";
	var url = server_url + '?handle=getIndexCardList&type=' + id + '&userid=' + user_id + '&entry=' + entry;
	$.ajax({
		type: 'post',
		data: "",
		url: url,
		dataType: 'json',
		success: function(data) {
			LoadIndicatorCard(data, id, bg, cardType);
		}
	});
};

//加载指标卡片
function LoadIndicatorCard(data, id, bg, cardType) {
	//默认加载 大卡片
	createBigCard(selectName);

	//记录选中的卡片展示 方式
	if (cardType == "大卡片") {
		createBigCard(selectName);
	}

	if (cardType == "小卡片") {
		createSmallCard(selectName);
	}

	if (cardType == "列表") {
		page = 0; //当前页
		rows = $(".content").attr("data-page"); //每页显示行
		defaultRows = $(".content").attr("data-page");
		currentlySelect = 1; //当前选中
		createListCard(page, rows, currentlySelect, defaultRows, selectName);
	}

	//指标检索
	$(".search_index input").keyup(function() {
		var cardType = $(".dropdown .switch_name").html();
		selectName = $(".search_index input").val();
		if (cardType == "大卡片") {
			createBigCard(selectName);
		}
		if (cardType == "小卡片") {
			createSmallCard(selectName);
		}
		if (cardType == "列表") {
			createListCard(page, rows, currentlySelect, defaultRows, selectName);
		}
	});

	//大卡片
	$(".big_card").click(function() {
		$(".search_index input").val("");
		//当前展现方式
		$(".switch_name").html($(this).find("a").html());
		createBigCard(selectName);
	});

	//小卡片
	$(".small_card").click(function() {
		$(".search_index input").val("");
		//当前展现方式
		$(".switch_name").html($(this).find("a").html());
		createSmallCard(selectName);
	});

	//列表
	$(".card_list").click(function() {
		$(".search_index input").val("");
		//当前展现方式
		$(".switch_name").html($(this).find("a").html());
		createListCard(page, rows, currentlySelect, defaultRows, selectName);
	});

	//生成卡片 (大卡片)
	function createBigCard(selectName) {
		$(".content").html("");
		for (i = 0; i < data[0].index_list.length; i++) {

			if (data[0].index_list[i].name.indexOf(selectName) != -1) {

				var data_change;
				indexMap.put(data[0].index_list[i].name, data[0].index_list[i]);
				//验证
				if (data[0].index_list[i].data_change < 0) {
					if (data[0].index_list[i].data_change == "") {
						data_change = "";
					} else {
						data_change = "<i class='glyphicon glyphicon-arrow-down'></i>" + data[0].index_list[i].data_change + " %";
					}
				} else {
					if (data[0].index_list[i].data_change == "") {
						data_change = "";
					} else {
						data_change = "<i class='glyphicon glyphicon-arrow-up'></i>" + data[0].index_list[i].data_change + " %";
					}
				}

				//获取指标销量
				if (data[0].index_list[i].data_value == "") {
					data_value = "";
				} else {
					data_value = data[0].index_list[i].data_value + "万支";
				}

				$(".content").append("<div class='layout1'><div style='background:#" + bg + "' class = 'big_indicator_card am-animation-slide-bottom'><div class='up link'> <p class='name' title='" + data[0].index_list[i].name + "' id='index_" + data[0].index_list[i].index_tree_id + "'>" + data[0].index_list[i].name + " </p><ul><li class='index_value'>" + data_value + "</li><li class='an'>" + data_change + "</li></ul><p class='data_time'>" + data[0].index_list[i].data_date + "</p><p title='" + data[0].index_list[i].summary + "' class='overview'> <span title='" + data[0].index_list[i].summary + "'>总结</span> </p><span class='tagging'></span></div><div class='foot'><i class='see glyphicon glyphicon-search' title='查看'></i><i class='edit glyphicon glyphicon-pencil' title='编辑'></i><i class='del glyphicon glyphicon-trash' title='删除' ></i><i class='ad glyphicon glyphicon-thumbs-up' title='考核'></i><i class='check glyphicon glyphicon-star' title='管理域'></i><i class='star glyphicon glyphicon-heart' title='关注'></i><i class='collection glyphicon glyphicon-log-in' title='收藏'></i></div></div></div>");

				$(".content .overview").click(function(event) {
					event.stopPropagation();
				});

				//在当前鼠标位置生产 总结卡片
				var menu = document.getElementById("popmenu");
				$(".content .layout1:eq(" + i + ") .overview").click(function(event) {
					e = event ? event : window.event;
					t = e.target || e.srcElement;
					menu.style.left = getPointerX(e) + "px";
					menu.style.top = getPointerY(e) + "px";
					menu.style.display = "block";
					$("#popmenu span").html($(this).attr("title"));
				});

				//关闭总结 悬浮窗口
				$("#popmenu p").click(function() {
					$(this).parent().css("display", "none");
				});

				function getPointerX(event) {
					return event.pageX || (event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
				}

				function getPointerY(event) {
					return event.pageY || (event.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
				}

				//是否收藏
				if (data[0].index_list[i].is_collect == 1) {
					$(".content .layout1:eq(" + i + ")").find("span[class = 'tagging']").append("<i class='collection glyphicon glyphicon-log-in' title='收藏'></i>");
					$(".content .layout1:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='collection glyphicon glyphicon-log-in']").css("color", "#888");
				}

				//是否关注
				if (data[0].index_list[i].is_attention == 1) {
					$(".content .layout1:eq(" + i + ")").find("span[class = 'tagging']").append("<i class='star glyphicon glyphicon-heart' title='关注'></i>");
					$(".content .layout1:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='star glyphicon glyphicon-heart']").css("color", "#888");
				}

				//是否管理域
				if (data[0].index_list[i].is_managedomain == 1) {
					$(".content .layout1:eq(" + i + ")").find("span[class = 'tagging']").append("<i class='check glyphicon glyphicon-star' title='管理域'></i>");
					$(".content .layout1:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='check glyphicon glyphicon-star']").css("color", "#888");
				}

				//是否考核
				if (data[0].index_list[i].is_assess == 1) {
					$(".content .layout1:eq(" + i + ")").find("span[class = 'tagging']").append("<i class='ad glyphicon glyphicon-thumbs-up' title='考核'></i>");
					$(".content .layout1:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='ad glyphicon glyphicon-thumbs-up']").css("color", "#888");
				}

				//是否有查看权限
				if (data[0].index_list[i].is_show == 1) {} else {
					$(".content .layout1:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='see glyphicon glyphicon-search']").css("color", "#888");
				}

				//是否有编辑权限
				if (data[0].index_list[i].is_edit == 1) {} else {
					$(".content .layout1:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='edit glyphicon glyphicon-pencil']").css("color", "#888");
				}

				//是否有删除权限
				if (data[0].index_list[i].is_del == 1) {} else {
					$(".content .layout1:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='del glyphicon glyphicon-trash']").css("color", "#888");
				}
			} else {}
		}
		if ($(".content div").length == 0) {
			$(".content").append("<div class='not_found'>没有找到您检索的 指标 ~</div>");
		}

		//是否有权限添加  指标 
		if (data[0].is_add == 1) {
			addBigCard("content"); //添加指标
		};

		openPage(); //打开指标详细页面
		foot(); //悬浮当前指标 在下方显示功能区

		//添加关注
		$(".foot .star").click(function() {
			var id = $(this).parent().parent().parent().index();
			for (var i = 0; i < $(".content .layout1").length; i++) {
				if ($(".content .layout1:eq(" + i + ")").index() == id) {
					if ($(".content .layout1:eq(" + i + ")").find("span[class = 'tagging']").find("i[class ='star glyphicon glyphicon-heart']").attr("title") == "关注") {
						$(".content .layout1:eq(" + i + ")").find("span[class = 'tagging']").find("i[class ='star glyphicon glyphicon-heart']").remove();
						$(".content .layout1:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='star glyphicon glyphicon-heart']").css("color", "#EB4F38");
					} else {
						$(".content .layout1:eq(" + i + ")").find("span[class = 'tagging']").append("<i class='star glyphicon glyphicon-heart' title='关注'></i>");
						$(".content .layout1:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='star glyphicon glyphicon-heart']").css("color", "#888");
					}
				}
			}
		});
		//添加收藏
		$(".foot .collection").click(function() {
			var id = $(this).parent().parent().parent().index();
			for (var i = 0; i < $(".content .layout1").length; i++) {
				if ($(".content .layout1:eq(" + i + ")").index() == id) {
					if ($(".content .layout1:eq(" + i + ")").find("span[class = 'tagging']").find("i[class ='collection glyphicon glyphicon-log-in']").attr("title") == "收藏") {
						$(".content .layout1:eq(" + i + ")").find("span[class = 'tagging']").find("i[class ='collection glyphicon glyphicon-log-in']").remove();
						$(".content .layout1:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='collection glyphicon glyphicon-log-in']").css("color", "#EB4F38");
					} else {
						$(".content .layout1:eq(" + i + ")").find("span[class = 'tagging']").append("<i class='collection glyphicon glyphicon-log-in' title='收藏'></i>");
						$(".content .layout1:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='collection glyphicon glyphicon-log-in']").css("color", "#888");
					}

				}
			}
		});
		//添加管理域
		$(".foot .check").click(function() {
			var id = $(this).parent().parent().parent().index();
			for (var i = 0; i < $(".content .layout1").length; i++) {
				if ($(".content .layout1:eq(" + i + ")").index() == id) {
					if ($(".content .layout1:eq(" + i + ")").find("span[class = 'tagging']").find("i[class ='check glyphicon glyphicon-star']").attr("title") == "管理域") {
						$(".content .layout1:eq(" + i + ")").find("span[class = 'tagging']").find("i[class ='check glyphicon glyphicon-star']").remove();
						$(".content .layout1:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='check glyphicon glyphicon-star']").css("color", "#EB4F38");
					} else {
						$(".content .layout1:eq(" + i + ")").find("span[class = 'tagging']").append("<i class='check glyphicon glyphicon-star' title='管理域'></i>");
						$(".content .layout1:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='check glyphicon glyphicon-star']").css("color", "#888");
					}

				}
			}
		});
		//添加考核
		$(".foot .ad").click(function() {
			var id = $(this).parent().parent().parent().index();
			for (var i = 0; i < $(".content .layout1").length; i++) {
				if ($(".content .layout1:eq(" + i + ")").index() == id) {
					if ($(".content .layout1:eq(" + i + ")").find("span[class = 'tagging']").find("i[class ='ad glyphicon glyphicon-thumbs-up']").attr("title") == "考核") {
						$(".content .layout1:eq(" + i + ")").find("span[class = 'tagging']").find("i[class ='ad glyphicon glyphicon-thumbs-up']").remove();
						$(".content .layout1:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='ad glyphicon glyphicon-thumbs-up']").css("color", "#EB4F38");
					} else {
						$(".content .layout1:eq(" + i + ")").find("span[class = 'tagging']").append("<i class='ad glyphicon glyphicon-thumbs-up' title='考核'></i>");
						$(".content .layout1:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='ad glyphicon glyphicon-thumbs-up']").css("color", "#888");
					}
				}
			}
		});
	};

	//生成卡片 (小卡片)
	function createSmallCard(selectName) {
		$(".content").html("");
		for (i = 0; i < data[0].index_list.length; i++) {

			if (data[0].index_list[i].name.indexOf(selectName) != -1) {

				$(".content").append("<div class='layout2'><div style='background:#" + bg + "'  class = 'small_indicator_card am-animation-scale-up'><div class='up1 link'><p class='name'>" + data[0].index_list[i].name + "</p> <span class='marks'></span></div><div class='foot'><i class='see glyphicon glyphicon-search' title='查看'></i><i class='edit glyphicon glyphicon-pencil' title='编辑'></i><i class='del glyphicon glyphicon-trash' title='删除' ></i><i class='ad glyphicon glyphicon-thumbs-up' title='考核'></i><i class='check glyphicon glyphicon-star' title='管理域'></i><i class='star glyphicon glyphicon-heart' title='关注'></i><i class='collection glyphicon glyphicon-log-in' title='收藏'></i></div></div></div");

				//是否收藏
				if (data[0].index_list[i].is_collect == 1) {
					$(".content .layout2:eq(" + i + ")").find("span[class = 'marks']").append("<i class='collection glyphicon glyphicon-log-in' title='收藏'></i>");
					$(".content .layout2:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='collection glyphicon glyphicon-log-in']").css("color", "#888");
				}

				//是否关注
				if (data[0].index_list[i].is_attention == 1) {
					$(".content .layout2:eq(" + i + ")").find("span[class = 'marks']").append("<i class='star glyphicon glyphicon-heart' title='关注'></i>");
					$(".content .layout2:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='star glyphicon glyphicon-heart']").css("color", "#888");
				}

				//是否管理域
				if (data[0].index_list[i].is_managedomain == 1) {
					$(".content .layout2:eq(" + i + ")").find("span[class = 'marks']").append("<i class='check glyphicon glyphicon-star' title='管理域'></i>");
					$(".content .layout2:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='check glyphicon glyphicon-star']").css("color", "#888");
				}

				//是否考核
				if (data[0].index_list[i].is_assess == 1) {
					$(".content .layout2:eq(" + i + ")").find("span[class = 'marks']").append("<i class='ad glyphicon glyphicon-thumbs-up' title='考核'></i>");
					$(".content .layout2:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='ad glyphicon glyphicon-thumbs-up']").css("color", "#888");
				}

				//是否有查看权限
				if (data[0].index_list[i].is_show == 1) {} else {
					$(".content .layout2:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='see glyphicon glyphicon-search']").css("color", "#888");
				}

				//是否有编辑权限
				if (data[0].index_list[i].is_edit == 1) {} else {
					$(".content .layout2:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='edit glyphicon glyphicon-pencil']").css("color", "#888");
				}

				//是否有删除权限
				if (data[0].index_list[i].is_del == 1) {} else {
					$(".content .layout2:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='del glyphicon glyphicon-trash']").css("color", "#888");
				}
			} else {}

		}
		if ($(".content div").length == 0) {
			$(".content").append("<div class='not_found'>没有找到您检索的 指标 ~</div>");
		}
		//是否有权限添加  指标 
		if (data[0].is_add == 1) {
			addSmallCard("content"); //添加指标
		};

		openPage(); //打开指标详细页面
		foot(); //悬浮当前指标 在下方显示功能区

		//添加关注
		$(".foot .star").click(function() {
			var id = $(this).parent().parent().parent().index();
			for (var i = 0; i < $(".content .layout2").length; i++) {
				if ($(".content .layout2:eq(" + i + ")").index() == id) {
					if ($(".content .layout2:eq(" + i + ")").find("span[class = 'marks']").find("i[class ='star glyphicon glyphicon-heart']").attr("title") == "关注") {
						$(".content .layout2:eq(" + i + ")").find("span[class = 'marks']").find("i[class ='star glyphicon glyphicon-heart']").remove();
						$(".content .layout2:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='star glyphicon glyphicon-heart']").css("color", "#EB4F38");
					} else {
						$(".content .layout2:eq(" + i + ")").find("span[class = 'marks']").append("<i class='star glyphicon glyphicon-heart' title='关注'></i>");
						$(".content .layout2:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='star glyphicon glyphicon-heart']").css("color", "#888");
					}
				}
			}
		});
		//添加收藏
		$(".foot .collection").click(function() {
			var id = $(this).parent().parent().parent().index();
			for (var i = 0; i < $(".content .layout2").length; i++) {
				if ($(".content .layout2:eq(" + i + ")").index() == id) {
					if ($(".content .layout2:eq(" + i + ")").find("span[class = 'marks']").find("i[class ='collection glyphicon glyphicon-log-in']").attr("title") == "收藏") {
						$(".content .layout2:eq(" + i + ")").find("span[class = 'marks']").find("i[class ='collection glyphicon glyphicon-log-in']").remove();
						$(".content .layout2:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='collection glyphicon glyphicon-log-in']").css("color", "#EB4F38");
					} else {
						$(".content .layout2:eq(" + i + ")").find("span[class = 'marks']").append("<i class='collection glyphicon glyphicon-log-in' title='收藏'></i>");
						$(".content .layout2:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='collection glyphicon glyphicon-log-in']").css("color", "#888");
					}
				}
			}
		});
		//添加管理域
		$(".foot .check").click(function() {
			var id = $(this).parent().parent().parent().index();
			for (var i = 0; i < $(".content .layout2").length; i++) {
				if ($(".content .layout2:eq(" + i + ")").index() == id) {
					if ($(".content .layout2:eq(" + i + ")").find("span[class = 'marks']").find("i[class ='check glyphicon glyphicon-star']").attr("title") == "管理域") {
						$(".content .layout2:eq(" + i + ")").find("span[class = 'marks']").find("i[class ='check glyphicon glyphicon-star']").remove();
						$(".content .layout2:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='check glyphicon glyphicon-star']").css("color", "#EB4F38");
					} else {
						$(".content .layout2:eq(" + i + ")").find("span[class = 'marks']").append("<i class='check glyphicon glyphicon-star' title='管理域'></i>");
						$(".content .layout2:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='check glyphicon glyphicon-star']").css("color", "#888");
					}

				}
			}
		});
		//添加考核
		$(".foot .ad").click(function() {
			var id = $(this).parent().parent().parent().index();
			for (var i = 0; i < $(".content .layout2").length; i++) {
				if ($(".content .layout2:eq(" + i + ")").index() == id) {
					if ($(".content .layout2:eq(" + i + ")").find("span[class = 'marks']").find("i[class ='ad glyphicon glyphicon-thumbs-up']").attr("title") == "考核") {
						$(".content .layout2:eq(" + i + ")").find("span[class = 'marks']").find("i[class ='ad glyphicon glyphicon-thumbs-up']").remove();
						$(".content .layout2:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='ad glyphicon glyphicon-thumbs-up']").css("color", "#EB4F38");
					} else {
						$(".content .layout2:eq(" + i + ")").find("span[class = 'marks']").append("<i class='ad glyphicon glyphicon-thumbs-up' title='考核'></i>");
						$(".content .layout2:eq(" + i + ")").find("div[class = 'foot']").find("i[class ='ad glyphicon glyphicon-thumbs-up']").css("color", "#888");
					}
				}
			}
		});
	};

	//生成卡片 (列表)
	function createListCard(page, rows, currentlySelect, defaultRows, selectName) {
		var options;
		$(".content").html("");
		if (selectName != "") {
			for (var i = 0; i < data[0].index_list.length; i++) {
				options = "";
				if (data[0].index_list[i].name.indexOf(selectName) != -1) {
					var data_change;
					//验证
					if (data[0].index_list[i].data_change < 0) {

						if (data[0].index_list[i].data_change == "") {
							data_change = "";
						} else {
							data_change = "<i class='glyphicon glyphicon-arrow-up'></i>" + data[0].index_list[i].data_change + " %";
						}
					} else {
						if (data[0].index_list[i].data_change == "") {
							data_change = "";
						} else {
							data_change = "<i class='glyphicon glyphicon-arrow-down'></i>" + data[0].index_list[i].data_change + " %";
						}
					};
					//获取指标销量
					if (data[0].index_list[i].data_value == "") {
						data_value = "";
					} else {
						data_value = data[0].index_list[i].data_value + "万支";
					};

					//是否收藏
					if (data[0].index_list[i].is_collect == 1) {
						options = "<i class='collection glyphicon glyphicon-log-in' title='收藏'></i>";
					}

					//是否关注
					if (data[0].index_list[i].is_attention == 1) {
						options = options + "<i class='star glyphicon glyphicon-heart' title='关注'></i>";
					}

					//是否管理域
					if (data[0].index_list[i].is_managedomain == 1) {
						options = options + "<i class='check glyphicon glyphicon-star' title='管理域'></i>";
					}

					//是否考核
					if (data[0].index_list[i].is_assess == 1) {
						options = options + "<i class='ad glyphicon glyphicon-thumbs-up' title='考核'></i>";
					}

					$(".content").append("<div class = 'list_indicator_card am-animation-fade link'><p class='code'>" + data[0].index_list[i].code + "</p><p class='name'>" + data[0].index_list[i].name + "</p> <ul><li>" + data[0].index_list[i].data_date + "</li><li>" + data_value + "</li><li>" + data_change + "</li></ul><span class='fun'>" + options + "</span> </div>");

				} else {}
			}
			if ($(".content div").length == 0) {
				$(".content").append("<div class='not_found'>没有找到您检索的 指标 ~</div>");
			}
		} else {
			for (i = page; i < rows; i++) {
				options = "";
				if (i == data[0].index_list.length) {

					$(".content").append("<div class='show_page_num'><lable>显示</lable><div class = 'btn-group'><button style='background: rgba(255, 255, 255, 0.5); filter: alpha(opacity=50); height:28px; border-radius:3px;' data-toggle = 'dropdown' class = 'btn btn-inverse dropdown-toggle'><span class='name'>" + defaultRows + "</span><span style='margin-left:5px' class = 'caret'> </span></button ><ul class = 'dropdown-menu'><li><a href = '#'>5</a></li ><li><a href = '#'>10</a></li><li><a href = '#'>20</a></li></ul></div><lable>项结果</lable></div>");

					$(".show_page_num a").click(function() {
						$(".show_page_num button .name").html($(this).html());
					});

					//添加分页栏
					var sum = data[0].index_list.length;
					sum = sum / defaultRows;
					$(".content").append("<nav><ul class='pagination'></ul></nav>");

					$(".pagination").append("<li><a href='#' aria-label='Previous'><span aria-hidden='true'>上一页</span></a></li>");
					for (var j = 1; j < sum + 1; j++) {
						$(".pagination").append("<li><a href='#'>" + j + "</a></li>");
					}
					for (var y = 1; y < $(".pagination li").length; y++) {
						if ($(".pagination li:eq(" + y + ")").index() == currentlySelect) {
							$(".pagination li:eq(" + y + ")").removeClass("active");
							$(".pagination li:eq(" + y + ")").addClass("active");
						}
					}
					$(".pagination").append("<li><a href='#' aria-label='Next'><span aria-hidden='true'>下一页</span></a></li>")
					pagin();
				}
				var data_change;
				//验证
				if (data[0].index_list[i].data_change < 0) {

					if (data[0].index_list[i].data_change == "") {
						data_change = "";
					} else {
						data_change = "<i class='glyphicon glyphicon-arrow-up'></i>" + data[0].index_list[i].data_change + " %";
					}
				} else {
					if (data[0].index_list[i].data_change == "") {
						data_change = "";
					} else {
						data_change = "<i class='glyphicon glyphicon-arrow-down'></i>" + data[0].index_list[i].data_change + " %";
					}
				};

				//获取指标销量
				if (data[0].index_list[i].data_value == "") {
					data_value = "";
				} else {
					data_value = data[0].index_list[i].data_value + "万支";
				};

				//是否收藏
				if (data[0].index_list[i].is_collect == 1) {
					options = "<i class='collection glyphicon glyphicon-log-in' title='收藏'></i>";
				}

				//是否关注
				if (data[0].index_list[i].is_attention == 1) {
					options = options + "<i class='star glyphicon glyphicon-heart' title='关注'></i>";
				}

				//是否管理域
				if (data[0].index_list[i].is_managedomain == 1) {
					options = options + "<i class='check glyphicon glyphicon-star' title='管理域'></i>";
				}

				//是否考核
				if (data[0].index_list[i].is_assess == 1) {
					options = options + "<i class='ad glyphicon glyphicon-thumbs-up' title='考核'></i>";
				}

				$(".content").append("<div class = 'list_indicator_card am-animation-fade link'><p class='code'>" + data[0].index_list[i].code + "</p><p class='name'>" + data[0].index_list[i].name + "</p> <ul><li>" + data[0].index_list[i].data_date + "</li><li>" + data_value + "</li><li>" + data_change + "</li></ul><span class='fun'>" + options + "</span> </div>");
			}
			openPage();
			//添加选择显示页数下拉
			$(".content").append("<div class='show_page_num'><lable>显示</lable><div class = 'btn-group'><button style='background: rgba(255, 255, 255, 0.5); filter: alpha(opacity=50); height:28px; border-radius:3px;' data-toggle = 'dropdown' class = 'btn btn-inverse dropdown-toggle'><span class='name'>" + defaultRows + "</span><span style='margin-left:5px' class = 'caret'></span></button ><ul class = 'dropdown-menu'><li><a href = '#'>5</a></li><li><a href = '#'>10</a></li><li><a href = '#'>20</a></li></ul></div><lable>项结果</lable></div>");

			$(".show_page_num a").click(function() {
				var pageNum = $(this).html();
				if (pageNum == 5) {
					rows = pageNum;
					$(".content").attr("data-page", "5");
					createListCard(page, rows, currentlySelect, pageNum, selectName);
				}
				if (pageNum == 10) {
					rows = pageNum;
					$(".content").attr("data-page", "10");
					createListCard(page, rows, currentlySelect, pageNum, selectName);
				}
				if (pageNum == 20) {
					rows = pageNum;
					$(".content").attr("data-page", "20");
					createListCard(page, rows, currentlySelect, pageNum, selectName);
				}
			});

			// 添加分页栏
			var sum = data[0].index_list.length;
			sum = sum / defaultRows;
			$(".content").append("<nav><ul class='pagination'></ul></nav>");

			$(".pagination").append("<li><a href='#' aria-label='Previous'><span aria-hidden='true'>上一页</span></a></li>");
			for (var j = 1; j < sum + 1; j++) {
				$(".pagination").append("<li><a href='#'>" + j + "</a></li>");
			}

			for (var y = 1; y < $(".pagination li").length; y++) {
				if ($(".pagination li:eq(" + y + ")").index() == currentlySelect) {
					$(".pagination li:eq(" + y + ")").removeClass("active");
					$(".pagination li:eq(" + y + ")").addClass("active");
				}
			}
			$(".pagination").append("<li><a href='#' aria-label='Next'><span aria-hidden='true'>下一页</span></a></li>")
			pagin();
		};
	};

	//分页
	function pagin() {
		//去掉点击虚线
		$(".pagination a").focus(function() {
			this.blur();
		});
		//添加选中颜色
		$(".pagination li").each(function() {
			var num = $(".pagination li").length;
			$(this).click(function() {
				if ($(this).index() == 0 || $(this).index() == num - 1) {} else {
					rows = $(this).find("a").html();
					defaultRows = $(".show_page_num button .name").html();
					rows = defaultRows * rows;
					page = rows - defaultRows;
					alert(selectName);
					createListCard(page, rows, $(this).find("a").html(), defaultRows, selectName);
				}
			});
		});
		//上一页  
		for (var i = 0; i < $(".pagination li").length; i++) {
			var index;
			if ($(".pagination li:eq(" + i + ")").index() == 0) {
				$(".pagination li:eq(" + i + ")").click(function() {
					for (var j = 0; j < $(".pagination li").length; j++) {
						if ($(".pagination li:eq(" + j + ")").css("background-color") == "rgb(12, 152, 201)") {
							index = $(".pagination li:eq(" + j + ")").index();
							index = index - 1;
							if (index == 0) {} else {
								defaultRows = $(".show_page_num button .name").html();
								rows = index;
								rows = defaultRows * rows;
								page = rows - defaultRows;
								createListCard(page, rows, index, defaultRows, selectName);
							}
						}
					}
				});
			}
		};
		//下一页
		for (var i = 0; i < $(".pagination li").length; i++) {
			var num = $(".pagination li").length;
			num = num - 1;
			var index;
			if ($(".pagination li:eq(" + i + ")").index() == num) {
				$(".pagination li:eq(" + i + ")").click(function() {
					for (var j = 0; j < $(".pagination li").length; j++) {
						if ($(".pagination li:eq(" + j + ")").css("background-color") == "rgb(12, 152, 201)") {
							index = $(".pagination li:eq(" + j + ")").index();
							index = index + 1;
							if (index == num) {} else {
								defaultRows = $(".show_page_num button .name").html();
								rows = index;
								rows = defaultRows * rows;
								page = rows - defaultRows;
								createListCard(page, rows, index, defaultRows, selectName);
								return;
							}
						}
					}
				});
			}
		};
	};
};


//添加指标 (大卡片)
function addBigCard(str) {
	$("." + str).append("<div class='layout1'><div title='添加指标' class='big_add am-animation-slide-bottom' data-toggle='modal' data-target='#addIndex'> ＋</div></div>");
}

//添加指标 (小卡片)
function addSmallCard(str) {
	$("." + str).append("<div class='layout2'><div title='添加指标' class='small_add am-animation-slide-bottom' data-toggle='modal' data-target='#addIndex'> ＋</div></div>");
}

/**
 * Simple Map
 *
 *
 * var m = new Map();
 * m.put('key','value');
 * ...
 * var s = "";
 * m.each(function(key,value,index){
 *         s += index+":"+ key+"="+value+"\n";
 * });
 * alert(s);
 *
 * @author dewitt
 * @date 2008-05-24
 */
function Map() {
	/** 存放键的数组(遍历用到) */
	this.keys = new Array();
	/** 存放数据 */
	this.data = new Object();

	/**
	 * 放入一个键值对
	 * @param {String} key
	 * @param {Object} value
	 */
	this.put = function(key, value) {
		if (this.data[key] == null) {
			this.keys.push(key);
		}
		this.data[key] = value;
	};

	/**
	 * 获取某键对应的值
	 * @param {String} key
	 * @return {Object} value
	 */
	this.get = function(key) {
		return this.data[key];
	};

	/**
	 * 删除一个键值对
	 * @param {String} key
	 */
	this.remove = function(key) {
		this.keys.remove(key);
		this.data[key] = null;
	};

	/**
	 * 遍历Map,执行处理函数
	 *
	 * @param {Function} 回调函数 function(key,value,index){..}
	 */
	this.each = function(fn) {
		if (typeof fn != 'function') {
			return;
		}
		var len = this.keys.length;
		for (var i = 0; i < len; i++) {
			var k = this.keys[i];
			fn(k, this.data[k], i);
		}
	};

	/**
	 * 获取键值数组(类似Java的entrySet())
	 * @return 键值对象{key,value}的数组
	 */
	this.entrys = function() {
		var len = this.keys.length;
		var entrys = new Array(len);
		for (var i = 0; i < len; i++) {
			entrys[i] = {
				key: this.keys[i],
				value: this.data[i]
			};
		}
		return entrys;
	};

	/**
	 * 判断Map是否为空
	 */
	this.isEmpty = function() {
		return this.keys.length == 0;
	};

	/**
	 * 获取键值对数量
	 */
	this.size = function() {
		return this.keys.length;
	};

	/**
	 * 重写toString
	 */
	this.toString = function() {
		var s = "{";
		for (var i = 0; i < this.keys.length; i++, s += ',') {
			var k = this.keys[i];
			s += k + "=" + this.data[k];
		}
		s += "}";
		return s;
	};
}