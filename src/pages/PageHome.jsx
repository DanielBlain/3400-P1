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

    const {
        isHomeBtnEnabled,
        setIsHomeBtnEnabled,
        moviePosterRepo,
        isStorageUnlocked,
        setIsStorageUnlocked,
        state,
        dispatch,
    } = useContext(MovieAppContext)

    const [ movieList_0, setMovieList_0 ] = useState(null)
    const [ movieList_1, setMovieList_1 ] = useState(null)
    const [ movieList_2, setMovieList_2 ] = useState(null)
    const [ movieList_3, setMovieList_3 ] = useState(null)
    const [ selectedTabNo, setSelectedTabNo ] = useState(0)


    const updateMovieList = async (filterType, pagination=`&page=1`) => {
        const url = `${tmdbEndpoint}${filterType}?include_adult=false&include_video=false&language=en-US${pagination}&api_key=${api_key}`
        const newMovieList = await fetchList(url)
        if (newMovieList) {
            switch ( filterType ) {
                case NOW_PLAYING:
                    setMovieList_0(newMovieList)
                    break
                case POPULAR:
                    setMovieList_1(newMovieList)
                    break
                case TOP_RATED:
                    setMovieList_2(newMovieList)
                    break
                case UPCOMING:
                    setMovieList_3(newMovieList)
                    break
            }
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


    // i) Choose correct HomeBtn state
    // ii) Unlock localStorage
    // Run once on boot
    useEffect(() => {
        setIsHomeBtnEnabled(false)
        setIsStorageUnlocked(true)
        return (() => {
            setIsStorageUnlocked(false)
        })
    }, [setIsHomeBtnEnabled, setIsStorageUnlocked])


    // Ensure the selected tab matches the homeFilter
    // (Might otherwise differ if E.G. homeFilter is updated by localStorage)
    useEffect(() => {
        if (!state || !state.browse) {
            return
        }

        switch (state.browse.homeFilter) {
            case NOW_PLAYING:
                if ( selectedTabNo !== 0 || !movieList_0 ) {
                    setSelectedTabNo(0)
                    updateMovieList( NOW_PLAYING )
                }
                return
            case POPULAR:
                if ( selectedTabNo !== 1 || !movieList_1 ) {
                    setSelectedTabNo(1)
                    updateMovieList( POPULAR )
                }
                return
            case TOP_RATED:
                if ( selectedTabNo !== 2 || !movieList_2 ) {
                    setSelectedTabNo(2)
                    updateMovieList( TOP_RATED )
                }
                return
            case UPCOMING:
                if ( selectedTabNo !==3 || !movieList_3 ) {
                    setSelectedTabNo(3)
                    updateMovieList( UPCOMING )
                }
                return
            default:
                setSelectedTabNo(0)
                updateMovieList( NOW_PLAYING )
        }
    }, [state, selectedTabNo, movieList_0, movieList_1, movieList_2, movieList_3])


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
                        <div>
                            {/**
                             * Intentionally empty
                             * Operates as an indicator light through pure CSS effects
                             */}
                        </div>
                    </Tab>
                    <Tab className='gadgetButton'>
                        Popular
                        <div>
                            {/**
                             * Intentionally empty
                             * Operates as an indicator light through pure CSS effects
                             */}
                        </div>
                    </Tab>
                    <Tab className='gadgetButton'>
                        Top Rated
                        <div>
                            {/**
                             * Intentionally empty
                             * Operates as an indicator light through pure CSS effects
                             */}
                        </div>
                    </Tab>
                    <Tab className='gadgetButton'>
                        Upcoming
                        <div>
                            {/**
                             * Intentionally empty
                             * Operates as an indicator light through pure CSS effects
                             */}
                        </div>
                    </Tab>
                </TabList>
                <TabPanel>
                    <MovieDisplayList movieList={ movieList_0 } />
                </TabPanel>
                <TabPanel>
                    <MovieDisplayList movieList={ movieList_1 } />
                </TabPanel>
                <TabPanel>
                    <MovieDisplayList movieList={ movieList_2 } />
                </TabPanel>
                <TabPanel>
                    <MovieDisplayList movieList={ movieList_3 } />
                </TabPanel>
            </Tabs>
        </section>
    )
}

export default PageHome