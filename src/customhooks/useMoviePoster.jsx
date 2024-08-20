import { useState, useEffect } from 'react'


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