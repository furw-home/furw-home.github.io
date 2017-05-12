//计算tab 偏移 用来存储tab 页宽度变量
var the_offset;
var theOffset;
var theOffset_obj = $("#theOffset", window.parent.document);
if(self != top) {} else { if($('.tab_content ul li').length == 1) { $("#theOffset").attr("data-theOffset", 0) } }

function sliding(index) {
	theOffset = theOffset_obj.attr("data-theOffset");
	theOffset = parseInt(theOffset);
	the_offset = theOffset + index;
	theOffset = theOffset_obj.attr("data-theOffset", the_offset)
};
$("#tab .left").click(function() {
	var tab_left_x = $("#tab .left").offset().left;
	tab_left_x = tab_left_x + 50;
	var tab_content_x = $("#tab ul div").offset().left;
	if(tab_content_x >= tab_left_x) {
		if(tab_left_x == 50) {

		} else {
			$(".tab_content ul").css("left", "250px")
		}
	} else {
		if(tab_content_x >= 50) {
			$(".tab_content ul").css("left", "250px")
		} else {
			$(".tab_content ul").animate({ left: '+=200px' }, 1)
		}
	}
});
$("#tab .right").click(function() {
	var the_offset1 = theOffset_obj.attr("data-theOffset");
	the_offset1 = parseInt(the_offset1);
	var tab_right_x = $("#tab .right").offset().left;
	var tab_content_x = $("#tab ul div").offset().left;
	tab_content_x = tab_content_x + $(".tab_content ul div").width();
	tab_content_x = tab_content_x + the_offset1;
	if(tab_content_x <= tab_right_x) {} else {
		var avg = tab_content_x - tab_right_x;
		if(avg < 200) {
			var sum = tab_right_x - tab_content_x;
			$(".tab_content ul").css("left", '+=' + sum + '+px')
		} else { $(".tab_content ul").animate({ left: '-=200px' }, 1) }
	}
});