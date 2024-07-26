import { useEffect } from 'react'

/*****
 * 
 * ---- written by Daniel J Blain, 24 July 2024
 * 
 * useLocalStorage is a React custom hook that takes in a
 * key (string) and a React state in the form of an array
 * [value, setValue] of React, and offers a similar pair
 * of React state. The difference is, the new pair is
 * associated with an element in localStorage with the
 * same name as the key.
 * 
 * The localStorage version is updated when the React
 * state value updates. The reverse is not necessarily
 * true, although the localStorage version is loaded into
 * the React state automatically, if it already exists,
 * replacing whatever initial value the React state may
 * have already had.
 * 
 * PARAMETERS: {
 * 
 *      (string, "key") the key of the React state as it
 *      appears in localStorage
 * 
 *      [
 *          (any, "value") the React state variable
 * 
 *          (function, "setValue") setter function for
 *          the React state
 *      ]
 * }
 * 
 * RETURNS: {
 * 
 *      [
 *          (any, "value") the React state variable,
 *          now tied to localStorage[key]
 * 
 *          (function, "setValue") setter function for
 *          the React state. Also updates the
 *          associated localStorage[key]
 *      ]
 * }
 * 
 * */
function useLocalStorage(key, [value, setUnstoredValue]) {

    // Set the value and set it in localStorage under the
    // given key
    const setValue = (newValue) => {
        setUnstoredValue(newValue)
        localStorage.setItem(key, JSON.stringify(newValue))
    }

    // When useLocalStorage if first called, check for and
    // retrieve the value stored under the key
    useEffect(() => {
        const storedValue = localStorage.getItem(key)
        if (storedValue) {
            setUnstoredValue(JSON.parse(storedValue))
        }
    }, [key, setUnstoredValue])

    // When key or value are changed, check if there's
    // already a value stored under that key. If not, store
    // value under the key
    useEffect(() => {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify(value))
        }
    }, [key, value])

    // Return the selected object, and the setter for the key
    return [value, setValue]
}

export default useLocalStorage;