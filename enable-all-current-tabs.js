// include this as a background script
// it will automatically load content_scripts on all current tabs
// But no stylesheeds yet
(function enableAllCurrentTabs () {
	var scripts = chrome.runtime.getManifest().content_scripts;
	scripts.forEach(function (script) {
		chrome.tabs.query({
			url: script.matches
		}, function (tabs) {
			tabs.forEach(function (tab) {
				script.js.forEach(function (file) {
					chrome.tabs.executeScript(tab.id, {
						allFrames: script.all_frames,
						file: file
					}, function (shutUp) {
						shutUp = chrome.runtime.lastError;
					});
				});
			});
		});
	});
}());