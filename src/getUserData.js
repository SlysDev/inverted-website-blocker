
const getUserData = async () => {
	let sync = await chrome.storage.sync.get();
	if(!sync.lists) {
		sync = {
			lists: [
				{
					websites: [
						"*://twitter.com/*",
						"*://*.youtube.com/*",
						"*://*.reddit.com/*"
					],
					name: "Default",
					isWhitelist: false
				}
			],
			activatedIndex: 0,
			isBlocking: false
		};
		chrome.storage.sync.set({...sync});
	}
	return sync;
};

export { getUserData };
