import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { User, UserProfile } from "@/app/dashboard/types";
import { useState } from "react";

interface DashboardNavBarProps {
    user: User | null;
    userProfile: UserProfile | null;
    onSignOut: () => Promise<void>;
}

export default function DashboardNavBar({
    user,
    userProfile,
    onSignOut,
}: DashboardNavBarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Animation variants
    const buttonVariants = {
        hover: {
            scale: 1.03,
            boxShadow: "0 8px 15px rgba(255, 137, 62, 0.2)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
        tap: { scale: 0.97 },
    };

    // Mobile menu animation variants
    const menuVariants = {
        closed: { opacity: 0, y: -20, display: "none" },
        open: { opacity: 1, y: 0, display: "block" },
    };

    return (
        <motion.nav
            className="bg-white shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo and dashboard label */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Image
                                    src="/hackMESA_logo_1.png"
                                    alt="HackMESA Logo"
                                    width={40}
                                    height={40}
                                    className="mr-2"
                                />
                            </motion.div>
                            <div>
                                <h1 className="text-2xl font-bold text-[rgb(var(--mesa-warm-red))]">
                                    HackMESA
                                </h1>
                                <span className="text-sm text-gray-500">
                                    Dashboard
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            href="/dashboard"
                            className="text-[rgb(var(--mesa-grey))] hover:text-[rgb(var(--mesa-orange))] transition-colors duration-200"
                        >
                            Home
                        </Link>
                        <Link
                            href="/dashboard/apply"
                            className="text-[rgb(var(--mesa-grey))] hover:text-[rgb(var(--mesa-orange))] transition-colors duration-200"
                        >
                            Apply
                        </Link>
                        <Link
                            href="/dashboard/resources"
                            className="text-[rgb(var(--mesa-grey))] hover:text-[rgb(var(--mesa-orange))] transition-colors duration-200"
                        >
                            Resources
                        </Link>

                        {/* User info and sign out button */}
                        <div className="flex items-center ml-6 pl-6 border-l border-gray-200">
                            <div className="text-right mr-4">
                                <p className="text-sm text-gray-500">
                                    Welcome,
                                </p>
                                <p className="font-medium">
                                    {user?.email ||
                                        userProfile?.full_name ||
                                        "User"}
                                </p>
                            </div>
                            <motion.button
                                whileHover="hover"
                                whileTap="tap"
                                variants={buttonVariants}
                                onClick={onSignOut}
                                className="px-4 py-2 bg-[rgb(var(--mesa-warm-red))] text-white rounded-md shadow-sm text-sm font-medium"
                            >
                                Sign Out
                            </motion.button>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <div className="flex items-center space-x-3 mr-4">
                            <div className="text-right">
                                <p className="text-xs text-gray-500">
                                    Welcome,
                                </p>
                                <p className="font-medium text-sm truncate max-w-[100px]">
                                    {user?.email?.split("@")[0] ||
                                        userProfile?.full_name?.split(" ")[0] ||
                                        "User"}
                                </p>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 focus:outline-none"
                        >
                            {isMenuOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <motion.div
                initial="closed"
                animate={isMenuOpen ? "open" : "closed"}
                variants={menuVariants}
                transition={{ duration: 0.2 }}
                className="md:hidden"
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
                    <Link
                        href="/dashboard"
                        className="block px-3 py-2 rounded-md text-base font-medium text-[rgb(var(--mesa-grey))] hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/dashboard/apply"
                        className="block px-3 py-2 rounded-md text-base font-medium text-[rgb(var(--mesa-grey))] hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Apply
                    </Link>
                    <Link
                        href="/dashboard/resources"
                        className="block px-3 py-2 rounded-md text-base font-medium text-[rgb(var(--mesa-grey))] hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Resources
                    </Link>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        <motion.button
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonVariants}
                            onClick={() => {
                                setIsMenuOpen(false);
                                onSignOut();
                            }}
                            className="w-full px-3 py-2 bg-[rgb(var(--mesa-warm-red))] text-white rounded-md shadow-sm text-base font-medium"
                        >
                            Sign Out
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </motion.nav>
    );
}
