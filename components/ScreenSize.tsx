import { useEffect, useState } from "react"

interface displayOptionProps {
    display: boolean
}

interface IWindowSize {
    //windowSize: {
        width: number | undefined,
        height: number | undefined
    //}
    
}

const ScreenSize = (props: displayOptionProps) => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: undefined,
    height: undefined,
  });
  const [display, setDisplay] = useState(props.display)

  useEffect(() => {
    // only execute all the code below in client side
    
      // Handler to call on window resize
      function handleResize() {
        if (typeof window !== 'undefined') {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }}
    
      // Add event listener
      window.addEventListener("resize", handleResize);
     
      // Call handler right away so state gets updated with initial window size
      handleResize();
    
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  , []); // Empty array ensures that effect is only run on mount
  return <div>{display?`Screen Size: ${String(windowSize.width)}x${String(windowSize.height)}`:""}</div>;
}

export default ScreenSize;