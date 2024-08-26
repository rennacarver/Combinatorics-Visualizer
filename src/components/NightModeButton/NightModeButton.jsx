import React, { useContext } from 'react'
import { ThemeContext } from '../../Theme'
import './NightModeButton.css'
import SunIcon from '../SunIcon/SunIcon'
import MoonIcon from '../MoonIcon/MoonIcon'

const NightModeButton = () => {

    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <>
            <div onClick={() => toggleTheme()}>
                {theme === 'dark-theme' ? <MoonIcon /> : ""}
                {theme === 'light-theme'? <SunIcon /> : ""}
            </div>
        </>
    )
}

export default NightModeButton

