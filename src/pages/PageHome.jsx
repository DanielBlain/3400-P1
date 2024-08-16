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


    // Fetch a new movie list based upon the filterType parameter
    const updateMovieList = async (filterType, pagination=`&page=1`) => {
        const url = `${tmdbEndpoint}${filterType}?include_adult=false&include_video=false&language=en-US${pagination}&api_key=${api_key}`
        const newMovieList = await fetchList(url)
        if (newMovieList) {
            setMovieList(newMovieList)
        }
    }


    const isFilterValid = ( newFilter ) =>
        [
            NOW_PLAYING,
            POPULAR,
            TOP_RATED,
            UPCOMING
        ].includes( newFilter )


    // Handle click on the NOW_PLAYING tab
    const handleNowPlaying  = (e) => {
        e.preventDefault()
        updateMovieList( NOW_PLAYING )
    }


    // Handle click on the POPULAR tab
    const handlePopular     = (e) => {
        e.preventDefault()
        updateMovieList( POPULAR )
    }


    // Handle click on the TOP_RATED tab
    const handleTopRated    = (e) => {
        e.preventDefault()
        updateMovieList( TOP_RATED )
    }


    // Handle click on the UPCOMING tab
    const handleUpcoming    = (e) => {
        updateMovieList( UPCOMING )
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
    
    
    // Update the movie list when updated by localStorage
    // Found no valid filter? Set to NOW_PLAYING by default
    useEffect(() => {
        if (state && state.browse) {
            if (isFilterValid(state.browse.homeFilter)) {
                updateMovieList(state.browse.homeFilter)
            }
            else {
                dispatch({ type: 'overrideFilter', filter: NOW_PLAYING })
            }
        } 
    }, [isStorageUnlocked, state, dispatch])


    return (
        <section id='mainContent'>
            <Tabs>
                <TabList className='filterPanel'>
                    <Tab className='gadgetButton' tabIndex={'5'} role='button' onClick={ handleNowPlaying }>
                        Now Playing
                        <div></div>
                    </Tab>
                    <Tab className='gadgetButton' tabIndex={'6'} role='button' onClick={ handlePopular }>
                        Popular
                        <div></div>
                    </Tab>
                    <Tab className='gadgetButton' tabIndex={'7'} role='button' onClick={ handleTopRated }>
                        Top Rated
                        <div></div>
                    </Tab>
                    <Tab className='gadgetButton' tabIndex={'8'} role='button' onClick={ handleUpcoming } >
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