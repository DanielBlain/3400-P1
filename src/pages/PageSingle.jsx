import { useParams } from 'react-router-dom'

const PageSingle = () => {

    const routeParams = useParams()

    return (
        <div>PageSingle - {routeParams}</div>
    )
}

export default PageSingle