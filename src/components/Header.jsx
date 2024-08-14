import PropTypes from 'prop-types'
import { useState, useEffect, useRef } from 'react'
import HomeButton from '../components/HomeButton'
import Nav from './Nav'


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
            document.removeEventListener('mousedown', handleClickElsewhere)
        })
    })


    return (
        <header ref={headerRef}>
            <div>
                <span>
                    <HomeButton />
                </span>
                <button className={'hamburgerButton' + (isOpen ? ` isOpen` : ``)} onClick={handleClick}>
                    <span className={'bar top left'}></span>
                    <span className={'bar top right'}></span>
                    <span className={'bar mid left'}></span>
                    <span className={'bar mid right'}></span>
                    <span className={'bar bottom left'}></span>
                    <span className={'bar bottom right'}></span>
                    <div className={'hamburgerGlow'}></div>
                </button>
            </div>
            <Nav isOpen={isOpen} closeNav={closeNav} />
        </header>
    )
}

Header.propTypes = {
    isHomeBtnEnabled: PropTypes.bool,
}

export default Header