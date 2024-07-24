import { useState, useEffect } from 'react'

// Utility func for this custom hook
const findFirst = (list, soughtKey) =>
    list.findIndex(queried => queried.key === soughtKey)

/*****
 * 
 * useSelectOne
 *      list: (array) of objects, each with a key (string) field
 *      initial: (string) a key for the first object to
 *          be selected by default
 *      orNone: (boolean) if true, the state where no objects are
 *          selected is allowed. In that case, the "selected
 *          object" is null
 * 
 * returns: [ selected object in list,
 *              setter func to select a new object by key ]
 * 
 * If initial contains the key of an object in the list,
 * that object is selected right away
 * 
 * NOTE: objects in list ought to contain unique keys;
 * otherwise, only the object with the first matching key
 * can ever be selected
 * 
 * */
function useSelectOne(list, initial, orNone=false) {

    // A state variable / setter for the selected index
    // May be -1 if no selected objects are allowed (orNone === true)
    const [selectedIndex, setSelectedIndex] =
        useState(() => findFirst(list, initial))

    // Choose a new selected object when the initial key or list changes
    useEffect(() => {
        setSelectedIndex(findFirst(list, initial))
    }, [list, initial])

    // Choose a new key; also chooses the new object, if possible
    // Otherwise the new object is set to -1 (if orNone) or list[0]
    // ERROR if orNone === false but the key is not found
    const setKey = (key) => {
        let newIndex = findFirst(list, key)
        
        if (!orNone && newIndex === -1) {
            newIndex = 0
        }
        setSelectedIndex(newIndex)
        
        if (newIndex === -1 && !orNone) {
            console.warn(`Invalid key: ${key}. Please review the list of keys and select one.`)
        }
        console.log(list[newIndex])
    }

    // Return the selected object, and the setter for the key
    return [
        (selectedIndex !== -1) ?
            list[selectedIndex]
            : null,
        setKey
    ]
}

export default useSelectOne;