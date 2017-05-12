/**
 * 全景变量
 *
 * @param name 应用名称
 * @param src 应用图标路径
 */
var name;
var src;

/**
 * 发送消息时,对录入信息验证提示框
 *
 * @param name
 */
function msg(content) {
	$("#hint").fadeIn(500);
	setTimeout('$("#hint").fadeOut("slow")', 3000);
	$("#hint").html(content);
}

/**
 * 发送消息
 *
 * @param name
 */
function sendMessage() {

	$(".submit button").click(function() {
		var cls = $(".message_content div").attr("class");

		//发送范围数组
		var name = new Array();
		var i = 0;

		//验证是否选择发送成员
		if ($(".user_text:has(li)").length == 0) {
			msg("请选择发送范围");
			return;
		} else { //获取成员
			$(".user_text li").each(function() {
				var title = $(this).attr("title");
				name[i] = title;
				i++;
			});
		}

		//文字
		if (cls == "form") {
			var textContent = $(".eml").val();
			if (textContent == 0) {
				msg("请输入发送内容");
				return;
			} else {
				alert("发送给：" + name + "\n发送内容：" + textContent);
			}
		}

		//图文
		if (cls == "image_text") {
			var title = $(".title").val();
			var img = $(".img").val();
			if (title == 0) {
				msg("请输入图文的标题");
				return;
			} else if (img == 0) {
				msg("请上传图文的封面图片");
				return;
			} else {
				alert("发送给：" + name + "\n标题：" + title + "\n图片地址：" + img);
			}
		}

		//图片
		if (cls == "picture") {
			var picture = $(".image").val();
			if (picture == 0) {
				msg("请上传图片");
				return;
			} else {
				alert("发送给：" + name + "\n图片地址：" + picture);
			}

		}

		//文件
		if (cls == "file") {

		}

		//视频
		if (cls == "video") {

		}

		//语音
		if (cls == "sound") {

		}

	});
}


/**
 * 选择应用,进行消息发送
 *
 */
function entrance() {
	$(".entrance img").each(function() {
		$(this).click(function() {
			name = this.alt;
			src = this.src;
			$(".entrance").css('display', 'none');
			$(".push_message").css('display', 'block');
			$(".preview").css('display', 'block');
			$(".push_message .name").html(name);
			$(".push_message img").attr("src", src);
			$(".head_portrait img").attr("src", src);
			$(".member img").attr("src", src);
			$(".check_all_name").html(name + "可见范围");
		});
	});
}

/**
 * 发送消息类型tab,切换
 *
 */
function tab() {
	$(".tabs li").each(function() {
		$(this).click(function() {
			$(".tabs li").removeClass("tab_firsts");
			$(this).addClass("tab_firsts");
			return false;
		});
	});
}

/**
 * 发送消息范围tab,切换
 *
 */
function range() {
	$(".head li").each(function() {
		$(this).click(function() {
			$(".head li").removeClass("am-modal-firsts");
			$(this).addClass("am-modal-firsts");
			return false;
		});
	});
}

/**
 * 显示成员的树形列表
 *
 */
function treeMenu() {
	var setting = {
		view: {
			showLine: false
		},
		check: {
			enable: false //表示是否显示节点前的checkbox选择框
		},
		callback: {
			onClick: zTreeOnCheck //节点选择事件
		}
	};

	var zNodes = "json/member.json";

	$().ready(function() {
		$.ajax({
			type: 'get',
			url: zNodes,
			dataType: 'json',
			success: function(data) {
				$.fn.zTree.init($("#treeDemo"), setting, data);
			}
		});
	});

	//对树形列表进行操作, 将选中节点 在右侧显示
	function zTreeOnCheck() {
		var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
			nodes = zTree.getSelectedNodes();
		var treeNode = nodes[0];
		var treeNodeP = treeNode.parentTId ? treeNode.getParentNode() : null;
		$(".member_list").html("");
		if (treeNode.children != null) {
			for (var i = 0; i < treeNode.children.length; i++) {
				var childNode = treeNode.children[i];
				var parent = treeNode.getParentNode();
				$(".member_list").append("<ul> <img src='" + childNode.img + "' /> <li data-name='" + childNode.name + "'>" + childNode.name + "</li> <input type='checkbox' /> </ul>")
			}
		} else {
			if (treeNode.getParentNode() == null) {
				$(".member_list").append("<p>空目录</p>")
			} else {
				for (var i = 0; i < nodes.length; i++) {
					$(".member_list").append("<ul> <img src='" + nodes[i].img + "' /> <li data-name='" + nodes[i].name + "'>" + nodes[i].name + "</li> <input type='checkbox' /> </ul>")
				}
			}
		}
		add();
	}
}

