"use client";

import { ChangeEvent } from "react";
import { motion, Variant } from "framer-motion";

type Option = {
    value: string;
    label: string;
};

type FormSelectProps = {
    id: string;
    name: string;
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    options: Option[];
    error?: string;
    required?: boolean;
    helperText?: string;
    selectClassName?: string;
    variants?: {
        [key: string]: Variant;
    };
};

export function FormSelect({
    id,
    name,
    label,
    value,
    onChange,
    options,
    error = "",
    required = false,
    helperText = "",
    selectClassName = "",
    variants,
}: FormSelectProps) {
    return (
        <motion.div className="space-y-1" variants={variants}>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-[rgb(var(--mesa-grey))]"
            >
                {label}{" "}
                {required && (
                    <span className="text-[rgb(var(--mesa-warm-red))]">*</span>
                )}
            </label>
            <motion.select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${
                    error
                        ? "border-[rgb(var(--mesa-warm-red))] ring-[rgb(var(--mesa-warm-red))]/20"
                        : "border-gray-300 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
                } ${selectClassName}`}
            >
                <option value="">Select an option</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </motion.select>
            {error && (
                <p className="text-[rgb(var(--mesa-warm-red))] text-xs mt-1">
                    {error}
                </p>
            )}
            {helperText && !error && (
                <motion.p
                    className="text-xs text-[rgb(var(--mesa-grey))] mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    {helperText}
                </motion.p>
            )}
        </motion.div>
    );
}
