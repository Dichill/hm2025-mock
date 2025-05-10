import React from "react";
import { Project } from "@/core/grace/types/project.dto";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";

/**
 * Properties for the SponsorTab component
 */
export interface SponsorTabProps {
    /** Complete projects data by sponsor */
    completeSponsorProjects: Record<string, Project[]>;
    /** Expanded state for sponsors */
    expandedSponsors: Record<string, boolean>;
    /** Toggle expanded state for a sponsor */
    toggleSponsorExpanded: (sponsor: string) => void;
    /** Whether the data is loading */
    isLoading: boolean;
    /** Error message if there was a problem loading data */
    error: string | null;
}

/**
 * Component for displaying projects by sponsor
 */
const SponsorTab: React.FC<SponsorTabProps> = ({
    completeSponsorProjects,
    expandedSponsors,
    toggleSponsorExpanded,
    isLoading,
    error,
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-100">
            <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[rgb(var(--mesa-purple))]/20 rounded-full flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[rgb(var(--mesa-purple))]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                </div>
                <h2 className="ml-3 text-lg font-semibold">
                    Projects by Sponsor
                </h2>
            </div>

            {isLoading ? (
                <div className="text-center py-8">
                    <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-4 py-1">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
                    {error}
                </div>
            ) : Object.keys(completeSponsorProjects).length > 0 ? (
                <div className="space-y-4">
                    {Object.entries(completeSponsorProjects).map(
                        ([sponsor, projects]) => (
                            <Card key={sponsor}>
                                <CardHeader
                                    className="cursor-pointer"
                                    onClick={() =>
                                        toggleSponsorExpanded(sponsor)
                                    }
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            {sponsor}
                                            <Badge className="ml-2">
                                                {projects.length}
                                            </Badge>
                                        </div>
                                        <ChevronDown
                                            className={`h-4 w-4 transition-transform duration-200 ${
                                                expandedSponsors[sponsor]
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                        />
                                    </div>
                                </CardHeader>
                                {expandedSponsors[sponsor] && (
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>Table</TableHead>
                                                    <TableHead>Track</TableHead>
                                                    <TableHead>
                                                        Devpost URL
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {projects.map((project) => (
                                                    <TableRow key={project.id}>
                                                        <TableCell className="font-medium">
                                                            {project.name}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge>
                                                                {
                                                                    project.table_number
                                                                }
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge variant="outline">
                                                                {project.track}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            {project.devpost_url ? (
                                                                <a
                                                                    href={
                                                                        project.devpost_url
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center text-blue-600 hover:underline"
                                                                >
                                                                    View
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="ml-1 h-3 w-3"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={
                                                                                2
                                                                            }
                                                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                                        />
                                                                    </svg>
                                                                </a>
                                                            ) : (
                                                                <span className="text-muted-foreground">
                                                                    Not
                                                                    submitted
                                                                </span>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                )}
                            </Card>
                        )
                    )}
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-600">No sponsor data available</p>
                </div>
            )}
        </div>
    );
};

export default SponsorTab;
