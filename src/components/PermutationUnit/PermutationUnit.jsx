import React from 'react'
import './PermutationUnit.css'

const PermutationUnit = ({ value, color, duplicateKey, isDuplicatesMode }) => {
  const thisColor = color

  return (
    <>
      <span className='permutation-unit' style={{ color: thisColor }}>
        {value}
      </span>
      <span className='duplicate-key'>
        {duplicateKey > 1 && isDuplicatesMode ? duplicateKey : ''}
      </span>
    </>
  )
}

export default PermutationUnit
