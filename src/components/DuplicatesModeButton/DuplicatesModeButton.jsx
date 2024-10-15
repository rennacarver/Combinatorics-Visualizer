import React from 'react'

const DuplicatesModeButton = ({
  duplicatesDetected,
  isDuplicatesMode,
  handleDuplicatesModeChange,
}) => {
  return (
    <>
      <span
        className='options-span'
        onClick={handleDuplicatesModeChange}
        style={{ cursor: 'pointer' }}
      >
        {isDuplicatesMode ? 'Duplicates Label: ON' : 'Duplicates Label: OFF'}
      </span>
    </>
  )
}

export default DuplicatesModeButton
