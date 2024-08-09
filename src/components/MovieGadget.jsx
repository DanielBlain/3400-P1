import PropTypes from 'prop-types'
import { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom"
import { MovieAppContext } from '../router/AppRouter'


const MovieGadget = ({ movieDetails }) => {
    
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
        setIsInfoOpen(!isInfoOpen)
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
            className={ `movieGadget` }
            id={ `movieGadget-${movieDetails.id}` }
        >
            <img
                src={ `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` }
                alt={ `Poster of movie: ${movieDetails.title}` }
            />


            <div className={ `gadgetPanel` }>
                <div
                    className={ `gadgetButton like` }
                    onClick={ handleLike }
                >
                    <img
                        src={ isLikedFlag ? '/cinescape-like-filled-240.png' : '/cinescape-like-lined-240.png' }
                        alt='liked movie indicator'
                    />
                    <div>Like</div>
                </div>

                <div
                    className={ `gadgetButton info` }
                    onClick={ handleInfo }
                >
                    <img
                        src={ '/iconmonstr-magnifier-10-240.png' }
                        alt='more info indicator'
                    />
                    <div>Info</div>
                </div>
            </div>
            

            <div
                className={ `infoFloat` + (isInfoOpen ? ` open` : ``) }
                onClick={ handleInfo }
            >
                <article className={`infoSheet`}>
                    <h2>{ movieDetails.title }</h2>
                    <p>{ movieDetails.overview }</p>
                    <Link to={`/single/${movieDetails.id}`}>
                        Details
                    </Link>
                </article>
            </div>
        </article>
    )
}

MovieGadget.propTypes = {
    movieDetails: PropTypes.object,
}

export default MovieGadget

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