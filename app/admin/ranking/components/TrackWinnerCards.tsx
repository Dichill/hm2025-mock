import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrackWinner } from "@/core/grace/types/judge.dto";
import { JSX } from "react";

/**
 * Component for displaying track winners as cards
 */
export interface TrackWinnerCardsProps {
    /** Array of track winners to display */
    data: TrackWinner[];
}

export function TrackWinnerCards({ data }: TrackWinnerCardsProps): JSX.Element {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.map((winner) => (
                <Card
                    key={winner.project_id}
                    className="relative overflow-hidden border-2 border-blue-200 hover:border-blue-300 transition-all duration-300"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full" />
                    <CardHeader className="relative">
                        <div className="flex items-center justify-between mb-2">
                            <Badge className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200">
                                {winner.track}
                            </Badge>
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
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
