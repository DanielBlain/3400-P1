import PropTypes from 'prop-types'
import MovieGadget from '../components/MovieGadget'


const MovieDisplayList = ({ movieList }) => {


    return (
        <div className='movieDisplayList'>
            <section>
                {
                    movieList && movieList.length > 0 ?
                        movieList.map(movieDetails => 
                            <MovieGadget
                                key={ `movieGadget-${movieDetails.id}` }
                                movieDetails={ movieDetails }
                                isInfoAvailable={ true }
                            />
                        )
                        : `No movies found under this filter!`
                }
            </section>
        </div>
    )
}

MovieDisplayList.propTypes = {
    movieList: PropTypes.array,
}

export default MovieDisplayList