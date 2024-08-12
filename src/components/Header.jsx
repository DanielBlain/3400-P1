import { useState } from 'react'
import Nav from "./Nav"

function Header() {

    const [ isOpen, setIsOpen ] = useState(false)


    function handleClick() {
        setIsOpen(!isOpen)
    }


    function closeNav() {
        setIsOpen(false)
    }


    return (
        <header>
            <div>
                <span>
                    Icon-on-left
                </span>
                <span className={'hamburgerButton' + (isOpen ? ` isOpen` : ``)} onClick={handleClick}>
                    <span className={'bar top left'}></span>
                    <span className={'bar top right'}></span>
                    <span className={'bar mid left'}></span>
                    <span className={'bar mid right'}></span>
                    <span className={'bar bottom left'}></span>
                    <span className={'bar bottom right'}></span>
                    <div className={'hamburgerGlow'}></div>
                </span>
            </div>
            <Nav isOpen={isOpen} closeNav={closeNav} />
        </header>
    )
}

export default Header