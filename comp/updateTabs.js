import { blockTab } from "./blockTab.js";
const updateTabs = async (activatedList) => {
	let blockedTabs = await chrome.tabs.query({
		url: activatedList.websites
	});
	for(let i = 0; i < blockedTabs.length; i++) {
		blockTab(blockedTabs[i].id)
	}
}

export { updateTabs };
