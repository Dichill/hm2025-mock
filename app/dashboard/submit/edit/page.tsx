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
import {
    AWARD_OPTIONS,
    TRACK_OPTIONS,
    SPONSOR_OPTIONS,
} from "@/core/constants/project-options";
import { publicSettingsApi } from "@/core/grace/api/settings";
import { AxiosError } from "axios";

// Import Shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardDescription,
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

export default function EditProjectPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userTeam, setUserTeam] = useState<TeamWithMembers | null>(null);
    const [submitting, setSubmitting] = useState<boolean>(false);
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
        async function loadTeamAndProject() {
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

                if (!team) {
                    toast.error("You need to be in a team to edit a project");
                    router.push("/dashboard/team");
                    return;
                }

                // Get project data
                const project = await ProjectApi.getProjectByTeamId(team.id);

                if (!project) {
                    toast.error("No project found to edit");
                    router.push("/dashboard/submit");
                    return;
                }

                // Set form values from existing project
                form.reset({
                    name: project.name,
                    table_number: project.table_number,
                    track: project.track,
                    devpost_url: project.devpost_url,
                    awards_opt_in: project.awards_opt_in || [],
                    sponsor_opt_in: project.sponsor_opt_in || [],
                    team_id: project.team_id,
                    created_by: project.created_by,
                });

                setExistingProject(project);

                // Mark data as loaded to prevent duplicate requests
                dataLoadedRef.current = true;
            } catch (error) {
                console.error("Error loading data:", error);
                toast.error("Failed to load project data");
                router.push("/dashboard/submit");
            } finally {
                setIsLoading(false);
            }
        }

        loadTeamAndProject();
    }, [form, router]);

    const onSubmit = async (data: CreateProjectDto) => {
        if (!userTeam || !existingProject || !submissionsEnabled) return;

        try {
            setSubmitting(true);

            // Keep original team_id and created_by
            data.team_id = existingProject.team_id;
            data.created_by = existingProject.created_by;

            // Ensure whitespace is trimmed from table number
            data.table_number = data.table_number.trim();

            // Update the project
            await ProjectApi.updateProject(existingProject.id, data);

            toast.success("Project updated successfully!");
            router.push("/dashboard/submit");
        } catch (error: unknown) {
            console.error("Failed to update project:", error);

            // Check for specific validation errors
            if (
                typeof error === "object" &&
                error !== null &&
                "response" in error &&
                (error as AxiosError)?.response?.status === 400 &&
                (
                    error as AxiosError<{ message: string }>
                )?.response?.data?.message?.includes("Table number")
            ) {
                // Handle duplicate table number error
                const errorMessage =
                    (error as AxiosError<{ message: string }>)?.response?.data
                        ?.message ||
                    "This table number is already assigned to another project";
                toast.error(errorMessage);
                form.setError("table_number", {
                    type: "manual",
                    message:
                        "This table number is already taken. Please choose a different one.",
                });
            }
            // Check for forbidden error (submissions closed)
            else if (
                typeof error === "object" &&
                error !== null &&
                (("status" in error && error.status === 403) ||
                    ("message" in error &&
                        typeof error.message === "string" &&
                        error.message.includes("forbidden")))
            ) {
                toast.error(
                    "Project updates are currently closed. Please try again later."
                );
                setSubmissionsEnabled(false);
            } else {
                toast.error("Failed to update your project. Please try again.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto p-6 max-w-4xl">
                <h1 className="text-2xl font-bold mb-6">Edit Your Project</h1>
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
                <h1 className="text-2xl font-bold mb-6">Edit Your Project</h1>
                <motion.div variants={cardVariants}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Submissions Not Yet Open</CardTitle>
                            <CardDescription>
                                Project editing will be available once the
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

    if (hackathonStarted && !submissionsEnabled) {
        return (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="container mx-auto p-6 max-w-4xl"
            >
                <h1 className="text-2xl font-bold mb-6">Edit Your Project</h1>
                <motion.div variants={cardVariants}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Submissions Closed</CardTitle>
                            <CardDescription>
                                Project editing is currently not available
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                The submission period has ended or is
                                temporarily disabled. You cannot edit your
                                project at this time.
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
                                        router.push("/dashboard/submit")
                                    }
                                >
                                    View Your Project
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
            <h1 className="text-2xl font-bold mb-6">Edit Your Project</h1>

            <motion.div variants={cardVariants}>
                <Alert
                    variant="default"
                    className="mb-6 bg-blue-50 border-blue-200"
                >
                    <svg
                        className="h-5 w-5 text-blue-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <AlertDescription className="ml-2 text-sm text-blue-700">
                        You are editing the project for team:{" "}
                        <strong>{userTeam?.name}</strong>
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
                            <CardFooter className="flex justify-between space-x-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() =>
                                        router.push("/dashboard/submit")
                                    }
                                >
                                    Cancel
                                </Button>
                                <motion.div
                                    whileHover="hover"
                                    whileTap="tap"
                                    variants={buttonVariants}
                                >
                                    <Button
                                        type="submit"
                                        disabled={
                                            submitting || !submissionsEnabled
                                        }
                                    >
                                        {submitting
                                            ? "Updating..."
                                            : "Update Project"}
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
