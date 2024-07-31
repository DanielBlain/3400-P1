export const getYear = () => (new Date).getFullYear()

// findFirstByKey finds the first object in the list with
// a key field matching soughtKey, or else -1
export const findFirstByKey = (list, soughtKey) =>
    Array.isArray(list)
    && list.findIndex(queried => (
        queried instanceof Object
        && queried.key === soughtKey
    ))

// Function to asynchronously fetch data from an external database
export async function fetchFromDatabase(url) {

    try {
        const promiseResponse = await fetch(url)
        const fulfilledPromise = await promiseResponse.json()

        console.log('Results of a fetch')
        console.log(fulfilledPromise.results)

        return fulfilledPromise.results
    }
    catch (error) {
        console.warn(`Unable to fetch: ${error}`)
    }
}