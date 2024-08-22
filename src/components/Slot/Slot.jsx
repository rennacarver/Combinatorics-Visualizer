import React, { useState, useEffect, useRef } from 'react'
import './Slot.css'

const Slot = ({value, color}) => {

    return (
        <>
            <div className='flex-centered flex top-padding'>
                <table>
                    <tbody>
                    <tr><td>{value}</td></tr>
                    <tr><td className='small'>{color}</td></tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Slot