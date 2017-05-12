$().ready(function() {
	//最大化
	var num = 0;
	$('.maximize').click(function() {
		if (num++ % 2 == 0) {
			$(".chat_module").addClass("maximize_contact_window");
			$(".chat_module").css("width", "100%");
			$(".chat_module").css("height", "99vh");
			$(".chat_module").css("top", "0");
			$(".chat_module").css("left", "0");
			$(".contact_info").css("height", "98.4vh");
			$(".chat_content").addClass("maximize_chat_content");
		} else {
			$(".chat_module").removeClass("maximize_contact_window");
			$(".chat_module").css("width", "550px");
			$(".chat_module").css("height", "450px");
			$(".chat_module").css("top", "100");
			$(".chat_module").css("left", "500");
			$(".contact_info").css("height", "450px");
			$(".chat_content").removeClass("maximize_chat_content");
		}
	});

	//记录列表切换
	$(".record_list ul li").each(function() {
		$(this).click(function() {
			$(".record_list .record_menu_first").removeClass("record_menu_first");
			$(this).addClass("record_menu_first");
			if ($(this).find("span").html() == "我接收的") {
				$(".record_content_head").html("我收到的消息");
				$(".send").show();
				$(".received").hide();
			} else {
				$(".record_content_head").html("我发出的消息");
				$(".send").hide();
				$(".received").show();
			}
		});
	});

	//创建
	$(".create").click(function(e) {
		if ($(".setting_menu").is(":hidden")) {} else {
			$(".setting_menu").hide();
		}
		$(".create_menu").css({
			top: e.pageY + -105,
			left: e.pageX + -35
		});
		$(".create_menu").show();
		e.stopPropagation();
	});

	//设置
	$(".setting").click(function(e) {
		if ($(".create_menu").is(":hidden")) {} else {
			$(".create_menu").hide();
		}
		$(".setting_menu").css({
			top: e.pageY + -65,
			left: e.pageX + -35
		});
		$(".setting_menu").show();
		e.stopPropagation();
	});

	//打开设置窗口
	$(".setting_menu li").click(function() {
		$(".setting_menu").fadeOut(300);
		$(".setting_window").show();
	});
	//关闭设置窗口
	$(".setting_head span").click(function() {
		$(".setting_window").fadeOut(200);
	});

	//打开添加好友窗口
	$(".adadd_friends").click(function() {
		$(".create_menu").fadeOut(300);
		$(".addFriends").show();
	});
	//关闭添加好友窗口
	$(".addFriends_head span").click(function() {
		$(".addFriends").fadeOut(200);
	});

	//打开 群组聊天窗口
	$(".groupChat").click(function() {
		$(".create_menu").fadeOut(300);
		$(".group_chat").show();
	});
	//关闭 群组聊天窗口
	$(".group_chat_head span").click(function() {
		$(".group_chat").fadeOut(200);
	});

	$(".char_window").click(function() {
		if ($(".create_menu").is(":hidden")) {} else {
			$(".create_menu").hide();
		}
		if ($(".setting_menu").is(":hidden")) {} else {
			$(".setting_menu").hide();
		}
	});

	//切换左侧菜单 
	$(".menu_list li").each(function() {
		$(this).click(function() {
			$(".menu_list .first_left_menu").removeClass("first_left_menu");
			$(this).addClass("first_left_menu");
			if ($(this).find("span").html() == "消息") {
				$(".contacts_window").hide();
				$(".record_window").hide();
				$(".message_window").show();
			}
			if ($(this).find("span").html() == "记录") {
				$(".contacts_window").hide();
				$(".message_window").hide();
				$(".record_window").show();
			}
			if ($(this).find("span").html() == "联系人") {
				$(".message_window").hide();
				$(".record_window").hide();
				$(".contacts_window").show();
				$(".contacts_list").on("click", "ul", function(event) {
					$(".contacts_list .contact_first_menu").removeClass("contact_first_menu");
					$(this).addClass("contact_first_menu");
					$(".defaylt_page").hide();
					$(".caht_window").show();
					$(".caht_window .chat_head").html($(this).html());
				});
			}
		});
	});
	//上传图片
	$(".selectFile").on('click', function() {
		var ie = !-[1, ];
		if (ie) {
			$('.file').trigger('click').trigger('change');
		} else {
			$('.file').trigger('click');
		}
	});
	$('.file').change(function() {
		var file = $(this);
		var fileObj = file[0];
		var windowURL = window.URL || window.webkitURL;
		var dataURL;

		if (fileObj && fileObj.files && fileObj.files[0]) {
			dataURL = windowURL.createObjectURL(fileObj.files[0]);
			alert(dataURL);
		} else {
			dataURL = file.val();
			alert(dataURL);
		}
	});

	//添加表情
	$('.emotion').qqFace({
		id: 'facebox', //表情盒子的ID
		assign: 'text1', //给那个控件赋值
		path: 'face/' //表情存放的路径
	});

	//打开聊天窗口
	$(".mainChar").click(function() {
		if ($(".mainChar").html() == "聊天") {
			$(".char_window").show(300);
			$(".mainChar").html("关闭");
			$("body").css("overflow-y", "hidden");
		} else {
			$(".char_window").hide(300);
			$(".mainChar").html("聊天");
			$("body").css("overflow-y", "");
		}
	});

	//关闭聊天窗口
	$(".chat_close").click(function() {
		$(".chat_module").hide(300);
	});
	//关闭通讯录
	$(".contact_close").click(function() {
		$(".contact").hide(300);
	});

});