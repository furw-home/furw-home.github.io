$().ready(function() {
	footMenu();
	switchPage();
	toChat();
	send();
});

function send() {

	//发送消息
	$(".send").click(function() {
		var name = $(".entry").val();
		$(".content ul").append("<li><img src='img/user.jpg' /><span>" + name + "</span></li>");
		$(".content").scrollTop($(".content")[0].scrollHeight);
		$(".entry").val("");
	});

	//点击回车发送消息
	$(".entry").keydown(function(event) {
		if (event.keyCode == 13) {
			var name = $(".entry").val();
			$(".content ul").append("<li></span><img src='img/user.jpg' /><span>" + name + "</span></li>");
			$(".content").scrollTop($(".content")[0].scrollHeight);
			$(".entry").val("");
		}
	})
};

//底部导航
function footMenu() {
	$("footer li").each(function() {
		$(this).click(function() {
			$(".data-body footer li").removeClass("first_menu");
			$(this).addClass("first_menu");
			return false; //防止页面跳转  
		});
	});
};

//转到聊天窗口
function toChat() {
	$(".message ul li").each(function() {
		$(this).click(function() {
			var name = $(this).find("label").html();
			var imgUrl = $(this).find("img").attr("src");
			$(".chat_window").show(300);
			$(".chat_window header label").html(name);
			$(".chat_window header img").attr("src", imgUrl);
		})
	});

	$(".chat_window span").click(function() {
		$(".chat_window").hide(300);
	})
};

//根据底部导航 切换页面
function switchPage() {
	$("footer li").click(function() {
		if ($(this).attr("id") == "message") {
			$(".message").css("display", "block");
			$(".contact_list").css("display", "none");
			$(".personal_center").css("display", "none");
			$("header h3").html("消息");
		}
		if ($(this).attr("id") == "contact_list") {
			$(".message").css("display", "none");
			$(".contact_list").css("display", "block");
			$(".personal_center").css("display", "none");
			$("header h3").html("通讯录");

		}
		if ($(this).attr("id") == "personal_center") {
			$(".message").css("display", "none");
			$(".contact_list").css("display", "none");
			$(".personal_center").css("display", "block");
			$("header h3").html("个人中心");
		}
	})
};