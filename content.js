'use strict';

function closest(element, selector, checkYoSelf) {
	let parent = checkYoSelf ? element : element.parentNode;

	while (parent && parent !== document) {
		if (parent.matches(selector)) {
			return parent;
		}
		parent = parent.parentNode;
	}
}

function handleUnhandledClick(e) {
	const link = closest(e.target, 'a[href]', true);
	if (link.href.indexOf(location.protocol + '//' + location.host) < 0) {
		window.open(link.href);
		e.preventDefault();
	}
}

chrome.runtime.onMessage.addListener(message => {
	if (message.event === 'pinned') {
		document.documentElement.addEventListener('click', handleUnhandledClick);
	} else if (message.event === 'unpinned') {
		document.documentElement.removeEventListener('click', handleUnhandledClick);
	}
});
