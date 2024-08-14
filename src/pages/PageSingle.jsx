import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { fetchSingleton } from '../utilities/themoviedatabase/themoviedatabase'
import { api_key, tmdbEndpoint } from '../config/config'
import { MovieAppContext } from '../router/AppRouter'
import MovieGadget from '../components/MovieGadget'


const PageSingle = () => {

    const { isHomeBtnEnabled, setIsHomeBtnEnabled, isStorageUnlocked, setIsStorageUnlocked, state, dispatch } = useContext(MovieAppContext)
    const { movieID } = useParams()
    const [ movieDetails, setMovieDetails ] = useState(null)


    // Attempt to fetch movie details
    useEffect(() => {
        async function getMovieDetails(movieID) {
            try {
                const url = `${tmdbEndpoint}/${movieID}?language=en-US&api_key=${api_key}`
                const fetchedDetails = await fetchSingleton(url)
                if (fetchedDetails) {
                    setMovieDetails(fetchedDetails)
                }
            }
            catch(failMessage) {
                console.warn(failMessage)
            }
        }

        getMovieDetails(movieID)
    }, [movieID])


    // Flag to enable PageHome button, and unlock localStorage
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
            {movieDetails ? (
                <>
                    <h1>Blog Post</h1>
                    <article className={`MovieDisplayList`}>
                        <MovieGadget key={`movieGadget-${movieDetails.id}`} movieDetails={movieDetails} />
                    </article>
                </>
            )
            :(
                <div>
                    <p>Failed to fetch movie details, or unrecognized movie ID!</p>

                </div>
            )}
        </section>
    )
}

export default PageSingle
/**
 Individual Movie Pages
 ● This page is accessed when a user clicks on the “More Info” link on an individual movie
 ● All the requirements from the “All Pages” requirements plus…
 ● POSTER       (or generic placeholder if no poster is available)
 ● TITLE
 ● DATE         of release
 ● RATE         Review rating - e.g. 67%
 ● PLOT         Summary
 ● LIKE         or unlike, in localStorage
 * 
 */