chrome.app.runtime.onLaunched.addListener(function () {
	chrome.app.window.create("index.html", {
		bounds: {
			width: 330,
			height: 200
		},
		minWidth: 330,
		minHeight: 200,
		frame: "chrome"
	});
});
