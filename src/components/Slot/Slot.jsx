import React from 'react'
import './Slot.css'

const Slot = ({ value, color, handleSlotClick }) => {
  const thisColor = color

  return (
    <>
      <div
        onClick={handleSlotClick}
        className='flex-centered flex top-padding slot-letter'
      >
        <table className='slot-table'>
          <tbody>
            <tr className='slot-letter'>
              <td className='slot-letter' style={{ color: thisColor }}>
                {value}
              </td>
            </tr>
            <tr>
              {/* <td className='small' style={{ color: thisColor }}>
                {color}
              </td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Slot
