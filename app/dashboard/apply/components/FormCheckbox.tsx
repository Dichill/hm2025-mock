"use client";

import { ChangeEvent, ReactNode } from "react";
import { motion } from "framer-motion";

type FormCheckboxProps = {
    id: string;
    name: string;
    checked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    label: ReactNode;
    error?: string;
    variants?: any;
};

export function FormCheckbox({
    id,
    name,
    checked,
    onChange,
    label,
    error = "",
    variants,
}: FormCheckboxProps) {
    return (
        <motion.div className="space-y-2" variants={variants}>
            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input
                        id={id}
                        name={name}
                        type="checkbox"
                        checked={checked}
                        onChange={onChange}
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[rgb(var(--mesa-orange))]/50"
                    />
                </div>
                <label
                    htmlFor={id}
                    className="ml-2 text-sm font-medium text-[rgb(var(--mesa-grey))]"
                >
                    {label}
                </label>
            </div>
            {error && (
                <p className="text-[rgb(var(--mesa-warm-red))] text-xs mt-1">
                    {error}
                </p>
            )}
        </motion.div>
    );
}
