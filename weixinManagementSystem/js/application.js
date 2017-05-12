var name;
var src;
/**
 * 选择应用,进行编辑
 *
 */
function selectApp() {
	$(".my_application img").each(function() {
		$(this).click(function() {
			name = this.alt;
			src = this.src;
			$(".app_list").css('display', 'none');
			$(".app_edit").css('display', 'block');
			$(".application_logo img").attr("src", src);
			$(".application_names span").html(name);
			$(".application_name").html(name);
		});
	});
	$(".back").click(function() {
		$(".app_list").css('display', 'block');
		$(".app_edit").css('display', 'none');
	});

	$(".delete_app button").click(function() {
		var title = $(".app_edit .application_name").html();
		$('#my-confirm').modal({
			relatedTarget: this,
			onConfirm: function(options) {
				$(".my_application ul li[title='" + title + "']").parent().remove();
				$(".app_edit").css('display', 'none');
				$(".app_list").css('display', 'block');
			},
			onCancel: function() {}
		});
	});
}

//添加应用
function addApplication(source) {
	//上传头像 并预览
	var file = source.files[0];
	if (window.FileReader) {
		var fr = new FileReader();
		fr.onloadend = function(e) {
			document.getElementById("portrait").src = e.target.result;
			src = e.target.result;
			$(".logo p").html("修改");
		};
		fr.readAsDataURL(file);
	}
}

//关闭窗口 清空已输入数据
function close() {
	$(".add_app_close").click(function() {
		clean();
	});
}

function clean() {
	document.getElementById("portrait").src = "img/iconfont-personalcenter.png";
	$(".logo p").html("添加Logo");
	$(".add_app_content .appName").val("");
	$(".add_app_content .describe").val("");
	$(".add_app_content .scope").val("");
	$(".add_app_content .files").val("");
}

//添加应用 非空验证
function validates() {
	$(".add_app_content button").click(function() {
		var name = $(".add_app_content .appName").val();
		var describe = $(".add_app_content .describe").val();
		var scope = $(".add_app_content .scope").val();
		var files = $(".add_app_content .files").val();

		if (files == '') {
			$(".error").css("display", "block");
		} else {
			$(".error").css("display", "none");
		}
		if (name == '') {
			$(".name_validate").css("display", "block");
		} else {
			$(".name_validate").css("display", "none");
		}
		if (describe == '') {
			$(".describe_validate").css("display", "block");
		} else {
			$(".describe_validate").css("display", "none");
		}
		if (scope == '') {
			$(".scope_validate").css("display", "block");
		} else {
			$(".scope_validate").css("display", "none");
		}
		if (files != '' && name != '' && describe != '' && scope != '') {
			var appName1 = $(".appName").val();
			$(".my_application").append("<ul><img src='" + src + "' alt='" + appName1 + "' title='" + appName1 + "' /><li class='app_name' title='" + appName1 + "'>" + appName1 + "</li></ul>");
			var $modal = $('#doc-modal-1');
			$modal.modal('close');
			clean();
			selectApp();
		}
	})
}