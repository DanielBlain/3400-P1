// import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchFromDatabase } from '../utilities/utilities'
// import useCustomContext from '../contexts/useCustomContext'
// import useLocalStorage from '../customhooks/useLocalStorage'
import { api_key, databaseEndpoint, defaultQueries } from '../config/config'

const PageSingle = () => {
    const movieID = useParams()

    return (
        <div>
            <p>Et cetera</p>
            {/* <div>PageSingle - {routeParams}</div> */}
        </div>
    )
}

export default PageSingle