import React, { useContext } from 'react'
import { ThemeContext } from '../../Theme'
import './NightModeButton.css'
import SunIcon from '../SunIcon/SunIcon'
import MoonIcon from '../MoonIcon/MoonIcon'

const NightModeButton = ({isDarkMode, toggleDarkMode}) => {

    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <>
            <div onClick={() => toggleTheme()}>
                {isDarkMode ? <MoonIcon /> : ""}
                {isDarkMode ? "" : <SunIcon />}
            </div>
        </>
    )
}

export default NightModeButton

