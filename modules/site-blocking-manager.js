import createBlockScreen from "../components/block-screen";

let siteBlockingManager = (function () {
    let blockSite = () => {
        document.querySelector("body").innerHTML = "";
        document.querySelector("body").appendChild(createBlockScreen());
    };
    let checkBlockLists = function () {
        if (window.location.hosteame) {
			console.log(window.location.hostname)
            blockSite();
        }
    };
    return { blockSite, checkBlockLists };
})();

export default siteBlockingManager;
