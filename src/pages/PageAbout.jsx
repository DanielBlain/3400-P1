import { useContext } from 'react'
import { CustomContext } from '../components/CustomContext'

const PageAbout = () => {

    const [message, setMessage] = useContext(CustomContext);

    return (
        <>
            <h1>Page About</h1>
            <button onClick={() => setMessage('Hubba wubba')}>Click to Hubba wubba</button>
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