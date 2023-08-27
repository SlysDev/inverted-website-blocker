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

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
	console.log("Getting whitelisted URLS...");
	const synchedLists = chromeSync.lists;
	const activatedList = synchedLists[chromeSync.activatedIndex];

	let blockedTabs = await chrome.tabs.query({ url: activatedList.websites })
	let blockedTabIds = blockedTabs.map(tab => tab.id );

});

async function blockCurrentTab(){
	console.log("blocking tab")
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
