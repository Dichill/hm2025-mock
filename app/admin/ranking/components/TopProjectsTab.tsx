import { JSX } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TopProject } from "@/core/grace/types/judge.dto";
import { TopProjectsTable } from "./TopProjectsTable";

/**
 * Props for TopProjectsTab component
 */
export interface TopProjectsTabProps {
    /** Top projects data */
    data: TopProject[];
}

/**
 * Component for displaying top projects for Round 2
 */
export function TopProjectsTab({ data }: TopProjectsTabProps): JSX.Element {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Projects for Round 2</CardTitle>
            </CardHeader>
            <CardContent>
                {data.length > 0 ? (
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
