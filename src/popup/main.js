(async () => {
	let chromeSync = await chrome.storage.sync.get();
	console.log(chromeSync);
})();
