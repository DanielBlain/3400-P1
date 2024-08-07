import { useEffect } from 'react'
import useCustomContext from '../contexts/useCustomContext'
import MovieDisplayList from '../components/MovieDisplayList'

// Home page movie filter constants
const NOW_PLAYING   = `/now_playing`
const POPULAR       = `/popular`
const TOP_RATED     = `/top_rated`
const UPCOMING      = `/upcoming`

const PageHome = () => {
    
    const [ browse, setBrowse ] = useCustomContext('browseState')

    const isFilterValid = () => {
        if (browse.homeFilter != NOW_PLAYING
            && browse.homeFilter != POPULAR
            && browse.homeFilter != TOP_RATED
            && browse.homeFilter != UPCOMING
        ) {
            return false
        }
        return true
    }

    useEffect(() => {
        if (!isFilterValid()) {
            setBrowse({...browse, homeFilter: NOW_PLAYING})
        }
    }, [])

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
                        Current filter: {browse && browse.homeFilter}
                        <button key={NOW_PLAYING}   onClick={() => setBrowse({...browse, homeFilter: NOW_PLAYING})} >Now Playing</button>
                        <button key={POPULAR}       onClick={() => setBrowse({...browse, homeFilter: POPULAR})}     >Popular</button>
                        <button key={TOP_RATED}     onClick={() => setBrowse({...browse, homeFilter: TOP_RATED})}   >Top Rated</button>
                        <button key={UPCOMING}      onClick={() => setBrowse({...browse, homeFilter: UPCOMING})}    >Upcoming</button>
                    </p>
                    {browse && isFilterValid() && <MovieDisplayList filterType={browse.homeFilter} />}
                </div>
            </div>
        </>
    )
}

export default PageHome