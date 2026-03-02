"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import supabase from "@/lib/supabase/supabase-client";
import Link from "next/link";
import { USE_DEMO_DATA } from "@/core/mock/demo-mode";

type ForgotPasswordStatus = "idle" | "submitting" | "success" | "error";

export function ForgotPasswordForm() {
    const [email, setEmail] = useState<string>("");
    const [status, setStatus] = useState<ForgotPasswordStatus>("idle");
    const [error, setError] = useState<string | null>(null);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleForgotPassword = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setStatus("submitting");
        setError(null);

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            setStatus("error");
            return;
        }

        try {
            if (USE_DEMO_DATA) {
                await new Promise((resolve) => setTimeout(resolve, 500));
                setStatus("success");
                return;
            }

            const redirectTo = `${window.location.origin}/reset-password`;

            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: redirectTo,
            });

            if (error) {
                throw error;
            }

            setStatus("success");
        } catch (err) {
            setStatus("error");
            setError(
                err instanceof Error
                    ? err.message
                    : "An error occurred. Please try again later."
            );
        }
    };

    const formVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 1.2,
            },
        },
    };

    const formItemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
            },
        },
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: 0.3,
            },
        },
        hover: {
            scale: 1.03,
            boxShadow: "0 10px 25px rgba(255, 69, 57, 0.2)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
        tap: {
            scale: 0.97,
        },
    };

    if (status === "success") {
        return (
            <>
                <motion.div
                    className="bg-green-50 border-l-4 border-green-500 p-4 rounded"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.p className="text-green-700 font-medium">
                        Password reset email sent!
                    </motion.p>
                    <motion.p className="text-green-600 mt-1">
                        Check your email for a link to reset your password. If
                        it doesn&apos;t appear within a few minutes, check your
                        spam folder.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="text-center mt-6"
                    variants={formItemVariants}
                >
                    <Link
                        href="/login"
                        className="text-sm text-[rgb(var(--mesa-grey))] hover:text-[rgb(var(--mesa-warm-red))] transition-colors"
                    >
                        Return to Login
                    </Link>
                </motion.div>
            </>
        );
    }

    return (
        <motion.form
            onSubmit={handleForgotPassword}
            className="space-y-5"
            initial="hidden"
            animate="visible"
            variants={formVariants}
        >
            <motion.div className="space-y-1" variants={formItemVariants}>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[rgb(var(--mesa-grey))]"
                >
                    Email Address
                </label>
                <motion.input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${
                        error
                            ? "border-[rgb(var(--mesa-warm-red))] ring-[rgb(var(--mesa-warm-red))]/20"
                            : "border-gray-300 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
                    }`}
                    placeholder="example@college.laccd.edu"
                    whileFocus={{ scale: 1.01 }}
                />
                <motion.p
                    className="text-xs text-[rgb(var(--mesa-grey))] mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    Enter your registered LACCD email address
                </motion.p>
            </motion.div>

            {error && (
                <motion.div
                    className="bg-[rgb(var(--mesa-warm-red))]/10 border-l-4 border-[rgb(var(--mesa-warm-red))] text-[rgb(var(--mesa-warm-red))] p-4 rounded shadow-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                    }}
                >
                    {error}
                </motion.div>
            )}

            <motion.button
                type="submit"
                disabled={status === "submitting"}
                className={`w-full py-3 px-4 bg-[rgb(var(--mesa-warm-red))] hover:bg-[rgb(var(--mesa-warm-red))]/90 text-white rounded-md focus:outline-none focus:ring-3 focus:ring-[rgb(var(--mesa-warm-red))]/50 shadow-md hover:shadow-lg transition-all duration-200 ${
                    status === "submitting"
                        ? "opacity-70 cursor-not-allowed"
                        : ""
                }`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
            >
                {status === "submitting" ? (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        Sending Reset Link...
                    </motion.span>
                ) : (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        Send Reset Link
                    </motion.span>
                )}
            </motion.button>

            <motion.div
                className="text-center mt-6"
                variants={formItemVariants}
            >
                <Link
                    href="/login"
                    className="text-sm text-[rgb(var(--mesa-grey))] hover:text-[rgb(var(--mesa-warm-red))] transition-colors"
                >
                    Return to Login
                </Link>
            </motion.div>
        </motion.form>
    );
}
