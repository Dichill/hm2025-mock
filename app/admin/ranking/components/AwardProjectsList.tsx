import { JSX, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AwardScore, AwardCategory } from "@/core/grace/types/judge.dto";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Project with award scores and judge information
 */
interface ProjectWithAwardScore {
    project_id: string;
    project_name: string;
    table_number: string;
    award_category: string;
    scores: AwardScore[];
    avg_score: number;
    judge_count: number;
}

/**
 * Props for AwardProjectsList component
 */
export interface AwardProjectsListProps {
    /** Array of award scores */
    data: AwardScore[];
    /** Array of award categories */
    categories: AwardCategory[];
    /** Map of project IDs to project names */
    projectMap: Record<string, { name: string; table_number: string }>;
    /** Map of judge IDs to judge names/emails */
    judgeMap: Record<string, { display_name: string; email: string }>;
}

/**
 * Component for displaying all projects that opted in for award categories
 */
export function AwardProjectsList({
    data,
    categories,
    projectMap,
    judgeMap,
}: AwardProjectsListProps): JSX.Element {
    // Calculate projects with their award scores
    const projectsByAward = useMemo(() => {
        const groupedProjects: Record<string, ProjectWithAwardScore[]> = {};

        // Initialize categories
        categories.forEach((category) => {
            groupedProjects[category.name] = [];
        });

        // Group scores by project and category
        const projectScores: Record<string, Record<string, AwardScore[]>> = {};
        data.forEach((score) => {
            const key = `${score.project_id}-${score.award_category}`;
            if (!projectScores[key]) {
                projectScores[key] = {};
            }

            if (!projectScores[key][score.award_category]) {
                projectScores[key][score.award_category] = [];
            }

            projectScores[key][score.award_category].push(score);
        });

        // Create projects with average scores
        Object.entries(projectScores).forEach(([key, categoryScores]) => {
            Object.entries(categoryScores).forEach(([category, scores]) => {
                if (!scores.length) return;

                const projectId = scores[0].project_id;
                const projectInfo = projectMap[projectId];

                if (!projectInfo) return;

                const totalScore = scores.reduce(
                    (sum, score) => sum + score.score,
                    0
                );
                const avgScore = totalScore / scores.length;

                const projectWithScore: ProjectWithAwardScore = {
                    project_id: projectId,
                    project_name: projectInfo.name,
                    table_number: projectInfo.table_number,
                    award_category: category,
                    scores,
                    avg_score: avgScore,
                    judge_count: scores.length,
                };

                if (!groupedProjects[category]) {
                    groupedProjects[category] = [];
                }

                groupedProjects[category].push(projectWithScore);
            });
        });

        // Sort projects by average score
        Object.keys(groupedProjects).forEach((category) => {
            groupedProjects[category].sort((a, b) => b.avg_score - a.avg_score);
        });

        return groupedProjects;
    }, [data, categories, projectMap]);

    // Award categories
    const awardCategories = useMemo(
        () => categories.map((c) => c.name),
        [categories]
    );

    const [selectedCategory, setSelectedCategory] = useState<string>(
        awardCategories[0] || ""
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Projects by Award Category</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs
                    defaultValue={selectedCategory}
                    onValueChange={setSelectedCategory}
                    className="space-y-4"
                >
                    <TabsList className="flex flex-wrap">
                        {awardCategories.map((category) => (
                            <TabsTrigger
                                key={category}
                                value={category}
                                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
                            >
                                {category}
                                <Badge className="ml-2 bg-purple-100 text-purple-700">
                                    {projectsByAward[category]?.length || 0}
                                </Badge>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {awardCategories.map((category) => (
                        <TabsContent
                            key={category}
                            value={category}
                            className="space-y-4"
                        >
                            <div className="bg-purple-50 p-4 rounded-lg mb-4">
                                <h3 className="font-medium text-purple-800">
                                    {category}
                                </h3>
                                <p className="text-sm text-purple-700">
                                    {projectsByAward[category]?.length || 0}{" "}
                                    projects participating
                                </p>
                            </div>

                            {projectsByAward[category]?.length > 0 ? (
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-12 text-center">
                                                    Rank
                                                </TableHead>
                                                <TableHead className="w-16">
                                                    Table
                                                </TableHead>
                                                <TableHead>Project</TableHead>
                                                <TableHead className="w-24 text-right">
                                                    Avg Score
                                                </TableHead>
                                                <TableHead className="w-48">
                                                    Judges
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {projectsByAward[category].map(
                                                (project, index) => (
                                                    <TableRow
                                                        key={project.project_id}
                                                        className={
                                                            index === 0
                                                                ? "bg-purple-50"
                                                                : ""
                                                        }
                                                    >
                                                        <TableCell className="text-center font-medium">
                                                            {index === 0 ? (
                                                                <span className="inline-block text-xl">
                                                                    ⭐
                                                                </span>
                                                            ) : (
                                                                index + 1
                                                            )}
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
                                                        <TableCell className="text-right font-medium">
                                                            {project.avg_score.toFixed(
                                                                2
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex -space-x-2">
                                                                <TooltipProvider>
                                                                    {project.scores
                                                                        .slice(
                                                                            0,
                                                                            5
                                                                        )
                                                                        .map(
                                                                            (
                                                                                score
                                                                            ) => {
                                                                                const judge =
                                                                                    judgeMap[
                                                                                        score
                                                                                            .judge_id
                                                                                    ];
                                                                                if (
                                                                                    !judge
                                                                                )
                                                                                    return null;

                                                                                return (
                                                                                    <Tooltip
                                                                                        key={
                                                                                            score.id
                                                                                        }
                                                                                    >
                                                                                        <TooltipTrigger
                                                                                            asChild
                                                                                        >
                                                                                            <Avatar className="border-2 border-white h-8 w-8">
                                                                                                <AvatarFallback className="bg-purple-100 text-purple-700 text-xs">
                                                                                                    {judge.display_name
                                                                                                        .split(
                                                                                                            " "
                                                                                                        )
                                                                                                        .map(
                                                                                                            (
                                                                                                                n
                                                                                                            ) =>
                                                                                                                n[0]
                                                                                                        )
                                                                                                        .join(
                                                                                                            ""
                                                                                                        )
                                                                                                        .toUpperCase()}
                                                                                                </AvatarFallback>
                                                                                            </Avatar>
                                                                                        </TooltipTrigger>
                                                                                        <TooltipContent>
                                                                                            <p>
                                                                                                {
                                                                                                    judge.display_name
                                                                                                }
                                                                                            </p>
                                                                                            <p className="text-xs text-gray-500">
                                                                                                {
                                                                                                    judge.email
                                                                                                }
                                                                                            </p>
                                                                                            <p className="text-xs font-medium text-purple-700">
                                                                                                Score:{" "}
                                                                                                {
                                                                                                    score.score
                                                                                                }
                                                                                            </p>
                                                                                            {score.notes && (
                                                                                                <p className="text-xs italic mt-1">
                                                                                                    "
                                                                                                    {
                                                                                                        score.notes
                                                                                                    }
                                                                                                    "
                                                                                                </p>
                                                                                            )}
                                                                                        </TooltipContent>
                                                                                    </Tooltip>
                                                                                );
                                                                            }
                                                                        )}
                                                                    {project
                                                                        .scores
                                                                        .length >
                                                                        5 && (
                                                                        <Avatar className="border-2 border-white h-8 w-8">
                                                                            <AvatarFallback className="bg-gray-100 text-gray-700 text-xs">
                                                                                +
                                                                                {project
                                                                                    .scores
                                                                                    .length -
                                                                                    5}
                                                                            </AvatarFallback>
                                                                        </Avatar>
                                                                    )}
                                                                </TooltipProvider>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    No projects have been scored for this award
                                    category yet.
                                </div>
                            )}
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    );
}
