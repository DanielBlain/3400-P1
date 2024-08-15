import PropTypes from 'prop-types'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { MovieAppContext } from '../router/AppRouter'


const MovieGadget = ({ movieDetails, isInfoAvailable }) => {
    
    const { storageLockState, setInitializationLock, state, dispatch } = useContext(MovieAppContext)
    const [ isLikedFlag, setIsLikedFlag ] = useState(false)
    const [ isInfoOpen, setIsInfoOpen ] = useState(false)
 

    const isMovieLiked = () =>
        !storageLockState
        && state.browse.likedMovies
        && state.browse.likedMovies.includes(movieDetails.id)


    const handleLike = e => {
        e.preventDefault()
        dispatch({
            type:'toggleLikeMovie',
            id: movieDetails.id,
            add: !isMovieLiked()
        })
    }


    const handleInfo = e => {
        e.preventDefault()
        if (isInfoAvailable) {
            setIsInfoOpen(!isInfoOpen)
        }
    }


    // On change of dependencies, check if the gadget (article) should have the isMovieLiked class
    useEffect(() => {
        setIsLikedFlag(
            !storageLockState
            && state.browse.likedMovies
            && state.browse.likedMovies.includes(movieDetails.id)
        )
    },[
        storageLockState,
        state.browse.likedMovies,
        movieDetails.id
    ])


    return (
        <article
            key={ `${movieDetails.id}` }
            className='movieGadget'
            id={ `movieGadget-${movieDetails.id}` }
        >

            <div className='posterPanel'>
                <img
                    src={ `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` }
                    alt={ `Poster of movie: ${movieDetails.title}` }
                    onClick={ handleInfo }
                />
                { isInfoAvailable && (
                    <div
                        className={ isInfoOpen ? `isInfoOpen` : `` }
                    >
                        <article
                            onClick={ handleInfo }
                        >
                            <h2>{ movieDetails.title }</h2>
                            <p>{ movieDetails.overview }</p>
                            <Link to={`/single/${movieDetails.id}`}>
                                Details
                            </Link>
                        </article>
                    </div>
                )}
            </div>

            <div className='detailPanel'>
                <button
                    className='detailButton like'
                    onClick={ handleLike }
                >
                    <img
                        src={ isLikedFlag ? '/cinescape-like-filled-240.png' : '/cinescape-like-lined-240.png' }
                        alt='liked movie indicator'
                    />
                    Like
                </button>

                {isInfoAvailable && (
                    <button
                        className='detailButton info'
                        onClick={ handleInfo }
                    >
                        <img
                            src='/iconmonstr-magnifier-10-240.png'
                            alt='liked movie indicator'
                        />
                        Info
                    </button>
                )}
            </div>
        </article>
    )
}

MovieGadget.propTypes = {
    movieDetails: PropTypes.object,
    isInfoAvailable: PropTypes.bool,
}

export default MovieGadget

/**
 Individual Movie Pages
 ● This page is accessed when a user clicks on the “More Info” link on an individual movie
 ● All the requirements from the “All Pages” requirements plus…
 ● POSTER       (or generic placeholder if no poster is available)
 ● TITLE
 ● DATE         of release
 ● RATE         Review rating - e.g. 67%
 ● PLOT         Summary
 ● LIKE         or unlike, in localStorage
 * 
 */

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