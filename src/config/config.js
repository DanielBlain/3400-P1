// App-wide constants
export const appName        = 'Cinéscape'
export const author         = 'Dan J Blain'
export const authorQuote    = 'Eppur Si Muove'
export const baseFolder     = import.meta.env.BASE_URL
export const imageFolder    = baseFolder + '/assets/images'
/**
 * Notes to Dan for next time -- to prepares images for build to a subfolder:
 * 
 * STEP 1 - Add /assets/{images_folder} to /public, place images here
 * 
 * STEP 2 - In vite.config.js, add "base: '/{subfolder_name}'" to defineConfig
 * 
 * STEP 3 - img src is import.meta.env.BASE_URL + '/assets/{images_folder}/{image.png/jpg/etc}'
 * 
 * STEP 4 - Images in CSS too? Use url('{images_folder}\\{image.png/jpg/etc}')
 * 
 * STEP 5 - Using react-router-dom? Add <BrowserRouter basename='/{subfolder_name}'>
 *          to ensure URLs are updated properly too
 */


// App's initial custom state
export const appCustomState = {
    user: {
        username: null,             // string
        email: null,                // string
        timeLoggedIn: null,         // timestamp in terms of Javascript's Date.now
                                    // which is, according to: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
                                    // the "number of milliseconds elapsed since the epoch, which is defined as the midnight at the beginning of January 1, 1970, UTC"
    },
    browse: {
        homeFilter: null,           // string
        likedMovies: null,          // array of id's
    },
}


// The Movie Database communication
export const api_key = import.meta.env.VITE_TMDB_DANJBLAIN_API_KEY
export const tmdbEndpoint = 'https://api.themoviedb.org/3/movie'


