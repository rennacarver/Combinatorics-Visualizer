import React from 'react'
import './Permutation.css'
import PermutationUnit from '../PermutationUnit/PermutationUnit'

const Permutation = ({
  permutation,
  colorMap,
  rValue,
  permutationGroup,
  isPermutationMode,
  isDuplicatesMode,
  sliderValue,
}) => {
  let style = {
    width: `fit-content`,
    fontSize: `min(${((15 / rValue) * sliderValue) / 100}vw, 70px)`,
  }

  return (
    <>
      <div
        className={
          (permutationGroup > 0 && !isPermutationMode
            ? 'child-permutation'
            : '') + ' permutation'
        }
        style={style}
      >
        {permutation.map((permutationUnit, index) => (
          <PermutationUnit
            key={index}
            value={permutationUnit.value}
            duplicateKey={permutationUnit.duplicateKey}
            color={colorMap[permutationUnit.value]}
            isDuplicatesMode={isDuplicatesMode}
          />
        ))}
      </div>
    </>
  )
}

export default Permutation
