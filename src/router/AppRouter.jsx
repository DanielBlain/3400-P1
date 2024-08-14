import { createContext, useReducer } from 'react'
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
    isStorageUnlocked: null,
    setIsStorageUnlocked: null,
    appState: null,
    dispatch: null,
})


export const AppRouter = () => {

    const [ isStorageLocked, setIsStorageUnlocked, state, dispatch ]
        = useLocalStorage(
            appName,            // Key value for Storage
            appCustomState,     // Reference object, so useLocalStorage can ensure validity
            useReducer(
                MovieReducer,   // reducer function, creates a dispatcher
                appCustomState  // The original state to be mutated
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
                                isStorageLocked,
                                setIsStorageUnlocked,
                                state,
                                dispatch
                            }}
                        >
                            <a href='#mainContent' className='screen-reader-text'>Skip to Content</a>
                            <div className='wrapper'>
                                <Header />
                                <main id='mainContent'>
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