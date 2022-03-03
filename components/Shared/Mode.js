import React, { useState } from "react"

export const ThemeContext = React.createContext()
export const ThemeContextChange = React.createContext()

const Mode = ({ children }) => {
    const [mode, setMode] = useState(true)

    return <>
        <ThemeContext.Provider value={mode}>
            <ThemeContextChange.Provider value={setMode}>
                {children}
            </ThemeContextChange.Provider>
        </ThemeContext.Provider>
    </>
}

export default Mode