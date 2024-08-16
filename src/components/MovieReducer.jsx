import { getTimestamp } from '../utilities/utilities'


const MovieReducer = (state, action) => {
    switch (action.type) {

        case 'initializeStorage':
            // (    no params)
            // Initialize the app's global state, including localStorage
            return {...action.newState}


        case 'overrideFilter':
            // (    filter: string)
            // Set PageHome's movie filter type
            return {
                ...state,
                browse: {
                    ...state.browse,
                    homeFilter: action.filter
                }
            }


        case 'toggleLikeMovie':
            // (    id: number, id of the movie
            //      add: boolean, true to add, false to delete)
            // Toggle whether a movie is added to the browse.likedMovies list
            return {
                ...state,
                browse: {
                    ...state.browse,
                    likedMovies:
                        state.browse.likedMovies && Array.isArray(state.browse.likedMovies) ?
                        (
                            [
                                ...state.browse.likedMovies.filter(queried => queried !== action.id),
                                ...(action.add ? [action.id] : [])
                            ]
                        )
                        : (
                            action.add ?
                                [action.id]
                                : null
                        )
                }
            }


        case 'register':
            // (    username: string
            //      email: string
            //      password: string
            //      timeRegistered: datetime)
            // Register a new user
            return {
                //...state, // Not required for now since all fields are wiped
                user: {
                    username: action.username,
                    // email:
                    // password:
                    timeLoggedIn: getTimestamp()
                },
                browse: {
                    homeFilter: null,
                    likedMovies: []
                }
            }

    
        case 'logIn':
            // (    username: string
            //      timeLoggedIn: datetime)
            // Log a user in
            return {
                ...state,
                user: {
                    username: action.username,
                    timeLoggedIn: getTimestamp()
                }
            }


        case 'logOut':
            // (    no params)
            // The user has logged out gracefully
            return {
                //...state, // Not required for now since all fields are wiped
                user: {
                    username: null,
                    timeLoggedIn: null
                },
                browse: {
                    homeFilter: null,
                    likedMovies: []
                }
            }


        case 'bootOut':
            // (    no params)
            // The user is being booted out for inactivity
            return {
                //...state, // Not required for now since all fields are wiped
                user: {
                    username: null,
                    timeLoggedIn: null
                },
                browse: {
                    homeFilter: null,
                    likedMovies: []
                }
            }

            
        default:
            console.warn('Unrecognized action type sent to MovieReducer. Did you spell the action.type correctly?')
    }
}

export default MovieReducer