//页面加载完执行
$().ready(function() {
	loadIndexTree(); //加载主题树
	loadPage(); //点击主题菜单 加载不同各个主题页面
});

//八大主题  导航切换
$(".head li").each(function() {
	$(this).click(function() {
		$(".head li p").removeClass("menu_first");
		$(this).find("p").addClass("menu_first");
		return false;
	});
});

//侧边栏
$(".left_sidebar").mouseover(function() {
	$(".left_sidebar").attr("style", "margin-left:0px");
});
$(".left_sidebar").mouseout(function() {
	$(".left_sidebar").attr("style", "margin-left:-225px");
});

//左侧栏主题树设置
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
//获取主题树 数据源
function loadIndexTree() {
	$.ajax({
		type: 'get',
		data: "handle=getSubjectTree",
		url: server_url,
		dataType: 'json',
		success: function(data) {
			$.fn.zTree.init($("#tree"), setting, data);
		}
	});
};
//主题树单击事件
function onClick(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("tree");
	zTree.expandNode(treeNode);
};

//打开当前主题详细页面
function openPage() {
	$(".layouts div").each(function() {
		$(this).click(function() {
			sessionStorage.setItem('userinfo', $(this).find("h4").html());
			window.open("detailed.html");
		})
	})
};

//加载对应 主题 页面
function loadPage() {
	//默认加载 营销主题
	$(".content").load("html/yxzt.html", function() {
		openPage();
	});

	//营销
	$("#yxzt").click(function() {
		$(".content").load("html/yxzt.html", function() {
			openPage();
		});
	});

	//生产
	$("#sczt").click(function() {
		$(".content").load("html/sczt.html", function() {});
	});

	//消耗
	$("#xhzt").click(function() {
		$(".content").load("html/xhzt.html", function() {});
	});

	//设备
	$("#sbzt").click(function() {
		$(".content").load("html/sbzt.html", function() {});
	});

	//财务
	$("#cwzt").click(function() {
		$(".content").load("html/cwzt.html", function() {});
	});

	//物流
	$("#wlzt").click(function() {
		$(".content").load("html/wlzt.html", function() {});
	});

	//动力能源
	$("#dlnyzt").click(function() {
		$(".content").load("html/dlnyzt.html", function() {});
	});

	//人员行为
	$("#ryxwzt").click(function() {
		$(".content").load("html/ryxwzt.html", function() {});
	});
};