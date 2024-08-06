import { useReducer } from 'react'

/*****
 * 
 * ---- written by Daniel J Blain, 26 July 2024
 * 
 * useDispatchManager is a React custom hook meant as a
 * more flexible useReducer. It has essentially the same
 * function and use pattern, except that the reducer
 * function is blind, which is to say: it contains no
 * knowledge of the dispatch paths.
 * 
 * It is able to function because you, the user, will
 * send those dispatch paths to it as a parameter.
 * 
 * I believe this will save me time, because modifying
 * the state change behaviours becomes a matter of just
 * updating the dispatchPathList data structure. The
 * useDispatchManager takes care of the rest. It also
 * takes care of updating the unmutated portions of
 * state, so I don't worry about forgetting.
 * 
 * PARAMETERS: {
 * 
 *      (array, "dispatchPathList") an array of objects
 *      of the form:
 *      {
 *          type (string): the dispatch type,
 *          go (anonymous function): (state, payload) => {
 *              .. mutator code..
 *              .. return ONLY MUTATIONS,
 *                  NOT THE WHOLE STATE
 *          }
 *      }
 * 
 *      (any, "initial") the initial state
 * }
 * 
 * RETURNS: {
 * 
 *      [
 *          (any, "state") the current state
 * 
 *          (function, "dispatch") the dispatch function,
 *          called this way:
 *              dispatch(type: 'TYPE_STRING', payload: any_value)
 *          The element in dispatchPathList corresponding to the
 *          TYPE_STRING has its go function called, with
 *          parameters including the current state and the
 *          payload you sent
 *      ]
 * }
 * 
 * */

const useDispatchManager = (dispatchPathList, initialState) => {
    
    function blindReducer(state, action) {
        const dispatchPath = dispatchPathList.find(
            (queried) => queried.type === action.type)

        // Unrecognized dispatch path; return state unaltered
        if (dispatchPath === -1) {
            console.warn(`Unrecognized dispatch path '${dispatchPath}' called in action type '${action.type}' - are you using the dispatchPathList parameter of useDispatchManager correctly?`)
            return {...state}
        }

        // else found a dispatch path. Perform the state mutation,
        // using that dispatch path
        return {
            ...state,
            ...dispatchPath.go(state, action.payload)
        }
    }

    const [ state, dispatch ] = useReducer(blindReducer, initialState)

    return [ state, dispatch ]
}

export default useDispatchManager





// Sample code for use: import the custom hook, then build your dispatchPathlist
// Recall the dispatchPathlist need ONLY return the MUTATED VALUES
// Each dispatchPathlist must contain "type (string)", "go: (state, payload) => { .. return mutations.. }"
// Then plunk in const [ state, dispatch ] = useDispatchManager(dispatchPathlist, {your initial state}),
// just like useReducer

// import useDispatchManager from '../customhooks/useDispatchManager';
// const dispatchPathlist = [
//     {
//         type: 'ADD_USER',
//         go: (state, payload) => {
//             const newUsername = document.getElementById('username').value
//             const newPassword = document.getElementById('password').value

//             // Ensure userlist is an array
//             const currentState = Array.isArray(state.userlist) ? state.userlist : [];

//             return {
//                 userlist: [...currentState, { username: newUsername, password: newPassword }]
//             }
//         }
//     },
//     {
//         type: 'DELETE_USER',
//         go: (state, payload) => { .. delete user here, no need to return the whole state .. }
//     },
//     {
//         type: 'RENAME_USER',
//         go: (state, payload) => { .. rename user here, no need to return the whole state .. }
//     }
// ]

// const [ state, dispatch ] = useDispatchManager(dispatchPathlist, {userlist: []})

// To dispatch: 
// e.g. dispatch({ type: 'ADD_USER', payload: document.getElementById('username').value })