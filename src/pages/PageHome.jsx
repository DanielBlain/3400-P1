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
                        Potatoize &quot;beeswax&quot;
                    </button>
                    <button onClick={() => {
                        localStorage.clear()
                    }}>
                        Clear storage
                    </button>
                    <div>{message}</div>
                </div>
                    {/*<!-- LIVE CONTENT .. eventually -->*/}
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
        </>
    )
}

export default PageHome