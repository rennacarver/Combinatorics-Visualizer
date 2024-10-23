import React from 'react'

const HidePermutationsButton = ({ isPermutationsHidden }) => {
  return (
    <>
      <span className='options-span' style={{ cursor: 'pointer' }}>
        {isPermutationsHidden ? 'Permutations: OFF' : 'Permutations: ON'}
      </span>
    </>
  )
}

export default HidePermutationsButton
