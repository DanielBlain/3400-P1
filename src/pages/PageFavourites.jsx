import { useState, useEffect, useContext } from 'react'
import { fetchSingleton } from '../utilities/themoviedatabase/themoviedatabase'
import { api_key, tmdbEndpoint } from '../config/config'

import { MovieAppContext } from '../router/AppRouter'
import MovieDisplayList from '../components/MovieDisplayList'


const PageFavourites = () => {

    const { initializationLock, setInitializationLock, state, dispatch } = useContext(MovieAppContext)
    const [ countLikedMovies, setCountLikedMovies ] = useState(0)


    // Initialize PageFavourites
    // Run once on boot
    useEffect(() => {
        setInitializationLock(false)
    }, [])


    useEffect(() => {
        setCountLikedMovies(state.browse.likedMovies && state.browse.likedMovies.length)
    }, [state.browse.likedMovies])


    return (
        <>
            <h1>Your Favourite Movies</h1>
            <h2>Number of liked movies: {countLikedMovies}</h2>
            <h2>You&apos;ve liked these movies</h2>
            {/* {(countLikedMovies > 0) ?
                <MovieDisplayList movieList={ likedMovieData } />
                : <div>You haven&apos;t liked any movies!</div>
            } */}
        </>
    )
}

export default PageFavourites