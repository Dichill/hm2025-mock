"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import QrScanner from "qr-scanner";
import { getUserCheckinStatus } from "@/core/user/api/admin";
import { UserCheckinStatusDto } from "@/core/user/types/admin.dto";

/**
 * Admin Check-in Page Component
 * Allows admins to scan QR codes using the device camera to check in attendees
 */
export default function CheckinPage() {
    const [hasCamera, setHasCamera] = useState(false);
    const [qrScanner, setQrScanner] = useState<QrScanner | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [daySelection, setDaySelection] = useState<"day_one" | "day_two">(
        "day_one"
    );
    const [userData, setUserData] = useState<UserCheckinStatusDto | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const daySelectionRef = useRef(daySelection);

    useEffect(() => {
        daySelectionRef.current = daySelection;
        console.log("Day selection changed to:", daySelection);
    }, [daySelection]);

    useEffect(() => {
        const checkCamera = async () => {
            try {
                const hasMediaDevices = !!(
                    navigator.mediaDevices &&
                    navigator.mediaDevices.getUserMedia
                );
                setHasCamera(hasMediaDevices);

                if (hasMediaDevices && videoRef.current) {
                    await navigator.mediaDevices.getUserMedia({ video: true });
                }
            } catch (err) {
                console.error("Camera access error:", err);
                setHasCamera(false);
                setError("Camera access denied or not available");
            }
        };

        checkCamera();

        return () => {
            if (qrScanner) {
                qrScanner.stop();
                qrScanner.destroy();
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Handles user check-in process after QR scan
     * Using useCallback to ensure the function reference stays stable
     */
    const handleUserCheckin = useCallback(async (userId: string) => {
        setIsLoading(true);
        setError(null);

        const currentDay = daySelectionRef.current;
        console.log("Processing check-in for day:", currentDay);

        try {
            const checkinData = await getUserCheckinStatus(userId, currentDay);
            setUserData(checkinData);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to check in user");
            }
            setUserData(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * Initializes QR scanner when video element is available
     */
    useEffect(() => {
        if (videoRef.current && hasCamera && !qrScanner) {
            const newScanner = new QrScanner(
                videoRef.current,
                (result) => {
                    const userId = result.data;
                    if (userId) {
                        setScanResult(userId);
                        handleUserCheckin(userId);
                        newScanner.pause();
                        setTimeout(() => {
                            if (newScanner) {
                                newScanner.start();
                            }
                        }, 3000); 
                    }
                },
                {
                    highlightScanRegion: true,
                    highlightCodeOutline: true,
                    returnDetailedScanResult: true,
                }
            );

            setQrScanner(newScanner);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoRef.current, hasCamera, handleUserCheckin]);

    /**
     * Starts QR code scanning
     */
    const startScanning = () => {
        if (qrScanner) {
            qrScanner.start();
            setIsScanning(true);
            setScanResult(null);
            setUserData(null);
            setError(null);
        }
    };

    /**
     * Stops QR code scanning
     */
    const stopScanning = () => {
        if (qrScanner) {
            qrScanner.stop();
            setIsScanning(false);
        }
    };

    /**
     * Handles day selection change
     */
    const handleDayChange = (day: "day_one" | "day_two") => {
        setDaySelection(day);
        setUserData(null);
        setScanResult(null);
        setError(null);
    };

    /**
     * Renders the user data card after successful check-in
     */
    const renderUserCard = () => {
        if (!userData) return null;

        return (
            <div className="bg-white shadow-lg rounded-lg p-6 mt-6 max-w-md mx-auto animate-fadeIn">
                <div className="flex items-center mb-4">
                    <div className="h-16 w-16 rounded-full bg-[rgb(var(--mesa-orange))] flex items-center justify-center mr-4">
                        <span className="text-white text-xl font-bold">
                            {userData.full_name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </span>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">
                            {userData.full_name}
                        </h3>
                        <p className="text-gray-600">{userData.school}</p>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-2">
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <p className="text-sm text-gray-500">Major</p>
                            <p className="font-medium">
                                {userData.major || "Not specified"}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Year</p>
                            <p className="font-medium">
                                {userData.year || "Not specified"}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">T-Shirt</p>
                            <p className="font-medium">
                                {userData.t_shirt_size || "Not specified"}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Dietary Restrictions
                            </p>
                            <p className="font-medium">
                                {userData.dietary_restrictions || "None"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex flex-col">
                    <div className="flex items-center mb-2">
                        <span className="mr-2 font-medium">
                            Application Status:
                        </span>
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                userData.is_approved
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                        >
                            {userData.is_approved ? "Approved" : "REJECTED"}
                        </span>
                    </div>

                    <div className="flex items-center mb-2">
                        <span className="mr-2 font-medium">
                            Day 1 Attendance:
                        </span>
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                userData.day_one
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                        >
                            {userData.day_one ? "Checked In" : "Not Checked In"}
                        </span>
                    </div>

                    <div className="flex items-center">
                        <span className="mr-2 font-medium">
                            Day 2 Attendance:
                        </span>
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                userData.day_two
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                        >
                            {userData.day_two ? "Checked In" : "Not Checked In"}
                        </span>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p
                        className={`text-lg font-bold ${
                            !userData.is_approved
                                ? "text-red-600"
                                : daySelection === "day_one"
                                ? userData.day_one
                                    ? "text-green-600"
                                    : "text-[rgb(var(--mesa-warm-red))]"
                                : userData.day_two
                                ? "text-green-600"
                                : "text-[rgb(var(--mesa-warm-red))]"
                        }`}
                    >
                        {!userData.is_approved
                            ? "WARNING: User is not approved for the event!"
                            : daySelection === "day_one"
                            ? userData.day_one
                                ? "Already checked in for Day 1"
                                : "Successfully checked in for Day 1!"
                            : userData.day_two
                            ? "Already checked in for Day 2"
                            : "Successfully checked in for Day 2!"}
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-[rgb(var(--mesa-warm-red))]">
                Attendee Check-in
            </h1>

            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
                {!hasCamera ? (
                    <div className="text-center py-10">
                        <svg
                            className="mx-auto h-12 w-12 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            ></path>
                        </svg>
                        <h3 className="mt-2 text-xl font-medium text-gray-900">
                            Camera Not Available
                        </h3>
                        <p className="mt-1 text-gray-500">
                            Please ensure camera access is allowed for this
                            website.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 flex justify-center">
                            <div
                                className="inline-flex rounded-md shadow-sm"
                                role="group"
                            >
                                <button
                                    type="button"
                                    onClick={() => handleDayChange("day_one")}
                                    className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                                        daySelection === "day_one"
                                            ? "bg-[rgb(var(--mesa-orange))] text-white"
                                            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                                    }`}
                                >
                                    Day 1
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDayChange("day_two")}
                                    className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                                        daySelection === "day_two"
                                            ? "bg-[rgb(var(--mesa-orange))] text-white"
                                            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                                    }`}
                                >
                                    Day 2
                                </button>
                            </div>
                        </div>

                        <div className="text-center mb-4">
                            <p className="text-gray-700">
                                {isScanning
                                    ? `Scanning for QR code (${
                                          daySelection === "day_one"
                                              ? "Day 1"
                                              : "Day 2"
                                      })...`
                                    : "Click 'Start Scanning' to begin"}
                            </p>
                        </div>

                        <div className="flex justify-center mb-6">
                            {isScanning ? (
                                <button
                                    onClick={stopScanning}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                                >
                                    Stop Scanning
                                </button>
                            ) : (
                                <button
                                    onClick={startScanning}
                                    className="px-4 py-2 bg-[rgb(var(--mesa-warm-red))] text-white rounded-md hover:bg-[rgb(var(--mesa-orange))] transition-colors"
                                >
                                    Start Scanning
                                </button>
                            )}
                        </div>

                        <div
                            className={`relative ${
                                isScanning ? "block" : "hidden"
                            }`}
                        >
                            <div className="aspect-video max-w-lg mx-auto overflow-hidden rounded-lg bg-black">
                                <video
                                    ref={videoRef}
                                    className="w-full h-full object-cover"
                                ></video>
                            </div>
                            <div className="absolute inset-0 border-2 border-[rgb(var(--mesa-orange))] border-dashed pointer-events-none rounded-lg opacity-50"></div>
                        </div>

                        {isLoading && (
                            <div className="text-center py-6">
                                <div className="w-12 h-12 border-4 border-t-[rgb(var(--mesa-orange))] border-r-[rgb(var(--mesa-orange))] border-b-[rgb(var(--mesa-orange))] border-l-transparent rounded-full animate-spin mx-auto"></div>
                                <p className="mt-2 text-gray-600">
                                    Processing check-in for{" "}
                                    {daySelection === "day_one"
                                        ? "Day 1"
                                        : "Day 2"}
                                    ...
                                </p>
                            </div>
                        )}

                        {error && (
                            <div
                                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mt-6"
                                role="alert"
                            >
                                <strong className="font-bold">Error: </strong>
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}

                        {userData && renderUserCard()}

                        {scanResult && !userData && !isLoading && !error && (
                            <div className="text-center mt-4">
                                <p className="text-sm text-gray-500">
                                    Scanned User ID:
                                </p>
                                <p className="font-mono text-xs bg-gray-100 p-2 rounded">
                                    {scanResult}
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
