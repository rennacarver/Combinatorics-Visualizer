import React, { useState, useEffect, useRef } from 'react'
import './Slot.css'

const Slot = ({value}) => {

    return (
        <div style={ {border: 'solid 2px white', height: '10px', margin: '10px'} }>{value}</div>
    )
}

export default Slot