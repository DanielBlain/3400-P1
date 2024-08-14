import { useState, useEffect } from 'react'


const useLocalStorage = (key, initial, [state, dispatch]) => {

    const [isStorageUnlocked, setIsStorageUnlocked] = useState(false)


    // Call when isStorageUnlocked changes to true to load from localStorage,
    // or when key/state changes to update localStorage while it is unlocked
    useEffect(() => {
        

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


        // Try to update localStorage any change to state
        let successfulUpdate = true
        try {
            let valueToStore = state
            const packed = JSON.stringify(valueToStore)
            localStorage.setItem(key, packed)
            console.log('localStorage reset')
            console.log(state)
        } catch {
            successfulUpdate = false
        }

        // Failed? Read from localStorage if isStorageUnlocked
        if (!successfulUpdate) {
            if (isStorageUnlocked) {
                try {
                    const packed = localStorage.getItem(key)
                    let valueRetrieved = JSON.parse(packed)
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
                } catch (failMessage) {
                    console.warn(failMessage)
                }                    
            }
            else {
                console.warn('Ignored attempt to read from localStorage while locked. If this is unexpected, try setIsStorageUnlocked(true)')
            }
        }
    }, [isStorageUnlocked, key, initial, state, dispatch])

    return [isStorageUnlocked, setIsStorageUnlocked, state, dispatch]
}

export default useLocalStorage
