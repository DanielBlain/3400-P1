import { useState, useEffect } from 'react'
import { fetchList } from '../utilities/themoviedatabase/themoviedatabase'
import useLocalStorage from '../customhooks/useLocalStorage'
import MovieGadget from '../components/MovieGadget'
import { appName, api_key, tmdbEndpoint } from '../config/config'

// Home page movie filter constants
const NOW_PLAYING   = `/now_playing`
const POPULAR       = `/popular`
const TOP_RATED     = `/top_rated`
const UPCOMING      = `/upcoming`

const PageHome = () => {

    const [filter, setFilter] = useLocalStorage(`${appName}-homefilter`, useState(null))
    const [displayedMovies, setDisplayedMovies] = useState(null)


    // The user's last choice for filter is loaded
    // from localStorage automatically, by the
    // useLocalStorage hook
    
    
    // Update PageHome when a new movie filter is selected
    useEffect(() => {
        async function updateMovieList(filterType, pagination=`&page=1`) {
            const url = `${tmdbEndpoint}${filterType}?include_adult=false&include_video=false&language=en-US${pagination}&api_key=${api_key}`
            const newMovieList = await fetchList(url)
            if (newMovieList) {
                setDisplayedMovies(newMovieList)
            }
        }

        if (filter) {updateMovieList(filter)}
    }, [filter])


    // The component --------------------------------------
    return (
        <>
            <div>
                <div>
                    <h1>Home page</h1>
                    <p>
                        Page Home - This is where all the magic happens! Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, fugit tenetur exercitationem ratione officiis accusamus eligendi quaerat in autem, quia voluptas id iste dignissimos totam obcaecati vitae culpa vero neque.
                    </p>
                    <p>                        
                        Veniam molestias, corporis obcaecati suscipit non aut ut nostrum illo quia minima maxime. Accusamus eum, omnis itaque nam repellendus, blanditiis sint maiores, nobis nihil porro praesentium iste explicabo reiciendis recusandae.
                    </p>
                    <p>
                        Aperiam saepe maiores quod magni exercitationem assumenda itaque inventore et iusto nemo similique voluptatem quisquam possimus ut, omnis repellendus dolores sapiente nihil, soluta laboriosam error totam est cumque placeat? Dolor.
                    </p>
                </div>
                <div>
                    <h1>Movies!!</h1>
                    <p>
                        Current filter: {filter}
                        <button key={NOW_PLAYING}   onClick={() => setFilter(NOW_PLAYING)}  >Now Playing</button>
                        <button key={POPULAR}       onClick={() => setFilter(POPULAR)}      >Popular</button>
                        <button key={TOP_RATED}     onClick={() => setFilter(TOP_RATED)}    >Top Rated</button>
                        <button key={UPCOMING}      onClick={() => setFilter(UPCOMING)}     >Upcoming</button>
                    </p>
                    <section>
                        {
                            // Guard clauses
                            displayedMovies && displayedMovies.length > 0 ?

                            // Return if passed
                            displayedMovies.map(movieDetails => 
                                <MovieGadget key={`movieGadget-${movieDetails.id}`} movieDetails={movieDetails} />
                            )

                            // Return if failed
                            : `No movies found under this filter! ${filter}`
                        }
                    </section>
                </div>
            </div>
        </>
    )
}

export default PageHome