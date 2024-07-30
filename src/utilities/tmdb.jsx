/*

Fields inside a movie record:

    - adult: prefer false, should be requested in the api call
    - backdrop_path: the path to the backdrop
    - genre_ids
    - id: the movie key on TMDB
        - original_title - likely won't need
        - original_language - likely won't need
    - overview
    - popularity
    - poster_path: the path to a poster, different sizes available, e.g. https://image.tmdb.org/t/p/${poster_size}${poster_path}
    - release_date
    - title
    - video - what even is this?
    - vote_average
        - vote_count - likely won't need

*/

export const theMovieDatabaseEndpoint = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US`


export async function fetchMoviesByFilter(filter) {
    try {
        const promiseResponse = await fetch(`https://api.themoviedb.org/3/movie${filter}?include_adult=false&language=en-US&page=1&api_key=e759de423f7146224523503903ef3f28`)
        const fulfilledResults = await promiseResponse.json()

        console.log(fulfilledResults.results)
        return fulfilledResults.results
    }
    catch (error) {
        console.log(`Unable to retrieve movie data from TMDB: ${error}`)
    }
}