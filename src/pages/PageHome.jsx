import { useState, useEffect, useContext } from 'react'
import { fetchList } from '../utilities/themoviedatabase/themoviedatabase'
import { api_key, tmdbEndpoint } from '../config/config'
import { MovieAppContext } from '../router/AppRouter'
import MovieDisplayList from '../components/MovieDisplayList'


// Home page movie filter constants, double as partial urls for fetching
const NOW_PLAYING   = `/now_playing`
const POPULAR       = `/popular`
const TOP_RATED     = `/top_rated`
const UPCOMING      = `/upcoming`


const PageHome = () => {

    const { isHomeBtnEnabled, setIsHomeBtnEnabled, isStorageUnlocked, setIsStorageUnlocked, state, dispatch } = useContext(MovieAppContext)
    const [ movieList, setMovieList ] = useState(null)
    const isFilterValid = (newFilter) =>
        newFilter === NOW_PLAYING
        || newFilter === POPULAR
        || newFilter === TOP_RATED
        || newFilter === UPCOMING


    function chooseFilter(newFilter) {
        if (!isFilterValid(newFilter)) {
            console.warn(`Bad filter selected: ${newFilter}`)
            return
        }
        dispatch({ type: 'chooseFilter', filter: newFilter })
    }


    // Fetch a new movie list based upon the filterType parameter
    const updateMovieList = async (filterType, pagination=`&page=1`) => {
        const url = `${tmdbEndpoint}${filterType}?include_adult=false&include_video=false&language=en-US${pagination}&api_key=${api_key}`
        const newMovieList = await fetchList(url)
        if (newMovieList) {
            setMovieList(newMovieList)
        }
    }


    // Unlock localStorage
    // Run once on boot
    useEffect(() => {
        setIsHomeBtnEnabled(false)
        setIsStorageUnlocked(true)
        return (() => {
            setIsStorageUnlocked(false)
        })
    }, [])
    

    // state.browse exists and found no valid filter? Set to NOW_PLAYING by default
    useEffect(() => {
        if (state && state.browse && !isFilterValid(state.browse.homeFilter)) {
            dispatch({ type: 'chooseFilter', filter: NOW_PLAYING })
        }
    }, [isStorageUnlocked, state, dispatch])


    // Update the movie list when the user changes the filter
    useEffect(() => {
        if (state && state.browse && isFilterValid(state.browse.homeFilter)) {
            updateMovieList(state.browse.homeFilter)
        }
    }, [isStorageUnlocked, state])


    return (
        <section id='mainContent'>
            <h2>Movies List</h2>
            <p>
                Current filter: {state && state.browse.homeFilter}
                <button key={NOW_PLAYING}   onClick={() => chooseFilter(NOW_PLAYING)}   >Now Playing</button>
                <button key={POPULAR}       onClick={() => chooseFilter(POPULAR)}       >Popular</button>
                <button key={TOP_RATED}     onClick={() => chooseFilter(TOP_RATED)}     >Top Rated</button>
                <button key={UPCOMING}      onClick={() => chooseFilter(UPCOMING)}      >Upcoming</button>
            </p>
            {state && state.browse && isFilterValid(state.browse.homeFilter) && <MovieDisplayList movieList={movieList} />}
        </section>
    )
}

export default PageHome