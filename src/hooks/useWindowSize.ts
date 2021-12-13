import { useState, useEffect } from "react";
import { AppProps } from "../types/props";

const useWindowSize = (): AppProps.SizeProps => {
  const [windowSize, setWindowSize] = useState<AppProps.SizeProps>({})
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => { window.removeEventListener("resize", handleResize) }
  }, [])
  return windowSize
}
export default useWindowSize
