import { useState, useEffect, JSX } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TopProject } from "@/core/grace/types/judge.dto";
import { getTopProjects } from "@/core/grace/api/judge";
import { TopProjectsTable } from "./TopProjectsTable";
import { LoadingState } from "./LoadingState";
import { ErrorAlert } from "./ErrorAlert";

/**
 * Component for displaying top projects for Round 2
 */
export function TopProjectsTab(): JSX.Element {
    const [data, setData] = useState<TopProject[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetches top projects data
     */
    const fetchData = async (): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            const results = await getTopProjects(20); // Get top 20 by default
            setData(results);
        } catch (err) {
            setError("Failed to fetch top projects. Please try again.");
            console.error("Error fetching top projects data:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Projects for Round 2</CardTitle>
            </CardHeader>
            <CardContent>
                {error && <ErrorAlert message={error} />}

                {isLoading ? (
                    <LoadingState />
                ) : data.length > 0 ? (
                    <TopProjectsTable data={data} />
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        No top projects available yet.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
