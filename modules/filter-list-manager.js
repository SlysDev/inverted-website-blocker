let filterListManager = (() => {
    const addWebsite = (websiteUrl) => {
        selectedFilter.websites.push(websiteUrl);
    };
    const removeWebsite = (websiteUrl) => {
        delete selectedFilter.websites[websites.indexOf(websiteUrl)];
    };
    const editWebsite = (websiteUrl, newUrl) => {
        selectedFilter.websites[websites.indexOf(websiteUrl)] = newUrl;
    };
    return { selectedFilter, addWebsite, removeWebsite, editWebsite };
})();

export default filterListManager;
