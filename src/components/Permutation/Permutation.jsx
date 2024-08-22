import React from 'react'
import './Permutation.css'

const Permutation = ({value}) => {

    return (
        <>
            <div className='flex-start flex-row border permutation'>
                {value}
            </div>
        </>
    )
}

export default Permutation