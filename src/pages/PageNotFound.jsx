import HomeButton from '../components/HomeButton'

const PageNotFound = () => {
    return (
        <section id='mainContent'>
            <h2>Page Not Found</h2>
            <p>Oops! The page you are looking for does not exist.</p>
            <hr />
            <HomeButton>
                <p>
                    Click to go Home
                </p>
            </HomeButton>
        </section>
    )
}

export default PageNotFound