import React from 'react'

const PermutationCounter = ({ isPermutationMode, permCount, combCount }) => {

    if (isPermutationMode) {
        return (
            <>
                Total Permutations: {permCount}
            </>
        )
    } else {
        return (
            <>
                Total Combinations: {combCount}
            </>
        )
    }

}

export default PermutationCounter