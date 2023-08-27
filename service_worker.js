console.log("Background loaded");
// For an introduct into what service_workers are and what they do see https://developer.chrome.com/docs/extensions/mv3/service_workers/
	// For a list of events that can occur in here see https://developer.chrome.com/docs/extensions/mv3/service_workers/events/
	// Web navigation permission https://developer.chrome.com/docs/extensions/reference/webNavigation/

chrome.runtime.onInstalled.addListener(({ reason }) => {
	if (reason === 'install') {
		console.log("Extensions installed");
		console.log("Creating whitelist...");
		chrome.storage.sync.set({
			lists: [
				{
					websites: ["twitter", "youtu"],
					name: "Default",
					isWhitelist: false
				}
			]
		});
	}
});

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
	// https://stackoverflow.com/questions/12065029/redirecting-url-in-a-chrome-extension
});





	/* chrome.storage.sync.get("lists").then((result) => {
		console.log("Getting whitelisted URLS...");
		let activeList = result.lists[0];
		for(let i = 0; i < activeList.websites.length; i++) {
			let rgx = new RegExp("^https?:\/\/" + activeList.websites[i] + "[^\/]+");
			console.log(rgx);
			console.log(details.url);
			console.log(rgx.test(details.url));
			if(rgc.test(details.url)) {
				console.log("Blocked website " + details.url + " from loading");
				return {redirectUrl: }
			}
		}
	}) */
