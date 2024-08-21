import PropTypes from 'prop-types'

const Hamburger = ({ isOpen, handleClick }) => {
    return (
        <button className={'hamburgerButton' + (isOpen ? ` isOpen` : ``)} onClick={handleClick}>
            <span className={'bar top left'}></span>
            <span className={'bar top right'}></span>
            <span className={'bar mid left'}></span>
            <span className={'bar mid right'}></span>
            <span className={'bar bottom left'}></span>
            <span className={'bar bottom right'}></span>
            <div className={'hamburgerGlow'}></div>
        </button>
    )
}

Hamburger.propTypes = {
    isOpen:         PropTypes.bool,
    handleClick:    PropTypes.func,
}

export default Hamburger