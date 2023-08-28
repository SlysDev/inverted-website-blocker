import createBlockScreen from "../components/block-screen";
import websiteFiltersManager from "./website-filters-manager";

let siteBlockingManager = (function () {
    let blockSite = () => {
        document.querySelector("body").innerHTML = "";
        document.querySelector("body").appendChild(createBlockScreen());
    };
    let checkBlockLists = function () {
        if (
            websiteFiltersManager.selectedFilter.websites.contains(
                window.location.hostname
            )
        ) {
            console.log("Blocking " + window.location.hostname);
            blockSite();
        }
    };
    return { blockSite, checkBlockLists };
})();

export default siteBlockingManager;
