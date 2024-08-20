import { useState, createContext, useReducer } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

import { appName, appCustomState } from '../config/config'
import useLocalStorage  from '../customhooks/useLocalStorage'

import Header           from '../components/Header'
import Footer           from '../components/Footer'
import MovieReducer     from '../components/MovieReducer'

import PageAbout        from '../pages/PageAbout'
import PageFavourites   from '../pages/PageFavourites'
import PageHome         from '../pages/PageHome'
import PageLogin        from '../pages/PageLogin'
import PageNotFound     from '../pages/PageNotFound'
import PageRegister     from '../pages/PageRegister'
import PageSingle       from '../pages/PageSingle'
import PageSupport      from '../pages/PageSupport'


// The global state, shared via context
export const MovieAppContext = createContext({
    setIsHomeBtnEnabled: null,
    isStorageUnlocked: false,
    setIsStorageUnlocked: null,
    appState: null,
    dispatch: null,
})


export const AppRouter = () => {

    // State to determine whether the "Home" buttons are disabled
    const [ isHomeBtnEnabled, setIsHomeBtnEnabled ] = useState(false)

    
    // A fetch repository, to avoid duplicating requests
    // to fetch movie posters
    const posterRepo = []


    // The global state manager using reducers and localStorage, and
    // can be provided via contexts
    const [ isStorageLocked, setIsStorageUnlocked, state, dispatch ]
        = useLocalStorage(
            appName,            // Key value for Storage

            appCustomState,     // Reference object so useLocalStorage can ensure validity

            useReducer(
                MovieReducer,   // reducer function

                null            // Original state set to null to ensure we attempt
                                // initialization from localStorage first
            ),
        )

        
    return (
        <BrowserRouter basename='/cinescape'>
            <Routes>
                {/* Layout route */}
                <Route
                    element={
                        <MovieAppContext.Provider
                            value={{
                                isHomeBtnEnabled,
                                setIsHomeBtnEnabled,
                                posterRepo,
                                isStorageLocked,
                                setIsStorageUnlocked,
                                state,
                                dispatch,
                            }}
                        >
                            <a href='#mainContent' className='ScreenReaderText'>Skip to Content</a>
                            <div className='wrapper'>
                                <Header />
                                <main>                                    
                                    <h1>{ appName }</h1>
                                    <hr />
                                    <Outlet />
                                </main>
                                <Footer />
                            </div>
                        </MovieAppContext.Provider>
                    }
                >
                    {/* Menued routes */}
                    <Route path='/'             element={<PageHome />}  exact   />
                    <Route path='/about'        element={<PageAbout />}         />
                    <Route path='/favourites'   element={<PageFavourites />}    />
                    <Route path='/support'      element={<PageSupport />}       />

                    {/* Non-menued routes */}
                    <Route path='/single/:movieID' element={<PageSingle />}     />
                    <Route path='/login'        element={<PageLogin />}         />
                    <Route path='/register'     element={<PageRegister />}      />

                    {/* Failed to find route */}                    
                    <Route path='*'             element={<PageNotFound />}      />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}