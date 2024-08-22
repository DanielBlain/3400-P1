import PropTypes from 'prop-types'
import { useState, useEffect, useRef } from 'react'
import HomeButton   from '../components/HomeButton'
import LoginButton  from './LoginButton'
import Hamburger    from './Hamburger'
import Nav          from './Nav'


function Header() {

    const [ isOpen, setIsOpen ] = useState(false)


    function handleClick() {
        setIsOpen( prevIsOpen => !prevIsOpen)
    }


    function closeNav() {
        setIsOpen( false )
    }


    return (
        <header>
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