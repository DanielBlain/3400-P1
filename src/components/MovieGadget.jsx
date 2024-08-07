import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import useCustomContext from '../contexts/useCustomContext'
import useDispatchManager from '../customhooks/useDispatchManager'
import { BrowseActions } from '../config/config'

const MovieGadget = ({ movieGadgetKey, movieDetails }) => {
    const [ browseState ] = useCustomContext( 'browseState' )
    const [ , dispatch ] = useDispatchManager( BrowseActions, browseState )
    const [ isLiked, setIsLiked ] = useState(false)


    // // On initialization, update whether this movie is Liked
    // useEffect(() => {
    //     if (browseState.likedMovies && browseState.likedMovies.has( movieDetails.id ))
    //     {
    //         setIsLiked(true)
    //     }
    // }, [])


    const handleLike = e => {
        e.preventDefault()
        if (isLiked) {
            dispatch({ type: 'unlike', payload: {id: movieDetails.id} })
            setIsLiked(false)
        }
        else {
            dispatch({ type: 'like', payload: {id: movieDetails.id} })
            setIsLiked(true)
        }
    }

    const handleInfo = e => {
        e.preventDefault()
    }

    return (
        <article key={ movieGadgetKey } style={isLiked ? {border: '10px solid red'} : {}}>
            <a
                href={ `/single/${movieDetails.id}` }
            >
                <img
                    src={ `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` }
                    alt={ `Image of movie: ${movieDetails.title}` }
                />
            </a>
            <button onClick={ handleLike }>
                Like
            </button>
            <button onClick={ handleInfo }>
                Info
            </button>
        </article>
    )
}

MovieGadget.propTypes = {
    movieGadgetKey: PropTypes.string,
    movieDetails: PropTypes.object,
}

export default MovieGadget