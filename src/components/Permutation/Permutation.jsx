import React from 'react'
import './Permutation.css'
import PermutationUnit from '../PermutationUnit/PermutationUnit'

const Permutation = ({value, colorMap, stringArray, numSlots}) => {

    const style = {"width" : `${80 / numSlots}%`, "fontSize" : `${12 / numSlots}vw`}
    const permutation = value.split('')

    return (
        <>
            <div className='permutation' style={style}>
                {permutation.map((permutationUnit, index) => (
                    <PermutationUnit key={index} value={permutationUnit} color={colorMap[permutationUnit]} />
                ))}
            </div>
        </>
    )
}

export default Permutation