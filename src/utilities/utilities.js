export const getYear = () => (new Date).getFullYear()
export const getTimestamp = () => Date.now()


// findFirstByKey finds the first object in the list with
// a key field matching soughtKey, or else -1
export const findFirstByKey = ( list, soughtKey ) =>
    Array.isArray( list )
    && list.findIndex(queried => (
        queried instanceof Object
        && queried.key === soughtKey
    ))


// Accepts a dateString of the format "YYYY-MM-DD" and
// returns [YYYY, M/MM, D/DD]
export function extractDateComponents( dateString ) {
    const [ year, month, day ] = dateString.split('-')
    const monthWithoutZero = parseInt( month, 10 ).toString()
    const dayWithoutZero = parseInt( day, 10 ).toString()

    return {
        year: year,
        month: monthWithoutZero,
        day: dayWithoutZero
    }
}