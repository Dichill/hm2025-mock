"use client";

import { useState, useEffect } from "react";
import { RegisterDto } from "@/core/user/types/register.dto";
import { register } from "@/core/user/api/user";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase/supabase-client";
import { USE_DEMO_DATA } from "@/core/mock/demo-mode";

export function RegisterForm() {
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState<
        RegisterDto & { confirmPassword: string }
    >({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        confirmPassword: "",
        general: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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
    }, [router]);

    const validateEmail = (email: string): boolean => {
        if (!email) return false;

        const parts = email.split("@");
        if (parts.length !== 2) return false;

        return parts[1].toLowerCase().includes("laccd");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setIsSuccess(false);

        // Reset errors
        const newErrors = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            confirmPassword: "",
            general: "",
        };

        let isValid = true;

        // Validate required fields
        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
            isValid = false;
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Must use an LACCD email address";
            isValid = false;
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
            isValid = false;
        }

        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = "Please confirm your password";
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            try {
                const registerData: RegisterDto = {
                    email: formData.email,
                    password: formData.password,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                };

                const response = await register(registerData);
                console.log("Registration response:", response);
                setIsSuccess(true);

                // Store email and token in sessionStorage for verification page
                sessionStorage.setItem("registeredEmail", registerData.email);
                if (response && response.token) {
                    sessionStorage.setItem("registrationToken", response.token);
                }

                const redirectUrl =
                    response && response.token
                        ? `/confirm?t=${encodeURIComponent(response.token)}`
                        : "/confirm";

                // Let the animation play before redirecting
                setTimeout(() => {
                    router.push(redirectUrl);
                }, 1500);
            } catch (error) {
                console.error("Registration error:", error);
                setErrors({
                    ...newErrors,
                    general: "Registration failed. Please try again later.",
                });
                setIsSubmitting(false);
            }
        } else {
            setIsSubmitting(false);
        }
    };

    if (!isClient) {
        return null;
    }

    // Animation variants
    const formVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 1.2,
            },
        },
        success: {
            scale: 0.8,
            opacity: 0.6,
            filter: "blur(2px)",
            transition: {
                duration: 0.5,
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

    const loadingContainerVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 200,
            },
        },
    };

    const loadingCircleVariants = {
        animate: {
            rotate: 360,
            transition: {
                repeat: Infinity,
                duration: 1,
                ease: "linear",
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
        <div className="relative">
            <motion.form
                onSubmit={handleSubmit}
                className="space-y-5"
                initial="hidden"
                animate={isSuccess ? "success" : "visible"}
                variants={formVariants}
            >
                <motion.div
                    className="grid grid-cols-2 gap-4"
                    variants={formItemVariants}
                >
                    <div className="space-y-1">
                        <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-[rgb(var(--mesa-grey))]"
                        >
                            First Name
                        </label>
                        <motion.input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${
                                errors.firstName
                                    ? "border-[rgb(var(--mesa-warm-red))] ring-[rgb(var(--mesa-warm-red))]/20"
                                    : "border-gray-300 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
                            }`}
                            whileFocus={{ scale: 1.01 }}
                        />
                        {errors.firstName && (
                            <motion.p
                                className="text-sm text-[rgb(var(--mesa-warm-red))]"
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {errors.firstName}
                            </motion.p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-[rgb(var(--mesa-grey))]"
                        >
                            Last Name
                        </label>
                        <motion.input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${
                                errors.lastName
                                    ? "border-[rgb(var(--mesa-warm-red))] ring-[rgb(var(--mesa-warm-red))]/20"
                                    : "border-gray-300 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
                            }`}
                            whileFocus={{ scale: 1.01 }}
                        />
                        {errors.lastName && (
                            <motion.p
                                className="text-sm text-[rgb(var(--mesa-warm-red))]"
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {errors.lastName}
                            </motion.p>
                        )}
                    </div>
                </motion.div>

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
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${
                            errors.email
                                ? "border-[rgb(var(--mesa-warm-red))] ring-[rgb(var(--mesa-warm-red))]/20"
                                : "border-gray-300 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
                        }`}
                        placeholder="example@college.laccd.edu"
                        whileFocus={{ scale: 1.01 }}
                    />
                    {errors.email && (
                        <motion.p
                            className="text-sm text-[rgb(var(--mesa-warm-red))]"
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {errors.email}
                        </motion.p>
                    )}
                    <motion.p
                        className="text-xs text-[rgb(var(--mesa-grey))] mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        Must be an LACCD email address
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
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${
                            errors.password
                                ? "border-[rgb(var(--mesa-warm-red))] ring-[rgb(var(--mesa-warm-red))]/20"
                                : "border-gray-300 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
                        }`}
                        whileFocus={{ scale: 1.01 }}
                    />
                    {errors.password && (
                        <motion.p
                            className="text-sm text-[rgb(var(--mesa-warm-red))]"
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {errors.password}
                        </motion.p>
                    )}
                    <motion.p
                        className="text-xs text-[rgb(var(--mesa-grey))] mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        Must be at least 8 characters
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
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${
                            errors.confirmPassword
                                ? "border-[rgb(var(--mesa-warm-red))] ring-[rgb(var(--mesa-warm-red))]/20"
                                : "border-gray-300 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
                        }`}
                        whileFocus={{ scale: 1.01 }}
                    />
                    {errors.confirmPassword && (
                        <motion.p
                            className="text-sm text-[rgb(var(--mesa-warm-red))]"
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {errors.confirmPassword}
                        </motion.p>
                    )}
                </motion.div>

                {errors.general && (
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
                        {errors.general}
                    </motion.div>
                )}

                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-4 bg-[rgb(var(--mesa-warm-red))] hover:bg-[rgb(var(--mesa-warm-red))]/90 text-white rounded-md focus:outline-none focus:ring-3 focus:ring-[rgb(var(--mesa-warm-red))]/50 shadow-md hover:shadow-lg transition-all duration-200 ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    } ${isSuccess ? "opacity-0" : ""}`}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    {isSubmitting && !isSuccess ? (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            Registering...
                        </motion.span>
                    ) : (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            Register
                        </motion.span>
                    )}
                </motion.button>

                <motion.div
                    className={`text-center text-sm mt-4 ${
                        isSuccess ? "opacity-0" : ""
                    }`}
                    variants={formItemVariants}
                >
                    <p className="text-[rgb(var(--mesa-grey))]">
                        Already have an account?{" "}
                        <motion.a
                            href="/login"
                            className="text-[rgb(var(--mesa-orange))] hover:text-[rgb(var(--mesa-yellow-116))] font-medium transition-colors"
                            whileHover={{
                                scale: 1.05,
                                color: "rgb(255, 182, 10)",
                                transition: { duration: 0.2 },
                            }}
                        >
                            Sign in
                        </motion.a>
                    </p>
                </motion.div>
            </motion.form>

            {isSuccess && (
                <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
                    initial="hidden"
                    animate="visible"
                    variants={loadingContainerVariants}
                >
                    <motion.div
                        className="w-16 h-16 border-4 border-[rgb(var(--mesa-orange))] border-t-transparent rounded-full"
                        variants={loadingCircleVariants}
                        animate="animate"
                    />
                    <motion.p
                        className="mt-4 text-[rgb(var(--mesa-orange))] font-medium text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Redirecting to verification...
                    </motion.p>
                </motion.div>
            )}
        </div>
    );
}
