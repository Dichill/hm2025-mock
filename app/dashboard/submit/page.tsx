"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { getMyTeam } from "@/core/grace/api/team";
import { ProjectApi } from "@/core/grace/api/project";
import { CreateProjectDto, Project } from "@/core/grace/types/project.dto";
import { TeamWithMembers } from "@/core/grace/types/team.dto";
import { toast } from "react-hot-toast";
import supabase from "@/lib/supabase/supabase-client";
import ProjectSubmitted from "@/app/components/ProjectSubmitted/ProjectSubmitted";
import {
    AWARD_OPTIONS,
    TRACK_OPTIONS,
    SPONSOR_OPTIONS,
} from "@/core/constants/project-options";
import { publicSettingsApi } from "@/core/grace/api/settings";

// Import Shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

export default function SubmitProjectPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userTeam, setUserTeam] = useState<TeamWithMembers | null>(null);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [hasProject, setHasProject] = useState<boolean>(false);
    const [existingProject, setExistingProject] = useState<Project | null>(
        null
    );
    const [hackathonStarted, setHackathonStarted] = useState<boolean>(true);
    const [submissionsEnabled, setSubmissionsEnabled] = useState<boolean>(true);
    const dataLoadedRef = useRef<boolean>(false);

    const form = useForm<CreateProjectDto>({
        defaultValues: {
            name: "",
            table_number: "",
            track: "",
            devpost_url: "",
            awards_opt_in: [],
            sponsor_opt_in: [],
            team_id: "",
            created_by: "",
        },
    });

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    const buttonVariants = {
        hover: {
            scale: 1.03,
            boxShadow: "0 10px 25px rgba(var(--mesa-orange), 0.2)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
            },
        },
        tap: { scale: 0.97 },
    };

    useEffect(() => {
        async function checkTeamAndProject() {
            // Skip if data was already loaded (prevents duplicate calls in StrictMode)
            if (dataLoadedRef.current) return;

            try {
                setIsLoading(true);

                // Fetch settings and team data in parallel
                const [hackathonSetting, submissionsSetting, team] =
                    await Promise.all([
                        publicSettingsApi.getByName("hackathon_started"),
                        publicSettingsApi.getByName("submissions_enabled"),
                        getMyTeam(),
                    ]);

                // Process hackathon_started setting
                const hackathonValue = hackathonSetting.value as Record<
                    string,
                    unknown
                >;
                if (typeof hackathonValue.enabled === "boolean") {
                    setHackathonStarted(hackathonValue.enabled);
                } else if (typeof hackathonValue.enabled === "string") {
                    setHackathonStarted(
                        hackathonValue.enabled.toLowerCase() === "true"
                    );
                } else {
                    setHackathonStarted(false);
                    console.warn(
                        "Unexpected format for hackathon_started setting"
                    );
                }

                // Process submissions_enabled setting
                const submissionsValue = submissionsSetting.value as Record<
                    string,
                    unknown
                >;
                if (typeof submissionsValue.enabled === "boolean") {
                    setSubmissionsEnabled(submissionsValue.enabled);
                } else if (typeof submissionsValue.enabled === "string") {
                    setSubmissionsEnabled(
                        submissionsValue.enabled.toLowerCase() === "true"
                    );
                } else {
                    setSubmissionsEnabled(false);
                    console.warn(
                        "Unexpected format for submissions_enabled setting"
                    );
                }

                // Process team data
                setUserTeam(team);

                if (team) {
                    // Check if team already has a project
                    const project = await ProjectApi.getProjectByTeamId(
                        team.id
                    );
                    if (project) {
                        setHasProject(true);
                        setExistingProject(project);
                    }
                }

                // Mark data as loaded to prevent duplicate requests
                dataLoadedRef.current = true;
            } catch (error) {
                console.error("Failed to load data:", error);
                toast.error("Failed to load data. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }

        checkTeamAndProject();
    }, []);

    const onSubmit = async (data: CreateProjectDto) => {
        if (!userTeam || !submissionsEnabled) return;

        try {
            setSubmitting(true);
            // Get the current user's ID from Supabase
            const { data: session } = await supabase.auth.getSession();
            const userId = session?.session?.user?.id;

            if (!userId) {
                toast.error(
                    "Unable to determine your user ID. Please log in again."
                );
                return;
            }

            // Set the team_id and created_by from the user's data
            data.team_id = userTeam.id;
            data.created_by = userId;

            const createdProject = await ProjectApi.createProject(data);
            toast.success("Project submitted successfully!");

            // Update state to show project details instead of redirecting
            setExistingProject(createdProject);
            setHasProject(true);
        } catch (error: unknown) {
            console.error("Failed to submit project:", error);

            // Check for forbidden error (submissions closed)
            if (
                typeof error === "object" &&
                error !== null &&
                (("status" in error && error.status === 403) ||
                    ("message" in error &&
                        typeof error.message === "string" &&
                        error.message.includes("forbidden")))
            ) {
                toast.error(
                    "Project submission is currently closed. Please try again later."
                );
                setSubmissionsEnabled(false);
            } else {
                toast.error("Failed to submit your project. Please try again.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto p-6 max-w-4xl">
                <h1 className="text-2xl font-bold mb-6">Submit Your Project</h1>
                <div className="flex justify-center items-center h-64">
                    <div className="w-12 h-12 border-4 border-t-[rgb(var(--mesa-orange))] border-r-[rgb(var(--mesa-orange))] border-b-[rgb(var(--mesa-orange))] border-l-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    if (!hackathonStarted) {
        return (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="container mx-auto p-6 max-w-4xl"
            >
                <h1 className="text-2xl font-bold mb-6">Submit Your Project</h1>
                <motion.div variants={cardVariants}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Submissions Not Yet Open</CardTitle>
                            <CardDescription>
                                Project submissions will be available once the
                                hackathon has started
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                Please check back later when the hackathon
                                officially begins. The project submission system
                                will be accessible at that time.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <motion.div
                                whileHover="hover"
                                whileTap="tap"
                                variants={buttonVariants}
                            >
                                <Button
                                    onClick={() => router.push("/dashboard")}
                                >
                                    Return to Dashboard
                                </Button>
                            </motion.div>
                        </CardFooter>
                    </Card>
                </motion.div>
            </motion.div>
        );
    }

    // Check if user has existing project first, regardless of submission status
    if (hasProject && existingProject && userTeam) {
        return (
            <ProjectSubmitted
                project={existingProject}
                team={userTeam}
                allowEdit={submissionsEnabled}
            />
        );
    }

    if (hackathonStarted && !submissionsEnabled) {
        return (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="container mx-auto p-6 max-w-4xl"
            >
                <h1 className="text-2xl font-bold mb-6">Submit Your Project</h1>
                <motion.div variants={cardVariants}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Submissions Closed</CardTitle>
                            <CardDescription>
                                Project submissions are currently not available
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                The submission period has ended or is
                                temporarily disabled. You cannot submit new
                                projects or edit existing ones at this time.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <motion.div
                                whileHover="hover"
                                whileTap="tap"
                                variants={buttonVariants}
                            >
                                <Button
                                    onClick={() => router.push("/dashboard")}
                                >
                                    Return to Dashboard
                                </Button>
                            </motion.div>
                        </CardFooter>
                    </Card>
                </motion.div>
            </motion.div>
        );
    }

    if (!userTeam) {
        return (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="container mx-auto p-6 max-w-4xl"
            >
                <h1 className="text-2xl font-bold mb-6">Submit Your Project</h1>
                <motion.div variants={cardVariants}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Team Required</CardTitle>
                            <CardDescription>
                                You need to be in a team to submit a project
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                Please join or create a team first before
                                submitting a project.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <motion.div
                                whileHover="hover"
                                whileTap="tap"
                                variants={buttonVariants}
                            >
                                <Button
                                    onClick={() =>
                                        router.push("/dashboard/teams")
                                    }
                                >
                                    Go to Teams Page
                                </Button>
                            </motion.div>
                        </CardFooter>
                    </Card>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="container mx-auto p-6 max-w-4xl"
        >
            <h1 className="text-2xl font-bold mb-6">Submit Your Project</h1>

            <motion.div variants={cardVariants}>
                <Alert variant="default" className="mb-6">
                    <svg
                        className="h-5 w-5 text-green-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <AlertDescription className="ml-2 text-sm text-green-700">
                        You are submitting a project for team:{" "}
                        <strong>{userTeam.name}</strong>
                    </AlertDescription>
                </Alert>
            </motion.div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <motion.div variants={cardVariants}>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        rules={{
                                            required:
                                                "Project name is required",
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Project Name *
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Project name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="table_number"
                                        rules={{
                                            required:
                                                "Table number is required",
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Table Number *
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Table number"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="track"
                                        rules={{
                                            required: "Main track is required",
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Main Track *
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a track" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {TRACK_OPTIONS.map(
                                                            (track) => (
                                                                <SelectItem
                                                                    key={track}
                                                                    value={
                                                                        track
                                                                    }
                                                                >
                                                                    {track}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="devpost_url"
                                        rules={{
                                            required: "Devpost URL is required",
                                            pattern: {
                                                value: /^(https?:\/\/)?(www\.)?devpost\.com\/software\/.+/i,
                                                message:
                                                    "Please enter a valid Devpost project URL",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Devpost URL *
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="https://devpost.com/software/your-project"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="space-y-3">
                                        <FormLabel>
                                            Award Categories (Optional)
                                        </FormLabel>
                                        <FormDescription>
                                            Select which award categories you
                                            would like your project to be
                                            considered for.
                                        </FormDescription>
                                        <FormField
                                            control={form.control}
                                            name="awards_opt_in"
                                            defaultValue={[]}
                                            render={({ field }) => (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {AWARD_OPTIONS.map(
                                                        (award) => (
                                                            <FormItem
                                                                key={award.name}
                                                                className="flex flex-row items-start space-x-3 space-y-0"
                                                            >
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value?.includes(
                                                                            award.name
                                                                        )}
                                                                        onCheckedChange={(
                                                                            checked:
                                                                                | boolean
                                                                                | "indeterminate"
                                                                        ) => {
                                                                            const currentValues =
                                                                                field.value ||
                                                                                [];
                                                                            const newValues =
                                                                                checked ===
                                                                                true
                                                                                    ? [
                                                                                          ...currentValues,
                                                                                          award.name,
                                                                                      ]
                                                                                    : currentValues.filter(
                                                                                          (
                                                                                              value
                                                                                          ) =>
                                                                                              value !==
                                                                                              award.name
                                                                                      );
                                                                            field.onChange(
                                                                                newValues
                                                                            );
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <div className="flex items-center gap-1">
                                                                    <FormLabel className="font-normal cursor-pointer">
                                                                        {
                                                                            award.name
                                                                        }
                                                                    </FormLabel>
                                                                    <TooltipProvider>
                                                                        <Tooltip>
                                                                            <TooltipTrigger
                                                                                asChild
                                                                            >
                                                                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                                                            </TooltipTrigger>
                                                                            <TooltipContent>
                                                                                <p className="w-60">
                                                                                    {
                                                                                        award.eligibility
                                                                                    }
                                                                                </p>
                                                                            </TooltipContent>
                                                                        </Tooltip>
                                                                    </TooltipProvider>
                                                                </div>
                                                            </FormItem>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <FormLabel>
                                            Sponsor Prizes (Optional)
                                        </FormLabel>
                                        <FormDescription>
                                            Select which sponsor prizes you
                                            would like your project to be
                                            considered for.
                                        </FormDescription>
                                        <FormField
                                            control={form.control}
                                            name="sponsor_opt_in"
                                            defaultValue={[]}
                                            render={({ field }) => (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {SPONSOR_OPTIONS.map(
                                                        (sponsor) => (
                                                            <FormItem
                                                                key={sponsor}
                                                                className="flex flex-row items-start space-x-3 space-y-0"
                                                            >
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value?.includes(
                                                                            sponsor
                                                                        )}
                                                                        onCheckedChange={(
                                                                            checked:
                                                                                | boolean
                                                                                | "indeterminate"
                                                                        ) => {
                                                                            const currentValues =
                                                                                field.value ||
                                                                                [];
                                                                            const newValues =
                                                                                checked ===
                                                                                true
                                                                                    ? [
                                                                                          ...currentValues,
                                                                                          sponsor,
                                                                                      ]
                                                                                    : currentValues.filter(
                                                                                          (
                                                                                              value
                                                                                          ) =>
                                                                                              value !==
                                                                                              sponsor
                                                                                      );
                                                                            field.onChange(
                                                                                newValues
                                                                            );
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="font-normal cursor-pointer">
                                                                    {sponsor}
                                                                </FormLabel>
                                                            </FormItem>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end space-x-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.push("/dashboard")}
                                >
                                    Cancel
                                </Button>
                                <motion.div
                                    whileHover="hover"
                                    whileTap="tap"
                                    variants={buttonVariants}
                                >
                                    <Button type="submit" disabled={submitting}>
                                        {submitting
                                            ? "Submitting..."
                                            : "Submit Project"}
                                    </Button>
                                </motion.div>
                            </CardFooter>
                        </Card>
                    </motion.div>
                </form>
            </Form>
        </motion.div>
    );
}
