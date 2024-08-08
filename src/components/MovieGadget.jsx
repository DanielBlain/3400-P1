import PropTypes from 'prop-types'
import { useState, useEffect, useContext } from 'react'
import { MovieAppContext } from '../router/AppRouter'


const MovieGadget = ({ movieGadgetKey, movieDetails }) => {
    
    const [ isLikedClass, setIsLikedClass ] = useState(false)
    const { storageLockState, setInitializationLock, state, dispatch } = useContext(MovieAppContext)

    const isMovieLiked = () =>
        !storageLockState && state.browse.likedMovies.includes(movieDetails.id)


    const handleLike = e => {
        e.preventDefault()
        dispatch({ type:'toggleLikeMovie', id: movieDetails.id, add: !isMovieLiked() })
    }


    const handleInfo = e => {
        // console.log( appState )
        e.preventDefault()
    }


    // On , check if the gadget (article) should have the isMovieLiked class
    useEffect(() => {
        setIsLikedClass(!storageLockState && state.browse.likedMovies && state.browse.likedMovies.includes(movieDetails.id))
    }, [storageLockState, state.browse.likedMovies, movieDetails.id])


    return (
        <article key={ movieGadgetKey } className={isLikedClass ? `isMovieLiked` : ``}>
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