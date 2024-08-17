import { useState, useEffect, useContext } from 'react'
import { TabPanel, TabList, Tabs, Tab } from 'react-tabs'
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
    const [ selectedTabNo, setSelectedTabNo ] = useState(0)


    const updateMovieList = async (filterType, pagination=`&page=1`) => {
        const url = `${tmdbEndpoint}${filterType}?include_adult=false&include_video=false&language=en-US${pagination}&api_key=${api_key}`
        const newMovieList = await fetchList(url)
        if (newMovieList) {
            setMovieList(newMovieList)
        }
    }
    

    // Call to select a new Movie Filter tab
    const setTabNo = ( tabNo ) => {
        switch (tabNo) {
            case 0:
                setSelectedTabNo(0)
                dispatch({ type: 'setFilter', filter: NOW_PLAYING })
                updateMovieList( NOW_PLAYING )
                return
            case 1:
                setSelectedTabNo(1)
                dispatch({ type: 'setFilter', filter: POPULAR })
                updateMovieList( POPULAR )
                return
            case 2:
                setSelectedTabNo(2)
                dispatch({ type: 'setFilter', filter: TOP_RATED })
                updateMovieList( TOP_RATED )
                return
            case 3:
                setSelectedTabNo(3)
                dispatch({ type: 'setFilter', filter: UPCOMING })
                updateMovieList( UPCOMING )
                return
            default:
                setSelectedTabNo(0)
                dispatch({ type: 'setFilter', filter: NOW_PLAYING })
                updateMovieList( NOW_PLAYING )
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


    // Ensure the selected tab matches the homeFilter
    // (E.G. if homeFilter is updated by localStorage)
    useEffect(() => {
        if (!state || !state.browse) {
            return
        }

        switch (state.browse.homeFilter) {
            case NOW_PLAYING:
                if ( selectedTabNo !== 0 ) {
                    setSelectedTabNo(0)
                    updateMovieList( NOW_PLAYING )
                }
                return
            case POPULAR:
                if ( selectedTabNo !== 1 ) {
                    setSelectedTabNo(1)
                    updateMovieList( POPULAR )
                }
                return
            case TOP_RATED:
                if ( selectedTabNo !== 2 ) {
                    setSelectedTabNo(2)
                    updateMovieList( TOP_RATED )
                }
                return
            case UPCOMING:
                if ( selectedTabNo !==3 ) {
                    setSelectedTabNo(3)
                    updateMovieList( UPCOMING )
                }
                return
            default:
                if ( selectedTabNo !== 0 ) {
                    setSelectedTabNo(0)
                    updateMovieList( NOW_PLAYING )
                }
        }
    }, [state, selectedTabNo])


    return (
        <section id='mainContent'>
            <Tabs
                selectedIndex={ selectedTabNo }
                onSelect={
                    (tabNo) => { setTabNo(tabNo) }
                }
            >
                <TabList className='filterPanel'>
                    <Tab className='gadgetButton'>
                        Now Playing
                        <div></div>
                    </Tab>
                    <Tab className='gadgetButton'>
                        Popular
                        <div></div>
                    </Tab>
                    <Tab className='gadgetButton'>
                        Top Rated
                        <div></div>
                    </Tab>
                    <Tab className='gadgetButton'>
                        Upcoming
                        <div></div>
                    </Tab>
                </TabList>
                <TabPanel>
                    <MovieDisplayList movieList={ movieList } />
                </TabPanel>
                <TabPanel>
                    <MovieDisplayList movieList={ movieList } />
                </TabPanel>
                <TabPanel>
                    <MovieDisplayList movieList={ movieList } />
                </TabPanel>
                <TabPanel>
                    <MovieDisplayList movieList={ movieList } />
                </TabPanel>
            </Tabs>
        </section>
    )
}

export default PageHome