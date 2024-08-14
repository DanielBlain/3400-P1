import { useState, createContext, useReducer } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

import { appName, appCustomState } from '../config/config'
import useLocalStorage  from '../customhooks/useLocalStorage'
import MovieReducer     from '../components/MovieReducer'

import Header           from '../components/Header'
import Footer           from '../components/Footer'

import PageHome         from '../pages/PageHome'
import PageSingle       from '../pages/PageSingle'
import PageFavourites   from '../pages/PageFavourites'
import PageAbout        from '../pages/PageAbout'
import PageSupport      from '../pages/PageSupport'
import PageLogin        from '../pages/PageLogin'
import PageRegister     from '../pages/PageRegister'
import PageNotFound     from '../pages/PageNotFound'


export const MovieAppContext = createContext({
    setIsHomeBtnEnabled: null,
    isStorageUnlocked: false,
    setIsStorageUnlocked: null,
    appState: null,
    dispatch: null,
})


export const AppRouter = () => {

    const [ isHomeBtnEnabled, setIsHomeBtnEnabled ] = useState(false)
    // State to determine whether the "Home" buttons are disabled

    const [ isStorageLocked, setIsStorageUnlocked, state, dispatch ]
        = useLocalStorage(
            appName,            // Key value for Storage
            appCustomState,     // Reference object so useLocalStorage can ensure validity
            useReducer(
                MovieReducer,   // reducer function
                null            // Original state set to null to ensure we attempt
                                // initialization from localStorage first
            )
        )

        
    return (
        <BrowserRouter>
            <Routes>
                {/* Layout route */}
                <Route
                    element={
                        <MovieAppContext.Provider
                            value={{
                                isHomeBtnEnabled,
                                setIsHomeBtnEnabled,
                                isStorageLocked,
                                setIsStorageUnlocked,
                                state,
                                dispatch
                            }}
                        >
                            <a href='#mainContent' className='screen-reader-text'>Skip to Content</a>
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