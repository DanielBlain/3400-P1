// App-wide constants
export const appName        = `Cinéscape`
export const author         = `Daniel J Blain`
export const authorQuote    = `Eppur Si Muove`


// App's initial custom state
export const appCustomState = {
    userState: {
        username: null,             // string
        password: null,             // string
    },
    browseState: {
        homeFilter: null,           // string
        likedMovies: null,          // set of id's
    },
}


// Browse state actions
export const BrowseActions = [

    // Like a movie; add to "likedMovies" set
    {
        type: 'like',
        go: (state, payload) => {
            const updatedLiked = 
                state.likedMovies ?
                    new Set([...state.likedMovies])
                    : new Set([])
            updatedLiked.add(payload.id)
            return {
                ...state,
                likedMovies: updatedLiked
            }
        }
    },

    // Unlike a movie; remove from "likedMovies" set
    {
        type: 'unlike',
        go: (state, payload) => {
            let updatedLiked = state.likedMovies
            if (updatedLiked) {
                updatedLiked.delete(payload.id)
            }
            else {
                updatedLiked = new Set([])
            }
            return {
                ...state,
                likedMovies: updatedLiked
            }
        }
    },
]


// The Movie Database communication
export const api_key = import.meta.env.VITE_TMDB_DANJBLAIN_API_KEY
export const tmdbEndpoint = `https://api.themoviedb.org/3/movie`


// Info/Links to app author social media accounts
export const socialMediaAccounts = [
    {
        key: `github`,
        url: `https://github.com/DanielBlain`,
        tooltip: `GitHub`,
    },
    {
        key: `linkedin`,
        url: `https://www.linkedin.com/in/daniel-blain-9b0642230/`,
        tooltip: `LinkedIn`,
    },
    {
        key: `twitterx`,
        url: `https://x.com/danjblain`,
        tooltip: `Twitter/X`,
    },
    {
        key: `pinterest`,
        url: `https://www.pinterest.ca/danjblain/`,
        tooltip: `Pinterest`,
    },
    {
        key: `dans-homepage`,
        url: `https://danjblain.dev/`,
        tooltip: `Portfolio`,
    },
    {
        key: `noels-twitch`,
        url: `https://www.twitch.tv/tetsuorocks`,
        tooltip: `My Brother's Twitch`,
    },
    // {
    //     key: `text-dan-direct`,
    //     url: ``, // Can I hook this up somehow?
    //     tooltip: `TextMe?`,
    // },
]