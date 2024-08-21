import PropTypes from 'prop-types'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MovieAppContext } from '../router/AppRouter'
import { imageFolder } from '../config/config'


const LoginButton = ({ children }) => {

    const {
        isHomeBtnEnabled,
        setIsHomeBtnEnabled,
        moviePosterRepo,
        isStorageLocked,
        setIsStorageUnlocked,
        state,
        dispatch,
    } = useContext(MovieAppContext)

    const navigate = useNavigate()

    
    function handleClick(e) {
        e.preventDefault()
        if (state && state.user && state.user.timeLoggedIn) {
            dispatch({ type: 'logOut' })
        }
        else {
            navigate('/login')
        }
    }


    return (
        <div className={ 'homeBtnPanel' }>
            <button
                onClick={handleClick}
            >
                <img src={ imageFolder + '/cinescape-login.png' } alt='Icon for Login Button' />
            </button>
            { children }
        </div>
    )
}


LoginButton.propTypes = {
    children: PropTypes.node,
}

export default LoginButton