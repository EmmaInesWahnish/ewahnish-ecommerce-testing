const findQobject = (arr, searchedId) => {

    const index = arr.findIndex(object => {
        return object.id === searchedId;
    });
    return index;
}

export default findQobject;
