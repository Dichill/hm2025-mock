import { useState, useEffect } from "react";
import supabase from "@/lib/supabase/supabase-client";

/**
 * Custom hook to fetch and return the current authenticated user
 * @returns Object containing user data and loading state
 */
export const useUser = () => {
    const [user, setUser] = useState<{ id: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data, error } = await supabase.auth.getUser();
                if (error) {
                    console.error("Error fetching user:", error);
                    setUser(null);
                } else if (data?.user) {
                    setUser({ id: data.user.id });
                }
            } catch (error) {
                console.error("Unexpected error:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading };
};

export default useUser;