/**
 * 将选中成员, 添加到成员候选框中
 *
 */
function add() {
	$('.member_list ul').click(function() {
		var isSelect = $(this).children(":last").prop("checked");
		if (isSelect) {
			$(this).children(":last").prop("checked", false);
			var b = $(this).find("li").html();
			$("li[title = '" + b + "']").remove();
		} else {
			$(this).children(":last").prop("checked", true);
			var name = $(this).find("li").html();
			var img = $(this).find("img").attr("src");
			$(".add").append("<li title='" + name + "'><img src='" + img + "' /> " + name + "<span class='close'>✘</span></li>");
		}
		//删除候选款的成员 并设置 当前成员的 checked 为false  
		$(".close").click(function() {
			$(this).parent().remove();
			var aasd = $(this).parent().attr("title");
			$(".member_list li[data-name='" + aasd + "']").next().prop("checked", false);
		});
		addUser();
	});

	//事件冒泡 阻止父级元素 事件触发
	$(".member_list input").click(function(e) {
		e.stopPropagation();
		if ($(this).prop("checked")) {
			var name = $(this).prev().html();
			var img = $(this).parent().children(":first").attr("src");
			$(".add").append("<li title='" + name + "'><img src='" + img + "' /> " + name + "<span class='close'>✘</span></li>");
		} else {
			b = $(this).prev().html();
			$("li[title = '" + b + "']").remove();
		}
	});

	/**
	 * 将候选框中的成员, 添加到发送消息成员列表中
	 *
	 */
	function addUser() {
		$("#sub").click(function() {
			var emt = $(".add").html();
			$(".user_text").html(emt);
			close(); //回调函数
		});
	}

	/**
	 * 单击发送范围模态框关闭按钮时,如果未添加到发送消息成员列表是,对候选框中的成员进行清空
	 *
	 */
	$(".am-close").click(function() {
		if ($(".user_text:has(li)").length == 0) {
			$(".add").html("");
			$("input[type='checkbox']").each(function() {
				$(this).attr("checked", false);
			});
		} else {}
	})
};

/**
 * 删除成员时 ,同步删除候选框里的成员
 *
 */
function close() {
	$(".user_text li .close").click(function() {
		$(this).parent().remove();
		var asd = $(this).parent().attr("title");
		$(".add li[title = '" + asd + "']").remove();
		$(".member_list li[data-name='" + asd + "']").next().prop("checked", false);
	})
}

/**
 * 单选择发送消息 类型tab页  切换时,加载对应的界面显示
 *
 */
function tabPage() {
	//默认发送页面 及 预览页面
	$(".message_content").load("html/message/words.html");
	$(".preview_area").load("html/preview/word_preview.html");

	$("#word").click(function() {
		$(".message_content").load("html/message/words.html");
		$(".preview_area").load("html/preview/word_preview.html", function() {
			$(".head_portrait img").attr("src", src);
		});
	});

	$("#image_text").click(function() {
		$(".message_content").load("html/message/imageText.html");
		$(".preview_area").load("html/preview/image_text_preview.html");
	});

	$("#picture").click(function() {
		$(".message_content").load("html/message/picture.html");
		$(".preview_area").load("html/preview/picture_preview.html");
	});

	$("#file").click(function() {
		$(".message_content").load("html/message/file.html");
		$(".preview_area").load("html/preview/file_preview.html");
	});

	$("#video").click(function() {
		$(".message_content").load("html/message/video.html");
		$(".preview_area").load("html/preview/video_preview.html");
	});

	$("#sound").click(function() {
		$(".message_content").load("html/message/sound.html");
		$(".preview_area").load("html/preview/voice_preview.html");
	});

	//选择全部可见成员 进行消息发送
	$(".cancel").click(function() {
		$(".addUserText").css("display", "block");
		$(".check_all").css("display", "none");
	})

	//取消全选
	$(".addAll").click(function() {
		$(".addUserText").css("display", "none");
		$(".check_all").css("display", "block");
	})
}