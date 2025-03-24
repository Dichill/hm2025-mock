"use client";
import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,  // Initialize with 0 to avoid SSR issues
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {  // Ensure window is accessed on client
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // Set size on mount
      handleResize();

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return windowSize;
};

export default useWindowSize;
