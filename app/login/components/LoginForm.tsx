"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import supabase from "@/lib/supabase/supabase-client";
import { useRouter, useSearchParams } from "next/navigation";
import { getUserData } from "@/core/user/api/user";

export function LoginForm() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [verificationSuccess, setVerificationSuccess] =
        useState<boolean>(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Check if the verified parameter exists in the URL
        const verified = searchParams.get("verified");
        if (verified === "true") {
            setVerificationSuccess(true);
        }

        const checkSession = async () => {
            try {
                const { data } = await supabase.auth.getSession();

                if (data.session) {
                    try {
                        const userData = await getUserData();
                        const adminRoles = ["SPONSORS", "ORGANIZER"];

                        if (
                            userData.roles.some((role) =>
                                adminRoles.includes(role)
                            )
                        ) {
                            router.push("/admin");
                        } else {
                            router.push("/dashboard");
                        }
                    } catch (error) {
                        console.error("Error getting user data:", error);
                        router.push("/dashboard");
                    }
                }
            } catch (error) {
                console.error("Error checking session in form:", error);
            }
        };

        checkSession();
    }, [router, searchParams]);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                if (
                    error.message === "Email not confirmed" ||
                    error.code === "email_not_confirmed"
                ) {
                    if (typeof window !== "undefined") {
                        sessionStorage.setItem("registeredEmail", email);
                        router.push("/confirm");
                        return;
                    }
                }
                throw error;
            }

            try {
                const userData = await getUserData();
                const adminRoles = ["SPONSORS", "ORGANIZER"];

                console.log(userData.roles);

                if (userData.roles.some((role) => adminRoles.includes(role))) {
                    router.push("/admin");
                } else {
                    router.push("/dashboard");
                }
            } catch (userDataError) {
                console.error("Error getting user data:", userDataError);
                router.push("/dashboard");
            }
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "An error occurred during login"
            );
        } finally {
            setLoading(false);
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

    return (
        <motion.form
            onSubmit={handleLogin}
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
                    Enter your LACCD email address
                </motion.p>
            </motion.div>

            <motion.div className="space-y-1" variants={formItemVariants}>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[rgb(var(--mesa-grey))]"
                >
                    Password
                </label>
                <motion.input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${
                        error
                            ? "border-[rgb(var(--mesa-warm-red))] ring-[rgb(var(--mesa-warm-red))]/20"
                            : "border-gray-300 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
                    }`}
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

            {verificationSuccess && (
                <motion.div
                    className="bg-[rgb(var(--mesa-green))]/10 border-l-4 border-[rgb(var(--mesa-green))] text-[rgb(var(--mesa-green))] p-4 rounded shadow-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                    }}
                >
                    Your account has been successfully verified! Please sign in
                    to continue applying.
                </motion.div>
            )}

            <motion.button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 bg-[rgb(var(--mesa-warm-red))] cursor-pointer hover:bg-[rgb(var(--mesa-warm-red))]/90 text-white rounded-md focus:outline-none focus:ring-3 focus:ring-[rgb(var(--mesa-warm-red))]/50 shadow-md hover:shadow-lg transition-all duration-200 ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
            >
                {loading ? (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        Signing in...
                    </motion.span>
                ) : (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        Sign in
                    </motion.span>
                )}
            </motion.button>

            <motion.div
                className="text-center text-sm mt-4"
                variants={formItemVariants}
            >
                <p className="text-[rgb(var(--mesa-grey))]">
                    Don&apos;t have an account yet?{" "}
                    <motion.a
                        href="/register"
                        className="text-[rgb(var(--mesa-orange))] hover:text-[rgb(var(--mesa-yellow-116))] font-medium transition-colors"
                        whileHover={{
                            scale: 1.05,
                            color: "rgb(255, 182, 10)",
                            transition: { duration: 0.2 },
                        }}
                    >
                        Register
                    </motion.a>
                </p>
                <p className="text-[rgb(var(--mesa-grey))] mt-2">
                    <motion.a
                        href="/forgot-password"
                        className="text-[rgb(var(--mesa-orange))] hover:text-[rgb(var(--mesa-yellow-116))] font-medium transition-colors"
                        whileHover={{
                            scale: 1.05,
                            color: "rgb(255, 182, 10)",
                            transition: { duration: 0.2 },
                        }}
                    >
                        Forgot your password?
                    </motion.a>
                </p>
            </motion.div>
        </motion.form>
    );
}
