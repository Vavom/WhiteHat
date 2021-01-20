function binarySearch(sortedArray, key){
    let start = 0;
    let end = sortedArray.length - 1;
    for(let i = 4; i > 0; i--) {
        while (start <= end) {
            let middle = Math.floor((start + end) / 2);
            if (sortedArray[middle].splice(i, 1) === key.splice(i,1)) {
                return middle;
            } else if (sortedArray[middle] < key) {
                start = middle + 1;
            } else {
                end = middle - 1;
            }
        }
    }
    return -1;
}

module.exports = {binarySearch}