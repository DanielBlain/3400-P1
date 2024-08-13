import { socialMedia } from '../config/config'
import SocialMediaButton from './SocialMediaButton'


const SocialMediaPanel = () => {

    const ICONSIZE = 30

    return (
        <section className='socialMediaPanel'>
            {socialMedia.map((queried, index) => (
                <SocialMediaButton
                    key         ={ `socialMediaButton-${index}`}
                    className   ={ queried.className }
                    location    ={ queried.location }
                    ariaLabel   ={ queried.ariaLabel }
                    tooltip     ={ queried.tooltip }
                    size        ={ ICONSIZE }
                    svgPaths    ={ queried.svgPaths }
                />
            ))}
        </section>
    )
}

export default SocialMediaPanel