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
        <nav
            className={(isAnimating ? `isAnim` : ``) + (isOpen ? ` isOpen` : ``)}
        >
            <NavLink
                tabIndex={isOpen ? 0 : -1}
                to='/'
                onClick={handleClick}
            >
                Home
            </NavLink>
            <NavLink
                tabIndex={isOpen ? 0 : -1}
                to='/about'
                onClick={handleClick}
            >
                About
            </NavLink>
            <NavLink
                tabIndex={isOpen ? 0 : -1}
                to='/favourites'
                onClick={handleClick}
            >
                Favourites
            </NavLink>
            <NavLink
                tabIndex={isOpen ? 0 : -1}
                to='/support'
                onClick={handleClick}
            >
                Support
            </NavLink>
        </nav>
    )
}

Nav.propTypes = {
    isOpen: PropTypes.bool,
    closeNav: PropTypes.func,
}

export default Nav