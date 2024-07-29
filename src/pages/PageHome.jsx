import { useState, useEffect } from 'react'
import useSelectOne from '../customhooks/useSelectOne'
import { NOW_PLAYING, POPULAR, TOP_RATED, UPCOMING } from '../config/config'
import { fetchMoviesByFilter } from '../utilities/utilities'

const HomePageMovieFilters = [
    {
        key: NOW_PLAYING,
        filter: `/now_playing`,
        label: 'Now Playing',
    },
    {
        key: POPULAR,
        filter: `/popular`,
        label: 'Popular',
    },
    {
        key: TOP_RATED,
        filter: `/top_rated`,
        label: 'Top Rated',
    },
    {
        key: UPCOMING,
        filter: `/upcoming`,
        label: 'Upcoming',
    }
]

const PageHome = () => {
    const [currentMovieFilter, setCurrentMovieFilter] = useSelectOne(HomePageMovieFilters, NOW_PLAYING)
    const [displayedMovies, setDisplayedMovies] = useState([])

    async function updateMovieList(currentMovieFilter) {
        const stuff = await fetchMoviesByFilter(currentMovieFilter.filter)
        console.log(stuff)
        setDisplayedMovies(stuff)
    }

    useEffect(() => {
        updateMovieList(currentMovieFilter)
    }, [currentMovieFilter])

    return (
        <>
            <div>
                <div>
                    {/*<!-- LIVE CONTENT .. eventually -->*/}
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
                        {HomePageMovieFilters.map(filterDetails => (
                            <button onClick={() => setCurrentMovieFilter(filterDetails.key)} key={filterDetails.key}>{filterDetails.label}</button>
                        ))}
                        {displayedMovies.length > 0 ?                        
                            displayedMovies.map(movieDetails =>
                                <p key={movieDetails.original_title}>
                                    <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={`Image of movie: ${movieDetails.title}`} />
                                </p>
                            )
                            : `No movies found under this filter! ${currentMovieFilter.filter} ${displayedMovies.length}`
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageHome