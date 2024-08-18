import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MovieAppContext } from '../router/AppRouter'
import HomeButton from '../components/HomeButton'


const PageNotFound = () => {

    const navigate = useNavigate()
    // Context is not needed here, but is included so
    // included so this page can be used as a template for new pages
    const { isHomeBtnEnabled, setIsHomeBtnEnabled, isStorageUnlocked, setIsStorageUnlocked, state, dispatch } = useContext(MovieAppContext)


    // i) Choose correct HomeBtn state
    // ii) Unlock localStorage
    // Run once on boot
    useEffect(() => {
        setIsHomeBtnEnabled(true)
        setIsStorageUnlocked(true)
        return (() => {
            setIsStorageUnlocked(false)
        })
    }, [setIsHomeBtnEnabled, setIsStorageUnlocked])


    return (
        <section id='mainContent'>
            <h2>Page Not Found</h2>
            <p>Oops! The page you are looking for does not exist.</p>
            <hr />
            <HomeButton>
                <p>
                    Click to go Home
                </p>
            </HomeButton>
        </section>
    )
}

export default PageNotFound