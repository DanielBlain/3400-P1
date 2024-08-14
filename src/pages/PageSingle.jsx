import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { fetchSingleton } from '../utilities/themoviedatabase/themoviedatabase'
import { api_key, tmdbEndpoint } from '../config/config'
import { MovieAppContext } from '../router/AppRouter'


const PageSingle = () => {

    const { isStorageUnlocked, setIsStorageUnlocked, state, dispatch } = useContext(MovieAppContext)
    const { movieID } = useParams()
    const [movieDetails, setMovieDetails] = useState(null)


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


    // Unlock localStorage. Run once on boot
    useEffect(() => {
        setIsStorageUnlocked(true)
        return (() => {
            setIsStorageUnlocked(false)
        })
    }, [])


    return (
        <>
            <div>
                <h1>Blog Post #{movieID}</h1>
                <p>This is the content of blog post #{movieID}.</p>
                <div>
                    {movieDetails && <img src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`} alt={`Image of movie: ${movieDetails.title}`} />}
                    Details are:
                    <p className='isUrl'>
                        {movieDetails && JSON.stringify(movieDetails)}
                    </p>
                </div>
            </div>
        </>
    )
}

export default PageSingle