import { useEffect, useRef } from "react"
import {AppProps} from "../types/props"

// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
const useIntersectionObserver = (props: AppProps.UseIntersectionObserverProps): void => {
  const { target, option, onIntersection } = props
  const observerRef = useRef<IntersectionObserver>()
  // set up the intersection observer
  useEffect(() => {
    if (!target.current) return
    if (observerRef.current) observerRef.current.disconnect()
    observerRef.current = new IntersectionObserver(onIntersection, option)
    observerRef.current.observe(target.current)
    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [option, target, onIntersection])
}

export default useIntersectionObserver