// Social media records
// Social media icons provided by https://iconpacks.net/?utm_source=link-attribution&utm_content=6532
export const socialMedia = [
    {
        // GitHub
        className:  "GitHub",
        location:   "https://github.com/DanielBlain",
        ariaLabel:  "Link to GitHub",
        tooltip:    "GitHub",
        svgPaths:   ["M 5.46 63.31 c 0 0 3.998 1.875 6.773 8.925 c 0 0 3.581 10.887 20.55 7.197 c 0.017 3.237 0.046 6.354 0.064 8.571 C 32.857 89.112 33.758 90 34.867 90 h 26.238 c 1.11 0 2.012 -0.89 2.019 -2 c 0.02 -3.124 0.056 -8.131 0.056 -13.951 c 0 -5.691 -1.949 -9.403 -4.137 -11.296 c 13.583 -1.51 27.853 -6.668 27.853 -30.097 c 0 -6.659 -2.366 -12.101 -6.278 -16.373 c 0.633 -1.537 2.722 -7.741 -0.599 -16.143 c 0 0 -5.115 -1.638 -16.757 6.253 c -4.875 -1.352 -10.097 -2.029 -15.281 -2.053 C 42.798 4.365 37.58 5.043 32.714 6.394 C 21.058 -1.497 15.936 0.141 15.936 0.141 c -3.312 8.402 -1.224 14.606 -0.591 16.143 c -3.902 4.272 -6.286 9.713 -6.286 16.373 c 0 23.372 14.243 28.603 27.792 30.145 c -1.745 1.523 -3.325 4.215 -3.873 8.157 c -3.481 1.559 -12.311 4.254 -17.751 -5.07 c 0 0 -3.226 -5.856 -9.35 -6.287 C 5.877 59.602 -0.075 59.524 5.46 63.31 z"],
    },
    {
        // LinkedIn
        className:  "LinkedIn",
        location:   "https://www.linkedin.com/in/daniel-blain-9b0642230/",
        ariaLabel:  "Link to LinkedIn",
        tooltip:    "LinkedIn",
        svgPaths:   [
            "M 1.48 29.91 h 18.657 v 60.01 H 1.48 V 29.91 z M 10.809 0.08 c 5.963 0 10.809 4.846 10.809 10.819 c 0 5.967 -4.846 10.813 -10.809 10.813 C 4.832 21.712 0 16.866 0 10.899 C 0 4.926 4.832 0.08 10.809 0.08",
            "M 31.835 29.91 h 17.89 v 8.206 h 0.255 c 2.49 -4.72 8.576 -9.692 17.647 -9.692 C 86.514 28.424 90 40.849 90 57.007 V 89.92 H 71.357 V 60.737 c 0 -6.961 -0.121 -15.912 -9.692 -15.912 c -9.706 0 -11.187 7.587 -11.187 15.412 V 89.92 H 31.835 V 29.91 z",
        ],
    },
    {
        // Twitter/X
        className:  "TwitterX",
        location:   "https://x.com/danjblain",
        ariaLabel:  "Link to Twitter/X",
        tooltip:    "Twitter/X",
        svgPaths:   ["M 0.219 2.882 l 34.748 46.461 L 0 87.118 h 7.87 l 30.614 -33.073 l 24.735 33.073 H 90 L 53.297 38.043 L 85.844 2.882 h -7.87 L 49.781 33.341 L 27.001 2.882 H 0.219 z M 11.793 8.679 h 12.303 L 78.425 81.32 H 66.122 L 11.793 8.679 z"],
    },
    {
        // Pinterest
        className:  "Pinterest",
        location:   "https://www.pinterest.ca/danjblain/",
        ariaLabel:  "Link to Pinterest",
        tooltip:    "Pinterest",
        svgPaths:   ["M 25.334 90 c 3.415 -2.853 8.943 -12.256 10.189 -17.048 c 0.671 -2.581 3.437 -13.114 3.437 -13.114 c 1.799 3.43 7.054 6.334 12.644 6.334 c 16.638 0 28.626 -15.301 28.626 -34.312 C 80.229 13.636 65.357 0 46.22 0 C 22.415 0 9.771 15.981 9.771 33.382 c 0 8.091 4.307 18.164 11.198 21.371 c 1.045 0.486 1.604 0.272 1.845 -0.738 c 0.183 -0.767 1.113 -4.513 1.532 -6.256 c 0.134 -0.557 0.068 -1.036 -0.383 -1.582 c -2.279 -2.764 -4.105 -7.848 -4.105 -12.589 c 0 -12.167 9.213 -23.94 24.909 -23.94 c 13.552 0 23.042 9.235 23.042 22.443 c 0 14.923 -7.536 25.261 -17.341 25.261 c -5.415 0 -9.469 -4.478 -8.169 -9.968 c 1.555 -6.558 4.569 -13.634 4.569 -18.367 c 0 -4.237 -2.274 -7.771 -6.98 -7.771 c -5.536 0 -9.982 5.727 -9.982 13.397 c 0 4.886 1.65 8.19 1.65 8.19 s -5.467 23.115 -6.469 27.421 c -1.109 4.764 -0.674 11.476 -0.191 15.84 L 25.334 90 z"],
    },
    {
        // Portfolio
        className:  "Portfolio",
        location:   "https://danjblain.dev/",
        ariaLabel:  "Link to Dan J Blain's Portfolio",
        tooltip:    "Portfolio",
        svgPaths:   [
            "M 76.962 85.395 H 13.039 c -1.104 0 -2 -0.896 -2 -2 V 40.991 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 v 40.403 h 59.923 V 40.991 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 v 42.403 C 78.962 84.499 78.066 85.395 76.962 85.395 z",
            "M 87.998 40.831 c -0.387 0 -0.778 -0.112 -1.122 -0.346 L 45 12.023 L 3.124 40.485 c -0.913 0.622 -2.157 0.383 -2.778 -0.53 c -0.621 -0.913 -0.383 -2.157 0.53 -2.778 l 43 -29.226 c 0.678 -0.461 1.57 -0.461 2.248 0 l 43 29.226 c 0.914 0.621 1.151 1.865 0.53 2.778 C 89.268 40.524 88.639 40.831 87.998 40.831 z",
            "M 76.962 23.319 c -1.104 0 -2 -0.896 -2 -2 v -6.094 h -9.01 c -1.104 0 -2 -0.896 -2 -2 s 0.896 -2 2 -2 h 11.01 c 1.104 0 2 0.896 2 2 v 8.094 C 78.962 22.423 78.066 23.319 76.962 23.319 z",
            "M 39.373 75.782 c -1.104 0 -2 -0.896 -2 -2 V 47.774 h -10.65 v 26.008 c 0 1.104 -0.896 2 -2 2 s -2 -0.896 -2 -2 V 45.774 c 0 -1.104 0.896 -2 2 -2 h 14.65 c 1.104 0 2 0.896 2 2 v 28.008 C 41.373 74.887 40.478 75.782 39.373 75.782 z",
            "M 65.276 61.778 H 50.627 c -1.104 0 -2 -0.896 -2 -2 V 45.774 c 0 -1.104 0.896 -2 2 -2 h 14.649 c 1.104 0 2 0.896 2 2 v 14.004 C 67.276 60.883 66.381 61.778 65.276 61.778 z M 52.627 57.778 h 10.649 V 47.774 H 52.627 V 57.778 z",
        ],
    },
    /*{
        // New social media
        className:  (string) extra className for CSS styling
        location:   (string) the url
        ariaLabel:  (string) label for accessibility
        tooltip:    (string) tooltip label
        svgPaths:   (array of strings) the raw svg paths
            --- can be extracted from a place like https://iconmonstr.com,
            though not all icons have the same format so this might fail
    },*/
]