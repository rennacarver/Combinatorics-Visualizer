import React from 'react'
import './Permutation.css'
import PermutationUnit from '../PermutationUnit/PermutationUnit'

const Permutation = ({value, colorMap, permCount}) => {

    const style = {"width" : `${150 / permCount}%`, "fontSize" : `${100 / permCount}vw`}
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