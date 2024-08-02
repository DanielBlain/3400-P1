import PropTypes from 'prop-types'
import { useState } from 'react'

const ClickDropdown = ({ tag, children }) => {
    const [ isDroppedContent, setIsDroppedContent ] = useState('')

    function handleClick() {
        setIsDroppedContent( isDroppedContent === '' ?
            ' isDropped'
            : ''
        )
    }

    return (
        <div className='ClickDropdown_wrapper' onClick={handleClick}>
            {tag}
            <section className={`activator${isDroppedContent}`}>
                <article className="activation_panel activation_panel--animated style_rotate_X">
                    {children}
                </article>
            </section>
            <section className={`spacer${isDroppedContent}`}>
                <article className={`spacer_panel activation_panel--animated`}>
                    {children}
                </article>
            </section>
        </div>
    )
}

ClickDropdown.propTypes = {
    tag: PropTypes.element,
    children: PropTypes.element
}

export default ClickDropdown