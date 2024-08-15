import PropTypes from 'prop-types'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { MovieAppContext } from '../router/AppRouter'


const MovieGadget = ({ movieDetails, isInfoAvailable }) => {
    
    const { storageLockState, setInitializationLock, state, dispatch } = useContext(MovieAppContext)
    const [ isLikedFlag, setIsLikedFlag ] = useState(false)
    const [ isInfoOpen, setIsInfoOpen ] = useState(false)
    const [ ratingInDegrees, setRatingInDegrees ] = useState(200)
 

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


    useEffect(() => {
        if (movieDetails === null) return
        setRatingInDegrees( movieDetails.average_vote * 36.0 )
    }, [movieDetails])


    // On change of dependencies, check if the gadget (article) 
    // should have the isMovieLiked class
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
                    disabled={ isInfoAvailable }
                />
                { isInfoAvailable && (
                    <div
                        className={ isInfoOpen ? `isInfoOpen` : `` }
                        id={ `infoFloat-${movieDetails.id}` }
                    >
                        <article
                            onClick={ handleInfo }
                            disabled={ isInfoAvailable }
                        >
                            <h2>{ movieDetails.title }</h2>
                            <p>{ movieDetails.overview }</p>
                            <Link to={`/single/${movieDetails.id}`}>
                                Movie Details
                            </Link>
                        </article>
                    </div>
                )}
            </div>

            <section className='detailPanel'>
                <article>
                    <em>
                        Votes
                    </em>
                    {movieDetails && (
                        <div
                            className='voteIndicator'
                            style={{
                                background: `conic-gradient(#00E414 0deg, #00E414 ${ratingInDegrees}deg, black ${ratingInDegrees + 1}deg`
                            }}
                        >
                            {/** Intentionally empty - handled by CSS */}
                        </div>
                    )}
                </article>
                {isInfoAvailable ? (
                    <button
                        className='detailButton info'
                        onClick={ handleInfo }
                    >
                        Info
                    </button>
                )
                : (
                    <div></div>
                    // I MIGHT IMPLEMENT THIS LATER, IF TIME
                    // <button
                    //     className='detailButton info'
                    //     onClick={ handleInfo }
                    // >
                    //     Trailer
                    // </button>
                )}
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
                <article>
                    <em>
                        Release date
                    </em> 
                    <div className='detailLabel'>
                        { movieDetails.release_date }
                    </div>
                </article>
            </section>
        </article>
    )
}

MovieGadget.propTypes = {
    movieDetails:       PropTypes.object,
    isInfoAvailable:    PropTypes.bool,
}

export default MovieGadget

/**
 Individual Movie Pages
 ● This page is accessed when a user clicks on the “More Info” link on an individual movie
 ● All the requirements from the “All Pages” requirements plus…
 ● POSTER  /    (or generic placeholder if no poster is available)
 * Info button
 ● DATE    /    of release
 ● RATE    /    Review rating - e.g. 67%
 ● LIKE    /    or unlike, in localStorage
 ● TITLE   x
 ● PLOT    x    Summary
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