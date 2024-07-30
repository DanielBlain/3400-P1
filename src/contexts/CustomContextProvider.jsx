import PropTypes from 'prop-types'
import { useState, createContext } from 'react'

/*****
 * 
 * ---- inspired by https://www.youtube.com/watch?v=I7dwJxGuGYQ
 * "Why use a Custom Hook for React Context API instead of useContext (+ TypeScript)"
 * Author: ByteGrad
 * 
 * ---- written by Daniel J Blain, 30 July 2024
 * 
 * CustomContextProvider - generic ContextProvider, for any type of data we want to
 * share across the app. Use in tandem with useCustomContext

 * Please wrap JSX tags <CustomContextProvider customState={your_custom_state_variable}>
 * around your elements that require access to the custom data. Then, import the
 * useCustomContext(param) hook, where param is the particular custom context.
 * 
 * For example, if CustomContextProvider is given initialStates {
        userContext: {username: '', message: ''},
        moviesContext: {title: '', poster_path: '',
    }

    then you can access the (i) userContext, and (ii) moviesContext, respectively,
    with:

    const [user, setUser] = useCustomContext('userContext')    
    and 
    const [movies, setMovies] = useCustomContext('moviesContext')
 * 
 * Note in the respective setters, you ONLY need to set the values to be updated. The
 * rest will retain their value automatically.
 * 
 * */

export const GlobalCustomContext = createContext( null );

export const CustomContextProvider = ({ initialStates, children }) => {

    const [ customState, setCustomState ] = useState( initialStates );

    return (
        <GlobalCustomContext.Provider value={[ customState, setCustomState ]}>
            {children}
        </GlobalCustomContext.Provider>
    )
}

CustomContextProvider.propTypes = {
    initialStates: PropTypes.object,
    children: PropTypes.element
}