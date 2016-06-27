function updateTab(tab) {
	chrome.tabs.sendMessage(tab.id, {
		event: tab.pinned ? 'pinned' : 'unpinned'
	});
}

chrome.tabs.onUpdated.addListener((id, changes, tab) => {
	if (typeof changes.pinned === 'boolean') {
		console.info(id, 'was', changes.pinned ? 'pinned' : 'unpinned');
		updateTab(tab);
	}
});

chrome.runtime.onMessage.addListener((message, {tab}) => {
	if (message.event === 'pageLoad' && tab.pinned) {
		console.info(tab.id, 'was pinned before load.');
		updateTab(tab);
	}
});
