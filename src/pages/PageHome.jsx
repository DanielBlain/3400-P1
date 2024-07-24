import { useContext } from 'react'
import { UserContext } from '../components/UserContext'

const PageHome = () => {

    const { message, setMessage } = useContext(UserContext);

    return (
        <>
            <div>PageHome</div>
            <button onClick={() => setMessage('Booga booga')}>Click to Booga booga</button>
            <div>{message}</div>
        </>
    )
}

export default PageHome