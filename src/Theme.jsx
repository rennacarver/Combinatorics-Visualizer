import React, { useEffect, createContext, useState } from "react"

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark-theme'
    : 'light-theme'
  )

  useEffect ( () => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) 
        document.body.style.backgroundColor = "#292838"
    else
        document.body.style.backgroundColor = "white"
  }, [])

  function toggleTheme() {
    if (theme === "dark-theme") {
      setTheme("light-theme")
      document.body.style.backgroundColor = "white"
    } else {
      setTheme("dark-theme")
      document.body.style.backgroundColor = "#292838"
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider }