$().ready(function() {

	//返回上一页面
	$(".ruturn").click(function() {
		window.location.href = "index.html";
	});
	

	//底部导航切换
	$(".bottom-menu li").each(function() {
		$(this).click(function() {
			$(".bottom-menu .bottom-first-menu").removeClass("bottom-first-menu");
			$(this).addClass("bottom-first-menu");
			return false; //防止页面跳转  
		});
	});

	//切换 市场选择样式
	$(".citylist li").each(function() {
		$(this).click(function() {
			$(".citylist .city_munu").removeClass("city_munu");
			$(this).addClass("city_munu");
			return false; //防止页面跳转  
		});
	});

	//打开市场选择窗口
	var num = 0;
	$('.city').click(function() {
		if (num++ % 2 == 0) {
			if ($(".citylist").attr("data-mark") == 1) {
				$(".citylist").css("margin-top", "0");
				$(".citylist").attr("data-mark", "2");
			} else {
				$(".citylist").css("margin-top", "-100vh");
				$(".citylist").attr("data-mark", "1");
			}

		} else {
			if ($(".citylist").attr("data-mark") == 1) {
				$(".citylist").css("margin-top", "0");
				$(".citylist").attr("data-mark", "2");
			} else {
				$(".citylist").css("margin-top", "-100vh");
				$(".citylist").attr("data-mark", "1");
			}
		}
	});

	//切换市场 并关闭 市场选择窗口
	$(".citylist li").each(function() {
		$(this).click(function() {
			$(".citylist").css("margin-top", "-100vh");
			$(".citylist").attr("data-mark", "1");
			$(".city").html($(this).html());
		})
	});
})