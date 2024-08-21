import PropTypes from 'prop-types'
import { useState, useEffect, useRef } from 'react'
import HomeButton   from '../components/HomeButton'
import LoginButton  from './LoginButton'
import Hamburger    from './Hamburger'
import Nav          from './Nav'


function Header() {

    const [ isOpen, setIsOpen ] = useState(false)
    const headerRef = useRef(null)


    function handleClick() {
        setIsOpen(!isOpen)
    }


    function closeNav() {
        setIsOpen(false)
    }


    // Close the nav when we click anywhere off the header
    useEffect(() => {
        const handleClickElsewhere = e => {
            if (headerRef.current && !headerRef.current.contains(e.target)) {
                closeNav()
            }
        }

        document.addEventListener('mousedown', handleClickElsewhere)
        return(() => {
            closeNav()
            document.removeEventListener('mousedown', handleClickElsewhere)
        })
    })


    return (
        <header ref={headerRef}>
            <span>
                <HomeButton />
            </span>
            <div>
                <LoginButton />
                <Hamburger
                    isOpen={ isOpen }
                    handleClick={ handleClick }
                />
            </div>
            <Nav
                isOpen={ isOpen }
                closeNav={ closeNav }
            />
        </header>
    )
}

Header.propTypes = {
    isHomeBtnEnabled: PropTypes.bool,
}

export default Header