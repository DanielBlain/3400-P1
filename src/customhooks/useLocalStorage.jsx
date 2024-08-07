import { useState, useEffect } from 'react'

const useLocalStorage = (key, [state, setState]) => {

    const [ initializationLock, setInitializationLock ] = useState(true)

    useEffect(() => {
        if (initializationLock) {
            console.warn('Ignored localStorage update due to initialization lock. If this is unexpected use setInitializationLock(false)')
            return
        }

        try {
            const packed = JSON.stringify(state)
            localStorage.setItem(key, packed)
            console.log('localStorage reset')
            console.log(state)
        }
        catch(failMessage) {
            console.warn(failMessage)
        }
    }, [key, state])

    useEffect(() => {
        if (initializationLock) {
            try {
                const packed = localStorage.getItem(key)
                const unpacked = JSON.parse(packed)
                if (unpacked) {
                    setState(unpacked)
                    console.log('localStorage read')
                    console.log(state)
                }
                else {
                    throw('Failed attempt to read from localStorage')
                }
            }
            catch(failMessage) {
                console.warn(failMessage)
            }
        }
    }, [initializationLock])

    return ([ state, setState, initializationLock, setInitializationLock ])
}

export default useLocalStorage