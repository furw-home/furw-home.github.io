//取消加载动画
function cancelAnimation() {
	$("iframe").load(function() {
		//		$(".animation").hide(10);
		$(".animation").fadeOut(500); //淡出
	});
};

var idx1 = 0;
var idx2 = 0;

//获取当前用户 ticket
function getTicket() {
	var ticket = window.sessionStorage.getItem("ticket");
	return ticket;
}

//跳转
$(".bxt").click(function() {
	var ticket1 = window.sessionStorage.getItem("ticket");
	window.location.href = "http://wxtest1.98ep.com/page/login/index.html?system=" + "nb" + "&token=" + ticket1;

});

//全屏
$('.fullscreen').on('click', function() {
	if(!$(this).attr('fullscreen')) {
		$(this).attr('fullscreen', 'true');
		requestFullScreen();
	} else {
		$(this).removeAttr('fullscreen')
		exitFullscreen();
	}
});

function requestFullScreen() {
	var de = document.documentElement;
	if(de.requestFullscreen) {
		de.requestFullscreen();
	} else if(de.mozRequestFullScreen) {
		de.mozRequestFullScreen();
	} else if(de.webkitRequestFullScreen) {
		de.webkitRequestFullScreen();
	}
};

function exitFullscreen() {
	var de = document;
	if(de.exitFullscreen) {
		de.exitFullscreen();
	} else if(de.mozCancelFullScreen) {
		de.mozCancelFullScreen();
	} else if(de.webkitCancelFullScreen) {
		de.webkitCancelFullScreen();
	}
};

//页面渲染完成后, 取消动画
window.onload = function() {
	//	$("#loading").css("display", "none");
	$("#loading").fadeOut(1000); //淡出
}

//用户下拉菜单, 移入效果
$(".drop_down").mouseenter(function() {
	$(".drop-down-menu").css("display", "block");

	$(".drop-down-menu").mouseenter(function() {
		$(".drop-down-menu").css("display", "block");
	});

	$(".drop_down").addClass("drop_down_hover");
});

//用户下拉菜单, 移出效果
$(".drop_down").mouseleave(function() {
	$(".drop-down-menu").css("display", "none");

	$(".drop-down-menu").mouseleave(function() {
		$(".drop-down-menu").css("display", "none");
		$(".drop_down").removeClass("drop_down_hover");
	});
});

(function() {

	//计算高度
	calculateHeight();

	//窗口改变 重新计算
	$(window).resize(function() {
		calculateHeight();
	});

	function calculateHeight() {
		var clientHeight = $(window).height();
		clientHeight = clientHeight - $("header").height();
		$("#sidebar").css("height", clientHeight + "px");
		clientHeight = clientHeight - $("#tab").height();
		clientHeight = clientHeight - 35;
		$("#content").css("height", clientHeight + "px");
	}

	//隐藏侧边栏
	$("#sidebar label").click(function() {
		if($("#sidebar").attr("data-type") == "open") {
			$("#sidebar").css("margin-left", "-200px");
			$("#sidebar label i").attr("class", "icon-double-angle-right");
			$("#sidebar").attr("data-type", "close");
			$("#content").css("margin-left", "0px");
			$("#tab").css("margin-left", "0px");
			$("#breadcrumb").css("margin-left", "10px");
			$("#tab ul").css("left", "50px");
		} else {
			$("#sidebar").css("margin-left", "0px");
			$("#sidebar label i").attr("class", "icon-double-angle-left");
			$("#sidebar").attr("data-type", "open");
			$("#content").css("margin-left", "200px");
			$("#tab").css("margin-left", "200px");
			$("#breadcrumb").css("margin-left", "210px");
			$("#tab ul").css("left", "255px");
		}
	});

})();