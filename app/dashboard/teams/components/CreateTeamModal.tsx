import React from "react";
import { motion } from "framer-motion";

/**
 * Props for the CreateTeamModal component
 */
interface CreateTeamModalProps {
    isOpen: boolean;
    teamName: string;
    isCreating: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    scaleIn: any; // Animation variant
    onNameChange: (value: string) => void;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
}

/**
 * Modal component for creating a new team
 */
const CreateTeamModal: React.FC<CreateTeamModalProps> = ({
    isOpen,
    teamName,
    isCreating,
    scaleIn,
    onNameChange,
    onClose,
    onSubmit,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
                className="bg-white rounded-xl p-6 max-w-md w-full"
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Create a New Team</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                <form onSubmit={onSubmit}>
                    <div className="mb-6">
                        <label
                            htmlFor="teamName"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Team Name
                        </label>
                        <input
                            type="text"
                            id="teamName"
                            value={teamName}
                            onChange={(e) => onNameChange(e.target.value)}
                            placeholder="Enter your team name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-blue))]"
                            autoFocus
                        />
                    </div>
                    <div className="flex space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                            disabled={isCreating}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="cursor-pointer flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex justify-center items-center"
                            disabled={isCreating}
                        >
                            {isCreating ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                                    Creating...
                                </>
                            ) : (
                                "Create Team"
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default CreateTeamModal;
