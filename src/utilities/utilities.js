export const getYear = () => (new Date).getFullYear()

// findFirstByKey finds the first object in the list with
// a key field matching soughtKey, or else -1
export const findFirstByKey = (list, soughtKey) =>
    Array.isArray(list)
    && list.findIndex(queried => (
        queried instanceof Object
        && queried.key === soughtKey
    ))

// Function to asynchronously fetch singleton data from an external database
export async function fetchSingleton(url) {

    try {
        const promiseResponse = await fetch(url)
        const fulfilledPromise = await promiseResponse.json()

        console.log('Results of a fetch')
        console.log(fulfilledPromise)

        return fulfilledPromise
    }
    catch (error) {
        console.warn(`Unable to fetch: ${error}`)
    }
}

// Function to asynchronously fetch list data from an external database
export async function fetchList(url) {

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