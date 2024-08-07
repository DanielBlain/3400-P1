import PropTypes from 'prop-types'
import { createContext } from 'react'

/*****
 * 
 * ---- inspired by https://www.youtube.com/watch?v=I7dwJxGuGYQ
 * "Why use a Custom Hook for React Context API instead of useContext (+ TypeScript)"
 * Author: ByteGrad
 * 
 * ---- written by Daniel J Blain, 6 Aug 2024
 * 
 * ---- The purpose of following this design pattern: I no longer need to import
 * useCustomContext, my particular myContext, then create useContext(myContext),
 * and double check that it's not null. The custom hook handles all of that. I
 * only now need to:
 *     (i) wrap JSX tags <CustomContextProvider customState={initialStates}>
 * around elements that require access to the custom data
 *     (ii) import and useCustomContext(param) hook, where param is the
 * particular custom context, an immediate field of my_custom_state
 * 
 * For example, if CustomContextProvider is given statesStruct = [ initStates,
 * setStates ], where initStates =
    {
        userContext: {username: '', message: ''},
        moviesContext: {title: '', poster_path: ''}
    }

* then I can access the (i) userContext, and (ii) moviesContext, respectively,
* by using:
    const [user, setUser] = useCustomContext('userContext')
    const [movies, setMovies] = useCustomContext('moviesContext')

 * 
 * Note in the respective setters, I ONLY need to set the values to be updated.
 * The rest will retain their value automatically, by design.
 * 
 * */

export const GlobalCustomContext = createContext( null );

export const CustomContextProvider = ({ statesStruct, children }) => {

    return (
        <GlobalCustomContext.Provider value={ statesStruct }>
            {children}
        </GlobalCustomContext.Provider>
    )
}

CustomContextProvider.propTypes = {
    statesStruct: PropTypes.array,
    children: PropTypes.element
}