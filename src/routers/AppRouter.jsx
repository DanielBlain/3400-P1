import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

import { appCustomState } from '../config/config'
import { CustomContextProvider } from '../contexts/CustomContextProvider'
// import useLocalStorage  from '../customhooks/useLocalStorage'

import Header           from '../components/Header'
import Footer           from '../components/Footer'

import PageHome         from '../pages/PageHome'
import PageSingle       from '../pages/PageSingle'
import PageFavourites   from '../pages/PageFavourites'
import PageAbout        from '../pages/PageAbout'
import PageHelp         from '../pages/PageHelp'
import PageLogin        from '../pages/PageLogin'
import PageRegister     from '../pages/PageRegister'
import PageNotFound     from '../pages/PageNotFound'

const AppRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={
                        <CustomContextProvider initialStates={appCustomState}>
                            <div className='wrapper'>
                                <Header />
                                <main>
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
                    <Route path='/help'         element={<PageHelp />}          />

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