import React from 'react'
import './Permutation.css'
import PermutationUnit from '../PermutationUnit/PermutationUnit'
import { lightColorArray, darkColorArray } from '../../Util/colorArrays'

const Permutation = ({
  permutation,
  colorMap,
  rValue,
  permCount,
  permutationGroup,
  subsetGroup,
  isPermutationMode,
  isDuplicatesMode,
  isHighlightSubsets,
}) => {
  let style = {
    width: `fit-content`,
    fontSize: `min(${15 / rValue}vw, 70px)`,
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
