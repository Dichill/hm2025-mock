import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Round1Tab } from "./Round1Tab";
import { TopProjectsTab } from "./TopProjectsTab";
import { Round2Tab } from "./Round2Tab";
import { TrackResultsTab } from "./TrackResultsTab";
import { AwardResultsTab } from "./AwardResultsTab";
import { ClearScoresDialog } from "./ClearScoresDialog";
import {
    getRound1Results,
    getRound2Results,
    getTopProjects,
    getTrackWinners,
    getAwardWinners,
    getAwardCategories,
} from "@/core/grace/api/judge";
import {
    RoundResult,
    TopProject,
    TrackWinner,
    AwardWinner,
    AwardCategory,
    AwardScore,
} from "@/core/grace/types/judge.dto";
import { LoadingState } from "./LoadingState";
import { ErrorAlert } from "./ErrorAlert";

/**
 * Component for the main ranking tabs container
 */
export interface RankingTabsProps {
    /** Initial active tab */
    defaultTab?: string;
}

export function RankingTabs({ defaultTab = "round1" }: RankingTabsProps) {
    const [activeTab, setActiveTab] = useState<string>(defaultTab);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // State for all data needed across tabs
    const [round1Results, setRound1Results] = useState<RoundResult[]>([]);
    const [round2Results, setRound2Results] = useState<RoundResult[]>([]);
    const [topProjects, setTopProjects] = useState<TopProject[]>([]);
    const [trackWinners, setTrackWinners] = useState<TrackWinner[]>([]);
    const [awardWinners, setAwardWinners] = useState<AwardWinner[]>([]);
    const [awardCategories, setAwardCategories] = useState<AwardCategory[]>([]);
    const [awardScores, setAwardScores] = useState<AwardScore[]>([]);

    // Maps for the award projects list
    const [projectMap, setProjectMap] = useState<
        Record<string, { name: string; table_number: string }>
    >({});
    const [judgeMap, setJudgeMap] = useState<
        Record<string, { display_name: string; email: string }>
    >({});

    /**
     * Fetch all data needed for the tabs
     */
    const fetchAllData = async (): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            // Fetch all data in parallel
            const [
                round1Data,
                round2Data,
                topProjectsData,
                trackWinnersData,
                awardWinnersData,
                awardCategoriesData,
            ] = await Promise.all([
                getRound1Results(),
                getRound2Results(),
                getTopProjects(),
                getTrackWinners(),
                getAwardWinners(),
                getAwardCategories(),
            ]);

            // Set state for all fetched data
            setRound1Results(round1Data);
            setRound2Results(round2Data);
            setTopProjects(topProjectsData);
            setTrackWinners(trackWinnersData);
            setAwardWinners(awardWinnersData);
            setAwardCategories(awardCategoriesData);

            // Create mock award scores and maps (similar to what we did in AwardResultsTab)
            const mockScores: AwardScore[] = [];
            const projects: Record<
                string,
                { name: string; table_number: string }
            > = {};
            const judges: Record<
                string,
                { display_name: string; email: string }
            > = {};

            // Extract project and judge info from winners
            awardWinnersData.forEach((winner) => {
                projects[winner.project_id] = {
                    name: winner.project_name,
                    table_number: winner.table_number,
                };

                // If we have judges info for this winner
                if (winner.judges) {
                    winner.judges.forEach((judge) => {
                        judges[judge.id] = {
                            display_name: judge.display_name,
                            email: judge.email,
                        };

                        // Create a mock score for each judge
                        mockScores.push({
                            id: `${winner.project_id}-${judge.id}`,
                            judge_id: judge.id,
                            project_id: winner.project_id,
                            award_category: winner.award_category,
                            score: Math.random() * 5, // Random score between 0-5
                            created_at: new Date().toISOString(),
                        });
                    });
                }
            });

            setProjectMap(projects);
            setJudgeMap(judges);
            setAwardScores(mockScores);
        } catch (err) {
            setError("Failed to fetch judging data. Please try again.");
            console.error("Error fetching judging data:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchAllData();
    }, []);

    /**
     * Force refreshes data when scores are cleared
     */
    const handleScoresCleared = (): void => {
        fetchAllData();
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Judging Results</h1>
                <ClearScoresDialog onScoresCleared={handleScoresCleared} />
            </div>

            {error && <ErrorAlert message={error} />}

            {isLoading ? (
                <LoadingState />
            ) : (
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-5">
                        <TabsTrigger value="round1">
                            Round 1 Results
                        </TabsTrigger>
                        <TabsTrigger value="topProjects">
                            Top Projects
                        </TabsTrigger>
                        <TabsTrigger value="round2">
                            Round 2 Results
                        </TabsTrigger>
                        <TabsTrigger value="trackWinners">
                            Track Results
                        </TabsTrigger>
                        <TabsTrigger value="awardWinners">
                            Award Results
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="round1">
                        <Round1Tab data={round1Results} />
                    </TabsContent>

                    <TabsContent value="topProjects">
                        <TopProjectsTab data={topProjects} />
                    </TabsContent>

                    <TabsContent value="round2">
                        <Round2Tab data={round2Results} />
                    </TabsContent>

                    <TabsContent value="trackWinners">
                        <TrackResultsTab
                            winners={trackWinners}
                            projects={round2Results}
                        />
                    </TabsContent>

                    <TabsContent value="awardWinners">
                        <AwardResultsTab
                            winners={awardWinners}
                            categories={awardCategories}
                            scores={awardScores}
                            projectMap={projectMap}
                            judgeMap={judgeMap}
                        />
                    </TabsContent>
                </Tabs>
            )}
        </div>
    );
}
