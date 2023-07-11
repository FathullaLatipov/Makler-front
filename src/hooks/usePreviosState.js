import { useEffect, useRef } from "react";


const usePrevious = (state) => {
  const prev = useRef()
  useEffect(() => {
    prev.current = state;
  }, [state])
  return prev.current
}

export default usePrevious;