import { useState, useEffect, JSX } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AwardWinner } from "@/core/grace/types/judge.dto";
import { getAwardWinners } from "@/core/grace/api/judge";
import { AwardWinnerCards } from "./AwardWinnerCards";
import { LoadingState } from "./LoadingState";
import { ErrorAlert } from "./ErrorAlert";

/**
 * Component for displaying award winners
 */
export function AwardWinnersTab(): JSX.Element {
    const [data, setData] = useState<AwardWinner[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetches award winners data
     */
    const fetchData = async (): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            const results = await getAwardWinners();
            setData(results);
        } catch (err) {
            setError("Failed to fetch award winners. Please try again.");
            console.error("Error fetching award winners data:", err);
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
                <CardTitle>Award Winners</CardTitle>
            </CardHeader>
            <CardContent>
                {error && <ErrorAlert message={error} />}

                {isLoading ? (
                    <LoadingState />
                ) : data.length > 0 ? (
                    <AwardWinnerCards data={data} />
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        No award winners available yet.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
