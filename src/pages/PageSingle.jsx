const fakeMovieData = [
    {
        key: 'avatar',
        title: 'Avatar'
    },
    {
        key: 'beaus-afraid',
        title: 'Beau\'s Afraid'
    },
    {
        key: 'blackberry',
        title: 'Blackberry'
    },
    {
        key: 'dungeons-and-dragons-honor-among-thieves',
        title: 'Dungeons & Dragons',
        subtitle: 'Honor Among Thieves'
    },
    {
        key: 'elemental',
        title: 'Elemental'
    },
    {
        key: 'fight-club',
        title: 'Fight Club'
    }
]

import { useParams } from 'react-router-dom'

const PageSingle = () => {

    const movieID = useParams().id;

    return (
        <div>PageSingle: {movieID}</div>
    )
}

export default PageSingle