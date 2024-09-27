import React from 'react'
import './Permutation.css'
import PermutationUnit from '../PermutationUnit/PermutationUnit'
import { lightColorArray, darkColorArray } from '../../Util/colorArrays'

const Permutation = ({
  permutation,
  colorMap,
  nValue,
  permCount,
  permutationGroup,
  subsetGroup,
  isPermutationMode,
  isDuplicatesMode,
  isHighlightSubsets,
}) => {
  let style = {}

  if (permCount === 1)
    style = {
      width: `100%`,
      fontSize: `${30 / permCount}vw`,
    }
  else if (permCount === 2)
    style = {
      width: `35%`,
      fontSize: `${30 / permCount}vw`,
    }
  else
    style = {
      width: `${200 / permCount}vw`,
      fontSize: `${40 / permCount}vw`,
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
