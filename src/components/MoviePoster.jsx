import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { imageFolder } from '../config/config'


// Component for loading movie posters; interacts with
// a repository so we can avoid duplicating fetches
const MoviePoster = ({ posterRepo, movieDetails, handleClickFunc }) => {

    const [ isMovieLoaded, setIsMovieLoaded ] = useState(false)


    useEffect(() => {
        if (movieDetails === null) return
        setIsMovieLoaded(true)
    }, [movieDetails, setIsMovieLoaded])


    return isMovieLoaded ?
        (
            <img
                src={ `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}` }
                alt={ `Poster of movie titled: ${movieDetails.title}` }
                onClick={ handleClickFunc }
            />
        )
        : (
            // Default movie "poster" is an animated gif of television static
            <img
                src={ imageFolder + '/402107790_STATIC_NOISE_400.gif' }
                alt={ 'Movie poster pending' }
            />
        )
}

MoviePoster.propTypes = {
    posterRepo:         PropTypes.object,
    movieDetails:       PropTypes.object,
    handleClickFunc:    PropTypes.func,
}

export default MoviePoster