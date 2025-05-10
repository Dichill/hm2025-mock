import { useState, JSX } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrackWinner, RoundResult } from "@/core/grace/types/judge.dto";
import { TrackWinnerCards } from "./TrackWinnerCards";
import { TrackProjectsList } from "./TrackProjectsList";

/**
 * Props for the TrackResultsTab component
 */
export interface TrackResultsTabProps {
    /** Track winners data */
    winners: TrackWinner[];
    /** All projects data for displaying by track */
    projects: RoundResult[];
}

/**
 * Combined component for displaying track winners and all projects by track
 */
export function TrackResultsTab({
    winners,
    projects,
}: TrackResultsTabProps): JSX.Element {
    const [activeTab, setActiveTab] = useState<string>("winners");

    return (
        <div className="space-y-4">
            <Tabs
                defaultValue={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Track Results</h2>
                    <TabsList>
                        <TabsTrigger value="winners">Track Winners</TabsTrigger>
                        <TabsTrigger value="all">
                            All Projects by Track
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="winners">
                    {winners.length > 0 ? (
                        <TrackWinnerCards data={winners} />
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            No track winners available yet.
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="all">
                    {projects.length > 0 ? (
                        <TrackProjectsList data={projects} />
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            No projects data available yet.
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
