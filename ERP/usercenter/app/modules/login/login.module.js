(function() {
	/**
	 * 作者: furw
	 * 描述: login module
	 */
	var loginModule = angular.module('loginModule', ['utilModule']);

	/**
	 * 作者: furw
	 * 描述: login 控制器
	 */
	loginModule.controller('loginCtrl', ['$scope', 'utilService',
		function($scope, utilService) {

			//登陆函数
			function login(user) {

				//清空提示消息
				$(".msg").html("");

				//改变登陆按钮状态
				$("._btn").html("正在登陆...");

				//md5密码加密
				//var pwd = hex_md5(user.pwd);

				//base64加密
				//var pwd_base64 = $.base64('encode', user.pwd);

				//参数
				//				var data = {
				//					username: user.name,
				//					password: pwd_base64
				//				};

				//请求后台登陆接口
				//				$.ajax({
				//					type: "POST",
				//					//async: false,
				//					url: utilService.SERVICE_URL + "admin/Login/login_cors.do",
				//					data: data,
				//					dataType: "json",
				//					success: function(data) {
				//						$(".msg").html("");
				//
				//						if(data.success) {
				//							$("._btn").html("登陆");
				//
				//							window.sessionStorage.setItem("userName", data.name); //存储用户名
				//							window.sessionStorage.setItem("userPhone", data.userPhone); //存储用户电话
				//							window.sessionStorage.setItem("userId", data.userId); //存储用户id
				//							window.sessionStorage.setItem("userSex", data.sex); //存储用户性别
				//							window.sessionStorage.setItem("ticket", data.ticket); //存储 ticket
				//							$.cookie('ticket', data.ticket); // 存储 cookie
				//							window.location.href = "index.html"; //页面跳转
				//
				//						} else {
				//							$("._btn").html("登陆");
				//							$(".msg").html("用户名或密码错误");
				//						}
				//
				//					},
				//					error: function() {
				//						$("._btn").html("登陆");
				//						$(".msg").html("服务器内部错误，请联系管理员！");
				//					}
				//				});

				//本地模拟登陆
				if(user.name == "admin" && user.pwd == "123") {
					$("._btn").html("登陆");
					window.sessionStorage.setItem("userName", "admin"); //存储用户名
					window.sessionStorage.setItem("userPhone", "12345676643"); //存储用户电话
					window.sessionStorage.setItem("userId", "userid"); //存储用户id
					window.sessionStorage.setItem("userSex", "男"); //存储用户性别
					window.sessionStorage.setItem("ticket", ""); //存储 ticket
					$.cookie('ticket', ""); // 存储 cookie
					window.location.href = "index.html"; //页面跳转
				} else {
					$("._btn").html("登陆");
					$(".msg").html("用户名或密码错误");
				}
				//本地模拟登陆结束

			};

			//点击按钮进行登陆
			$scope.login = function(user) {
				if(undefined == user) {
					$(".msg").html("请输入登陆名!");
					$("#username").focus();
				} else if(undefined == user.name) {
					$(".msg").html("请输入登陆名!");
					$("#username").focus();
				} else if(undefined == user.pwd) {
					$(".msg").html("请输入密码!");
					$("#password").focus();
				} else {
					login(user);
				}
			};

			//键盘回车进行登陆
			$(document).keydown(function(event) {
				if(event.keyCode == 13) { //绑定回车
					var _user = $scope.user;
					if(undefined == _user) {
						$(".msg").html("请输入登陆名!");
						$("#username").focus();
					} else if(undefined == _user.name) {
						$(".msg").html("请输入登陆名!");
						$("#username").focus();
					} else if(undefined == _user.pwd) {
						$(".msg").html("请输入密码!");
						$("#password").focus();
					} else {
						login(_user);
					}
				}
			});

		}
	]);
})();