import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

import { fetchList } from '../utilities/themoviedatabase/themoviedatabase'
import MovieGadget from '../components/MovieGadget'
import { api_key, tmdbEndpoint } from '../config/config'

const MovieDisplayList = ({ filterType }) => {
    
    const [ movieList, setMovieList ] = useState(null)

    // Display a new list based upon the list filter
    // Called through useEffect by way of prop connected to parent
    const updateMovieList = async (filterType, pagination=`&page=1`) => {
        const url = `${tmdbEndpoint}${filterType}?include_adult=false&include_video=false&language=en-US${pagination}&api_key=${api_key}`
        const newMovieList = await fetchList(url)
        if (newMovieList) {
            setMovieList(newMovieList)
        }
    }


    // Per above
    useEffect(() => {
        updateMovieList(filterType)
    }, [filterType])

    
    return (
        <section>
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
    filterType: PropTypes.string,
}

export default MovieDisplayList