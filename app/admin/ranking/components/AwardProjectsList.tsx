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
import { AwardScore, AwardCategory } from "@/core/grace/types/judge.dto";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

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
        Object.entries(projectScores).forEach(([, categoryScores]) => {
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

    // Track expanded state for each category
    const [expandedCategories, setExpandedCategories] = useState<
        Record<string, boolean>
    >(Object.fromEntries(categories.map((category) => [category.name, true])));

    const toggleCategory = (category: string) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Projects by Award Category</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {categories.map((category) => (
                        <Collapsible
                            key={category.name}
                            open={expandedCategories[category.name]}
                            className="border rounded-lg overflow-hidden"
                        >
                            <CollapsibleTrigger
                                onClick={() => toggleCategory(category.name)}
                                className="w-full flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 transition-colors"
                            >
                                <div className="flex items-center">
                                    <h3 className="font-medium text-purple-800 text-lg">
                                        {category.name}
                                    </h3>
                                    <Badge className="ml-2 bg-purple-100 text-purple-700">
                                        {projectsByAward[category.name]
                                            ?.length || 0}{" "}
                                        projects
                                    </Badge>
                                </div>
                                {expandedCategories[category.name] ? (
                                    <ChevronUp className="h-5 w-5 text-purple-700" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-purple-700" />
                                )}
                            </CollapsibleTrigger>

                            <CollapsibleContent>
                                {projectsByAward[category.name]?.length > 0 ? (
                                    <div className="border-t">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-12 text-center">
                                                        Rank
                                                    </TableHead>
                                                    <TableHead className="w-16">
                                                        Table
                                                    </TableHead>
                                                    <TableHead>
                                                        Project
                                                    </TableHead>
                                                    <TableHead className="w-24 text-right">
                                                        Avg Score
                                                    </TableHead>
                                                    <TableHead className="w-48">
                                                        Judges
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {projectsByAward[
                                                    category.name
                                                ].map((project, index) => (
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
                                                                                                    {
                                                                                                        score.notes
                                                                                                    }
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
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        No projects have been scored for this
                                        award category yet.
                                    </div>
                                )}
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
