import { useMemo } from 'react'


/**
 * useMoviePoster - For rendering a movie poster acquired from TMDB.
 * Stores the resource in the browser's cache to avoid refetching
 * (though, currently I'm uncertain whether it's having a
 * performance benefit)
 * 
 * @param {object} movieDetails - The movie details, which should have
 * been fetched from TMDB
 * 
 * @param {function} handleClickFunc - A function to call whenever the
 * movie poster is clicked.
 * 
 * @returns render - A function you call to render the movie poster
 */
const useMoviePoster = ( movieDetails, handleClickFunc ) => {

    const render = useMemo(() => {
        if ( !movieDetails ) {
            return undefined
        }

        const newPoster = (
            <img
                src={ `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}` }
                alt={ `Poster of movie titled: ${movieDetails.title}` }
                onClick={ handleClickFunc }
            />
        )

        return newPoster
    }, [ movieDetails, handleClickFunc ])

    return { render }
}

export default useMoviePoster