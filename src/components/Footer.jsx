import SocialMediaPanel         from './SocialMediaPanel'
import { author }               from '../config/config'
import { authorQuote }          from '../config/config'
import { getYear }              from '../utilities/utilities'

const Footer = () => (
    <footer>
        <SocialMediaPanel />
        <section className='copyrightTag'>
            <a
                className='DanLogoInText'
                href='https://www.danjblain.dev'
                target='_blank'
                rel='noreferrer'
            >
                {getYear()} &copy; {author}
            </a>
            <em>
                {authorQuote}
            </em>
        </section>
    </footer>
)

export default Footer