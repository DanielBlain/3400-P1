// NEVERMIND -- THIS DOESN'T WORK, MAYBE TRY LATER
// It's trickier to console.log from JSX. This function helps.
// Use by: {true && outputThisStuff(stuff_to_consoleLog)}
export function outputThisStuff(stuff) {
    console.log('Logging some stuff:')
    console.log(stuff)
    return (
        <p>This message indicates troubleshooting stuff has been logged to console.</p>
    )
}