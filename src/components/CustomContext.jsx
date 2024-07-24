import PropTypes from 'prop-types'
import { createContext } from 'react'

// CustomContext, imported by components to access the context
export const CustomContext = createContext(null);

/*****
 * 
 * inspired by https://www.youtube.com/watch?v=I7dwJxGuGYQ
 * "Why use a Custom Hook for React Context API instead of useContext (+ TypeScript)"
 * Author: ByteGrad
 * 
 * CustomContextProvider - generic ContextProvider, for any type of data we want to
 * share across the app
 * 
 * Please wrap JSX tags <CustomContextProvider around your elements that require
 * access to the custom data. Custom data must be sent as a prop "customState"
 * 
 * */

export const CustomContextProvider = (props) => {

    return (
        <CustomContext.Provider value={props.customState}>
            {props.children}
        </CustomContext.Provider>
    )
}

CustomContextProvider.propTypes = {
    customState: PropTypes.array,
    children: PropTypes.element
}