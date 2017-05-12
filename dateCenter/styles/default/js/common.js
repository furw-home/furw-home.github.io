var server_url = "http://192.168.20.242:9080/console/serviceinterface/getDataJson.jsp";
//var server_url = "http://localhost:8080/console/serviceinterface/getDataJson.jsp";

//去掉按钮点击虚线
$("button").focus(function() {
	this.blur();
})

//转向页面
function turnToPage(pageUrl) {
	location.href = pageUrl;
}

// 转向锚点
function turnToAnchor(url, anchor) {
	location.href = url + '#' + anchor;
}

var urljsondata = "/dateCenter/styles/default/json/content.json";

$().ready(function() {
	$.ajax({
		type: 'get',
		url: urljsondata,
		dataType: 'json',
		success: function(data) {
			$("#menu").html(createTree(data, "", true, false));
				var username = sessionStorage.data;

			for (var i = 0; i < $(".container .navbar-nav li").length; i++) {
				if ($(".container .navbar-nav li:eq(" + i + ")").find("a").attr("data-cls") == "user") {
					$(".container .navbar-nav li:eq(" + i + ")").find("a[data-cls ='user']").html("");
					$(".container .navbar-nav li:eq(" + i + ")").find("a[data-cls ='user']").append(username);
				}
			}
		}
	});
	//var data = $.parseJSON(menudata);
	//var ul = createTree(data,"",true,false);
	//$("#menu").html(ul);
});

/**
 * 对新包装的数据进行递归，结合前端框架样式生成菜单
 *
 * @param jsons
 * @param pid
 * @param isTopLevel
 * @param menuTop 是否是二级菜单
 * @returns {String
 */
function createTree(jsons, pid, isTopLevel, menuTop) {
	var level2Flag = false; // 是否是二级菜单标记
	var ul;
	if (jsons != null) {
		if (isTopLevel) {
			ul = '<ul class="nav navbar-nav">';
		} else {
			// 二级菜单需要拼 menu-top以实现鼠标指向时菜单打开的效果
			if (menuTop) {
				ul = '<ul class="dropdown-menu menu-top">';
			} else {
				ul = '<ul class="dropdown-menu">';
			}
		}

		for (var i = 0; i < jsons.length; i++) {
			if (isTopLevel) {
				ul += '<li class="dropdown one-level">';
				level2Flag = true;
			} else {
				if (jsons[i].childs[0].length > 0) {
					ul += '<li class="dropdown-submenu">';
				} else {
					ul += '<li>';
				}
			}

			ul += '<a href="' + jsons[i].url + '" data-cls="' + jsons[i].class + '" class="dropdown-toggle">' + '<span class="' + jsons[i].icon + '"></span>' + jsons[i].menuName + '</a>';
			if (jsons[i].childs[0].length > 0) {
				ul += createTree(jsons[i].childs[0], jsons[i].menuId, false, level2Flag); // 递归所有子树
			}

			ul += "</li>";
		}
		ul += "</ul>";
	}
	return ul;
};