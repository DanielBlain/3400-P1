import { useState, useEffect } from 'react'


const useLocalStorage = (key, initial, [state, dispatch]) => {

    const [isStorageUnlocked, setIsStorageUnlocked] = useState(false)


    // Function to check whether the obj value sent as a parameter
    // matches the structure of the reference, i.e. is also
    // an object and has the same fields
    function isValidCustomState(obj, reference) {
        if (reference === null || typeof reference !== 'object') {
            return false
        }
    
        for (let key in reference) {
            if (!Object.prototype.hasOwnProperty.call(obj, key)) {
                return false
            }
            
            if (typeof reference[key] === 'object'
                && !reference[key] === null
                && !isValidCustomState(obj[key], reference[key]))
            {
                return false
            }
        }
        return true
    }


    // Call when key/state change, to also update localStorage
    useEffect(() => {
        if (!isStorageUnlocked) {
            console.warn('Ignored localStorage update due to initialization lock. If this is unexpected, use setIsStorageUnlocked(true)')
            return
        }

        try {
            let valueToStore = state
            if (!isValidCustomState(state, initial)) {
                console.warn('Attempt to store invalid state to localStorage')
                console.warn(valueToStore)
                valueToStore = initial
            }
            const packed = JSON.stringify(valueToStore)
            localStorage.setItem(key, packed)
            console.log('localStorage reset')
            console.log(state)
        } catch (failMessage) {
            console.warn(failMessage)
        }
    }, [key, state, initial, dispatch, isValidCustomState])


    // Call on isStorageUnlocked change, to recall value stored in localStorage
    useEffect(() => {
        if (!isStorageUnlocked) {
            try {
                const packed = localStorage.getItem(key)
                let valueRetrieved = JSON.parse(packed)
                if (valueRetrieved) {
                    if (!isValidCustomState(valueRetrieved, initial)) {
                        console.warn('Invalid state retrieved from localStorage. Reverting state to initial')
                        console.warn(valueRetrieved)
                        valueRetrieved = initial
                    }
                    else {
                        console.log('State read from localStorage')
                        console.log(state)
                    }

                    dispatch({ type: 'initializeStorage', newState: valueRetrieved })
                } else {
                    throw('Failed attempt to read from localStorage')
                }
            } catch (failMessage) {
                console.warn(failMessage)
            }
        }
    }, [isStorageUnlocked, dispatch, isValidCustomState])


    return [isStorageUnlocked, setIsStorageUnlocked, state, dispatch]
}

export default useLocalStorage
