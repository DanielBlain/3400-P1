import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchSingleton } from '../utilities/themoviedatabase/themoviedatabase'
// import useCustomContext from '../contexts/useCustomContext'
// import useLocalStorage from '../customhooks/useLocalStorage'
import { api_key, tmdbEndpoint } from '../config/config'

const PageSingle = () => {

    const [isLocated, setIsLocated] = useState(false)
    const { movieID } = useParams()
    const [movieDetails, setMovieDetails] = useState(null)


    // Update PageHome when a new movie filter is selected
    useEffect(() => {
        async function getMovieDetails(movieID) {
            try {
                const url = `${tmdbEndpoint}/${movieID}?language=en-US&api_key=${api_key}`
                const fetchedDetails = await fetchSingleton(url)
                if (fetchedDetails) {
                    setIsLocated(true)
                    setMovieDetails(fetchedDetails)
                }
            }
            catch {
                setIsLocated(false)
            }
        }

        getMovieDetails(movieID)
    }, [isLocated])


    // The component --------------------------------------
    return (
        <>
            <div>
                <h1>Blog Post #{movieID}</h1>
                <p>This is the content of blog post #{movieID}.</p>
                <p>
                    {movieDetails && <img src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`} alt={`Image of movie: ${movieDetails.title}`} />}
                    Details are:
                    {movieDetails && JSON.stringify(movieDetails)}
                </p>
            </div>
        </>
    )
}

export default PageSingle