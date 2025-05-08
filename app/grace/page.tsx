"use client";

import WelcomeScreen from "./components/WelcomeScreen";
import JudgingInterface from "./components/JudgingInterface";
import { useUser } from "@/app/context/UserContext";
import { useSettings } from "@/app/context/SettingsContext";

export default function GracePage() {
    const { userName, loading: userLoading } = useUser();
    const { judgingEnabled, loading: settingsLoading } = useSettings();

    // Determine if any data is still loading
    const loading = userLoading || settingsLoading;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-t-[rgb(var(--mesa-orange))] border-r-[rgb(var(--mesa-orange))] border-b-[rgb(var(--mesa-orange))] border-l-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return judgingEnabled ? (
        <JudgingInterface />
    ) : (
        <WelcomeScreen userName={userName} />
    );
}
