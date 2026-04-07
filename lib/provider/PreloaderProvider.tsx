'use client'
import { createContext, useContext, useState } from "react"

const PreloaderContext = createContext({ done: false })
export const usePreloader = () => useContext(PreloaderContext)

export const PreloaderProvider = ({ children }: { children: React.ReactNode }) => {
    const [done, setDone] = useState(false)

    return (
        <PreloaderContext.Provider value={{ done }}>
            {children}
        </PreloaderContext.Provider>
    )
}