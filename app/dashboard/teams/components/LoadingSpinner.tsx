import React from "react";

/**
 * Props for the LoadingSpinner component
 */
interface LoadingSpinnerProps {
    size?: "small" | "medium" | "large";
}

/**
 * Component for displaying a loading spinner
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "medium" }) => {
    const sizeClasses = {
        small: "w-4 h-4",
        medium: "w-12 h-12",
        large: "w-16 h-16",
    };

    return (
        <div className="flex items-center justify-center h-full min-h-[60vh]">
            <div
                className={`${sizeClasses[size]} border-4 border-t-[rgb(var(--mesa-blue))] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin`}
            ></div>
        </div>
    );
};

export default LoadingSpinner;
