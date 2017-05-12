$().ready(function() {
	//获取指标名称
	var curIndexJson = sessionStorage.getItem("selectedIndex");
	var curIndexOjb = JSON.parse(curIndexJson);
	$(".head h2").html(curIndexOjb.name + "  查看");
});
