"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
// import NewNavBar from "./components/NavBar/NewNavBar";
import Footer from "./components/Footer/Footer";
import Sponsors from "./components/Sponsors/Sponsors";
// Removed unused import
import "./animations.css";

export default function App() {
    const { scrollYProgress } = useScroll();
    const circuitRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    // Parallax effects for circuit background
    const circuitY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    useEffect(() => {
        // Mouse tracking for circuit glow effect
        const handleMouseMove = (e: MouseEvent) => {
            if (circuitRef.current) {
                const rect = circuitRef.current.getBoundingClientRect();
                setMousePosition({
                    x: ((e.clientX - rect.left) / rect.width) * 100,
                    y: ((e.clientY - rect.top) / rect.height) * 100,
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Handle keyboard navigation for modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImage === null) return;

            switch (e.key) {
                case "Escape":
                    setSelectedImage(null);
                    break;
                case "ArrowLeft":
                    e.preventDefault();
                    if (selectedImage > 0) {
                        setSelectedImage(selectedImage - 1);
                    }
                    break;
                case "ArrowRight":
                    e.preventDefault();
                    if (selectedImage < 15) {
                        setSelectedImage(selectedImage + 1);
                    }
                    break;
            }
        };

        if (selectedImage !== null) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [selectedImage]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    const letterAnimation = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.5,
                ease: "easeOut",
            },
        }),
    };

    return (
        <>
            {/* Circuit Background Effect */}
            <div
                ref={circuitRef}
                className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
            >
                {/* Mouse glow effect */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(107, 114, 128, 0.1) 0%, transparent 50%)`,
                    }}
                />

                {/* Circuit pattern */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        y: circuitY,
                    }}
                >
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <svg
                            className="absolute inset-0 w-full h-[200%]"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <pattern
                                    id="circuit-pattern"
                                    x="0"
                                    y="0"
                                    width="150"
                                    height="150"
                                    patternUnits="userSpaceOnUse"
                                >
                                    {/* Main circuit paths with elegant dark theme colors */}
                                    <path
                                        d="M 0 75 L 30 75 L 30 30 L 75 30 L 75 0"
                                        stroke="#4A5568"
                                        strokeWidth="1.5"
                                        fill="none"
                                        opacity="0.4"
                                    />
                                    <path
                                        d="M 75 150 L 75 120 L 120 120 L 120 75 L 150 75"
                                        stroke="#2D3748"
                                        strokeWidth="1.5"
                                        fill="none"
                                        opacity="0.4"
                                    />
                                    <path
                                        d="M 0 120 L 45 120 L 45 45 L 105 45 L 105 0"
                                        stroke="#1A202C"
                                        strokeWidth="1"
                                        fill="none"
                                        opacity="0.3"
                                    />

                                    {/* Additional connecting lines */}
                                    <line
                                        x1="30"
                                        y1="75"
                                        x2="30"
                                        y2="30"
                                        stroke="#4A5568"
                                        strokeWidth="1"
                                        opacity="0.3"
                                    />
                                    <line
                                        x1="75"
                                        y1="30"
                                        x2="120"
                                        y2="30"
                                        stroke="#4A5568"
                                        strokeWidth="1"
                                        opacity="0.3"
                                    />
                                    <line
                                        x1="120"
                                        y1="30"
                                        x2="120"
                                        y2="75"
                                        stroke="#2D3748"
                                        strokeWidth="1"
                                        opacity="0.3"
                                    />
                                    <line
                                        x1="0"
                                        y1="45"
                                        x2="45"
                                        y2="45"
                                        stroke="#1A202C"
                                        strokeWidth="0.5"
                                        opacity="0.2"
                                    />
                                    <line
                                        x1="105"
                                        y1="45"
                                        x2="150"
                                        y2="45"
                                        stroke="#1A202C"
                                        strokeWidth="0.5"
                                        opacity="0.2"
                                    />

                                    {/* Animated circuit nodes */}
                                    <circle
                                        cx="30"
                                        cy="75"
                                        r="4"
                                        fill="#6B7280"
                                    >
                                        <animate
                                            attributeName="r"
                                            values="5;8;5"
                                            dur="2s"
                                            repeatCount="indefinite"
                                        />
                                        <animate
                                            attributeName="opacity"
                                            values="0.8;1;0.8"
                                            dur="2s"
                                            repeatCount="indefinite"
                                        />
                                    </circle>
                                    <circle
                                        cx="30"
                                        cy="30"
                                        r="3"
                                        fill="#6B7280"
                                        opacity="0.6"
                                    />
                                    <circle
                                        cx="75"
                                        cy="30"
                                        r="3"
                                        fill="#6B7280"
                                        opacity="0.6"
                                    />
                                    <circle
                                        cx="75"
                                        cy="75"
                                        r="5"
                                        fill="#4A5568"
                                    >
                                        <animate
                                            attributeName="opacity"
                                            values="0.7;1;0.7"
                                            dur="1.5s"
                                            repeatCount="indefinite"
                                        />
                                    </circle>
                                    <circle
                                        cx="120"
                                        cy="120"
                                        r="3"
                                        fill="#4A5568"
                                        opacity="0.6"
                                    />
                                    <circle
                                        cx="120"
                                        cy="75"
                                        r="3"
                                        fill="#2D3748"
                                        opacity="0.6"
                                    />
                                    <circle
                                        cx="45"
                                        cy="45"
                                        r="4"
                                        fill="#374151"
                                    >
                                        <animate
                                            attributeName="r"
                                            values="5;8;5"
                                            dur="2.5s"
                                            repeatCount="indefinite"
                                        />
                                        <animate
                                            attributeName="opacity"
                                            values="0.7;1;0.7"
                                            dur="2.5s"
                                            repeatCount="indefinite"
                                        />
                                    </circle>
                                    <circle
                                        cx="105"
                                        cy="45"
                                        r="3"
                                        fill="#374151"
                                        opacity="0.5"
                                    />

                                    {/* Data flow dots - subtle accent colors */}
                                    <circle r="2" fill="#9CA3AF">
                                        <animateMotion
                                            dur="4s"
                                            repeatCount="indefinite"
                                            path="M 0 75 L 30 75 L 30 30 L 75 30"
                                        />
                                        <animate
                                            attributeName="opacity"
                                            values="0;0.8;0.8;0"
                                            dur="4s"
                                            repeatCount="indefinite"
                                        />
                                    </circle>
                                    <circle r="2" fill="#6B7280">
                                        <animateMotion
                                            dur="4.5s"
                                            repeatCount="indefinite"
                                            path="M 75 150 L 75 120 L 120 120 L 120 75"
                                        />
                                        <animate
                                            attributeName="opacity"
                                            values="0;0.7;0.7;0"
                                            dur="4.5s"
                                            repeatCount="indefinite"
                                        />
                                    </circle>
                                    <circle r="2" fill="#4B5563">
                                        <animateMotion
                                            dur="5s"
                                            repeatCount="indefinite"
                                            path="M 0 120 L 45 120 L 45 45 L 105 45"
                                        />
                                        <animate
                                            attributeName="opacity"
                                            values="0;0.6;0.6;0"
                                            dur="5s"
                                            repeatCount="indefinite"
                                        />
                                    </circle>
                                </pattern>
                            </defs>
                            <rect
                                width="100%"
                                height="100%"
                                fill="url(#circuit-pattern)"
                            />
                        </svg>
                    </motion.div>
                </motion.div>
            </div>

            {/* Navigation Bar */}
            {/* <div className="fixed w-[85%] top-0 md:left-1/2 md:-translate-x-1/2 left-4 z-50 flex justify-center items-center mt-5">
                    <div className="w-full mx-auto px-4">
                        <NewNavBar />
                    </div>
                    </div> */}

            {/* Main Content */}
            <div className="relative z-10 bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1e] to-[#1a1a2e]">
                {/* Hero Section - HACKMESA 2 Coming Soon */}
                <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#1a1a2e]/80 to-[#0f0f1e]/80">
                    <motion.div
                        className="text-center z-20"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <div className="mb-8">
                            {"HACKMESA 2".split("").map((letter, index) => (
                                <motion.span
                                    key={index}
                                    custom={index}
                                    initial="hidden"
                                    animate="visible"
                                    variants={letterAnimation}
                                    className="inline-block text-6xl md:text-8xl lg:text-9xl font-extrabold"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #FFE550 0%, #FF6B6B 50%, #8B5CF6 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        textShadow:
                                            "0 0 40px rgba(255, 229, 80, 0.3)",
                                    }}
                                >
                                    {letter === " " ? "\u00A0" : letter}
                                </motion.span>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="bg-gradient-to-b from-[#1a1a2e]/90 to-[#0f0f1e]/90 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/10"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                                COMING SOON
                            </h2>
                            <div className="flex justify-center gap-2">
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-3 h-3 bg-yellow-400 rounded-full"
                                        animate={{
                                            y: [0, -15, 0],
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            delay: i * 0.2,
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            className="mt-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                        >
                            <svg
                                className="w-12 h-12 mx-auto text-white animate-bounce"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                />
                            </svg>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Section 2: What is HACKMESA */}
                <section className="min-h-screen py-20 px-6 relative bg-gradient-to-b from-[#0f0f1e]/70 to-[#1a1a2e]/70 overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600 rounded-full filter blur-3xl" />
                    </div>
                    <motion.div
                        className="max-w-7xl mx-auto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={containerVariants}
                    >
                        <motion.div
                            variants={itemVariants}
                            className="text-center mb-16 relative z-10"
                        >
                            <h2
                                className="text-5xl md:text-6xl font-bold mb-4"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #FFE550 0%, #FF6B6B 50%, #8B5CF6 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                What is HACKMESA?
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-12 mb-16">
                            <motion.div
                                variants={itemVariants}
                                className="bg-gradient-to-b from-[#1a1a2e]/90 to-[#0f0f1e]/90 backdrop-blur-md rounded-2xl p-8 border border-white/10 relative z-10"
                            >
                                <h3
                                    className="text-3xl font-bold mb-4"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #FFE550 0%, #FF6B6B 50%, #8B5CF6 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    About HACKMESA
                                </h3>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    HACKMESA is Los Angeles City College&apos;s
                                    premier hackathon event, bringing together
                                    students from across the LACCD to innovate,
                                    collaborate, and create amazing projects in
                                    just 24 hours. It&apos;s a celebration of
                                    creativity, technology, and community.
                                </p>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="bg-gradient-to-b from-[#1a1a2e]/90 to-[#0f0f1e]/90 backdrop-blur-md rounded-2xl p-8 border border-white/10 relative z-10"
                            >
                                <h3
                                    className="text-3xl font-bold mb-4"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #FFE550 0%, #FF6B6B 50%, #8B5CF6 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    What&apos;s a Hackathon?
                                </h3>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    A hackathon is an intensive event where
                                    programmers, designers, and innovators come
                                    together to build projects from scratch.
                                    You&apos;ll learn new skills, meet amazing
                                    people, enjoy free food, and compete for
                                    prizes while pushing your creative limits!
                                </p>
                            </motion.div>
                        </div>

                        {/* Event Images */}
                        <motion.div
                            variants={itemVariants}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                            {[1, 2, 3].map((index) => (
                                <div
                                    key={index}
                                    className="relative h-64 rounded-xl overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-80" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <p className="text-white text-xl font-semibold">
                                            Event Photo {index}
                                        </p>
                                    </div>
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300" />
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </section>

                {/* Section 3: Sponsors */}
                <section className="min-h-screen py-20 px-6 relative bg-gradient-to-b from-[#1a1a2e]/80 to-[#0f0f1e]/80 overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl" />
                    </div>
                    <motion.div
                        className="max-w-7xl mx-auto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={containerVariants}
                    >
                        <motion.div
                            variants={itemVariants}
                            className="text-center mb-16 relative z-10"
                        >
                            <h2
                                className="text-5xl md:text-6xl font-bold mb-4"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #FFE550 0%, #FF6B6B 50%, #8B5CF6 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                Our Sponsors
                            </h2>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Sponsors />
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="text-center mt-12 bg-gradient-to-b from-[#1a1a2e]/90 to-[#0f0f1e]/90 backdrop-blur-md rounded-2xl p-8 border border-white/10 relative z-10"
                        >
                            <p className="text-gray-400 text-xl mb-6">
                                Interested in sponsoring HACKMESA 2?
                            </p>
                            <a
                                href="mailto:team@hackmesa.com"
                                className="inline-block bg-gradient-to-r from-[#FFE550] to-[#FFB607] text-black font-bold py-4 px-8 rounded-full hover:from-[#FFB607] hover:to-[#FF8C00] transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Become a Sponsor
                            </a>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Section 4: Top 3 Winners */}
                <section className="min-h-screen py-20 px-6 relative bg-gradient-to-b from-[#1a1a2e]/75 to-[#0f0f1e]/75 overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600 rounded-full filter blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl" />
                    </div>
                    <motion.div
                        className="max-w-7xl mx-auto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={containerVariants}
                    >
                        <motion.div
                            variants={itemVariants}
                            className="text-center mb-16 relative z-10"
                        >
                            <h2
                                className="text-5xl md:text-6xl font-bold mb-4"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #FFE550 0%, #FF6B6B 50%, #8B5CF6 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                HACKMESA Champions
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* 2nd Place */}
                            <motion.div
                                variants={itemVariants}
                                className="md:mt-12"
                            >
                                <div className="relative">
                                    <div className="bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300">
                                        <div className="text-center">
                                            <div className="text-6xl mb-4">
                                                🥈
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                                2nd Place
                                            </h3>
                                            <p className="text-xl font-semibold text-gray-700 mb-2">
                                                Noobs
                                            </p>
                                            <p className="text-gray-600 mb-4">
                                                Livi
                                            </p>
                                            <div className="bg-white/50 rounded-lg py-2 px-4">
                                                <p className="text-2xl font-bold text-gray-800">
                                                    $1,000
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* 1st Place */}
                            <motion.div variants={itemVariants}>
                                <div className="relative">
                                    <motion.div
                                        className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur-xl opacity-75"
                                        animate={{
                                            opacity: [0.5, 0.8, 0.5],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                        }}
                                    />
                                    <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300">
                                        <div className="text-center">
                                            <div className="text-7xl mb-4">
                                                🏆
                                            </div>
                                            <h3 className="text-3xl font-bold text-white mb-2">
                                                1st Place
                                            </h3>
                                            <p className="text-2xl font-semibold text-white mb-2">
                                                Hack Pierce
                                            </p>
                                            <p className="text-white/90 mb-4">
                                                Startumn.tech
                                            </p>
                                            <div className="bg-white/20 backdrop-blur rounded-lg py-3 px-4">
                                                <p className="text-3xl font-bold text-white">
                                                    $1,500
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* 3rd Place */}
                            <motion.div
                                variants={itemVariants}
                                className="md:mt-12"
                            >
                                <div className="relative">
                                    <div className="bg-gradient-to-br from-orange-700 to-orange-800 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300">
                                        <div className="text-center">
                                            <div className="text-6xl mb-4">
                                                🥉
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">
                                                3rd Place
                                            </h3>
                                            <p className="text-xl font-semibold text-white mb-2">
                                                Web Nerds
                                            </p>
                                            <p className="text-white/90 mb-4">
                                                Fitrise
                                            </p>
                                            <div className="bg-white/20 backdrop-blur rounded-lg py-2 px-4">
                                                <p className="text-2xl font-bold text-white">
                                                    $500
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </section>

                {/* Section 5: Photo Grid */}
                <section className="min-h-screen py-20 px-6 relative bg-gradient-to-b from-[#0f0f1e]/75 to-[#1a1a2e]/80 overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600 rounded-full filter blur-3xl" />
                    </div>
                    <motion.div
                        className="max-w-7xl mx-auto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={containerVariants}
                    >
                        <motion.div
                            variants={itemVariants}
                            className="text-center mb-16 relative z-10"
                        >
                            <h2
                                className="text-5xl md:text-6xl font-bold mb-4"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #FFE550 0%, #FF6B6B 50%, #8B5CF6 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                Memories from HACKMESA
                            </h2>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                        >
                            {[...Array(16)].map((_, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                                    onClick={() => setSelectedImage(index)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-80" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <p className="text-white text-sm font-medium">
                                            Photo {index + 1}
                                        </p>
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />

                                    {/* Click indicator */}
                                    <div className="absolute top-2 right-2 bg-black/60 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <svg
                                            className="w-4 h-4 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                            />
                                        </svg>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="text-center mt-12 bg-gradient-to-b from-[#1a1a2e]/90 to-[#0f0f1e]/90 backdrop-blur-md rounded-2xl p-6 border border-white/10 relative z-10"
                        >
                            <p className="text-gray-400 text-xl">
                                Stay tuned for more updates and announcements!
                            </p>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Section 6: Join Our Team */}
                <section className="min-h-screen py-20 px-6 relative bg-gradient-to-b from-[#1a1a2e]/80 to-[#0f0f1e]/85 overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl" />
                    </div>
                    <motion.div
                        className="max-w-7xl mx-auto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={containerVariants}
                    >
                        <motion.div
                            variants={itemVariants}
                            className="text-center mb-16 relative z-10"
                        >
                            <h2
                                className="text-5xl md:text-6xl font-bold mb-4"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #FFE550 0%, #FF6B6B 50%, #8B5CF6 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                Join Our Team
                            </h2>
                            <motion.p
                                variants={itemVariants}
                                className="text-xl text-gray-400 max-w-3xl mx-auto"
                            >
                                Want to be part of making HACKMESA 2025 amazing?
                                We&apos;re looking for passionate students to
                                help organize and run this incredible event!
                            </motion.p>
                        </motion.div>

                        {/* Volunteer Roles Grid */}
                        <motion.div
                            variants={containerVariants}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
                        >
                            {/* Event Operations */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-gradient-to-b from-[#1a1a2e]/90 to-[#0f0f1e]/90 backdrop-blur-md rounded-2xl p-8 border border-white/10 relative z-10 hover:scale-105 transition-all duration-300"
                            >
                                <div className="text-4xl mb-4 text-center">
                                    🎯
                                </div>
                                <h3
                                    className="text-2xl font-bold mb-4 text-center"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #FFE550 0%, #FF6B6B 50%, #8B5CF6 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    Event Operations
                                </h3>
                                <ul className="text-gray-400 space-y-2 text-center">
                                    <li>• Registration & Check-in</li>
                                    <li>• Logistics Coordination</li>
                                    <li>• Venue Management</li>
                                    <li>• Equipment Setup</li>
                                </ul>
                            </motion.div>

                            {/* Technical Support */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-gradient-to-b from-[#1a1a2e]/90 to-[#0f0f1e]/90 backdrop-blur-md rounded-2xl p-8 border border-white/10 relative z-10 hover:scale-105 transition-all duration-300"
                            >
                                <div className="text-4xl mb-4 text-center">
                                    💻
                                </div>
                                <h3
                                    className="text-2xl font-bold mb-4 text-center"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #FFE550 0%, #FF6B6B 50%, #8B5CF6 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    Technical Support
                                </h3>
                                <ul className="text-gray-400 space-y-2 text-center">
                                    <li>• Help Desk Support</li>
                                    <li>• Network & WiFi Setup</li>
                                    <li>• Troubleshooting</li>
                                    <li>• Platform Management</li>
                                </ul>
                            </motion.div>

                            {/* Community & Engagement */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-gradient-to-b from-[#1a1a2e]/90 to-[#0f0f1e]/90 backdrop-blur-md rounded-2xl p-8 border border-white/10 relative z-10 hover:scale-105 transition-all duration-300"
                            >
                                <div className="text-4xl mb-4 text-center">
                                    🎉
                                </div>
                                <h3
                                    className="text-2xl font-bold mb-4 text-center"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #FFE550 0%, #FF6B6B 50%, #8B5CF6 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    Community & Engagement
                                </h3>
                                <ul className="text-gray-400 space-y-2 text-center">
                                    <li>• Social Media Management</li>
                                    <li>• Photography & Video</li>
                                    <li>• Participant Engagement</li>
                                    <li>• Workshop Assistance</li>
                                </ul>
                            </motion.div>

                            {/* Mentorship */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-gradient-to-b from-[#1a1a2e]/90 to-[#0f0f1e]/90 backdrop-blur-md rounded-2xl p-8 border border-white/10 relative z-10 hover:scale-105 transition-all duration-300"
                            >
                                <div className="text-4xl mb-4 text-center">
                                    🧑‍🏫
                                </div>
                                <h3
                                    className="text-2xl font-bold mb-4 text-center"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #FFE550 0%, #FF6B6B 50%, #8B5CF6 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    Mentorship
                                </h3>
                                <ul className="text-gray-400 space-y-2 text-center">
                                    <li>• Guide Participants</li>
                                    <li>• Technical Assistance</li>
                                    <li>• Project Feedback</li>
                                    <li>• Career Advice</li>
                                </ul>
                            </motion.div>

                            {/* Food & Hospitality */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-gradient-to-b from-[#1a1a2e]/90 to-[#0f0f1e]/90 backdrop-blur-md rounded-2xl p-8 border border-white/10 relative z-10 hover:scale-105 transition-all duration-300"
                            >
                                <div className="text-4xl mb-4 text-center">
                                    🍕
                                </div>
                                <h3
                                    className="text-2xl font-bold mb-4 text-center"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #FFE550 0%, #FF6B6B 50%, #8B5CF6 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    Food & Hospitality
                                </h3>
                                <ul className="text-gray-400 space-y-2 text-center">
                                    <li>• Meal Coordination</li>
                                    <li>• Snack Distribution</li>
                                    <li>• Dietary Accommodations</li>
                                    <li>• Hospitality Services</li>
                                </ul>
                            </motion.div>

                            {/* Judging Support */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-gradient-to-b from-[#1a1a2e]/90 to-[#0f0f1e]/90 backdrop-blur-md rounded-2xl p-8 border border-white/10 relative z-10 hover:scale-105 transition-all duration-300"
                            >
                                <div className="text-4xl mb-4 text-center">
                                    ⚖️
                                </div>
                                <h3
                                    className="text-2xl font-bold mb-4 text-center"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #FFE550 0%, #FF6B6B 50%, #8B5CF6 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    Judging Support
                                </h3>
                                <ul className="text-gray-400 space-y-2 text-center">
                                    <li>• Demo Coordination</li>
                                    <li>• Scoring Assistance</li>
                                    <li>• Judge Liaison</li>
                                    <li>• Awards Ceremony</li>
                                </ul>
                            </motion.div>
                        </motion.div>

                        {/* Benefits Section */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-gradient-to-b from-[#1a1a2e]/90 to-[#0f0f1e]/90 backdrop-blur-md rounded-2xl p-8 border border-white/10 relative z-10 mb-12"
                        >
                            <h3
                                className="text-3xl font-bold mb-6 text-center"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #FFE550 0%, #FF6B6B 50%, #8B5CF6 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                Why Join Our Team?
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl mb-2">🎓</div>
                                    <p className="text-gray-400 font-medium">
                                        Leadership Experience
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl mb-2">🤝</div>
                                    <p className="text-gray-400 font-medium">
                                        Networking Opportunities
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl mb-2">📜</div>
                                    <p className="text-gray-400 font-medium">
                                        Certificate of Recognition
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl mb-2">🍕</div>
                                    <p className="text-gray-400 font-medium">
                                        Free Meals & Swag
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Call to Action */}
                        <motion.div
                            variants={itemVariants}
                            className="text-center relative z-10"
                        >
                            <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
                                Ready to make a difference and gain valuable
                                experience? Join our team and help create an
                                unforgettable hackathon experience!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="mailto:team@hackmesa.com?subject=Volunteer Application - HACKMESA 2025"
                                    className="inline-block bg-gradient-to-r from-[#FFE550] to-[#FFB607] text-black font-bold py-4 px-8 rounded-full hover:from-[#FFB607] hover:to-[#FF8C00] transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    Apply to Volunteer
                                </a>
                                <a
                                    href="mailto:team@hackmesa.com?subject=Questions about Volunteering - HACKMESA 2025"
                                    className="inline-block bg-transparent border-2 border-white/20 text-white font-bold py-4 px-8 rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                                >
                                    Ask Questions
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Footer */}
                <Footer />
            </div>

            {/* Image Modal */}
            {selectedImage !== null && (
                <motion.div
                    className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedImage(null)}
                >
                    <motion.div
                        className="relative max-w-4xl max-h-[90vh] w-full h-full"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 rounded-full p-3 transition-colors duration-200"
                        >
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        {/* Navigation buttons */}
                        {selectedImage > 0 && (
                            <button
                                onClick={() =>
                                    setSelectedImage(selectedImage - 1)
                                }
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-3 transition-colors duration-200"
                            >
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>
                        )}

                        {selectedImage < 15 && (
                            <button
                                onClick={() =>
                                    setSelectedImage(selectedImage + 1)
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-3 transition-colors duration-200"
                            >
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        )}

                        {/* Image container */}
                        <div className="w-full h-full bg-gradient-to-b from-[#1a1a2e]/90 to-[#0f0f1e]/90 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center">
                            {/* Placeholder for actual image */}
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-8xl mb-4">📸</div>
                                    <h3
                                        className="text-4xl font-bold mb-2"
                                        style={{
                                            background:
                                                "linear-gradient(135deg, #FFE550 0%, #FF6B6B 50%, #8B5CF6 100%)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                        }}
                                    >
                                        Photo {selectedImage + 1}
                                    </h3>
                                    <p className="text-gray-400 text-xl">
                                        HACKMESA Event Memory
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Image info */}
                        <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-white font-semibold">
                                        Photo {selectedImage + 1} of 16
                                    </p>
                                    <p className="text-gray-300 text-sm">
                                        HACKMESA Event Gallery
                                    </p>
                                </div>
                                <div className="text-gray-400 text-sm">
                                    Press ESC to close • Use arrow keys to
                                    navigate
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
}
