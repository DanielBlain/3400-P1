import { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { appName } from '../config/config'
import { MovieAppContext } from '../router/AppRouter'
import { imageFolder } from '../config/config'


const PageAbout = () => {
    
    const {
        isHomeBtnEnabled,
        setIsHomeBtnEnabled,
        moviePosterRepo,
        isStorageUnlocked,
        setIsStorageUnlocked,
        state,
        dispatch,
    } = useContext(MovieAppContext)
    
    
    // i) Choose correct HomeBtn state
    // ii) Unlock localStorage
    // Run once on boot
    useEffect(() => {
        setIsHomeBtnEnabled(true)
        setIsStorageUnlocked(true)
        return (() => {
            setIsStorageUnlocked(false)
        })
    }, [setIsHomeBtnEnabled, setIsStorageUnlocked])

    
    return (
        <section id='mainContent'>
            <h2>About</h2>
            <section className='pageAbout'>

                <div>

                    <div className='gratitude'>
                        {/** TMDB gratitude */}
                        <article>
                            <p>
                                This product uses the TMDB API but is not endorsed or
                                certified by TMDB.
                            </p>
                            <span>
                                <img
                                    src={ imageFolder + '/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg' }
                                    alt="Logo for TMDB (The Movie Database)"
                                />
                            </span>
                        </article>

                        {/** BCIT gratitude */}
                        <article>
                            <p>
                                <strong>{appName}</strong> is an educational project built by
                                Dan J. Blain as part of a class that teaches students
                                to use the Javascript React framework.
                            </p>
                            <span>
                                <img
                                    src={ imageFolder + '/bcit.png' }
                                    alt="Logo for BCIT (British Columbia Institute of Technology)"
                                />
                            </span>
                            <p>
                                The React class was part of the Frontend Web Development program
                                offered by the brilliant people at BCIT.
                            </p>
                            <p>
                                Thank you for my education!
                            </p>
                        </article>
                    </div>

                    {/** Disclaimer(s) */}
                    <article className='disclaimer'>
                        <p>
                            <b>NOTE:</b> <strong>{appName}</strong> is meant strictly as an
                            educational project, and therefore should <em>not</em> be
                            used for any professional or business purposes. If you
                            choose to do so, it is at your own risk, and I take utterly
                            no responsibility!
                        </p>
                    </article>

                    {/* Icons & other gratitude */}
                    <article className='codeAttributionList'>
                        <p>
                            Small bit(s) of things/code from:
                        </p>
                        <ul>
                            <li>
                                <a
                                    className='isUrl'
                                    href='https://css-tricks.com/snippets/css/prevent-long-urls-from-breaking-out-of-container/'
                                >
                                    https://css-tricks.com/snippets/css/prevent-long-urls-from-breaking-out-of-container/
                                </a>
                            </li>
                            <li>
                                <a
                                    className='isUrl'
                                    href='https://css-tricks.com/how-to-create-neon-text-with-css/'
                                >
                                    https://css-tricks.com/how-to-create-neon-text-with-css/
                                </a>
                            </li>
                            <li>
                                Television static gif from
                                <a
                                    className='isUrl'
                                    href='https://cliply.co/clip/static-noise/'
                                >
                                    https://cliply.co/clip/static-noise/
                                </a>
                            </li>
                        </ul>
                        <p>
                            Social media icons provided by <a
                                className='isUrl'
                                href='https://iconpacks.net/?utm_source=link-attribution&utm_content=6532'
                            >
                                Iconpacks
                            </a>
                        </p>
                    </article>

                </div>

                {/** Product advertising */}
                <article className='appAdvertPanel'>
                    <p>
                        Welcome to <strong>{appName}</strong>, your ultimate movie-browsing companion!
                    </p>
                    <p>
                        Whether you&apos;re a casual viewer or a dedicated
                        cinephile, {appName} offers an extensive movie library with
                        detailed descriptions, audience ratings, with a slick and
                        efficient interface for everyone from novices to the most
                        advanced users.
                    </p>
                    <p>
                        Powered by IMDB, the Internet Movie Database, <strong>{appName}</strong> is
                        your opportunity to explore a vast collection of movies.
                    </p>
                    <div className='tagline-block'>
                        <p>It&apos;s an escape</p>
                        <p>It&apos;s...</p>
                        <p><strong>{appName}</strong></p>
                    </div>
                    <p><strong>{appName}</strong> also features</p>
                    <ul>
                        <li>
                            <b>Favourites</b><br />
                            Click the star (image) to favourite a movie
                        </li>
                        {/* <li>Playlists: </li> */}
                        <li>
                            <b>User Profiles</b><br />
                            Login to ensure your list of favourited movies are saved for next time
                        </li>
                        {/* <li>(others?)</li> */}
                    </ul>
                    <p>
                        Discover new releases, timeless classics, and hidden gems. See
                        what&apos;s <Link to='/'>Now Playing</Link> to get started!</p>
                </article>

            </section>
        </section>
    )
}

export default PageAbout