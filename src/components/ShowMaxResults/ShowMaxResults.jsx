import React from 'react'

const ShowMaxResults = ({ handleIncreaseResult }) => {
  return (
    <p className='see-all-results' onClick={handleIncreaseResult}>
      Click to see all results (warning: browser slowdown ahead)
    </p>
  )
}

export default ShowMaxResults