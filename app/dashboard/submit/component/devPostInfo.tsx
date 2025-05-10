import { motion } from "framer-motion";

export default function DevPostInfo() {
    return (
        <motion.div className="bg-[rgb(var(--mesa-blue))]/10 border border-[rgb(var(--mesa-blue))]/30 rounded-lg p-4 flex items-center mb-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[rgb(var(--mesa-blue))] mr-3 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
            </svg>
            <div className="flex-grow">
                <p className="text-[rgb(var(--mesa-blue))] font-medium">
                    Make sure to start filling out your{" "}
                    <a
                        href="https://hackmesa.devpost.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-[rgb(var(--mesa-blue))]"
                    >
                        DevPost Project
                    </a>
                    {", "}
                    as you&apos;ll need the link to complete your submission.
                </p>
                <p className="text-[rgb(var(--mesa-blue))] mt-2">
                    <a
                        href="https://help.devpost.com/category/20-submitting-to-a-hackathon"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-[rgb(var(--mesa-blue))]"
                    >
                        View the DevPost Submission Guide
                    </a>{" "}
                    for detailed instructions and tips on submitting your
                    project.
                </p>
            </div>
        </motion.div>
    );
}
