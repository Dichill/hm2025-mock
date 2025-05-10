"use client";

import { useState, useEffect } from "react";
import { ProjectApi } from "@/core/grace/api/project";
import { getAllTeams, getTeamById } from "@/core/grace/api/team";
import { Project } from "@/core/grace/types/project.dto";
import { Team, TeamWithMembers } from "@/core/grace/types/team.dto";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    RefreshCw,
    Search,
    ExternalLink,
    AlertCircle,
    ChevronDown,
} from "lucide-react";

type SponsorProjectMinimal = {
    name: string;
    table_number: string;
};

/**
 * Admin page for Grace - displays projects, teams, and sponsor information
 */
export default function GraceAdminPage() {
    // State for projects and teams
    const [projects, setProjects] = useState<Project[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [selectedTeam, setSelectedTeam] = useState<TeamWithMembers | null>(
        null
    );

    // State for sponsor data
    const [minimalSponsorProjects, setMinimalSponsorProjects] = useState<
        Record<string, SponsorProjectMinimal[]>
    >({});
    const [completeSponsorProjects, setCompleteSponsorProjects] = useState<
        Record<string, Project[]>
    >({});

    // UI state
    const [loading, setLoading] = useState<boolean>(true);
    const [sponsorsLoading, setSponsorsLoading] = useState<boolean>(true);
    const [projectsLoading, setProjectsLoading] = useState<boolean>(true);
    const [teamsLoading, setTeamsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [activeTab, setActiveTab] = useState<string>("projects");
    const [searchTerm, setSearchTerm] = useState<string>("");

    // Inside component function, add this to state declarations
    const [expandedSponsors, setExpandedSponsors] = useState<
        Record<string, boolean>
    >({});

    // Toggle expanded state for a sponsor
    const toggleSponsorExpanded = (sponsor: string): void => {
        setExpandedSponsors((prev) => ({
            ...prev,
            [sponsor]: !prev[sponsor],
        }));
    };

    // Get project data
    const fetchProjectData = async (): Promise<void> => {
        try {
            setProjectsLoading(true);
            const projectsData = await ProjectApi.getAllProjects();
            setProjects(projectsData);
        } catch (err) {
            console.error("Failed to fetch projects:", err);
            setError("Failed to load project data. Please try again.");
        } finally {
            setProjectsLoading(false);
        }
    };

    // Get team data
    const fetchTeamData = async (): Promise<void> => {
        try {
            setTeamsLoading(true);
            const teamsData = await getAllTeams();
            setTeams(teamsData);
        } catch (err) {
            console.error("Failed to fetch teams:", err);
            setError("Failed to load team data. Please try again.");
        } finally {
            setTeamsLoading(false);
        }
    };

    // Get sponsor data
    const fetchSponsorData = async (): Promise<void> => {
        try {
            setSponsorsLoading(true);
            const [minimalData, completeData] = await Promise.all([
                ProjectApi.getProjectsBySponsorOptIns(),
                ProjectApi.getCompleteProjectsBySponsor(),
            ]);
            setMinimalSponsorProjects(minimalData);
            setCompleteSponsorProjects(completeData);
        } catch (err) {
            console.error("Failed to fetch sponsor data:", err);
            setError("Failed to load sponsor data. Please try again.");
        } finally {
            setSponsorsLoading(false);
        }
    };

    // Fetch all data on load
    useEffect(() => {
        const fetchAllData = async (): Promise<void> => {
            setLoading(true);

            try {
                await Promise.all([fetchProjectData(), fetchTeamData()]);

                // Only fetch sponsor data if that tab is selected
                if (activeTab === "sponsors") {
                    await fetchSponsorData();
                }

                setError("");
            } catch (err) {
                console.error("Failed to fetch data:", err);
                setError("Failed to load data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [activeTab]);

    // Fetch sponsor data when tab changes to sponsors
    useEffect(() => {
        if (
            activeTab === "sponsors" &&
            Object.keys(minimalSponsorProjects).length === 0
        ) {
            fetchSponsorData();
        }
    }, [activeTab, minimalSponsorProjects]);

    // Handle team selection
    const handleTeamSelect = async (teamId: string): Promise<void> => {
        try {
            const teamData = await getTeamById(teamId);
            setSelectedTeam(teamData);
        } catch (err) {
            console.error("Failed to fetch team details:", err);
            setError("Failed to load team details.");
        }
    };

    // Filter projects based on search term
    const filteredProjects = projects.filter(
        (project) =>
            project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.table_number
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            project.track.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter teams based on search term
    const filteredTeams = teams.filter(
        (team) =>
            team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            team.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Loading skeletons
    if (loading) {
        return (
            <div className="container py-10 mx-auto">
                <h1 className="text-3xl font-bold mb-8">
                    Grace Admin Dashboard
                </h1>
                <div className="grid grid-cols-1 gap-8">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-8 w-1/3" />
                            <Skeleton className="h-4 w-1/2" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    // Error display
    if (error) {
        return (
            <div className="container py-10 mx-auto">
                <h1 className="text-3xl font-bold mb-8">
                    Grace Admin Dashboard
                </h1>
                <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
                <Button
                    onClick={() => window.location.reload()}
                    className="flex items-center gap-2"
                >
                    <RefreshCw className="h-4 w-4" />
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div className="container py-10 mx-auto">
            <h1 className="text-3xl font-bold mb-8">Grace Admin Dashboard</h1>

            {/* Search bar */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search projects, teams, or table numbers..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <Tabs
                defaultValue="projects"
                className="mb-8"
                value={activeTab}
                onValueChange={setActiveTab}
            >
                <TabsList className="mb-6">
                    <TabsTrigger value="projects">
                        Projects ({projects.length})
                    </TabsTrigger>
                    <TabsTrigger value="teams">
                        Teams ({teams.length})
                    </TabsTrigger>
                    <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
                </TabsList>

                {/* Projects Tab */}
                <TabsContent value="projects">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle>Projects</CardTitle>
                                    <CardDescription>
                                        Manage all hackathon projects
                                    </CardDescription>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={fetchProjectData}
                                    disabled={projectsLoading}
                                >
                                    <RefreshCw
                                        className={`h-4 w-4 mr-2 ${
                                            projectsLoading
                                                ? "animate-spin"
                                                : ""
                                        }`}
                                    />
                                    Refresh
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {projectsLoading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Skeleton
                                            key={i}
                                            className="h-10 w-full"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Table</TableHead>
                                            <TableHead>Track</TableHead>
                                            <TableHead>Devpost URL</TableHead>
                                            <TableHead>Team</TableHead>
                                            <TableHead>
                                                Sponsor Opt-ins
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredProjects.map((project) => (
                                            <TableRow key={project.id}>
                                                <TableCell className="font-medium">
                                                    {project.name}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge>
                                                        {project.table_number}
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
                                                            View{" "}
                                                            <ExternalLink className="ml-1 h-3 w-3" />
                                                        </a>
                                                    ) : (
                                                        <span className="text-muted-foreground">
                                                            Not submitted
                                                        </span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {teams.find(
                                                        (t) =>
                                                            t.id ===
                                                            project.team_id
                                                    )?.name || project.team_id}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-wrap gap-1">
                                                        {project.sponsor_opt_in
                                                            .length > 0 ? (
                                                            project.sponsor_opt_in.map(
                                                                (
                                                                    sponsor,
                                                                    idx
                                                                ) => (
                                                                    <Badge
                                                                        key={
                                                                            idx
                                                                        }
                                                                        variant="secondary"
                                                                        className="mr-1"
                                                                    >
                                                                        {
                                                                            sponsor
                                                                        }
                                                                    </Badge>
                                                                )
                                                            )
                                                        ) : (
                                                            <span className="text-muted-foreground">
                                                                None
                                                            </span>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {filteredProjects.length === 0 && (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={6}
                                                    className="text-center py-6 text-muted-foreground"
                                                >
                                                    {searchTerm
                                                        ? "No projects match your search"
                                                        : "No projects found"}
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-between border-t p-4">
                            <div className="text-sm text-muted-foreground">
                                Showing {filteredProjects.length} of{" "}
                                {projects.length} projects
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Teams Tab */}
                <TabsContent value="teams">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle>Teams</CardTitle>
                                        <CardDescription>
                                            View all registered teams and their
                                            members
                                        </CardDescription>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={fetchTeamData}
                                        disabled={teamsLoading}
                                    >
                                        <RefreshCw
                                            className={`h-4 w-4 mr-2 ${
                                                teamsLoading
                                                    ? "animate-spin"
                                                    : ""
                                            }`}
                                        />
                                        Refresh
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {teamsLoading ? (
                                    <div className="space-y-4">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Skeleton
                                                key={i}
                                                className="h-10 w-full"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Code</TableHead>
                                                <TableHead>Members</TableHead>
                                                <TableHead>Created</TableHead>
                                                <TableHead>Project</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredTeams.map((team) => {
                                                const teamProject =
                                                    projects.find(
                                                        (p) =>
                                                            p.team_id ===
                                                            team.id
                                                    );
                                                return (
                                                    <TableRow key={team.id}>
                                                        <TableCell className="font-medium">
                                                            {team.name}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge variant="secondary">
                                                                {team.code}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            {selectedTeam?.id ===
                                                            team.id
                                                                ? selectedTeam
                                                                      .members
                                                                      .length
                                                                : "—"}
                                                        </TableCell>
                                                        <TableCell>
                                                            {new Date(
                                                                team.created_at
                                                            ).toLocaleDateString()}
                                                        </TableCell>
                                                        <TableCell>
                                                            {teamProject ? (
                                                                <span className="flex items-center">
                                                                    {
                                                                        teamProject.name
                                                                    }
                                                                    <Badge className="ml-2">
                                                                        {
                                                                            teamProject.table_number
                                                                        }
                                                                    </Badge>
                                                                </span>
                                                            ) : (
                                                                <span className="text-muted-foreground">
                                                                    No project
                                                                </span>
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button
                                                                variant="ghost"
                                                                onClick={() =>
                                                                    handleTeamSelect(
                                                                        team.id
                                                                    )
                                                                }
                                                            >
                                                                View Members
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                            {filteredTeams.length === 0 && (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={6}
                                                        className="text-center py-6 text-muted-foreground"
                                                    >
                                                        {searchTerm
                                                            ? "No teams match your search"
                                                            : "No teams found"}
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                )}
                            </CardContent>
                            <CardFooter className="flex justify-between border-t p-4">
                                <div className="text-sm text-muted-foreground">
                                    Showing {filteredTeams.length} of{" "}
                                    {teams.length} teams
                                </div>
                            </CardFooter>
                        </Card>

                        <div className="lg:col-span-1">
                            {selectedTeam ? (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            {selectedTeam.name} - Team Members
                                        </CardTitle>
                                        <CardDescription>
                                            {selectedTeam.members.length}{" "}
                                            members
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>Role</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {selectedTeam.members.map(
                                                    (member) => (
                                                        <TableRow
                                                            key={member.id}
                                                        >
                                                            <TableCell className="font-medium">
                                                                {
                                                                    member.full_name
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                <Badge variant="outline">
                                                                    {
                                                                        member.role
                                                                    }
                                                                </Badge>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )}
                                                {selectedTeam.members.length ===
                                                    0 && (
                                                    <TableRow>
                                                        <TableCell
                                                            colSpan={2}
                                                            className="text-center py-6 text-muted-foreground"
                                                        >
                                                            No members found
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            ) : (
                                <Card className="h-full flex items-center justify-center">
                                    <CardContent className="pt-6 text-center text-muted-foreground">
                                        <div className="mx-auto mb-4 rounded-full bg-muted p-3 w-12 h-12 flex items-center justify-center">
                                            <AlertCircle className="h-6 w-6" />
                                        </div>
                                        <h3 className="mb-2 text-lg font-semibold">
                                            No Team Selected
                                        </h3>
                                        <p>Select a team to view its members</p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </TabsContent>

                {/* Sponsors Tab */}
                <TabsContent value="sponsors">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle>Projects by Sponsor</CardTitle>
                                    <CardDescription>
                                        View all projects grouped by sponsor
                                        opt-ins
                                    </CardDescription>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={fetchSponsorData}
                                    disabled={sponsorsLoading}
                                >
                                    <RefreshCw
                                        className={`h-4 w-4 mr-2 ${
                                            sponsorsLoading
                                                ? "animate-spin"
                                                : ""
                                        }`}
                                    />
                                    Refresh
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {sponsorsLoading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="space-y-2">
                                            <Skeleton className="h-6 w-1/4" />
                                            <Skeleton className="h-10 w-full" />
                                            <Skeleton className="h-10 w-full" />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {Object.keys(completeSponsorProjects)
                                        .length > 0 ? (
                                        Object.entries(completeSponsorProjects)
                                            .filter(
                                                ([sponsor]) =>
                                                    !searchTerm ||
                                                    sponsor
                                                        .toLowerCase()
                                                        .includes(
                                                            searchTerm.toLowerCase()
                                                        )
                                            )
                                            .map(([sponsor, projects]) => (
                                                <Card key={sponsor}>
                                                    <CardHeader
                                                        className="cursor-pointer"
                                                        onClick={() =>
                                                            toggleSponsorExpanded(
                                                                sponsor
                                                            )
                                                        }
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                {sponsor}
                                                                <Badge className="ml-2">
                                                                    {
                                                                        projects.length
                                                                    }
                                                                </Badge>
                                                            </div>
                                                            <ChevronDown
                                                                className={`h-4 w-4 transition-transform duration-200 ${
                                                                    expandedSponsors[
                                                                        sponsor
                                                                    ]
                                                                        ? "rotate-180"
                                                                        : ""
                                                                }`}
                                                            />
                                                        </div>
                                                    </CardHeader>
                                                    {expandedSponsors[
                                                        sponsor
                                                    ] && (
                                                        <CardContent>
                                                            <Table>
                                                                <TableHeader>
                                                                    <TableRow>
                                                                        <TableHead>
                                                                            Name
                                                                        </TableHead>
                                                                        <TableHead>
                                                                            Table
                                                                        </TableHead>
                                                                        <TableHead>
                                                                            Track
                                                                        </TableHead>
                                                                        <TableHead>
                                                                            Devpost
                                                                            URL
                                                                        </TableHead>
                                                                        <TableHead>
                                                                            Team
                                                                        </TableHead>
                                                                    </TableRow>
                                                                </TableHeader>
                                                                <TableBody>
                                                                    {projects.map(
                                                                        (
                                                                            project
                                                                        ) => (
                                                                            <TableRow
                                                                                key={
                                                                                    project.id
                                                                                }
                                                                            >
                                                                                <TableCell className="font-medium">
                                                                                    {
                                                                                        project.name
                                                                                    }
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
                                                                                        {
                                                                                            project.track
                                                                                        }
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
                                                                                            View{" "}
                                                                                            <ExternalLink className="ml-1 h-3 w-3" />
                                                                                        </a>
                                                                                    ) : (
                                                                                        <span className="text-muted-foreground">
                                                                                            Not
                                                                                            submitted
                                                                                        </span>
                                                                                    )}
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {teams.find(
                                                                                        (
                                                                                            t
                                                                                        ) =>
                                                                                            t.id ===
                                                                                            project.team_id
                                                                                    )
                                                                                        ?.name ||
                                                                                        project.team_id}
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    )}
                                                                </TableBody>
                                                            </Table>
                                                        </CardContent>
                                                    )}
                                                </Card>
                                            ))
                                    ) : (
                                        <div className="py-8 text-center text-muted-foreground">
                                            No sponsor data available
                                        </div>
                                    )}

                                    {Object.keys(completeSponsorProjects)
                                        .length > 0 &&
                                        Object.entries(
                                            completeSponsorProjects
                                        ).filter(
                                            ([sponsor]) =>
                                                !searchTerm ||
                                                sponsor
                                                    .toLowerCase()
                                                    .includes(
                                                        searchTerm.toLowerCase()
                                                    )
                                        ).length === 0 && (
                                            <div className="py-8 text-center text-muted-foreground">
                                                No sponsors match your search
                                            </div>
                                        )}
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-between border-t p-4">
                            <div className="text-sm text-muted-foreground">
                                {Object.keys(completeSponsorProjects).length > 0
                                    ? `${
                                          Object.keys(completeSponsorProjects)
                                              .length
                                      } sponsors with opted-in projects`
                                    : "No sponsor data available"}
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
