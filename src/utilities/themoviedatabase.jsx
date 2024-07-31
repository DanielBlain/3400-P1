
// Function to asynchronously fetch singleton data from an external database
// Usage e.g. const url = `${databaseEndpoint}/${movieID}?language=en-US&api_key=${api_key}`
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
// Usage e.g. const url = `${databaseEndpoint}${filterType}?${defaultQueries}${pagination}&api_key=${api_key}`
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