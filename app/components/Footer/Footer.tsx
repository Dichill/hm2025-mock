"use client";

import { motion } from "framer-motion";
import {
    github,
    instagram,
    lacc,
    laccd,
    MLH_Conduct,
    tiktok,
} from "@/lib/link_base";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: "Instagram",
            href: instagram,
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                </svg>
            ),
        },
        {
            name: "TikTok",
            href: tiktok,
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
            ),
        },
        {
            name: "GitHub",
            href: github,
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <footer className="relative bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1e] text-white overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600 rounded-full filter blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-4 gap-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    {/* Brand Section */}
                    <motion.div
                        className="md:col-span-2"
                        variants={itemVariants}
                    >
                        <motion.h3
                            className="text-3xl font-bold mb-4"
                            whileHover={{ scale: 1.05 }}
                            style={{
                                background:
                                    "linear-gradient(135deg, #FFE550 0%, #FF6B6B 50%, #8B5CF6 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            HACKMESA 2025
                        </motion.h3>
                        <p className="text-gray-400 mb-6 max-w-md">
                            Join us for an unforgettable 24-hour hackathon
                            experience. Build, learn, and innovate with the
                            LACCD community.
                        </p>

                        {/* Social Links */}
                        <div className="flex space-x-4">
                            {socialLinks.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={link.name}
                                >
                                    {link.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Section */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-lg font-semibold mb-4 text-[#FFE550]">
                            Contact Us
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <a
                                    href="mailto:calpitml@lacitycollege.edu"
                                    className="group"
                                >
                                    <p className="font-medium text-white group-hover:text-[#FFE550] transition-colors">
                                        Maria Calpito
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        LACC MESA Director
                                    </p>
                                    <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                                        calpitml@lacitycollege.edu
                                    </p>
                                </a>
                            </div>
                            <div>
                                <a
                                    href="mailto:team@hackmesa.com"
                                    className="group"
                                >
                                    <p className="font-medium text-white group-hover:text-[#FFE550] transition-colors">
                                        HackMESA Team
                                    </p>
                                    <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                                        team@hackmesa.com
                                    </p>
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants}>
                        <h4 className="text-lg font-semibold mb-4 text-[#FFE550]">
                            Quick Links
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href={MLH_Conduct}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2"
                                >
                                    <span className="text-xs">→</span>
                                    <span>MLH Code of Conduct</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={lacc}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2"
                                >
                                    <span className="text-xs">→</span>
                                    <span>LA City College</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={laccd}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2"
                                >
                                    <span className="text-xs">→</span>
                                    <span>LACCD</span>
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Divider */}
                <motion.div
                    className="mt-12 pt-8 border-t border-white/10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-gray-500">
                            © {currentYear} HACKMESA. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-6 text-sm">
                            <a
                                href="/privacy"
                                className="text-gray-500 hover:text-white transition-colors"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="/terms"
                                className="text-gray-500 hover:text-white transition-colors"
                            >
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Animated decoration */}
                <motion.div
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600"
                    animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        backgroundSize: "200% 100%",
                    }}
                />
            </div>
        </footer>
    );
};

export default Footer;
