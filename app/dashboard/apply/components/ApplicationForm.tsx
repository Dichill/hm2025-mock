"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// Types for form data
type FormData = {
    // Personal Information
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    age: string;
    studentNumber: string;

    // Education
    school: string;
    levelOfStudy: string;
    country: string;
    linkedInUrl: string;
    whyAttend: string;
    firstTime: string;
    skillLevel: string;
    primarySkills: string[];
    otherSkill: string;
    resumeFile: File | null;

    // MLH Specific
    mlhCodeOfConduct: boolean;
    mlhPrivacyPolicy: boolean;
    mlhEmailSubscription: boolean;
    mesaSubscription: boolean;

    // Optional Demographics
    dietaryRestrictions: string[];
    isMesaStudent: string;
    gender: string;
    tShirtSize: string;

    // Field of Study
    fieldOfStudy: string;
};

// Custom error type that includes 'general'
type FormErrors = Partial<Record<keyof FormData, string>> & {
    general?: string;
};

export function ApplicationForm() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        age: "",
        studentNumber: "",
        school: "",
        levelOfStudy: "",
        country: "",
        linkedInUrl: "",
        mlhCodeOfConduct: false,
        mlhPrivacyPolicy: false,
        mlhEmailSubscription: false,
        mesaSubscription: false,
        dietaryRestrictions: [],
        isMesaStudent: "",
        gender: "",
        tShirtSize: "",
        fieldOfStudy: "",
        whyAttend: "",
        firstTime: "",
        skillLevel: "",
        primarySkills: [],
        otherSkill: "",
        resumeFile: null,
    });

    const [errors, setErrors] = useState<FormErrors>({});

    // Animation variants
    const formVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.2,
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

    // Handle input changes
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value, type } = e.target as HTMLInputElement;

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }

        // Clear the error when user types
        if (errors[name as keyof FormData]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    // Handle checkbox group changes (for multi-select)
    const handleCheckboxGroupChange = (
        name: keyof FormData,
        value: string,
        checked: boolean
    ) => {
        setFormData((prev) => {
            const currentValues = prev[name] as string[];
            if (checked) {
                return { ...prev, [name]: [...currentValues, value] };
            } else {
                return {
                    ...prev,
                    [name]: currentValues.filter((item) => item !== value),
                };
            }
        });
    };

    // Validate current step
    const validateStep = (step: number): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        if (step === 1) {
            // Personal Information validation
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
            } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
                newErrors.email = "Please enter a valid email address";
                isValid = false;
            }

            if (!formData.phoneNumber.trim()) {
                newErrors.phoneNumber = "Phone number is required";
                isValid = false;
            }

            if (!formData.age) {
                newErrors.age = "Age is required";
                isValid = false;
            }

            if (!formData.studentNumber.trim()) {
                newErrors.studentNumber = "Student number is required";
                isValid = false;
            }
        } else if (step === 2) {
            // Education validation
            if (!formData.school.trim()) {
                newErrors.school = "School is required";
                isValid = false;
            }

            if (!formData.levelOfStudy) {
                newErrors.levelOfStudy = "Level of study is required";
                isValid = false;
            }

            if (!formData.country.trim()) {
                newErrors.country = "Country is required";
                isValid = false;
            }

            if (!formData.firstTime) {
                newErrors.firstTime =
                    "Please indicate if this is your first hackathon";
                isValid = false;
            }

            if (!formData.skillLevel) {
                newErrors.skillLevel = "Skill level is required";
                isValid = false;
            }

            // Essay validation
            const wordCount = formData.whyAttend
                .trim()
                .split(/\s+/)
                .filter(Boolean).length;
            if (!formData.whyAttend.trim()) {
                newErrors.whyAttend = "Please share why you want to attend";
                isValid = false;
            } else if (wordCount < 100) {
                newErrors.whyAttend = `Your response is too short (${wordCount}/100 words minimum)`;
                isValid = false;
            } else if (wordCount > 300) {
                newErrors.whyAttend = `Your response is too long (${wordCount}/300 words maximum)`;
                isValid = false;
            }
        } else if (step === 4) {
            // MLH validation
            if (!formData.mlhCodeOfConduct) {
                newErrors.mlhCodeOfConduct =
                    "You must agree to the MLH Code of Conduct";
                isValid = false;
            }

            if (!formData.mlhPrivacyPolicy) {
                newErrors.mlhPrivacyPolicy =
                    "You must agree to the MLH Privacy Policy";
                isValid = false;
            }
        }
        // No validation for step 3 (Optional Demographics) since it's optional

        setErrors(newErrors);
        return isValid;
    };

    // Navigate to next step
    const handleNextStep = () => {
        if (validateStep(currentStep)) {
            // Make sure we don't exceed the maximum number of steps
            if (currentStep < 4) {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    // Navigate to previous step
    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    // Save the form data for later
    const handleSaveForLater = async () => {
        setIsSaving(true);

        try {
            // Create a form data object for file upload
            const formDataObj = new FormData();

            // Add all form fields to FormData
            Object.entries(formData).forEach(([key, value]) => {
                if (key === "resumeFile" && value instanceof File) {
                    // Add the file
                    formDataObj.append("resumeFile", value);
                } else if (
                    key === "primarySkills" ||
                    key === "dietaryRestrictions"
                ) {
                    // Handle arrays by converting to JSON string
                    if (Array.isArray(value)) {
                        formDataObj.append(key, JSON.stringify(value));
                    }
                } else if (typeof value === "boolean") {
                    // Convert booleans to strings
                    formDataObj.append(key, value.toString());
                } else if (typeof value === "string") {
                    // Add string values
                    formDataObj.append(key, value);
                }
            });

            // Add the saved status
            formDataObj.append("status", "saved");

            // Submit to your API or database
            // const response = await fetch("/api/application/save", {
            //     method: "POST",
            //     body: formDataObj,
            // });

            // if (!response.ok) {
            //     throw new Error("Failed to save application");
            // }

            // Simulate successful save
            setTimeout(() => {
                console.log("Application saved:", formData);
                router.push("/dashboard?application=saved");
            }, 1500);
        } catch (error) {
            console.error("Error saving application:", error);
            setErrors({
                ...errors,
                general: "Failed to save application. Please try again.",
            });
        } finally {
            setIsSaving(false);
        }
    };

    // Submit the form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateStep(currentStep)) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Create a form data object for file upload
            const formDataObj = new FormData();

            // Add all form fields to FormData
            Object.entries(formData).forEach(([key, value]) => {
                if (key === "resumeFile" && value instanceof File) {
                    // Add the file
                    formDataObj.append("resumeFile", value);
                } else if (
                    key === "primarySkills" ||
                    key === "dietaryRestrictions"
                ) {
                    // Handle arrays by converting to JSON string
                    if (Array.isArray(value)) {
                        formDataObj.append(key, JSON.stringify(value));
                    }
                } else if (typeof value === "boolean") {
                    // Convert booleans to strings
                    formDataObj.append(key, value.toString());
                } else if (typeof value === "string") {
                    // Add string values
                    formDataObj.append(key, value);
                }
            });

            // Submit to your API or database
            // const response = await fetch("/api/application", {
            //     method: "POST",
            //     body: formDataObj, // Use FormData instead of JSON
            // });

            // if (!response.ok) {
            //     throw new Error("Failed to submit application");
            // }

            // Simulate successful submission
            setTimeout(() => {
                console.log("Application submitted:", formData);
                router.push("/dashboard?application=success");
            }, 1500);
        } catch (error) {
            console.error("Error submitting application:", error);
            setErrors({
                ...errors,
                general: "Failed to submit application. Please try again.",
            });
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            {/* Form Steps Indicator */}
            <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="flex justify-between items-center">
                    {[1, 2, 3, 4].map((step) => (
                        <div
                            key={step}
                            className={`flex flex-col items-center ${
                                currentStep === step
                                    ? "text-[rgb(var(--mesa-warm-red))]"
                                    : currentStep > step
                                    ? "text-green-500"
                                    : "text-gray-400"
                            }`}
                        >
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    currentStep === step
                                        ? "bg-[rgb(var(--mesa-warm-red))] text-white"
                                        : currentStep > step
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-200 text-gray-500"
                                }`}
                            >
                                {currentStep > step ? (
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
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                ) : (
                                    step
                                )}
                            </div>
                            <span className="text-sm mt-2">
                                {step === 1 && "Personal"}
                                {step === 2 && "Education"}
                                {step === 3 && "Optional"}
                                {step === 4 && "MLH"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Form Content */}
            <motion.form
                onSubmit={handleSubmit}
                className="p-6"
                initial="hidden"
                animate="visible"
                variants={formVariants}
            >
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-[rgb(var(--mesa-warm-red))]">
                            Personal Information
                        </h2>

                        {/* Student Number */}
                        <motion.div
                            className="space-y-1"
                            variants={formItemVariants}
                        >
                            <label
                                htmlFor="studentNumber"
                                className="block text-sm font-medium text-[rgb(var(--mesa-grey))]"
                            >
                                Student Number
                            </label>
                            <motion.input
                                id="studentNumber"
                                name="studentNumber"
                                type="text"
                                value={formData.studentNumber}
                                onChange={handleChange}
                                placeholder="Enter your student ID number"
                                className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${
                                    errors.studentNumber
                                        ? "border-[rgb(var(--mesa-warm-red))] ring-[rgb(var(--mesa-warm-red))]/20"
                                        : "border-gray-300 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
                                }`}
                                whileFocus={{ scale: 1.01 }}
                            />
                            {errors.studentNumber && (
                                <p className="text-[rgb(var(--mesa-warm-red))] text-xs mt-1">
                                    {errors.studentNumber}
                                </p>
                            )}
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* First Name */}
                            <motion.div
                                className="space-y-1"
                                variants={formItemVariants}
                            >
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
                                    <p className="text-[rgb(var(--mesa-warm-red))] text-xs mt-1">
                                        {errors.firstName}
                                    </p>
                                )}
                            </motion.div>

                            {/* Last Name */}
                            <motion.div
                                className="space-y-1"
                                variants={formItemVariants}
                            >
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
                                    <p className="text-[rgb(var(--mesa-warm-red))] text-xs mt-1">
                                        {errors.lastName}
                                    </p>
                                )}
                            </motion.div>
                        </div>

                        {/* Email */}
                        <motion.div
                            className="space-y-1"
                            variants={formItemVariants}
                        >
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
                                whileFocus={{ scale: 1.01 }}
                            />
                            {errors.email && (
                                <p className="text-[rgb(var(--mesa-warm-red))] text-xs mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </motion.div>

                        {/* Phone Number */}
                        <motion.div
                            className="space-y-1"
                            variants={formItemVariants}
                        >
                            <label
                                htmlFor="phoneNumber"
                                className="block text-sm font-medium text-[rgb(var(--mesa-grey))]"
                            >
                                Phone Number
                            </label>
                            <motion.input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${
                                    errors.phoneNumber
                                        ? "border-[rgb(var(--mesa-warm-red))] ring-[rgb(var(--mesa-warm-red))]/20"
                                        : "border-gray-300 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
                                }`}
                                whileFocus={{ scale: 1.01 }}
                            />
                            {errors.phoneNumber && (
                                <p className="text-[rgb(var(--mesa-warm-red))] text-xs mt-1">
                                    {errors.phoneNumber}
                                </p>
                            )}
                        </motion.div>

                        {/* Age */}
                        <motion.div
                            className="space-y-1"
                            variants={formItemVariants}
                        >
                            <label
                                htmlFor="age"
                                className="block text-sm font-medium text-[rgb(var(--mesa-grey))]"
                            >
                                Age
                            </label>
                            <motion.select
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${
                                    errors.age
                                        ? "border-[rgb(var(--mesa-warm-red))] ring-[rgb(var(--mesa-warm-red))]/20"
                                        : "border-gray-300 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
                                }`}
                            >
                                <option value="">Select your age</option>
                                {Array.from(
                                    { length: 83 },
                                    (_, i) => i + 18
                                ).map((age) => (
                                    <option key={age} value={age.toString()}>
                                        {age}
                                    </option>
                                ))}
                            </motion.select>
                            {errors.age && (
                                <p className="text-[rgb(var(--mesa-warm-red))] text-xs mt-1">
                                    {errors.age}
                                </p>
                            )}
                        </motion.div>
                    </div>
                )}

                {/* Step 2: Education */}
                {currentStep === 2 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-[rgb(var(--mesa-warm-red))]">
                            Education Information
                        </h2>

                        {/* School */}
                        <motion.div
                            className="space-y-1"
                            variants={formItemVariants}
                        >
                            <label
                                htmlFor="school"
                                className="block text-sm font-medium text-[rgb(var(--mesa-grey))]"
                            >
                                School
                            </label>
                            <motion.select
                                id="school"
                                name="school"
                                value={formData.school}
                                onChange={handleChange}
                                className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${
                                    errors.school
                                        ? "border-[rgb(var(--mesa-warm-red))] ring-[rgb(var(--mesa-warm-red))]/20"
                                        : "border-gray-300 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
                                }`}
                            >
                                <option value="">Select your school</option>
                                <option value="East Los Angeles College">
                                    East Los Angeles College
                                </option>
                                <option value="Los Angeles City College">
                                    Los Angeles City College
                                </option>
                                <option value="Los Angeles Harbor College">
                                    Los Angeles Harbor College
                                </option>
                                <option value="Los Angeles Mission College">
                                    Los Angeles Mission College
                                </option>
                                <option value="Los Angeles Pierce College">
                                    Los Angeles Pierce College
                                </option>
                                <option value="Los Angeles Southwest College">
                                    Los Angeles Southwest College
                                </option>
                                <option value="Los Angeles Trade-Technical College">
                                    Los Angeles Trade-Technical College
                                </option>
                                <option value="Los Angeles Valley College">
                                    Los Angeles Valley College
                                </option>
                                <option value="West Los Angeles College">
                                    West Los Angeles College
                                </option>
                                <option value="Other">Other</option>
                            </motion.select>
                            {errors.school && (
                                <p className="text-[rgb(var(--mesa-warm-red))] text-xs mt-1">
                                    {errors.school}
                                </p>
                            )}
                            <motion.p
                                className="text-xs text-[rgb(var(--mesa-grey))] mt-1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.8 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                Use MLH&apos;s list of verified schools
                            </motion.p>
                        </motion.div>

                        {/* Level of Study */}
                        <motion.div
                            className="space-y-1"
                            variants={formItemVariants}
                        >
                            <label
                                htmlFor="levelOfStudy"
                                className="block text-sm font-medium text-[rgb(var(--mesa-grey))]"
                            >
                                Level of Study
                            </label>
                            <motion.select
                                id="levelOfStudy"
                                name="levelOfStudy"
                                value={formData.levelOfStudy}
                                onChange={handleChange}
                                className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${
                                    errors.levelOfStudy
                                        ? "border-[rgb(var(--mesa-warm-red))] ring-[rgb(var(--mesa-warm-red))]/20"
                                        : "border-gray-300 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
                                }`}
                            >
                                <option value="">
                                    Select your level of study
                                </option>
                                <option value="Less than Secondary / High School">
                                    Less than Secondary / High School
                                </option>
                                <option value="Secondary / High School">
                                    Secondary / High School
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
                            </motion.select>
                            {errors.levelOfStudy && (
                                <p className="text-[rgb(var(--mesa-warm-red))] text-xs mt-1">
                                    {errors.levelOfStudy}
                                </p>
                            )}
                        </motion.div>

                        {/* Country */}
                        <motion.div
                            className="space-y-1"
                            variants={formItemVariants}
                        >
                            <label
                                htmlFor="country"
                                className="block text-sm font-medium text-[rgb(var(--mesa-grey))]"
                            >
                                Country of Residence
                            </label>
                            <motion.select
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${
                                    errors.country
                                        ? "border-[rgb(var(--mesa-warm-red))] ring-[rgb(var(--mesa-warm-red))]/20"
                                        : "border-gray-300 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
                                }`}
                            >
                                <option value="">Select your country</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="MX">Mexico</option>
                                <option value="GB">United Kingdom</option>
                                <option value="AF">Afghanistan</option>
                                <option value="AX">Aland Islands</option>
                                <option value="AL">Albania</option>
                                {/* Add more countries as needed */}
                            </motion.select>
                            {errors.country && (
                                <p className="text-[rgb(var(--mesa-warm-red))] text-xs mt-1">
                                    {errors.country}
                                </p>
                            )}
                        </motion.div>

                        {/* LinkedIn URL */}
                        <motion.div
                            className="space-y-1"
                            variants={formItemVariants}
                        >
                            <label
                                htmlFor="linkedInUrl"
                                className="block text-sm font-medium text-[rgb(var(--mesa-grey))]"
                            >
                                LinkedIn URL
                            </label>
                            <motion.input
                                id="linkedInUrl"
                                name="linkedInUrl"
                                type="url"
                                value={formData.linkedInUrl}
                                onChange={handleChange}
                                placeholder="https://www.linkedin.com/in/yourusername"
                                className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${
                                    errors.linkedInUrl
                                        ? "border-[rgb(var(--mesa-warm-red))] ring-[rgb(var(--mesa-warm-red))]/20"
                                        : "border-gray-300 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
                                }`}
                                whileFocus={{ scale: 1.01 }}
                            />
                            {errors.linkedInUrl && (
                                <p className="text-[rgb(var(--mesa-warm-red))] text-xs mt-1">
                                    {errors.linkedInUrl}
                                </p>
                            )}
                            <motion.p
                                className="text-xs text-[rgb(var(--mesa-grey))] mt-1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.8 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                Connect with partners post-event for potential
                                job opportunities
                            </motion.p>
                        </motion.div>

                        {/* Resume File */}
                        <motion.div
                            className="space-y-1"
                            variants={formItemVariants}
                        >
                            <label
                                htmlFor="resumeFile"
                                className="block text-sm font-medium text-[rgb(var(--mesa-grey))]"
                            >
                                Resume File
                            </label>
                            <motion.input
                                id="resumeFile"
                                name="resumeFile"
                                type="file"
                                accept=".pdf"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setFormData((prev) => ({
                                            ...prev,
                                            resumeFile: file,
                                        }));
                                    }
                                }}
                                className="w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200"
                            />
                            {errors.resumeFile && (
                                <p className="text-[rgb(var(--mesa-warm-red))] text-xs mt-1">
                                    {errors.resumeFile}
                                </p>
                            )}
                            <motion.p
                                className="text-xs text-[rgb(var(--mesa-grey))] mt-1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.8 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                Upload your resume (PDF format)
                            </motion.p>
                        </motion.div>

                        {/* First Time */}
                        <motion.div
                            className="space-y-1"
                            variants={formItemVariants}
                        >
                            <label
                                htmlFor="firstTime"
                                className="block text-sm font-medium text-[rgb(var(--mesa-grey))]"
                            >
                                Is this your first hackathon?
                            </label>
                            <motion.select
                                id="firstTime"
                                name="firstTime"
                                value={formData.firstTime}
                                onChange={handleChange}
                                className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${
                                    errors.firstTime
                                        ? "border-[rgb(var(--mesa-warm-red))] ring-[rgb(var(--mesa-warm-red))]/20"
                                        : "border-gray-300 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
                                }`}
                            >
                                <option value="">Select an option</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </motion.select>
                            {errors.firstTime && (
                                <p className="text-[rgb(var(--mesa-warm-red))] text-xs mt-1">
                                    {errors.firstTime}
                                </p>
                            )}
                        </motion.div>

                        {/* Skill Level */}
                        <motion.div
                            className="space-y-1"
                            variants={formItemVariants}
                        >
                            <label
                                htmlFor="skillLevel"
                                className="block text-sm font-medium text-[rgb(var(--mesa-grey))]"
                            >
                                Programming Skill Level
                            </label>
                            <motion.select
                                id="skillLevel"
                                name="skillLevel"
                                value={formData.skillLevel}
                                onChange={handleChange}
                                className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${
                                    errors.skillLevel
                                        ? "border-[rgb(var(--mesa-warm-red))] ring-[rgb(var(--mesa-warm-red))]/20"
                                        : "border-gray-300 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
                                }`}
                            >
                                <option value="">
                                    Select your skill level
                                </option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">
                                    Intermediate
                                </option>
                                <option value="Advanced">Advanced</option>
                                <option value="Expert">Expert</option>
                            </motion.select>
                            {errors.skillLevel && (
                                <p className="text-[rgb(var(--mesa-warm-red))] text-xs mt-1">
                                    {errors.skillLevel}
                                </p>
                            )}
                        </motion.div>

                        {/* Primary Skills */}
                        <motion.div
                            className="space-y-3"
                            variants={formItemVariants}
                        >
                            <label className="block text-sm font-medium text-[rgb(var(--mesa-grey))]">
                                Primary Skills/Interests (select all that apply)
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {[
                                    "Mathematics",
                                    "Physics",
                                    "Chemistry",
                                    "Biology",
                                    "Environmental Science",
                                    "Civil Engineering",
                                    "Mechanical Engineering",
                                    "Electrical Engineering",
                                    "Aerospace Engineering",
                                    "Computer Engineering",
                                    "Computer Science",
                                    "Biomedical Engineering",
                                    "Data Science",
                                    "Robotics",
                                    "Renewable Energy",
                                    "Materials Science",
                                    "Industrial Engineering",
                                    "Other",
                                ].map((skill) => (
                                    <div
                                        key={skill}
                                        className="flex items-center"
                                    >
                                        <input
                                            id={`skill-${skill}`}
                                            type="checkbox"
                                            checked={formData.primarySkills.includes(
                                                skill
                                            )}
                                            onChange={(e) =>
                                                handleCheckboxGroupChange(
                                                    "primarySkills",
                                                    skill,
                                                    e.target.checked
                                                )
                                            }
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[rgb(var(--mesa-orange))]/50"
                                        />
                                        <label
                                            htmlFor={`skill-${skill}`}
                                            className="ml-2 text-sm text-gray-600"
                                        >
                                            {skill}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {formData.primarySkills.includes("Other") && (
                                <motion.div
                                    className="mt-3"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <input
                                        type="text"
                                        name="otherSkill"
                                        placeholder="Please specify other skills/interests"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
                                        onChange={(e) => {
                                            setFormData((prev) => ({
                                                ...prev,
                                                otherSkill: e.target.value,
                                            }));
                                        }}
                                    />
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Why do you want to attend? (Essay) */}
                        <motion.div
                            className="space-y-1"
                            variants={formItemVariants}
                        >
                            <label
                                htmlFor="whyAttend"
                                className="block text-sm font-medium text-[rgb(var(--mesa-grey))]"
                            >
                                Why do you want to attend our hackathon?
                                (100-300 words)
                            </label>
                            <motion.textarea
                                id="whyAttend"
                                name="whyAttend"
                                value={formData.whyAttend}
                                onChange={handleChange}
                                placeholder="Tell us why you're interested in participating, what you hope to learn, and what you might build..."
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))] min-h-[120px]"
                                whileFocus={{ scale: 1.01 }}
                            />
                            <div className="flex justify-between items-center mt-1">
                                <div>
                                    {errors.whyAttend && (
                                        <p className="text-[rgb(var(--mesa-warm-red))] text-xs">
                                            {errors.whyAttend}
                                        </p>
                                    )}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {
                                        formData.whyAttend
                                            .trim()
                                            .split(/\s+/)
                                            .filter(Boolean).length
                                    }
                                    /
                                    <span
                                        className={`${
                                            formData.whyAttend
                                                .trim()
                                                .split(/\s+/)
                                                .filter(Boolean).length < 100 ||
                                            formData.whyAttend
                                                .trim()
                                                .split(/\s+/)
                                                .filter(Boolean).length > 300
                                                ? "text-[rgb(var(--mesa-warm-red))]"
                                                : "text-green-600"
                                        }`}
                                    >
                                        100-300
                                    </span>{" "}
                                    words
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Step 3: Optional Demographics */}
                {currentStep === 3 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-[rgb(var(--mesa-warm-red))]">
                            Optional Demographics
                        </h2>

                        <motion.div
                            className="p-4 mb-6 bg-blue-50 border-l-4 border-blue-500 text-blue-800 rounded"
                            variants={formItemVariants}
                        >
                            <p className="text-sm">
                                The following information helps us understand
                                who is attending our hackathon. All fields are
                                optional.
                            </p>
                        </motion.div>

                        {/* Underrepresented group */}
                        <motion.div
                            className="space-y-1"
                            variants={formItemVariants}
                        >
                            <label
                                htmlFor="isMesaStudent"
                                className="block text-sm font-medium text-[rgb(var(--mesa-grey))]"
                            >
                                Are you part of the MESA program?
                            </label>
                            <motion.select
                                id="isMesaStudent"
                                name="isMesaStudent"
                                value={formData.isMesaStudent}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
                            >
                                <option value="">Select an option</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                <option value="Not sure">Not sure</option>
                            </motion.select>
                        </motion.div>

                        {/* Dietary Restrictions */}
                        <motion.div
                            className="space-y-3"
                            variants={formItemVariants}
                        >
                            <label className="block text-sm font-medium text-[rgb(var(--mesa-grey))]">
                                Dietary Restrictions (select all that apply)
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {[
                                    "Vegetarian",
                                    "Vegan",
                                    "Gluten-free",
                                    "Kosher",
                                    "Halal",
                                    "Nut allergy",
                                    "Lactose intolerant",
                                    "None",
                                    "Other",
                                    "Prefer not to answer",
                                ].map((option) => (
                                    <div
                                        key={option}
                                        className="flex items-center"
                                    >
                                        <input
                                            id={`dietary-${option}`}
                                            type="checkbox"
                                            checked={formData.dietaryRestrictions.includes(
                                                option
                                            )}
                                            onChange={(e) =>
                                                handleCheckboxGroupChange(
                                                    "dietaryRestrictions",
                                                    option,
                                                    e.target.checked
                                                )
                                            }
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[rgb(var(--mesa-orange))]/50"
                                        />
                                        <label
                                            htmlFor={`dietary-${option}`}
                                            className="ml-2 text-sm text-gray-600"
                                        >
                                            {option}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Gender */}
                        <motion.div
                            className="space-y-1"
                            variants={formItemVariants}
                        >
                            <label
                                htmlFor="gender"
                                className="block text-sm font-medium text-[rgb(var(--mesa-grey))]"
                            >
                                Gender
                            </label>
                            <motion.select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
                            >
                                <option value="">Select an option</option>
                                <option value="Man">Man</option>
                                <option value="Woman">Woman</option>
                                <option value="Non-Binary">Non-Binary</option>
                                <option value="Prefer to self-describe">
                                    Prefer to self-describe
                                </option>
                                <option value="Prefer not to answer">
                                    Prefer not to answer
                                </option>
                            </motion.select>
                        </motion.div>

                        {/* T-shirt Size */}
                        <motion.div
                            className="space-y-1"
                            variants={formItemVariants}
                        >
                            <label
                                htmlFor="tShirtSize"
                                className="block text-sm font-medium text-[rgb(var(--mesa-grey))]"
                            >
                                T-shirt Size (US Sizes)
                            </label>
                            <motion.select
                                id="tShirtSize"
                                name="tShirtSize"
                                value={formData.tShirtSize}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
                            >
                                <option value="">Select a size</option>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="2XL">2XL</option>
                                <option value="3XL">3XL</option>
                            </motion.select>
                        </motion.div>

                        {/* More demographics fields... */}

                        {/* Field of Study */}
                        <motion.div
                            className="space-y-1"
                            variants={formItemVariants}
                        >
                            <label
                                htmlFor="fieldOfStudy"
                                className="block text-sm font-medium text-[rgb(var(--mesa-grey))]"
                            >
                                Major/Field of Study
                            </label>
                            <motion.select
                                id="fieldOfStudy"
                                name="fieldOfStudy"
                                value={formData.fieldOfStudy}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
                            >
                                <option value="">Select an option</option>
                                <option value="Computer science, computer engineering, or software engineering">
                                    Computer science, computer engineering, or
                                    software engineering
                                </option>
                                <option value="Another engineering discipline (such as civil, electrical, mechanical, etc.)">
                                    Another engineering discipline (such as
                                    civil, electrical, mechanical, etc.)
                                </option>
                                <option value="Information systems, information technology, or system administration">
                                    Information systems, information technology,
                                    or system administration
                                </option>
                                <option value="A natural science (such as biology, chemistry, physics, etc.)">
                                    A natural science (such as biology,
                                    chemistry, physics, etc.)
                                </option>
                                <option value="Mathematics or statistics">
                                    Mathematics or statistics
                                </option>
                                <option value="Web development or web design">
                                    Web development or web design
                                </option>
                                <option value="Business discipline (such as accounting, finance, marketing, etc.)">
                                    Business discipline (such as accounting,
                                    finance, marketing, etc.)
                                </option>
                                <option value="Humanities discipline (such as literature, history, philosophy, etc.)">
                                    Humanities discipline (such as literature,
                                    history, philosophy, etc.)
                                </option>
                                <option value="Social science (such as anthropology, psychology, political science, etc.)">
                                    Social science (such as anthropology,
                                    psychology, political science, etc.)
                                </option>
                                <option value="Fine arts or performing arts (such as graphic design, music, studio art, etc.)">
                                    Fine arts or performing arts (such as
                                    graphic design, music, studio art, etc.)
                                </option>
                                <option value="Health science (such as nursing, pharmacy, radiology, etc.)">
                                    Health science (such as nursing, pharmacy,
                                    radiology, etc.)
                                </option>
                                <option value="Other">Other</option>
                                <option value="Undecided / No Declared Major">
                                    Undecided / No Declared Major
                                </option>
                                <option value="My school does not offer majors / primary areas of study">
                                    My school does not offer majors / primary
                                    areas of study
                                </option>
                                <option value="Prefer not to answer">
                                    Prefer not to answer
                                </option>
                            </motion.select>
                        </motion.div>
                    </div>
                )}

                {/* Step 4: MLH */}
                {currentStep === 4 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-[rgb(var(--mesa-warm-red))]">
                            MLH Agreement
                        </h2>

                        <motion.div
                            className="p-4 mb-6 bg-blue-50 border-l-4 border-blue-500 text-blue-800 rounded"
                            variants={formItemVariants}
                        >
                            <p className="text-sm">
                                We are currently in the process of partnering
                                with MLH. The following checkboxes are for this
                                partnership. If we do not end up partnering with
                                MLH, your information will not be shared.
                            </p>
                        </motion.div>

                        {/* MLH Code of Conduct */}
                        <motion.div
                            className="space-y-2"
                            variants={formItemVariants}
                        >
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="mlhCodeOfConduct"
                                        name="mlhCodeOfConduct"
                                        type="checkbox"
                                        checked={formData.mlhCodeOfConduct}
                                        onChange={(e) => handleChange(e)}
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[rgb(var(--mesa-orange))]/50"
                                    />
                                </div>
                                <label
                                    htmlFor="mlhCodeOfConduct"
                                    className="ml-2 text-sm font-medium text-[rgb(var(--mesa-grey))]"
                                >
                                    I have read and agree to the{" "}
                                    <a
                                        href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        MLH Code of Conduct
                                    </a>
                                </label>
                            </div>
                            {errors.mlhCodeOfConduct && (
                                <p className="text-[rgb(var(--mesa-warm-red))] text-xs mt-1">
                                    {errors.mlhCodeOfConduct}
                                </p>
                            )}
                        </motion.div>

                        {/* MLH Privacy Policy and Terms */}
                        <motion.div
                            className="space-y-2"
                            variants={formItemVariants}
                        >
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="mlhPrivacyPolicy"
                                        name="mlhPrivacyPolicy"
                                        type="checkbox"
                                        checked={formData.mlhPrivacyPolicy}
                                        onChange={(e) => handleChange(e)}
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[rgb(var(--mesa-orange))]/50"
                                    />
                                </div>
                                <label
                                    htmlFor="mlhPrivacyPolicy"
                                    className="ml-2 text-sm font-medium text-[rgb(var(--mesa-grey))]"
                                >
                                    I authorize you to share my
                                    application/registration information with
                                    Major League Hacking for event
                                    administration, ranking, and MLH
                                    administration in-line with the{" "}
                                    <a
                                        href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        MLH Privacy Policy
                                    </a>
                                    . I further agree to the terms of both the{" "}
                                    <a
                                        href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        MLH Contest Terms and Conditions
                                    </a>{" "}
                                    and the{" "}
                                    <a
                                        href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        MLH Privacy Policy
                                    </a>
                                    .
                                </label>
                            </div>
                            {errors.mlhPrivacyPolicy && (
                                <p className="text-[rgb(var(--mesa-warm-red))] text-xs mt-1">
                                    {errors.mlhPrivacyPolicy}
                                </p>
                            )}
                        </motion.div>

                        {/* MLH Email Subscription */}
                        <motion.div
                            className="space-y-2"
                            variants={formItemVariants}
                        >
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="mlhEmailSubscription"
                                        name="mlhEmailSubscription"
                                        type="checkbox"
                                        checked={formData.mlhEmailSubscription}
                                        onChange={(e) => handleChange(e)}
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[rgb(var(--mesa-orange))]/50"
                                    />
                                </div>
                                <label
                                    htmlFor="mlhEmailSubscription"
                                    className="ml-2 text-sm font-medium text-[rgb(var(--mesa-grey))]"
                                >
                                    I authorize MLH to send me occasional emails
                                    about relevant events, career opportunities,
                                    and community announcements.
                                </label>
                            </div>
                        </motion.div>

                        {/* MESA Subscription */}
                        <motion.div
                            className="space-y-2"
                            variants={formItemVariants}
                        >
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="mesaSubscription"
                                        name="mesaSubscription"
                                        type="checkbox"
                                        checked={formData.mesaSubscription}
                                        onChange={(e) => handleChange(e)}
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[rgb(var(--mesa-orange))]/50"
                                    />
                                </div>
                                <label
                                    htmlFor="mesaSubscription"
                                    className="ml-2 text-sm font-medium text-[rgb(var(--mesa-grey))]"
                                >
                                    I authorize the MESA department to contact
                                    me about future opportunities, events, and
                                    program information.
                                </label>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between">
                    {currentStep > 1 && (
                        <motion.button
                            type="button"
                            onClick={handlePrevStep}
                            className="py-2.5 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400/50 shadow-sm transition-all duration-200"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            Previous
                        </motion.button>
                    )}

                    <div className="flex gap-2 ml-auto">
                        <motion.button
                            type="button"
                            onClick={handleSaveForLater}
                            disabled={isSaving}
                            className={`py-2.5 px-4 bg-white border border-[rgb(var(--mesa-orange))] text-[rgb(var(--mesa-orange))] hover:bg-[rgb(var(--mesa-orange))]/5 rounded-md focus:outline-none focus:ring-3 focus:ring-[rgb(var(--mesa-orange))]/50 shadow-sm hover:shadow-md transition-all duration-200 ${
                                isSaving ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                            variants={buttonVariants}
                            whileHover={!isSaving ? "hover" : undefined}
                            whileTap={!isSaving ? "tap" : undefined}
                        >
                            {isSaving ? "Saving..." : "Save"}
                        </motion.button>

                        {currentStep < 4 ? (
                            <motion.button
                                type="button"
                                onClick={handleNextStep}
                                className="py-2.5 px-6 bg-[rgb(var(--mesa-orange))] hover:bg-[rgb(var(--mesa-orange))]/90 text-white rounded-md focus:outline-none focus:ring-3 focus:ring-[rgb(var(--mesa-orange))]/50 shadow-md hover:shadow-lg transition-all duration-200"
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                Next
                            </motion.button>
                        ) : (
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className={`py-2.5 px-6 bg-[rgb(var(--mesa-warm-red))] hover:bg-[rgb(var(--mesa-warm-red))]/90 text-white rounded-md focus:outline-none focus:ring-3 focus:ring-[rgb(var(--mesa-warm-red))]/50 shadow-md hover:shadow-lg transition-all duration-200 ${
                                    isSubmitting
                                        ? "opacity-70 cursor-not-allowed"
                                        : ""
                                }`}
                                variants={buttonVariants}
                                whileHover={!isSubmitting ? "hover" : undefined}
                                whileTap={!isSubmitting ? "tap" : undefined}
                            >
                                {isSubmitting
                                    ? "Submitting..."
                                    : "Submit Application"}
                            </motion.button>
                        )}
                    </div>
                </div>

                {errors.general && (
                    <motion.div
                        className="mt-4 bg-[rgb(var(--mesa-warm-red))]/10 border-l-4 border-[rgb(var(--mesa-warm-red))] text-[rgb(var(--mesa-warm-red))] p-4 rounded shadow-sm"
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
            </motion.form>
        </div>
    );
}
