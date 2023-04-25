function filterResults(notes, tags) {

    let list = notes;

    if (tags[0]) {
        list = queryTags(list, tags)
    }

    return list;

}

function queryTags(list, query) {

    let filteredList = list;

    for (let tag of query) {
        // filteredList = filteredList.filter(el =>)
    }

}

function scanTags(searchTerm, tagList) {
    for (let tag of tagList) {
        // if (tag.)
    }
}

export function isFiltered(QuObj) {

    if (QuObj.tags[0]) return true;

    return false;

}

export default filterResults;
