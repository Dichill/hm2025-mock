import { motion } from "framer-motion";
import { Project } from "@/core/grace/types/project.dto";
import { TeamWithMembers } from "@/core/grace/types/team.dto";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clipboard, Edit, ExternalLink } from "lucide-react";
import { toast } from "react-hot-toast";

type ProjectSubmittedProps = {
    project: Project;
    team: TeamWithMembers;
    allowEdit?: boolean;
};

export default function ProjectSubmitted({
    project,
    team,
    allowEdit = false,
}: ProjectSubmittedProps) {
    const router = useRouter();

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

    const copyToClipboard = (text: string, description: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${description} copied to clipboard!`);
    };

    const handleEditProject = () => {
        // Navigate to edit project page (to be implemented)
        router.push("/dashboard/submit/edit");
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="container mx-auto p-6 max-w-4xl"
        >
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Project Submission</h1>
                {allowEdit && (
                    <motion.div
                        whileHover="hover"
                        whileTap="tap"
                        variants={buttonVariants}
                    >
                        <Button
                            onClick={handleEditProject}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <Edit className="h-4 w-4" />
                            Edit Project
                        </Button>
                    </motion.div>
                )}
            </div>

            <motion.div variants={cardVariants}>
                <Card className="mb-6 overflow-hidden border-t-4 border-t-blue-100">
                    <CardHeader className="border-b">
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-xl">
                                    {project.name}
                                </CardTitle>
                                <CardDescription>
                                    {team.name} Team&apos;s Submission
                                </CardDescription>
                            </div>
                            <Badge className="bg-blue-50 hover:bg-blue-100 text-black">
                                Table #{project.table_number}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y">
                            <div className="grid grid-cols-3 p-4 gap-4 items-center">
                                <div className="font-medium text-sm">Track</div>
                                <div className="col-span-2 flex items-center">
                                    <Badge
                                        variant="outline"
                                        className="bg-[rgb(var(--mesa-purple))]/10 text-[rgb(var(--mesa-purple))] hover:bg-[rgb(var(--mesa-purple))]/20 border-[rgb(var(--mesa-purple))]/30"
                                    >
                                        {project.track}
                                    </Badge>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 p-4 gap-4 items-center">
                                <div className="font-medium text-sm">
                                    Devpost URL
                                </div>
                                <div className="col-span-2 text-sm flex items-center gap-2">
                                    <a
                                        href={project.devpost_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                    >
                                        {project.devpost_url}
                                        <ExternalLink className="h-3 w-3" />
                                    </a>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0"
                                        onClick={() =>
                                            copyToClipboard(
                                                project.devpost_url,
                                                "Devpost URL"
                                            )
                                        }
                                    >
                                        <Clipboard className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 p-4 gap-4 items-start">
                                <div className="font-medium text-sm">
                                    Award Categories
                                </div>
                                <div className="col-span-2">
                                    <div className="flex flex-wrap gap-2">
                                        {project.awards_opt_in &&
                                        project.awards_opt_in.length > 0 ? (
                                            project.awards_opt_in.map(
                                                (award) => (
                                                    <Badge
                                                        key={award}
                                                        variant="outline"
                                                        className="bg-[rgb(var(--mesa-yellow-116))]/10 text-[rgb(var(--mesa-yellow-116))] hover:bg-[rgb(var(--mesa-yellow-116))]/20 border-[rgb(var(--mesa-yellow-116))]/30"
                                                    >
                                                        {award}
                                                    </Badge>
                                                )
                                            )
                                        ) : (
                                            <span className="text-sm text-gray-500 italic">
                                                No award categories selected
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 p-4 gap-4 items-start">
                                <div className="font-medium text-sm">
                                    Sponsor Challenges
                                </div>
                                <div className="col-span-2">
                                    <div className="flex flex-wrap gap-2">
                                        {project.sponsor_opt_in &&
                                        project.sponsor_opt_in.length > 0 ? (
                                            project.sponsor_opt_in.map(
                                                (sponsor) => (
                                                    <Badge
                                                        key={sponsor}
                                                        variant="outline"
                                                        className="bg-[rgb(var(--mesa-green))]/10 text-[rgb(var(--mesa-green))] hover:bg-[rgb(var(--mesa-green))]/20 border-[rgb(var(--mesa-green))]/30"
                                                    >
                                                        {sponsor}
                                                    </Badge>
                                                )
                                            )
                                        ) : (
                                            <span className="text-sm text-gray-500 italic">
                                                No sponsor challenges selected
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 p-4 flex justify-between">
                        <div className="text-sm text-gray-500">
                            Project ID: {project.id}
                        </div>
                        <Button
                            variant="link"
                            className="p-0 h-auto text-sm"
                            onClick={() => router.push("/dashboard")}
                        >
                            Back to Dashboard
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>
        </motion.div>
    );
}
