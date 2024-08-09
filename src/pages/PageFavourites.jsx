import { useState, useEffect, useContext } from 'react'
import { MovieAppContext } from '../router/AppRouter'
import MovieDisplayList from '../components/MovieDisplayList'


const PageFavourites = () => {

    const { storageLockState, setInitializationLock, state, dispatch } = useContext(MovieAppContext)
    const [ countLikedMovies, setCountLikedMovies ] = useState(0)
    
    
    // Unlocked localStorage and found no filter? Set to NOW_PLAYING by default
    // Run when state of storageLockState changes
    useEffect(() => {
        if (!storageLockState && state.browse.likedMovies != null) {
            setCountLikedMovies(state.browse.likedMovies.length)
        }
    }, [storageLockState, state.browse.likedMovies])


    // Initialize PageFavourites
    // Run once on boot
    useEffect(() => {
        setInitializationLock(false)
    }, [])


    return (
        <>
            <h1>Your Favourite Movies</h1>
            <h2>Number of liked movies: {countLikedMovies}</h2>
            <h2>You&apos;ve liked these movies</h2>
            <MovieDisplayList filterType={state.browse.homeFilter} />
        </>
    )
}

export default PageFavourites