import { useState } from 'react'
import { appName } from '../config/config'

const PageSupport = () => {

    const [ tabA, setTabA ] = useState('')
    const [ tabB, setTabB ] = useState('')
    const [ tabC, setTabC ] = useState('')
    const [ tabD, setTabD ] = useState('')
    const [ tabE, setTabE ] = useState('')
    const [ tabF, setTabF ] = useState('')
    const [ tabG, setTabG ] = useState('')
    const [ tabH, setTabH ] = useState('')

    function handleClick(e) {
        switch (e.target.id) {
            case 'brokenlinks':
                setTabA(
                    tabA === '' ?
                    ' isDropped'
                    : ''
                )
                break;
            case 'imagesmissing':
                setTabB(
                    tabB === '' ?
                    ' isDropped'
                    : ''
                )
                break;
            case 'favouritesnotrememberedA':
                setTabC(
                    tabC === '' ?
                    ' isDropped'
                    : ''
                )
                break;
            case 'poorsiteperformance':
                setTabD(
                    tabD === '' ?
                    ' isDropped'
                    : ''
                )
                break;
            case 'loginfailure':
                setTabE(
                    tabE === '' ?
                    ' isDropped'
                    : ''
                )
                break;
            case 'favouritesnotrememberedB':
                setTabF(
                    tabF === '' ?
                    ' isDropped'
                    : ''
                )
                break;
            case 'unabletoupdate':
                setTabG(
                    tabG === '' ?
                    ' isDropped'
                    : ''
                )
                break;
            case 'contentIssues':
                setTabH(
                    tabH === '' ?
                    ' isDropped'
                    : ''
                )
                break;
        }
    }

    return (
        <>
            <h1>{appName} Support</h1>
            <h2>Categories</h2>
            <ul>
                <li>App & website issues</li>
                <li>Account issues</li>
                <li>Content issues</li>
            </ul>
            <section>
                <h3>App & website issues</h3>


                <button onClick={handleClick} className='' id='brokenlinks'>
                    <h4>Broken or bad links</h4>
                </button>
                <article className={`dropdownPanel${tabA}`}>
                    <div className={`${tabA}`}>
                        <p>
                            For external links, after attempting to visit the link, please ensure the site url in your browser is valid. If it is not, contact our Support team. Otherwise, we recommend reaching out to the support team of the external site.
                        </p>
                        <p>
                            If the link is internal to {appName}, try refreshing the page.
                        </p>
                        <p>
                            For Windows and in Google Chrome or Microsoft Edge, on your keyboard, hold: Ctrl, F5.
                        </p>
                        <p>
                            For Macs, hold: Cmd, Shift, R.
                        </p>
                        <p>
                            If this does not work, contact our Support team.
                        </p>
                    </div>
                </article>


                <button onClick={handleClick} className='' id='imagesmissing'>
                    <h4>Images missing</h4>
                </button>
                <article className={`dropdownPanel${tabB}`}>
                    <div className={`${tabB}`}>
                        <p>
                            For Windows and in Google Chrome or Microsoft Edge, on your keyboard, hold the Ctrl key, then tap F5 and release both. If the images do not appear, please try visiting the site from another browser and/or another device. If the images still do not appear, please contact our Support team.
                        </p>
                    </div>
                </article>


                <button onClick={handleClick} className='' id='favouritesnotrememberedA'>
                    <h4>Favourites not remembered</h4>
                </button>
                <article className={`dropdownPanel${tabC}`}>
                    <div className={`${tabC}`}>
                        <p>
                            Ensure your browser is set to allow usage of its local storage.
                        </p>
                    </div>
                </article>


                <button onClick={handleClick} className='' id='poorsiteperformance'>
                    <h4>Poor site performance</h4>
                </button>
                <article className={`dropdownPanel${tabD}`}>
                    <div className={`${tabD}`}>
                        <p>
                            Attempt to access the site on another device and another internet connection. If that does not help, try after 24 hours to see if the performance issue is due to a temporary issue such as traffic. If it is still an issue, please report the performance issues to our Support team.
                        </p>
                    </div>
                </article>
            </section>

            <section>
                <h3>Account issues</h3>

                <button onClick={handleClick} className='' id='loginfailure'>
                    <h4>Login failure or forgotten password</h4>
                </button>
                <article className={`dropdownPanel${tabE}`}>
                    <div className={`${tabE}`}>
                        <p>
                            Please use the Forgot Password link on the login page. If you are still not able to login, visit our registration page and create your account.
                        </p>
                    </div>
                </article>


                <button onClick={handleClick} className='' id='favouritesnotrememberedB'>
                    <h4>Favourites not remembered</h4>
                </button>
                <article className={`dropdownPanel${tabF}`}>
                    <div className={`${tabF}`}>
                        <p>
                            Ensure your browser is set to allow usage of its local storage. If you do not have an account, you may visit our registration page, as having an account will help {appName} recall your choices.
                        </p>
                    </div>
                </article>


                <button onClick={handleClick} className='' id='unabletoupdate'>
                    <h4>Unable to update profile information</h4>
                </button>
                <article className={`dropdownPanel${tabG}`}>
                    <div className={`${tabG}`}>
                        <p>
                            Ensure your browser is set to allow usage of its local storage. If you are still not able to update your profile information, please contact our Support team.
                        </p>
                    </div>
                </article>

            </section>
            <section>
                <button onClick={handleClick} id='contentIssues'>
                    <h3>Content issues</h3>
                </button>
                <article className={`dropdownPanel${tabH}`}>
                    <div className={`${tabH}`}>
                        <p>
                            All movie-related content on {appName} is curated and managed by TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.
                            <img src="/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="Logo for The Movie Database" />
                        </p>
                        <p>
                            For any issues with content, please contact TMDB&apos;s Support Page directly, at: https://www.themoviedb.org/talk
                        </p>
                    </div>
                </article>
            </section>
        </>
    )
}

export default PageSupport