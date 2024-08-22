import { useState, useEffect } from 'react'


/**
 * useLocalStorage - Tightly binds React state with localStorage
 * 
 * @param {string} key - The key name to be used in localStorage
 * 
 * @param {any} reference - The state reference, used to validate
 *      retrievals from localStorage prior to attempts to update state
 * 
 * @param {[any, function]} param2 - The state and dispatch function
 *      returned by useReducer
 * @param {any} param2[0] - The initial state
 * @param {function} param2[1] - The dispatch function
 * 
 * @returns [isStorageUnlocked, setIsStorageUnlocked, state, dispatch]
 *      - isStorageUnlocked: false prevents changes to state from
 *          rippling back to localStorage. Good for initialization
 *          or page-change periods
 *      - setIsLocalStorage: setter for the above
 *      - state: current state, also generally reflects the state
 *          recorded in localStorage
 *      - dispatch: the dispatch function passed as a parameter
 */
const useLocalStorage = (key, reference, [state, dispatch]) => {

    const [isStorageUnlocked, setIsStorageUnlocked] = useState(false)


    // Call when isStorageUnlocked changes to true to load from localStorage,
    // or when key/state changes to update localStorage while it is unlocked
    useEffect(() => {
   
        // Function to check whether the obj sent as a parameter
        // matches the structure of the reference, i.e. is also
        // an object and has the same fields
        function isValidCustomState(obj, reference) {
            if (!obj || !reference || typeof reference !== 'object') {
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


        // No changes allowed if localStorage is locked
        // (e.g. for initialization, changing pages)
        if (isStorageUnlocked == false) {
            console.warn('Ignored attempt to read from localStorage while locked')
            return
        }
        
        
        // Write to localStorage any changes to state,
        // if the changes are valid
        let successfulUpdate = true
        if (isValidCustomState(state, reference)) {
            try {
                let valueToStore = state
                const packed = JSON.stringify(valueToStore)
                localStorage.setItem(key, packed)
                console.log('localStorage write')
                console.log(state)
            } catch {
                successfulUpdate = false
            }
        }
        else {
            successfulUpdate = false
        }


        // Failed? Read state from localStorage instead
        if (!successfulUpdate) {
            try {
                const packed = localStorage.getItem(key)
                let valueRetrieved = JSON.parse(packed)
                if (!isValidCustomState(valueRetrieved, reference)) {
                    // Read something but it's bad? Rewrite initial state to localStorage
                    console.log('localStorage reset')
                    console.log(reference)
                    dispatch({ type: 'initializeStorage', newState: reference })
                }
                else {
                    // Read something and it's good? Update associated state
                    console.log('localStorage read')
                    console.log(state)
                    dispatch({ type: 'initializeStorage', newState: valueRetrieved })
                }
            } catch (failMessage) {
                console.warn(failMessage)
            }                    
        }
        // no else; getting here implies either:
        // (i) localStorage write was successful in the upper block; no further action required
        // (ii) Write to and read from localStorage were both unsuccessful, ignore & no change

    }, [isStorageUnlocked, key, reference, state, dispatch])

    return [ isStorageUnlocked, setIsStorageUnlocked, state, dispatch ]
}

export default useLocalStorage