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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { RefreshCw } from "lucide-react";

/**
 * Admin page for Grace - displays projects and teams
 */
export default function GraceAdminPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [selectedTeam, setSelectedTeam] = useState<TeamWithMembers | null>(
        null
    );
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [activeTab, setActiveTab] = useState<string>("projects");

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                setLoading(true);
                const [projectsData, teamsData] = await Promise.all([
                    ProjectApi.getAllProjects(),
                    getAllTeams(),
                ]);

                setProjects(projectsData);
                setTeams(teamsData);
                setError("");
            } catch (err) {
                console.error("Failed to fetch data:", err);
                setError("Failed to load data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleTeamSelect = async (teamId: string): Promise<void> => {
        try {
            const teamData = await getTeamById(teamId);
            setSelectedTeam(teamData);
        } catch (err) {
            console.error("Failed to fetch team details:", err);
            setError("Failed to load team details.");
        }
    };

    if (loading) {
        return (
            <div className="container py-10 mx-auto">
                <h1 className="text-3xl font-bold mb-8">Grace</h1>
                <div className="grid grid-cols-1 gap-8">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-8 w-1/3" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
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

    if (error) {
        return (
            <div className="container py-10 mx-auto">
                <h1 className="text-3xl font-bold mb-8">Grace</h1>
                <Alert variant="destructive" className="mb-6">
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
            <h1 className="text-3xl font-bold mb-8">Grace</h1>

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
                </TabsList>

                <TabsContent value="projects">
                    <Card>
                        <CardHeader>
                            <CardTitle>Projects</CardTitle>
                            <CardDescription>
                                Manage all hackathon projects
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Table</TableHead>
                                        <TableHead>Track</TableHead>
                                        <TableHead>Team</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {projects.map((project) => (
                                        <TableRow key={project.id}>
                                            <TableCell className="font-medium">
                                                {project.name}
                                            </TableCell>
                                            <TableCell>
                                                {project.table_number}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {project.track}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {project.team_id}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {projects.length === 0 && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                className="text-center py-6 text-muted-foreground"
                                            >
                                                No projects found
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="teams">
                    <div className="grid grid-cols-1 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Teams</CardTitle>
                                <CardDescription>
                                    View all registered teams and their members
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Code</TableHead>
                                            <TableHead>Created</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {teams.map((team) => (
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
                                                    {new Date(
                                                        team.created_at
                                                    ).toLocaleDateString()}
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
                                        ))}
                                        {teams.length === 0 && (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={4}
                                                    className="text-center py-6 text-muted-foreground"
                                                >
                                                    No teams found
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        {selectedTeam && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        {selectedTeam.name} - Team Members
                                    </CardTitle>
                                    <CardDescription>
                                        {selectedTeam.members.length} members
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Role</TableHead>
                                                <TableHead>Joined</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {selectedTeam.members.map(
                                                (member) => (
                                                    <TableRow key={member.id}>
                                                        <TableCell className="font-medium">
                                                            {member.full_name}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge variant="outline">
                                                                {member.role}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            {new Date(
                                                                member.created_at
                                                            ).toLocaleDateString()}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                            {selectedTeam.members.length ===
                                                0 && (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={3}
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
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
