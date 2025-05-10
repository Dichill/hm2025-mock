import { JSX, useState } from "react";
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
import { RoundResult } from "@/core/grace/types/judge.dto";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Props for the TrackProjectsList component
 */
export interface TrackProjectsListProps {
    /** Projects with their scores grouped by track */
    data: RoundResult[];
}

/**
 * Component for displaying all projects that opted in for track awards
 */
export function TrackProjectsList({
    data,
}: TrackProjectsListProps): JSX.Element {
    // Extract unique track names
    const tracks = [
        ...new Set(
            data
                .filter((project) => project.track)
                .map((project) => project.track)
        ),
    ];
    const [selectedTrack, setSelectedTrack] = useState<string | null>(
        tracks[0] || null
    );

    // Group projects by track
    const projectsByTrack = tracks.reduce((acc, track) => {
        acc[track as string] = data
            .filter((project) => project.track === track)
            .sort((a, b) => b.total_score - a.total_score);
        return acc;
    }, {} as Record<string, RoundResult[]>);

    // Count of projects without tracks
    const unassignedProjects = data.filter((project) => !project.track).length;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Projects by Track</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs
                    defaultValue={selectedTrack || ""}
                    onValueChange={(value) => setSelectedTrack(value)}
                    className="space-y-4"
                >
                    <TabsList className="flex flex-wrap">
                        {tracks.map((track) => (
                            <TabsTrigger
                                key={track}
                                value={track as string}
                                className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
                            >
                                {track}
                                <Badge className="ml-2 bg-blue-100 text-blue-700">
                                    {projectsByTrack[track as string]?.length ||
                                        0}
                                </Badge>
                            </TabsTrigger>
                        ))}
                        {unassignedProjects > 0 && (
                            <TabsTrigger value="unassigned">
                                No Track
                                <Badge className="ml-2 bg-gray-100 text-gray-700">
                                    {unassignedProjects}
                                </Badge>
                            </TabsTrigger>
                        )}
                    </TabsList>

                    {tracks.map((track) => (
                        <TabsContent
                            key={track}
                            value={track as string}
                            className="space-y-4"
                        >
                            <div className="bg-blue-50 p-4 rounded-lg mb-4">
                                <h3 className="font-medium text-blue-800">
                                    {track} Track
                                </h3>
                                <p className="text-sm text-blue-700">
                                    {projectsByTrack[track as string]?.length ||
                                        0}{" "}
                                    projects in this track
                                </p>
                            </div>

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
                                                Score
                                            </TableHead>
                                            <TableHead className="w-48">
                                                Judges
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {projectsByTrack[track as string]?.map(
                                            (project, index) => (
                                                <TableRow
                                                    key={project.project_id}
                                                    className={
                                                        index === 0
                                                            ? "bg-blue-50"
                                                            : ""
                                                    }
                                                >
                                                    <TableCell className="text-center font-medium">
                                                        {index === 0 ? (
                                                            <span className="inline-block text-xl">
                                                                🏆
                                                            </span>
                                                        ) : (
                                                            index + 1
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {project.table_number}
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {project.project_name}
                                                    </TableCell>
                                                    <TableCell className="text-right font-medium">
                                                        {project.total_score.toFixed(
                                                            2
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex -space-x-2">
                                                            <TooltipProvider>
                                                                {project.judges
                                                                    .slice(0, 5)
                                                                    .map(
                                                                        (
                                                                            judge
                                                                        ) => (
                                                                            <Tooltip
                                                                                key={
                                                                                    judge.id
                                                                                }
                                                                            >
                                                                                <TooltipTrigger
                                                                                    asChild
                                                                                >
                                                                                    <Avatar className="border-2 border-white h-8 w-8">
                                                                                        <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
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
                                                                                </TooltipContent>
                                                                            </Tooltip>
                                                                        )
                                                                    )}
                                                                {project.judges
                                                                    .length >
                                                                    5 && (
                                                                    <Avatar className="border-2 border-white h-8 w-8">
                                                                        <AvatarFallback className="bg-gray-100 text-gray-700 text-xs">
                                                                            +
                                                                            {project
                                                                                .judges
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
                        </TabsContent>
                    ))}

                    {unassignedProjects > 0 && (
                        <TabsContent value="unassigned" className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                <h3 className="font-medium text-gray-800">
                                    Projects Without Track
                                </h3>
                                <p className="text-sm text-gray-700">
                                    {unassignedProjects} projects not assigned
                                    to any track
                                </p>
                            </div>

                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-16">
                                                Table
                                            </TableHead>
                                            <TableHead>Project</TableHead>
                                            <TableHead className="w-24 text-right">
                                                Score
                                            </TableHead>
                                            <TableHead className="w-48">
                                                Judges
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {data
                                            .filter((project) => !project.track)
                                            .map((project) => (
                                                <TableRow
                                                    key={project.project_id}
                                                >
                                                    <TableCell>
                                                        {project.table_number}
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {project.project_name}
                                                    </TableCell>
                                                    <TableCell className="text-right font-medium">
                                                        {project.total_score.toFixed(
                                                            2
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex -space-x-2">
                                                            <TooltipProvider>
                                                                {project.judges
                                                                    .slice(0, 5)
                                                                    .map(
                                                                        (
                                                                            judge
                                                                        ) => (
                                                                            <Tooltip
                                                                                key={
                                                                                    judge.id
                                                                                }
                                                                            >
                                                                                <TooltipTrigger
                                                                                    asChild
                                                                                >
                                                                                    <Avatar className="border-2 border-white h-8 w-8">
                                                                                        <AvatarFallback className="bg-gray-100 text-gray-700 text-xs">
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
                                                                                </TooltipContent>
                                                                            </Tooltip>
                                                                        )
                                                                    )}
                                                                {project.judges
                                                                    .length >
                                                                    5 && (
                                                                    <Avatar className="border-2 border-white h-8 w-8">
                                                                        <AvatarFallback className="bg-gray-100 text-gray-700 text-xs">
                                                                            +
                                                                            {project
                                                                                .judges
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
                        </TabsContent>
                    )}
                </Tabs>
            </CardContent>
        </Card>
    );
}
