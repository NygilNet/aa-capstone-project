function filterResults(list, tags) {

    let filteredList = list;

    if (tags[0]) {
        filteredList = queryTags(filteredList, tags)
    }

    return filteredList;

}

function queryTags(list, query) {

    let filteredList = list;

    for (let tag of query) {
        // filteredList = filteredList.filter(el =>)
    }

}

export function isFiltered(QuObj) {

    if (QuObj.tags[0]) return true;

    return false;

}

export default filterResults;
