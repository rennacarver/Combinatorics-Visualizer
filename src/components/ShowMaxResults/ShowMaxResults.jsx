import React from 'react'

const ShowMaxResults = ({ handleIncreaseResult, permCount }) => {
  return (
    <p className='see-all-results' onClick={handleIncreaseResult}>
      Click to see all results ({permCount} results) (warning: browser slowdown
      ahead)
    </p>
  )
}

export default ShowMaxResults
