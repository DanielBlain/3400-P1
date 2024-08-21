import { useState, useEffect } from 'react'


/**
 * useMoviePoster - For rendering a movie poster acquired from TMDB.
 * Stores the resource in the browser's cache to avoid refetching
 * (though, currently I'm uncertain whether it's having a
 * performance benefit)
 * 
 * @param {array} moviePosterRepo - An array to be used for saving the
 *      resource in the browser's cache
 * 
 * @param {object} movieDetails - The movie details, which should have
 * been fetched from TMDB
 * 
 * @param {function} handleClickFunc - A function to call whenever the
 * movie poster is clicked.
 * 
 * @returns render - A function you call to render the movie poster
 */
const useMoviePoster = ( moviePosterRepo, movieDetails, handleClickFunc ) => {

    const [ isMovieLoaded, setIsMovieLoaded ] = useState(false)


    useEffect(() => {
        if (movieDetails === null) return
        setIsMovieLoaded(true)
    }, [movieDetails, setIsMovieLoaded])


    function render() {
        if ( !isMovieLoaded ) {
            return undefined
        }

        const posterAcquired = moviePosterRepo.find( queried => queried.key === `${movieDetails.title}` )

        if (posterAcquired) {
            console.log('located poster')
            return posterAcquired.resource
        }
        else {
            console.log('rerendering a movie poster')
            const newResource = (
                <img
                    src={ `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}` }
                    alt={ `Poster of movie titled: ${movieDetails.title}` }
                    onClick={ handleClickFunc }
                />
            )
            moviePosterRepo.push({
                key: `${movieDetails.title}`,
                resource: newResource
            })
            return newResource            
        }
    }


    return [ render ]
}

export default useMoviePoster