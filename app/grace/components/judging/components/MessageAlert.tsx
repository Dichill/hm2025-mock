import React from "react";

/**
 * Properties for the MessageAlert component
 */
export interface MessageAlertProps {
    /** The text content of the message */
    text: string;
    /** The type of message: success or error */
    type: "success" | "error";
    /** Optional function to dismiss the message */
    onDismiss?: () => void;
}

/**
 * A reusable alert component for displaying success and error messages
 */
const MessageAlert: React.FC<MessageAlertProps> = ({
    text,
    type,
    onDismiss,
}) => {
    return (
        <div
            className={`mb-4 p-3 rounded-md ${
                type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
            }`}
        >
            {text}
            {onDismiss && (
                <button
                    onClick={onDismiss}
                    className="ml-2 text-sm font-medium"
                    aria-label="Dismiss"
                >
                    ×
                </button>
            )}
        </div>
    );
};

export default MessageAlert;
