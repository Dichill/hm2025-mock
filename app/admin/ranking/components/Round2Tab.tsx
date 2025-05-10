import { useState, useEffect, JSX } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RoundResult } from "@/core/grace/types/judge.dto";
import { getRound2Results } from "@/core/grace/api/judge";
import { RoundResultsTable } from "./RoundResultsTable";
import { LoadingState } from "./LoadingState";
import { ErrorAlert } from "./ErrorAlert";

/**
 * Component for displaying Round 2 judging results
 */
export function Round2Tab(): JSX.Element {
    const [data, setData] = useState<RoundResult[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetches Round 2 results data
     */
    const fetchData = async (): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            const results = await getRound2Results();
            setData(results);
        } catch (err) {
            setError("Failed to fetch Round 2 results. Please try again.");
            console.error("Error fetching Round 2 data:", err);
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
                <CardTitle>Round 2 Judging Results</CardTitle>
            </CardHeader>
            <CardContent>
                {error && <ErrorAlert message={error} />}

                {isLoading ? (
                    <LoadingState />
                ) : data.length > 0 ? (
                    <RoundResultsTable data={data} />
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        No Round 2 results available yet.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
