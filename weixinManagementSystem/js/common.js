$().ready(function() {

	//主页面 左侧导航
	$(".left_nav li").each(function() {
		$(this).click(function() {
			$(".left_nav li").removeClass("menu_first");
			$(this).addClass("menu_first");
			return false;
		});
	});

	//单击Logo 回到首页
	$("#logo").click(function() {
		location.href = 'index.html';
	});
	$(".left_nav img").click(function() {
		location.href = 'index.html';
	});

	/**
	 * 主页 左侧导航切换 并在右侧加载对应区域
	 *
	 */
	//默认为信息发送页面
	$(".content").load("html/message.html", function() {
		entrance(); //选择发要送消息的应用
		tabPage(); //加载 对应的消息类型区域 及 预览区域
		tab(); //选择发送消息的类型
		range(); //发送消息范围 tab
		treeMenu(); //成员树形列表
		sendMessage() //发送消息
	});

	//信息发送
	$("#news").click(function() {
		$(".content").load("html/message.html", function() {
			entrance();
			tabPage();
			tab();
			range();
			treeMenu();
			sendMessage()
		});
		return false;
	});

	//用户管理
	$("#user").click(function() {
		$(".content").load("html/userManagement.html", function() {
			setBgColor();
			setTree();
			showTheSidebar();
		});
		return false;
	});

	//应用管理
	$("#application").click(function() {
		$(".content").load("html/application.html", function() {
			selectApp();
			validates();
			close();
			addApplication();
		});
		return false;
	});

	//统计分析
	$("#statistical").click(function() {
		$(".content").load("html/statistical.html");
		return false;
	});

	//监督考核
	$("#supervise").click(function() {
		$(".content").load("html/supervise.html");
		return false;
	});

	//权限管理
	$("#authority").click(function() {
		$(".content").load("html/authority.html");
		return false;
	});

});