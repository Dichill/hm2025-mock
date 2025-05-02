"use client";
import { useState, useEffect } from "react";

/**
 * Custom hook to track window dimensions
 * Safely handles server-side rendering and client-side hydration
 * @returns Current window dimensions {width, height}
 */
const useWindowSize = () => {
    // Default to reasonable values for desktop-first rendering approach
    // This helps prevent layout shifts during hydration
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== "undefined" ? window.innerWidth : 1200,
        height: typeof window !== "undefined" ? window.innerHeight : 800,
    });

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Mark as client-side once mounted
        setIsClient(true);

        if (typeof window !== "undefined") {
            const handleResize = () => {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            };

            // Set initial size
            handleResize();

            // Add event listener
            window.addEventListener("resize", handleResize);

            // Cleanup
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    // For SSR, return a default size that assumes desktop
    // This will be updated once the component mounts on the client
    return isClient ? windowSize : { width: 1200, height: 800 };
};

export default useWindowSize;
