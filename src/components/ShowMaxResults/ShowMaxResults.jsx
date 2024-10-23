import React from 'react'

const ShowMaxResults = ({
  handleIncreaseResult,
  permCount,
  isPermutationsHidden,
  combCount,
}) => {
  return (
    <p className='see-all-results' onClick={handleIncreaseResult}>
      Click to see all {isPermutationsHidden ? combCount : permCount} results ⚠️
      browser may crash
    </p>
  )
}

export default ShowMaxResults
