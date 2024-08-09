const MovieReducer = (state, action) => {
    switch (action.type) {

        case 'initializeStorage':
            // (    no params)
            // Initialize the app's global state, including localStorage
            return {...action.newState}


        case 'chooseFilter':
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

            
        default:
            console.warn('Unrecognized action type sent to MovieReducer. Did you spell the action.type correctly?')
    }
}

export default MovieReducer