import { useContext } from 'react'
import { UserContext } from '../components/UserContext'

const PageAbout = () => {

    const { message, setMessage } = useContext(UserContext);

    return (
        <>
            <div>PageAbout</div>
            <button onClick={() => setMessage('Hubba wubba')}>Click to Hubba wubba</button>
            <div>{message}</div>
        </>
    )
}

export default PageAbout