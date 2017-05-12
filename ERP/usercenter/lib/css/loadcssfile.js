(function() {

	this.loadcssfile = function(filename, filetype) {
		if(filetype == "css") {
			this.fileref = document.createElement('link');
			this.fileref.setAttribute("rel", "stylesheet");
			this.fileref.setAttribute("href", filename);
		}
		if(typeof this.fileref != "undefined") {
			document.getElementsByTagName("head")[0].appendChild(this.fileref);
		}
	};

	this.loadcssfile("../../../lib/css/bootstrap/bootstrap.css", "css");
	//	this.loadcssfile("../../../lib/css/ztree/zTreeStyle.css", "css");
	this.loadcssfile("http://nbcjs3.98ep.com/nbcssjs/publiccss/kendo.common.min.css", "css");
	this.loadcssfile("http://nbcjs3.98ep.com/nbcssjs/publiccss/kendo.rtl.min.css", "css");
	//皮肤
	this.loadcssfile("../../../lib/css/kendo_ui/kendo.blueopal.min.css", "css");
	//提示框
	this.loadcssfile("http://nbcjs3.98ep.com/nbcssjs/publiccss/showBo.css", "css");
	//字体图标
	this.loadcssfile("../../../lib/css/font_awesome/font-awesome.min.css", "css");
	//上传样式
	this.loadcssfile("../../../lib/css/plupload/plupload.css", "css");

})();