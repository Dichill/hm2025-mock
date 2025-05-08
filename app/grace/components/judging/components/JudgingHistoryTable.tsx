import React, { useState, useMemo } from "react";
import { ScoredProject } from "@/core/grace/types/judge.dto";

/**
 * Properties for the JudgingHistoryTable component
 */
export interface JudgingHistoryTableProps {
    /** The list of judged projects */
    judgedProjects: ScoredProject[];
    /** Whether data is currently loading */
    isLoading: boolean;
    /** Error message, if any */
    error: string | null;
    /** Current judging round */
    round: number;
    /** Function to handle editing an existing score */
    onEditScore: (project: ScoredProject) => void;
}

/**
 * Component that displays a simplified table of previously judged projects with pagination
 */
const JudgingHistoryTable: React.FC<JudgingHistoryTableProps> = ({
    judgedProjects,
    isLoading,
    error,
    round,
    onEditScore,
}) => {
    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Calculate paginated projects for more efficient rendering
    const paginatedProjects = useMemo(() => {
        const start = page * rowsPerPage;
        return judgedProjects.slice(start, start + rowsPerPage);
    }, [judgedProjects, page, rowsPerPage]);

    // Calculate total pages for pagination
    const totalPages = useMemo(
        () => Math.ceil(judgedProjects.length / rowsPerPage),
        [judgedProjects.length, rowsPerPage]
    );

    // Handler for changing page
    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };

    // Handler for changing rows per page
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Handler for editing a project score
    const handleEditScore = (project: ScoredProject) => {
        // Call the parent component's onEditScore function with the selected project
        onEditScore(project);
    };

    // Calculate total score for a judged project
    const calculateTotalScore = (project: ScoredProject): number => {
        let total =
            project.technical_complexity +
            project.potential_impact +
            project.design_implementation +
            project.presentation;

        // Add bonus points (1 point each)
        if (project.bonus_scalability) total += 1;
        if (project.bonus_all_participated) total += 1;
        if (project.bonus_task_division) total += 1;

        return total;
    };

    if (isLoading) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-600">Loading your judging history...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-red-700">{error}</p>
            </div>
        );
    }

    if (judgedProjects.length === 0) {
        return (
            <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-gray-600">
                    You haven&apos;t judged any projects yet in this round.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-2">
                You&apos;ve judged {judgedProjects.length} project
                {judgedProjects.length !== 1 ? "s" : ""} in round {round}.
            </p>

            <div className="overflow-x-auto">
                <table className="w-full min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Project
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Table
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Total Score
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedProjects.map((project) => (
                            <tr
                                key={project.score_id}
                                className="hover:bg-gray-50"
                            >
                                <td className="px-3 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {project.project_name}
                                    </div>
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">
                                        {project.table_number}
                                    </div>
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-[rgb(var(--mesa-purple))]">
                                        {calculateTotalScore(project)}
                                    </div>
                                </td>
                                <td className="px-3 py-4 whitespace-nowrap text-right">
                                    <button
                                        onClick={() => handleEditScore(project)}
                                        className="text-[rgb(var(--mesa-purple))] hover:text-[rgb(var(--mesa-purple))]/80 text-sm font-medium"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination controls */}
            {judgedProjects.length > 10 && (
                <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-4">
                    <div className="flex items-center">
                        <span className="text-sm text-gray-700">
                            Rows per page:
                        </span>
                        <select
                            className="ml-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-[rgb(var(--mesa-purple))] focus:border-[rgb(var(--mesa-purple))]"
                            value={rowsPerPage}
                            onChange={handleChangeRowsPerPage}
                        >
                            {[10, 20, 30].map((n) => (
                                <option key={n} value={n}>
                                    {n}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex">
                        <button
                            onClick={() => handleChangePage(page - 1)}
                            disabled={page === 0}
                            className="px-3 py-1 border border-gray-300 rounded-l-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <div className="px-4 py-1 border-t border-b border-gray-300 bg-white text-sm text-gray-700">
                            {page + 1} of {totalPages}
                        </div>
                        <button
                            onClick={() => handleChangePage(page + 1)}
                            disabled={page >= totalPages - 1}
                            className="px-3 py-1 border border-gray-300 rounded-r-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JudgingHistoryTable;
