"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
    getRound1Results,
    getTopProjects,
    getRound2Results,
    getTrackWinners,
    getAwardWinners,
} from "@/core/grace/api/judge";
import {
    RoundResult,
    TopProject,
    TrackWinner,
    AwardWinner,
} from "@/core/grace/types/judge.dto";
import { graceClient } from "@/api/grace-client";

export default function RankingPage() {
    const [activeTab, setActiveTab] = useState("round1");
    const [round1Data, setRound1Data] = useState<RoundResult[]>([]);
    const [round2Data, setRound2Data] = useState<RoundResult[]>([]);
    const [topProjectsData, setTopProjectsData] = useState<TopProject[]>([]);
    const [trackWinnersData, setTrackWinnersData] = useState<TrackWinner[]>([]);
    const [awardWinnersData, setAwardWinnersData] = useState<AwardWinner[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [clearScores, setClearScores] = useState(true);
    const [clearAwardScores, setClearAwardScores] = useState(false);
    const [round, setRound] = useState<string>("1");
    const [awardCategory, setAwardCategory] = useState<string>("");
    const [clearingScores, setClearingScores] = useState(false);

    // Fetch data when tab changes
    const fetchDataForTab = async (tab: string) => {
        setIsLoading(true);
        setError(null);

        try {
            switch (tab) {
                case "round1":
                    if (round1Data.length === 0) {
                        const data = await getRound1Results();
                        setRound1Data(data);
                    }
                    break;
                case "topProjects":
                    if (topProjectsData.length === 0) {
                        const data = await getTopProjects(20); // Get top 20 by default
                        setTopProjectsData(data);
                    }
                    break;
                case "round2":
                    if (round2Data.length === 0) {
                        const data = await getRound2Results();
                        setRound2Data(data);
                    }
                    break;
                case "trackWinners":
                    if (trackWinnersData.length === 0) {
                        const data = await getTrackWinners();
                        setTrackWinnersData(data);
                    }
                    break;
                case "awardWinners":
                    if (awardWinnersData.length === 0) {
                        const data = await getAwardWinners();
                        setAwardWinnersData(data);
                    }
                    break;
            }
        } catch (err) {
            setError("Failed to fetch data. Please try again.");
            console.error("Error fetching data:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle tab change
    const handleTabChange = (value: string) => {
        setActiveTab(value);
        fetchDataForTab(value);
    };

    // Handle clear scores
    const handleClearScores = async () => {
        setClearingScores(true);

        try {
            await graceClient.delete("/scores/clear", {
                data: {
                    clearScores,
                    clearAwardScores,
                    ...(round ? { round: parseInt(round, 10) } : {}),
                    ...(awardCategory ? { awardCategory } : {}),
                },
            });

            toast.success("Scores cleared successfully", {
                description: `${clearScores ? "Round scores" : ""}${
                    clearScores && clearAwardScores ? " and " : ""
                }${clearAwardScores ? "Award scores" : ""} have been cleared.`,
            });

            // Reset data based on what was cleared
            if (clearScores) {
                if (!round || round === "1") setRound1Data([]);
                if (!round || round === "2") setRound2Data([]);
                setTopProjectsData([]);
                setTrackWinnersData([]);
            }

            if (clearAwardScores) {
                setAwardWinnersData([]);
            }

            setDialogOpen(false);
        } catch (err) {
            toast.error("Failed to clear scores", {
                description: "An error occurred while clearing scores.",
            });
            console.error("Error clearing scores:", err);
        } finally {
            setClearingScores(false);
        }
    };

    // Initialize by loading round1 data
    useState(() => {
        fetchDataForTab(activeTab);
    });

    return (
        <div className="container mx-auto py-6 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Judging Results</h1>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="destructive">Clear Scores</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Clear Judging Scores</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. Select the types
                                of scores you want to clear.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="clearScores"
                                    checked={clearScores}
                                    onCheckedChange={(checked) =>
                                        setClearScores(checked as boolean)
                                    }
                                />
                                <Label htmlFor="clearScores">
                                    Clear Round Scores
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="clearAwardScores"
                                    checked={clearAwardScores}
                                    onCheckedChange={(checked) =>
                                        setClearAwardScores(checked as boolean)
                                    }
                                />
                                <Label htmlFor="clearAwardScores">
                                    Clear Award Scores
                                </Label>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="round" className="text-right">
                                    Round
                                </Label>
                                <Input
                                    id="round"
                                    type="text"
                                    placeholder="1 or 2 (optional)"
                                    value={round}
                                    onChange={(e) => setRound(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="awardCategory"
                                    className="text-right"
                                >
                                    Award Category
                                </Label>
                                <Input
                                    id="awardCategory"
                                    placeholder="Leave empty for all (optional)"
                                    value={awardCategory}
                                    onChange={(e) =>
                                        setAwardCategory(e.target.value)
                                    }
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleClearScores}
                                disabled={
                                    clearingScores ||
                                    (!clearScores && !clearAwardScores)
                                }
                            >
                                {clearingScores
                                    ? "Clearing..."
                                    : "Clear Scores"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Tabs value={activeTab} onValueChange={handleTabChange}>
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

                {/* Round 1 Results Tab */}
                <TabsContent value="round1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Round 1 Judging Results</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {error && (
                                <Alert variant="destructive" className="mb-4">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            {isLoading ? (
                                <div className="space-y-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Skeleton
                                            key={i}
                                            className="w-full h-12"
                                        />
                                    ))}
                                </div>
                            ) : round1Data.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Table #</TableHead>
                                                <TableHead>
                                                    Project Name
                                                </TableHead>
                                                <TableHead>Track</TableHead>
                                                <TableHead>Technical</TableHead>
                                                <TableHead>Impact</TableHead>
                                                <TableHead>Design</TableHead>
                                                <TableHead>
                                                    Presentation
                                                </TableHead>
                                                <TableHead>Bonus</TableHead>
                                                <TableHead>
                                                    Total Score
                                                </TableHead>
                                                <TableHead># Judges</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {round1Data
                                                .sort(
                                                    (a, b) =>
                                                        b.total_score -
                                                        a.total_score
                                                )
                                                .map((result) => (
                                                    <TableRow
                                                        key={result.project_id}
                                                    >
                                                        <TableCell>
                                                            {
                                                                result.table_number
                                                            }
                                                        </TableCell>
                                                        <TableCell className="font-medium">
                                                            {
                                                                result.project_name
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {result.track ? (
                                                                <Badge variant="outline">
                                                                    {
                                                                        result.track
                                                                    }
                                                                </Badge>
                                                            ) : (
                                                                <span className="text-muted-foreground">
                                                                    —
                                                                </span>
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {result.avg_technical.toFixed(
                                                                2
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {result.avg_impact.toFixed(
                                                                2
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {result.avg_design.toFixed(
                                                                2
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {result.avg_presentation.toFixed(
                                                                2
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                result.bonus_points
                                                            }
                                                        </TableCell>
                                                        <TableCell className="font-bold">
                                                            {result.total_score.toFixed(
                                                                2
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {result.judge_count}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    No Round 1 results available yet.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Top Projects Tab */}
                <TabsContent value="topProjects">
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Projects for Round 2</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {error && (
                                <Alert variant="destructive" className="mb-4">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            {isLoading ? (
                                <div className="space-y-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Skeleton
                                            key={i}
                                            className="w-full h-12"
                                        />
                                    ))}
                                </div>
                            ) : topProjectsData.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Rank</TableHead>
                                                <TableHead>Table #</TableHead>
                                                <TableHead>
                                                    Project Name
                                                </TableHead>
                                                <TableHead>
                                                    Total Score
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {topProjectsData.map(
                                                (project, index) => (
                                                    <TableRow
                                                        key={project.project_id}
                                                    >
                                                        <TableCell className="font-bold">
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                project.table_number
                                                            }
                                                        </TableCell>
                                                        <TableCell className="font-medium">
                                                            {
                                                                project.project_name
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {project.total_score.toFixed(
                                                                2
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    No top projects available yet.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Round 2 Results Tab */}
                <TabsContent value="round2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Round 2 Judging Results</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {error && (
                                <Alert variant="destructive" className="mb-4">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            {isLoading ? (
                                <div className="space-y-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Skeleton
                                            key={i}
                                            className="w-full h-12"
                                        />
                                    ))}
                                </div>
                            ) : round2Data.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Table #</TableHead>
                                                <TableHead>
                                                    Project Name
                                                </TableHead>
                                                <TableHead>Track</TableHead>
                                                <TableHead>Technical</TableHead>
                                                <TableHead>Impact</TableHead>
                                                <TableHead>Design</TableHead>
                                                <TableHead>
                                                    Presentation
                                                </TableHead>
                                                <TableHead>Bonus</TableHead>
                                                <TableHead>
                                                    Total Score
                                                </TableHead>
                                                <TableHead># Judges</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {round2Data
                                                .sort(
                                                    (a, b) =>
                                                        b.total_score -
                                                        a.total_score
                                                )
                                                .map((result) => (
                                                    <TableRow
                                                        key={result.project_id}
                                                    >
                                                        <TableCell>
                                                            {
                                                                result.table_number
                                                            }
                                                        </TableCell>
                                                        <TableCell className="font-medium">
                                                            {
                                                                result.project_name
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {result.track ? (
                                                                <Badge variant="outline">
                                                                    {
                                                                        result.track
                                                                    }
                                                                </Badge>
                                                            ) : (
                                                                <span className="text-muted-foreground">
                                                                    —
                                                                </span>
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {result.avg_technical.toFixed(
                                                                2
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {result.avg_impact.toFixed(
                                                                2
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {result.avg_design.toFixed(
                                                                2
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {result.avg_presentation.toFixed(
                                                                2
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                result.bonus_points
                                                            }
                                                        </TableCell>
                                                        <TableCell className="font-bold">
                                                            {result.total_score.toFixed(
                                                                2
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {result.judge_count}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    No Round 2 results available yet.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Track Winners Tab */}
                <TabsContent value="trackWinners">
                    <Card>
                        <CardHeader>
                            <CardTitle>Track Winners</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {error && (
                                <Alert variant="destructive" className="mb-4">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            {isLoading ? (
                                <div className="space-y-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Skeleton
                                            key={i}
                                            className="w-full h-12"
                                        />
                                    ))}
                                </div>
                            ) : trackWinnersData.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {trackWinnersData.map((winner) => (
                                        <Card
                                            key={winner.project_id}
                                            className="relative overflow-hidden border-2 border-blue-200 hover:border-blue-300 transition-all duration-300"
                                        >
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full" />
                                            <CardHeader className="relative">
                                                <div className="flex items-center justify-between mb-2">
                                                    <Badge className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200">
                                                        {winner.track}
                                                    </Badge>
                                                    <div className="flex items-center space-x-1 text-blue-600">
                                                        <span className="text-sm font-medium">
                                                            Table
                                                        </span>
                                                        <span className="text-lg font-bold">
                                                            {
                                                                winner.table_number
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                                <CardTitle className="text-2xl font-bold tracking-tight text-gray-900">
                                                    {winner.project_name}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                                                    <div className="space-y-1">
                                                        <p className="text-sm text-gray-600">
                                                            Total Score
                                                        </p>
                                                        <p className="text-2xl font-bold text-blue-700">
                                                            {winner.total_score.toFixed(
                                                                2
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <span className="text-xl font-bold text-blue-700">
                                                            🏆
                                                        </span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    No track winners available yet.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Award Winners Tab */}
                <TabsContent value="awardWinners">
                    <Card>
                        <CardHeader>
                            <CardTitle>Award Winners</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {error && (
                                <Alert variant="destructive" className="mb-4">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            {isLoading ? (
                                <div className="space-y-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Skeleton
                                            key={i}
                                            className="w-full h-12"
                                        />
                                    ))}
                                </div>
                            ) : awardWinnersData.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {awardWinnersData.map((winner) => (
                                        <Card
                                            key={`${winner.award_category}-${winner.project_id}`}
                                            className="relative overflow-hidden border-2 border-purple-200 hover:border-purple-300 transition-all duration-300"
                                        >
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full" />
                                            <CardHeader className="relative">
                                                <div className="flex items-center justify-between mb-2">
                                                    <Badge
                                                        variant="secondary"
                                                        className="px-3 py-1 text-sm font-medium bg-purple-100 text-purple-700 hover:bg-purple-200"
                                                    >
                                                        {winner.award_category}
                                                    </Badge>
                                                    <div className="flex items-center space-x-1 text-purple-600">
                                                        <span className="text-sm font-medium">
                                                            Table
                                                        </span>
                                                        <span className="text-lg font-bold">
                                                            {
                                                                winner.table_number
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                                <CardTitle className="text-2xl font-bold tracking-tight text-gray-900">
                                                    {winner.project_name}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                                                        <div className="space-y-1">
                                                            <p className="text-sm text-gray-600">
                                                                Average Score
                                                            </p>
                                                            <p className="text-2xl font-bold text-purple-700">
                                                                {winner.avg_score.toFixed(
                                                                    2
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                                                            <span className="text-xl font-bold text-purple-700">
                                                                ⭐
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between px-4 py-2 bg-purple-50 rounded-lg">
                                                        <span className="text-sm text-gray-600">
                                                            Judges
                                                        </span>
                                                        <span className="text-sm font-medium text-purple-700">
                                                            {winner.judge_count}{" "}
                                                            {winner.judge_count ===
                                                            1
                                                                ? "Judge"
                                                                : "Judges"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    No award winners available yet.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
