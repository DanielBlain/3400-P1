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
                    <div></div>
                    <div></div>
                    <div></div>
                </span>
            </div>
            <Nav isOpen={isOpen} closeNav={closeNav} />
        </header>
    )
}

export default Header