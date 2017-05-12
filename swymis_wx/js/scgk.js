$().ready(function() {

	//切换市务人员
	$(".userList li").each(function() {
		$(this).click(function() {
			$(".userList .userList_menu").removeClass("userList_menu");
			$(this).addClass("userList_menu");
			return false; //防止页面跳转  
		});
	});

	//品牌切换
	$(".brand li").each(function() {
		$(this).click(function() {
			$(".brand .userList_menu").removeClass("userList_menu");
			$(this).addClass("userList_menu");
			return false; //防止页面跳转  
		});
	});

	//城市概况
	$("#csgk").click(function() {
		$(".csgk").css("display", "block");
		$(".ddycgk").css("display", "none");
		$(".zdda").css("display", "none");
		$(".swyda").css("display", "none");
		$(".zyjp").css("display", "none");
	});

	//当地烟草概况
	$("#ddycgk").click(function() {
		$(".ddycgk").css("display", "block");
		$(".csgk").css("display", "none");
		$(".zdda").css("display", "none");
		$(".swyda").css("display", "none");
		$(".zyjp").css("display", "none");
	});

	//终端档案
	$("#zdda").click(function() {
		$(".zdda").css("display", "block");
		$(".ddycgk").css("display", "none");
		$(".csgk").css("display", "none");
		$(".swyda").css("display", "none");
		$(".zyjp").css("display", "none");
	});

	//市务员档案
	$("#swyda").click(function() {
		$(".swyda").css("display", "block");
		$(".zdda").css("display", "none");
		$(".ddycgk").css("display", "none");
		$(".csgk").css("display", "none");
		$(".zyjp").css("display", "none");
	});

	//主要竞品
	$("#zyjp").click(function() {
		$(".zyjp").css("display", "block");
		$(".swyda").css("display", "none");
		$(".zdda").css("display", "none");
		$(".ddycgk").css("display", "none");
		$(".csgk").css("display", "none");
	});
	
//	//终端点击时	
	$(".lszd").each(function() {
		$(this).click(function() {
//			$(".jhwc").css("display", "none");
//			$(".zywt").css("display", "block");
		});
	});
});