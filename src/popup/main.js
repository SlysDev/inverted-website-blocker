const toggle = document.querySelector(".toggle-checkbox");
const updateChromeSync = async (result) => {
	chromeSync = await chrome.storage.sync.get();
	console.log(chromeSync);
	if(toggle.checked != chromeSync.isBlocking) toggle.checked = chromeSync.isBlocking;
};

let chromeSync;
chrome.storage.sync.onChanged.addListener(updateChromeSync);
updateChromeSync();

toggle.addEventListener("change", async () => {
	chrome.storage.sync.set({ isBlocking: toggle.checked });
});
