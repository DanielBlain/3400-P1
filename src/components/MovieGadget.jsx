import PropTypes from 'prop-types'
import { useEffect, useContext } from 'react'
import { MovieAppContext } from '../router/AppRouter'


const MovieGadget = ({ movieGadgetKey, movieDetails }) => {
    
    const { storagelockState, setInitializationLock, state, dispatch } = useContext(MovieAppContext)

    const isMovieLiked = () =>
        !storagelockState && state.browse.likedMovies.includes(movieDetails.id)


    const handleLike = e => {
        e.preventDefault()
        console.log('toggleLikeMovie.  add? ' + storagelockState + ' & ' + state.browse.likedMovies + ' & ' + state.browse.likedMovies.includes(movieDetails.id))
        dispatch({ type:'toggleLikeMovie', id: movieDetails.id, add: !isMovieLiked() })
    }


    const handleInfo = e => {
        // console.log( appState )
        e.preventDefault()
    }


    return (
        <article key={ movieGadgetKey } style={isMovieLiked() ? { border: '10px solid red' } : {}}>
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