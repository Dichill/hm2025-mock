"use client";

import { ChangeEvent } from "react";
import { motion } from "framer-motion";

type FormInputProps = {
    id: string;
    name: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string;
    required?: boolean;
    helperText?: string;
    inputClassName?: string;
    variants?: any;
};

export function FormInput({
    id,
    name,
    label,
    type,
    value,
    onChange,
    placeholder = "",
    error = "",
    required = false,
    helperText = "",
    inputClassName = "",
    variants,
}: FormInputProps) {
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
            <motion.input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${
                    error
                        ? "border-[rgb(var(--mesa-warm-red))] ring-[rgb(var(--mesa-warm-red))]/20"
                        : "border-gray-300 focus:ring-[rgb(var(--mesa-orange))]/40 focus:border-[rgb(var(--mesa-orange))]"
                } ${inputClassName}`}
                whileFocus={{ scale: 1.01 }}
            />
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
