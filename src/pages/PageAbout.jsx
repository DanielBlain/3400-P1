import { useContext } from 'react'
import { UserContext } from '../components/UserContext'

const PageAbout = () => {

    const { message, setMessage } = useContext(UserContext);

    return (
        <>
            <div>PageAbout</div>
            <button onClick={() => setMessage('Hubba wubba')}>Click to Hubba wubba</button>
            <button onClick={() => {
                setMessage(localStorage.getItem('beeswax'))
            }}>
                Click to retrieve &quot;beeswax&quot; from local storage
            </button>
            <button onClick={() => {
                localStorage.removeItem('beeswax')
            }}>
                Click to remove local storage under &quot;beeswax&quot;
            </button>
            <div>{message}</div>
        </>
    )
}

export default PageAbout