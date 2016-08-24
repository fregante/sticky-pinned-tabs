'use strict';

function newTabMaybe(e) {
	const link = e.target.closest('a[href]');
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
