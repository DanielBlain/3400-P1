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


    const makeGenresString = genresArray =>
        (
            genresArray.map( queried => queried.name )
        ).join(' - ')

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
            {movieDetails ? (
                <>
                    <h2>{
                        movieDetails ?
                            movieDetails.title
                            : 'Movie loading or not found'
                        }
                    </h2>
                    <section>
                        <MovieGadget
                            key={ `movieGadget-${movieDetails.id}` }
                            movieDetails={ movieDetails }
                            isInfoAvailable={ false }
                        />
                        <div className='singleDetailsPanel'>
                            <b>Genres</b>
                            <p className='detailLabel'>
                                { makeGenresString(movieDetails.genres) }
                            </p>
                            <p className='spacePanel'>
                                {movieDetails.overview}
                            </p>
                        </div>
                    </section>
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