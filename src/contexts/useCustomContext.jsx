import { useContext } from 'react'
import { GlobalCustomContext } from "./CustomContextProvider"

/*****
 * 
 * ---- inspired by https://www.youtube.com/watch?v=I7dwJxGuGYQ
 * "Why use a Custom Hook for React Context API instead of useContext (+ TypeScript)"
 * Author: ByteGrad
 * 
 * ---- written by Daniel J Blain, 30 July 2024
 * 
 * useCustomContext - generic Context consumer, for any type of data we want to
 * share across the app. Use in tandem with CustomContextProvider
 * 
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

const useCustomContext = (contextType) => {
    const [globalState, setGlobalState] = useContext(GlobalCustomContext)

    if (!globalState || !setGlobalState) {
        throw new Error(`Invalid attempt to use context. Have you ensured your context-consuming component is inside your context provider?`)
    }

    // if () {
    //     throw new Error(`Unrecognized custom context. Did you spell the context type correctly?`)
    // }

    const customState = globalState[contextType]

    function setCustomState(newValues) {
        setGlobalState(prevState => ({
            ...prevState,
            [contextType]: Object.assign(prevState[contextType], newValues)
        }));
    }

    return [customState, setCustomState]
}

export default useCustomContext