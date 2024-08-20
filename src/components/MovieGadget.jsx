import PropTypes from 'prop-types'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import useMoviePoster               from '../customhooks/useMoviePoster'
import { MovieAppContext }          from '../router/AppRouter'
import { imageFolder }              from '../config/config'
import { extractDateComponents }    from '../utilities/utilities'
import RatingsIndicators            from '../components/RatingsIndicators'


const MovieGadget = ({ movieDetails, isInfoAvailable, isVoteNumbersDisplaying, setIsVoteNumbersDisplaying }) => {
    
    const {
        isHomeBtnEnabled,
        setIsHomeBtnEnabled,
        moviePosterRepo,
        isStorageUnlocked,
        setIsStorageUnlocked,
        state,
        dispatch,
    } = useContext(MovieAppContext)

    const [ releaseDateComponents, setReleaseDateComponents ] = useState(null)
    const [ voteAverage, setVoteAverage ] = useState(0)
    const [ isLikedFlag, setIsLikedFlag ] = useState(false)
    const [ isInfoOpen, setIsInfoOpen ] = useState(false)


    const isMovieLiked = () =>
        !isStorageUnlocked
        && state
        && state.browse
        && state.browse.likedMovies
        && state.browse.likedMovies.includes(movieDetails.id)


    const handleLike = e => {
        if (!movieDetails) {
            return
        }
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


    const [ renderPoster ] = useMoviePoster( moviePosterRepo, movieDetails, handleInfo )


    // Update movie details when the movieDetails array is updated
    useEffect(() => {        
        if (movieDetails === null) return
        setReleaseDateComponents( extractDateComponents( movieDetails.release_date ))
        setVoteAverage( movieDetails.vote_average )
        setIsLikedFlag(
            isStorageUnlocked
            && state
            && state.browse
            && state.browse.likedMovies
            && state.browse.likedMovies.includes(movieDetails.id)
        )
    }, [isStorageUnlocked, isInfoAvailable, state, movieDetails])


    return (
        <article
            key={ `${movieDetails.id}` }
            className='movieGadget'
            id={ `movieGadget-${movieDetails.id}` }
        >
            <div className='posterPanel'>

                {/** The movie's poster */}
                { !movieDetails ?
                    // Default movie "poster" is an animated gif of television static
                    <img
                        src={ imageFolder + '/402107790_STATIC_NOISE_400.gif' }
                        alt={ 'Movie poster pending' }
                    />
                    : renderPoster()
                }

                {/** infoFloat, usually hidden */}
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
                            <Link to={`/single/${movieDetails.id}`} >
                                Movie Details
                            </Link>
                        </article>
                    </div>
                )}
            </div>


            <section className='gadgetPanel'>

                {/** Release Date readout */}
                <article>
                    <strong>
                        Release
                    </strong>
                    { releaseDateComponents && (
                        <div className='gadgetLabel'>
                            <div>
                                { releaseDateComponents.year }
                            </div>
                            <div>
                                { `${releaseDateComponents.month}-${releaseDateComponents.day}` }
                            </div>
                        </div>
                    )}
                </article>

                {/** Average Votes dials */}
                <article>
                    <strong>
                        Average Votes
                    </strong>
                    {movieDetails && (
                        <RatingsIndicators
                            ratingOutOfTen={ voteAverage }
                            isVoteNumbersDisplaying={ isVoteNumbersDisplaying }
                            setIsVoteNumbersDisplaying={ setIsVoteNumbersDisplaying }
                        />
                    )}
                </article>

                {/** Info Button */}
                {isInfoAvailable ? (
                    <button
                        className='gadgetButton info'
                        onClick={ handleInfo }
                    >
                        <img
                            src={ imageFolder + '/iconmonstr-magnifier-10-240.png' }
                            alt='Like button icon'
                        />
                        Info
                    </button>
                )
                : (
                    // Intentionally empty; is on a page where no Info button is required
                    <div></div>
                )}

                {/** Like Button */}
                <button
                    className='gadgetButton like'
                    onClick={ handleLike }
                >
                    <img
                        src={ isLikedFlag ?
                            imageFolder + '/cinescape-like-filled-240.png'
                            : imageFolder + '/cinescape-like-lined-240.png'
                        }
                        alt='Like button icon'
                    />
                    Like
                </button>
            </section>
        </article>
    )
}

MovieGadget.propTypes = {
    movieDetails:               PropTypes.object,
    isInfoAvailable:            PropTypes.bool,
    isVoteNumbersDisplaying:    PropTypes.bool,
    setIsVoteNumbersDisplaying: PropTypes.func,
}

export default MovieGadget