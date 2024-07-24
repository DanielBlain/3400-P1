import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PageHome         from '../pages/PageHome'
import PageSingle       from '../pages/PageSingle'
import PageFavourites   from '../pages/PageFavourites'
import PageAbout        from '../pages/PageAbout'
import PageHelp         from '../pages/PageHelp'
import PageLogin        from '../pages/PageLogin'
import PageNotFound     from '../pages/PageNotFound'

const AppRouter = () => {
    return (
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
    )
}

export default AppRouter