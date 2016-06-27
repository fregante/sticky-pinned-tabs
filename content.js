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

function newTabMaybe(e) {
	const link = closest(e.target, 'a[href]', true);
	if (link.href.indexOf(location.protocol + '//' + location.host) < 0) {
		window.open(link.href);
		e.preventDefault();
	}
}

let isPinned = false;
const html = document.documentElement;

chrome.runtime.onMessage.addListener(message => {
	if (!isPinned && message.event === 'pinned') {
		html.addEventListener('click', newTabMaybe);
		isPinned = true;
	} else if (isPinned && message.event === 'unpinned') {
		html.removeEventListener('click', newTabMaybe);
		isPinned = false;
	}
});

chrome.runtime.sendMessage({event: 'pageLoad'});
