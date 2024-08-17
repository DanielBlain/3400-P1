/**
 * The Movie Database (TMDB) returns movie data packaged in the following format
 * 
 * movieData {
 *      adult,
 *      backdrop_path,
 *      genre_ids,
 *      id,
 *      original_language,
 *      original_title,
 *      overview,
 *      popularity,
 *      poster_path,
 *      release_date,
 *      title,
 *      video,
 *      vote_average,
 *      vote_count
 *  }
 * 
 */


// Function to asynchronously fetch singleton data from an external database
// Usage e.g. const url = `${tmdbEndpoint}/${movieID}?language=en-US&api_key=${api_key}`
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
        return null
    }
}


// Function to asynchronously fetch list data from an external database
// Usage e.g. const url = `${tmdbEndpoint}${filterType}?${defaultQueries}${pagination}&api_key=${api_key}`
export async function fetchList(url) {

    try {
        console.log('attempting fetch')
        const promiseResponse = await fetch(url)
        const fulfilledPromise = await promiseResponse.json()

        console.log('Results of a fetch')
        console.log(fulfilledPromise.results)

        return fulfilledPromise.results
    }
    catch (error) {
        console.warn(`Unable to fetch: ${error}`)
        return null
    }
}