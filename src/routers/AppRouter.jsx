import { useState } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

import { appName, appCustomState } from '../config/config'
import { CustomContextProvider } from '../contexts/CustomContextProvider'

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


const AppRouter = () => {

    const [ appState, setAppState ] = useState(appCustomState)
    
    function putState() {
        try {
            const packedState = JSON.stringify(appState)
            localStorage.setItem(appName, packedState)
        }
        catch(failMessage) {
            console.warn(failMessage)
        }
    }

    function getState() {
        try {
            const packedState = localStorage.getItem(appName)
            const unpackedState = JSON.parse(packedState)
            setAppState(unpackedState)
        }
        catch(failMessage) {
            console.warn(failMessage)
        }
    }

    return (
        <BrowserRouter>
            <Routes>
                {/* Layout route */}
                <Route
                    element={
                        <CustomContextProvider
                            statesStruct={[ appState, setAppState ]}
                        >
                            <div className='wrapper'>
                                <Header />
                                <main>
                                    <button onClick={putState}>Put state {appName}</button>
                                    <button onClick={getState}>Get state {appName}</button>
                                    <Outlet />
                                </main>
                                <Footer />
                            </div>
                        </CustomContextProvider>
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

export default AppRouter