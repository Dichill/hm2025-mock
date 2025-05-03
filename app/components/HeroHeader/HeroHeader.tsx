import React, { useState, useEffect, useCallback, memo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import SocialBrick from "../SocialBrick";

interface HeroHeaderProps {
    eventStartDate?: string;
    eventEndDate?: string;
    registrationDeadline?: string;
    applyUrl?: string;
}

interface Particle {
    id: number;
    left: string;
    top: string;
    duration: number;
    delay: number;
}

const optimizedTransition = {
    type: "tween",
    ease: "easeOut",
    duration: 0.5,
};

const MemoizedButton = memo(({ applyUrl }: { applyUrl: string }) => {
    const buttonVariants = {
        hover: {
            scale: 1.03,
            boxShadow: "0 10px 25px rgba(255, 137, 62, 0.2)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
        tap: { scale: 0.97 },
    };

    return (
        <Link href={applyUrl}>
            <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="cursor-pointer px-8 py-3 bg-[rgb(var(--mesa-orange))] hover:bg-[rgb(var(--mesa-orange))]/90 text-white font-bold rounded-md shadow-lg transition-colors duration-200 text-lg will-change-transform"
            >
                Apply Now
            </motion.button>
        </Link>
    );
});

MemoizedButton.displayName = "MemoizedButton";

const MemoizedBuzzwords = memo(() => {
    return (
        <ul id="hero_header_buzzwords" className="flex space-x-6 md:space-x-10">
            {["Innovate", "Create", "Inspire", "Connect"].map((word, index) => (
                <motion.li
                    key={word}
                    className="px-4 py-2 bg-white/10 backdrop-filter backdrop-blur-sm rounded-lg will-change-transform"
                    whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        delay: 0.3 + index * 0.1,
                        duration: 0.3,
                    }}
                >
                    {word}
                </motion.li>
            ))}
        </ul>
    );
});

MemoizedBuzzwords.displayName = "MemoizedBuzzwords";

function HeroHeader({
    eventStartDate = "May 9th",
    eventEndDate = "May 10th",
    registrationDeadline = "May 7th",
    applyUrl = "/dashboard",
}: HeroHeaderProps): React.ReactElement {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    const generateParticles = useCallback(() => {
        const newParticles = Array.from({ length: 8 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            duration: 4 + Math.random() * 4,
            delay: Math.random() * 3,
        }));

        setParticles(newParticles);
    }, []);

    useEffect(() => {
        setIsMounted(true);
        generateParticles();

        return () => {
            setParticles([]);
        };
    }, [generateParticles]);

    const backgroundShapes = [
        { top: "10%", left: "5%", size: "200px", delay: 0 },
        { bottom: "15%", right: "8%", size: "180px", delay: 0.2 },
    ];

    return (
        <div className="relative w-full text-white md:py-32 overflow-hidden contain-layout">
            <div className="absolute inset-0 opacity-10 contain-paint">
                <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-white blur-3xl"></div>

                {backgroundShapes.map((shape, index) => (
                    <motion.div
                        key={index}
                        className="absolute rounded-full bg-white blur-3xl will-change-transform"
                        style={{
                            top: shape.top,
                            left: shape.left,
                            right: shape.right,
                            bottom: shape.bottom,
                            width: shape.size,
                            height: shape.size,
                            contain: "layout paint style",
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: 0.1,
                            scale: 1,
                            rotate: 180,
                        }}
                        transition={{
                            delay: shape.delay,
                            duration: 20,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            {isMounted && (
                <div className="absolute inset-0 overflow-hidden contain-paint">
                    {particles.map((particle) => (
                        <motion.div
                            key={particle.id}
                            className="absolute w-2 h-2 rounded-full bg-[rgb(var(--mesa-yellow-116))] will-change-transform"
                            style={{
                                left: particle.left,
                                top: particle.top,
                                contain: "paint style",
                            }}
                            initial={{ opacity: 0.2, scale: 0 }}
                            animate={{
                                opacity: [0.2, 0.5, 0.2],
                                scale: [0, 1, 0],
                                y: [0, -20, 0],
                            }}
                            transition={{
                                duration: particle.duration,
                                repeat: Infinity,
                                delay: particle.delay,
                                ease: "linear",
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 contain-layout">
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        className="mb-4 w-20 h-20 rounded-full bg-gradient-to-r from-[rgb(var(--mesa-orange))] to-[rgb(var(--mesa-yellow-116))] will-change-transform"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.6,
                            type: "spring",
                            stiffness: 200,
                        }}
                    />

                    <motion.h1
                        className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-[rgb(var(--mesa-yellow-116))]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={optimizedTransition}
                    >
                        Join us!
                    </motion.h1>

                    <motion.p
                        className="mt-2 text-white/80 max-w-2xl mb-6 text-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...optimizedTransition, delay: 0.1 }}
                    >
                        LACCD’s First-Ever Hackathon — Open to All Students 18
                        and Over!
                    </motion.p>

                    <motion.div
                        className="text-xl md:text-2xl font-medium mb-8 bg-[rgba(43,36,77,0.7)] backdrop-filter backdrop-blur-sm p-6 rounded-lg border border-[rgba(255,255,255,0.1)] shadow-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...optimizedTransition, delay: 0.1 }}
                    >
                        <p className="mb-2 text-white font-bold">
                            {eventStartDate} - {eventEndDate}, 2025
                        </p>
                        <p className="text-[rgb(var(--mesa-yellow-116))] drop-shadow-md">
                            <span className="font-bold">
                                Registration Deadline:
                            </span>{" "}
                            {registrationDeadline}, 2025
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...optimizedTransition, delay: 0.15 }}
                        className="mb-10"
                    >
                        <MemoizedBuzzwords />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...optimizedTransition, delay: 0.2 }}
                    >
                        <MemoizedButton applyUrl={applyUrl} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...optimizedTransition, delay: 0.25 }}
                        className="mt-8"
                    >
                        <SocialBrick />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default memo(HeroHeader);
