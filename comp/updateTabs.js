import { blockTab } from "./blockTab.js";

const updateTabs = async (activatedList) => {
	let blockedTabs = await chrome.tabs.query({
		url: activatedList.websites
	});
	for(let i = 0; i < blockedTabs.length; i++) {
		console.log(`Blockng id ${blockedTabs[i].id}`);
		blockTab(blockedTabs[i].id)
	}
}

export { updateTabs };
