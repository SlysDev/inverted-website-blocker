console.log("Background loaded");
	
// Loads lists from the sync of theyre there, otherwise creates a new 
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
					websites: ["*://*.twitter.com/*", "*://*.youtube.com/*"],
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

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
	console.log("Getting whitelisted URLS...");
	const synchedLists = chromeSync.lists;
	const activatedList = synchedLists[chromeSync.activatedIndex];

	const toBeBlockedTabs = await chrome.tabs.query(
		{
			url: activatedList.websites
		}
	);
	console.log(toBeBlockedTabs);
	/* for(let i = 0; i < activatedList.websites.length; i++) {
		let regex = new RegExp(activatedList.websites[i]);
		if(regex.test(details.url)) {
			blockCurrentTab();
		}
	} */
});

async function blockCurrentTab(){
	console.log("Blocking tab");
	const currentTab = chrome.tabs.query(
		{
			url: ["*://*twitter*"]
		}
	);
	/* const CSSInjection = {
		css: "* {background-color: red;}",
		target:  
	};
	chrome.scripting.insertCSS(CSSInjection,
		(result) => {
			console.log("Injection completed. Printing passes args: ");
	:w		conosle.log(result);
		}
	); */
}
