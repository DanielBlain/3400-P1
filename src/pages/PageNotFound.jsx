import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MovieAppContext } from '../router/AppRouter'
import { appName } from '../config/config'


const PageNotFound = () => {

    const navigate = useNavigate()
    // Context is not needed here, but is included so
    // included so this page can be used as a template for new pages
    const { setIsHomeBtnEnabled, isStorageUnlocked, setIsStorageUnlocked, state, dispatch } = useContext(MovieAppContext)


    function handleClick() {
        navigate('/')
    }


    // Unlock localStorage
    // Run once on boot
    useEffect(() => {
        setIsHomeBtnEnabled(true)
    }, [])


    return (
        <>
            <h1>{appName}</h1>
            <div>
                <h2>Page Not Found</h2>
                <p>Oops! The page you are looking for does not exist.</p>
                <button
                    className='homeButton'
                    onClick={ handleClick }
                >
                    &larr; Go Home
                </button>
            </div>
        </>
    )
}

export default PageNotFound