import { useContext } from 'react'
import { CustomContext } from '../components/CustomContext'

const PageHome = () => {
    
    const [ message, setMessage ] = useContext(CustomContext)

    return (
        <>
            <div>
                <div className='testing'>
                    {/*<!-- TESTING -->*/}

                    <button onClick={() => {
                        localStorage.setItem('beeswax', 'potato')
                        setMessage('potato')
                    }}>
                        Click to potato, and to local storage potato under &quot;beeswax&quot;
                    </button>
                    <button onClick={() => {
                        localStorage.clear()
                    }}>
                        Click to clear local storage
                    </button>
                    <div>{message}</div>
                </div>
                    {/*<!-- LIVE CONTENT .. eventually -->*/}
                    <p>
                        PageHome
                    </p>
            </div>
        </>
    )
}

export default PageHome