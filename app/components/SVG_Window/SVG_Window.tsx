"use client";

import { useEffect, useRef, useState } from 'react';

interface SVG_WindowProps {
    className?: string;
}

const SVG_Window = ({ className = "" }: SVG_WindowProps) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: window.innerHeight
                });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // Calculate circle size inversely proportional to screen size
    // Using a reference width of 1920px (typical desktop width)
    const referenceWidth = 1920;
    const minSize = 100; // minimum circle size
    const maxSize = 280; // maximum circle size
    const circleSize = Math.max(
        minSize,
        Math.min(
            maxSize,
            (referenceWidth / dimensions.width) * 200 // 200 is a scaling factor
        )
    );

    return (
        <div ref={containerRef} className={`w-full absolute top-0 left-0 -z-10 ${className}`}>
            <svg
                width="100%"
                height={dimensions.height}
                viewBox={`20 100 ${dimensions.width} ${dimensions.height}`}
                preserveAspectRatio="xMidYMid meet"
                className="absolute"
            >
                <defs>
                    <style>
                        {`
                            @keyframes floatLeft {
                                0%, 100% { transform: translate(${dimensions.width - 1000}px, 100px) scale(0.6, 0.6); }
                                50% { transform: translate(${dimensions.width - 1050}px, 100px) scale(0.6, 0.6); }
                            }
                            @keyframes floatRight {
                                0%, 100% { transform: translate(0px, 200px) scale(0.62, 0.62); }
                                50% { transform: translate(0px, 200px) scale(0.63, 0.64); }
                            }
                            .cloud-left {
                                animation: floatLeft 8s ease-in-out infinite;
                            }
                            .cloud-right {
                                animation: floatRight 10s ease-in-out infinite;
                            }
                        `}
                    </style>
                    <linearGradient id="linear-gradient" x1="969.76" y1="979.94" x2="969.76" y2="69.5" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#ffe450" />
                        <stop offset=".63" stopColor="#f58742" />
                        <stop offset="1" stopColor="#e84d96" />
                    </linearGradient>
                    
                    {/* Glow filter */}
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
                <rect className="cls-1" style={{ fill: "url(#linear-gradient)" }} x="16.98" width="100%" height="150%" />
                <circle
                    transform='translate(-50, -100)'
                    cx={dimensions.width / 2}
                    cy={dimensions.height / 2}
                    r={circleSize / 2}
                    fill="white"
                    filter="url(#glow)"

                />
                
                <path 
                    className="cls-2 cloud-left" 

                    style={{ fill: "#a289d7" }} 
                    d="M956.05,922.44s2.85-139.67,128.27-133.97c0,0-68.41-96.91,22.8-156.77,91.21-59.86,118.19,100.58,118.19,100.58,0,0-41.42-156.62,53.07-226.51,94.49-69.9,170.86,75.07,170.86,75.07,0,0-102.25-236.87-9.06-287.35,93.19-50.48,240.75,63.42,236.87,126.85,0,0,34.95-174.74,128.14-174.74s160.5,78.96,160.5,78.96l.94,790.21-1100.21-1.9s-77.26-145.21,89.63-190.42Z" 
                />
                <path 
                    className="cls-3 cloud-right" 

                    style={{ fill: "#a289d7" }} 
                    d="M1293.44,923.76s-3.65-139.67-164.17-133.97c0,0,79.84-66.25-36.9-126.11s-143.56,69.91-143.56,69.91c0,0,33.22-123.91-87.71-193.81-120.94-69.9-198.89,42.37-198.89,42.37,0,0,22.68-204.81-92.95-281.9-107.77-71.85-238.99-13.87-234.02,49.56,0,0-32.15-159.69-151.43-159.69S1.2,325.87,1.2,325.87l-1.2,790.21,1408.16-1.9s98.88-145.21-114.72-190.42Z" 
                />


            </svg>
        </div>
    );
};

export default SVG_Window; 