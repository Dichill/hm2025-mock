"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { getAllApplications } from "@/core/apply/api/apply";
import {
    ApplicationStatus,
    ApplicationSummaryDto,
    School,
} from "@/core/apply/types/apply.dto";

export default function ApplicationsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Parse URL parameters
    const initialPage = Number(searchParams.get("page") || "1");
    const initialStatus = searchParams.get("status") as
        | ApplicationStatus
        | undefined;
    const initialSchool = searchParams.get("school") as School | undefined;
    const initialSearch = searchParams.get("search") || "";

    const [applications, setApplications] = useState<ApplicationSummaryDto[]>(
        []
    );
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [itemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [statusFilter, setStatusFilter] = useState<
        ApplicationStatus | undefined
    >(initialStatus);
    const [schoolFilter, setSchoolFilter] = useState<School | undefined>(
        initialSchool
    );
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [debouncedSearchQuery, setDebouncedSearchQuery] =
        useState(initialSearch);

    // Update URL when filters change
    const updateUrlParams = (params: Record<string, string | undefined>) => {
        const url = new URL(window.location.href);

        // Update or remove each parameter
        Object.entries(params).forEach(([key, value]) => {
            if (value) {
                url.searchParams.set(key, value);
            } else {
                url.searchParams.delete(key);
            }
        });

        // Update the URL without refreshing the page
        window.history.pushState({}, "", url);
    };

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setLoading(true);
                const result = await getAllApplications(
                    currentPage,
                    itemsPerPage,
                    statusFilter,
                    schoolFilter,
                    debouncedSearchQuery
                );

                setApplications(result.applications);
                setTotalItems(result.total);
            } catch (error) {
                console.error("Error fetching applications:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();

        // Update URL parameters whenever filters change
        updateUrlParams({
            page: currentPage > 1 ? currentPage.toString() : undefined,
            status: statusFilter,
            school: schoolFilter,
            search: debouncedSearchQuery || undefined,
        });
    }, [
        currentPage,
        itemsPerPage,
        statusFilter,
        schoolFilter,
        debouncedSearchQuery,
    ]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleStatusFilterChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = event.target.value;
        setStatusFilter(value ? (value as ApplicationStatus) : undefined);
        setCurrentPage(1);
    };

    const handleSchoolFilterChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = event.target.value;
        setSchoolFilter(value ? (value as School) : undefined);
        setCurrentPage(1);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const handleViewApplication = (id: string) => {
        // Include current filters in the URL when navigating to detail page
        router.push(
            `/admin/applications/${id}?returnTo=${encodeURIComponent(
                window.location.href
            )}`
        );
    };

    const getStatusBadgeColor = (status: ApplicationStatus) => {
        switch (status) {
            case ApplicationStatus.PENDING:
                return "bg-yellow-100 text-yellow-800";
            case ApplicationStatus.APPROVED:
                return "bg-green-100 text-green-800";
            case ApplicationStatus.REJECTED:
                return "bg-red-100 text-red-800";
            case ApplicationStatus.WAITLISTED:
                return "bg-blue-100 text-blue-800";
            case ApplicationStatus.SAVED:
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="py-6">
            <div className="mb-6 flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center">
                <h1 className="text-2xl font-bold text-[rgb(var(--mesa-grey))]">
                    Applications
                </h1>
                <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:gap-4">
                    {/* Search input */}
                    <div className="w-full md:w-64">
                        <label
                            htmlFor="searchQuery"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Search
                        </label>
                        <div className="relative rounded-md shadow-sm">
                            <input
                                type="text"
                                id="searchQuery"
                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[rgb(var(--mesa-orange))] focus:border-[rgb(var(--mesa-orange))] sm:text-sm rounded-md"
                                placeholder="Name, email, or student ID"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg
                                    className="h-5 w-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="statusFilter"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Status
                        </label>
                        <select
                            id="statusFilter"
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[rgb(var(--mesa-orange))] focus:border-[rgb(var(--mesa-orange))] sm:text-sm rounded-md"
                            value={statusFilter || ""}
                            onChange={handleStatusFilterChange}
                        >
                            <option value="">All Statuses</option>
                            {Object.values(ApplicationStatus).map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="schoolFilter"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            School
                        </label>
                        <select
                            id="schoolFilter"
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[rgb(var(--mesa-orange))] focus:border-[rgb(var(--mesa-orange))] sm:text-sm rounded-md"
                            value={schoolFilter || ""}
                            onChange={handleSchoolFilterChange}
                        >
                            <option value="">All Schools</option>
                            {Object.values(School).map((school) => (
                                <option key={school} value={school}>
                                    {school}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="w-12 h-12 border-4 border-t-[rgb(var(--mesa-orange))] border-r-[rgb(var(--mesa-orange))] border-b-[rgb(var(--mesa-orange))] border-l-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <>
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {applications.length > 0 ? (
                                applications.map((application) => (
                                    <motion.li
                                        key={application.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div
                                            className="block hover:bg-gray-50 cursor-pointer"
                                            onClick={() =>
                                                handleViewApplication(
                                                    application.id
                                                )
                                            }
                                        >
                                            <div className="px-4 py-4 sm:px-6">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <p className="text-sm font-medium text-[rgb(var(--mesa-orange))] truncate">
                                                            {
                                                                application.firstName
                                                            }{" "}
                                                            {
                                                                application.lastName
                                                            }
                                                        </p>
                                                        <span
                                                            className={`ml-4 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(
                                                                application.status
                                                            )}`}
                                                        >
                                                            {application.status}
                                                        </span>
                                                    </div>
                                                    <div className="ml-2 flex-shrink-0 flex">
                                                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                                            {application.school}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.li>
                                ))
                            ) : (
                                <div className="px-4 py-8 text-center text-gray-500">
                                    No applications found matching your filters.
                                </div>
                            )}
                        </ul>
                    </div>

                    {/* Pagination */}
                    {applications.length > 0 && (
                        <div className="flex items-center justify-between mt-6">
                            <div className="flex-1 flex justify-between sm:hidden">
                                <button
                                    onClick={() =>
                                        handlePageChange(
                                            Math.max(1, currentPage - 1)
                                        )
                                    }
                                    disabled={currentPage === 1}
                                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                                        currentPage === 1
                                            ? "bg-gray-100 text-gray-400"
                                            : "bg-white text-gray-700 hover:bg-gray-50"
                                    }`}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
                                    disabled={
                                        currentPage * itemsPerPage >= totalItems
                                    }
                                    className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                                        currentPage * itemsPerPage >= totalItems
                                            ? "bg-gray-100 text-gray-400"
                                            : "bg-white text-gray-700 hover:bg-gray-50"
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing{" "}
                                        <span className="font-medium">
                                            {(currentPage - 1) * itemsPerPage +
                                                1}
                                        </span>{" "}
                                        to{" "}
                                        <span className="font-medium">
                                            {Math.min(
                                                currentPage * itemsPerPage,
                                                totalItems
                                            )}
                                        </span>{" "}
                                        of{" "}
                                        <span className="font-medium">
                                            {totalItems}
                                        </span>{" "}
                                        results
                                    </p>
                                </div>
                                <div>
                                    <nav
                                        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                        aria-label="Pagination"
                                    >
                                        <button
                                            onClick={() =>
                                                handlePageChange(
                                                    Math.max(1, currentPage - 1)
                                                )
                                            }
                                            disabled={currentPage === 1}
                                            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                                                currentPage === 1
                                                    ? "text-gray-300"
                                                    : "text-gray-500 hover:bg-gray-50"
                                            }`}
                                        >
                                            <span className="sr-only">
                                                Previous
                                            </span>
                                            <svg
                                                className="h-5 w-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>

                                        {/* Add page numbers here if needed */}

                                        <button
                                            onClick={() =>
                                                handlePageChange(
                                                    currentPage + 1
                                                )
                                            }
                                            disabled={
                                                currentPage * itemsPerPage >=
                                                totalItems
                                            }
                                            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                                                currentPage * itemsPerPage >=
                                                totalItems
                                                    ? "text-gray-300"
                                                    : "text-gray-500 hover:bg-gray-50"
                                            }`}
                                        >
                                            <span className="sr-only">
                                                Next
                                            </span>
                                            <svg
                                                className="h-5 w-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
