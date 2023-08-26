console.log("Background loaded");
	// For an introduct into what service_workers are and what they do see https://developer.chrome.com/docs/extensions/mv3/service_workers/
	// For a list of events that can occur in here see https://developer.chrome.com/docs/extensions/mv3/service_workers/events/
	// Web navigation permission https://developer.chrome.com/docs/extensions/reference/webNavigation/

chrome.runtime.onInstalled.addListener((details) => {
	if(details.reason == "install") {
		console.log("Installed");
	} else if(details.reason == "update") {
		console.log("Update");
	}
	console.log(details);
});
