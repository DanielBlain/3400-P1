import DanLogo from '/DanLogo-x1024.png' // From public folder
import { author } from '../global/global'
import { getYear } from '../utilities/utilities'

const Footer = () => (
    <footer>
        <div className='footer-right'>socials</div>
        <div className='footer-left'>
            <img
                className="DanLogo"
                src={DanLogo}
                alt="Logo for Dan J Blain"
            />
            {getYear()}  &copy;  {author}
        </div>
    </footer>
)

export default Footer