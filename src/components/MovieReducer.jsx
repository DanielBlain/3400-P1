import { getTimestamp } from '../utilities/utilities'


const MovieReducer = (state, action) => {
    switch (action.type) {

        case 'initializeStorage':
            // (    no params)
            // Initialize the app's global state, including localStorage
            return { ...action.newState }


        case 'setFilter':
            // (    filter: string)
            // Set PageHome's movie filter type
            return {
                ...state,
                browse: {
                    ...state.browse,
                    homeFilter: action.filter,
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
                        ),
                }
            }


        case 'register':
            // (    username: string
            //      email: string
            //      password: string
            //      timeRegistered: datetime)
            // Register a new user
            return {
                //...state, // Not required here since all fields are wiped
                user: {
                    username: action.username,
                    email: action.email,
                    password: action.password,
                    timeLoggedIn: getTimestamp(),
                },
                browse: {
                    homeFilter: null,
                    likedMovies: [],
                }
            }

    
        case 'logIn':
            // (    username: string
            //      timeLoggedIn: datetime)
            // Log a user in
            if (action.username === 'dblain2') {
                console.log('You have accessed the demo login')
                return {
                    user: {
                        username: 'dblain2',
                        email: 'dblain2@my.bcit.ca',
                        timeLoggedIn: 42,
                    },
                    browse: {
                        homeFilter: '/now_playing',
                        likedMovies: [945961, 1160018, 1129598, 1066262, 1023922, 1032823, 1010600, 1226578, 1111873, 917496, 940721, 957452, 533535, 1022789, 718821, 519182, 748783, 959092, 786892, 653346],
                    }
                }
            }

            return {
                ...state,
                user: {
                    ...state.user,                  // Demo purposes only -- normally one would not do this
                                                    // Done here so I don't need a backend, and
                                                    // I can just re-register to fill the user data
                    username: action.username,
                    timeLoggedIn: getTimestamp(),
                }
            }


        case 'logOut':
            // (    no params)
            // The user has logged out gracefully
            alert('You have successfully logged out')
            return {
                //...state, // Not required for now since all fields are wiped
                user: {
                    username: null,
                    timeLoggedIn: null,
                },
                browse: {
                    homeFilter: null,
                    likedMovies: [],
                }
            }


        // NOTE: THIS CASE CURRENTLY HAS NO ACTIVATION WITHIN CINESCAPE
        case 'bootOut':
            // (    no params)
            // The user is being booted out for inactivity
            alert('You have logged out due to inactivity')
            return {
                //...state, // Not required for now since all fields are wiped
                user: {
                    username: null,
                    timeLoggedIn: null,
                },
                browse: {
                    homeFilter: null,
                    likedMovies: [],
                }
            }

            
        default:
            console.warn('Unrecognized action type sent to MovieReducer. Did you spell the action.type correctly?')
    }
}

export default MovieReducer