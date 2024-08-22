import { useState, useEffect, useContext } from 'react'
import { TabPanel, TabList, Tabs, Tab } from 'react-tabs'
import { fetchList } from '../utilities/themoviedatabase/themoviedatabase'
import { api_key, tmdbEndpoint } from '../config/config'
import { MovieAppContext } from '../router/AppRouter'
import MovieDisplayList from '../components/MovieDisplayList'


// Home page movie filter constants, double as partial urls for fetching
const NOW_PLAYING   = '/now_playing'
const POPULAR       = '/popular'
const TOP_RATED     = '/top_rated'
const UPCOMING      = '/upcoming'
const movieFilters = [ NOW_PLAYING, POPULAR, TOP_RATED, UPCOMING ]


const PageHome = () => {

    const {
        isHomeBtnEnabled,
        setIsHomeBtnEnabled,
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
                dispatch({ type: 'setFilter', filter: NOW_PLAYING })
                return
            case 1:
                dispatch({ type: 'setFilter', filter: POPULAR })
                return
            case 2:
                dispatch({ type: 'setFilter', filter: TOP_RATED })
                return
            case 3:
                dispatch({ type: 'setFilter', filter: UPCOMING })
                return
            default:
                dispatch({ type: 'setFilter', filter: NOW_PLAYING })
        }
    }


    // Ensure the NOW_PLAYING filter is loaded if the existing state
    // is bad, such as on a first visit. If it's good, ensure the
    // UI reflects it. CAREFUL OF INFINITE RENDERING
    useEffect(() => {
        if (state && state.browse) {
            const movieFilterIndex = movieFilters.findIndex( queried => queried === state.browse.homeFilter)

            if (movieFilterIndex === -1) {
                dispatch({ type: 'setFilter', filter: NOW_PLAYING})
            }
            else {
                const newFilter = movieFilters[ movieFilterIndex ]
                setSelectedTabNo( movieFilterIndex )
                updateMovieList( newFilter )
            }
        }
    }, [state, dispatch])


    // i) Choose correct HomeBtn state
    // ii) Unlock localStorage
    // Run once on boot
    useEffect(() => {
        setIsHomeBtnEnabled(false)
        setIsStorageUnlocked(true)
        return (() => {
            setIsStorageUnlocked(false)
        })
    }, [])


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