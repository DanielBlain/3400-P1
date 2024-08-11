import { NavLink } from "react-router-dom"
import { appName } from "../config/config"

const Header = () => (
    <header>
        <div>
            <NavLink to='/'             >Home</NavLink>
            <NavLink to='/about'        >About</NavLink>
            <NavLink to='/favourites'   >Favourites</NavLink>
            <NavLink to='/support'      >Support</NavLink>
        </div>
    </header>
)

export default Header