import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AwardWinner } from "@/core/grace/types/judge.dto";

/**
 * Component for displaying award winners as cards
 */
export interface AwardWinnerCardsProps {
    /** Array of award winners to display */
    data: AwardWinner[];
}

export function AwardWinnerCards({ data }: AwardWinnerCardsProps): JSX.Element {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.map((winner) => (
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
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
