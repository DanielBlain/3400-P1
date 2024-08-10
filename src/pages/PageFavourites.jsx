import { useState, useEffect, useContext } from 'react'
import { fetchSingleton } from '../utilities/themoviedatabase/themoviedatabase'
import { api_key, tmdbEndpoint } from '../config/config'

import { MovieAppContext } from '../router/AppRouter'
import MovieDisplayList from '../components/MovieDisplayList'


const PageFavourites = () => {

    const { isStorageUnlocked, setIsStorageUnlocked, state, dispatch } = useContext(MovieAppContext)
    const [ likedMoviesData, setLikedMoviesData ] = useState([])
    const [ numberOfLikedMovies, setNumberOfLikedMovies ] = useState(0)


    // Fetch the details of a liked movie
    const fetchMovieData = async (movieID) => {
        const url = `${tmdbEndpoint}/${movieID}?language=en-US&api_key=${api_key}`
        return await fetchSingleton(url)
    }


    // Fetch details of all liked movies
    const getLikedMoviesData = async () => {

        let newLikedMoviesData = await Promise.all(
            state.browse.likedMovies.map(async (movieID) => {
                const movieData = await fetchMovieData(movieID)
                return movieData
            })
        )
        return newLikedMoviesData.filter( queried => queried !== null )
    }


    // Unlock localStorage. Run once on boot
    useEffect(() => {
        setIsStorageUnlocked(true)
    }, [])


    // Update numberOfLikedMovies when the likedMovieData changes
    useEffect(() => {
        setNumberOfLikedMovies( likedMoviesData.length )
    }, [likedMoviesData])


    // Update the movie list when the user's liked movies change
    useEffect(() => {
        const fetchLikedMoviesData = async () => {
            setLikedMoviesData(  await getLikedMoviesData() )
        }

        if (state.browse.likedMovies) {
            fetchLikedMoviesData()
        }
    }, [state.browse.likedMovies])


    return (
        <>
            <h1>Your Favourite Movies</h1>
            <h2>Number of liked movies: { numberOfLikedMovies }</h2>
            <h2>You&apos;ve liked these movies</h2>
            {( numberOfLikedMovies > 0 ) ?
                <MovieDisplayList movieList={ likedMoviesData } />
                : <div>You haven&apos;t liked any movies!</div>
            }
        </>
    )
}

export default PageFavourites