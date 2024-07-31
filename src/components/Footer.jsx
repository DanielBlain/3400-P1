// import DanLogo from '/DanLogo-x1024.png' // From public folder
import { author }               from '../config/config'
import { authorQuote }          from '../config/config'
// import { socialMediaAccounts }  from '../config/config'
import { getYear }              from '../utilities/utilities'

const Footer = () => (
    <footer>
        <div className='socialMediaPanel'>
            Testing
        </div>
        <div>
            <span className='copyrightTag'>
                <span>
                    <a  className='DanLogoInText' href='https://www.danjblain.dev' target="_blank" rel="noreferrer">
                        {getYear()} &copy; {author} &nbsp;&nbsp;&nbsp;
                    </a>
                    <em>
                        {authorQuote}
                    </em>
                </span>
            </span>
        </div>
    </footer>
)

export default Footer