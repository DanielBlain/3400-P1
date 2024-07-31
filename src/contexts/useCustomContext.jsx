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
 * ---- The purpose of following this design pattern: I no longer need to import
 * useCustomContext, my particular myContext, then create useContext(myContext),
 * and double check that it's not null. The custom hook handles all of that. I
 * only now need to:
 *     (i) wrap JSX tags <CustomContextProvider customState={my_custom_state}>
 * around elements that require access to the custom data
 *     (ii) import and useCustomContext(param) hook, where param is the
 * particular custom context, an immediate field of my_custom_state
 * 
 * For example, if CustomContextProvider is given initialStates =
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

const useCustomContext = (contextType) => {
    const [globalState, setGlobalState] = useContext(GlobalCustomContext)

    if (!globalState || !setGlobalState) {
        throw new Error(`Invalid attempt to use context. Have you ensured your context-consuming component is inside your context provider?`)
    }

    if (Object.keys(globalState)
        .findIndex(queried => queried === contextType)
        === -1
    ) {
        throw new Error(`Unrecognized custom context. Did you spell the context type correctly?`)
    }

    const customState = {...globalState[contextType]}

    function setCustomState(newValues) {
        setGlobalState(prevState => ({
            ...prevState,
            [contextType]: Object.assign(prevState[contextType], newValues)
        }));
    }

    return [customState, setCustomState]
}

export default useCustomContext