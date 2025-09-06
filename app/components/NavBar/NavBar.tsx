"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();

    // Track scroll position for navbar styling
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Track active section
            const sections = ["about", "location", "sponsors", "faq", "team"];
            const currentPos = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(`section-${section}`);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (
                        currentPos >= offsetTop &&
                        currentPos < offsetTop + offsetHeight
                    ) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { label: "About", href: "#section-about" },
        { label: "Location", href: "#section-location" },
        { label: "Sponsors", href: "#section-sponsors" },
        { label: "Tracks", href: "#section-tracks" },
        { label: "FAQ", href: "#section-faq" },
        { label: "Team", href: "#section-team" },
    ];

    const handleNavClick = (href: string) => {
        setIsOpen(false);
        const targetId = href.replace("#", "");
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            {/* Desktop Navigation */}
            <motion.nav
                className={`hidden md:flex w-full items-center justify-between px-8 py-4 rounded-2xl backdrop-blur-md transition-all duration-300 ${
                    scrolled ? "bg-white/95 shadow-xl" : "bg-white/80 shadow-lg"
                }`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Logo */}
                <div className="flex items-center space-x-4">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="cursor-pointer"
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                    >
                        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            HACKMESA
                        </h1>
                    </motion.div>
                </div>

                {/* Nav Items */}
                <div className="flex items-center space-x-2">
                    {navItems.map((item) => {
                        const isActive =
                            activeSection === item.label.toLowerCase();
                        return (
                            <motion.a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(item.href);
                                }}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                    isActive
                                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {item.label}
                            </motion.a>
                        );
                    })}
                </div>

                {/* CTA Button */}
                <motion.button
                    className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 30px rgba(147, 51, 234, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push("/dashboard")}
                >
                    Apply Now
                </motion.button>
            </motion.nav>

            {/* Mobile Navigation */}
            <motion.nav
                className={`md:hidden flex w-full items-center justify-between px-6 py-4 rounded-2xl backdrop-blur-md transition-all duration-300 ${
                    scrolled ? "bg-white/95 shadow-xl" : "bg-white/80 shadow-lg"
                }`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer"
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                >
                    <h1 className="text-xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        HACKMESA
                    </h1>
                </motion.div>

                {/* Hamburger Menu */}
                <motion.button
                    className="relative w-8 h-8 flex flex-col items-center justify-center"
                    onClick={() => setIsOpen(!isOpen)}
                    whileTap={{ scale: 0.9 }}
                >
                    <motion.span
                        className="block w-6 h-0.5 bg-gray-800 absolute"
                        animate={{
                            rotate: isOpen ? 45 : 0,
                            y: isOpen ? 0 : -8,
                        }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.span
                        className="block w-6 h-0.5 bg-gray-800 absolute"
                        animate={{
                            opacity: isOpen ? 0 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.span
                        className="block w-6 h-0.5 bg-gray-800 absolute"
                        animate={{
                            rotate: isOpen ? -45 : 0,
                            y: isOpen ? 0 : 8,
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.button>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/50 z-40 md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            className="fixed right-0 top-0 h-full w-3/4 max-w-sm bg-white z-50 md:hidden"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 300,
                            }}
                        >
                            {/* Mobile Menu Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-gray-800">
                                    Menu
                                </h2>
                                <motion.button
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <svg
                                        className="w-5 h-5 text-gray-600"
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
                                </motion.button>
                            </div>

                            {/* Mobile Menu Items */}
                            <div className="p-6 space-y-4">
                                {navItems.map((item, index) => {
                                    const isActive =
                                        activeSection ===
                                        item.label.toLowerCase();
                                    return (
                                        <motion.a
                                            key={item.label}
                                            href={item.href}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleNavClick(item.href);
                                            }}
                                            className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                                                isActive
                                                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                                                    : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            {item.label}
                                        </motion.a>
                                    );
                                })}

                                {/* Mobile CTA Button */}
                                <motion.button
                                    className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full"
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setIsOpen(false);
                                        router.push("/dashboard");
                                    }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: navItems.length * 0.1,
                                    }}
                                >
                                    Apply Now
                                </motion.button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default NavBar;
