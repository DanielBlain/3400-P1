import PropTypes from 'prop-types'
import { useState } from 'react'
import MovieGadget from '../components/MovieGadget'


const MovieDisplayList = ({ movieList }) => {

    const [ isVoteNumbersDisplaying, setIsVoteNumbersDisplaying ] = useState(false)

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
                                isVoteNumbersDisplaying={ isVoteNumbersDisplaying }
                                setIsVoteNumbersDisplaying={ setIsVoteNumbersDisplaying }
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