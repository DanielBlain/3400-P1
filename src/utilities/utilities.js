export const getYear = () => (new Date).getFullYear()


export const theMovieDatabaseEndpoint = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US`


// findFirstByKey finds the first object in the list with
// a key field matching soughtKey, or else -1
export const findFirstByKey = (list, soughtKey) =>
    Array.isArray(list)
    && list.findIndex(queried => (
        queried instanceof Object
        && queried.key === soughtKey
    ))


export async function fetchMoviesByFilter(filter) {
    try {
        const promiseResponse = await fetch(`https://api.themoviedb.org/3/movie${filter}?include_adult=false&language=en-US&page=1&api_key=e759de423f7146224523503903ef3f28`)
        const fulfilledResults = await promiseResponse.json()
        return fulfilledResults.results
    }
    catch (error) {
        console.log(`Unable to retrieve movie data from TMDB: ${error}`)
    }
}