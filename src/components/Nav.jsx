import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
// import { appName } from "../config/config"

const Nav = ({ isOpen, closeNav }) => {

    const [ isAnimating, setIsAnimating ] = useState(false)


    function handleClick(e) {
        // Do not preventDefault, want to perform NavLink redirection
        setIsAnimating(false)
        closeNav()
    }


    // Effect to enable hamburger menu animations after page initialization
    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true)
        }
    }, [isOpen, setIsAnimating])


    return (
        <nav className={(isAnimating ? `isAnim` : ``) + (isOpen ? ` isOpen` : ``)}>
            <NavLink to='/'             onClick={handleClick}   >Home</NavLink>
            <NavLink to='/about'        onClick={handleClick}   >About</NavLink>
            <NavLink to='/favourites'   onClick={handleClick}   >Favourites</NavLink>
            <NavLink to='/support'      onClick={handleClick}   >Support</NavLink>
        </nav>
    )
}

Nav.propTypes = {
    isOpen: PropTypes.bool,
    closeNav: PropTypes.func,
}

export default Nav