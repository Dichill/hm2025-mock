import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { User } from "@/app/dashboard/types";
import { useEffect, useState } from "react";

interface DashboardNavBarProps {
    user: User | null;
    onSignOut: () => Promise<void>;
    userRoles: string[];
}

export default function DashboardNavBar({
    user,
    onSignOut,
    userRoles,
}: DashboardNavBarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        console.log(user);
    }, [user]);

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

    const menuVariants = {
        closed: { opacity: 0, y: -20, display: "none" },
        open: { opacity: 1, y: 0, display: "block" },
    };

    const renderNavigationLinks = () => {
        console.log(userRoles);
        if (userRoles.includes("HACKER")) {
            return (
                <>
                    <Link
                        href="/dashboard/events"
                        className="text-[rgb(var(--mesa-grey))] hover:text-[rgb(var(--mesa-orange))] transition-colors duration-200"
                    >
                        Events
                    </Link>
                    <Link
                        href="/dashboard/teams"
                        className="text-[rgb(var(--mesa-grey))] hover:text-[rgb(var(--mesa-orange))] transition-colors duration-200"
                    >
                        Teams
                    </Link>
                    <Link
                        href="/dashboard/profile"
                        className="text-[rgb(var(--mesa-grey))] hover:text-[rgb(var(--mesa-orange))] transition-colors duration-200"
                    >
                        Profile
                    </Link>
                </>
            );
        }

        return (
            <>
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
            </>
        );
    };

    const renderMobileNavigationLinks = () => {
        if (userRoles.includes("HACKER")) {
            return (
                <>
                    <Link
                        href="/dashboard/events"
                        className="block px-3 py-2 rounded-md text-base font-medium text-[rgb(var(--mesa-grey))] hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Events
                    </Link>
                    <Link
                        href="/dashboard/teams"
                        className="block px-3 py-2 rounded-md text-base font-medium text-[rgb(var(--mesa-grey))] hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Teams
                    </Link>
                    <Link
                        href="/dashboard/profile"
                        className="block px-3 py-2 rounded-md text-base font-medium text-[rgb(var(--mesa-grey))] hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Profile
                    </Link>
                </>
            );
        }

        return (
            <>
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
            </>
        );
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
                    <div className="flex items-center justify-center">
                        <Link href="/dashboard" className="flex items-center">
                            <motion.div
                                className="flex items-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="text-[rgb(var(--mesa-warm-red))] font-bold text-xl mb-1.5">
                                    HACK
                                </span>
                                <Image
                                    src="/MESA_logo.svg"
                                    alt="HackMESA Logo"
                                    width={80}
                                    height={80}
                                    className="mx-auto"
                                />
                            </motion.div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {renderNavigationLinks()}

                        {/* User info and sign out button */}
                        <div className="flex items-center ml-6 pl-6 border-l border-gray-200">
                            <div className="text-right mr-4">
                                <p className="text-sm text-gray-500">Welcome</p>
                                <p className="font-medium">
                                    {user?.user_metadata?.first_name
                                        ? user?.user_metadata?.first_name
                                        : user?.email?.split("@")[0]}
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
                                    {user?.user_metadata?.first_name}
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
                    {renderMobileNavigationLinks()}
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
