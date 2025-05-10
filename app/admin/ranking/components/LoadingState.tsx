import { Skeleton } from "@/components/ui/skeleton";

/**
 * Component for displaying loading skeleton
 */
export interface LoadingStateProps {
    /** Number of skeleton rows to display */
    rows?: number;
    /** Height of each skeleton row */
    height?: string;
}

export function LoadingState({ rows = 5, height = "h-12" }: LoadingStateProps) {
    return (
        <div className="space-y-2">
            {[...Array(rows)].map((_, i) => (
                <Skeleton key={i} className={`w-full ${height}`} />
            ))}
        </div>
    );
}
