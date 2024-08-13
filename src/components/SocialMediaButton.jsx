import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


const SocialMediaButton = ({ className, location, ariaLabel, tooltip, size, svgPaths }) => {
    return (
        <Link
            to={ location }
            aria-label={ ariaLabel }
            tabIndex={-1}
        >
            <button
                aria-hidden
                className={ `socialButton ${className}` }
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    width={ size }
                    height={ size }
                    viewBox="0 0 256 256"
                    xmlSpace="preserve"
                >
                    <defs></defs>
                    <g
                        style={{
                            stroke: 'none',
                            strokeWidth: 0,
                            strokeDasharray: 'none',
                            strokeLinecap: 'butt',
                            strokeLinejoin: 'miter',
                            strokeMiterlimit: 10,
                            fill: 'none',
                            fillRule: 'nonzero',
                            opacity: 1
                        }}
                        transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                    >
                        {svgPaths.map(( path, index ) => 
                            <path
                                key={ `${tooltip}-${index}` }
                                d={ path }
                                style={{
                                    stroke: 'none',
                                    strokeWidth: 1,
                                    strokeDasharray: 'none',
                                    strokeLinecap: 'butt',
                                    strokeLinejoin: 'miter',
                                    strokeMiterlimit: 10,
                                    fill: 'rgb(36,41,46)',
                                    fillRule: 'nonzero',
                                    opacity: 1
                                }}
                                transform="matrix(1 0 0 1 0 0)"
                                strokeLinecap="round"
                            />
                        )}
                    </g>
                </svg>
            </button>
            <span className='tooltip'>
                { tooltip }
            </span>
        </Link>
    )
}

SocialMediaButton.propTypes = {
    className:  PropTypes.string,
    color:      PropTypes.any,
    location:   PropTypes.string,
    ariaLabel:  PropTypes.string,
    tooltip:    PropTypes.string,
    size:       PropTypes.number,
    svgPaths:   PropTypes.array,
}

export default SocialMediaButton