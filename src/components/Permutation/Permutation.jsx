import React from 'react'
import './Permutation.css'
import PermutationUnit from '../PermutationUnit/PermutationUnit'

const Permutation = ({value, colorMap, stringArray}) => {

    const permutation = value.split('')
    const thisColorMap = colorMap
    const thisStringArray = stringArray
    let unitColor = ''

    return (
        <>
            <div className='flex-start flex-row border permutation'>
                {permutation.map((permutationUnit, index) => (
                    <PermutationUnit key={index} value={permutationUnit} color={colorMap[permutationUnit]} />
                ))}
            </div>
        </>
    )
}

export default Permutation