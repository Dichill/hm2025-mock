"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { publicSettingsApi } from "@/core/grace/api/settings";

type SettingsContextType = {
    judgingEnabled: boolean;
    round2JudgingEnabled: boolean;
    loading: boolean;
};

const initialState: SettingsContextType = {
    judgingEnabled: false,
    round2JudgingEnabled: false,
    loading: true,
};

const SettingsContext = createContext<SettingsContextType>(initialState);

export const useSettings = () => useContext(SettingsContext);

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<SettingsContextType>(initialState);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                // Fetch judging status
                const [mainJudging, round2Judging] = await Promise.all([
                    publicSettingsApi.getByName("main_judging_enabled"),
                    publicSettingsApi.getByName("round2_judging_enabled"),
                ]);

                // Check if the values are booleans or objects with enabled property
                let judgingEnabled = false;
                let round2JudgingEnabled = false;

                if (typeof mainJudging.value === "boolean") {
                    judgingEnabled = mainJudging.value;
                } else if (
                    typeof mainJudging.value === "object" &&
                    mainJudging.value !== null &&
                    "enabled" in mainJudging.value
                ) {
                    judgingEnabled = !!mainJudging.value.enabled;
                }

                if (typeof round2Judging.value === "boolean") {
                    round2JudgingEnabled = round2Judging.value;
                } else if (
                    typeof round2Judging.value === "object" &&
                    round2Judging.value !== null &&
                    "enabled" in round2Judging.value
                ) {
                    round2JudgingEnabled = !!round2Judging.value.enabled;
                }

                setState({
                    judgingEnabled,
                    round2JudgingEnabled,
                    loading: false,
                });
            } catch (error) {
                console.error("Error fetching judging status:", error);
                setState({
                    judgingEnabled: false,
                    round2JudgingEnabled: false,
                    loading: false,
                });
            }
        };

        fetchSettings();
    }, []);

    return (
        <SettingsContext.Provider value={state}>
            {children}
        </SettingsContext.Provider>
    );
}
