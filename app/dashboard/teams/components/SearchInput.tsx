import React from "react";

/**
 * Props for the SearchInput component
 */
interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

/**
 * Component for searching teams with a search icon
 */
const SearchInput: React.FC<SearchInputProps> = ({
    value,
    onChange,
    placeholder = "Search teams...",
}) => {
    return (
        <div className="mb-5">
            <div className="relative">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--mesa-blue))]/30 focus:border-[rgb(var(--mesa-blue))]"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
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
    );
};

export default SearchInput;
