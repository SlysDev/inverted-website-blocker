console.log("Background loaded");
	
const blockTab = (tabId) => {
	const CSSInjection = {
		css: "* { background: red; }",
		target: {
			tabId: tabId
		} 
	};
	chrome.scripting.insertCSS(CSSInjection);
}

let chromeSync;
(async () => {
	console.log("Getting storage sync");
	let sync = await chrome.storage.sync.get();
	if(sync.lists) {
		console.log("Sync found");
		chromeSync = {...sync};
	} else {
		console.log("No sync found, creating sync");
		chromeSync = {
			lists: [
				{
					websites: ["*://twitter.com/*"],
					name: "Default",
					isWhitelist: false
				}
			],
			activatedIndex: 0
		};
		chrome.storage.sync.set({...chromeSync});
	}
	console.log(chromeSync);
})();


chrome.storage.sync.onChanged.addListener(async (result) => {
	console.log("Storage synch changed: ");
	console.log(result);
	chromeSync = await chrome.storage.sync.get();
});


chrome.webNavigation.onDOMContentLoaded.addListener(async () => {
	console.log("Getting whitelisted URLS...");
	const synchedLists = chromeSync.lists;
	const activatedList = synchedLists[chromeSync.activatedIndex];

	let blockedTabs = await chrome.tabs.query({ url: activatedList.websites })
	for(let i = 0; i < blockedTabs.length; i++) {
		blockTab(blockedTabs[i].id)
	}
});

