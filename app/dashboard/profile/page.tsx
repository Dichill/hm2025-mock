"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { getOwnProfile, updateProfile } from "@/core/user/api/profile";
import { UserProfileDto } from "@/core/user/types/profile.dto";

export default function ProfilePage() {
    const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState<Partial<UserProfileDto>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    const buttonVariants = {
        hover: {
            scale: 1.03,
            boxShadow: "0 10px 25px rgba(var(--mesa-orange), 0.2)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
        tap: { scale: 0.97 },
    };

    useEffect(() => {
        setIsClient(true);

        const fetchData = async () => {
            try {
                setLoading(true);
                const profileData = await getOwnProfile();
                setFormData(profileData);
            } catch (error) {
                console.error("Error fetching profile data:", error);
                setErrorMessage(
                    "Failed to load profile data. Please try again later."
                );
            } finally {
                setLoading(false);
            }
        };

        if (isClient) {
            fetchData();
        }
    }, [isClient]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const response = await updateProfile(formData);

            setSuccessMessage("Profile updated successfully!");

            setFormData(response as unknown as UserProfileDto);
        } catch (error) {
            console.error("Error updating profile:", error);
            setErrorMessage("An error occurred while updating your profile.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="w-16 h-16 border-4 border-t-[rgb(var(--mesa-orange))] border-r-[rgb(var(--mesa-orange))] border-b-[rgb(var(--mesa-orange))] border-l-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
        >
            <motion.div
                variants={cardVariants}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-6"
            >
                <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-[rgb(var(--mesa-orange))]/20 rounded-full flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-[rgb(var(--mesa-orange))]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    </div>
                    <h2 className="ml-3 text-2xl font-medium">Your Profile</h2>
                </div>

                {successMessage && (
                    <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md">
                        {successMessage}
                    </div>
                )}

                {errorMessage && (
                    <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label
                                htmlFor="full_name"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="full_name"
                                name="full_name"
                                value={formData.full_name || ""}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange))]"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="school"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                School
                                <span className="ml-1 text-gray-500 text-xs">
                                    (Read-only)
                                </span>
                            </label>
                            <input
                                type="text"
                                id="school"
                                name="school"
                                value={formData.school || ""}
                                disabled
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="year"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Level of Study
                            </label>
                            <select
                                id="year"
                                name="year"
                                value={formData.year || ""}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange))]"
                            >
                                <option value="">
                                    Select your level of study
                                </option>
                                <option value="Undergraduate University (2 year - community college or similar)">
                                    Undergraduate University (2 year - community
                                    college or similar)
                                </option>
                                <option value="Undergraduate University (3+ year)">
                                    Undergraduate University (3+ year)
                                </option>
                                <option value="Graduate University (Masters, Professional, Doctoral, etc)">
                                    Graduate University (Masters, Professional,
                                    Doctoral, etc)
                                </option>
                                <option value="Code School / Bootcamp">
                                    Code School / Bootcamp
                                </option>
                                <option value="Other Vocational / Trade Program or Apprenticeship">
                                    Other Vocational / Trade Program or
                                    Apprenticeship
                                </option>
                                <option value="Post Doctorate">
                                    Post Doctorate
                                </option>
                                <option value="Other">Other</option>
                                <option value="I'm not currently a student">
                                    I&apos;m not currently a student
                                </option>
                                <option value="Prefer not to answer">
                                    Prefer not to answer
                                </option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="t_shirt_size"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                T-Shirt Size
                            </label>
                            <select
                                id="t_shirt_size"
                                name="t_shirt_size"
                                value={formData.t_shirt_size || ""}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange))]"
                            >
                                <option value="">Select Size</option>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                                <option value="XXXL">XXXL</option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="dietary_restrictions"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Dietary Restrictions
                            </label>
                            <input
                                type="text"
                                id="dietary_restrictions"
                                name="dietary_restrictions"
                                value={formData.dietary_restrictions || ""}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange))]"
                                placeholder="Vegetarian, Vegan, Gluten-free, etc."
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="linkedin_url"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                LinkedIn URL
                            </label>
                            <input
                                type="text"
                                id="linkedin_url"
                                name="linkedin_url"
                                value={formData.linkedin_url || ""}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange))]"
                                placeholder="https://linkedin.com/in/username"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <motion.button
                            type="button"
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonVariants}
                            onClick={() => router.back()}
                            className="cursor-pointer px-6 py-2 border border-gray-300 rounded-md font-medium text-gray-700"
                        >
                            Cancel
                        </motion.button>
                        <motion.button
                            type="submit"
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonVariants}
                            disabled={isSubmitting}
                            className="cursor-pointer px-6 py-2 bg-[rgb(var(--mesa-orange))] text-white rounded-md font-medium"
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}
