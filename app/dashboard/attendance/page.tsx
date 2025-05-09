"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getOwnProfile, getUserQrCode } from "@/core/user/api/profile";
import { UserProfileDto } from "@/core/user/types/profile.dto";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Attendance page component displaying user QR code for check-in
 */
export default function AttendancePage() {
    const [profile, setProfile] = useState<UserProfileDto | null>(null);
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        /**
         * Fetch user profile and QR code on component mount
         */
        async function fetchProfileAndQrCode() {
            try {
                setLoading(true);
                // Get user profile information
                const profileData = await getOwnProfile();
                setProfile(profileData);

                // Get QR code for the user
                if (profileData.user_id) {
                    const qrCodeData = await getUserQrCode(profileData.user_id);
                    setQrCodeUrl(qrCodeData.signedUrl);
                }
            } catch (err) {
                console.error("Error fetching profile or QR code:", err);
                setError(
                    "Failed to load attendance information. Please try again later."
                );
            } finally {
                setLoading(false);
            }
        }

        fetchProfileAndQrCode();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
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
                    <p className="mt-2">Loading your attendance details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-red-500">Error</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{error}</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">
                Your Attendance QR Code
            </h1>

            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="text-xl text-center">
                        {profile?.full_name || "Attendee"}
                    </CardTitle>
                    {profile?.school && (
                        <p className="text-center text-muted-foreground">
                            {profile.school}
                        </p>
                    )}
                </CardHeader>

                <CardContent className="flex flex-col items-center">
                    {qrCodeUrl ? (
                        <div className="relative h-64 w-64 mx-auto my-4">
                            <Image
                                src={qrCodeUrl}
                                alt="Attendance QR Code"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    ) : (
                        <div className="bg-muted h-64 w-64 mx-auto my-4 flex items-center justify-center">
                            <p className="text-muted-foreground">
                                QR code not available
                            </p>
                        </div>
                    )}

                    <p className="text-center text-sm text-muted-foreground mt-4">
                        Present this QR code to event staff for check-in
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
