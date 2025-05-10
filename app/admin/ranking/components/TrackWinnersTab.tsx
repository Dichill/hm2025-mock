import { useState, useEffect, JSX } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrackWinner } from "@/core/grace/types/judge.dto";
import { getTrackWinners } from "@/core/grace/api/judge";
import { TrackWinnerCards } from "./TrackWinnerCards";
import { LoadingState } from "./LoadingState";
import { ErrorAlert } from "./ErrorAlert";

/**
 * Component for displaying track winners
 */
export function TrackWinnersTab(): JSX.Element {
    const [data, setData] = useState<TrackWinner[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetches track winners data
     */
    const fetchData = async (): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            const results = await getTrackWinners();
            setData(results);
        } catch (err) {
            setError("Failed to fetch track winners. Please try again.");
            console.error("Error fetching track winners data:", err);
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
                <CardTitle>Track Winners</CardTitle>
            </CardHeader>
            <CardContent>
                {error && <ErrorAlert message={error} />}

                {isLoading ? (
                    <LoadingState />
                ) : data.length > 0 ? (
                    <TrackWinnerCards data={data} />
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        No track winners available yet.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
