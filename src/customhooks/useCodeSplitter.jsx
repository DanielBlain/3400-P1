import PropTypes from 'prop-types'
import React, { Suspense } from 'react'

const useCodeSplitter = ( componentPath, fallbackNode ) => {
    const LazyComponent = React.lazy( ()=>import( componentPath ))

    return (
        <Suspense fallback={ fallbackNode }>
            <LazyComponent />
        </Suspense>
    )
}

useCodeSplitter.propTypes = {
    componentPath: PropTypes.string,
    fallbackNode: PropTypes.node,
}

export default useCodeSplitter