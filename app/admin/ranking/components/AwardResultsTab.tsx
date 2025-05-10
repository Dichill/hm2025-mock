import { useState, JSX } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    AwardWinner,
    AwardScore,
    AwardCategory,
} from "@/core/grace/types/judge.dto";
import { AwardWinnerCards } from "./AwardWinnerCards";
import { AwardProjectsList } from "./AwardProjectsList";

/**
 * Props for the AwardResultsTab component
 */
export interface AwardResultsTabProps {
    /** Award winners data */
    winners: AwardWinner[];
    /** Award categories data */
    categories: AwardCategory[];
    /** Award scores data */
    scores: AwardScore[];
    /** Map of project IDs to project names */
    projectMap: Record<string, { name: string; table_number: string }>;
    /** Map of judge IDs to judge names */
    judgeMap: Record<string, { display_name: string; email: string }>;
}

/**
 * Component for displaying award winners and all award participants
 */
export function AwardResultsTab({
    winners,
    categories,
    scores,
    projectMap,
    judgeMap,
}: AwardResultsTabProps): JSX.Element {
    const [activeTab, setActiveTab] = useState<string>("winners");

    return (
        <div className="space-y-4">
            <Tabs
                defaultValue={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Award Results</h2>
                    <TabsList>
                        <TabsTrigger value="winners">Award Winners</TabsTrigger>
                        <TabsTrigger value="all">
                            All Projects by Award
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="winners">
                    {winners.length > 0 ? (
                        <AwardWinnerCards data={winners} />
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            No award winners available yet.
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="all">
                    {categories.length > 0 && scores.length > 0 ? (
                        <AwardProjectsList
                            data={scores}
                            categories={categories}
                            projectMap={projectMap}
                            judgeMap={judgeMap}
                        />
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            No award scores data available yet.
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
