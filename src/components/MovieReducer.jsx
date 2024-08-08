const MovieReducer = (state, action) => {
    switch (action.type) {
        case 'initializeStorage':
            return {...action.newState}
        case 'chooseFilter':
            return {
                ...state, 
                browse: {
                    ...state.browse,
                    homeFilter: action.filter
                }
            }
        case 'toggleLikeMovie':
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
                                [ action.id ]
                                : null
                        )
                }
            }
        default:
            console.warn('Unrecognized action type sent to MovieReducer. Did you spell the action.type correctly?')
    }
}

export default MovieReducer