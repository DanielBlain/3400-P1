import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { fetchSingleton } from '../utilities/themoviedatabase/themoviedatabase'
import { api_key, tmdbEndpoint } from '../config/config'
import { MovieAppContext } from '../router/AppRouter'
import MovieGadget from '../components/MovieGadget'


const PageSingle = () => {

    const {
        isHomeBtnEnabled,
        setIsHomeBtnEnabled,
        isStorageUnlocked,
        setIsStorageUnlocked,
        state,
        dispatch,
    } = useContext(MovieAppContext)

    const { movieID } = useParams()
    const [ movieDetails, setMovieDetails ] = useState(null)
    const [ isVoteNumbersDisplaying, setIsVoteNumbersDisplaying ] = useState(false)


    // i) Choose correct HomeBtn state
    // ii) Unlock localStorage
    // Run once on boot
    useEffect(() => {
        setIsHomeBtnEnabled(true)
        setIsStorageUnlocked(true)
        return (() => {
            setIsStorageUnlocked(false)
        })
    }, [])

    
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

    const makeGenresString = genresArray =>
        (
            genresArray.map( queried => queried.name )
        ).join(' - ')

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
                    <section className='pageSingle'>
                        <div>
                            <MovieGadget
                                key={ `movieGadget-${movieDetails.id}` }
                                movieDetails={ movieDetails }
                                isInfoAvailable={ false }
                                isVoteNumbersDisplaying={ isVoteNumbersDisplaying }
                                setIsVoteNumbersDisplaying={ setIsVoteNumbersDisplaying }
                            />
                        </div>
                        <div className='singleDetailsPanel'>
                            <h3>
                                Genres
                            </h3>
                            <p>
                                { makeGenresString(movieDetails.genres) }
                            </p>
                            <h3>
                                Summary
                            </h3>
                            <p>
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