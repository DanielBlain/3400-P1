import { useState, useEffect, useContext } from 'react'
import { fetchSingleton } from '../utilities/themoviedatabase/themoviedatabase'
import { api_key, tmdbEndpoint } from '../config/config'

import { MovieAppContext } from '../router/AppRouter'
import MovieDisplayList from '../components/MovieDisplayList'
import HomeButton from '../components/HomeButton'


const PageFavourites = () => {

    const { isHomeBtnEnabled, setIsHomeBtnEnabled, isStorageUnlocked, setIsStorageUnlocked, state, dispatch } = useContext(MovieAppContext)
    const [ likedMoviesData, setLikedMoviesData ] = useState([])
    const [ numberOfLikedMovies, setNumberOfLikedMovies ] = useState(0)


    // Fetch the details of a liked movie
    const fetchMovieData = async (movieID) => {
        const url = `${tmdbEndpoint}/${movieID}?language=en-US&api_key=${api_key}`
        return await fetchSingleton(url)
    }


    // Flag to enable PageHome button, and unlock localStorage
    // Run once on boot
    useEffect(() => {
        setIsHomeBtnEnabled(true)
        setIsStorageUnlocked(true)
        return (() => {
            setIsStorageUnlocked(false)
        })
    }, [setIsHomeBtnEnabled, setIsStorageUnlocked])


    // Update numberOfLikedMovies when the likedMovieData changes
    useEffect(() => {
        setNumberOfLikedMovies( likedMoviesData.length )
    }, [likedMoviesData])


    // Update the movie list when the user's liked movies change
    useEffect(() => {
        const fetchLikedMoviesData = async () => {
            let newLikedMoviesData = await Promise.all(
                state.browse.likedMovies.map(async (movieID) => {
                    const movieData = await fetchMovieData(movieID)
                    return movieData
                })
            )
            return newLikedMoviesData.filter( queried => queried !== null )
        }

        const updateLikedMoviesData = async () => {
            setLikedMoviesData(  await fetchLikedMoviesData() )
        }

        if (state && state.browse && state.browse.likedMovies) {
            updateLikedMoviesData()
        }
    }, [isStorageUnlocked, state])


    return (
        <section id='mainContent'>
            <h2>You&apos;ve liked { numberOfLikedMovies } movies</h2>
            {( numberOfLikedMovies > 0 ) ?
                <MovieDisplayList movieList={ likedMoviesData } />
                : <div>You haven&apos;t liked any movies!</div>
            }
            <HomeButton>
                <p>
                    Click to go Home
                </p>
            </HomeButton>
        </section>
    )
}

export default PageFavourites