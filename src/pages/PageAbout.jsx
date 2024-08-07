import { appName } from '../config/config'

const PageAbout = () => {

    return (
        <>
            <h1>About {appName}</h1>
            <p>
                {appName} is an educational project built by Dan J. Blain as part of a class that teaches students to use the React Javascript framework. The React class was part of the Frontend Web Development program offered by the brilliant people at BCIT.
                <img src="/bcit.png" alt="Logo for BCIT (British Columbia Institute of Technology)" />
            </p>
            <p>
                Thank you for my education!
            </p>
            <p>
                This product uses the TMDB API but is not endorsed or certified by TMDB.
                <img src="/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="Logo for TMDB (The Movie Database)" />
            </p>
            <p>
                Welcome to {appName}, your ultimate movie-browsing companion! Powered by IMDB, the Internet Movie Database, {appName} offers an intuitive experience for exploring a vast collection of movies.
            </p>
            <p>
                Whether you&apos;re a casual viewer or a dedicated cinephile, {appName} offers an extensive movie library with detailed descriptions, audience ratings, and an efficient interface usable by novices while not impeding more advanced users.
            </p>
            <p>
                {appName} also features
            </p>
            <ul>
                <li>Favourites: Click the star (image) to favourite a movie</li>
                {/* <li>Playlists: </li> */}
                <li>User Profiles: Login to ensure your list of favourited movies are saved for next time</li>
                {/* <li>(others?)</li> */}
            </ul>
            <p>Discover new releases, timeless classics, and hidden gems. See what&apos;s Now Playing to get started!</p>
            <p>
                <b>NOTE:</b> {appName} is meant strictly as an educational project, and therefore should <em>not</em> be used for any professional or business purposes. If you choose to do so, it is at your own risk, and I take utterly no responsibility!
            </p>
        </>
    )
}

export default PageAbout