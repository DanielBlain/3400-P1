const MovieReducer = (state, action) => {
    switch (action.type) {
        case 'like-movie':
            return
        case 'unlike-movie':
            return
        default:
            console.warn('Unrecognized action type sent to MovieReducer. Did you spell the action.type correctly?')
    }
}

export default MovieReducer