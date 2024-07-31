export const getYear = () => (new Date).getFullYear()

// findFirstByKey finds the first object in the list with
// a key field matching soughtKey, or else -1
export const findFirstByKey = (list, soughtKey) =>
    Array.isArray(list)
    && list.findIndex(queried => (
        queried instanceof Object
        && queried.key === soughtKey
    ))