$().ready(function() {

	//拜访记录
	$("#bfjl").click(function() {
		$(".bfjl").css("display", "block");
		$(".zfjl").css("display", "none");
		$(".xtyhc").css("display", "none");
		$(".rgzzj").css("display", "none");
	});

	//走访记录
	$("#zfjl").click(function() {
		$(".bfjl").css("display", "none");
		$(".zfjl").css("display", "block");
		$(".xtyhc").css("display", "none");
		$(".rgzzj").css("display", "none");
	});

	//协调员核查
	$("#xtyhc").click(function() {
		$(".bfjl").css("display", "none");
		$(".zfjl").css("display", "none");
		$(".xtyhc").css("display", "block");
		$(".rgzzj").css("display", "none");
	});

	//协调员总结
	$("#rgzzj").click(function() {
		$(".bfjl").css("display", "none");
		$(".zfjl").css("display", "none");
		$(".xtyhc").css("display", "none");
		$(".rgzzj").css("display", "block");
	});

	//人员选择切换
	$(".personnel_list li").each(function() {
		$(this).click(function() {
			$(".personnel_list .personnel_list_menu").removeClass("personnel_list_menu");
			$(this).addClass("personnel_list_menu");
			return false; //防止页面跳转  
		});
	});

	//客户类型切换
	$(".tab li").each(function() {
		$(this).click(function() {
			$(".tab .tab_menu").removeClass("tab_menu");
			$(this).addClass("tab_menu");
			return false; //防止页面跳转  
		});
	});

	//计划完成
	$("#jhwc").click(function() {
		$(".jhwc").css("display", "block");
		$(".zywt").css("display", "none");
	});

	//主要问题
	$("#zywt").click(function() {
		$(".jhwc").css("display", "none");
		$(".zywt").css("display", "block");
	});

});