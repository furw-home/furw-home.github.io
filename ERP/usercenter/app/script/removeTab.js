//关闭当前tab 页签
function removeTab() {

	var _dataTag;

	for(var h = 0; h < $('.tab_content ul li', parent.document).length; h++) {
		var _selected = $('.tab_content ul li', parent.document).eq(h).attr("class");
		if(_selected == "selected") {
			_dataTag = $('.tab_content ul li', parent.document).eq(h).attr("data-tap");
			tabWidth = $('.tab_content ul li', parent.document).eq(h).width();
			tabWidth = tabWidth + 67;

			//移除当前tab
			$('.tab_content ul li', parent.document).eq(h).remove();

			sliding(-tabWidth); //计算tab 偏移;

			//tab 右滑动按钮 坐标
			var tab_right_x = $('#tab .right', parent.document).offset().left;

			//tab 页签 坐标
			var tab_content_x = $('#tab ul div', parent.document).offset().left;
			tab_content_x = tab_content_x + $('.tab_content ul div', parent.document).width();
			tab_content_x = tab_content_x + the_offset;

			//tab 左滑动按钮 坐标
			var tab_left_x = $('#tab .left', parent.document).offset().left;
			//tab 页签 坐标
			var tab_content_tab = $('#tab ul div', parent.document).offset().left;

			//计算tab 位置
			if(tab_content_x < tab_right_x) {
				if(tab_content_tab < tab_left_x) {
					$(".tab_content ul", parent.document).animate({
						left: '+=' + tabWidth + 'px'
					}, 1, function() { //回调
						var tab_content_left_w = $(".tab_content ul", parent.document).offset().left + tabWidth;
						if(tab_content_left_w > 250) {
							$(".tab_content ul", parent.document).css("left", "250px");
						}
					});
				};
			};
		}
	}

	for(var i = 0; i < $('.tab_content ul li', parent.document).length; i++) {
		var dataTag = $('.tab_content ul li', parent.document).eq(i).attr("data-code");

		//设置teb选中
		if(_dataTag == dataTag) {
			$('.tab_content ul li', parent.document).eq(i).attr("class", "selected");

			var _tabNumber = $('.tab_content ul li', parent.document).eq(i).attr("data-tabNumber");
			_tabNumber -= 1;
			$('.tab_content ul li', parent.document).eq(i).attr("data-tabNumber", _tabNumber);

			//切换iframe
			for(var y = 0; y < $('#content iframe', parent.document).length; y++) {
				$('#content iframe', parent.document).eq(y).css("display", "none");
				if($('#content iframe', parent.document).eq(y).attr("data-code") == dataTag) {
					$('#content iframe', parent.document).eq(y).css("display", "block");
				}
			}
		}
	}
}