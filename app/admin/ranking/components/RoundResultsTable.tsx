import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { RoundResult } from "@/core/grace/types/judge.dto";

/**
 * Table component for displaying round results
 */
export interface RoundResultsTableProps {
    /** Array of round results to display */
    data: RoundResult[];
}

export function RoundResultsTable({ data }: RoundResultsTableProps) {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Table #</TableHead>
                        <TableHead>Project Name</TableHead>
                        <TableHead>Track</TableHead>
                        <TableHead>Technical</TableHead>
                        <TableHead>Impact</TableHead>
                        <TableHead>Design</TableHead>
                        <TableHead>Presentation</TableHead>
                        <TableHead>Bonus</TableHead>
                        <TableHead>Total Score</TableHead>
                        <TableHead># Judges</TableHead>
                        <TableHead>Judges</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data
                        .sort((a, b) => b.total_score - a.total_score)
                        .map((result) => (
                            <TableRow key={result.project_id}>
                                <TableCell>{result.table_number}</TableCell>
                                <TableCell className="font-medium">
                                    {result.project_name}
                                </TableCell>
                                <TableCell>
                                    {result.track ? (
                                        <Badge variant="outline">
                                            {result.track}
                                        </Badge>
                                    ) : (
                                        <span className="text-muted-foreground">
                                            —
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {result.avg_technical.toFixed(2)}
                                </TableCell>
                                <TableCell>
                                    {result.avg_impact.toFixed(2)}
                                </TableCell>
                                <TableCell>
                                    {result.avg_design.toFixed(2)}
                                </TableCell>
                                <TableCell>
                                    {result.avg_presentation.toFixed(2)}
                                </TableCell>
                                <TableCell>{result.bonus_points}</TableCell>
                                <TableCell className="font-bold">
                                    {result.total_score.toFixed(2)}
                                </TableCell>
                                <TableCell>{result.judge_count}</TableCell>
                                <TableCell>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                            >
                                                <Info className="h-4 w-4" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-80"
                                            align="end"
                                        >
                                            <div className="space-y-4">
                                                <h4 className="font-medium leading-none mb-2">
                                                    Project Judges
                                                </h4>
                                                {result.judges &&
                                                result.judges.length > 0 ? (
                                                    <div className="space-y-2">
                                                        {result.judges.map(
                                                            (judge) => (
                                                                <div
                                                                    key={
                                                                        judge.id
                                                                    }
                                                                    className="flex justify-between items-center py-1 border-b border-gray-100"
                                                                >
                                                                    <div className="font-medium">
                                                                        {
                                                                            judge.display_name
                                                                        }
                                                                    </div>
                                                                    <div className="text-xs text-muted-foreground truncate max-w-[140px]">
                                                                        {
                                                                            judge.email
                                                                        }
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-muted-foreground">
                                                        No judge information
                                                        available.
                                                    </p>
                                                )}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
}
