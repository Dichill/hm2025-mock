import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Round1Tab } from "./Round1Tab";
import { TopProjectsTab } from "./TopProjectsTab";
import { Round2Tab } from "./Round2Tab";
import { TrackWinnersTab } from "./TrackWinnersTab";
import { AwardWinnersTab } from "./AwardWinnersTab";
import { ClearScoresDialog } from "./ClearScoresDialog";

/**
 * Component for the main ranking tabs container
 */
export interface RankingTabsProps {
    /** Initial active tab */
    defaultTab?: string;
}

export function RankingTabs({ defaultTab = "round1" }: RankingTabsProps) {
    const [activeTab, setActiveTab] = useState<string>(defaultTab);

    /**
     * Force refreshes data when scores are cleared
     */
    const handleScoresCleared = (): void => {
        // Trigger a re-render by toggling to a different tab and back
        const currentTab = activeTab;
        const tempTab = currentTab === "round1" ? "round2" : "round1";

        setActiveTab(tempTab);
        // Use setTimeout to ensure tab change is processed
        setTimeout(() => setActiveTab(currentTab), 50);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Judging Results</h1>
                <ClearScoresDialog onScoresCleared={handleScoresCleared} />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-5">
                    <TabsTrigger value="round1">Round 1 Results</TabsTrigger>
                    <TabsTrigger value="topProjects">Top Projects</TabsTrigger>
                    <TabsTrigger value="round2">Round 2 Results</TabsTrigger>
                    <TabsTrigger value="trackWinners">
                        Track Winners
                    </TabsTrigger>
                    <TabsTrigger value="awardWinners">
                        Award Winners
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="round1">
                    <Round1Tab />
                </TabsContent>

                <TabsContent value="topProjects">
                    <TopProjectsTab />
                </TabsContent>

                <TabsContent value="round2">
                    <Round2Tab />
                </TabsContent>

                <TabsContent value="trackWinners">
                    <TrackWinnersTab />
                </TabsContent>

                <TabsContent value="awardWinners">
                    <AwardWinnersTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
