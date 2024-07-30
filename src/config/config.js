// App-wide constants
export const appName        = `Cinéscape`
export const author         = `Daniel J Blain`
export const authorQuote    = `Eppur Si Muove`

// App's initial custom state
export const appCustomState = {
    userContext: {
        username: 'myUser',
        message: 'message from myUser, amazing huh?'
    },
    moviesContext: {
        title: '',
        poster_path: '',
    }
}

// Home page movie filter constants
export const NOW_PLAYING    = `now_playing`
export const POPULAR        = `popular`
export const TOP_RATED      = `top_rated`
export const UPCOMING       = `upcoming`

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