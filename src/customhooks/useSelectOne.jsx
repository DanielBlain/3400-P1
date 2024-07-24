import { useState, useEffect } from 'react'

// Utility func for this custom hook
const findFirst = (list, soughtKey) =>
    list.findIndex(queried => queried.key === soughtKey)

/*****
 * 
 * ---- written by Daniel J Blain
 * 
 * useSelectOne is a React custom hook that takes in a
 * list (array) of objects and offers a key setter and the
 * object selected by that key. Each object must have a
 * "key" field.
 * 
 * The object selected by default is selected by passing
 * in an initial key. If an object with that key does not
 * exist, either the first object in the list is selected,
 * or the object selected is null (depending upon the
 * "orNone" boolean flag set in the parameters)
 * 
 * NOTE:
 * Objects in list ought to contain unique keys;
 * otherwise, only the object with the first matching key
 * can ever be selected
 * 
 * PARAMETERS: {
 * 
 *      (array, "list") list of objects, each with a key field
 * 
 *      (string, "initial") a key, of the initial object to be
 *      selected
 * 
 *      (boolean, "orNone") if true, the state where no objects
 *      are selected is allowed. In that case, the
 *      selected object is null. Otherwise, bad keys
 *      return a warning via console.warn
 * }
 * 
 * RETURNS: {
 * 
 *      (object, "selectedObject") selected object in list
 * 
 *      (function, "setKey") key setter function, to select a
 *      new object by its key
 * }
 * 
 * */
function useSelectOne(list, initial, orNone=false) {

    const [selectedIndex, setSelectedIndex] =
        useState(() => findFirst(list, initial))

    // Choose a new selected object when the initial key or list changes
    useEffect(() => {
        setSelectedIndex(findFirst(list, initial))
    }, [list, initial])

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

    return [
        (selectedIndex !== -1) ?
            list[selectedIndex]
            : null,
        setKey
    ]
}

export default useSelectOne;