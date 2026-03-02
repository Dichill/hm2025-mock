"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import supabase from "@/lib/supabase/supabase-client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { USE_DEMO_DATA } from "@/core/mock/demo-mode";

type PasswordResetStatus = "idle" | "submitting" | "success" | "error";

function ResetPasswordFormContent() {
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [status, setStatus] = useState<PasswordResetStatus>("idle");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    const validatePasswords = (): boolean => {
        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            return false;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return false;
        }

        return true;
    };

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");
        setError(null);

        if (!validatePasswords()) {
            setStatus("error");
            return;
        }

        try {
            if (USE_DEMO_DATA) {
                await new Promise((resolve) => setTimeout(resolve, 500));
                setStatus("success");
                setTimeout(() => {
                    router.push("/login");
                }, 1000);
                return;
            }

            const token = searchParams.get("token");
            if (!token) {
                throw new Error("Password reset token is missing");
            }

            // First verify the recovery token
            const { error: verifyError } = await supabase.auth.verifyOtp({
                token_hash: token,
                type: "recovery",
            });

            if (verifyError) {
                throw verifyError;
            }

            // Then update the password
            const { error: updateError } = await supabase.auth.updateUser({
                password: password,
            });

            if (updateError) {
                throw updateError;
            }

            setStatus("success");
            setTimeout(() => {
                router.push("/login");
            }, 3000);
        } catch (err) {
            setStatus("error");
            setError(
                err instanceof Error
                    ? err.message
                    : "An error occurred. Please try again or request a new password reset link."
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
            <motion.div
                className="bg-green-50 border-l-4 border-green-500 p-4 rounded"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.p className="text-green-700 font-medium">
                    Password successfully reset!
                </motion.p>
                <motion.p className="text-green-600 mt-1">
                    Redirecting to login page...
                </motion.p>
            </motion.div>
        );
    }

    return (
        <motion.form
            onSubmit={handleResetPassword}
            className="space-y-5"
            initial="hidden"
            animate="visible"
            variants={formVariants}
        >
            <motion.div className="space-y-1" variants={formItemVariants}>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[rgb(var(--mesa-grey))]"
                >
                    New Password
                </label>
                <motion.input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${
                        error
                            ? "border-[rgb(var(--mesa-warm-red))] ring-[rgb(var(--mesa-warm-red))]/20"
                            : "border-gray-300 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
                    }`}
                    placeholder="Enter your new password"
                    whileFocus={{ scale: 1.01 }}
                />
                <motion.p className="text-xs text-[rgb(var(--mesa-grey))] mt-1">
                    Password must be at least 8 characters long
                </motion.p>
            </motion.div>

            <motion.div className="space-y-1" variants={formItemVariants}>
                <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-[rgb(var(--mesa-grey))]"
                >
                    Confirm Password
                </label>
                <motion.input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${
                        error
                            ? "border-[rgb(var(--mesa-warm-red))] ring-[rgb(var(--mesa-warm-red))]/20"
                            : "border-gray-300 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
                    }`}
                    placeholder="Confirm your new password"
                    whileFocus={{ scale: 1.01 }}
                />
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
                        Resetting Password...
                    </motion.span>
                ) : (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        Reset Password
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

export function ResetPasswordForm() {
    return (
        <Suspense
            fallback={
                <div className="h-32 w-full flex items-center justify-center">
                    <div className="rounded-full h-8 w-8 bg-[rgb(var(--mesa-warm-red))]/30 animate-ping"></div>
                </div>
            }
        >
            <ResetPasswordFormContent />
        </Suspense>
    );
}
