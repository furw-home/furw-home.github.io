//创建tab

//获取父窗口 tab 叶签容器, 创建tab, 及iframe (参数依次为 tab名称, 唯一标识, url 地址)
function createTab(tabName, code, _url) {

	//判断是否存在tab
	var _isCode = "false";
	for(var i = 0; i < $('.tab_content ul li', parent.document).length; i++) {
		var _dataCode = $('.tab_content ul li', parent.document).eq(i).attr("data-code");
		if(code == _dataCode) {
			_isCode = "true";
			break;
		} else {
			_isCode = "false";
		}
	};

	//如果tab 页签, 那么移除tab的选中状态,设置当前tab 为选中状态
	if(_isCode == "true") {
		for(var j = 0; j < $('.tab_content ul li', parent.document).length; j++) {
			//移除 tab 页签的选中状态
			$('.tab_content ul li', parent.document).eq(j).removeClass("selected");
			var dataCode1 = $('.tab_content ul li', parent.document).eq(j).attr("data-code");
			if(code == dataCode1) {
				//设置 tab 页签选中状态
				$('.tab_content ul li', parent.document).eq(j).attr("class", "selected");
				//设置对应的iframe 显示
				for(var i = 0; i < $('#content iframe', parent.document).length; i++) {
					$('#content iframe', parent.document).eq(i).css("display", "none");
					if($('#content iframe', parent.document).eq(i).attr("data-code") == code) {
						$('#content iframe', parent.document).eq(i).css("display", "block");
					}
				};
			}
		};
	} else { //如果不存在 当前菜单对应tab 则创建新的tab

		var _dataCode1;
		for(var h = 0; h < $('.tab_content ul li', parent.document).length; h++) {
			var _selected = $('.tab_content ul li', parent.document).eq(h).attr("class");
			if(_selected == "selected") {
				_dataCode1 = $('.tab_content ul li', parent.document).eq(h).attr("data-code");
			}
		}

		for(var f = 0; f < $('.tab_content ul li', parent.document).length; f++) {
			var _class = $('.tab_content ul li', parent.document).eq(f).attr("class");
			if(_class == "selected") {
				var tabNumber = $('.tab_content ul li', parent.document).eq(f).attr("data-tabNumber");
				tabNumber = parseInt(tabNumber);
				tabNumber = tabNumber + 1;
				$('.tab_content ul li', parent.document).eq(f).attr("data-tabNumber", tabNumber);
			}
		}

		//移除 tab 页签的选中状态
		for(var y = 0; y < $('.tab_content ul li', parent.document).length; y++) {
			$('.tab_content ul li', parent.document).eq(y).removeClass("selected");
		};

		//创建 tab
		$('.tab_content ul', parent.document).append("<li class='selected' data-code=" + code + " data-element='c' data-tap=" + _dataCode1 + " ><span>" + tabName + "</span><i>×</i></li>");

		//计算新添加的tab页宽度
		var tabWidth1 = $('.tab_content ul li:last', parent.document).width();

		tabWidth1 = tabWidth1 + 67;

		sliding(tabWidth1); //计算tab 偏移

		//获取tab 容器的宽度
		var tab_content = $('.tab_content', parent.document).width();

		//获取tab 列表实际的宽度
		var tab_content_tab = $('.tab_content ul div', parent.document).width()

		//tab 右滑动按钮 坐标
		var tab_right_x = $('#tab .right', parent.document).offset().left;

		//tab 页签 坐标
		var tab_content_x = $('#tab ul div', parent.document).offset().left;
		tab_content_x = tab_content_x + $('.tab_content ul div', parent.document).width();
		tab_content_x = tab_content_x + the_offset;

		//计算tab 偏移度
		if(tab_content_x < tab_right_x) {
			if(tab_content_tab < tab_content) {} else {
				$('.tab_content ul', parent.document).animate({
					left: '-=' + average + 'px'
				}, 20);
			}
		} else {
			var average = tab_content_x - tab_right_x;
			$('.tab_content ul', parent.document).animate({
				left: '-=' + average + 'px'
			}, 20);
		};

		$('.animation', parent.document).show();

		//创建 iframe
		$('#content', parent.document).append("<iframe data-code=" + code + " src=''></iframe>");

		//设置 ifrmae 显示
		for(var i = 0; i < $('#content iframe', parent.document).length; i++) {
			$('#content iframe', parent.document).eq(i).css("display", "none");
			if($('#content iframe', parent.document).eq(i).attr("data-code") == code) {
				$('#content iframe', parent.document).eq(i).attr("src", _url);
				$('#content iframe', parent.document).eq(i).css("display", "block");
			}
		};

		$('.animation', parent.document).fadeOut(500); //淡出

		//tab 页创建结束

		var tab_content = $('.tab_content', parent.document);

		var breadcrumb = $('#breadcrumb', parent.document);
		var content_iframe = $('#content iframe', parent.document);
		var tab_right = $('#tab .right', parent.document);
		var tab_ul_div = $('#tab ul div', parent.document);
		var tab_content_ul_div = $('.tab_content ul div', parent.document);
		var tab_content_ul = $(".tab_content ul", parent.document);
		var tab_left = $('#tab .left', parent.document);

		//切换tab 页
		for(var i = 0; i < tab_content.find("li").length; i++) {
			tab_content.find("li").eq(i).unbind("click").click(function() {

				for(var j = 0; j < tab_content.find("li").length; j++) {
					tab_content.find("li").eq(j).removeClass("selected");
				};

				$(this).attr("class", "selected");
				//设置面包屑导航
				breadcrumb.find("li").html($(this).find("span").html());

				//切换到当前iframe
				for(var y = 0; y < content_iframe.length; y++) {
					content_iframe.eq(y).css("display", "none");
					if(content_iframe.eq(y).attr("data-code") == $(this).attr("data-code")) {
						content_iframe.eq(y).css("display", "block");
					}
				}

			});
		};

		//移除当前选项卡
		for(var i = 0; i < tab_content.find("li").length; i++) {
			tab_content.find("li").eq(i).find("i").unbind("click").click(function(e) {
				e.stopPropagation();

				var selected = $(this).parent().attr("class");

				var dataE1 = $(this).parent().attr("data-element");
				var tabWidth1;

				if(dataE1 == "c") {
					//获取当前删除的tab宽度
					tabWidth1 = $(this).parent().width();
					tabWidth1 = tabWidth1 + 67;

					if(selected == "selected") {
						var subscript = $(this).parent().index();
						subscript = subscript + 1;

						if(subscript == tab_content.find("li").length) {
							var index_prev = $(this).parent().index();
							index_prev = index_prev - 1;
							tabOperation($(this), tabWidth1);
							for(var j = 0; j < tab_content.find("li").length; j++) {
								if(j == index_prev) {
									//设为上一个tab为选中
									tab_content.find("li").eq(index_prev).attr("class", "selected");
									var _code = tab_content.find("li").eq(index_prev).attr("data-code");

									//设置面包屑选项卡
									breadcrumb.find("li").html(tab_content.find("li").eq(j).find("span").html());

									//设置tab对应的iframe 显示
									for(var o = 0; o < content_iframe.length; o++) {
										if(content_iframe.eq(o).attr("data-code") == _code) {
											content_iframe.eq(o).css("display", "block");
										}
									};
								}
							};
						} else {
							var index_next = $(this).parent().index();
							tabOperation($(this), tabWidth1);

							for(var j = 0; j < tab_content.find("li").length; j++) {
								if(j == index_next) {
									//设为下一个tab为选中
									tab_content.find("li").eq(index_next).attr("class", "selected");
									var _code1 = tab_content.find("li").eq(index_next).attr("data-code");

									//设置面包屑选项卡
									breadcrumb.find("li").html(tab_content.find("li").eq(j).find("span").html());

									//设置tab对应的iframe 显示
									for(var o = 0; o < content_iframe.length; o++) {
										if(content_iframe.eq(o).attr("data-code") == _code1) {
											content_iframe.eq(o).css("display", "block");
										}
									};
								}
							};
						}
					} else {
						tabOperation($(this), tabWidth1); //移除当前tab页 对应的iframe
					};
				}

				function tabOperation(this_tab, tabWidth1) {

					var dataE = this_tab.parent().attr("data-element");
					var _tap = this_tab.parent().attr("data-tap");

					var _tabNumber1;
					if(dataE == "c") {
						for(var h = 0; h < tab_content.find("li").length; h++) {
							var _code3 = tab_content.find("li").eq(h).attr("data-code");
							if(_code3 == _tap) {
								_tabNumber1 = tab_content.find("li").eq(h).attr("data-tabNumber");
								// _tabNumber1 = parseInt(tabNumber);
								_tabNumber1 -= 1;
								tab_content.find("li").eq(h).attr("data-tabNumber", _tabNumber1);
							}
						}

						this_tab.parent().remove(); //移除当前tab页签

						//移除当前tab页 对应的iframe
						for(var i = 0; i < content_iframe.length; i++) {
							if(content_iframe.eq(i).attr("data-code") == this_tab.parent().attr("data-code")) {
								content_iframe.eq(i).remove();
							}
						};

						sliding(-tabWidth1); //计算tab 偏移

						//计算移除后的tab 页位置
						//tab 右滑动按钮 坐标
						var tab_right_x = tab_right.offset().left;

						//tab 页签 坐标
						var tab_content_x = tab_ul_div.offset().left;
						tab_content_x = tab_content_x + tab_content_ul_div.width();
						tab_content_x = tab_content_x + the_offset;

						//tab 左滑动按钮 坐标
						var tab_left_x = tab_left.offset().left;
						//tab 页签 坐标
						var tab_content_tab = tab_ul_div.offset().left;

						//计算tab 位置
						if(tab_content_x < tab_right_x) {
							if(tab_content_tab < tab_left_x) {
								tab_content_ul.animate({
									left: '+=' + tabWidth1 + 'px'
								}, 1, function() { //回调
									var tab_content_left_w = tab_content_ul.offset().left + tabWidth1;
									if(tab_content_left_w > 250) {
										tab_content_ul.css("left", "250px");
									}
								});
							};
						};
					};

				};
			});
		};

	};

};