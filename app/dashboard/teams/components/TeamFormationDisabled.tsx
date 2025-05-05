import React from "react";
import { motion } from "framer-motion";

/**
 * Component to display when team formation is disabled
 */
const TeamFormationDisabled: React.FC = () => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.5 } },
            }}
            className="container mx-auto px-4 py-12 max-w-4xl"
        >
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="bg-emerald-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                </div>
                <h1 className="text-2xl font-semibold mb-3">Team Formation</h1>
                <p className="text-gray-600 mb-6">
                    Team formation is currently disabled.
                </p>
                <div className="w-20 h-1 bg-emerald-200 rounded-full mx-auto"></div>
            </div>
        </motion.div>
    );
};

export default TeamFormationDisabled;
