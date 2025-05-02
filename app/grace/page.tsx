"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authenticateJudge, isAuthenticated } from "@/api/grace-client";
import { AuthResponse } from "@/core/grace/types/judge.dto";

/**
 * Judge authentication page component
 * Provides a login form for judges to enter their unique code
 */
export default function JudgeLoginPage() {
    const router = useRouter();
    const [judgeCode, setJudgeCode] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [, setAuthData] = useState<AuthResponse | null>(null);

    // Check if user is already authenticated and redirect if needed
    useEffect(() => {
        if (isAuthenticated()) {
            router.push("/grace/dashboard");
        }
    }, [router]);

    /**
     * Handles the judge login form submission
     * @param e - Form submission event
     */
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (!judgeCode) {
                throw new Error("Please enter your judge code");
            }

            const response = await authenticateJudge(judgeCode);
            setAuthData(response);

            // Redirect to the judge dashboard after successful authentication
            router.push("/grace/dashboard");
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Authentication failed. Please check your code and try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Judge Login
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Enter your judge code to access the judging system
                    </p>
                </div>

                {error && (
                    <div
                        className="bg-red-50 text-red-700 p-3 rounded-md text-sm"
                        role="alert"
                    >
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label
                            htmlFor="judgeCode"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Judge Code
                        </label>
                        <input
                            id="judgeCode"
                            type="text"
                            value={judgeCode}
                            onChange={(e) => setJudgeCode(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your judge code"
                            disabled={loading}
                            autoComplete="off"
                            suppressHydrationWarning={true}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Authenticating..." : "Login"}
                    </button>
                </form>

                <div className="text-center text-sm text-gray-500">
                    <p>Need help? Contact the hackathon organizers</p>
                </div>
            </div>
        </div>
    );
}
