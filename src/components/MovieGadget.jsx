import PropTypes from 'prop-types'
import { useReducer } from 'react'
// import useCustomContext from '../contexts/useCustomContext'
import MovieReducer from './MovieReducer'

const MovieGadget = ({ movieGadgetKey, movieDetails }) => {
    // const [ browse, setBrowse ] = useCustomContext( 'browseState' )

    const handleLike = e => {
        e.preventDefault()
    }

    const handleInfo = e => {
        e.preventDefault()
    }

    return (
        <article key={ movieGadgetKey } style={{border: '10px solid red'}}>
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