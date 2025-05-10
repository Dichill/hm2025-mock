import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

/**
 * Component for displaying error messages consistently
 */
export interface ErrorAlertProps {
    /** Error message to display */
    message: string;
}

export function ErrorAlert({ message }: ErrorAlertProps) {
    return (
        <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
}
