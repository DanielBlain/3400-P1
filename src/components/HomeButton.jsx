import PropTypes from 'prop-types'
import CinescapeE from '/cinescape-e.png'

const HomeButton = ({ isHomeBtnEnabled }) => {
    return (
        <button  className={'homeButton'} disabled={ !isHomeBtnEnabled }>
            <img src={CinescapeE} alt='Icon for Home Button' />
        </button>
    )
}

HomeButton.propTypes = {
    isHomeBtnEnabled: PropTypes.bool,
}

export default HomeButton