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
  let style = {}

  if (Number(rValue) === 1)
    style = {
      width: `fit-content`,
      fontSize: `${15 / rValue}vw`,
    }
  else if (Number(rValue) === 2)
    style = {
      width: `fit-content`,
      fontSize: `${15 / rValue}vw`,
    }
  else
    style = {
      width: `fit-content`,
      fontSize: `${15 / rValue}vw`,
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
