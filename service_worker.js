import { getUserData } from "./comp/getUserData.js"
import { updateTabs } from "./comp/updateTabs.js";

// Loads synched data into chromeSync if there is any
// Creates new data and sends to chrome.storage.sync if theres is no
// data already there

let chromeSync;
(async () => { chromeSync = await getUserData(); })();

// This actually does nothing as of now but thought it might save from hiccoughs
// later. It's designed to reload synched data if it ends up changing.

// chrome.storage.sync.onChanged.addListener(async (result) => {
// 	console.log("Storage synch changed: ");
// 	console.log(result);
// 	chromeSync = await chrome.storage.sync.get();
// });


// This code runs when the user opens a new tab and will get all the URLS with
// "blocked" status and store them in blockedTabs before giving their tab ids
// to blockTab to have css injected

chrome.webNavigation.onDOMContentLoaded.addListener(() => {
	const activatedList = chromeSync.lists[chromeSync.activatedIndex];
	updateTabs(activatedList)
});

