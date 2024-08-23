import SocialMediaPanel         from './SocialMediaPanel'
import { imageFolder }          from '../config/config'
import { author }               from '../config/config'
import { authorQuote }          from '../config/config'
import { getYear }              from '../utilities/utilities'

const Footer = () => (
    <footer>
        <section>
            <SocialMediaPanel />
        </section>
        <section className='copyrightTag'>
            <a
                href='https://www.danjblain.dev'
                target='_blank'
                rel='noreferrer'
            >
                <p>
                    <img
                        src={imageFolder + '/DanLogo-x256.png'}
                        alt="Logo for Dan J Blain"
                        /> &copy; {getYear()} {author}
                </p>
            </a>
            <em>
                {authorQuote}
            </em>
        </section>
    </footer>
)

export default Footer

                {/* <img
                    src={imageFolder + '/DanLogo-x256.png'}
                    alt='Logo for Dan J Blain'
                    width='20px'
                /> */}