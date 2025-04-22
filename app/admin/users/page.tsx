"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getStudents } from "@/core/user/api/admin";
import { StudentData } from "@/core/user/types/admin.dto";

/**
 * Admin Users Management Page - Students only view
 */
export default function AdminUsersPage() {
    const [students, setStudents] = useState<StudentData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoading(true);
                const data = await getStudents();
                setStudents(data);
            } catch (error) {
                console.error("Error fetching students:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    /**
     * Filter students based on search term
     */
    const filteredStudents = students.filter(
        (student) =>
            student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.display_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="py-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-[rgb(var(--mesa-warm-red))]">
                    Student Management
                </h1>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-[rgb(var(--mesa-warm-red))] text-white rounded-md"
                >
                    Add New Student
                </motion.button>
            </div>

            {/* Search bar */}
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 pl-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange))]"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 absolute left-3 top-3.5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
            </div>

            {/* Students Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-12 h-12 border-4 border-t-[rgb(var(--mesa-orange))] border-r-[rgb(var(--mesa-orange))] border-b-[rgb(var(--mesa-orange))] border-l-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredStudents.length > 0 ? (
                                    filteredStudents.map((student) => (
                                        <tr
                                            key={student.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {student.display_name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {student.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-[rgb(var(--mesa-orange))] hover:text-[rgb(var(--mesa-warm-red))] mr-3">
                                                    Edit
                                                </button>
                                                <button className="text-red-500 hover:text-red-700">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="px-6 py-4 text-center text-sm text-gray-500"
                                        >
                                            {searchTerm
                                                ? "No students found matching your search"
                                                : "No students found"}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
