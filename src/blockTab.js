const blockTab = ({ id }) => {
	const CSSInjection = {
		// css: "body { display: none; } html { width: 100vw; height: 100vh; background: red; }",
		files: ["./src/block.css"],
		target: {
			tabId: id
		} 
	};
	chrome.scripting.insertCSS(CSSInjection);
}

export { blockTab };
