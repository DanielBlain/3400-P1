import useCustomContext from '../contexts/useCustomContext'

const PageAbout = () => {
    
    const [movies, setMovies] = useCustomContext('moviesState')

    return (
        <>
            <h1>Page About</h1>
            <p>
                Title is {movies.title}
            </p>
            <p>
                Poster Path is {movies.poster_path}
            </p>
            <button onClick={()=>setMovies({title: 'wez on strike!', poster_path: 'Potatoes have value'})}>Update Movie stuff</button>
        </>
    )
}

export default PageAbout