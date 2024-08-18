import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'


const RatingsIndicators = ({ ratingOutOfTen, isVoteNumbersDisplaying, setIsVoteNumbersDisplaying }) => {

    const [ lowDial, setLowDial ] = useState(0)
    const [ midDial, setMidDial ] = useState(0)
    const [ highDial, setHighDial ] = useState(0)

    
    const handleClick = e => {
        e.preventDefault()
        setIsVoteNumbersDisplaying(!isVoteNumbersDisplaying)
    }
    
    useEffect(() => {

        const subscoreToAngle = (score, total) =>
            (score/total)*360.0
        // Calculated beginning with score/total = x/360deg
        // Solve for x

        if (ratingOutOfTen < 0 || ratingOutOfTen > 10) {
            return
        }

        // Calculate top left dial
        const lowDialAngle =
            ratingOutOfTen >= 3.333 ?
            360.0
            : subscoreToAngle(ratingOutOfTen, 3.333)

        // Calculate mid dial
        const midDialAngle =
            ratingOutOfTen > 6.667 ?
            360.0
            : subscoreToAngle(ratingOutOfTen - 3.333, 3.333)

        // Calculate high dial
        const highDialAngle = subscoreToAngle(ratingOutOfTen - 6.667, 3.333)

        // Set the dial values
        setLowDial  ( lowDialAngle )
        setMidDial  ( midDialAngle )
        setHighDial ( highDialAngle )

    }, [ratingOutOfTen])


    // 360.0 minus the angles in the following code, because
    // CSS conic-gradient does not display counterclockwise,
    // so to make it happen, we have to swap the colors and angles
    return (
        <button onClick={ handleClick }>
            <div className='ratingsIndicator'>
                {/** Upper left dial, [0.0 - 5.0)*/}
                <div
                    className={ isVoteNumbersDisplaying ? 'hide' : ''}
                    style={{//
                        background: `conic-gradient(black 0deg, black ${ 360.0 - lowDial }deg, #00E414 ${ 360.0 - lowDial }deg`
                    }}
                >
                    {/** Intentionally empty - mostly handled by CSS */}
                </div>

                {/** Main dial, [5.0 - 8.5]*/}
                <div
                    className={ isVoteNumbersDisplaying ? 'hide' : ''}
                    style={{
                        background: `conic-gradient(black 0deg, black ${ 360.0 - highDial }deg, #00E414 ${ 360.0 - highDial }deg`
                    }}
                >
                    {/** Intentionally empty - mostly handled by CSS */}
                </div>

                {/** Upper right dial, (8.5 - 10.0]*/}
                <div
                    className={ isVoteNumbersDisplaying ? 'hide' : ''}
                    style={{
                        background: `conic-gradient(black 0deg, black ${ 360.0 - midDial }deg, #00E414 ${ 360.0 - midDial }deg`
                    }}
                >
                    {/** Intentionally empty - mostly handled by CSS */}
                </div>

                {/** Actual average_vote number is shown if the indicator is clicked */}
                <span
                    className={ isVoteNumbersDisplaying ? 'show' : ''}
                >
                    {ratingOutOfTen}
                </span>
            </div>
        </button>
    )
}

RatingsIndicators.propTypes = {
    ratingOutOfTen: PropTypes.number,
    isVoteNumbersDisplaying: PropTypes.bool,
    setIsVoteNumbersDisplaying: PropTypes.func,
}

export default RatingsIndicators