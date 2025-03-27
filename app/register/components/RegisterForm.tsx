"use client";

import { useState, useEffect } from "react";
import { RegisterDto } from "@/core/user/types/register.dto";
import { register } from "@/core/user/api/user";

export function RegisterForm() {
    const [isClient, setIsClient] = useState(false);
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
    }, []);

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

                await register(registerData);
                setIsSuccess(true);

                setFormData({
                    email: "",
                    password: "",
                    firstName: "",
                    lastName: "",
                    confirmPassword: "",
                });
            } catch (error) {
                console.error("Registration error:", error);
                setErrors({
                    ...newErrors,
                    general: "Registration failed. Please try again later.",
                });
            }
        }

        setIsSubmitting(false);
    };

    if (!isClient) {
        return null;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {isSuccess && (
                <div className="bg-[rgb(var(--mesa-green))]/10 border-l-4 border-[rgb(var(--mesa-green))] text-[rgb(var(--mesa-green))] p-4 rounded">
                    Registration successful! Please check your email for
                    verification.
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-[rgb(var(--mesa-grey))]"
                    >
                        First Name
                    </label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                            errors.firstName
                                ? "border-[rgb(var(--mesa-warm-red))] ring-[rgb(var(--mesa-warm-red))]/20"
                                : "border-gray-300 focus:ring-[rgb(var(--mesa-orange))]/30"
                        }`}
                    />
                    {errors.firstName && (
                        <p className="text-sm text-[rgb(var(--mesa-warm-red))]">
                            {errors.firstName}
                        </p>
                    )}
                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-[rgb(var(--mesa-grey))]"
                    >
                        Last Name
                    </label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                            errors.lastName
                                ? "border-[rgb(var(--mesa-warm-red))] ring-[rgb(var(--mesa-warm-red))]/20"
                                : "border-gray-300 focus:ring-[rgb(var(--mesa-orange))]/30"
                        }`}
                    />
                    {errors.lastName && (
                        <p className="text-sm text-[rgb(var(--mesa-warm-red))]">
                            {errors.lastName}
                        </p>
                    )}
                </div>
            </div>

            <div className="space-y-1">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[rgb(var(--mesa-grey))]"
                >
                    Email Address
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.email
                            ? "border-[rgb(var(--mesa-warm-red))] ring-[rgb(var(--mesa-warm-red))]/20"
                            : "border-gray-300 focus:ring-[rgb(var(--mesa-orange))]/30"
                    }`}
                    placeholder="example@college.laccd.edu"
                />
                {errors.email && (
                    <p className="text-sm text-[rgb(var(--mesa-warm-red))]">
                        {errors.email}
                    </p>
                )}
                <p className="text-xs text-[rgb(var(--mesa-grey))] mt-1">
                    Must be an LACCD email address
                </p>
            </div>

            <div className="space-y-1">
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[rgb(var(--mesa-grey))]"
                >
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.password
                            ? "border-[rgb(var(--mesa-warm-red))] ring-[rgb(var(--mesa-warm-red))]/20"
                            : "border-gray-300 focus:ring-[rgb(var(--mesa-orange))]/30"
                    }`}
                />
                {errors.password && (
                    <p className="text-sm text-[rgb(var(--mesa-warm-red))]">
                        {errors.password}
                    </p>
                )}
                <p className="text-xs text-[rgb(var(--mesa-grey))] mt-1">
                    Must be at least 8 characters
                </p>
            </div>

            <div className="space-y-1">
                <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-[rgb(var(--mesa-grey))]"
                >
                    Confirm Password
                </label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.confirmPassword
                            ? "border-[rgb(var(--mesa-warm-red))] ring-[rgb(var(--mesa-warm-red))]/20"
                            : "border-gray-300 focus:ring-[rgb(var(--mesa-orange))]/30"
                    }`}
                />
                {errors.confirmPassword && (
                    <p className="text-sm text-[rgb(var(--mesa-warm-red))]">
                        {errors.confirmPassword}
                    </p>
                )}
            </div>

            {errors.general && (
                <div className="bg-[rgb(var(--mesa-warm-red))]/10 border-l-4 border-[rgb(var(--mesa-warm-red))] text-[rgb(var(--mesa-warm-red))] p-4 rounded">
                    {errors.general}
                </div>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 px-4 bg-[rgb(var(--mesa-warm-red))] hover:bg-[rgb(var(--mesa-warm-red))]/90 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-warm-red))]/50 transition-colors ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
                {isSubmitting ? "Registering..." : "Register"}
            </button>

            <div className="text-center text-sm">
                <p className="text-[rgb(var(--mesa-grey))]">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="text-[rgb(var(--mesa-orange))] hover:text-[rgb(var(--mesa-yellow-116))] font-medium"
                    >
                        Sign in
                    </a>
                </p>
            </div>
        </form>
    );
}
