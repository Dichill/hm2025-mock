import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TopProject } from "@/core/grace/types/judge.dto";

/**
 * Table component for displaying top projects
 */
export interface TopProjectsTableProps {
    /** Array of top projects to display */
    data: TopProject[];
}

export function TopProjectsTable({ data }: TopProjectsTableProps): JSX.Element {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Table #</TableHead>
                        <TableHead>Project Name</TableHead>
                        <TableHead>Total Score</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((project, index) => (
                        <TableRow key={project.project_id}>
                            <TableCell className="font-bold">
                                {index + 1}
                            </TableCell>
                            <TableCell>{project.table_number}</TableCell>
                            <TableCell className="font-medium">
                                {project.project_name}
                            </TableCell>
                            <TableCell>
                                {project.total_score.toFixed(2)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
