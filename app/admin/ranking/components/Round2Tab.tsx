import { JSX } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RoundResult } from "@/core/grace/types/judge.dto";
import { RoundResultsTable } from "./RoundResultsTable";

/**
 * Props for Round2Tab component
 */
export interface Round2TabProps {
    /** Round 2 results data */
    data: RoundResult[];
}

/**
 * Component for displaying Round 2 judging results
 */
export function Round2Tab({ data }: Round2TabProps): JSX.Element {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Round 2 Judging Results</CardTitle>
            </CardHeader>
            <CardContent>
                {data.length > 0 ? (
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
