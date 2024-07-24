import { useContext } from 'react'
import { UserContext } from '../components/UserContext'

const PageHome = () => {

    const { message, setMessage } = useContext(UserContext);

    return (
        <>
            <div>PageHome</div>
            <button onClick={() => setMessage('Booga booga')}>Click to Booga booga</button>
            <button onClick={() => {
                localStorage.setItem('beeswax', 'potato')
            }}>
                Click to local storage potato under &quot;beeswax&quot;
            </button>
            <div>{message}</div>
            <button onClick={() => {
                localStorage.clear()
            }}>
                Click to clear local storage
            </button>
        </>
    )
}

export default PageHome