//登录非空验证
$(function() {
	$(".button").click(function() {
		name = $("#name").val();
		pwd = $("#pwd").val();
		var postdata = {
			"client": "pc",
			"username": name,
			"password": pwd
		};

		//var postData = "[" + JSON.stringify(data) + "]";
		if (name == "") {
			$(".msg").html("请您填写用户名");

		} else if (pwd == "") {
			$(".msg").html("请您填写密码");

		} else {
			tijiao_dataModel(JSON.stringify(postdata));
		};
	});
});

//ajax取得后台数据，并将数据传给登录成功跳转函数
function tijiao_dataModel(jsonData) {
	//1：获取数据
	var url = "http://192.168.20.242:9080/console/serviceinterface/userLoginVerify.jsp";
	//	var url = "http://localhost:8080/console/serviceinterface/userLoginVerify.jsp";

	//2:ajxa数据提交
	$.ajax({
		type: "POST",
		url: url,
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		data: "jsonData=" + jsonData,
		dataType: "json",
		success: function(data) {
			jumptoindex(data, jsonData);
		},
		error: function() {
			errorjumptoindex();
		}
	});
};

//登录成功跳转函数
function jumptoindex(data, jsonData) {

	if (data.success) {
		//将数据存入sessionStorage
		var pwd = JSON.parse(jsonData);
		sessionStorage.pwd = pwd.password;
		sessionStorage.data = data.userinfor.login_name;
		sessionStorage.entry = data.entry;
		sessionStorage.userId = data.userinfor.sm_user_id;

		window.location.href = "pages/grzxPage/grzx.html";
	} else {
		$("#pwd").val("");
		$("#name").val("");
		$(".msg").html("您填写的用户名或密码不正确");
	}
};

//没网情况下 走测试函数。
function errorjumptoindex() {
	if ($("#name").val() == "admin" && $("#pwd").val() == "123") {

		window.location.href = "pages/zbzxPage/zbzx.html";
	} else {
		$("#pwd").val("");
		$("#name").val("");
		$(".msg").html("您填写的用户名或密码不正确");
	}
};