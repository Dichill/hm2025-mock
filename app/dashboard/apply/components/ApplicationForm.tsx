"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    ApplicationDto,
    School,
    Gender,
    TShirtSize,
    FieldOfStudy,
    SkillLevel,
    ApplicationStatus,
} from "@/core/apply/types/apply.dto";
import {
    createApplication,
    saveApplication,
    getCurrentApplication,
    updateApplication,
} from "@/core/apply/api/apply";
import { updateProfile } from "@/core/user/api/profile";
import { UserProfileDto } from "@/core/user/types/profile.dto";
import { applicationClient } from "@/api/application-client";

type FormErrors = Partial<Record<keyof FormData, string>> & {
    general?: string;
};

type FormData = ApplicationDto & {
    resumeFile: File | null;
    resumeUrl?: string;
    resumeFileName?: string;
};

export function ApplicationForm() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [saveModalMessage, setSaveModalMessage] = useState("");
    const [saveModalType, setSaveModalType] = useState<"success" | "error">(
        "success"
    );
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        age: "",
        studentNumber: "",
        school: School.EAST_LA_COLLEGE,
        country: "",
        linkedInUrl: "",
        mlhCodeOfConduct: false,
        mlhPrivacyPolicy: false,
        mlhEmailSubscription: false,
        mesaSubscription: true,
        dietaryRestrictions: [],
        isMesaStudent: false,
        gender: Gender.PREFER_NOT_TO_SAY,
        tShirtSize: TShirtSize.M,
        fieldOfStudy: FieldOfStudy.OTHER,
        whyAttend: "",
        firstTime: false,
        skillLevel: SkillLevel.BEGINNER,
        primarySkills: [],
        otherSkill: [],
        resumeFile: null,
        resumeUrl: "",
        resumeFileName: "",
        levelOfStudy: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [savedApplicationId, setSavedApplicationId] = useState<string | null>(
        null
    );

    useEffect(() => {
        const loadSavedApplication = async () => {
            try {
                setIsLoading(true);
                const savedApp = await getCurrentApplication();

                console.log("savedApp", savedApp);

                if (savedApp) {
                    if (
                        savedApp.status === ApplicationStatus.APPROVED ||
                        savedApp.status === ApplicationStatus.REJECTED ||
                        savedApp.status === ApplicationStatus.WAITLISTED
                    ) {
                        router.push("/dashboard");
                        return;
                    }

                    if (savedApp.status === ApplicationStatus.PENDING) {
                        router.push("/dashboard/application/view");
                        return;
                    }

                    if (savedApp.status === ApplicationStatus.SAVED) {
                        setSavedApplicationId(savedApp.id);

                        if (savedApp) {
                            const appData = savedApp as unknown as FormData;

                            // Parse JSONB fields if they are strings
                            const dietaryRestrictions =
                                typeof appData.dietaryRestrictions === "string"
                                    ? JSON.parse(
                                          appData.dietaryRestrictions as unknown as string
                                      )
                                    : appData.dietaryRestrictions || [];

                            const primarySkills =
                                typeof appData.primarySkills === "string"
                                    ? JSON.parse(
                                          appData.primarySkills as unknown as string
                                      )
                                    : appData.primarySkills || [];

                            setFormData((prevData) => ({
                                ...prevData,
                                firstName:
                                    appData.firstName || prevData.firstName,
                                lastName: appData.lastName || prevData.lastName,
                                email: appData.email || prevData.email,
                                phoneNumber:
                                    appData.phoneNumber || prevData.phoneNumber,
                                age: appData.age || prevData.age,
                                studentNumber:
                                    appData.studentNumber ||
                                    prevData.studentNumber,
                                school: appData.school || prevData.school,
                                country: appData.country || prevData.country,
                                linkedInUrl:
                                    appData.linkedInUrl || prevData.linkedInUrl,
                                mlhCodeOfConduct:
                                    appData.mlhCodeOfConduct !== undefined
                                        ? appData.mlhCodeOfConduct
                                        : prevData.mlhCodeOfConduct,
                                mlhPrivacyPolicy:
                                    appData.mlhPrivacyPolicy !== undefined
                                        ? appData.mlhPrivacyPolicy
                                        : prevData.mlhPrivacyPolicy,
                                mlhEmailSubscription:
                                    appData.mlhEmailSubscription !== undefined
                                        ? appData.mlhEmailSubscription
                                        : prevData.mlhEmailSubscription,
                                mesaSubscription:
                                    appData.mesaSubscription !== undefined
                                        ? appData.mesaSubscription
                                        : prevData.mesaSubscription,
                                dietaryRestrictions,
                                isMesaStudent:
                                    appData.isMesaStudent !== undefined
                                        ? appData.isMesaStudent
                                        : prevData.isMesaStudent,
                                gender: appData.gender || prevData.gender,
                                tShirtSize:
                                    appData.tShirtSize || prevData.tShirtSize,
                                fieldOfStudy:
                                    appData.fieldOfStudy ||
                                    prevData.fieldOfStudy,
                                whyAttend:
                                    appData.whyAttend || prevData.whyAttend,
                                firstTime:
                                    appData.firstTime !== undefined
                                        ? appData.firstTime
                                        : prevData.firstTime,
                                skillLevel:
                                    appData.skillLevel || prevData.skillLevel,
                                primarySkills,
                                otherSkill:
                                    appData.otherSkill || prevData.otherSkill,
                                levelOfStudy:
                                    appData.levelOfStudy ||
                                    prevData.levelOfStudy,
                                resumeFile: null,
                                resumeUrl: appData.resumeUrl || "",
                                resumeFileName: appData.resumeFileName || "",
                            }));
                        }
                    }
                }
            } catch (error) {
                console.error("Error loading saved application:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadSavedApplication();
    }, [router]);

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

        if (errors[name as keyof FormData]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleCheckboxGroupChange = (
        name: keyof FormData,
        value: string,
        checked: boolean
    ) => {
        setFormData((prev) => {
            if (name === "otherSkill") {
                return {
                    ...prev,
                    otherSkill: checked ? [value] : [],
                };
            }

            // Handle JSONB fields (primarySkills and dietaryRestrictions)
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

    const validateStep = (step: number): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        if (step === 1) {
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

            if (!formData.phoneNumber?.trim()) {
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

            if (formData.firstTime !== true && formData.firstTime !== false) {
                newErrors.firstTime =
                    "Please indicate if this is your first hackathon";
                isValid = false;
            }

            if (!formData.skillLevel) {
                newErrors.skillLevel = "Skill level is required";
                isValid = false;
            }

            const whyAttend = formData.whyAttend || "";
            const wordCount = whyAttend
                .trim()
                .split(/\s+/)
                .filter(Boolean).length;
            if (!whyAttend.trim()) {
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

        setErrors(newErrors);
        return isValid;
    };

    const handleNextStep = (e: React.MouseEvent) => {
        e.preventDefault();

        if (validateStep(currentStep)) {
            if (currentStep < 4) {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const handlePrevStep = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentStep(currentStep - 1);
    };

    const validateFileSize = (file: File | null): boolean => {
        if (!file) return true;

        // 5MB limit for PDFs and images
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

        if (file.size > MAX_FILE_SIZE) {
            setErrors((prev) => ({
                ...prev,
                resumeFile: `File size exceeds the 5MB limit. Your file is ${(
                    file.size /
                    (1024 * 1024)
                ).toFixed(2)}MB.`,
            }));
            return false;
        }

        return true;
    };

    const validateFileType = (file: File | null): boolean => {
        if (!file) return true;

        const acceptedTypes = [
            "application/pdf",
            "image/jpeg",
            "image/png",
            "image/jpg",
        ];

        if (!acceptedTypes.includes(file.type)) {
            setErrors((prev) => ({
                ...prev,
                resumeFile: "Only PDF, JPEG, and PNG files are allowed.",
            }));
            return false;
        }

        return true;
    };

    const handleSaveForLater = async () => {
        setIsSaving(true);

        try {
            // Initialize with all required fields with non-null values
            const partialApplicationData: Partial<ApplicationDto> = {
                firstName: formData.firstName || "",
                lastName: formData.lastName || "",
                email: formData.email || "",
                phoneNumber: formData.phoneNumber || "",
                age: formData.age || "",
                studentNumber: formData.studentNumber || "",
                school: formData.school || "",
                country: formData.country || "",
                linkedInUrl: formData.linkedInUrl || "",
                mlhCodeOfConduct: Boolean(formData.mlhCodeOfConduct),
                mlhPrivacyPolicy: Boolean(formData.mlhPrivacyPolicy),
                mlhEmailSubscription: Boolean(formData.mlhEmailSubscription),
                mesaSubscription: Boolean(formData.mesaSubscription),
                dietaryRestrictions: Array.isArray(formData.dietaryRestrictions)
                    ? formData.dietaryRestrictions
                    : [],
                isMesaStudent: Boolean(formData.isMesaStudent),
                gender: formData.gender || "",
                tShirtSize: formData.tShirtSize || "",
                fieldOfStudy: formData.fieldOfStudy || "",
                whyAttend: formData.whyAttend || "",
                firstTime: Boolean(formData.firstTime),
                skillLevel: formData.skillLevel || "",
                primarySkills: Array.isArray(formData.primarySkills)
                    ? formData.primarySkills
                    : [],
                otherSkill: Array.isArray(formData.otherSkill)
                    ? formData.otherSkill
                    : [],
                levelOfStudy: formData.levelOfStudy || "",
                updated_at: new Date().toISOString(),
            };

            // Log the data being sent to help debug
            console.log(
                "Saving application data:",
                JSON.stringify(partialApplicationData)
            );

            // Explicitly ensure we have values for fields with known constraint issues
            // For array fields, ensure they have at least one element
            if (
                !partialApplicationData.primarySkills ||
                !partialApplicationData.primarySkills.length
            ) {
                partialApplicationData.primarySkills = ["None"];
            }

            if (
                !partialApplicationData.dietaryRestrictions ||
                !partialApplicationData.dietaryRestrictions.length
            ) {
                partialApplicationData.dietaryRestrictions = ["None"];
            }

            if (
                !partialApplicationData.otherSkill ||
                !partialApplicationData.otherSkill.length
            ) {
                partialApplicationData.otherSkill = ["None"];
            }

            // Ensure string fields are non-empty
            if (!partialApplicationData.levelOfStudy) {
                partialApplicationData.levelOfStudy = "Not specified";
            }

            if (!partialApplicationData.firstName) {
                partialApplicationData.firstName = "Not specified";
            }

            if (!partialApplicationData.lastName) {
                partialApplicationData.lastName = "Not specified";
            }

            let response;
            if (savedApplicationId) {
                console.log(
                    "Updating application with ID:",
                    savedApplicationId
                );
                response = await updateApplication(
                    savedApplicationId,
                    partialApplicationData as ApplicationDto,
                    formData.resumeFile || undefined
                );
            } else {
                console.log("Creating new saved application");
                response = await saveApplication(
                    partialApplicationData,
                    formData.resumeFile || undefined
                );
                if (response && response.id) {
                    console.log("Setting saved application ID:", response.id);
                    setSavedApplicationId(response.id);
                } else {
                    console.error(
                        "No application ID returned from save operation",
                        response
                    );
                }
            }

            // Set resumeUrl from the response if available
            if (
                response &&
                typeof response === "object" &&
                "resumeUrl" in response &&
                response.resumeUrl
            ) {
                setFormData((prev) => ({
                    ...prev,
                    resumeUrl: response.resumeUrl as string,
                    resumeFileName:
                        formData.resumeFileName ||
                        formData.resumeFile?.name ||
                        getFileNameFromUrl(response.resumeUrl as string),
                }));
            }

            console.log("Application saved:", response);

            // Show success modal
            setSaveModalType("success");
            setSaveModalMessage(
                "Your application has been saved successfully!"
            );
            setShowSaveModal(true);
        } catch (error) {
            console.error("Error saving application:", error);
            setErrors({
                ...errors,
                general: "Failed to save application. Please try again.",
            });

            // Show error modal
            setSaveModalType("error");
            setSaveModalMessage(
                "Failed to save your application. Please try again."
            );
            setShowSaveModal(true);
        } finally {
            setIsSaving(false);
        }
    };

    // Extract filename from URL
    const getFileNameFromUrl = (url: string): string => {
        try {
            const urlParts = url.split("/");
            const fileName = urlParts[urlParts.length - 1];
            // Remove the random numbers prefix and underscore if present (e.g., 1744689292271_)
            return fileName.includes("_")
                ? fileName.split("_").slice(1).join("_")
                : fileName;
        } catch {
            return "Uploaded resume";
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateStep(currentStep)) {
            return;
        }

        setIsSubmitting(true);

        try {
            const applicationData: ApplicationDto = {
                firstName: formData.firstName || "Not specified",
                lastName: formData.lastName || "Not specified",
                email: formData.email || "",
                phoneNumber: formData.phoneNumber || "",
                age: formData.age || "",
                studentNumber: formData.studentNumber || "",
                school: formData.school || "",
                isMesaStudent: Boolean(formData.isMesaStudent),
                country: formData.country || "",
                linkedInUrl: formData.linkedInUrl || "",
                gender: formData.gender || "",
                tShirtSize: formData.tShirtSize || "",
                fieldOfStudy: formData.fieldOfStudy || "",
                firstTime: Boolean(formData.firstTime),
                skillLevel: formData.skillLevel || "",
                primarySkills: Array.isArray(formData.primarySkills)
                    ? formData.primarySkills
                    : ["None"],
                whyAttend: formData.whyAttend || "",
                otherSkill: Array.isArray(formData.otherSkill)
                    ? formData.otherSkill
                    : ["None"],
                dietaryRestrictions: Array.isArray(formData.dietaryRestrictions)
                    ? formData.dietaryRestrictions
                    : ["None"],
                mlhCodeOfConduct: Boolean(formData.mlhCodeOfConduct),
                mlhPrivacyPolicy: Boolean(formData.mlhPrivacyPolicy),
                mlhEmailSubscription: Boolean(formData.mlhEmailSubscription),
                mesaSubscription: Boolean(formData.mesaSubscription),
                levelOfStudy: formData.levelOfStudy || "Not specified",
            };

            // Log the data being submitted
            console.log(
                "Submitting application data:",
                JSON.stringify(applicationData)
            );

            const profileData: Partial<UserProfileDto> = {
                full_name:
                    `${formData.firstName || ""} ${
                        formData.lastName || ""
                    }`.trim() || "Not specified",
                school: formData.school || "",
                major: formData.fieldOfStudy || "",
                year: formData.levelOfStudy || "",
                dietary_restrictions: Array.isArray(
                    formData.dietaryRestrictions
                )
                    ? formData.dietaryRestrictions.join(", ")
                    : "",
                t_shirt_size: formData.tShirtSize || "",
            };

            let applicationResponse;
            let appId = savedApplicationId;

            // Create new application if no saved ID exists
            if (!appId) {
                console.log("Creating new application");
                applicationResponse = await createApplication(
                    applicationData,
                    formData.resumeFile || undefined
                );
                if (applicationResponse && applicationResponse.id) {
                    appId = applicationResponse.id;
                    console.log("New application created with ID:", appId);
                }
            } else {
                // Update existing application
                console.log("Updating existing application with ID:", appId);
                applicationResponse = await updateApplication(
                    appId,
                    applicationData,
                    formData.resumeFile || undefined
                );
            }

            // Verify we have a valid application ID before proceeding
            if (!appId) {
                console.error("No valid application ID after save/create");
                throw new Error("Failed to get valid application ID");
            }

            // Update application status to PENDING
            console.log(
                "Updating application status to PENDING for ID:",
                appId
            );
            const statusFormData = new FormData();
            statusFormData.append("status", ApplicationStatus.PENDING);

            await applicationClient.patch(
                `/applications/${appId}`,
                statusFormData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const profileResponse = await updateProfile(profileData);

            console.log("Application submitted:", applicationResponse);
            console.log("Profile updated:", profileResponse);

            router.push("/dashboard?application=success");
        } catch (error) {
            console.error("Error submitting application:", error);
            setErrors({
                ...errors,
                general: "Failed to submit application. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "firstTime" || name === "isMesaStudent") {
            setFormData((prev) => ({
                ...prev,
                [name]: value === "Yes",
            }));

            // Reset validation error if any
            if (errors[name as keyof FormErrors]) {
                setErrors((prev) => ({
                    ...prev,
                    [name]: "",
                }));
            }
        } else {
            handleChange(e);
        }
    };

    // Modal component for save notifications
    const SaveAlertModal = () => {
        return (
            <AnimatePresence>
                {showSaveModal && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowSaveModal(false)}
                    >
                        <motion.div
                            className={`relative bg-white rounded-lg p-6 shadow-xl max-w-md mx-4 ${
                                saveModalType === "success"
                                    ? "border-l-4 border-green-500"
                                    : "border-l-4 border-[rgb(var(--mesa-warm-red))]"
                            }`}
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 300,
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-start mb-4">
                                {saveModalType === "success" ? (
                                    <div className="flex-shrink-0 mr-3">
                                        <svg
                                            className="h-6 w-6 text-green-500"
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
                                    </div>
                                ) : (
                                    <div className="flex-shrink-0 mr-3">
                                        <svg
                                            className="h-6 w-6 text-[rgb(var(--mesa-warm-red))]"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h3
                                        className={`text-lg font-medium ${
                                            saveModalType === "success"
                                                ? "text-green-700"
                                                : "text-[rgb(var(--mesa-warm-red))]"
                                        }`}
                                    >
                                        {saveModalType === "success"
                                            ? "Saved Successfully"
                                            : "Error"}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-600">
                                        {saveModalMessage}
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
                                        saveModalType === "success"
                                            ? "bg-green-500 hover:bg-green-600"
                                            : "bg-[rgb(var(--mesa-warm-red))] hover:bg-[rgb(var(--mesa-warm-red))]/90"
                                    } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                        saveModalType === "success"
                                            ? "focus:ring-green-500"
                                            : "focus:ring-[rgb(var(--mesa-warm-red))]"
                                    }`}
                                    onClick={() => setShowSaveModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        );
    };

    if (isLoading) {
        return (
            <div className="bg-white shadow-xl rounded-lg overflow-hidden p-8 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <svg
                        className="animate-spin h-10 w-10 text-[rgb(var(--mesa-orange))] mx-auto mb-4"
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
                    <p className="text-lg font-medium text-gray-700">
                        Loading your application...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            {/* Save Alert Modal */}
            <SaveAlertModal />

            {/* Editing Saved Application Badge */}
            {savedApplicationId && (
                <div className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 text-center">
                    You Are Editing Your Saved Application
                </div>
            )}

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
                                <option value={School.EAST_LA_COLLEGE}>
                                    East Los Angeles College
                                </option>
                                <option value={School.LA_CITY_COLLEGE}>
                                    Los Angeles City College
                                </option>
                                <option value={School.LA_HARBOR_COLLEGE}>
                                    Los Angeles Harbor College
                                </option>
                                <option value={School.LA_MISSION_COLLEGE}>
                                    Los Angeles Mission College
                                </option>
                                <option value={School.LA_PIERCE_COLLEGE}>
                                    Los Angeles Pierce College
                                </option>
                                <option value={School.LA_SOUTHWEST_COLLEGE}>
                                    Los Angeles Southwest College
                                </option>
                                <option value={School.LA_TRADE_TECH_COLLEGE}>
                                    Los Angeles Trade-Technical College
                                </option>
                                <option value={School.LA_VALLEY_COLLEGE}>
                                    Los Angeles Valley College
                                </option>
                                <option value={School.WEST_LA_COLLEGE}>
                                    West Los Angeles College
                                </option>
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
                                <option value="Afghanistan" data-code="AF">
                                    Afghanistan
                                </option>{" "}
                                <option value="Åland Islands" data-code="AX">
                                    Åland Islands
                                </option>{" "}
                                <option value="Albania" data-code="AL">
                                    Albania
                                </option>{" "}
                                <option value="Algeria" data-code="DZ">
                                    Algeria
                                </option>{" "}
                                <option value="American Samoa" data-code="AS">
                                    American Samoa
                                </option>{" "}
                                <option value="Andorra" data-code="AD">
                                    Andorra
                                </option>{" "}
                                <option value="Angola" data-code="AO">
                                    Angola
                                </option>{" "}
                                <option value="Anguilla" data-code="AI">
                                    Anguilla
                                </option>{" "}
                                <option value="Antarctica" data-code="AQ">
                                    Antarctica
                                </option>{" "}
                                <option
                                    value="Antigua and Barbuda"
                                    data-code="AG"
                                >
                                    Antigua and Barbuda
                                </option>{" "}
                                <option value="Argentina" data-code="AR">
                                    Argentina
                                </option>{" "}
                                <option value="Armenia" data-code="AM">
                                    Armenia
                                </option>{" "}
                                <option value="Aruba" data-code="AW">
                                    Aruba
                                </option>{" "}
                                <option value="Australia" data-code="AU">
                                    Australia
                                </option>{" "}
                                <option value="Austria" data-code="AT">
                                    Austria
                                </option>{" "}
                                <option value="Azerbaijan" data-code="AZ">
                                    Azerbaijan
                                </option>{" "}
                                <option value="Bahamas" data-code="BS">
                                    Bahamas
                                </option>{" "}
                                <option value="Bahrain" data-code="BH">
                                    Bahrain
                                </option>{" "}
                                <option value="Bangladesh" data-code="BD">
                                    Bangladesh
                                </option>{" "}
                                <option value="Barbados" data-code="BB">
                                    Barbados
                                </option>{" "}
                                <option value="Belarus" data-code="BY">
                                    Belarus
                                </option>{" "}
                                <option value="Belgium" data-code="BE">
                                    Belgium
                                </option>{" "}
                                <option value="Belize" data-code="BZ">
                                    Belize
                                </option>{" "}
                                <option value="Benin" data-code="BJ">
                                    Benin
                                </option>{" "}
                                <option value="Bermuda" data-code="BM">
                                    Bermuda
                                </option>{" "}
                                <option value="Bhutan" data-code="BT">
                                    Bhutan
                                </option>{" "}
                                <option value="Bolivia" data-code="BO">
                                    Bolivia
                                </option>{" "}
                                <option
                                    value="Bonaire, Sint Eustatius and Saba"
                                    data-code="BQ"
                                >
                                    Bonaire, Sint Eustatius and Saba
                                </option>{" "}
                                <option
                                    value="Bosnia and Herzegovina"
                                    data-code="BA"
                                >
                                    Bosnia and Herzegovina
                                </option>{" "}
                                <option value="Botswana" data-code="BW">
                                    Botswana
                                </option>{" "}
                                <option value="Bouvet Island" data-code="BV">
                                    Bouvet Island
                                </option>{" "}
                                <option value="Brazil" data-code="BR">
                                    Brazil
                                </option>{" "}
                                <option
                                    value="British Indian Ocean Territory"
                                    data-code="IO"
                                >
                                    British Indian Ocean Territory
                                </option>{" "}
                                <option
                                    value="Brunei Darussalam"
                                    data-code="BN"
                                >
                                    Brunei Darussalam
                                </option>{" "}
                                <option value="Bulgaria" data-code="BG">
                                    Bulgaria
                                </option>{" "}
                                <option value="Burkina Faso" data-code="BF">
                                    Burkina Faso
                                </option>{" "}
                                <option value="Burundi" data-code="BI">
                                    Burundi
                                </option>{" "}
                                <option value="Cambodia" data-code="KH">
                                    Cambodia
                                </option>{" "}
                                <option value="Cameroon" data-code="CM">
                                    Cameroon
                                </option>{" "}
                                <option value="Canada" data-code="CA">
                                    Canada
                                </option>{" "}
                                <option value="Cape Verde" data-code="CV">
                                    Cape Verde
                                </option>{" "}
                                <option value="Cayman Islands" data-code="KY">
                                    Cayman Islands
                                </option>{" "}
                                <option
                                    value="Central African Republic"
                                    data-code="CF"
                                >
                                    Central African Republic
                                </option>{" "}
                                <option value="Chad" data-code="TD">
                                    Chad
                                </option>{" "}
                                <option value="Chile" data-code="CL">
                                    Chile
                                </option>{" "}
                                <option value="China" data-code="CN">
                                    China
                                </option>{" "}
                                <option value="Christmas Island" data-code="CX">
                                    Christmas Island
                                </option>{" "}
                                <option
                                    value="Cocos (Keeling) Islands"
                                    data-code="CC"
                                >
                                    Cocos (Keeling) Islands
                                </option>{" "}
                                <option value="Colombia" data-code="CO">
                                    Colombia
                                </option>{" "}
                                <option value="Comoros" data-code="KM">
                                    Comoros
                                </option>{" "}
                                <option value="Congo" data-code="CG">
                                    Congo
                                </option>{" "}
                                <option
                                    value="Congo, Democratic Republic of the"
                                    data-code="CD"
                                >
                                    Congo, Democratic Republic of the
                                </option>{" "}
                                <option value="Cook Islands" data-code="CK">
                                    Cook Islands
                                </option>{" "}
                                <option value="Costa Rica" data-code="CR">
                                    Costa Rica
                                </option>{" "}
                                <option value="Croatia" data-code="HR">
                                    Croatia
                                </option>{" "}
                                <option value="Cuba" data-code="CU">
                                    Cuba
                                </option>{" "}
                                <option value="Curaçao" data-code="CW">
                                    Curaçao
                                </option>{" "}
                                <option value="Cyprus" data-code="CY">
                                    Cyprus
                                </option>{" "}
                                <option value="Czech Republic" data-code="CZ">
                                    Czech Republic
                                </option>{" "}
                                <option value="Denmark" data-code="DK">
                                    Denmark
                                </option>{" "}
                                <option value="Djibouti" data-code="DJ">
                                    Djibouti
                                </option>{" "}
                                <option value="Dominica" data-code="DM">
                                    Dominica
                                </option>{" "}
                                <option
                                    value="Dominican Republic"
                                    data-code="DO"
                                >
                                    Dominican Republic
                                </option>{" "}
                                <option value="Ecuador" data-code="EC">
                                    Ecuador
                                </option>{" "}
                                <option value="Egypt" data-code="EG">
                                    Egypt
                                </option>{" "}
                                <option value="El Salvador" data-code="SV">
                                    El Salvador
                                </option>{" "}
                                <option
                                    value="Equatorial Guinea"
                                    data-code="GQ"
                                >
                                    Equatorial Guinea
                                </option>{" "}
                                <option value="Eritrea" data-code="ER">
                                    Eritrea
                                </option>{" "}
                                <option value="Estonia" data-code="EE">
                                    Estonia
                                </option>{" "}
                                <option value="Eswatini" data-code="SZ">
                                    Eswatini
                                </option>{" "}
                                <option value="Ethiopia" data-code="ET">
                                    Ethiopia
                                </option>{" "}
                                <option
                                    value="Falkland Islands (Malvinas)"
                                    data-code="FK"
                                >
                                    Falkland Islands (Malvinas)
                                </option>{" "}
                                <option value="Faroe Islands" data-code="FO">
                                    Faroe Islands
                                </option>{" "}
                                <option value="Fiji" data-code="FJ">
                                    Fiji
                                </option>{" "}
                                <option value="Finland" data-code="FI">
                                    Finland
                                </option>{" "}
                                <option value="France" data-code="FR">
                                    France
                                </option>{" "}
                                <option value="French Guiana" data-code="GF">
                                    French Guiana
                                </option>{" "}
                                <option value="French Polynesia" data-code="PF">
                                    French Polynesia
                                </option>{" "}
                                <option
                                    value="French Southern Territories"
                                    data-code="TF"
                                >
                                    French Southern Territories
                                </option>{" "}
                                <option value="Gabon" data-code="GA">
                                    Gabon
                                </option>{" "}
                                <option value="Gambia" data-code="GM">
                                    Gambia
                                </option>{" "}
                                <option value="Georgia" data-code="GE">
                                    Georgia
                                </option>{" "}
                                <option value="Germany" data-code="DE">
                                    Germany
                                </option>{" "}
                                <option value="Ghana" data-code="GH">
                                    Ghana
                                </option>{" "}
                                <option value="Gibraltar" data-code="GI">
                                    Gibraltar
                                </option>{" "}
                                <option value="Greece" data-code="GR">
                                    Greece
                                </option>{" "}
                                <option value="Greenland" data-code="GL">
                                    Greenland
                                </option>{" "}
                                <option value="Grenada" data-code="GD">
                                    Grenada
                                </option>{" "}
                                <option value="Guadeloupe" data-code="GP">
                                    Guadeloupe
                                </option>{" "}
                                <option value="Guam" data-code="GU">
                                    Guam
                                </option>{" "}
                                <option value="Guatemala" data-code="GT">
                                    Guatemala
                                </option>{" "}
                                <option value="Guernsey" data-code="GG">
                                    Guernsey
                                </option>{" "}
                                <option value="Guinea" data-code="GN">
                                    Guinea
                                </option>{" "}
                                <option value="Guinea-Bissau" data-code="GW">
                                    Guinea-Bissau
                                </option>{" "}
                                <option value="Guyana" data-code="GY">
                                    Guyana
                                </option>{" "}
                                <option value="Haiti" data-code="HT">
                                    Haiti
                                </option>{" "}
                                <option
                                    value="Heard Island and McDonald Islands"
                                    data-code="HM"
                                >
                                    Heard Island and McDonald Islands
                                </option>{" "}
                                <option value="Honduras" data-code="HN">
                                    Honduras
                                </option>{" "}
                                <option value="Hong Kong" data-code="HK">
                                    Hong Kong
                                </option>{" "}
                                <option value="Hungary" data-code="HU">
                                    Hungary
                                </option>{" "}
                                <option value="Iceland" data-code="IS">
                                    Iceland
                                </option>{" "}
                                <option value="India" data-code="IN">
                                    India
                                </option>{" "}
                                <option value="Indonesia" data-code="ID">
                                    Indonesia
                                </option>{" "}
                                <option value="Iran" data-code="IR">
                                    Iran
                                </option>{" "}
                                <option value="Iraq" data-code="IQ">
                                    Iraq
                                </option>{" "}
                                <option value="Ireland" data-code="IE">
                                    Ireland
                                </option>{" "}
                                <option value="Isle of Man" data-code="IM">
                                    Isle of Man
                                </option>{" "}
                                <option value="Israel" data-code="IL">
                                    Israel
                                </option>{" "}
                                <option value="Italy" data-code="IT">
                                    Italy
                                </option>{" "}
                                <option value="Jamaica" data-code="JM">
                                    Jamaica
                                </option>{" "}
                                <option value="Jersey" data-code="JE">
                                    Jersey
                                </option>{" "}
                                <option value="Jordan" data-code="JO">
                                    Jordan
                                </option>{" "}
                                <option value="Kazakhstan" data-code="KZ">
                                    Kazakhstan
                                </option>{" "}
                                <option value="Kenya" data-code="KE">
                                    Kenya
                                </option>{" "}
                                <option value="Kiribati" data-code="KI">
                                    Kiribati
                                </option>{" "}
                                <option
                                    value="Korea, Democratic People's Republic of"
                                    data-code="KP"
                                >
                                    Korea, Democratic People&apos;s Republic of
                                </option>{" "}
                                <option
                                    value="Korea, Republic of"
                                    data-code="KR"
                                >
                                    Korea, Republic of
                                </option>{" "}
                                <option value="Kuwait" data-code="KW">
                                    Kuwait
                                </option>{" "}
                                <option value="Kyrgyzstan" data-code="KG">
                                    Kyrgyzstan
                                </option>{" "}
                                <option
                                    value="Lao People's Democratic Republic"
                                    data-code="LA"
                                >
                                    Lao People&apos;s Democratic Republic
                                </option>{" "}
                                <option value="Latvia" data-code="LV">
                                    Latvia
                                </option>{" "}
                                <option value="Lebanon" data-code="LB">
                                    Lebanon
                                </option>{" "}
                                <option value="Lesotho" data-code="LS">
                                    Lesotho
                                </option>{" "}
                                <option value="Liberia" data-code="LR">
                                    Liberia
                                </option>{" "}
                                <option value="Libya" data-code="LY">
                                    Libya
                                </option>{" "}
                                <option value="Liechtenstein" data-code="LI">
                                    Liechtenstein
                                </option>{" "}
                                <option value="Lithuania" data-code="LT">
                                    Lithuania
                                </option>{" "}
                                <option value="Luxembourg" data-code="LU">
                                    Luxembourg
                                </option>{" "}
                                <option value="Macao" data-code="MO">
                                    Macao
                                </option>{" "}
                                <option value="Madagascar" data-code="MG">
                                    Madagascar
                                </option>{" "}
                                <option value="Malawi" data-code="MW">
                                    Malawi
                                </option>{" "}
                                <option value="Malaysia" data-code="MY">
                                    Malaysia
                                </option>{" "}
                                <option value="Maldives" data-code="MV">
                                    Maldives
                                </option>{" "}
                                <option value="Mali" data-code="ML">
                                    Mali
                                </option>{" "}
                                <option value="Malta" data-code="MT">
                                    Malta
                                </option>{" "}
                                <option value="Marshall Islands" data-code="MH">
                                    Marshall Islands
                                </option>{" "}
                                <option value="Martinique" data-code="MQ">
                                    Martinique
                                </option>{" "}
                                <option value="Mauritania" data-code="MR">
                                    Mauritania
                                </option>{" "}
                                <option value="Mauritius" data-code="MU">
                                    Mauritius
                                </option>{" "}
                                <option value="Mayotte" data-code="YT">
                                    Mayotte
                                </option>{" "}
                                <option value="Mexico" data-code="MX">
                                    Mexico
                                </option>{" "}
                                <option
                                    value="Micronesia, Federated States of"
                                    data-code="FM"
                                >
                                    Micronesia, Federated States of
                                </option>{" "}
                                <option
                                    value="Moldova, Republic of"
                                    data-code="MD"
                                >
                                    Moldova, Republic of
                                </option>{" "}
                                <option value="Monaco" data-code="MC">
                                    Monaco
                                </option>{" "}
                                <option value="Mongolia" data-code="MN">
                                    Mongolia
                                </option>{" "}
                                <option value="Montenegro" data-code="ME">
                                    Montenegro
                                </option>{" "}
                                <option value="Montserrat" data-code="MS">
                                    Montserrat
                                </option>{" "}
                                <option value="Morocco" data-code="MA">
                                    Morocco
                                </option>{" "}
                                <option value="Mozambique" data-code="MZ">
                                    Mozambique
                                </option>{" "}
                                <option value="Myanmar" data-code="MM">
                                    Myanmar
                                </option>{" "}
                                <option value="Namibia" data-code="NA">
                                    Namibia
                                </option>{" "}
                                <option value="Nauru" data-code="NR">
                                    Nauru
                                </option>{" "}
                                <option value="Nepal" data-code="NP">
                                    Nepal
                                </option>{" "}
                                <option value="Netherlands" data-code="NL">
                                    Netherlands
                                </option>{" "}
                                <option value="New Caledonia" data-code="NC">
                                    New Caledonia
                                </option>{" "}
                                <option value="New Zealand" data-code="NZ">
                                    New Zealand
                                </option>{" "}
                                <option value="Nicaragua" data-code="NI">
                                    Nicaragua
                                </option>{" "}
                                <option value="Niger" data-code="NE">
                                    Niger
                                </option>{" "}
                                <option value="Nigeria" data-code="NG">
                                    Nigeria
                                </option>{" "}
                                <option value="Niue" data-code="NU">
                                    Niue
                                </option>{" "}
                                <option value="Norfolk Island" data-code="NF">
                                    Norfolk Island
                                </option>{" "}
                                <option value="North Macedonia" data-code="MK">
                                    North Macedonia
                                </option>{" "}
                                <option
                                    value="Northern Mariana Islands"
                                    data-code="MP"
                                >
                                    Northern Mariana Islands
                                </option>{" "}
                                <option value="Norway" data-code="NO">
                                    Norway
                                </option>{" "}
                                <option value="Oman" data-code="OM">
                                    Oman
                                </option>{" "}
                                <option value="Pakistan" data-code="PK">
                                    Pakistan
                                </option>{" "}
                                <option value="Palau" data-code="PW">
                                    Palau
                                </option>{" "}
                                <option
                                    value="Palestine, State of"
                                    data-code="PS"
                                >
                                    Palestine, State of
                                </option>{" "}
                                <option value="Panama" data-code="PA">
                                    Panama
                                </option>{" "}
                                <option value="Papua New Guinea" data-code="PG">
                                    Papua New Guinea
                                </option>{" "}
                                <option value="Paraguay" data-code="PY">
                                    Paraguay
                                </option>{" "}
                                <option value="Peru" data-code="PE">
                                    Peru
                                </option>{" "}
                                <option value="Philippines" data-code="PH">
                                    Philippines
                                </option>{" "}
                                <option value="Pitcairn" data-code="PN">
                                    Pitcairn
                                </option>{" "}
                                <option value="Poland" data-code="PL">
                                    Poland
                                </option>{" "}
                                <option value="Portugal" data-code="PT">
                                    Portugal
                                </option>{" "}
                                <option value="Puerto Rico" data-code="PR">
                                    Puerto Rico
                                </option>{" "}
                                <option value="Qatar" data-code="QA">
                                    Qatar
                                </option>{" "}
                                <option value="Réunion" data-code="RE">
                                    Réunion
                                </option>{" "}
                                <option value="Romania" data-code="RO">
                                    Romania
                                </option>{" "}
                                <option
                                    value="Russian Federation"
                                    data-code="RU"
                                >
                                    Russian Federation
                                </option>{" "}
                                <option value="Rwanda" data-code="RW">
                                    Rwanda
                                </option>{" "}
                                <option value="Saint Barthélemy" data-code="BL">
                                    Saint Barthélemy
                                </option>{" "}
                                <option
                                    value="Saint Helena, Ascension and Tristan da Cunha"
                                    data-code="SH"
                                >
                                    Saint Helena, Ascension and Tristan da Cunha
                                </option>{" "}
                                <option
                                    value="Saint Kitts and Nevis"
                                    data-code="KN"
                                >
                                    Saint Kitts and Nevis
                                </option>{" "}
                                <option value="Saint Lucia" data-code="LC">
                                    Saint Lucia
                                </option>{" "}
                                <option
                                    value="Saint Martin (French part)"
                                    data-code="MF"
                                >
                                    Saint Martin (French part)
                                </option>{" "}
                                <option
                                    value="Saint Pierre and Miquelon"
                                    data-code="PM"
                                >
                                    Saint Pierre and Miquelon
                                </option>{" "}
                                <option
                                    value="Saint Vincent and the Grenadines"
                                    data-code="VC"
                                >
                                    Saint Vincent and the Grenadines
                                </option>{" "}
                                <option value="Samoa" data-code="WS">
                                    Samoa
                                </option>{" "}
                                <option value="San Marino" data-code="SM">
                                    San Marino
                                </option>{" "}
                                <option
                                    value="Sao Tome and Principe"
                                    data-code="ST"
                                >
                                    Sao Tome and Principe
                                </option>{" "}
                                <option value="Saudi Arabia" data-code="SA">
                                    Saudi Arabia
                                </option>{" "}
                                <option value="Senegal" data-code="SN">
                                    Senegal
                                </option>{" "}
                                <option value="Serbia" data-code="RS">
                                    Serbia
                                </option>{" "}
                                <option value="Seychelles" data-code="SC">
                                    Seychelles
                                </option>{" "}
                                <option value="Sierra Leone" data-code="SL">
                                    Sierra Leone
                                </option>{" "}
                                <option value="Singapore" data-code="SG">
                                    Singapore
                                </option>{" "}
                                <option
                                    value="Sint Maarten (Dutch part)"
                                    data-code="SX"
                                >
                                    Sint Maarten (Dutch part)
                                </option>{" "}
                                <option value="Slovakia" data-code="SK">
                                    Slovakia
                                </option>{" "}
                                <option value="Slovenia" data-code="SI">
                                    Slovenia
                                </option>{" "}
                                <option value="Solomon Islands" data-code="SB">
                                    Solomon Islands
                                </option>{" "}
                                <option value="Somalia" data-code="SO">
                                    Somalia
                                </option>{" "}
                                <option value="South Africa" data-code="ZA">
                                    South Africa
                                </option>{" "}
                                <option
                                    value="South Georgia and the South Sandwich Islands"
                                    data-code="GS"
                                >
                                    South Georgia and the South Sandwich Islands
                                </option>{" "}
                                <option value="South Sudan" data-code="SS">
                                    South Sudan
                                </option>{" "}
                                <option value="Spain" data-code="ES">
                                    Spain
                                </option>{" "}
                                <option value="Sri Lanka" data-code="LK">
                                    Sri Lanka
                                </option>{" "}
                                <option value="Sudan" data-code="SD">
                                    Sudan
                                </option>{" "}
                                <option value="Suriname" data-code="SR">
                                    Suriname
                                </option>{" "}
                                <option
                                    value="Svalbard and Jan Mayen"
                                    data-code="SJ"
                                >
                                    Svalbard and Jan Mayen
                                </option>{" "}
                                <option value="Sweden" data-code="SE">
                                    Sweden
                                </option>{" "}
                                <option value="Switzerland" data-code="CH">
                                    Switzerland
                                </option>{" "}
                                <option
                                    value="Syrian Arab Republic"
                                    data-code="SY"
                                >
                                    Syrian Arab Republic
                                </option>{" "}
                                <option
                                    value="Taiwan, Province of China"
                                    data-code="TW"
                                >
                                    Taiwan, Province of China
                                </option>{" "}
                                <option value="Tajikistan" data-code="TJ">
                                    Tajikistan
                                </option>{" "}
                                <option
                                    value="Tanzania, United Republic of"
                                    data-code="TZ"
                                >
                                    Tanzania, United Republic of
                                </option>{" "}
                                <option value="Thailand" data-code="TH">
                                    Thailand
                                </option>{" "}
                                <option value="Timor-Leste" data-code="TL">
                                    Timor-Leste
                                </option>{" "}
                                <option value="Togo" data-code="TG">
                                    Togo
                                </option>{" "}
                                <option value="Tokelau" data-code="TK">
                                    Tokelau
                                </option>{" "}
                                <option value="Tonga" data-code="TO">
                                    Tonga
                                </option>{" "}
                                <option
                                    value="Trinidad and Tobago"
                                    data-code="TT"
                                >
                                    Trinidad and Tobago
                                </option>{" "}
                                <option value="Tunisia" data-code="TN">
                                    Tunisia
                                </option>{" "}
                                <option value="Turkey" data-code="TR">
                                    Turkey
                                </option>{" "}
                                <option value="Turkmenistan" data-code="TM">
                                    Turkmenistan
                                </option>{" "}
                                <option value="Tuvalu" data-code="TV">
                                    Tuvalu
                                </option>{" "}
                                <option value="Uganda" data-code="UG">
                                    Uganda
                                </option>{" "}
                                <option value="Ukraine" data-code="UA">
                                    Ukraine
                                </option>{" "}
                                <option
                                    value="United Arab Emirates"
                                    data-code="AE"
                                >
                                    United Arab Emirates
                                </option>{" "}
                                <option
                                    value="United Kingdom of Great Britain and Northern Ireland"
                                    data-code="GB"
                                >
                                    United Kingdom of Great Britain and Northern
                                    Ireland
                                </option>{" "}
                                <option
                                    value="United States of America"
                                    data-code="US"
                                >
                                    United States of America
                                </option>{" "}
                                <option value="Uruguay" data-code="UY">
                                    Uruguay
                                </option>{" "}
                                <option value="Uzbekistan" data-code="UZ">
                                    Uzbekistan
                                </option>{" "}
                                <option value="Vanuatu" data-code="VU">
                                    Vanuatu
                                </option>{" "}
                                <option
                                    value="Venezuela (Bolivarian Republic of)"
                                    data-code="VE"
                                >
                                    Venezuela (Bolivarian Republic of)
                                </option>{" "}
                                <option value="Viet Nam" data-code="VN">
                                    Viet Nam
                                </option>{" "}
                                <option value="Western Sahara" data-code="EH">
                                    Western Sahara
                                </option>{" "}
                                <option value="Yemen" data-code="YE">
                                    Yemen
                                </option>{" "}
                                <option value="Zambia" data-code="ZM">
                                    Zambia
                                </option>{" "}
                                <option value="Zimbabwe" data-code="ZW">
                                    Zimbabwe
                                </option>
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
                            <div className="flex flex-col">
                                {formData.resumeUrl ? (
                                    <div className="mb-2 p-2 bg-gray-50 border border-gray-200 rounded-md flex items-center justify-between">
                                        <div className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 mr-2 text-gray-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                />
                                            </svg>
                                            <span className="text-sm text-gray-600 truncate max-w-xs">
                                                {formData.resumeFileName ||
                                                    getFileNameFromUrl(
                                                        formData.resumeUrl
                                                    )}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    resumeFile: null,
                                                    resumeUrl: "",
                                                    resumeFileName: "",
                                                }))
                                            }
                                            className="text-gray-400 hover:text-gray-500 p-1"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
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
                                        </button>
                                    </div>
                                ) : (
                                    <motion.input
                                        id="resumeFile"
                                        name="resumeFile"
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                // Clear previous errors
                                                setErrors((prev) => ({
                                                    ...prev,
                                                    resumeFile: "",
                                                }));

                                                // Validate file size and type
                                                if (
                                                    validateFileSize(file) &&
                                                    validateFileType(file)
                                                ) {
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        resumeFile: file,
                                                        resumeFileName:
                                                            file.name,
                                                    }));
                                                }
                                            }
                                        }}
                                        className="w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200"
                                    />
                                )}
                            </div>
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
                                Upload your resume (PDF, JPG, or PNG format, max
                                5MB)
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
                                value={
                                    formData.firstTime === undefined
                                        ? ""
                                        : formData.firstTime
                                        ? "Yes"
                                        : "No"
                                }
                                onChange={handleSelect}
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
                                            checked={
                                                Array.isArray(
                                                    formData.primarySkills
                                                ) &&
                                                formData.primarySkills.includes(
                                                    skill
                                                )
                                            }
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
                                                otherSkill: [e.target.value],
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
                                        (formData.whyAttend || "")
                                            .trim()
                                            .split(/\s+/)
                                            .filter(Boolean).length
                                    }
                                    /
                                    <span
                                        className={`${
                                            (formData.whyAttend || "")
                                                .trim()
                                                .split(/\s+/)
                                                .filter(Boolean).length < 100 ||
                                            (formData.whyAttend || "")
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
                                value={
                                    formData.isMesaStudent === undefined
                                        ? ""
                                        : formData.isMesaStudent
                                        ? "Yes"
                                        : "No"
                                }
                                onChange={handleSelect}
                                className="w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
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
                                            checked={
                                                Array.isArray(
                                                    formData.dietaryRestrictions
                                                ) &&
                                                formData.dietaryRestrictions.includes(
                                                    option
                                                )
                                            }
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
                                className="w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
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
                                className="w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
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
                                className="w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
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
                            onClick={(e) => handlePrevStep(e)}
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
                                onClick={(e) => handleNextStep(e)}
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
