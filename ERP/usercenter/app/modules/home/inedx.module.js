(function() {
	/**
	 * 作者: furw
	 * 描述: index module
	 */
	var indexModule = angular.module('indexModule', ['mainModule']);
	/**
	 * 作者: furw
	 * 描述: index 控制器
	 */
	indexModule.controller('indexCtrl', ['$scope', 'utilService', 'uiService', function($scope, utilService, uiService) {

		var menu; //左侧菜单数据 对象

		//初始化
		$scope.init = function() {
			$scope._userInfo = {}
		};

		//退出登陆
		$scope.loggedOut = function() {
			window.location.href = "login.html";
		};

		//刷新dom
		function CheckScopeBeforeApply() {
			if(!$scope.$$phase) {
				$scope.$apply();
			}
		};

		//刷新当前iframe
		$(".refresh").click(function() {
			var iframe_ = $("#content iframe").length;
			for(var i = 0; i < iframe_; i++) {
				var display_ = $("#content iframe").eq(i).css("display");
				if(display_ == "block") {
					//显示加载动画
					$(".animation").show();

					var src_ = $("#content iframe").eq(i).attr("src");
					$("#content iframe").eq(i).attr("src", src_);

					cancelAnimation(); //取消动画
				}
			}
		});

		//获取缓存中的用户信息
		var _usreName = window.sessionStorage.getItem("userName"); //存储用户名
		var _userPhone = window.sessionStorage.getItem("userPhone"); //存储用户电话
		var _userId = window.sessionStorage.getItem("userId"); //存储用户id
		var _userSex = window.sessionStorage.getItem("userSex"); //存储用户性别

		//设置用户性别
		var _sex = [{
			text: "男",
			value: "1"
		}, {
			text: "女",
			value: "2"
		}];

		// 初始化是否接收下拉框
		var sex_dropdownlist = $("#_sex").kendoDropDownList({
			dataTextField: "text",
			dataValueField: "value",
			dataSource: _sex
		}).data("kendoDropDownList");

		//修改密码窗口
		var window_pwd;
		$scope.modifyPwd = function(user_info) {

			window_pwd = $("#window_pwd").kendoWindow({
				width: 500,
				height: 370,
				title: "修改密码",
				visible: true, //是否显示
				resizable: false, //调整大小
				draggable: true, //拖拽
				modal: true, //遮罩
				pinned: true, //固定
			}).data("kendoWindow");

			$(".editValidMsg1").html("");
			$(".editValidMsg1").removeClass("Validform_checktip"); //移除提示消息图表
			$(".editValidMsg1").removeClass("Validform_wrong");

			$scope._userInfo.password = "";
			$scope._userInfo.confirmPassword = "";
			$scope._userInfo.name = _usreName; //用户姓名
			$scope._userInfo.userPhone = _userPhone; //用户电话

			var gender;
			if(_userSex == 1) {
				gender = "男";
			} else {
				gender = "女";
			}

			$("#_sex").data("kendoDropDownList").text(gender);
			CheckScopeBeforeApply();

			window_pwd.center(); //窗口显示在屏幕中心
			window_pwd.open(); //打开窗口

		};

		//关闭修改密码窗口
		$scope.cancel = function() {
			window_pwd.close();
		};

		//保存用户密码
		$scope.save_userinfo = function(save_user) {
			//表单验证
			var validation = uiService.createValidForm("save_validForm", "editValidMsg1");
			if(validation.check()) {

				//用户性别
				var sexId = $("#_sex").data("kendoDropDownList").value();
				sexId = parseInt(sexId);
				save_user.sex = sexId;

				//用户id
				_userId = parseInt(_userId);
				save_user.userId = _userId;

				//修改密码接口
				$.ajax({
					type: 'GET',
					url: utilService.SERVICE_URL + "system/User/updateUser_remote.do" + "?name=" + encodeURI(save_user.name) + "&sex=" + save_user.sex + "&userPhone=" + save_user.userPhone + "&password=" + encodeURI(save_user.password) + "&userId=" + save_user.userId,
					async: false,
					dataType: 'json',
					success: function(data) {
						if(data) {
							window_pwd.close();
							Showbo.Msg.confirm('密码修改成功！是否重新登录？', function(flag) {
								if(flag == 'yes') {
									window.location.href = "login.html";
								} else if(flag == 'no') {}
							});
						} else {
							Showbo.Msg.alert("修改密码失败");
						}
					}
				});
			};
		};

		//var ticket_cookie = $.cookie('ticket'); // 读取 cookie

		//获取当前登陆用户名, 将用户名渲染到首页
		var userName = utilService.USER_NAME;
		if(userName == null) {
			$(".userName").html("98ep_zj");
		} else {
			//$(".userName").html(userName + "@98ep.com");
			$(".userName").html(userName);
			//设置导航右边的下拉菜单宽度
			var menu_width = $(".drop_down").outerWidth(true);
			$(".drop-down-menu").css("width", menu_width);
		};

		//####################################
		//获取本地 菜单 ,测试
		$.ajax({
			type: 'GET',
			url: "../../usercenter/app/json/menu.json",
			async: false,
			dataType: 'json',
			success: function(data) {
				menu = data.privResults;
				generate(menu) //调用生成顶部导航函数
			}
		});
		//####################################

		//生成顶部导航函数
		function generate(menu) {

			//没有选中 则生成导航,并设置第一个导航为选中状态
			for(var i = 0; i < menu.length; i++) {
				if(i == 0) {
					$("#menu").append("<li class='hover' data-type='closes' data-systemUrl=" + menu[i].systemUrl + "> <span class='menu_name'>" + menu[i].systemName + "</span>  <span class='icon-chevron-down'></span></li>")
					$(".navContainer ul").append("<li data-systemUrl=" + menu[i].systemUrl + ">" + menu[i].systemName + "</li>")
					generateTree(i);
				} else {
					$(".navContainer ul").append("<li data-systemUrl=" + menu[i].systemUrl + ">" + menu[i].systemName + "</li>")
				}
				//调用生成左侧 菜单函数, 传入上级导航id (默认选中第一个)
			};

			//弹出导航容器
			$("#menu li").click(function(event) {
				if($("#menu li").attr("data-type") == "opens") {
					$(".navContainer").css("display", "none");
					$("#menu li").attr("data-type", "closes");
				} else {
					$(".navContainer").css("display", "block");
					$("#menu li").attr("data-type", "opens");
				}
				return false;
			});

			//切换导航
			$(".navContainer ul li").click(function() {
				$("#menu li").attr("data-systemUrl", $(this).attr("data-systemUrl"));
				$("#menu li .menu_name").html($(this).html());
				generateTree($(this).index());
			});

			//点击空白地方关闭导航窗口
			$("body").click(function() {
				$(".navContainer").css("display", "none");
				$("#menu li").attr("data-type", "closes");
			});

		};

		//根据导航id 生成左侧菜单
		function generateTree(index) {

			$("#menuTree").html(""); //清空树菜单，重新装载

			//侧边为关闭, 创建菜单同时 则改变tab 位置
			if($("#tab").offset().left == 0) {
				$("#tab").css("margin-left", "200px");
				$("#tab ul").css("left", "250px");
				$("#breadcrumb").css("margin-left", "210px");
			} else {}

			//判断左侧菜单状态, 状态为关闭 则打开
			if($("#sidebar").attr("data-type") == "close") {
				$("#sidebar").css("margin-left", "0px");
				$("#sidebar label i").attr("class", "icon-double-angle-left");
				$("#sidebar").attr("data-type", "open");
				$("#content").css("margin-left", "200px");
			};

			//侧边栏导航树配置
			var curMenu = null,
				zTree_Menu = null;
			var setting = {
				data: {
					simpleData: {
						enable: true
					},
					key: {
						url: "uri"
					}
				},
				view: {
					showLine: false,
					showIcon: false,
					selectedMulti: false,
					dblClickExpand: false,
					addDiyDom: addDiyDom
				},
				callback: {
					onClick: onClick
				}
			};

			//重构 ztree 样式
			function addDiyDom(treeId, treeNode) {
				var spaceWidth = 18;
				var switchObj = $("#" + treeNode.tId + "_switch"),
					icoObj = $("#" + treeNode.tId + "_ico");
				switchObj.remove();
				icoObj.before(switchObj);
				var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level) + "px'></span>";
				switchObj.before(spaceStr);
			}

			//根据导航id, 渲染菜单
			for(var i = 0; i < menu.length; i++) {
				if(i == index) {
					var treeObj = $("#menuTree");
					var treeObject = $.fn.zTree.init(treeObj, setting, menu[i].privs);
					treeObject.expandAll(true); //默认打开所有节点
					treeObj.addClass("showIcon"); //添加图标
				}

			};

		}; //渲染左侧菜单结束
		//左侧侧菜单, 单机回调函数 （实现切换菜单操作）
		function onClick(e, treeId, treeNode) {

			//如果平台为绩效管理则不支持菜单 单机打开
			for(var n = 0; n < $("#menu").length; n++) {
				var selectState = $("#menu li").eq(n).attr("class");
				var selectName = $("#menu li").eq(n).html();
				if(selectState == "hover") {
					if("绩效管理" == selectName) {} else {
						var zTree = $.fn.zTree.getZTreeObj("menuTree");
						zTree.expandNode(treeNode);
					}
				}
			}

			//面包屑导航
			$("#breadcrumb ul li").html(treeNode.name);

			if(treeNode.url != "") { //判断当前节点是否有url ，存在则打开子页面，不存在则打开目录
				//判断当前点击的是否是子节点 （如果是父节点则打开子节点,如果是子节点则打开对应的页面)
				//if(treeNode.children == "") {

				//移除tab 选中状态
				for(var j = 0; j < $(".tab_content li").length; j++) {
					$(".tab_content li").eq(j).removeClass("selected");
				}

				//判断当前选中的菜单 是否存在打开的tab 页签
				var isCode = "false";
				for(var e = 0; e < $(".tab_content li").length; e++) {
					var code = $(".tab_content li").eq(e).attr("data-code");
					if(treeNode.id == code) {
						isCode = "true";
						break;
					} else {
						isCode = "false";
					}
				};

				//如果当前 菜单存在对应tab 页签, 那么移除之前tab的选中状态,设置当前tab 为选中状态
				if(isCode == "true") {
					for(var i = 0; i < $(".tab_content li").length; i++) {
						//移除 tab 页签的选中状态
						$(".tab_content li").eq(j).removeClass("selected");
						var code = $(".tab_content li").eq(i).attr("data-code");
						if(code == treeNode.id) {
							//设置 tab 页签选中状态
							$(".tab_content li").eq(i).attr("class", "selected");
						}
					};
				} else { //如果不存在 当前菜单对应tab 则创建新的tab

					//创建tab页
					$(".tab_content ul").append("<li class='selected' data-code=" + treeNode.id + "  data-tabNumber='0' data-element='p'><span>" + treeNode.name + "</span><i>×</i></li>");
					//计算新添加的tab页宽度
					var tabwidth = $(".tab_content ul li:last").width();
					tabwidth = tabwidth + 67;
					sliding(tabwidth); //计算tab 偏移

					//获取tab 容器的宽度
					var tab_content = $(".tab_content").width();

					//获取tab 列表实际的宽度
					var tab_content_tab = $(".tab_content ul div").width()

					//tab 右滑动按钮 坐标
					var tab_right_x = $("#tab .right").offset().left;

					//tab 页签 坐标
					var tab_content_x = $("#tab ul div").offset().left;
					tab_content_x = tab_content_x + $(".tab_content ul div").width();
					tab_content_x = tab_content_x + the_offset;

					//计算tab 偏移度
					if(tab_content_x < tab_right_x) {
						if(tab_content_tab < tab_content) {} else {
							$(".tab_content ul").animate({
								left: '-=' + average + 'px'
							}, 20);
						}
					} else {
						var average = tab_content_x - tab_right_x;
						$(".tab_content ul").animate({
							left: '-=' + average + 'px'
						}, 20);
					};
					//tab 页创建结束

					//设置默认iframe 内容

					//切换tab 页
					for(var i = 0; i < $(".tab_content li").length; i++) {
						$(".tab_content li").eq(i).unbind("click").click(function(e) {

							for(var j = 0; j < $(".tab_content li").length; j++) {
								$(".tab_content li").eq(j).removeClass("selected");
							}
							$(this).attr("class", "selected");
							//设置面包屑导航
							$("#breadcrumb").find("li").html($(this).find("span").html());
							//切换到当前iframe
							for(var i = 0; i < $("#content iframe").length; i++) {
								$("#content iframe").eq(i).css("display", "none");
								if($("#content iframe").eq(i).attr("data-code") == $(this).attr("data-code")) {
									$("#content iframe").eq(i).css("display", "block");
								}
							}
						});
					};

					//移除当前选项卡
					for(var i = 0; i < $(".tab_content li").length; i++) {
						$(".tab_content li").eq(i).find("i").unbind("click").click(function(e) {
							e.stopPropagation();

							var selected = $(this).parent().attr("class");
							//获取当前删除的tab宽度
							var tabWidth = $(this).parent().width();
							tabWidth = tabWidth + 67;

							if(selected == "selected") {

								var subscript = $(this).parent().index();
								subscript = subscript + 1;
								if(subscript == $(".tab_content li").length) {

									var index_prev = $(this).parent().index();
									index_prev = index_prev - 1;

									tabOperation($(this), tabWidth);
									for(var j = 0; j < $(".tab_content li").length; j++) {
										if(j == index_prev) {
											//设为上一个tab为选中
											$(".tab_content li").eq(index_prev).attr("class", "selected");
											var code = $(".tab_content li").eq(index_prev).attr("data-code");

											//设置面包屑选项卡
											$("#breadcrumb").find("li").html($(".tab_content li").eq(j).find("span").html());

											//设置tab对应的iframe 显示
											for(var o = 0; o < $("#content iframe").length; o++) {
												if($("#content iframe").eq(o).attr("data-code") == code) {
													$("#content iframe").eq(o).css("display", "block");
												}
											};
										}
									};

								} else {
									var index_next = $(this).parent().index();
									tabOperation($(this), tabWidth);
									for(var j = 0; j < $(".tab_content li").length; j++) {
										if(j == index_next) {
											//设为下一个tab为选中
											$(".tab_content li").eq(index_next).attr("class", "selected");
											var code = $(".tab_content li").eq(index_next).attr("data-code");

											//设置面包屑选项卡
											$("#breadcrumb").find("li").html($(".tab_content li").eq(j).find("span").html());

											//设置tab对应的iframe 显示
											for(var o = 0; o < $("#content iframe").length; o++) {
												if($("#content iframe").eq(o).attr("data-code") == code) {
													$("#content iframe").eq(o).css("display", "block");
												}
											};

										}
									};
								}
							} else {
								tabOperation($(this), tabWidth); //移除当前tab页 对应的iframe
							};

							function tabOperation(this_tab, tabWidth) {

								var _tabNumber = this_tab.parent().attr("data-tabNumber");
								_tabNumber = parseInt(_tabNumber);
								if(_tabNumber > 0) {
									Showbo.Msg.alert("请先移除子页签")
								} else {
									this_tab.parent().remove(); //移除当前tab页签

									//移除当前tab页 对应的iframe
									for(var i = 0; i < $("#content iframe").length; i++) {
										if($("#content iframe").eq(i).attr("data-code") == this_tab.parent().attr("data-code")) {
											$("#content iframe").eq(i).remove();
										}
									};

									sliding(-tabWidth); //计算tab 偏移

									//tab 右滑动按钮 坐标
									var tab_right_x = $("#tab .right").offset().left;

									//tab 页签 坐标
									var tab_content_x = $("#tab ul div").offset().left;
									tab_content_x = tab_content_x + $(".tab_content ul div").width();
									tab_content_x = tab_content_x + the_offset;

									//tab 左滑动按钮 坐标
									var tab_left_x = $("#tab .left").offset().left;
									tab_left_x = tab_left_x + 50;
									//tab 页签 坐标
									var tab_content_tab = $("#tab ul div").offset().left;

									//计算tab 位置
									if(tab_content_x < tab_right_x) {
										if(tab_content_tab < tab_left_x) {
											$(".tab_content ul").animate({
												left: '+=' + tabWidth + 'px'
											}, 1, function() { //回调
												var tab_content_left_w = $(".tab_content ul").offset().left + tabWidth;
												if(tab_content_left_w > 250) {
													$(".tab_content ul").css("left", "250px");
												}
											});
										};
									};
								}

							};
						});
					};
				};

				//判断当前选中的菜单, 是否存在iframe
				var isIframe = "false";
				for(var i = 0; i < $("#content iframe").length; i++) {
					if($("#content iframe").eq(i).attr("data-code") == treeNode.id) {
						isIframe = "true";
						break;
					} else {
						isIframe = "false";
					}
				};
				//存在则 显示iframe
				if(isIframe == "true") {

					for(var i = 0; i < $("#content iframe").length; i++) {
						$("#content iframe").eq(i).css("display", "none");
						if($("#content iframe").eq(i).attr("data-code") == treeNode.id) {
							$("#content iframe").eq(i).css("display", "block");
						}
					}

				} else { //不存在 则创建新的iframe

					//显示加载动画
					$(".animation").show();

					//创建iframe
					$("#content").append("<iframe data-code=" + treeNode.id + " src=''></iframe>");

					for(var i = 0; i < $("#content iframe").length; i++) {
						$("#content iframe").eq(i).css("display", "none");
						if($("#content iframe").eq(i).attr("data-code") == treeNode.id) {

							//验证 url 后缀
							String.prototype.endWith = function(endStr) {
								var d = this.length - endStr.length;
								return(d >= 0 && this.lastIndexOf(endStr) == d)
							}

							//当前选中菜单 url
							var str = treeNode.url;
							//去掉前后空格
							str = $.trim(str);
							//验证URL 来自服务器还是本地
							if(str.endWith("html")) {

								//拼接page目录 (测试服)
								if(utilService.IS_SPELL) {
									if(treeNode.url.indexOf("/page") != -1) {} else {
										treeNode.url = "/page" + treeNode.url;
									}
								} else {}
								//给新创建的iframe 设置url 地址
								$("#content iframe").eq(i).attr("src", treeNode.url);

							} else {

								//获取 ticket
								var ticket = utilService.TICKET;

								//获取当前系统的url （当前选中的导航）
								for(var j = 0; j < menu.length; j++) {
									var _class = $("#menu li").eq(j).attr("class");
									if(_class == "hover") {
										//判断当前菜单项是否拼接 系统url
										if(treeNode.url.indexOf($("#menu li").eq(j).attr("data-systemUrl")) >= 0) {} else {
											treeNode.url = $("#menu li").eq(j).attr("data-systemUrl") + treeNode.url;
										}
									}
								};

								//拼接 ticket 判断用 ？ 拼接 还是 & 拼接
								if(treeNode.url.indexOf("?") != -1) {
									var _url = treeNode.url + "&ticket=" + ticket;
									$("#content iframe").eq(i).attr("src", _url);
								} else {
									var _url1 = treeNode.url + "?ticket=" + ticket
									$("#content iframe").eq(i).attr("src", _url1);
								}
							};

							//显示iframe
							$("#content iframe").eq(i).css("display", "block");
						}
					};
					cancelAnimation(); //取消动画
				}; //创建iframe 结束
				//} //根据当前选中的菜单 显示 iframe 结束

			};
		};

	}]);
})();