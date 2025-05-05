"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getStudents, createStudent, deleteUser } from "@/core/user/api/admin";
import { StudentData, CreateStudentDto } from "@/core/user/types/admin.dto";

/**
 * Available user roles
 */
const USER_ROLES = ["SPONSOR", "HACKER", "JUDGES", "ORGANIZER", "USER"];

/**
 * Admin Users Management Page - Students only view
 */
export default function AdminUsersPage() {
    const [students, setStudents] = useState<StudentData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalError, setModalError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<CreateStudentDto>({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        role: "USER",
    });
    const [userToDelete, setUserToDelete] = useState<StudentData | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

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

    /**
     * Handles form input changes
     */
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /**
     * Handles form submission to create a new student
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setModalError(null);

        try {
            await createStudent(formData);

            // Refresh student list
            const updatedStudents = await getStudents();
            setStudents(updatedStudents);

            // Close modal and reset form
            setIsModalOpen(false);
            setFormData({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                role: "USER",
            });
        } catch (error) {
            setModalError(
                error instanceof Error
                    ? error.message
                    : "Failed to create student"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    /**
     * Opens the delete confirmation modal for a user
     */
    const handleDeleteClick = (student: StudentData) => {
        setUserToDelete(student);
        setIsDeleteModalOpen(true);
        setDeleteError(null);
    };

    /**
     * Handles user deletion confirmation
     */
    const handleDeleteConfirm = async () => {
        if (!userToDelete) return;

        setIsDeleting(true);
        setDeleteError(null);

        try {
            await deleteUser(userToDelete.id);

            // Refresh student list
            const updatedStudents = await getStudents();
            setStudents(updatedStudents);

            // Close modal
            setIsDeleteModalOpen(false);
            setUserToDelete(null);
        } catch (error) {
            setDeleteError(
                error instanceof Error ? error.message : "Failed to delete user"
            );
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="py-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-[rgb(var(--mesa-warm-red))]">
                    Student Management
                </h1>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer px-4 py-2 bg-[rgb(var(--mesa-warm-red))] text-white rounded-md"
                    onClick={() => setIsModalOpen(true)}
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
                                                <button className="cursor-pointer text-[rgb(var(--mesa-orange))] hover:text-[rgb(var(--mesa-warm-red))] mr-3">
                                                    Edit
                                                </button>
                                                <button
                                                    className="cursor-pointer text-red-500 hover:text-red-700"
                                                    onClick={() =>
                                                        handleDeleteClick(
                                                            student
                                                        )
                                                    }
                                                >
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

            {/* Create Student Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4 text-[rgb(var(--mesa-warm-red))]">
                            Add New Student
                        </h2>

                        {modalError && (
                            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                                {modalError}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange))]"
                                    placeholder="student@example.com"
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    minLength={6}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange))]"
                                    placeholder="Minimum 6 characters"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="firstName"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        required
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange))]"
                                    />
                                </div>
                                <div>
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="lastName"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        required
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange))]"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="role"
                                >
                                    Role
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    required
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-orange))]"
                                >
                                    {USER_ROLES.map((role) => (
                                        <option key={role} value={role}>
                                            {role}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex justify-end mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="cursor-pointer mr-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="cursor-pointer px-4 py-2 bg-[rgb(var(--mesa-warm-red))] text-white rounded-md hover:bg-opacity-90 flex items-center"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                                            Creating...
                                        </>
                                    ) : (
                                        "Create Student"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && userToDelete && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4 text-red-600">
                            Delete User
                        </h2>

                        {deleteError && (
                            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                                {deleteError}
                            </div>
                        )}

                        <div className="mb-6">
                            <p className="text-gray-700 mb-4">
                                Are you sure you want to delete this user? This
                                action is{" "}
                                <span className="font-bold">irreversible</span>{" "}
                                and will remove all associated data.
                            </p>
                            <div className="bg-gray-100 p-3 rounded-md">
                                <p className="font-medium">
                                    {userToDelete.display_name}
                                </p>
                                <p className="text-gray-600">
                                    {userToDelete.email}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="cursor-pointer mr-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                disabled={isDeleting}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteConfirm}
                                className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                                disabled={isDeleting}
                            >
                                {isDeleting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                                        Deleting...
                                    </>
                                ) : (
                                    "Delete User"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
