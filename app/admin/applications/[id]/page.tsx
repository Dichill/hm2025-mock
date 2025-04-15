"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getApplicationById, updateApplication } from "@/core/apply/api/apply";
import {
    ApplicationDto,
    ApplicationResponseDto,
    ApplicationStatus,
} from "@/core/apply/types/apply.dto";

type ApplicationDetail = ApplicationDto & Partial<ApplicationResponseDto>;

export default function ApplicationDetailPage() {
    const router = useRouter();
    const params = useParams();
    const [application, setApplication] = useState<ApplicationDetail | null>(
        null
    );
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchApplicationDetails = async () => {
            if (!params.id) return;

            try {
                setLoading(true);
                const result = await getApplicationById(params.id as string);
                setApplication(result);
            } catch (error) {
                console.error("Error fetching application details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplicationDetails();
    }, [params.id]);

    const handleBack = () => {
        router.back();
    };

    const handleStatusUpdate = async (status: ApplicationStatus) => {
        if (!application || !params.id) return;

        try {
            setUpdating(true);
            const updatedApplication = { ...application, status };
            await updateApplication(params.id as string, updatedApplication);
            setApplication(updatedApplication);
        } catch (error) {
            console.error("Error updating application status:", error);
        } finally {
            setUpdating(false);
        }
    };

    const getStatusBadgeColor = (status: ApplicationStatus) => {
        switch (status) {
            case ApplicationStatus.PENDING:
                return "bg-yellow-100 text-yellow-800";
            case ApplicationStatus.APPROVED:
                return "bg-green-100 text-green-800";
            case ApplicationStatus.REJECTED:
                return "bg-red-100 text-red-800";
            case ApplicationStatus.WAITLISTED:
                return "bg-blue-100 text-blue-800";
            case ApplicationStatus.SAVED:
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const formatBoolean = (value: boolean | undefined) => {
        if (value === undefined) return "Not provided";
        return value ? "Yes" : "No";
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-12 h-12 border-4 border-t-[rgb(var(--mesa-orange))] border-r-[rgb(var(--mesa-orange))] border-b-[rgb(var(--mesa-orange))] border-l-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!application) {
        return (
            <div className="py-6">
                <button
                    onClick={handleBack}
                    className="mb-6 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[rgb(var(--mesa-orange))] hover:bg-[rgb(var(--mesa-warm-red))] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(var(--mesa-orange))]"
                >
                    Back to Applications
                </button>
                <div className="bg-white shadow sm:rounded-lg p-6">
                    <h1 className="text-xl font-semibold text-gray-900 mb-4">
                        Application Not Found
                    </h1>
                    <p className="text-gray-600">
                        The requested application could not be found.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="py-6">
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={handleBack}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[rgb(var(--mesa-orange))] hover:bg-[rgb(var(--mesa-warm-red))] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(var(--mesa-orange))]"
                >
                    Back to Applications
                </button>
                <div className="flex gap-2">
                    <button
                        onClick={() =>
                            handleStatusUpdate(ApplicationStatus.APPROVED)
                        }
                        disabled={updating}
                        className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {updating ? "Updating..." : "Approve"}
                    </button>
                    <button
                        onClick={() =>
                            handleStatusUpdate(ApplicationStatus.WAITLISTED)
                        }
                        disabled={updating}
                        className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {updating ? "Updating..." : "Waitlist"}
                    </button>
                    <button
                        onClick={() =>
                            handleStatusUpdate(ApplicationStatus.REJECTED)
                        }
                        disabled={updating}
                        className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {updating ? "Updating..." : "Reject"}
                    </button>
                </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Application Details
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            {application.firstName} {application.lastName}
                        </p>
                    </div>
                    <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(
                            application.status as ApplicationStatus
                        )}`}
                    >
                        {application.status}
                    </span>
                </div>

                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        {/* Personal Information Section */}
                        <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-900 mb-2">
                                Personal Information
                            </dt>
                            <div className="border-b border-gray-200 mb-4"></div>
                        </div>

                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Full name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {application.firstName} {application.lastName}
                            </dd>
                        </div>

                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Email
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {application.email}
                            </dd>
                        </div>

                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Phone Number
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {application.phoneNumber || "Not provided"}
                            </dd>
                        </div>

                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Student Number
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {application.studentNumber}
                            </dd>
                        </div>

                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Age
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {application.age}
                            </dd>
                        </div>

                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Gender
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {application.gender}
                            </dd>
                        </div>

                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Country of Residence
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {application.country}
                            </dd>
                        </div>

                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                T-Shirt Size
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {application.tShirtSize}
                            </dd>
                        </div>

                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                LinkedIn URL
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {application.linkedInUrl ? (
                                    <a
                                        href={application.linkedInUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[rgb(var(--mesa-orange))] hover:underline"
                                    >
                                        {application.linkedInUrl}
                                    </a>
                                ) : (
                                    "Not provided"
                                )}
                            </dd>
                        </div>

                        {/* Education Information Section */}
                        <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-900 mb-2 mt-6">
                                Education Information
                            </dt>
                            <div className="border-b border-gray-200 mb-4"></div>
                        </div>

                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                School
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {application.school}
                            </dd>
                        </div>

                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Level of Study
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {application.levelOfStudy}
                            </dd>
                        </div>

                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Field of Study
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {application.fieldOfStudy}
                            </dd>
                        </div>

                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                First Hackathon?
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {formatBoolean(application.firstTime)}
                            </dd>
                        </div>

                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Skill Level
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {application.skillLevel}
                            </dd>
                        </div>

                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                MESA Student?
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {formatBoolean(application.isMesaStudent)}
                            </dd>
                        </div>

                        {/* Skills & Interests Section */}
                        <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-900 mb-2 mt-6">
                                Skills & Interests
                            </dt>
                            <div className="border-b border-gray-200 mb-4"></div>
                        </div>

                        <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500">
                                Primary Skills/Interests
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                <div className="flex flex-wrap gap-2">
                                    {application.primarySkills &&
                                        Array.isArray(
                                            application.primarySkills
                                        ) &&
                                        application.primarySkills.map(
                                            (skill, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                                                >
                                                    {skill}
                                                </span>
                                            )
                                        )}
                                    {(!application.primarySkills ||
                                        !Array.isArray(
                                            application.primarySkills
                                        ) ||
                                        application.primarySkills.length ===
                                            0) &&
                                        "None"}
                                </div>
                            </dd>
                        </div>

                        {application.otherSkill &&
                            Array.isArray(application.otherSkill) &&
                            application.otherSkill.length > 0 && (
                                <div className="sm:col-span-2">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Other Skills
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        <div className="flex flex-wrap gap-2">
                                            {application.otherSkill.map(
                                                (skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                                                    >
                                                        {skill}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </dd>
                                </div>
                            )}

                        {/* Essay Response Section */}
                        {application.whyAttend && (
                            <>
                                <div className="sm:col-span-2">
                                    <dt className="text-sm font-medium text-gray-900 mb-2 mt-6">
                                        Essay Response
                                    </dt>
                                    <div className="border-b border-gray-200 mb-4"></div>
                                </div>

                                <div className="sm:col-span-2">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Why do you want to attend our hackathon?
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 whitespace-pre-line bg-gray-50 p-4 rounded-lg">
                                        {application.whyAttend}
                                    </dd>
                                </div>
                            </>
                        )}

                        {/* Additional Information Section */}
                        <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-900 mb-2 mt-6">
                                Additional Information
                            </dt>
                            <div className="border-b border-gray-200 mb-4"></div>
                        </div>

                        {application.dietaryRestrictions &&
                            Array.isArray(application.dietaryRestrictions) &&
                            application.dietaryRestrictions.length > 0 && (
                                <div className="sm:col-span-2">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Dietary Restrictions
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        <div className="flex flex-wrap gap-2">
                                            {application.dietaryRestrictions.map(
                                                (restriction, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                                                    >
                                                        {restriction}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </dd>
                                </div>
                            )}

                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                MLH Code of Conduct
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {formatBoolean(application.mlhCodeOfConduct)}
                            </dd>
                        </div>

                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                MLH Privacy Policy
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {formatBoolean(application.mlhPrivacyPolicy)}
                            </dd>
                        </div>

                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                MLH Email Subscription
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {formatBoolean(
                                    application.mlhEmailSubscription
                                )}
                            </dd>
                        </div>

                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                MESA Newsletter Subscription
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {formatBoolean(application.mesaSubscription)}
                            </dd>
                        </div>

                        {/* Resume Section */}
                        {application.resumeFileName && (
                            <>
                                <div className="sm:col-span-2">
                                    <dt className="text-sm font-medium text-gray-900 mb-2 mt-6">
                                        Resume
                                    </dt>
                                    <div className="border-b border-gray-200 mb-4"></div>
                                </div>
                                <div className="sm:col-span-2">
                                    <dd className="text-sm text-gray-900">
                                        <a
                                            href={application.resumeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-[rgb(var(--mesa-orange))] hover:bg-[rgb(var(--mesa-warm-red))] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(var(--mesa-orange))]"
                                        >
                                            View Resume (
                                            {application.resumeFileName})
                                        </a>
                                    </dd>
                                </div>
                            </>
                        )}
                    </dl>
                </div>
            </div>
        </div>
    );
}
