import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'


const Nav = ({ isOpen, closeNav }) => {

    const [ isAnimating, setIsAnimating ] = useState(true)


    // Ensure Nav is closed when we click to a new page
    const handleClick = e => {
        e.preventDefault()
        closeNav()
    }

    // Animate hamburger button plasma animation only when
    // opening the nav, so it terminates instantly when closing
    useEffect(() => {
        if (isOpen)     { setIsAnimating(true) }
        else            { setIsAnimating(false) }
        return () =>    { setIsAnimating(false) }
    }, [isOpen, closeNav])


    return (
        <nav
            className={'gadgetLabel ' + (isAnimating ? `isAnim` : ``) + (isOpen ? ` isOpen` : ``)}
            onClick={handleClick}
        >
            <div>
                <NavLink
                    // Ensure NavLinks are not tabable while the Nav is closed
                    tabIndex={isOpen ? '1' : '-1'}
                    to='/'
                >
                    Home
                </NavLink>
            </div>
            <div>
                <NavLink
                    tabIndex={isOpen ? '2' : '-1'}
                    to='/about'
                >
                    About
                </NavLink>
            </div>
            <div>
                <NavLink
                    tabIndex={isOpen ? '3' : '-1'}
                    to='/favourites'
                >
                    Favourites
                </NavLink>                
            </div>
            <div>
                <NavLink
                    tabIndex={isOpen ? '4' : '-1'}
                    to='/support'
                >
                    Support
                </NavLink>
            </div>
        </nav>
    )
}

Nav.propTypes = {
    isOpen: PropTypes.bool,
    closeNav: PropTypes.func,
}

export default Nav