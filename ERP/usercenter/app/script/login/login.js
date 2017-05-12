window.onload = function(){
	var browser_hint_bg = document.getElementById("browser_hint_bg");
	var browser_hint = document.getElementById("browser_hint");
	var lessThenIE8 = function () {
	    var UA = navigator.userAgent,
	        isIE = UA.indexOf('MSIE') > -1,
	    	v = isIE ? /\d+/.exec(UA.split(';')[1]) : 'no ie';
	    return v < 10;
	}();
	if(lessThenIE8){
		browser_hint_bg.style.display = "block";
		browser_hint.style.display = "block";
	}
}