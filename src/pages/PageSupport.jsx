import { useState, useEffect, useContext } from 'react'
import { appName } from '../config/config'
import { MovieAppContext } from '../router/AppRouter'
import { baseFolder, imageFolder } from '../config/config'
import ClickDropdown from '../components/ClickDropdown'


const PageSupport = () => {

    const {
        isHomeBtnEnabled,
        setIsHomeBtnEnabled,
        moviePosterRepo,
        isStorageUnlocked,
        setIsStorageUnlocked,
        state,
        dispatch,
    } = useContext(MovieAppContext)

    const [ isUserLoggedIn, setIsUserLoggedIn ] = useState(false)


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


    // Set the isUserLoggedIn flag, if/when appropriate
    useEffect(() => {
        setIsUserLoggedIn(
            state
            && state.user
            && state.user.timeLoggedIn
        )
    }, [ state, setIsUserLoggedIn ])


    return (
        <section id='mainContent'>
            <h2>Support</h2>
            <div className='supportPage'>
                <div className='supportTabs'>
                    <section>
                        <h3 id='website'>Website issues</h3>
                        <article>
                            <ClickDropdown tag={(<h4 className='dropdownButton' role='button'>Broken or bad links</h4>)}>
                                <div className='supportPanel'>
                                    <p>
                                        For external links, after attempting to visit the link, please ensure 
                                        the site url in your browser is valid. If it is not, contact our 
                                        Support team. Otherwise, we recommend reaching out to the support team 
                                        of the external site.
                                    </p>
                                    <p>
                                        If the link is internal to {appName}, try refreshing the page.
                                    </p>
                                    <p>
                                        For Windows and in Google Chrome or Microsoft Edge, on your keyboard, 
                                        hold: Ctrl, F5.
                                    </p>
                                    <p>
                                        For Macs, hold: Cmd, Shift, R.
                                    </p>
                                    <p>
                                        If this does not work, contact our Support team.
                                    </p>
                                </div>
                            </ClickDropdown>

                            <ClickDropdown tag={(<h4 className='dropdownButton' role='button'>Images missing</h4>)}>
                                <div className='supportPanel'>
                                    <p>
                                        For Windows and in Google Chrome or Microsoft Edge, on your keyboard, 
                                        hold the Ctrl key, then tap F5 and release both. If the images do 
                                        not appear, please try visiting the site from another browser and/or 
                                        another device. If the images still do not appear, please contact our 
                                        Support team.
                                    </p>
                                </div>
                            </ClickDropdown>

                            <ClickDropdown tag={(<h4 className='dropdownButton' role='button'>Favourites not remembered</h4>)}>
                                <div className='supportPanel'>
                                    <p>
                                        Ensure your browser is set to allow usage of its local storage.
                                    </p>
                                </div>
                            </ClickDropdown>

                            <ClickDropdown tag={(<h4 className='dropdownButton' role='button'>Poor site performance</h4>)}>
                                <div className='supportPanel'>
                                    <p>
                                        Attempt to access the site on another device and another internet 
                                        connection. If that does not help, try after 24 hours to see if the 
                                        performance issue is due to a temporary issue such as traffic. If it 
                                        is still an issue, please report the performance issues to our 
                                        Support team.
                                    </p>
                                </div>
                            </ClickDropdown>
                        </article>
                    </section>

                    <section>
                        <h3 id='account'>Account issues</h3>
                        <article>
                            <ClickDropdown tag={(<h4 className='dropdownButton' role='button'>Login failure or forgotten password</h4>)}>
                                <div className='supportPanel'>
                                    <p>
                                        Please use the Forgot Password link on the login page. If you are still 
                                        not able to login, visit our registration page and create your account.
                                    </p>
                                </div>
                            </ClickDropdown>

                            <ClickDropdown tag={(<h4 className='dropdownButton' role='button'>Favourites not remembered</h4>)}>
                                <div className='supportPanel'>
                                    <p>
                                        Ensure your browser is set to allow usage of its local storage. If you 
                                        do not have an account, you may visit our registration page, as having 
                                        an account will help {appName} recall your choices.
                                    </p>
                                </div>
                            </ClickDropdown>

                            <ClickDropdown tag={(<h4 className='dropdownButton' role='button'>Unable to update profile information</h4>)}>
                                <div className='supportPanel'>
                                    <p>
                                        Ensure your browser is set to allow usage of its local storage. If you 
                                        are still not able to update your profile information, please contact 
                                        our Support team.
                                    </p>
                                </div>
                            </ClickDropdown>
                        </article>
                    </section>

                    <ClickDropdown tag={<h3 className='dropdownButton' role='button'>Content issues</h3>}>
                        <div id='content' className='supportPanel'>
                            <p>
                                All movie-related content on {appName} is curated and managed by TMDB. This 
                                product uses the TMDB API but is not endorsed or certified by TMDB.
                            </p>
                            <div className='tmdbLogo'>
                                <img
                                    src={ imageFolder + '/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg' }
                                    alt='Logo for The Movie Database'
                                />
                            </div>
                            <p>
                                For any issues with content, please contact TMDB&apos;s Support Page directly, 
                                at: https://www.themoviedb.org/talk
                            </p>
                        </div>
                    </ClickDropdown>
                </div>

                <section id='contactUs'>
                    <h2>Contact Us</h2>
                    <p className='caveat'>
                        * NOTE: Users must be&nbsp;
                        <a href={ baseFolder + '/login'}>
                            logged in
                        </a>
                        &nbsp;to send a Contact Us request
                    </p>
                    <form onSubmit={()=>{alert("form Submitted")}}>
                        <label>
                            Username<br />
                            <input
                                type='text'
                                id='username'
                                name='username'
                                defaultValue={ isUserLoggedIn ? state.user.username : '' }
                                disabled={ isUserLoggedIn }
                                required
                            />
                        </label>

                        <label>
                            Email<br />
                            <input
                                type='email'
                                id='email'
                                name='email'
                                defaultValue={ isUserLoggedIn ? state.user.email : '' }
                                disabled={ isUserLoggedIn }
                                
                                required
                            />
                        </label>

                        <label>
                            How may we help?
                            <textarea
                                id='message'
                                name='message'
                                cols='22'
                                rows='4'
                                required
                            >
                                {/** Empty by design */}
                            </textarea>
                        </label>

                        <button type='submit'>Submit</button>
                        <button type='reset'>Reset</button>
                    </form>
                </section>
            </div>
        </section>
    )
}

export default PageSupport