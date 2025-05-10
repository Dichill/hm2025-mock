import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrackWinner } from "@/core/grace/types/judge.dto";
import { JSX, useMemo } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Component for displaying track winners as cards
 */
export interface TrackWinnerCardsProps {
    /** Array of track winners to display */
    data: TrackWinner[];
}

export function TrackWinnerCards({ data }: TrackWinnerCardsProps): JSX.Element {
    // Sort winners by highest score first
    const sortedData = useMemo(() => {
        return [...data].sort((a, b) => b.total_score - a.total_score);
    }, [data]);

    return (
        <div className="space-y-6">
            {sortedData.map((winner) => (
                <Card
                    key={winner.project_id}
                    className="relative overflow-hidden border-2 border-blue-200 hover:border-blue-300 transition-all duration-300"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full" />
                    <CardHeader className="relative">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex gap-2">
                                <Badge className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200">
                                    {winner.track}
                                </Badge>
                                {winner.from_round && (
                                    <Badge
                                        variant="outline"
                                        className="px-3 py-1 text-sm font-medium"
                                    >
                                        Round {winner.from_round}
                                    </Badge>
                                )}
                            </div>
                            <div className="flex items-center space-x-1 text-blue-600">
                                <span className="text-sm font-medium">
                                    Table
                                </span>
                                <span className="text-lg font-bold">
                                    {winner.table_number}
                                </span>
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold tracking-tight text-gray-900">
                            {winner.project_name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-600">
                                        Total Score
                                    </p>
                                    <p className="text-2xl font-bold text-blue-700">
                                        {winner.total_score.toFixed(2)}
                                    </p>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <span className="text-xl font-bold text-blue-700">
                                        🏆
                                    </span>
                                </div>
                            </div>

                            {winner.judges && winner.judges.length > 0 && (
                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium text-gray-700">
                                        Judges ({winner.judges.length})
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        <TooltipProvider>
                                            {winner.judges.map((judge) => (
                                                <Tooltip key={judge.id}>
                                                    <TooltipTrigger asChild>
                                                        <Avatar className="h-8 w-8 cursor-pointer">
                                                            <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                                                                {judge.display_name
                                                                    .split(" ")
                                                                    .map(
                                                                        (n) =>
                                                                            n[0]
                                                                    )
                                                                    .join("")
                                                                    .toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>
                                                            {judge.display_name}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {judge.email}
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            ))}
                                        </TooltipProvider>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
