const blockTab = (tabId) => {
	const CSSInjection = {
		// css: "body { display: none; } html { width: 100vw; height: 100vh; background: red; }",
		files: ["./comp/block.css"],
		target: {
			tabId: tabId
		} 
	};
	chrome.scripting.insertCSS(CSSInjection);
}

export { blockTab };
