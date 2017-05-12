function printFrame(frameWindow, timeout) {
	// Print the selected window/iframe
	var def = $.Deferred();
	try {
		setTimeout(function() {
			// Fix for IE : Allow it to render the iframe
			frameWindow.focus();
			try {
				// Fix for IE11 - printng the whole page instead of the iframe content
				if(!frameWindow.document.execCommand('print', false, null)) {
					// document.execCommand returns false if it failed -http://stackoverflow.com/a/21336448/937891
					frameWindow.print();
				}
			} catch(e) {
				frameWindow.print();
			}
			frameWindow.close();
			def.resolve();
		}, timeout);
	} catch(err) {
		def.reject(err);
	}
	return def;
}

//打印回调
function printContentInNewWindow(content, timeout) {
	// Open a new window and print selected content
	var w = window.open();
	w.document.write(content);
	w.document.close();
	return printFrame(w, timeout);
}