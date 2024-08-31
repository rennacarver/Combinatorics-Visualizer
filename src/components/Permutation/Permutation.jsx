import React from 'react'
import './Permutation.css'
import PermutationUnit from '../PermutationUnit/PermutationUnit'

const Permutation = ({value, colorMap, nValue, permCount, isParentCombination, isPermutationMode}) => {

    let style = {}

    if (permCount === 1)
        style = {"width" : `100%`, "fontSize" : `${30 / permCount}vw`}
    else if (permCount === 2)
        style = {"width" : `35%`, "fontSize" : `${30 / permCount}vw`}
    else 
        style = {"width" : `${200 / permCount}vw`, "fontSize" : `${75 / permCount}vw`}
    const permutation = value.split('')

    return (
        <>
            <div className={(!isParentCombination && !isPermutationMode ? 'child-permutation': '') + ' permutation'} style={style}>
                {permutation.map((permutationUnit, index) => (
                    <PermutationUnit key={index} value={permutationUnit} color={colorMap[permutationUnit]} />
                ))}
            </div>
        </>
    )
}

export default Permutation