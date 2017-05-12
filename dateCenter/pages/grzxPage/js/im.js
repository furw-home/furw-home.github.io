// XMPP服务器BOSH地址  
var BOSH_SERVICE = 'http://192.168.20.36:5280/http-bind/';

// XMPP连接  
var connection = null;

// 当前状态是否连接  
var connected = false;

// 当前登录的JID  
var jid = "";

// 连接状态改变的事件  
function onConnect(status) {
	console.log(status)
	if (status == Strophe.Status.CONNFAIL) {
		alert("连接失败！");
	} else if (status == Strophe.Status.AUTHFAIL) {
		alert("登录失败！");
	} else if (status == Strophe.Status.DISCONNECTED) {
		alert("连接断开！");
		connected = false;
	} else if (status == Strophe.Status.CONNECTED) {
		//		alert("连接成功，可以开始聊天了！");
		connected = true;

		// 当接收到<message>节，调用onMessage回调函数  
		connection.addHandler(onMessage, null, 'message', null, null, null);

		// 首先要发送一个<presence>给服务器（initial presence）  
		connection.send($pres().tree());
		getFriendsList();
	}
};

//获取好友列表
function getFriendsList() {
	var iq = $iq({
		type: 'get'
	}).c('query', {
		xmlns: 'jabber:iq:roster'
	});
	connection.sendIQ(iq, getFriends); // getFriends是回调函数
}

function getFriends(iq) {
	$(iq).find('item').each(function() {
		var jid = $(this).attr('jid');
		var name = $(this).attr('name') || jid;
		$(".contacts_list").append("<ul>" + name + "</ul>");
	});
}

// 接收到<message>  
function onMessage(msg) {
	// 解析出<message>的from、type属性，以及body子元素  
	var from = msg.getAttribute('from');
	var type = msg.getAttribute('type');
	var elems = msg.getElementsByTagName('body');
	if (type == "chat" && elems.length > 0) {
		var body = elems[0];
		$(".chat_window").append("<li class='target'>" + from + "<br />" + Strophe.getText(body) + "</li>")
	}
	return true;
}

// 通过BOSH连接XMPP服务器  
function imLogin() {
	var cur_user = sessionStorage.data;
	var jid_name = cur_user + "@ejabberd.local";
	var pwd = sessionStorage.pwd;

	if (!connected) {
		connection = new Strophe.Connection(BOSH_SERVICE);
		connection.connect(jid_name, pwd, onConnect);
		jid = cur_user + "@ejabberd.local";;
	}
};

$(document).ready(function() {
	imLogin();
	// 发送消息  
	$(".input_box button").click(function(event) {
		var name = $(".input_box textarea").val();
		var targetContacts = $(".chat_head").html();
		if (connected) {
			// 创建一个<message>元素并发送  
			var msg = $msg({
				to: targetContacts,
				from: jid,
				type: 'chat'
			}).c("body", null, name);
			connection.send(msg.tree());

			//表情
			$(".chat_window").append("<li class='self'>" + jid + "<br />" + replace_em(name) + "</li>")

			function replace_em(str) {
				str = str.replace(/\</g, '<；');
				str = str.replace(/\>/g, '>；');
				str = str.replace(/\n/g, '<；br/>；');
				str = str.replace(/\[em_([0-9]*)\]/g, '<img src="face/$1.gif" border="0" />');
				return str;
			}

			$(".chat_window").scrollTop($(".chat_window")[0].scrollHeight);
			$(".input_box textarea").val("");
		} else {
			alert("请先登录！");
		}
	});
});