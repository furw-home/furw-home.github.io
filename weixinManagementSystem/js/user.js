//选中成员列行 设置背景色
function setBgColor() {
	$(".user_list .member_data").each(function() {
		$(this).click(function() {
			$(".user_list .member_data").removeClass("list_bg");
			$(this).addClass("list_bg");
			return false;
		});
	});
}

//显示选中的成员 详细信息, 右侧划出
function showTheSidebar() {
	$('.member_lists ul').click(function(e) {
		$(".the_sidebar").show();
		$(".member_name").html($(this).find(".user_name").html());
		$(".the_sidebar_content img").attr("src", $(this).find("img").attr("src"));
		$(".department").html($(this).find(".job").html());
		$(".zh").html($(this).find(".number").html());
		$(".sj").html($(this).find(".phone").html());
		$(".yx").html($(this).find(".email").html());
	});
	$(".the_sidebar_close").click(function() {
		$(".the_sidebar").hide();
	});
	$("button").focus(function() {　　
		this.blur()
	})
}

//设置树形菜单
function setTree() {
	var setting = {
		view: {
			showLine: false,
			dblClickExpand: false
		},
		check: {
			enable: true
		},
		edit: {
			showRenameBtn: false
		},
		callback: {
			onRightClick: OnRightClick,
			beforeRename: beforeRename,
			onClick: divisionzTreeOnCheck
		}
	};

	//单击节点
	function divisionzTreeOnCheck() {
		var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
			nodes = zTree.getSelectedNodes();
		var treeNode = nodes[0];


		var treeNodeP = treeNode.parentTId ? treeNode.getParentNode() : null;
		$(".member_lists").html("");
		if (treeNode.children != null) {
			for (var i = 0; i < treeNode.children.length; i++) {
				var childNode = treeNode.children[i];
				var parent = treeNode.getParentNode();
				$(".member_lists").append("<ul class='member_data'>" +
					"<li class='checks'><input type='checkbox' /> </li>" +
					"<li class='user'><img src='" + childNode.img + "' /><span class='user_name'>" + childNode.name + "</span></li>" +
					"<li class='number'>" + childNode.ccountNumber + "</li>" +
					"<li class='job'>" + childNode.position + "</li>" +
					"<li class='phone'>" + childNode.phone + "</li>" +
					"<li class='email'>" + childNode.email + "</li>" +
					"<li class='state'>" + childNode.state + "</li></ul>")
			}
		} else {
			if (treeNode.getParentNode() == null) {
				$(".member_lists").append("<p>空目录</p>")
			} else {}
		}
		showTheSidebar();
	}

	function beforeRename(treeId, treeNode, newName) {
		if (newName.length == 0) {
			alert("部门名称不能为空.");
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			setTimeout(function() {
				zTree.editName(treeNode)
			}, 10);
			return false;
		}
		return true;
	}

	function OnRightClick(event, treeId, treeNode) {
		if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
			zTree.cancelSelectedNode();
			showRMenu("root", event.clientX, event.clientY);
		} else if (treeNode && !treeNode.noR) {
			zTree.selectNode(treeNode);
			showRMenu("node", event.clientX, event.clientY);
		}
		addTreeNode();
		removeTreeNode();
		renameTreeNode();
	}

	function showRMenu(type, x, y) {
		$("#rMenu ul").show();
		if (type == "root") {
			$("#m_del").hide();
			$("#m_check").hide();
			$("#m_unCheck").hide();
		} else {
			$("#m_del").show();
			$("#m_check").show();
			$("#m_unCheck").show();
		}
		rMenu.css({
			"top": y + "px",
			"left": x + "px",
			"visibility": "visible"
		});
		$("body").bind("mousedown", onBodyMouseDown);
	}

	function hideRMenu() {
		if (rMenu) rMenu.css({
			"visibility": "hidden"
		});
		$("body").unbind("mousedown", onBodyMouseDown);
	}

	function onBodyMouseDown(event) {
		if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
			rMenu.css({
				"visibility": "hidden"
			});
		}
	}

	function addTreeNode() {
		$("#m_add").click(function() {
			hideRMenu();
			var newNode;
			$(".am-modal-prompt-input").attr("value", "");
			$('#my-prompt').modal({
				relatedTarget: this,
				onConfirm: function(e) {
					var name = '' + e.data || '';
					if (name) {
						newNode = {
							name: name
						};
						if (zTree.getSelectedNodes()[0]) {
							newNode.checked = zTree.getSelectedNodes()[0].checked;
							zTree.addNodes(zTree.getSelectedNodes()[0], newNode);
						} else {
							zTree.addNodes(null, newNode);
						}
					} else {
						alert("请出入部门名称");
					}
				}
			});
		})
	}

	function removeTreeNode() {
		$("#m_del").click(function() {
			hideRMenu();
			var nodes = zTree.getSelectedNodes();
			if (nodes && nodes.length > 0) {
				if (nodes[0].children && nodes[0].children.length > 0) {
					var msg = "要删除的节点是父节点，如果删除将连同子节点一起删掉。\n\n请确认！";
					if (confirm(msg) == true) {
						zTree.removeNode(nodes[0]);
					}
				} else {
					zTree.removeNode(nodes[0]);
				}
			}
		});
	}

	function renameTreeNode() {
		$("#m_rename").click(function() {
			hideRMenu();
			var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
				nodes = zTree.getSelectedNodes(),
				treeNode = nodes[0];
			zTree.editName(treeNode);
		})
	};


	var zNodes = "json/member.json";
	$().ready(function() {
		$.ajax({
			type: 'get',
			url: zNodes,
			dataType: 'json',
			success: function(data) {
				setTree(data);
			}
		});
	});

	var zTree, rMenu;

	function setTree(data) {
		$.fn.zTree.init($("#treeDemo"), setting, data);
		zTree = $.fn.zTree.getZTreeObj("treeDemo");
		rMenu = $("#rMenu");
	}
}