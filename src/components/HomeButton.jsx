import PropTypes from 'prop-types'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MovieAppContext } from '../router/AppRouter'
import CinescapeE from '/cinescape-e.png'


const HomeButton = ({ children }) => {

    const { isHomeBtnEnabled, setIsHomeBtnEnabled, isStorageUnlocked, setIsStorageUnlocked, state, dispatch } = useContext(MovieAppContext)
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
                <img src={CinescapeE} alt='Icon for Home Button' />
            </button>
            { children !== null ? children : ``}
        </div>
    )
}


HomeButton.propTypes = {
    children: PropTypes.node,
}

export default HomeButton