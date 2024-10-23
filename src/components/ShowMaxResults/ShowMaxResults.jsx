import React from 'react'

const ShowMaxResults = ({ handleIncreaseResult, permCount }) => {
  return (
    <p className='see-all-results' onClick={handleIncreaseResult}>
      Click to see all {permCount} results - browser may slow down or crash
    </p>
  )
}

export default ShowMaxResults
