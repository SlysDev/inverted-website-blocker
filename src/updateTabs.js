import { blockTab } from "./blockTab.js";

const updateTabs = async (activatedList) => {
	let exceptionTabs = await chrome.tabs.query({
		url: activatedList.websites
	});
	if(activatedList.isWhitelist) {
		let allTabs = await chrome.tabs.query({});
		let exceptionIds = exceptionTabs.map(tab => tab.id);
		for(let i = 0; i < allTabs.length; i++) {
			if(!exceptionIds.includes(allTabs[i].id)) {
				blockTab(allTabs[i]);
			}
		}
	} else {
		for(let i = 0; i < exceptionTabs.length; i++) {
			blockTab(exceptionTabs[i]);
		}
	}
}

export { updateTabs };
