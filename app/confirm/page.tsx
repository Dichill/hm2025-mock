"use client";

import { useState, useEffect, Suspense } from "react";
import { verifyUserEmail, resendVerificationCode } from "@/core/user/api/user";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import supabase from "@/lib/supabase/supabase-client";
import { USE_DEMO_DATA } from "@/core/mock/demo-mode";

type VerificationStatusType =
    | "loading"
    | "verified"
    | "unverified"
    | "error"
    | "pending"
    | "resending";

// Create a wrapper component that uses useSearchParams
function VerificationContent() {
    const [isClient, setIsClient] = useState(false);
    const [verificationStatus, setVerificationStatus] =
        useState<VerificationStatusType>("loading");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [verificationCode, setVerificationCode] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [resendCooldown, setResendCooldown] = useState<number>(120);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 6) {
            setVerificationCode(value);
        }
    };

    const handleVerifyCode = async () => {
        if (verificationCode.length !== 6) {
            setErrorMessage("Please enter a valid 6-digit code");
            return;
        }

        setIsSubmitting(true);
        try {
            const verified = await verifyUserEmail(
                token || "",
                verificationCode,
                userEmail || undefined
            );
            setVerificationStatus(verified ? "verified" : "unverified");
            if (!verified) {
                setErrorMessage("Invalid verification code");
            } else {
                if (isClient && typeof window !== "undefined") {
                    sessionStorage.removeItem("registrationToken");
                }
                router.push("/login?verified=true");
            }
        } catch (error) {
            console.error("Code verification error:", error);
            setErrorMessage("Failed to verify code. Please try again.");
            setVerificationStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResendCode = async () => {
        if (!userEmail) {
            setErrorMessage(
                "Email address not found. Please try logging in again."
            );
            return;
        }

        setVerificationStatus("resending");
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await resendVerificationCode(userEmail);
            if (response.success) {
                setSuccessMessage(
                    response.message ||
                        "Verification code sent successfully! Please check your email for the verification link or code."
                );
                setVerificationCode("");
                setResendCooldown(120); // Set 2 minutes cooldown
            } else {
                setErrorMessage(
                    response.message || "Failed to resend verification code."
                );
            }
        } catch (error) {
            console.error("Resend code error:", error);
            setErrorMessage(
                "Failed to resend verification code. Please try again later."
            );
        } finally {
            setVerificationStatus("pending");
        }
    };

    // Add effect for cooldown timer
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (resendCooldown > 0) {
            interval = setInterval(() => {
                setResendCooldown((prevCooldown) => prevCooldown - 1);
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [resendCooldown]);

    useEffect(() => {
        setIsClient(true);

        const checkSession = async () => {
            try {
                if (USE_DEMO_DATA) {
                    return;
                }
                const { data } = await supabase.auth.getSession();

                if (data.session) {
                    router.push("/dashboard");
                }
            } catch (error) {
                console.error(
                    "Error checking session in register form:",
                    error
                );
            }
        };
        checkSession();

        const checkVerification = async () => {
            try {
                if (USE_DEMO_DATA) {
                    const tokenParam = searchParams.get("t");
                    const emailParam = searchParams.get("email");
                    if (tokenParam) {
                        setToken(tokenParam);
                    }
                    const demoEmail =
                        emailParam ||
                        (isClient && typeof window !== "undefined"
                            ? sessionStorage.getItem("registeredEmail")
                            : null) ||
                        "demo.hacker@hackmesa.org";
                    setUserEmail(demoEmail);
                    setVerificationStatus("pending");
                    setSuccessMessage(
                        "Demo mode is enabled. Enter any 6-digit code to continue."
                    );
                    return;
                }

                const { data: session } = await supabase.auth.getSession();

                if (session?.session) {
                    setToken(session.session.access_token);

                    const {
                        data: { user },
                    } = await supabase.auth.getUser();
                    if (user?.email) {
                        setUserEmail(user.email);
                        setVerificationStatus("pending");
                        return;
                    }
                }

                const tokenParam = searchParams.get("t");
                if (tokenParam) {
                    setToken(tokenParam);

                    const registeredEmail =
                        isClient && typeof window !== "undefined"
                            ? sessionStorage.getItem("registeredEmail")
                            : null;

                    if (registeredEmail) {
                        setUserEmail(registeredEmail);
                    }

                    setVerificationStatus("pending");
                    return;
                }

                const emailParam = searchParams.get("email");
                if (emailParam) {
                    setUserEmail(emailParam);

                    if (isClient && typeof window !== "undefined") {
                        sessionStorage.setItem("registeredEmail", emailParam);
                    }

                    setVerificationStatus("pending");
                    return;
                }

                const registeredEmail =
                    isClient && typeof window !== "undefined"
                        ? sessionStorage.getItem("registeredEmail")
                        : null;

                if (registeredEmail) {
                    setUserEmail(registeredEmail);

                    // Check for token in sessionStorage
                    const storedToken =
                        isClient && typeof window !== "undefined"
                            ? sessionStorage.getItem("registrationToken")
                            : null;

                    if (storedToken) {
                        setToken(storedToken);
                    }

                    setVerificationStatus("pending");
                    setSuccessMessage(
                        "Please check your email for a verification link or code to complete your registration."
                    );
                    return;
                }

                setErrorMessage(
                    "You must be logged in to check verification status."
                );
                setVerificationStatus("error");
            } catch (error) {
                console.error("Verification check error:", error);
                setErrorMessage(
                    "Failed to check verification status. Please try again later."
                );
                setVerificationStatus("error");
            }
        };

        if (isClient) {
            checkVerification();
        }
    }, [isClient, router, searchParams]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
                duration: 0.5,
            },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 1.1 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1.2,
                ease: "easeOut",
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    const iconVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.6,
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
                delay: 0.8,
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

    const inputVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                delay: 0.6,
            },
        },
        focus: {
            scale: 1.02,
            transition: {
                duration: 0.2,
            },
        },
    };

    const renderStatusContent = () => {
        switch (verificationStatus) {
            case "loading":
                return (
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="w-12 h-12 border-4 border-t-[rgb(var(--mesa-orange))] border-r-[rgb(var(--mesa-orange))] border-b-[rgb(var(--mesa-orange))] border-l-transparent rounded-full animate-spin"></div>
                        <p className="text-lg text-[rgb(var(--mesa-grey))]">
                            Checking verification status...
                        </p>
                    </div>
                );
            case "resending":
                return (
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="w-12 h-12 border-4 border-t-[rgb(var(--mesa-orange))] border-r-[rgb(var(--mesa-orange))] border-b-[rgb(var(--mesa-orange))] border-l-transparent rounded-full animate-spin"></div>
                        <p className="text-lg text-[rgb(var(--mesa-grey))]">
                            Resending verification code...
                        </p>
                    </div>
                );
            case "pending":
                return (
                    <div className="flex flex-col items-center justify-center space-y-6">
                        <motion.div
                            className="w-20 h-20 bg-[rgb(var(--mesa-orange))]/20 rounded-full flex items-center justify-center"
                            variants={iconVariants}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 text-[rgb(var(--mesa-orange))]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </motion.div>
                        <h2 className="text-2xl font-semibold text-[rgb(var(--mesa-orange))]">
                            Verify Your Email
                        </h2>
                        {userEmail && (
                            <p className="text-center text-[rgb(var(--mesa-grey))]">
                                Please check{" "}
                                <span className="font-semibold">
                                    {userEmail}
                                </span>{" "}
                                for your verification code. Also check your{" "}
                                <span className="font-semibold">
                                    spam folder
                                </span>{" "}
                                if you don&apos;t see it in your inbox.
                            </p>
                        )}
                        <p className="text-center text-[rgb(var(--mesa-grey))]">
                            {!token
                                ? "Please check your email for a verification code to complete your registration. If it has expired, you can click the resend verification email."
                                : "Enter the 6-digit code sent to your email to complete verification."}
                        </p>

                        <div className="w-full max-w-xs">
                            <div className="space-y-3">
                                {successMessage && (
                                    <motion.div
                                        className="bg-[rgb(var(--mesa-green))]/20 border-l-4 border-[rgb(var(--mesa-green))] text-[rgb(var(--mesa-green))] p-3 rounded shadow-sm"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        {successMessage}
                                    </motion.div>
                                )}

                                <motion.div
                                    className="flex flex-col space-y-2"
                                    variants={inputVariants}
                                >
                                    <label
                                        htmlFor="verification-code"
                                        className="text-sm font-medium text-[rgb(var(--mesa-grey))]"
                                    >
                                        Verification Code
                                    </label>
                                    <motion.input
                                        id="verification-code"
                                        type="text"
                                        inputMode="numeric"
                                        value={verificationCode}
                                        onChange={handleCodeChange}
                                        placeholder="000000"
                                        className="w-full px-4 py-3 text-center text-xl tracking-widest font-semibold border-2 border-gray-300 rounded-md focus:border-[rgb(var(--mesa-orange))] focus:ring-2 focus:ring-[rgb(var(--mesa-orange))]/30 focus:outline-none transition-all duration-200"
                                        whileFocus="focus"
                                        maxLength={6}
                                    />
                                    <p className="text-xs text-[rgb(var(--mesa-grey))]">
                                        Enter the 6-digit code sent to your
                                        email
                                    </p>
                                </motion.div>

                                {errorMessage && (
                                    <motion.p
                                        className="text-sm text-[rgb(var(--mesa-warm-red))]"
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {errorMessage}
                                    </motion.p>
                                )}

                                <motion.button
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    className={`cursor-pointer w-full py-3 px-4 bg-[rgb(var(--mesa-warm-red))] text-white rounded-md font-medium shadow-md transition-all duration-200 ${
                                        isSubmitting
                                            ? "opacity-70 cursor-not-allowed"
                                            : ""
                                    }`}
                                    onClick={handleVerifyCode}
                                    disabled={
                                        isSubmitting ||
                                        verificationCode.length !== 6
                                    }
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center">
                                            <svg
                                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Verifying...
                                        </span>
                                    ) : (
                                        "Verify Code"
                                    )}
                                </motion.button>

                                <motion.button
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    className={`w-full py-2 text-sm ${
                                        resendCooldown > 0
                                            ? "text-gray-400 cursor-not-allowed"
                                            : "text-[rgb(var(--mesa-orange))] hover:text-[rgb(var(--mesa-orange))]/80"
                                    } font-medium transition-colors`}
                                    onClick={handleResendCode}
                                    disabled={
                                        verificationStatus ===
                                            ("resending" as VerificationStatusType) ||
                                        resendCooldown > 0
                                    }
                                >
                                    {verificationStatus ===
                                    ("resending" as VerificationStatusType)
                                        ? "Sending..."
                                        : resendCooldown > 0
                                        ? `Resend available in ${resendCooldown}s`
                                        : "Resend verification email"}
                                </motion.button>
                            </div>
                        </div>
                    </div>
                );
            case "unverified":
                return (
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <motion.div
                            className="w-20 h-20 bg-[rgb(var(--mesa-warm-red))]/20 rounded-full flex items-center justify-center"
                            variants={iconVariants}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 text-[rgb(var(--mesa-warm-red))]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </motion.div>
                        <h2 className="text-2xl font-semibold text-[rgb(var(--mesa-warm-red))]">
                            Email Not Verified
                        </h2>
                        <p className="text-center text-[rgb(var(--mesa-grey))]">
                            Your email has not been verified yet. Please check
                            your inbox for a verification email.
                        </p>
                        <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="mt-4 px-6 py-2.5 bg-[rgb(var(--mesa-orange))] text-white rounded-md font-medium shadow-md"
                            onClick={() => {
                                setVerificationStatus("loading");
                                setTimeout(() => {
                                    setVerificationStatus("pending");
                                }, 1500);
                            }}
                        >
                            Enter Verification Code
                        </motion.button>
                    </div>
                );
            case "error":
                return (
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <motion.div
                            className="w-20 h-20 bg-[rgb(var(--mesa-warm-red))]/20 rounded-full flex items-center justify-center"
                            variants={iconVariants}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 text-[rgb(var(--mesa-warm-red))]"
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
                        </motion.div>
                        <h2 className="text-2xl font-semibold text-[rgb(var(--mesa-warm-red))]">
                            Error
                        </h2>
                        <p className="text-center text-[rgb(var(--mesa-grey))]">
                            {errorMessage ||
                                "An error occurred while checking your verification status."}
                        </p>
                        <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="mt-4 px-6 py-2.5 bg-[rgb(var(--mesa-orange))] text-white rounded-md font-medium shadow-md"
                            onClick={() => window.location.reload()}
                        >
                            Try Again
                        </motion.button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <motion.div
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Background image with overlay and animation */}
            <motion.div
                className="absolute inset-0 z-0"
                variants={imageVariants}
            >
                <Image
                    src="/MESA_student_overlay1.webp"
                    alt="MESA Students"
                    fill
                    className="object-cover"
                    priority
                />
                <motion.div
                    className="absolute inset-0 bg-slate-900/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                ></motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
                className="relative z-10 w-full max-w-md p-8 space-y-8 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-100"
                variants={cardVariants}
            >
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    <motion.h1
                        className="text-3xl font-bold text-[rgb(var(--mesa-warm-red))]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.6,
                            delay: 0.8,
                            type: "spring",
                            stiffness: 200,
                        }}
                    >
                        HACKMESA
                    </motion.h1>
                    <motion.p
                        className="text-[rgb(var(--mesa-grey))] mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                    >
                        Email Verification
                    </motion.p>
                </motion.div>

                {isClient && renderStatusContent()}
            </motion.div>
        </motion.div>
    );
}

// Create a loading fallback component
function VerificationLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-t-[rgb(var(--mesa-orange))] border-r-[rgb(var(--mesa-orange))] border-b-[rgb(var(--mesa-orange))] border-l-transparent rounded-full animate-spin"></div>
            <p className="ml-3 text-lg text-[rgb(var(--mesa-grey))]">
                Loading verification...
            </p>
        </div>
    );
}

// Main component that wraps everything with Suspense
export default function VerifyPage() {
    return (
        <Suspense fallback={<VerificationLoading />}>
            <VerificationContent />
        </Suspense>
    );
}
