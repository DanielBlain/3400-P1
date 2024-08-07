import { useContext, useEffect } from 'react'
import { MovieAppContext } from '../router/AppRouter'
import MovieDisplayList from '../components/MovieDisplayList'


// Home page movie filter constants
const NOW_PLAYING   = `/now_playing`
const POPULAR       = `/popular`
const TOP_RATED     = `/top_rated`
const UPCOMING      = `/upcoming`


const PageHome = () => {

    const { appState, setAppState, storagelockState, setInitializationLock } = useContext(MovieAppContext)


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
        setAppState({
            ...appState, 
            browse: {
                ...appState.browse,
                homeFilter: newFilter
            }
        })
    }


    // Initialize PageHome
    // Run once on boot
    useEffect(() => {
        setInitializationLock(false)
    }, [])


    // Unlocked localStorage and found no filter? Set to NOW_PLAYING by default
    // Run when state of storageLockState changes
    useEffect(() => {
        if (storagelockState === false && !isFilterValid(appState.browse.homeFilter)) {
            chooseFilter(NOW_PLAYING)
        }
    }, [storagelockState])


    return (
        <>
            <div>
                <div>
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
                </div>
                <div>
                    <h1>Movies!!</h1>
                    <p>
                        Current filter: {appState.browse.homeFilter}
                        <button key={NOW_PLAYING}   onClick={() => chooseFilter(NOW_PLAYING)}   >Now Playing</button>
                        <button key={POPULAR}       onClick={() => chooseFilter(POPULAR)}       >Popular</button>
                        <button key={TOP_RATED}     onClick={() => chooseFilter(TOP_RATED)}     >Top Rated</button>
                        <button key={UPCOMING}      onClick={() => chooseFilter(UPCOMING)}      >Upcoming</button>
                    </p>
                    {isFilterValid(appState.browse.homeFilter) && <MovieDisplayList filterType={appState.browse.homeFilter} />}
                </div>
            </div>
        </>
    )
}

export default PageHome