import FilterList from "../models/filter-list.js";

let websiteFiltersManager = (() => {
    let filterList = [];
    let selectedFilter;
    const findFilterList = (listName) => {
        try {
            return filterList[
                indexOf(filterList.find((filter) => filter.name == listName))
            ];
        } catch (e) {
            console.log(e);
            console.log("Filter List not found.");
        }
    };

    const addNewFilterList = (listName, isBlocking = false) => {
        filterList.push(new FilterList([], listName));
    };

    const deleteFilterList = (listName) => {
        delete findFilterList(listName);
    };

    const renameFilterList = (listName, newName) => {
        findFilterList(listName).name = newName;
    };

    const invertFilterList = (listName) => {
        findFilterList(listName).isBlocking =
            !findFilterList(listName).isBlocking;
    };

    return {
        filterList,
        addNewFilterList,
        deleteFilterList,
        renameFilterList,
        invertFilterList,
    };
})();

export default websiteFiltersManager;
