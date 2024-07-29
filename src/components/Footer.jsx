import DanLogo from '/DanLogo-x1024.png' // From public folder
import { author } from '../config/config'
import { getYear } from '../utilities/utilities'

const Footer = () => (
    <footer>
        <div>
            <img
                src={DanLogo}
                alt="Logo for Dan J Blain"
            />
            {getYear()}&copy;{author}
        </div>
        <div className='footer-right'></div>
    </footer>
)

export default Footer