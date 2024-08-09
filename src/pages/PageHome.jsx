import { useState, useEffect, useContext } from 'react'
import { fetchList } from '../utilities/themoviedatabase/themoviedatabase'
import { api_key, tmdbEndpoint } from '../config/config'

import { MovieAppContext } from '../router/AppRouter'
import MovieDisplayList from '../components/MovieDisplayList'


// Home page movie filter constants
const NOW_PLAYING   = `/now_playing`
const POPULAR       = `/popular`
const TOP_RATED     = `/top_rated`
const UPCOMING      = `/upcoming`


const PageHome = () => {

    const { storageLockState, setInitializationLock, state, dispatch } = useContext(MovieAppContext)
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


    // Initialize PageHome
    // Run once on boot
    useEffect(() => {
        setInitializationLock(false)
    }, [])


    // Unlocked localStorage and found no filter? Set to NOW_PLAYING by default
    // Run when state of storageLockState changes
    useEffect(() => {
        if (storageLockState === false && !isFilterValid(state.browse.homeFilter)) {
            chooseFilter(NOW_PLAYING)
        }
    }, [storageLockState])


    // Update the movie list when the user changes the filter
    useEffect(() => {
        if (isFilterValid(state.browse.homeFilter)) {
            updateMovieList(state.browse.homeFilter)
        }
    }, [state.browse.homeFilter])


    return (
        <>
            <h1>Home page</h1>
            <p>
                Page Home - This is where all the magic happens! Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, fugit tenetur exercitationem ratione officiis accusamus eligendi quaerat in autem, quia voluptas id iste dignissimos totam obcaecati vitae culpa vero neque.
            </p>
            <p>                        
                Veniam molestias, corporis obcaecati suscipit non aut ut nostrum illo quia minima maxime. Accusamus eum, omnis itaque nam repellendus, blanditiis sint maiores, nobis nihil porro praesentium iste explicabo reiciendis recusandae.
            </p>
            <p>
                Aperiam saepe maiores quod magni exercitationem assumenda itaque inventore et iusto nemo similique voluptatem quisquam possimus ut, omnis repellendus dolores sapiente nihil, soluta laboriosam error totam est cumque placeat? Dolor.
            </p>
            <h1>Movies!!</h1>
            <p>
                Current filter: {state.browse.homeFilter}
                <button key={NOW_PLAYING}   onClick={() => chooseFilter(NOW_PLAYING)}   >Now Playing</button>
                <button key={POPULAR}       onClick={() => chooseFilter(POPULAR)}       >Popular</button>
                <button key={TOP_RATED}     onClick={() => chooseFilter(TOP_RATED)}     >Top Rated</button>
                <button key={UPCOMING}      onClick={() => chooseFilter(UPCOMING)}      >Upcoming</button>
            </p>
            {isFilterValid(state.browse.homeFilter) && <MovieDisplayList movieList={movieList} />}
        </>
    )
}

export default PageHome