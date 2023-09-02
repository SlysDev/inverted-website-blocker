import { getUserData } from "./src/getUserData.js"
import { updateTabs } from "./src/updateTabs.js";

// Loads synched data into chromeSync if there is any
// Creates new data and sends to chrome.storage.sync if theres is no
// data already there

let chromeSync;
(async () => { chromeSync = await getUserData(); })();

// This actually does nothing as of now but thought it might save from hiccoughs
// later. It's designed to reload synched data if it ends up changing.

chrome.storage.sync.onChanged.addListener(async (result) => {
	chromeSync = await chrome.storage.sync.get();
	let activatedLists = chromeSync.lists[chromeSync.activatedIndex];
	updateTabs(activatedLists);
});

// This code runs when the user opens a new tab and will get all the URLS with
// "blocked" status and store them in blockedTabs before giving their tab ids
// to blockTab to have css injected

chrome.webNavigation.onDOMContentLoaded.addListener(() => {
	if(chromeSync.isBlocking) {
		const activatedList = chromeSync.lists[chromeSync.activatedIndex];
		console.log(chromeSync.activatedIndex);
		updateTabs(activatedList);
	}
});

chrome.runtime.onMessage.addListener(request => {
	switch(request.msg) {
		case "addCurrentURL":
			addCurrentURL();
			break;
	}
});

async function addCurrentURL() {
	const tab = await chrome.tabs.query({ active: true, currentWindow: true });
	let url = "*://" + (tab[0].url.split("//")[1].split("/")[0]) + "/*";
	chromeSync.lists[chromeSync.activatedIndex].websites.push(url);
	chrome.storage.sync.set({...chromeSync});
}
