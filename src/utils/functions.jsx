function clean_array_data(dataArray, keys, filterFn){
    return dataArray
    .filter(filterFn || (() => true)) // If no filter function, keep all objects
    .map(item => {
        const cleanedItem = {};
        keys.forEach(key => {
            if (key in item) {
                cleanedItem[key] = item[key];
            }
        });
        return cleanedItem;
    });
}
export default clean_array_data