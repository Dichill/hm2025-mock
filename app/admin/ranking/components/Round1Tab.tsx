import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RoundResult } from "@/core/grace/types/judge.dto";
import { RoundResultsTable } from "./RoundResultsTable";

/**
 * Props for Round1Tab component
 */
export interface Round1TabProps {
    /** Round 1 results data */
    data: RoundResult[];
}

/**
 * Component for displaying Round 1 judging results
 */
export function Round1Tab({ data }: Round1TabProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Round 1 Judging Results</CardTitle>
            </CardHeader>
            <CardContent>
                {data.length > 0 ? (
                    <RoundResultsTable data={data} />
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        No Round 1 results available yet.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
