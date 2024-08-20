import PropTypes from 'prop-types'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MovieAppContext } from '../router/AppRouter'
import { imageFolder } from '../config/config'


const HomeButton = ({ children }) => {

    const {
        isHomeBtnEnabled,
        setIsHomeBtnEnabled,
        isStorageLocked,
        setIsStorageUnlocked,
        state,
        dispatch,
    } = useContext(MovieAppContext)

    const navigate = useNavigate()

    
    function handleClick(e) {
        e.preventDefault()
        navigate('/')
    }


    return (
        <div className={ 'homeBtnPanel' }>
            <button
                onClick={handleClick}
                disabled={ !isHomeBtnEnabled }
            >
                <img src={ imageFolder + '/cinescape-e.png' } alt='Icon for Home Button' />
            </button>
            { children !== null ? children : ``}
        </div>
    )
}


HomeButton.propTypes = {
    children: PropTypes.node,
}

export default HomeButton