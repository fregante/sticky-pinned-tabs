chrome.tabs.query({
	pinned: true
}, tabs => tabs.forEach(tab => {
	chrome.tabs.sendMessage(tab.id, {
		event: 'pinned'
	});
}));

chrome.tabs.onUpdated.addListener((tabId, changes) => {
	if (typeof changes.pinned === 'boolean') {
		chrome.tabs.sendMessage(tabId, {
			event: changes.pinned ? 'pinned' : 'unpinned'
		});
	}
});
