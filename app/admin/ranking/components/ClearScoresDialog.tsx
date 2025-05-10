import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { graceClient } from "@/api/grace-client";

/**
 * Interface for the ClearScoresDialog component props
 */
export interface ClearScoresDialogProps {
    /** Callback function to trigger data refresh after score clearing */
    onScoresCleared: () => void;
}

/**
 * Dialog component for clearing judging scores
 */
export function ClearScoresDialog({ onScoresCleared }: ClearScoresDialogProps) {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [clearScores, setClearScores] = useState<boolean>(true);
    const [clearAwardScores, setClearAwardScores] = useState<boolean>(false);
    const [round, setRound] = useState<string>("1");
    const [awardCategory, setAwardCategory] = useState<string>("");
    const [clearingScores, setClearingScores] = useState<boolean>(false);

    /**
     * Handles clearing scores based on selected options
     */
    const handleClearScores = async (): Promise<void> => {
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

            setDialogOpen(false);
            onScoresCleared();
        } catch (err) {
            toast.error("Failed to clear scores", {
                description: "An error occurred while clearing scores.",
            });
            console.error("Error clearing scores:", err);
        } finally {
            setClearingScores(false);
        }
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive">Clear Scores</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Clear Judging Scores</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Select the types of scores
                        you want to clear.
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
                        <Label htmlFor="clearScores">Clear Round Scores</Label>
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
                        <Label htmlFor="awardCategory" className="text-right">
                            Award Category
                        </Label>
                        <Input
                            id="awardCategory"
                            placeholder="Leave empty for all (optional)"
                            value={awardCategory}
                            onChange={(e) => setAwardCategory(e.target.value)}
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
                        {clearingScores ? "Clearing..." : "Clear Scores"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
