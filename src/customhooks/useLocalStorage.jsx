import { useEffect } from 'react'

/*****
 * 
 * useLocalStorage
 *      key: (string), the name of the key in localStorage
 *      value: (any), state data we wish to persist through
 *          the use of localStorage
 *      setValue: (func) a setter func for value
 * 
 * returns: [ value with storage attached under key,
 * 
 *              setter func for value that also
 *              updates storage when changed,
 * 
 *              func that retrieves from key in 
 *              localStorage ]
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