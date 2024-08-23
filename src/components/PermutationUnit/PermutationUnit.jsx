import React from 'react'
import './PermutationUnit.css'

const PermutationUnit = ({value, color}) => {

    const thisColor = color;

    return (
        <>
            <span className='permutation-unit' style={{color: thisColor}}>{value}</span>
        </>
    )
}

export default PermutationUnit