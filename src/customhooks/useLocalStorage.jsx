import { useState, useEffect } from 'react'


const useLocalStorage = (key, [state, dispatch]) => {

    const [isStorageUnlocked, setIsStorageUnlocked] = useState(false)


    // Call when key/state change, to also update localStorage
    useEffect(() => {
        if (!isStorageUnlocked) {
            console.warn('Ignored localStorage update due to initialization lock. If this is unexpected, use setIsStorageUnlocked(true)')
            return
        }

        try {
            const packed = JSON.stringify(state)
            localStorage.setItem(key, packed)
            console.log('localStorage reset')
            console.log(state)
        } catch (failMessage) {
            console.warn(failMessage);
        }
    }, [key, state])


    // Call on isStorageUnlocked change, to recall value stored in localStorage
    useEffect(() => {
        if (!isStorageUnlocked) {
            try {
                const packed = localStorage.getItem(key)
                const unpacked = JSON.parse(packed)
                if (unpacked) {
                    dispatch({ type: 'initializeStorage', newState: unpacked })
                    console.log('localStorage read')
                    console.log(state);
                } else {
                    throw('Failed attempt to read from localStorage')
                }
            } catch (failMessage) {
                console.warn(failMessage)
            }
        }
    }, [isStorageUnlocked])


    return [isStorageUnlocked, setIsStorageUnlocked, state, dispatch]
}

export default useLocalStorage
