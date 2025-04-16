"use client";

import { backgroundColor, PRIMARY_COLORS } from '@/lib/colors';
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
        <div ref={containerRef} className={`w-full absolute top-0 left-0 z-10 ${className}`}>
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
                            .dark-frame {
                                fill: "#a289d7";
                            }
                            .wire_left {
                                transform: scale(.7);
                                fill: ${PRIMARY_COLORS.GREY_432.hex}
                            }
                            .wire_right {
                                transform: scale(.7) translate(${(dimensions.width * (10 / 7)) - 450}px);
                                fill: ${PRIMARY_COLORS.GREY_432.hex}
                            }
                            @keyframes heroCloud {
                                0%, 100% { transform: translate(0px, 500px) scale(2, 2); }
                                30% { transform: translate(0px, 500px) scale(2.1, 2.1); }
                            }
                            .hero_cloud-1, .hero_cloud-2, .hero_cloud-3 {
                                animation: heroCloud 12s ease-in-out infinite;
                            }
                            .hero_cloud-1 {
                                fill: #ffb8a6;
                            }
                            .hero_cloud-2 {
                                fill: #ffe4e0;
                            }
                            .hero_cloud-3 {
                                fill: #ffd4ca;
                            }
                            .hero_cloud-1, .hero_cloud-2, .hero_cloud-3 {
                                transform: translate(0px, 500px) scale(2)
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
                <rect className="cls-1" style={{ fill: "url(#linear-gradient)" }} x="16.98" width="105%" height="150%" />
                <circle
                    id="sun"
                    transform='translate(-50, -100)'
                    // cy={dimensions.height / 2}
                    cx={dimensions.width / 2}
                    cy={450}
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

                <path
                    transform='translate(-20, 800), scale(3, 2)'
                    style={{ fill: backgroundColor }}
                    className="dark-frame" d="M10.26,15.78s102.44-41.46,158.54,12.2,187.8,4.88,187.8,4.88c0,0,143.9-21.95,102.44,134.15,0,0,19.51-117.07,187.8-109.76s160.98,182.93,160.98,182.93c0,0,87.8-251.22,273.17-168.29s182.93,285.37,182.93,285.37c0,0-21.95-265.85,217.07-287.8s219.51,158.54,219.51,158.54c0,0,24.39-234.15,260.98-226.83l4.88,1134.15L.5,1137.74,10.26,15.78Z" />


                <path className="hero_cloud-3" d="M.64,215.36s-4.97-34.78,12.78-44.01,40.46,2.13,40.46,2.13c0,0,8.52-39.75,31.24-37.62,0,0,4.97,0,9.94,7.81,0,0,16.33-101.51,76.67-129.91s136.3-2.84,149.08,93.71c0,0,7.81-1.42,19.17,1.42s13.49,8.52,23.43,16.33c9.94,7.81,24.14,8.52,38.33,6.39s26.27,4.97,27.69,16.33c0,0,11.36,2.13,29.11-2.84s17.75,6.39,21.3,9.94,4.26,11.36,28.4,6.39c24.14-4.97,57.5,7.81,52.53,26.27-4.97,18.46-28.4,53.24-72.41,56.79s-56.79-29.82-56.79-29.82c0,0,11.36,44.72-38.33,53.95s-51.11-2.84-68.15-25.56c0,0,2.84,53.24-54.66,74.54-57.5,21.3-137.01,9.23-154.76-35.49s-14.2-43.3-14.2-43.3c0,0,4.26,30.53-44.01,30.53S4.9,238.08.64,215.36Z" />
                <path className="hero_cloud-1" d="M560.57,188.27c-4.97,18.46-28.4,53.24-72.41,56.79s-56.79-29.82-56.79-29.82c0,0,11.36,44.72-38.33,53.95s-51.11-2.84-68.15-25.56c0,0,2.84,53.24-54.66,74.54-57.5,21.3-137.01,9.23-154.76-35.49s-14.2-43.3-14.2-43.3c0,0,4.26,30.53-44.01,30.53S5.9,238.08,1.64,215.36c0,0,5.92,28.99,37.87,27.57,31.95-1.42,47.56-35.49,60.34-49.69,12.78-14.2,19.17-27.69,36.91-25.56,0,0-18.46,14.2-15.62,36.91s2.13,46.14,26.98,65.31,105.77,24.14,136.3-7.1,39.75-66.02,39.75-66.02c0,0-34.78-2.13-46.14-36.91,32.65,14.91,46.14,34.07,91.58,0-8.52,19.17-9.94,22.72-25.56,31.24,0,0,6.39,41.88,28.4,43.3,22.01,1.42,34.07-2.84,48.27-43.3,0,0-5.23-7.04-7.05-20.59,0,0,13.71,25.36,52.79,19.13,0,0-4.15,8.65-21.1,12.8,0,0,59.14,41.5,115.21-14.18" />
                <path className="hero_cloud-2" d="M560.74,184.84c-.71-19.1-28.4-31.24-52.53-26.27-24.14,4.97-24.85-2.84-28.4-6.39s-3.55-14.91-21.3-9.94-29.11,2.84-29.11,2.84c-1.42-11.36-13.49-18.46-27.69-16.33s-28.4,1.42-38.33-6.39c-9.94-7.81-12.07-13.49-23.43-16.33s-19.17-1.42-19.17-1.42C308.02,8.08,232.06-17.48,171.72,10.92s-76.67,129.91-76.67,129.91c-4.97-7.81-9.94-7.81-9.94-7.81-22.72-2.13-31.24,37.62-31.24,37.62,0,0-22.72-11.36-40.46-2.13C-4.33,177.74.64,212.53.64,212.53c0,0,4.26-36.91,58.21-33.36,0,0,11.36-25.56,24.14-28.4s14.2,3.55,14.2,3.55c0,0,23.43-102.22,99.38-115s106.48,68.15,106.48,68.15c0,0-29.11,19.88-64.6-17.75,0,0-7.1,35.49,26.27,46.85,25.56,6.39,51.11-15.62,68.86-14.91s18.46,14.91,26.27,18.46,21.3,11.36,48.98,5.68c5.68,10.65,10.65,19.88,28.4,14.91,17.75-4.97,26.27-5.68,29.82,0s1.42,12.78,24.85,15.62c23.43,2.84,47.56-4.97,50.4,3.55,2.84,8.52-4.26,22.72-13.49,27.69,0,0,32.65-3.55,31.95-22.72Z" />
                
            </svg>
        </div>
    );
};

export default SVG_Window;

