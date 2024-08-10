import PropTypes from 'prop-types'
import MovieGadget from '../components/MovieGadget'

const MovieDisplayList = ({ movieList }) => {
    
    return (
        <section className={`MovieDisplayList`}>
            {
                movieList && movieList.length > 0 ?
                    movieList.map(movieDetails => 
                        <MovieGadget key={`movieGadget-${movieDetails.id}`} movieDetails={movieDetails} />
                    )
                    : `No movies found under this filter!`
            }
        </section>
    )
}

MovieDisplayList.propTypes = {
    movieList: PropTypes.array,
}

export default MovieDisplayList