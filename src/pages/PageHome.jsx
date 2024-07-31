import { useState, useEffect } from 'react'
import { fetchFromDatabase } from '../utilities/utilities'
import useCustomContext from '../contexts/useCustomContext'
import useLocalStorage from '../customhooks/useLocalStorage'
import { api_key, databaseEndpoint, defaultQueries } from '../config/config'


// Home page movie filter constants
const NOW_PLAYING   = `/now_playing`
const POPULAR       = `/popular`
const TOP_RATED     = `/top_rated`
const UPCOMING      = `/upcoming`


const PageHome = () => {

    const [filter, setFilter] = useLocalStorage('cinescape', useState(NOW_PLAYING))
    const [displayedMovies, setDisplayedMovies] = useState([])
    
    //Update PageHome when a new movie filter is selected
    useEffect(() => {
        async function updateMovieList(filterType, pagination=`&page=1`) {
            const url = `${databaseEndpoint}${filterType}?${defaultQueries}${pagination}&api_key=${api_key}`
            const newMovieList = await fetchFromDatabase(url)
            if (newMovieList) {
                setDisplayedMovies(newMovieList)
            }
        }

        updateMovieList(filter)
    }, [filter])

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
                    <div>
                        <p>Current filter: {filter}</p>
                        <button key={NOW_PLAYING}   onClick={() => setFilter(NOW_PLAYING)}  >Now Playing</button>
                        <button key={POPULAR}       onClick={() => setFilter(POPULAR)}      >Popular</button>
                        <button key={TOP_RATED}     onClick={() => setFilter(TOP_RATED)}    >Top Rated</button>
                        <button key={UPCOMING}      onClick={() => setFilter(UPCOMING)}     >Upcoming</button>
                        {displayedMovies && displayedMovies.length > 0 ?                        
                            displayedMovies.map(movieDetails =>
                                <a key={movieDetails.id} href={`/about/${movieDetails.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={`Image of movie: ${movieDetails.title}`} />
                                </a>
                            )
                            : `No movies found under this filter! ${filter}`
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageHome