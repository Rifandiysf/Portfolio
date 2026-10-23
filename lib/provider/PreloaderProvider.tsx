'use client'
import { createContext, useCallback, useContext, useMemo, useState } from "react"

type PreloaderState = {
    ready: boolean
    finished: boolean
    markReady: () => void
    markFinished: () => void
}

const PreloaderContext = createContext<PreloaderState>({
    ready: true,
    finished: true,
    markReady: () => { },
    markFinished: () => { },
})

export const usePreloader = () => useContext(PreloaderContext)

let hasPreloaded = false

export const PreloaderProvider = ({ children }: { children: React.ReactNode }) => {
    const [ready, setReady] = useState(hasPreloaded)
    const [finished, setFinished] = useState(hasPreloaded)

    const markReady = useCallback(() => setReady(true), [])
    const markFinished = useCallback(() => {
        hasPreloaded = true
        setReady(true)
        setFinished(true)
    }, [])

    const value = useMemo(
        () => ({ ready, finished, markReady, markFinished }),
        [ready, finished, markReady, markFinished]
    )

    return <PreloaderContext.Provider value={value}>{children}</PreloaderContext.Provider>
}
