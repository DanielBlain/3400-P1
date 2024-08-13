import { Link } from 'react-router-dom'
import { appName } from '../config/config'

const PageAbout = () => {

    return (
        <>
            {/** Disclaimer(s) */}
            <p><b>NOTE:</b> {appName} is meant strictly as an educational project, and therefore should <em>not</em> be used for any professional or business purposes. If you choose to do so, it is at your own risk, and I take utterly no responsibility!</p>
            <hr />

            {/** TMDB gratitude */}
            <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
            <img src="/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="Logo for TMDB (The Movie Database)" />
            <p>Welcome to {appName}, your ultimate movie-browsing companion!</p>
            <p>Powered by IMDB, the Internet Movie Database, {appName} offers an intuitive experience for exploring a vast collection of movies.</p>
            <hr />

            {/** Product advertising */}
            <p>Whether you&apos;re a casual viewer or a dedicated cinephile, {appName} offers an extensive movie library with detailed descriptions, audience ratings, and an efficient interface usable by novices while not impeding more advanced users.</p>
            <div className='tagline-block'>
                <p>It&apos;s an escape</p>
                <p>It&apos;s <em>{appName}</em></p>
            </div>
            <p>{appName} also features</p>
            <ul>
                <li>
                    <b>Favourites</b><br />
                    Click the star (image) to favourite a movie
                </li>
                {/* <li>Playlists: </li> */}
                <li>
                    <b>User Profiles</b><br />
                    Login to ensure your list of favourited movies are saved for next time</li>
                {/* <li>(others?)</li> */}
            </ul>
            <p>Discover new releases, timeless classics, and hidden gems. See what&apos;s <Link to='/'>Now Playing</Link> to get started!</p>
            <hr />

            {/* Icons & other gratitude */}
            <p>
                Social media icons provided by <a
                    className='isUrl'
                    href='https://iconpacks.net/?utm_source=link-attribution&utm_content=6532'
                >
                    Iconpacks
                </a>
            </p>
            <p>
                Small bit(s) of code from:
            </p>
            <ul className='codeAttributionList'>
                <li>
                    <a
                        className='isUrl'
                        href='https://css-tricks.com/snippets/css/prevent-long-urls-from-breaking-out-of-container/'
                    >
                        https://css-tricks.com/snippets/css/prevent-long-urls-from-breaking-out-of-container/
                    </a>
                </li>
            </ul>
            <hr />

            {/** BCIT gratitude */}
            <p>{appName} is an educational project built by Dan J. Blain as part of a class that teaches students to use the React Javascript framework.</p>
            <p>The React class was part of the Frontend Web Development program offered by the brilliant people at BCIT. Thank you for my education!</p>
            <img src="/bcit.png" alt="Logo for BCIT (British Columbia Institute of Technology)" />
        </>
    )
}

export default PageAbout