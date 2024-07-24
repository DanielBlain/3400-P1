const movieList = [
    {
        key: 'avatar',
        title: 'Avatar'
    },
    {
        key: 'beaus-afraid',
        title: 'Beau\'s Afraid'
    },
    {
        key: 'blackberry',
        title: 'Blackberry'
    },
    {
        key: 'dungeons-and-dragons-honor-among-thieves',
        title: 'Dungeons & Dragons',
        subtitle: 'Honor Among Thieves'
    },
    {
        key: 'elemental',
        title: 'Elemental'
    },
    {
        key: 'fight-club',
        title: 'Fight Club'
    }
]

import { useState, createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { UserContext } from '../components/UserContext'

import PageHome         from '../pages/PageHome'
import PageSingle       from '../pages/PageSingle'
import PageFavourites   from '../pages/PageFavourites'
import PageAbout        from '../pages/PageAbout'
import PageHelp         from '../pages/PageHelp'
import PageLogin        from '../pages/PageLogin'
import PageNotFound     from '../pages/PageNotFound'

const AppRouter = () => {

    const [ message, setMessage ] = useState('hello from AppRouter')

    return (
        <UserContext.Provider value={{message, setMessage}}>
            <BrowserRouter>
                <Routes>
                    <Route path='/'             element={<PageHome />}  exact   />
                    <Route path='/single/:id'   element={<PageSingle />}        />
                    <Route path='/favourites'   element={<PageFavourites />}    />
                    <Route path='/about'        element={<PageAbout />}         />
                    <Route path='/help'         element={<PageHelp />}          />
                    <Route path='/login'        element={<PageLogin />}         />
                    <Route path='*'             element={<PageNotFound />}      />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}

export default AppRouter