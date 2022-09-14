import { useEffect, useState } from 'react'
function debounce(f: (...args: any[]) => void, ms: number) {
  let isCooldown = false

  return function (...args: any[]) {
    if (isCooldown) {
      return
    }

    f(args)

    isCooldown = true

    setTimeout(() => (isCooldown = false), ms)
  }
}

export interface Size {
  //TODO  | undefined google for it with SSR
  height: number; 
  width: number;
}

const getWindowDimensions = (): Size => {
  const { innerWidth: width, innerHeight: height } = window
  return { height, width }
}

const useWindowSize = (delay = 100) => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }
    const debouncedHandleResize = debounce(handleResize, delay)
    window.addEventListener('resize', debouncedHandleResize)
    return () => window.removeEventListener('resize', debouncedHandleResize)
  }, [delay])

  return windowDimensions
}

export default useWindowSize
