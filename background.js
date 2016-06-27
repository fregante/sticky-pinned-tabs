function updateTab(tab) {
	chrome.tabs.sendMessage(tab.id, {
		event: tab.pinned ? 'pinned' : 'unpinned'
	});
}

chrome.tabs.onUpdated.addListener((tabId, changes, tab) => {
	console.log(tab, changes);
	if (typeof changes.pinned === 'boolean') {
		console.info(tab.id, 'was', changes.pinned ? 'pinned' : 'unpinned');
		updateTab(tab);
	}
});

chrome.runtime.onMessage.addListener((message, {tab}) => {
	if (message.event === 'pageLoad' && tab.pinned) {
		console.info(tab.id, 'was pinned before load.');
		updateTab(tab);
	}
});