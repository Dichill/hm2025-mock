"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import supabase from "@/lib/supabase/supabase-client";
import { getUserData } from "@/core/user/api/user";
import { User } from "@/app/grace/types";
import { UserDataResponse } from "@/core/user/types/user.dto";

type UserContextType = {
    user: User | null;
    userDetails: UserDataResponse | null;
    userName: string;
    isAuthenticated: boolean;
    userRoles: string[];
    loading: boolean;
};

const initialState: UserContextType = {
    user: null,
    userDetails: null,
    userName: "",
    isAuthenticated: false,
    userRoles: [],
    loading: true,
};

const UserContext = createContext<UserContextType>(initialState);

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<UserContextType>(initialState);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Step 1: Check authentication status
                const { data: sessionData } = await supabase.auth.getSession();

                if (!sessionData.session) {
                    setState({
                        ...initialState,
                        loading: false,
                    });
                    return;
                }

                // Step 2: Get user data from Supabase
                const { data: userData, error } = await supabase.auth.getUser();

                if (error || !userData.user) {
                    console.error("Authentication error:", error);
                    setState({
                        ...initialState,
                        loading: false,
                    });
                    return;
                }

                // Step 3: Get detailed user data (single API call)
                try {
                    const userDetailsResponse = await getUserData();

                    // Extract user roles
                    const userRoles = userDetailsResponse.roles || [];

                    // Determine display name with fallbacks
                    let userName = "User";
                    if (userDetailsResponse.profile?.display_name) {
                        userName = userDetailsResponse.profile.display_name;
                    } else if (userDetailsResponse.profile?.first_name) {
                        userName = userDetailsResponse.profile.first_name;
                    } else if (userData.user.user_metadata?.first_name) {
                        userName = userData.user.user_metadata.first_name;
                    } else if (userData.user.user_metadata?.display_name) {
                        userName = userData.user.user_metadata.display_name;
                    }

                    setState({
                        user: userData.user,
                        userDetails: userDetailsResponse,
                        userName,
                        isAuthenticated: true,
                        userRoles,
                        loading: false,
                    });
                } catch (detailsError) {
                    console.error(
                        "Error fetching detailed user data:",
                        detailsError
                    );

                    // Fallback to basic user data
                    const firstName = userData.user.user_metadata?.first_name;
                    const displayName =
                        userData.user.user_metadata?.display_name;

                    setState({
                        user: userData.user,
                        userDetails: null,
                        userName: firstName || displayName || "User",
                        isAuthenticated: true,
                        userRoles: [],
                        loading: false,
                    });
                }
            } catch (error) {
                console.error("Error in user authentication flow:", error);
                setState({
                    ...initialState,
                    loading: false,
                });
            }
        };

        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={state}>{children}</UserContext.Provider>
    );
}
