import PropTypes from 'prop-types'
import { createContext } from 'react'

// CustomContext, imported by components to access the context
export const CustomContext = createContext(null);

/*****
 * 
 * ---- inspired by https://www.youtube.com/watch?v=I7dwJxGuGYQ
 * "Why use a Custom Hook for React Context API instead of useContext (+ TypeScript)"
 * Author: ByteGrad
 * 
 * ---- written by Daniel J Blain, 24 July 2024
 * 
 * CustomContextProvider - generic ContextProvider, for any type of data we want to
 * share across the app
 * 
 * Please wrap JSX tags <CustomContextProvider customState={your_custom_state_variable}>
 * around your elements that require access to the custom data. Custom data will be sent
 * as a prop "customState"
 * 
 * */

export const CustomContextProvider = ({customState, children}) => {

    return (
        <CustomContext.Provider value={customState}>
            {children}
        </CustomContext.Provider>
    )
}

CustomContextProvider.propTypes = {
    customState: PropTypes.array,
    children: PropTypes.element
}