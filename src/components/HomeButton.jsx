import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import CinescapeE from '/cinescape-e.png'


const HomeButton = ({ isHomeBtnEnabled }) => {

    const navigate = useNavigate()


    function handleClick(e) {
        e.preventDefault()
        navigate('/')
    }


    return (
        <button className={'homeButton'} disabled={ !isHomeBtnEnabled } onClick={handleClick}>
            <img src={CinescapeE} alt='Icon for Home Button' />
        </button>
    )
}

HomeButton.propTypes = {
    isHomeBtnEnabled: PropTypes.bool,
}

export default HomeButton