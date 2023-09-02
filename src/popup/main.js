import { ToggleManager, PresetsManager } from "./components/mainComponentManagers.js";

const toggleManager = new ToggleManager();
const presetsManager = new PresetsManager();

const updateChromeSync = async () => {
	chromeSync = await chrome.storage.sync.get();
	toggleManager.syncValue(chromeSync.isBlocking);
	presetsManager.syncPresets(chromeSync.lists);
};
let chromeSync;

chrome.storage.sync.onChanged.addListener(updateChromeSync);
updateChromeSync();
