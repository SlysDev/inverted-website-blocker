import createBlockScreen from "../components/block-screen";

let siteBlockingManager = (function () {
    let blockSite = () => {
        document.querySelector("body").innerHTML = "";
        document.querySelector("body").appendChild(createBlockScreen());
    };
    let checkBlockLists = function () {
        if (window.location.hostname === "www.discord.com") {
            blockSite();
        }
    };
    return { blockSite, checkBlockLists };
})();

export default siteBlockingManager;
