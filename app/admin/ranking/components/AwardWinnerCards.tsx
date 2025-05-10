import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AwardWinner } from "@/core/grace/types/judge.dto";
import { JSX, useMemo } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Component for displaying award winners as cards
 */
export interface AwardWinnerCardsProps {
    /** Array of award winners to display */
    data: AwardWinner[];
}

export function AwardWinnerCards({ data }: AwardWinnerCardsProps): JSX.Element {
    // Sort winners by highest score first
    const sortedData = useMemo(() => {
        return [...data].sort((a, b) => b.avg_score - a.avg_score);
    }, [data]);

    return (
        <div className="space-y-6">
            {sortedData.map((winner) => (
                <Card
                    key={`${winner.award_category}-${winner.project_id}`}
                    className="relative overflow-hidden border-2 border-purple-200 hover:border-purple-300 transition-all duration-300"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full" />
                    <CardHeader className="relative">
                        <div className="flex items-center justify-between mb-2">
                            <Badge
                                variant="secondary"
                                className="px-3 py-1 text-sm font-medium bg-purple-100 text-purple-700 hover:bg-purple-200"
                            >
                                {winner.award_category}
                            </Badge>
                            <div className="flex items-center space-x-1 text-purple-600">
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
                            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-600">
                                        Average Score
                                    </p>
                                    <p className="text-2xl font-bold text-purple-700">
                                        {winner.avg_score.toFixed(2)}
                                    </p>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                                    <span className="text-xl font-bold text-purple-700">
                                        ⭐
                                    </span>
                                </div>
                            </div>

                            {winner.judges && winner.judges.length > 0 ? (
                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium text-gray-700">
                                        Judges ({winner.judge_count})
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        <TooltipProvider>
                                            {winner.judges.map((judge) => (
                                                <Tooltip key={judge.id}>
                                                    <TooltipTrigger asChild>
                                                        <Avatar className="h-8 w-8 cursor-pointer">
                                                            <AvatarFallback className="bg-purple-100 text-purple-700 text-xs">
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
                            ) : (
                                <div className="flex items-center justify-between px-4 py-2 bg-purple-50 rounded-lg">
                                    <span className="text-sm text-gray-600">
                                        Judges
                                    </span>
                                    <span className="text-sm font-medium text-purple-700">
                                        {winner.judge_count}{" "}
                                        {winner.judge_count === 1
                                            ? "Judge"
                                            : "Judges"}
                                    </span>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
