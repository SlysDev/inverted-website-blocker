console.log("Background loaded");
	
// Loads lists from the sync of theyre there, otherwise creates a new 
let chromeSync;
(async () => {
	console.log("Getting storage sync");
	let sync = await chrome.storage.sync.get();
	if(sync) {
		console.log("Sync found");
		chromeSync = {...sync};
	} else {
		console.log("No sync found, creating sync");
		chromeSync = {
			lists: [
				{
					websites: ["*://*twitter*/*"],
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

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
	console.log("Getting whitelisted URLS...");
	const synchedLists = chromeSync.lists;
	const activatedList = synchedLists[chromeSync.activatedIndex];

	for(let i = 0; i < activatedList.websites.length; i++) {
		let regex = new RegExp(activatedList.websites[i]);
		if(regex.test(details.url)) {
			blockCurrentTab();
		}
	}
});

function blockCurrentTab(){
	// This shit dont work and I'm pretty sure this is the wrong apporach
	/* const scriptInjection = {
		func: function() {
			console.log(window);
			console.log(document);
		},
		injectImmediately: false,
	};
	chrome.scripting.executeScript(scriptInjection); */
}
