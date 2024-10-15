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

  if (rValue === 1)
    style = {
      width: `80vw`,
      fontSize: `${30 / rValue}vw`,
    }
  else if (rValue === 2)
    style = {
      width: `40vw`,
      fontSize: `${30 / rValue}vw`,
    }
  else
    style = {
      width: `30vw`,
      fontSize: `${30 / rValue}vw`,
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
